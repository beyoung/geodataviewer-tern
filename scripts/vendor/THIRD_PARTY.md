# Bundled Node readers

`vector.cjs`, `raster.cjs`, `sql-wasm.wasm` and `parquet_wasm_bg.wasm` are generated
by `npm run build:vendor` from `scripts/sources/`. They are committed so an installed
Tern plugin needs no npm install at run time.

| Library | Version | License |
| --- | --- | --- |
| [apache-arrow](https://github.com/apache/arrow/tree/main/js) | 21.2.0 | Apache-2.0 |
| [geotiff](https://github.com/geotiffjs/geotiff.js) | 2.1.3 | MIT |
| [parquet-wasm](https://github.com/kylebarron/parquet-wasm) | 0.9.0 | MIT OR Apache-2.0 |
| [pngjs](https://github.com/pngjs/pngjs) | 7.0.0 | MIT |
| [proj4](https://github.com/proj4js/proj4js) | 2.22.0 | MIT |
| [sql.js](https://github.com/sql-js/sql.js) | 1.15.2 | MIT |
| [esbuild](https://github.com/evanw/esbuild) (build only) | 0.25.12 | MIT |

License texts are in `licenses/`; Apache Arrow's NOTICE is `licenses/apache-arrow-NOTICE.txt`.
