// GeoTIFF / COG reader for the preview generator.
// Decodes a local file, downsamples it to a bounded size, applies a contrast
// stretch, encodes a PNG, and transforms its bounds to WGS84 for MapLibre.

import { fromArrayBuffer } from "geotiff";
import { PNG } from "pngjs";
import proj4 from "proj4";

const MAX_SIZE = 1600;
const VIRIDIS_STOPS = [
  [68, 1, 84], [72, 40, 120], [62, 73, 137], [49, 104, 142], [38, 130, 142],
  [31, 158, 137], [53, 183, 121], [109, 205, 89], [181, 222, 43], [253, 231, 37],
];

function viridis(t) {
  const scaled = Math.max(0, Math.min(1, t)) * (VIRIDIS_STOPS.length - 1);
  const index = Math.floor(scaled);
  const fraction = scaled - index;
  const low = VIRIDIS_STOPS[index];
  const high = VIRIDIS_STOPS[Math.min(index + 1, VIRIDIS_STOPS.length - 1)];
  return [
    Math.round(low[0] + (high[0] - low[0]) * fraction),
    Math.round(low[1] + (high[1] - low[1]) * fraction),
    Math.round(low[2] + (high[2] - low[2]) * fraction),
  ];
}

function ensureProjectionDefs() {
  for (let zone = 1; zone <= 60; zone++) {
    const north = `EPSG:${32600 + zone}`;
    const south = `EPSG:${32700 + zone}`;
    if (!proj4.defs(north)) {
      proj4.defs(north, `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs`);
    }
    if (!proj4.defs(south)) {
      proj4.defs(south, `+proj=utm +zone=${zone} +south +datum=WGS84 +units=m +no_defs`);
    }
  }
}

function projectionForCode(code) {
  if (!code) {
    return { label: "unknown", transform: null, note: "No CRS in the GeoTIFF; coordinates are used as WGS84." };
  }
  if (code === 4326 || code === 4979) {
    return { label: `EPSG:${code}`, transform: null };
  }
  ensureProjectionDefs();
  try {
    if (proj4.defs(`EPSG:${code}`)) {
      return {
        label: `EPSG:${code}`,
        transform: (x, y) => proj4(`EPSG:${code}`, "EPSG:4326", [x, y]),
      };
    }
  } catch {
    // handled below
  }
  return {
    label: `EPSG:${code}`,
    transform: null,
    note: `CRS EPSG:${code} is not reprojected; the image may be misplaced.`,
  };
}

function stretch(band, nodata) {
  const values = [];
  const step = Math.max(1, Math.floor(band.length / 50000));
  for (let index = 0; index < band.length; index += step) {
    const value = Number(band[index]);
    if (Number.isFinite(value) && (nodata === null || value !== nodata)) values.push(value);
  }
  if (!values.length) return [0, 1];
  values.sort((a, b) => a - b);
  let low = values[Math.floor(values.length * 0.02)];
  let high = values[Math.floor(values.length * 0.98)];
  if (!(high > low)) {
    low = values[0];
    high = values[values.length - 1];
  }
  if (!(high > low)) high = low + 1;
  return [low, high];
}

function byte(value, low, high) {
  if (!Number.isFinite(value)) return 0;
  const scaled = Math.round(((value - low) / (high - low)) * 255);
  return scaled < 0 ? 0 : scaled > 255 ? 255 : scaled;
}

function hasAlphaBand(fileDirectory) {
  const extra = fileDirectory && fileDirectory.ExtraSamples;
  if (Array.isArray(extra)) return extra.includes(1) || extra.includes(2);
  return extra === 1 || extra === 2;
}

function cornersForBbox(bbox, projection) {
  const [minX, minY, maxX, maxY] = bbox;
  const raw = [
    [minX, maxY], // top left
    [maxX, maxY], // top right
    [maxX, minY], // bottom right
    [minX, minY], // bottom left
  ];
  const corners = raw.map(([x, y]) => {
    if (!projection.transform) return [x, y];
    const [lon, lat] = projection.transform(x, y);
    return [lon, lat];
  });
  for (const corner of corners) {
    if (!Number.isFinite(corner[0]) || !Number.isFinite(corner[1])) {
      throw new Error("Could not transform the GeoTIFF bounds to WGS84.");
    }
  }
  return corners;
}

export async function readGeoTiff(buffer, options = {}) {
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  const tiff = await fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();
  const sourceWidth = image.getWidth();
  const sourceHeight = image.getHeight();
  const maxSize = options.maxSize || MAX_SIZE;
  const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));

  const fileDirectory = image.getFileDirectory ? image.getFileDirectory() : null;
  const sourceBands = image.getSamplesPerPixel();
  const photometric = fileDirectory ? fileDirectory.PhotometricInterpretation : undefined;
  const converted = photometric === 3 || photometric === 5 || photometric === 6 || photometric === 8;
  const data = Buffer.alloc(width * height * 4);
  const notes = [];
  let pixel = 0;
  let range = null;
  let mode = "rgb";

  if (converted) {
    const rgb = await image.readRGB({ width, height, interleave: true, enableAlpha: false });
    if (!rgb || rgb.length < width * height * 3) {
      throw new Error("The GeoTIFF's color bands could not be converted to RGB.");
    }
    for (let index = 0; index < width * height; index++) {
      const red = rgb[index * 3];
      const green = rgb[index * 3 + 1];
      const blue = rgb[index * 3 + 2];
      data[pixel++] = red;
      data[pixel++] = green;
      data[pixel++] = blue;
      // Rotated JPEG footprints commonly leave exact-black corners; showing
      // them transparent keeps the basemap visible around the image.
      data[pixel++] = red === 0 && green === 0 && blue === 0 ? 0 : 255;
    }
    notes.push("Converted to RGB from the TIFF color space.");
  } else {
    const rasters = await image.readRasters({ width, height, interleave: false });
    if (!rasters || !rasters.length) throw new Error("The GeoTIFF has no image bands.");
    const bands = rasters.length;
    const nodataRaw = image.getGDALNoData ? image.getGDALNoData() : null;
    const nodata = nodataRaw === null || nodataRaw === undefined || Number.isNaN(Number(nodataRaw))
      ? null
      : Number(nodataRaw);
    const alphaBand = bands >= 4 && hasAlphaBand(fileDirectory);

    if (bands === 1) {
      const [low, high] = stretch(rasters[0], nodata);
      for (let index = 0; index < rasters[0].length; index++) {
        const value = Number(rasters[0][index]);
        const transparent = nodata !== null && value === nodata;
        let red = 0;
        let green = 0;
        let blue = 0;
        if (!transparent) {
          const [r, g, b] = viridis((value - low) / (high - low));
          red = r;
          green = g;
          blue = b;
        }
        data[pixel++] = red;
        data[pixel++] = green;
        data[pixel++] = blue;
        data[pixel++] = transparent ? 0 : 255;
      }
      notes.push("Single band shown with a continuous color ramp.");
      range = [low, high];
      mode = "continuous";
    } else {
      const ranges = [];
      for (let band = 0; band < 3; band++) ranges.push(stretch(rasters[band], nodata));
      const alphaRange = alphaBand ? stretch(rasters[3], nodata) : null;
      for (let index = 0; index < rasters[0].length; index++) {
        let transparent = false;
        for (let band = 0; band < 3; band++) {
          const value = Number(rasters[band][index]);
          if (nodata !== null && value === nodata) transparent = true;
          data[pixel++] = transparent ? 0 : byte(value, ranges[band][0], ranges[band][1]);
        }
        let alpha = transparent ? 0 : 255;
        if (alphaBand && !transparent) {
          alpha = byte(Number(rasters[3][index]), alphaRange[0], alphaRange[1]);
        }
        data[pixel++] = alpha;
      }
      if (bands > 3 && !alphaBand) notes.push(`Showing bands 1-3 of ${bands}.`);
    }
  }

  if (width !== sourceWidth || height !== sourceHeight) {
    notes.push(`Downsampled from ${sourceWidth}×${sourceHeight}.`);
  }

  const bbox = image.getBoundingBox();
  if (!bbox || bbox.some((value) => !Number.isFinite(Number(value)))) {
    throw new Error("The GeoTIFF is not georeferenced (no usable bounds).");
  }
  const geoKeys = image.getGeoKeys() || {};
  const code = Number(geoKeys.ProjectedCSTypeGeoKey || geoKeys.GeographicTypeGeoKey || 0);
  const projection = projectionForCode(code);
  if (projection.note) notes.push(projection.note);
  const coordinates = cornersForBbox(bbox.map(Number), projection);

  const png = PNG.sync.write({ width, height, data });
  return {
    png: "data:image/png;base64," + png.toString("base64"),
    width,
    height,
    source_width: sourceWidth,
    source_height: sourceHeight,
    bands: sourceBands,
    range,
    mode,
    crs: projection.label,
    coordinates,
    note: notes.join(" "),
  };
}
