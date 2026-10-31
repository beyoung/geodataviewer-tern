// GeoParquet and GeoPackage readers, bundled for the preview generator.
// They run in Node so a large table never touches the Tern window thread.

import { initSync, readParquet } from "parquet-wasm/esm";
import { tableFromIPC } from "apache-arrow";
import initSqlJs from "sql.js";
import proj4 from "proj4";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const MAX_FEATURES = 200000;

let parquetReady = false;
let sqlPromise = null;

function ensureParquet(vendorDir) {
  if (parquetReady) return;
  initSync({ module: readFileSync(join(vendorDir, "parquet_wasm_bg.wasm")) });
  parquetReady = true;
}

function getSql(vendorDir) {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({ locateFile: () => join(vendorDir, "sql-wasm.wasm") });
  }
  return sqlPromise;
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

function projectionForCrsId(code, label) {
  if (!code) return { label: label || "unknown", transform: null, note: "No CRS; coordinates are used as WGS84." };
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
    // handled by the fallback below
  }
  return {
    label: `EPSG:${code}`,
    transform: null,
    note: `CRS EPSG:${code} is not reprojected; features may be misplaced.`,
  };
}

function projectionForParquet(crs) {
  if (!crs) return { label: "OGC:CRS84", transform: null };
  const id = crs.id || {};
  const authority = String(id.authority || "").toUpperCase();
  const code = id.code;
  if (authority === "OGC" && String(code).toUpperCase() === "CRS84") {
    return { label: "OGC:CRS84", transform: null };
  }
  if (authority === "EPSG") {
    return projectionForCrsId(Number(code), `EPSG:${code}`);
  }
  if (typeof crs.wkt === "string" && crs.wkt.trim()) {
    try {
      return {
        label: crs.name || "WKT",
        transform: (x, y) => proj4(crs.wkt, "EPSG:4326", [x, y]),
      };
    } catch {
      // fall through
    }
  }
  return {
    label: crs.name || "unknown",
    transform: null,
    note: "The GeoParquet CRS could not be read; coordinates are used as WGS84.",
  };
}

function projectionForGpkg(srsId, srs) {
  if (srsId === 4326 || srsId === 4979) {
    return { label: `EPSG:${srsId}`, transform: null };
  }
  if (srsId === 0 || srsId === -1 || srsId == null) {
    return { label: "undefined", transform: null, note: "GeoPackage layer has no CRS; coordinates are used as WGS84." };
  }
  const definition = srs && srs.definition && srs.definition !== "undefined" ? srs.definition : null;
  if (definition) {
    try {
      return {
        label: srs.organization ? `${srs.organization}:${srs.organization_coordsys_id || srsId}` : `EPSG:${srsId}`,
        transform: (x, y) => proj4(definition, "EPSG:4326", [x, y]),
      };
    } catch {
      // fall through
    }
  }
  return projectionForCrsId(srsId, `EPSG:${srsId}`);
}

function parseWkb(value) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 0;
  let little = true;

  function u8() {
    if (offset >= view.byteLength) throw new Error("Truncated WKB");
    return view.getUint8(offset++);
  }
  function u32() {
    if (offset + 4 > view.byteLength) throw new Error("Truncated WKB");
    const value = view.getUint32(offset, little);
    offset += 4;
    return value;
  }
  function f64() {
    if (offset + 8 > view.byteLength) throw new Error("Truncated WKB");
    const value = view.getFloat64(offset, little);
    offset += 8;
    return value;
  }
  function coordinate(dimensions) {
    const out = [];
    for (let index = 0; index < dimensions; index++) out.push(f64());
    return out;
  }
  function coordinateList(dimensions) {
    const count = u32();
    const out = [];
    for (let index = 0; index < count; index++) out.push(coordinate(dimensions));
    return out;
  }
  function polygon(dimensions) {
    const count = u32();
    const rings = [];
    for (let index = 0; index < count; index++) rings.push(coordinateList(dimensions));
    return rings;
  }
  function readGeometry() {
    const order = u8();
    little = order === 1;
    let rawType = u32();

    let hasZ = false;
    let hasM = false;
    const ewkbZ = (rawType & 0x80000000) !== 0;
    const ewkbM = (rawType & 0x40000000) !== 0;
    const ewkbSrid = (rawType & 0x20000000) !== 0;
    if (ewkbZ) hasZ = true;
    if (ewkbM) hasM = true;
    let geometryType = rawType & 0x0fffffff;
    if (ewkbSrid) u32();
    if (geometryType >= 1000) {
      const dimensions = Math.floor(geometryType / 1000);
      geometryType %= 1000;
      if (dimensions === 1) hasZ = true;
      if (dimensions === 2) hasM = true;
      if (dimensions === 3) {
        hasZ = true;
        hasM = true;
      }
    }
    const dimensions = 2 + (hasZ ? 1 : 0) + (hasM ? 1 : 0);

    if (geometryType === 1) {
      return { type: "Point", coordinates: coordinate(dimensions) };
    }
    if (geometryType === 2) {
      return { type: "LineString", coordinates: coordinateList(dimensions) };
    }
    if (geometryType === 3) {
      return { type: "Polygon", coordinates: polygon(dimensions) };
    }
    if (geometryType === 4) {
      const count = u32();
      const coordinates = [];
      for (let index = 0; index < count; index++) coordinates.push(readGeometry().coordinates);
      return { type: "MultiPoint", coordinates };
    }
    if (geometryType === 5) {
      const count = u32();
      const coordinates = [];
      for (let index = 0; index < count; index++) coordinates.push(readGeometry().coordinates);
      return { type: "MultiLineString", coordinates };
    }
    if (geometryType === 6) {
      const count = u32();
      const coordinates = [];
      for (let index = 0; index < count; index++) coordinates.push(readGeometry().coordinates);
      return { type: "MultiPolygon", coordinates };
    }
    if (geometryType === 7) {
      const count = u32();
      const geometries = [];
      for (let index = 0; index < count; index++) geometries.push(readGeometry());
      return { type: "GeometryCollection", geometries };
    }
    throw new Error("Unsupported WKB geometry type " + geometryType);
  }

  return readGeometry();
}

function unwrapGeoPackage(bytes) {
  // GeoPackage stores an 8-byte header (GP, version, flags, srs_id) and an
  // optional envelope before the WKB payload.
  if (bytes.length < 8 || bytes[0] !== 0x47 || bytes[1] !== 0x50) return bytes;
  const flags = bytes[3];
  if ((flags & 0x10) !== 0) return null; // empty geometry
  const envelope = (flags >> 1) & 0x07;
  let offset = 8;
  if (envelope === 1) offset += 32;
  else if (envelope === 2) offset += 48;
  else if (envelope === 3) offset += 48;
  else if (envelope === 4) offset += 64;
  return bytes.subarray(offset);
}

function geometryFromValue(value) {
  if (value == null) return null;
  if (typeof value === "object" && typeof value.type === "string" && value.type !== "Topology") {
    return value; // already a GeoJSON geometry
  }
  if (!(value instanceof Uint8Array) && !(value instanceof ArrayBuffer)) return null;
  try {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
    const payload = unwrapGeoPackage(bytes);
    return payload ? parseWkb(payload) : null;
  } catch {
    return null;
  }
}

function transformGeometry(geometry, transform) {
  if (!geometry) return null;
  if (geometry.type === "GeometryCollection") {
    return {
      type: "GeometryCollection",
      geometries: (geometry.geometries || []).map((item) => transformGeometry(item, transform)),
    };
  }
  const walk = (coordinates) => {
    if (!Array.isArray(coordinates)) return coordinates;
    if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
      const [x, y] = transform(coordinates[0], coordinates[1]);
      return coordinates.length > 2 ? [x, y, ...coordinates.slice(2)] : [x, y];
    }
    return coordinates.map(walk);
  };
  return { type: geometry.type, coordinates: walk(geometry.coordinates) };
}

function jsonSafe(value) {
  if (value === null || value === undefined) return value;
  if (typeof value === "bigint") {
    const number = Number(value);
    return Number.isSafeInteger(number) ? number : value.toString();
  }
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array) {
    const text = Buffer.from(value).toString("utf8");
    if (/^[\t\n\r\x20-\x7e]*$/.test(text)) return text;
    return Buffer.from(value).toString("base64");
  }
  if (Array.isArray(value)) return value.map(jsonSafe);
  if (typeof value === "object") {
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = jsonSafe(item);
    return out;
  }
  return value;
}

function featureFromRow(geometryValue, properties, projection) {
  const geometry = geometryFromValue(geometryValue);
  if (!geometry) return null;
  return {
    type: "Feature",
    properties: jsonSafe(properties),
    geometry: projection.transform ? transformGeometry(geometry, projection.transform) : geometry,
  };
}

export async function readGeoParquet(buffer, options) {
  ensureParquet(options.vendorDir);
  const wasmTable = readParquet(buffer);
  const table = tableFromIPC(wasmTable.intoIPCStream());
  const geoRaw = table.schema.metadata && table.schema.metadata.get("geo");
  if (!geoRaw) {
    throw new Error("This Parquet file has no GeoParquet metadata (missing the 'geo' key).");
  }
  let geo;
  try {
    geo = JSON.parse(geoRaw);
  } catch (err) {
    throw new Error("Invalid GeoParquet metadata: " + err.message);
  }
  const columns = geo.columns || {};
  const geometryName = geo.primary_column || Object.keys(columns)[0] || "geometry";
  const geometryField = table.schema.fields.find((field) => field.name === geometryName);
  if (!geometryField) {
    throw new Error("GeoParquet geometry column \"" + geometryName + "\" is missing.");
  }
  const geometryColumn = table.getChild(geometryName);
  const propertyFields = table.schema.fields.filter((field) => field.name !== geometryName);
  const propertyColumns = propertyFields.map((field) => ({ name: field.name, column: table.getChild(field.name) }));
  const projection = projectionForParquet(columns[geometryName] && columns[geometryName].crs);

  const total = Number(table.numRows);
  const limit = Math.min(total, MAX_FEATURES);
  const features = [];
  for (let index = 0; index < limit; index++) {
    const properties = {};
    for (const { name, column } of propertyColumns) {
      const value = column.get(index);
      if (value !== null && value !== undefined) properties[name] = value;
    }
    const feature = featureFromRow(geometryColumn.get(index), properties, projection);
    if (feature) features.push(feature);
  }
  if (!features.length) throw new Error("GeoParquet contains no features with geometry.");

  const note = projection.note || (limit < total ? `Showing ${limit.toLocaleString()} of ${total.toLocaleString()} features.` : null);
  return [{
    name: options.name || "GeoParquet",
    features,
    crs: projection.label,
    note,
  }];
}

function quoteIdent(value) {
  return '"' + String(value).replace(/"/g, '""') + '"';
}

function resultRows(result) {
  if (!result) return [];
  return result.values || [];
}

export async function readGeoPackage(buffer, options) {
  const SQL = await getSql(options.vendorDir);
  const db = new SQL.Database(buffer);
  try {
    let contents;
    try {
      contents = db.exec("SELECT table_name, data_type, identifier, srs_id FROM gpkg_contents")[0];
    } catch {
      throw new Error("This file is not a GeoPackage (gpkg_contents is missing).");
    }
    if (!contents) throw new Error("This GeoPackage has no contents.");

    const geometryColumns = db.exec(
      "SELECT table_name, column_name, geometry_type_name, srs_id FROM gpkg_geometry_columns"
    )[0];
    const geometryByTable = new Map();
    if (geometryColumns) {
      for (const row of resultRows(geometryColumns)) {
        geometryByTable.set(String(row[0]), { column: String(row[1]), srsId: row[3] });
      }
    }

    const srsRows = db.exec(
      "SELECT srs_id, organization, organization_coordsys_id, definition FROM gpkg_spatial_ref_sys"
    )[0];
    const srsById = new Map();
    if (srsRows) {
      for (const row of resultRows(srsRows)) {
        srsById.set(Number(row[0]), {
          organization: row[1],
          organization_coordsys_id: row[2],
          definition: row[3],
        });
      }
    }

    const layers = [];
    let remaining = MAX_FEATURES;
    let tileContents = 0;
    for (const row of resultRows(contents)) {
      const tableName = String(row[0]);
      const dataType = String(row[1] || "");
      if (dataType !== "features") {
        if (dataType === "tiles") tileContents++;
        continue;
      }
      if (remaining <= 0) break;

      const geometryInfo = geometryByTable.get(tableName);
      const geometryColumn = geometryInfo ? geometryInfo.column : "geometry";
      const srsId = Number(geometryInfo ? geometryInfo.srsId : row[3]);
      const projection = projectionForGpkg(srsId, srsById.get(srsId));

      let result;
      try {
        result = db.exec(`SELECT * FROM ${quoteIdent(tableName)} LIMIT ${remaining}`)[0];
      } catch {
        continue;
      }
      if (!result || !result.values || !result.values.length) continue;
      const geometryIndex = result.columns.indexOf(geometryColumn);
      if (geometryIndex < 0) continue;

      const features = [];
      for (const values of result.values) {
        const properties = {};
        for (let index = 0; index < result.columns.length; index++) {
          if (index === geometryIndex) continue;
          const value = values[index];
          if (value !== null && value !== undefined) properties[result.columns[index]] = value;
        }
        const feature = featureFromRow(values[geometryIndex], properties, projection);
        if (feature) features.push(feature);
      }
      if (!features.length) continue;
      remaining -= features.length;

      layers.push({
        name: String(row[2] || tableName),
        features,
        crs: projection.label,
        note: projection.note,
      });
      if (remaining <= 0) break;
    }

    if (!layers.length) {
      if (tileContents) {
        throw new Error("This GeoPackage contains raster tiles; tile layers are not supported yet.");
      }
      throw new Error("GeoPackage contains no vector features.");
    }
    return layers;
  } finally {
    db.close();
  }
}
