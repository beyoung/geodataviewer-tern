#!/usr/bin/env node
// Generates one self-contained geodataviewer preview page.
// Usage: node make_preview.mjs SOURCE PLUGIN_DIR DATA_DIR WINDOW_TAG
// Prints one JSON line: {ok:true,file,url,format,bytes} or {ok:false,error}.

import {
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";

const [sourceArg, pluginArg, dataArg, tagArg] = process.argv.slice(2);
const tag = tagArg || "";
const MAX_TEXT = 64 * 1024 * 1024;
const MAX_BINARY = 128 * 1024 * 1024;

function fail(message) {
  console.log(JSON.stringify({ ok: false, error: String(message) }));
  process.exitCode = 1;
}

const FORMATS = {
  geojson: "geojson",
  json: "json",
  topojson: "topojson",
  kml: "kml",
  gpx: "gpx",
  wkt: "wkt",
  csv: "csv",
  tsv: "csv",
  shp: "shp",
  fgb: "fgb",
  flatgeobuf: "fgb",
  txt: "sniff",
};

function extensionOf(path) {
  const ext = extname(path);
  return ext ? ext.slice(1).toLowerCase() : "";
}

function formatFor(path) {
  return FORMATS[extensionOf(path)] || null;
}

function sniff(text) {
  const trimmed = text.replace(/^\uFEFF/, "").replace(/^\s+/, "");
  const lower = trimmed.toLowerCase();
  if (trimmed.startsWith("{")) return "json";
  if (lower.includes("<kml") || lower.includes(":kml")) return "kml";
  if (lower.includes("<gpx") || lower.includes(":gpx")) return "gpx";
  if (/^srid\s*=/.test(lower) || /^[a-z]+\s*[zm]*\s*\(/.test(lower) || /^[a-z]+\s+empty/.test(lower)) {
    return "wkt";
  }
  throw new Error("could not recognize this text as GeoJSON, KML, GPX or WKT");
}

function sidecar(path, extension) {
  const directory = dirname(path);
  const name = basename(path);
  const base = name.replace(/\.[^.]*$/, "");
  const wanted = (base + "." + extension).toLowerCase();
  for (const entry of readdirSync(directory)) {
    if (entry.toLowerCase() === wanted) {
      return join(directory, entry);
    }
  }
  return null;
}

function readChecked(path, maxBytes) {
  const size = statSync(path).size;
  if (size > maxBytes) {
    throw new Error(
      basename(path) + " is larger than " + Math.round(maxBytes / (1024 * 1024)) + " MiB"
    );
  }
  return readFileSync(path);
}

function b64(path) {
  return readChecked(path, MAX_BINARY).toString("base64");
}

function escapeJsonForScript(json) {
  return json
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function inlineScript(source) {
  return source.replace(/<\/script/gi, "<\\/script");
}

function inlineStyle(source) {
  return source.replace(/<\/style/gi, "<\\/style");
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[ch]);
}

function main(sourcePath, pluginDir, dataDir, tag) {
  const formatIn = formatFor(sourcePath);
  if (!formatIn) {
    throw new Error(
      "unsupported file type" +
        (extensionOf(sourcePath) ? " ." + extensionOf(sourcePath) : "") +
        "; supported: GeoJSON, TopoJSON, KML, GPX, WKT, CSV/TSV, Shapefile (.shp) and FlatGeobuf (.fgb)"
    );
  }

  const meta = {
    name: basename(sourcePath),
    path: sourcePath,
  };
  let format = formatIn;

  if (format === "sniff") {
    const buffer = readChecked(sourcePath, MAX_TEXT);
    format = sniff(buffer.toString("utf8"));
    meta.source_b64 = buffer.toString("base64");
  } else if (format === "shp") {
    meta.shp = b64(sourcePath);
    const dbf = sidecar(sourcePath, "dbf");
    const prj = sidecar(sourcePath, "prj");
    const cpg = sidecar(sourcePath, "cpg");
    if (dbf) meta.dbf = b64(dbf);
    if (prj) meta.prj = b64(prj);
    if (cpg) meta.cpg = b64(cpg);
  } else if (format === "fgb") {
    meta.fgb = b64(sourcePath);
  } else {
    meta.source_b64 = readChecked(sourcePath, MAX_TEXT).toString("base64");
  }

  const payload = escapeJsonForScript(JSON.stringify({ format, ...meta }));
  const vendor = pathToFileURL(join(pluginDir, "assets", "vendor") + "/").href;
  const app = inlineScript(readFileSync(join(pluginDir, "assets", "app.js"), "utf8"));
  const css = inlineStyle(readFileSync(join(pluginDir, "assets", "app.css"), "utf8"));
  const title = escapeHtml(meta.name);

  const html = [
    "<!doctype html>\n<html lang=\"en\">\n<head>\n",
    "<meta charset=\"utf-8\">\n",
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n",
    "<title>", title, " — geodataviewer</title>\n",
    "<link rel=\"stylesheet\" href=\"", vendor, "maplibre-gl.css\">\n",
    "<style>\n", css, "\n</style>\n",
    "</head>\n<body>\n",
    "<div id=\"map\"></div>\n",
    "<div id=\"hud\"><div id=\"hud-title\">", title, "</div>",
    "<div id=\"hud-stats\">Loading…</div></div>\n",
    "<div id=\"layers\"></div>\n",
    "<div id=\"overlay\" hidden><div id=\"overlay-title\"></div>",
    "<div id=\"overlay-body\"></div></div>\n",
    "<script src=\"", vendor, "maplibre-gl.js\"></script>\n",
    "<script src=\"", vendor, "topojson-client.min.js\"></script>\n",
    "<script src=\"", vendor, "togeojson.umd.js\"></script>\n",
    "<script src=\"", vendor, "shp.min.js\"></script>\n",
    "<script src=\"", vendor, "flatgeobuf-geojson.min.js\"></script>\n",
    "<script>window.__GEODATA__ = ", payload, ";</script>\n",
    "<script>\n", app, "\n</script>\n",
    "</body>\n</html>\n",
  ].join("");

  mkdirSync(dataDir, { recursive: true });
  const digest = createHash("sha1").update(sourcePath + "\0" + tag).digest("hex").slice(0, 8);
  const name = `preview-${digest}-${Date.now()}.html`;
  const destination = join(dataDir, name);
  writeFileSync(destination, html);

  // Keep recent pages (a preview that is still opening must stay readable) and
  // drop the rest on the next run.
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const entry of readdirSync(dataDir)) {
    if (entry === name || !entry.startsWith("preview-") || !entry.endsWith(".html")) {
      continue;
    }
    const full = join(dataDir, entry);
    try {
      if (statSync(full).mtimeMs < cutoff) unlinkSync(full);
    } catch {
      // Another window may still be reading it.
    }
  }

  console.log(
    JSON.stringify({
      ok: true,
      file: destination,
      url: pathToFileURL(destination).href,
      format,
      bytes: Buffer.byteLength(html),
    })
  );
}

if (!sourceArg || !pluginArg || !dataArg) {
  fail("usage: make_preview.mjs SOURCE PLUGIN_DIR DATA_DIR [WINDOW_TAG]");
} else {
  try {
    main(resolve(sourceArg), resolve(pluginArg), resolve(dataArg), tag);
  } catch (err) {
    fail(err && err.message ? err.message : err);
  }
}
