# geodataviewer for Tern

Preview common vector geodata files on an interactive map, inside Tern.

Open a GeoJSON, TopoJSON, KML, GPX, WKT, CSV, Shapefile or FlatGeobuf file and press
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> (or run **Preview geodata on a map** from
the command palette). A browser picture-in-picture opens over the file with the data
drawn on a [MapLibre GL JS](https://maplibre.org/) map. Click a feature to inspect its
properties.

The basemap is [OpenFreeMap](https://openfreemap.org/) (`positron` in light appearance,
`dark` in dark appearance). If OpenFreeMap cannot be reached, the features are still drawn
on a plain background and the page says so.

## Requirements

- Tern with plugin support (verified with Tern 0.9.8 on macOS).
- Node.js 18 or newer on `PATH`. The page generator runs in a child process so a large
  dataset never blocks Tern's window thread. Set `TERN_GEODATAVIEWER_NODE` to the Node
  executable when Tern was started without it on `PATH`.

## Install

For a checkout:

```sh
tern plugin link /path/to/geodataviewer-tern
```

From a repository:

```sh
tern plugin install github.com/beyoung/geodataviewer-tern
```

`tern plugin list` should show `geodataviewer ... window ready`.

## Usage

1. Open a supported file in Tern (a file block, or Tern's table view for CSV).
2. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd>, or run **Preview geodata on a map**
   from the command palette (action `plugin.geodataviewer.preview`).
3. Click features to see their properties. Pan and zoom with the mouse.

The same command refreshes the map. Previewing another file in the same window reuses
the map pane and closes the previous one, so only one WebGL map is kept per window.

You can also select a geodata file in the Files pane and click the globe button
**Preview on a map** in its header.

To change the shortcut, bind `plugin.geodataviewer.preview` in Tern's keyboard settings
(the default chord is `ctrl+shift+g`).

## Supported formats

| Format | Extensions | Notes |
| --- | --- | --- |
| GeoJSON | `.geojson`, `.json` | Feature, FeatureCollection, geometry or GeoJSON-in-JSON |
| TopoJSON | `.topojson`, `.json` | Topology objects are converted with `topojson-client` |
| KML | `.kml` | Converted with `@tmcw/togeojson` |
| GPX | `.gpx` | Tracks, routes and waypoints |
| WKT | `.wkt` | `POINT`, `LINESTRING`, `POLYGON`, `MULTI*`, `GEOMETRYCOLLECTION`; one or more per file |
| CSV / TSV | `.csv`, `.tsv` | Columns named like `lat`/`latitude` and `lon`/`lng`/`longitude`, or a WKT/geometry column |
| Shapefile | `.shp` | Reads sibling `.dbf`, `.prj` and `.cpg` (case-insensitive) |
| FlatGeobuf | `.fgb` | Whole-file deserialization |
| Text | `.txt` | Content sniffing for GeoJSON, KML, GPX or WKT |

Coordinates are expected in WGS84 longitude/latitude. A Shapefile `.prj` is handled by
`shpjs`; other projected WKT cannot be reprojected automatically.

## Limits

- Text formats: 64 MiB per file; binary formats: 128 MiB per file.
- Everything is parsed in the browser. Very large feature counts (above 50,000) render,
  but panning and zooming may be slow; the page shows a warning.
- Local files only. A file on a remote host is refused with a notice for now.
- The preview reads the file on disk. Save a file block's edits before previewing.
- The basemap needs network access. Features still render without it.

## Development

Layout:

- `window.luau` — palette command, shortcut, Files pane button.
- `lib/detect.luau` — extension map and user-facing format names.
- `lib/preview.luau` — target discovery, one-map-per-window reuse, Node generator call.
- `scripts/make_preview.mjs` — reads the dataset, embeds it, writes one HTML page.
- `assets/app.js`, `assets/app.css` — MapLibre page: parsing, layers, popups, HUD.
- `assets/vendor/` — vendored MapLibre GL JS, topojson-client, togeojson, shpjs and
  flatgeobuf; licenses are alongside.
- `tests/fixtures/` — small GeoJSON, KML, GPX, WKT and CSV samples.

Type definitions:

```sh
tern plugin types .
```

This writes `tern.d.luau`, which is ignored by git.

Smoke test with the fixtures:

```sh
node scripts/make_preview.mjs tests/fixtures/sample.geojson . /tmp/geodataviewer-preview test
```

Open the reported `file://` URL in Tern with `tern browser` or a browser pane. Saving a
file in a linked plugin folder makes Tern reload the plugin.

## License

MIT. See `LICENSE`. Vendored libraries keep their own licenses in
`assets/vendor/LICENSE-*.txt`; versions and sources are listed in
`assets/vendor/THIRD_PARTY.md`.
