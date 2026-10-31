// Bundles the Node-side GeoParquet/GeoPackage/GeoTIFF readers with their
// dependencies so the installed plugin needs no npm install at run time.
// Run with: npm run build:vendor

import { build } from "esbuild";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scripts = dirname(fileURLToPath(import.meta.url));
const outdir = join(scripts, "vendor");
mkdirSync(outdir, { recursive: true });

const common = {
  bundle: true,
  platform: "node",
  target: "node18",
  sourcemap: false,
  legalComments: "none",
  logLevel: "info",
};

await build({
  ...common,
  format: "cjs",
  entryPoints: [join(scripts, "sources", "vector.mjs")],
  outfile: join(outdir, "vector.cjs"),
});

await build({
  ...common,
  format: "cjs",
  entryPoints: [join(scripts, "sources", "raster.mjs")],
  outfile: join(outdir, "raster.cjs"),
});

copyFileSync(
  join(scripts, "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm"),
  join(outdir, "sql-wasm.wasm")
);
copyFileSync(
  join(scripts, "..", "node_modules", "parquet-wasm", "esm", "parquet_wasm_bg.wasm"),
  join(outdir, "parquet_wasm_bg.wasm")
);

console.log("vendor bundles written to", outdir);
