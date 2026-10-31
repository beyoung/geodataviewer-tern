/* geodataviewer: parses one vector dataset and draws it with MapLibre GL. */
(() => {
  "use strict";

  const meta = window.__GEODATA__ || {};
  const MAX_PROPS = 60;
  const VALUE_MAX = 800;

  const $ = (id) => document.getElementById(id);
  const hudTitle = $("hud-title");
  const hudStats = $("hud-stats");
  const layersBox = $("layers");
  const legendBox = $("legend");
  const overlay = $("overlay");
  const overlayTitle = $("overlay-title");
  const overlayBody = $("overlay-body");

  const COLORS = [
    "#2f6feb", "#e8590c", "#12805c", "#9c36b5",
    "#c92a2a", "#0b7285", "#5f3dc4", "#2b8a3e",
  ];

  function showError(title, message) {
    if (!overlay) return;
    overlay.hidden = false;
    overlay.classList.add("is-error");
    overlayTitle.textContent = title;
    overlayBody.textContent = message;
  }

  function hideOverlay() {
    if (overlay) overlay.hidden = true;
  }

  function setStats(text) {
    if (hudStats) hudStats.textContent = text;
  }

  if (typeof maplibregl === "undefined") {
    showError("Map library missing", "MapLibre GL JS could not be loaded from the plugin assets.");
    return;
  }

  const prefersDark = !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const STYLE_URL = prefersDark
    ? "https://tiles.openfreemap.org/styles/dark"
    : "https://tiles.openfreemap.org/styles/positron";
  function fallbackStyle() {
    return {
      version: 8,
      name: "geodata-fallback",
      sources: {},
      layers: [{
        id: "gp-background",
        type: "background",
        paint: { "background-color": prefersDark ? "#14181f" : "#eef1f5" },
      }],
    };
  }

  const map = new maplibregl.Map({
    container: "map",
    style: fallbackStyle(),
    center: [12, 28],
    zoom: 1.7,
    maxZoom: 19,
    dragRotate: false,
    pitchWithRotate: false,
    attributionControl: {
      compact: true,
      customAttribution: 'Basemap <a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a>',
    },
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
  map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");
  // Kept for debugging from Tern's browser automation; not part of the UI.
  window.__gpMap = map;

  let started = false;
  let basemapRequested = false;
  let fitted = false;
  let readyTimer = 0;

  function basemapNote(text) {
    if (document.querySelector(".gp-basemap-note")) return;
    const note = document.createElement("div");
    note.className = "gp-note gp-basemap-note";
    note.textContent = text;
    const hud = $("hud");
    if (hud) hud.appendChild(note);
  }

  function onReady() {
    if (started) return;
    started = true;
    clearTimeout(readyTimer);
    start()
      .then(() => loadBasemap())
      .catch((err) => {
        setStats("Could not render");
        showError("Could not preview this file", err && err.message ? err.message : String(err));
      });
  }

  // The blank style is local, so this normally fires at once. The poll covers a
  // webview that does not report it, without adding layers before the style is ready.
  map.on("load", onReady);
  let readyTries = 0;
  function pollReady() {
    if (started) return;
    if (map.isStyleLoaded()) {
      onReady();
      return;
    }
    if (++readyTries < 20) {
      readyTimer = setTimeout(pollReady, 250);
    } else {
      setStats("Could not render");
      showError("Could not initialize the map", "The map style did not load.");
    }
  }
  readyTimer = setTimeout(pollReady, 1000);

  function loadBasemap() {
    if (basemapRequested) return;
    basemapRequested = true;
    const controller = new AbortController();
    const fetchTimer = setTimeout(() => controller.abort(), 6000);
    fetch(STYLE_URL, { signal: controller.signal, mode: "cors" })
      .then((response) => {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then((style) => {
        clearTimeout(fetchTimer);
        const marker = "geodata-openfreemap-" + Date.now();
        style.name = marker;
        let swapped = false;
        let poll = 0;
        const swapTimer = setTimeout(() => {
          if (swapped) return;
          clearInterval(poll);
          basemapNote("Basemap did not finish loading; showing features on a plain background.");
          map.setStyle(fallbackStyle());
          restoreOnStyle("geodata-fallback");
        }, 6000);
        function finishSwap() {
          if (swapped) return;
          swapped = true;
          clearTimeout(swapTimer);
          clearInterval(poll);
          try {
            addDataLayers();
          } catch (err) {
            setStats("Could not render");
            showError("Could not preview this file", err && err.message ? err.message : String(err));
          }
        }
        map.once("style.load", () => {
          const current = map.getStyle && map.getStyle();
          if (current && current.name === marker) finishSwap();
        });
        // MapLibre does not always deliver style.load for a style object in this
        // webview; the style's own name is the reliable signal.
        poll = setInterval(() => {
          const current = map.getStyle && map.getStyle();
          if (current && current.name === marker && map.isStyleLoaded()) finishSwap();
        }, 100);
        map.setStyle(style);
      })
      .catch((err) => {
        clearTimeout(fetchTimer);
        basemapNote(
          "Basemap unavailable (" + (err && err.message ? err.message : "OpenFreeMap could not load") +
          "); showing features only."
        );
      });
  }

  function restoreOnStyle(marker) {
    let restored = false;
    let poll = 0;
    let tries = 0;
    function done() {
      if (restored) return;
      restored = true;
      clearInterval(poll);
      try {
        addDataLayers();
      } catch (err) {
        setStats("Could not render");
        showError("Could not preview this file", err && err.message ? err.message : String(err));
      }
    }
    map.once("style.load", () => {
      const current = map.getStyle && map.getStyle();
      if (current && current.name === marker) done();
    });
    poll = setInterval(() => {
      const current = map.getStyle && map.getStyle();
      if (current && current.name === marker && map.isStyleLoaded()) {
        done();
        return;
      }
      if (++tries > 100) {
        clearInterval(poll);
        setStats("Could not render");
        showError("Could not initialize the map", "The fallback style did not load.");
      }
    }, 100);
  }

  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => map.resize());
  });

  /* ---------- Shared parsing helpers ---------- */

  function base64ToBytes(base64) {
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function decodeText(value) {
    if (!value) return undefined;
    try {
      return new TextDecoder("utf-8", { fatal: false }).decode(base64ToBytes(value));
    } catch (_) {
      return undefined;
    }
  }

  let sourceText = meta.source_b64 ? decodeText(meta.source_b64) : meta.source;
  if (sourceText && sourceText.charCodeAt(0) === 0xfeff) sourceText = sourceText.slice(1);

  function isGeometry(type) {
    return type === "Point" || type === "MultiPoint" ||
      type === "LineString" || type === "MultiLineString" ||
      type === "Polygon" || type === "MultiPolygon" ||
      type === "GeometryCollection";
  }

  function toFeatureList(value, label) {
    if (!value || typeof value !== "object") {
      throw new Error("The document is not a GeoJSON object.");
    }
    if (value.type === "FeatureCollection") {
      if (!Array.isArray(value.features)) {
        throw new Error("FeatureCollection has no features array.");
      }
      return value.features.filter(Boolean);
    }
    if (value.type === "Feature") return [value];
    if (value.type === "Topology") return topologyToFeatures(value);
    if (isGeometry(value.type)) {
      return [{ type: "Feature", properties: {}, geometry: value }];
    }
    if (label) throw new Error(label + " is not GeoJSON, TopoJSON or a geometry.");
    throw new Error("Not a GeoJSON, TopoJSON or geometry document.");
  }

  function topologyToFeatures(topology) {
    if (typeof topojson === "undefined" || !topojson.feature) {
      throw new Error("TopoJSON document found, but the TopoJSON library is missing.");
    }
    const objects = topology.objects || {};
    const features = [];
    for (const key of Object.keys(objects)) {
      let converted;
      try {
        converted = topojson.feature(topology, objects[key]);
      } catch (err) {
        throw new Error("TopoJSON object \"" + key + "\": " + (err && err.message ? err.message : err));
      }
      if (converted.type === "FeatureCollection") {
        for (const feature of converted.features) {
          if (feature) {
            feature.properties = feature.properties || {};
            if (!feature.properties.__topology) feature.properties.__topology = key;
            features.push(feature);
          }
        }
      } else if (converted.type === "Feature") {
        converted.properties = converted.properties || {};
        if (!converted.properties.__topology) converted.properties.__topology = key;
        features.push(converted);
      }
    }
    if (!features.length) throw new Error("TopoJSON contains no objects.");
    return features;
  }

  function parseJson(text) {
    try {
      return JSON.parse(text);
    } catch (err) {
      const m = /position\s+(\d+)/i.exec(err && err.message ? err.message : "");
      const at = m ? " near byte " + m[1] : "";
      throw new Error("Invalid JSON" + at + ": " + (err && err.message ? err.message : err));
    }
  }

  function xmlDocument(text) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    const bad = doc.getElementsByTagName("parsererror");
    if (bad && bad.length) {
      const detail = (bad[0].textContent || "not well-formed XML").trim().split("\n")[0];
      throw new Error("Invalid XML: " + detail);
    }
    return doc;
  }

  function parseKml(text) {
    if (typeof toGeoJSON === "undefined" || !toGeoJSON.kml) {
      throw new Error("KML support library is missing.");
    }
    return toFeatureList(toGeoJSON.kml(xmlDocument(text)), "This KML file");
  }

  function parseGpx(text) {
    if (typeof toGeoJSON === "undefined" || !toGeoJSON.gpx) {
      throw new Error("GPX support library is missing.");
    }
    return toFeatureList(toGeoJSON.gpx(xmlDocument(text)), "This GPX file");
  }

  /* ---------- WKT ---------- */

  function parseWktGeometry(input) {
    const text = input.trim();
    let i = 0;

    function ws() {
      while (i < text.length && /\s/.test(text[i])) i++;
    }
    function fail(what) {
      throw new Error(what + " at character " + (i + 1) + " in WKT.");
    }
    function word() {
      ws();
      const start = i;
      while (i < text.length && /[A-Za-z]/.test(text[i])) i++;
      if (start === i) fail("Expected a geometry type");
      return text.slice(start, i).toUpperCase();
    }
    function number() {
      ws();
      const start = i;
      if (text[i] === "+" || text[i] === "-") i++;
      while (i < text.length && /[0-9]/.test(text[i])) i++;
      if (text[i] === ".") {
        i++;
        while (i < text.length && /[0-9]/.test(text[i])) i++;
      }
      if (text[i] === "e" || text[i] === "E") {
        i++;
        if (text[i] === "+" || text[i] === "-") i++;
        while (i < text.length && /[0-9]/.test(text[i])) i++;
      }
      const token = text.slice(start, i);
      const value = Number(token);
      if (!token || !Number.isFinite(value)) fail("Expected a number");
      return value;
    }
    function expect(ch) {
      ws();
      if (text[i] !== ch) fail("Expected \"" + ch + "\"");
      i++;
    }
    function peek(ch) {
      ws();
      return text[i] === ch;
    }
    function coordinate() {
      const first = number();
      const second = number();
      // Z and M ordinates are optional; MapLibre uses the first two.
      while (!peek(")") && !peek(",")) {
        number();
      }
      return [first, second];
    }
    function point() {
      expect("(");
      const value = coordinate();
      expect(")");
      return value;
    }
    function coordinateList() {
      expect("(");
      const list = [];
      if (peek(")")) {
        i++;
        return list;
      }
      list.push(coordinate());
      while (peek(",")) {
        i++;
        list.push(coordinate());
      }
      expect(")");
      return list;
    }
    function geometry() {
      const type = word();
      ws();
      const dimension = /^(?:ZM|Z|M)(?=\s|\()/i.exec(text.slice(i));
      if (dimension) {
        i += dimension[0].length;
        ws();
      }
      if (text.slice(i, i + 5).toUpperCase() === "EMPTY") {
        i += 5;
        return null;
      }
      if (type === "POINT") {
        return { type: "Point", coordinates: point() };
      }
      if (type === "LINESTRING") {
        return { type: "LineString", coordinates: coordinateList() };
      }
      if (type === "POLYGON") {
        expect("(");
        const rings = [coordinateList()];
        while (peek(",")) {
          i++;
          rings.push(coordinateList());
        }
        expect(")");
        return { type: "Polygon", coordinates: rings };
      }
      if (type === "MULTIPOINT") {
        expect("(");
        const points = [];
        if (!peek(")")) {
          points.push(peek("(") ? point() : coordinate());
          while (peek(",")) { i++; points.push(peek("(") ? point() : coordinate()); }
        }
        expect(")");
        return { type: "MultiPoint", coordinates: points };
      }
      if (type === "MULTILINESTRING") {
        expect("(");
        const lines = [];
        if (!peek(")")) {
          lines.push(coordinateList());
          while (peek(",")) { i++; lines.push(coordinateList()); }
        }
        expect(")");
        return { type: "MultiLineString", coordinates: lines };
      }
      if (type === "MULTIPOLYGON") {
        expect("(");
        const polygons = [];
        if (!peek(")")) {
          for (;;) {
            expect("(");
            const rings = [coordinateList()];
            while (peek(",")) { i++; rings.push(coordinateList()); }
            expect(")");
            polygons.push(rings);
            if (!peek(",")) break;
            i++;
          }
        }
        expect(")");
        return { type: "MultiPolygon", coordinates: polygons };
      }
      if (type === "GEOMETRYCOLLECTION") {
        expect("(");
        const geometries = [];
        if (!peek(")")) {
          geometries.push(geometry());
          while (peek(",")) { i++; geometries.push(geometry()); }
        }
        expect(")");
        return { type: "GeometryCollection", geometries: geometries.filter(Boolean) };
      }
      fail("Unsupported WKT geometry \"" + type + "\"");
    }

    if (/^SRID\s*=/i.test(text)) {
      const srid = /^SRID\s*=\s*(\d+)\s*;\s*/i.exec(text);
      if (!srid) fail("Invalid SRID prefix");
      i = srid[0].length;
    }

    const value = geometry();
    ws();
    if (i < text.length) fail("Unexpected text after the geometry");
    return value;
  }

  function parseWkt(text) {
    const trimmed = text.trim();
    if (!trimmed) throw new Error("The WKT file is empty.");
    const geometries = [];
    try {
      geometries.push(parseWktGeometry(trimmed));
    } catch (wholeError) {
      const lines = trimmed.split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"));
      if (lines.length < 2) throw wholeError;
      for (const line of lines) geometries.push(parseWktGeometry(line));
    }
    const features = [];
    for (const geometry of geometries) {
      if (geometry) features.push({ type: "Feature", properties: {}, geometry });
    }
    if (!features.length) throw new Error("No WKT geometries found.");
    return features;
  }

  /* ---------- CSV / TSV ---------- */

  function detectDelimiter(text) {
    const first = text.split(/\r?\n/, 1)[0] || "";
    const candidates = [",", ";", "\t", "|"];
    let best = ",";
    let bestCount = -1;
    for (const delimiter of candidates) {
      let count = 0;
      let quoted = false;
      for (let i = 0; i < first.length; i++) {
        const ch = first[i];
        if (ch === '"') {
          if (quoted && first[i + 1] === '"') i++;
          else quoted = !quoted;
        } else if (!quoted && ch === delimiter) {
          count++;
        }
      }
      if (count > bestCount) {
        best = delimiter;
        bestCount = count;
      }
    }
    return best;
  }

  function parseDelimited(text, delimiter) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (quoted) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            quoted = false;
          }
        } else {
          field += ch;
        }
      } else if (ch === '"') {
        quoted = true;
      } else if (ch === delimiter) {
        row.push(field);
        field = "";
      } else if (ch === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (ch === "\r") {
        if (text[i + 1] === "\n") i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += ch;
      }
    }
    if (field.length || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows.filter((cells) => cells.some((cell) => cell.trim() !== ""));
  }

  function normalizeHeader(value) {
    return value.replace(/^\uFEFF/, "").trim().toLowerCase().replace(/[\s_-]+/g, "");
  }

  const LAT_KEYS = ["lat", "latitude", "ylat", "latdd", "ycoord", "y"];
  const LON_KEYS = ["lon", "lng", "long", "longitude", "xlon", "londd", "xcoord", "x"];
  const WKT_KEYS = ["wkt", "geometry", "geom", "thegeom"];

  function findColumn(headers, keys) {
    for (const key of keys) {
      for (let i = 0; i < headers.length; i++) {
        if (headers[i] === key) return i;
      }
    }
    for (const key of keys) {
      for (let i = 0; i < headers.length; i++) {
        if (headers[i].includes(key)) return i;
      }
    }
    return -1;
  }

  function parseCsv(text) {
    const delimiter = detectDelimiter(text);
    const rows = parseDelimited(text, delimiter);
    if (rows.length < 2) throw new Error("CSV needs a header row and at least one data row.");
    const headers = rows[0].map(normalizeHeader);
    const latColumn = findColumn(headers, LAT_KEYS);
    const lonColumn = findColumn(headers, LON_KEYS);
    const wktColumn = findColumn(headers, WKT_KEYS);
    if (wktColumn < 0 && (latColumn < 0 || lonColumn < 0)) {
      throw new Error("No latitude/longitude columns found. Headers: " + rows[0].join(", "));
    }

    const features = [];
    for (let r = 1; r < rows.length; r++) {
      const cells = rows[r];
      if (cells.length === 1 && !cells[0].trim()) continue;
      const properties = {};
      for (let c = 0; c < headers.length; c++) {
        if (!headers[c]) continue;
        properties[rows[0][c].replace(/^\uFEFF/, "").trim()] = cells[c] === undefined ? "" : cells[c];
      }
      let geometry = null;
      if (wktColumn >= 0 && cells[wktColumn] && cells[wktColumn].trim()) {
        const value = cells[wktColumn].trim();
        if (/^[A-Za-z]+\s*(\(|EMPTY)/i.test(value)) geometry = parseWktGeometry(value);
        else if (value.startsWith("{")) {
          const parsed = parseJson(value);
          if (parsed.type === "Feature") geometry = parsed.geometry;
          else if (parsed.type === "FeatureCollection") {
            geometry = parsed.features && parsed.features[0] ? parsed.features[0].geometry : null;
          } else if (isGeometry(parsed.type)) geometry = parsed;
        }
      }
      if (!geometry && latColumn >= 0 && lonColumn >= 0) {
        const lat = Number(cells[latColumn]);
        const lon = Number(cells[lonColumn]);
        if (Number.isFinite(lat) && Number.isFinite(lon) &&
            Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
          geometry = { type: "Point", coordinates: [lon, lat] };
        }
      }
      if (geometry) {
        if (geometry.type === "Feature") geometry = geometry.geometry;
        features.push({ type: "Feature", properties: properties, geometry: geometry });
      }
    }
    if (!features.length) throw new Error("No rows with valid coordinates found.");
    return features;
  }

  /* ---------- Shapefile and FlatGeobuf ---------- */

  async function parseShapefile() {
    if (typeof shp === "undefined") throw new Error("Shapefile library is missing.");
    const input = { shp: base64ToBytes(meta.shp) };
    if (meta.dbf) input.dbf = base64ToBytes(meta.dbf);
    if (meta.prj) input.prj = decodeText(meta.prj);
    if (meta.cpg) input.cpg = decodeText(meta.cpg);
    const result = await shp(input);
    if (Array.isArray(result)) {
      return result.map((layer, index) => ({
        name: (layer && layer.fileName) || "Layer " + (index + 1),
        features: toFeatureList(layer),
      }));
    }
    return [{ name: meta.name || "Shapefile", features: toFeatureList(result) }];
  }

  async function parseFlatGeobuf() {
    if (typeof flatgeobuf === "undefined" || !flatgeobuf.deserialize) {
      throw new Error("FlatGeobuf library is missing.");
    }
    const bytes = base64ToBytes(meta.fgb);
    const features = [];
    const stream = flatgeobuf.deserialize(bytes, (id, feature) => feature);
    for await (const feature of stream) {
      if (feature) features.push(feature);
    }
    if (!features.length) throw new Error("FlatGeobuf contains no features.");
    return [{ name: meta.name || "FlatGeobuf", features }];
  }

  /* ---------- Rendering ---------- */

  function countGeometryPoints(geometry) {
    if (!geometry) return 0;
    if (geometry.type === "GeometryCollection") {
      return (geometry.geometries || []).reduce((sum, item) => sum + countGeometryPoints(item), 0);
    }
    const coordinates = geometry.coordinates;
    if (!Array.isArray(coordinates)) return 0;
    let count = 0;
    const walk = (value) => {
      if (!Array.isArray(value)) return;
      if (typeof value[0] === "number") {
        count++;
        return;
      }
      for (const item of value) walk(item);
    };
    walk(coordinates);
    return count;
  }

  function coordinateBounds(features) {
    let west = Infinity;
    let south = Infinity;
    let east = -Infinity;
    let north = -Infinity;
    let found = false;

    function visit(coordinates) {
      if (!Array.isArray(coordinates)) return;
      if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
        const lon = coordinates[0];
        const lat = coordinates[1];
        if (!Number.isFinite(lon) || !Number.isFinite(lat)) return;
        found = true;
        if (lon < west) west = lon;
        if (lon > east) east = lon;
        if (lat < south) south = lat;
        if (lat > north) north = lat;
        return;
      }
      for (const item of coordinates) visit(item);
    }

    for (const feature of features) {
      const geometry = feature && feature.geometry;
      if (!geometry) continue;
      if (geometry.type === "GeometryCollection") {
        for (const item of geometry.geometries || []) visitGeometry(item);
      } else {
        visitGeometry(geometry);
      }
    }
    function visitGeometry(geometry) {
      if (!geometry) return;
      if (geometry.type === "GeometryCollection") {
        for (const item of geometry.geometries || []) visitGeometry(item);
      } else {
        visit(geometry.coordinates);
      }
    }
    return found ? [[west, south], [east, north]] : null;
  }

  function formatValue(value) {
    if (value === null) return "null";
    if (value === undefined) return "";
    if (typeof value === "object") {
      let text;
      try {
        text = JSON.stringify(value);
      } catch (_) {
        text = String(value);
      }
      return text.length > VALUE_MAX ? text.slice(0, VALUE_MAX) + "…" : text;
    }
    const text = String(value);
    return text.length > VALUE_MAX ? text.slice(0, VALUE_MAX) + "…" : text;
  }

  function popupTitle(properties, datasetName) {
    for (const key of ["name", "Name", "NAME", "title", "Title", "TITLE", "label", "id"]) {
      if (properties && properties[key] !== undefined && properties[key] !== null &&
          String(properties[key]).trim()) {
        return String(properties[key]);
      }
    }
    return datasetName || "Feature";
  }

  function popupContent(feature, datasetName) {
    const root = document.createElement("div");
    root.className = "gp-popup";

    const properties = feature.properties || {};
    const geometryType = feature.geometry && feature.geometry.type ? feature.geometry.type : "Feature";

    const title = document.createElement("div");
    title.className = "gp-popup-title";
    title.textContent = popupTitle(properties, datasetName);
    root.appendChild(title);

    const sub = document.createElement("div");
    sub.className = "gp-popup-sub";
    sub.textContent = geometryType + (datasetName ? " · " + datasetName : "");
    root.appendChild(sub);

    const keys = Object.keys(properties).filter((key) => !key.startsWith("__"));
    if (!keys.length) {
      const none = document.createElement("div");
      none.className = "gp-popup-empty";
      none.textContent = "No properties";
      root.appendChild(none);
      return root;
    }

    const table = document.createElement("table");
    table.className = "gp-props";
    for (const key of keys.slice(0, MAX_PROPS)) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.textContent = key;
      const td = document.createElement("td");
      td.textContent = formatValue(properties[key]);
      tr.appendChild(th);
      tr.appendChild(td);
      table.appendChild(tr);
    }
    root.appendChild(table);
    if (keys.length > MAX_PROPS) {
      const more = document.createElement("div");
      more.className = "gp-popup-empty";
      more.textContent = "… " + (keys.length - MAX_PROPS) + " more properties";
      root.appendChild(more);
    }
    return root;
  }

  const CATEGORICAL_PALETTE = [
    "#2563eb", "#f97316", "#0d9488", "#a855f7", "#dc2626",
    "#0891b2", "#ca8a04", "#16a34a", "#db2777", "#64748b",
  ];
  const SEQUENTIAL_PALETTE = [
    "#eff6ff", "#bfdbfe", "#93c5fd", "#60a5fa",
    "#3b82f6", "#2563eb", "#1d4ed8", "#1e3a8a",
  ];
  const VIRIDIS = [
    "#440154", "#482878", "#3e4989", "#31688e", "#26828e",
    "#1f9e89", "#35b779", "#6ece58", "#b5de2b", "#fde725",
  ];
  const CLUSTER_THRESHOLD = 4000;
  const MAX_ANALYZE = 5000;
  const CATEGORICAL_HINTS = [
    "type", "kind", "category", "class", "group", "status", "zone", "use",
    "landuse", "landcover", "amenity", "highway", "building", "surface",
    "road", "railway", "water", "natural", "leisure", "boundary", "admin",
    "place", "layer", "network", "route", "mode",
  ];
  const NUMERIC_HINTS = [
    "value", "population", "pop", "count", "area", "density", "height",
    "elevation", "score", "rate", "amount", "total", "length", "width",
    "capacity", "visitors", "price", "volume", "flow", "speed", "temp",
  ];
  const SKIP_KEY = /^(__|bbox$|xmin$|ymin$|xmax$|ymax$|id$|fid$|gid$|objectid$|osm_id$|code$|zip$|postcode$|lat$|latitude$|lon$|lng$|longitude$|x$|y$)/i;

  function prettyKey(key) {
    return String(key).replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function formatNumber(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return String(value);
    if (Math.abs(number) >= 1000) {
      return number.toLocaleString(undefined, { maximumFractionDigits: 1 });
    }
    return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  function detectGeometryKind(features) {
    let points = 0;
    let lines = 0;
    let polygons = 0;
    let other = 0;
    for (const feature of features) {
      const type = feature && feature.geometry && feature.geometry.type;
      if (!type) continue;
      if (type === "Point" || type === "MultiPoint") points++;
      else if (type === "LineString" || type === "MultiLineString") lines++;
      else if (type === "Polygon" || type === "MultiPolygon") polygons++;
      else other++;
    }
    const total = points + lines + polygons + other;
    if (!total) return "unknown";
    if (points === total) return "point";
    if (lines === total) return "line";
    if (polygons === total) return "polygon";
    if (points > 0 && lines === 0 && polygons === 0 && other === 0) return "point";
    return "mixed";
  }

  function chooseLayerStyle(features, geometryKind, defaultColor) {
    const defaultStyle = {
      mode: "default", field: null, label: null, color: defaultColor,
      colors: null, min: null, max: null, categories: null,
    };
    if (!features.length || geometryKind === "unknown") {
      return defaultStyle;
    }

    const sample = features.slice(0, MAX_ANALYZE);
    const keys = new Map();
    for (const feature of sample) {
      const properties = feature.properties || {};
      for (const [key, raw] of Object.entries(properties)) {
        if (!key || key.startsWith("__") || SKIP_KEY.test(key)) continue;
        let entry = keys.get(key);
        if (!entry) {
          entry = { key, nonEmpty: 0, strings: new Set(), numerics: [], objects: 0, total: sample.length };
          keys.set(key, entry);
        }
        if (raw === null || raw === undefined || raw === "") continue;
        entry.nonEmpty++;
        if (typeof raw === "object") {
          entry.objects++;
          continue;
        }
        const text = String(raw).trim();
        if (!text) continue;
        if (entry.strings.size <= 32) entry.strings.add(text);
        const numeric = Number(raw);
        if (Number.isFinite(numeric)) entry.numerics.push(numeric);
      }
    }

    let bestCategory = null;
    let bestNumeric = null;
    for (const entry of keys.values()) {
      const nonEmptyRatio = entry.nonEmpty / entry.total;
      if (nonEmptyRatio < 0.55) continue;
      const keyLower = entry.key.toLowerCase();
      const nameLike = /(^|_)(name|title|label|description|desc|address|street|city|town|village)($|_)/i.test(keyLower);
      if (nameLike) continue;
      const categoryHint = CATEGORICAL_HINTS.some((hint) => keyLower === hint || keyLower.includes(hint));
      const numericHint = NUMERIC_HINTS.some((hint) => keyLower === hint || keyLower.includes(hint));

      const numericFraction = entry.nonEmpty === 0 ? 0 : entry.numerics.length / entry.nonEmpty;
      if (entry.objects === 0 && numericFraction < 0.8 && entry.strings.size >= 2 && entry.strings.size <= 10) {
        const score = (entry.strings.size <= 6 ? 3 : 2) + (categoryHint ? 2 : 0) + (nonEmptyRatio >= 0.9 ? 1 : 0);
        if (!bestCategory || score > bestCategory.score) bestCategory = { entry, score };
      }

      const numericDistinct = new Set(entry.numerics).size;
      if (entry.numerics.length >= entry.total * 0.7 && numericDistinct >= 4) {
        const score = (entry.numerics.length >= entry.total * 0.9 ? 2 : 1)
          + (numericDistinct >= 8 ? 1 : 0)
          + (numericHint ? 2 : 0);
        if (!bestNumeric || score > bestNumeric.score) bestNumeric = { entry, score };
      }
    }

    const useNumeric = bestNumeric && (
      geometryKind === "point" || geometryKind === "mixed"
        ? !bestCategory
        : (!bestCategory || bestNumeric.score >= bestCategory.score)
    );
    const chosen = useNumeric
      ? { entry: bestNumeric.entry, type: "numeric" }
      : bestCategory
        ? { entry: bestCategory.entry, type: "categorical" }
        : null;

    if (!chosen) return defaultStyle;

    if (chosen.type === "categorical") {
      const counts = new Map();
      for (const feature of sample) {
        const raw = feature.properties && feature.properties[chosen.entry.key];
        if (raw === null || raw === undefined || raw === "" || typeof raw === "object") continue;
        const value = String(raw);
        counts.set(value, (counts.get(value) || 0) + 1);
      }
      const categories = Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([value], index) => ({
          value,
          label: value.length > 28 ? value.slice(0, 27) + "…" : value,
          color: CATEGORICAL_PALETTE[index % CATEGORICAL_PALETTE.length],
        }));
      return {
        mode: "categorical",
        field: chosen.entry.key,
        label: prettyKey(chosen.entry.key),
        categories,
        colors: null,
        min: null,
        max: null,
        color: categories.length ? categories[0].color : defaultColor,
      };
    }

    const numerics = chosen.entry.numerics.slice().sort((a, b) => a - b);
    let low = numerics[Math.floor(numerics.length * 0.02)];
    let high = numerics[Math.floor(numerics.length * 0.98)];
    if (!(high > low)) {
      low = numerics[0];
      high = numerics[numerics.length - 1];
    }
    if (!(high > low)) high = low + 1;
    const palette = geometryKind === "point" || geometryKind === "mixed" ? VIRIDIS : SEQUENTIAL_PALETTE;
    return {
      mode: "numeric",
      field: chosen.entry.key,
      label: prettyKey(chosen.entry.key),
      categories: null,
      colors: palette,
      min: low,
      max: high,
      color: palette[Math.floor(palette.length / 2)],
    };
  }

  function styleColorExpression(style) {
    if (!style) return null;
    if (style.mode === "categorical") {
      const expression = ["match", ["to-string", ["get", style.field]]];
      for (const item of style.categories) expression.push(item.value, item.color);
      expression.push("#94a3b8");
      return expression;
    }
    if (style.mode === "numeric") {
      const expression = ["interpolate", ["linear"], ["to-number", ["get", style.field], style.min]];
      for (let index = 0; index < style.colors.length; index++) {
        const t = style.colors.length === 1 ? 0.5 : index / (style.colors.length - 1);
        expression.push(style.min + (style.max - style.min) * t, style.colors[index]);
      }
      return expression;
    }
    return null;
  }

  function fillPaint(dataset) {
    return {
      "fill-color": styleColorExpression(dataset.style) || dataset.color,
      "fill-opacity": dataset.style.mode === "default" ? 0.24 : 0.58,
      "fill-outline-color": "rgba(15,23,42,0.35)",
    };
  }

  function linePaint(dataset) {
    return {
      "line-color": styleColorExpression(dataset.style) || dataset.color,
      "line-width": 2.2,
      "line-opacity": 0.92,
    };
  }

  function circlePaint(dataset) {
    const style = dataset.style;
    const radius = style.mode === "numeric"
      ? ["interpolate", ["linear"], ["to-number", ["get", style.field], style.min], style.min, 4, style.max, 12]
      : 6;
    return {
      "circle-color": styleColorExpression(style) || dataset.color,
      "circle-radius": radius,
      "circle-opacity": 0.95,
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 1.4,
      "circle-stroke-opacity": 0.95,
    };
  }

  function clusterCirclePaint() {
    return {
      "circle-color": ["step", ["get", "point_count"], "#60a5fa", 10, "#3b82f6", 50, "#2563eb", 200, "#1e40af"],
      "circle-radius": ["step", ["get", "point_count"], 14, 10, 18, 50, 24, 200, 30],
      "circle-opacity": 0.92,
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 1.6,
      "circle-stroke-opacity": 0.95,
    };
  }

  let cachedBasemapFont = null;
  function basemapFont() {
    if (cachedBasemapFont) return cachedBasemapFont;
    try {
      const style = map.getStyle();
      for (const layer of style.layers || []) {
        if (layer.type === "symbol" && layer.layout && Array.isArray(layer.layout["text-font"])) {
          cachedBasemapFont = layer.layout["text-font"];
          return cachedBasemapFont;
        }
      }
    } catch {
      // fall through
    }
    cachedBasemapFont = ["Noto Sans Regular"];
    return cachedBasemapFont;
  }

  function clusterTextLayout() {
    return {
      "text-field": ["get", "point_count_abbreviated"],
      "text-font": basemapFont(),
      "text-size": ["step", ["get", "point_count"], 11, 10, 12, 100, 14],
      "text-allow-overlap": true,
      "text-ignore-placement": true,
    };
  }

  function fitWithHud(bounds, maxZoom) {
    const width = map.getContainer().clientWidth || 800;
    const left = Math.min(320, Math.max(32, width * 0.32));
    map.fitBounds(bounds, {
      padding: { top: 96, right: 40, bottom: 56, left },
      maxZoom,
      duration: 0,
    });
  }

  function prepareDataset(dataset, index) {
    const features = dataset.features || [];
    const sourceId = "gp-source-" + index;
    const defaultColor = COLORS[index % COLORS.length];
    const geometryKind = detectGeometryKind(features);
    const style = chooseLayerStyle(features, geometryKind, defaultColor);
    const clustered = geometryKind === "point" && features.length > CLUSTER_THRESHOLD;
    let labelField = null;
    if (!clustered && geometryKind === "point" && features.length <= 200) {
      const properties = (features.find((feature) => feature.properties) || {}).properties || {};
      labelField = ["name", "Name", "NAME", "title", "Title", "label", "Label"].find((key) => {
        const value = properties[key];
        return value !== undefined && value !== null && String(value).trim() !== "";
      }) || null;
    }
    const layerIds = clustered
      ? [sourceId + "-clusters", sourceId + "-cluster-count", sourceId + "-points"]
      : geometryKind === "point"
        ? labelField
          ? [sourceId + "-circle", sourceId + "-labels"]
          : [sourceId + "-circle"]
        : geometryKind === "line"
          ? [sourceId + "-line"]
          : geometryKind === "polygon"
            ? [sourceId + "-fill", sourceId + "-line"]
            : [sourceId + "-fill", sourceId + "-line", sourceId + "-circle"];
    return {
      name: dataset.name || "Layer " + (index + 1),
      color: style.color || defaultColor,
      sourceId,
      layerIds,
      features,
      visible: true,
      geometryKind,
      style,
      clustered,
      labelField,
    };
  }

  const datasets = [];
  const layerIndex = new Map();

  function addHudNote(text) {
    if (!text) return;
    const note = document.createElement("div");
    note.className = "gp-note";
    note.textContent = text;
    const hud = $("hud");
    if (hud) hud.appendChild(note);
  }

  function addRasterLayer() {
    const raster = meta.raster;
    if (!raster) return;
    if (map.getLayer("gp-raster-layer")) map.removeLayer("gp-raster-layer");
    if (map.getSource("gp-raster")) map.removeSource("gp-raster");
    map.addSource("gp-raster", {
      type: "image",
      url: raster.png,
      coordinates: raster.coordinates,
    });
    map.addLayer({
      id: "gp-raster-layer",
      type: "raster",
      source: "gp-raster",
      paint: { "raster-opacity": 0.9, "raster-fade-duration": 0 },
    });
  }

  function rasterBounds() {
    const coordinates = meta.raster && meta.raster.coordinates;
    if (!coordinates || !coordinates.length) return null;
    let west = Infinity;
    let south = Infinity;
    let east = -Infinity;
    let north = -Infinity;
    for (const [lon, lat] of coordinates) {
      west = Math.min(west, lon);
      east = Math.max(east, lon);
      south = Math.min(south, lat);
      north = Math.max(north, lat);
    }
    return [[west, south], [east, north]];
  }

  function showLegend(legend) {
    if (!legendBox) return;
    if (!legend) {
      legendBox.hidden = true;
      legendBox.textContent = "";
      return;
    }
    legendBox.hidden = false;
    legendBox.textContent = "";

    const title = document.createElement("div");
    title.className = "gp-legend-title";
    title.textContent = legend.title;
    legendBox.appendChild(title);

    if (legend.subtitle) {
      const sub = document.createElement("div");
      sub.className = "gp-legend-sub";
      sub.textContent = legend.subtitle;
      legendBox.appendChild(sub);
    }

    if (legend.type === "categorical") {
      const list = document.createElement("div");
      list.className = "gp-legend-items";
      for (const item of legend.items.slice(0, 8)) {
        const row = document.createElement("div");
        row.className = "gp-legend-row";
        const swatch = document.createElement("i");
        swatch.className = "gp-swatch";
        swatch.style.background = item.color;
        const label = document.createElement("span");
        label.textContent = item.label;
        row.appendChild(swatch);
        row.appendChild(label);
        list.appendChild(row);
      }
      if (legend.items.length > 8) {
        const more = document.createElement("div");
        more.className = "gp-legend-sub";
        more.textContent = "… " + (legend.items.length - 8) + " more";
        list.appendChild(more);
      }
      legendBox.appendChild(list);
      return;
    }

    if (legend.type === "numeric" || legend.type === "rgb") {
      const gradient = document.createElement("div");
      gradient.className = "gp-legend-gradient";
      gradient.style.background = "linear-gradient(90deg, " + legend.colors.join(", ") + ")";
      legendBox.appendChild(gradient);
      if (legend.type === "numeric") {
        const labels = document.createElement("div");
        labels.className = "gp-legend-labels";
        const low = document.createElement("span");
        low.textContent = formatNumber(legend.min);
        const high = document.createElement("span");
        high.textContent = formatNumber(legend.max);
        labels.appendChild(low);
        labels.appendChild(high);
        legendBox.appendChild(labels);
      } else {
        const labels = document.createElement("div");
        labels.className = "gp-legend-labels";
        labels.innerHTML = "<span>R</span><span>G</span><span>B</span>";
        legendBox.appendChild(labels);
      }
    }
  }

  function legendForDataset(dataset) {
    const style = dataset.style;
    if (style.mode === "categorical") {
      return {
        type: "categorical",
        title: style.label,
        subtitle: "Categories",
        items: style.categories,
      };
    }
    if (style.mode === "numeric") {
      return {
        type: "numeric",
        title: style.label,
        subtitle: "Value",
        colors: style.colors,
        min: style.min,
        max: style.max,
      };
    }
    return null;
  }

  function addDataLayers() {
    layerIndex.clear();
    for (const dataset of datasets) {
      for (const id of dataset.layerIds) {
        if (map.getLayer(id)) map.removeLayer(id);
      }
      if (map.getSource(dataset.sourceId)) map.removeSource(dataset.sourceId);

      const data = { type: "FeatureCollection", features: dataset.features };
      const visibility = dataset.visible ? "visible" : "none";
      const fillId = dataset.sourceId + "-fill";
      const lineId = dataset.sourceId + "-line";
      const circleId = dataset.sourceId + "-circle";

      if (dataset.clustered) {
        map.addSource(dataset.sourceId, {
          type: "geojson",
          data: data,
          cluster: true,
          clusterMaxZoom: 12,
          clusterRadius: 48,
        });
        map.addLayer({
          id: dataset.layerIds[0],
          type: "circle",
          source: dataset.sourceId,
          filter: ["has", "point_count"],
          paint: clusterCirclePaint(),
          layout: { visibility },
        });
        const styled = map.getStyle && map.getStyle();
        if (styled && styled.glyphs) {
          map.addLayer({
            id: dataset.layerIds[1],
            type: "symbol",
            source: dataset.sourceId,
            filter: ["has", "point_count"],
            layout: { visibility, ...clusterTextLayout() },
            paint: {
              "text-color": "#ffffff",
              "text-halo-color": "rgba(15,23,42,0.45)",
              "text-halo-width": 1,
            },
          });
          layerIndex.set(dataset.layerIds[1], { dataset: dataset, cluster: true, name: dataset.name });
        }
        map.addLayer({
          id: dataset.layerIds[2],
          type: "circle",
          source: dataset.sourceId,
          filter: ["!", ["has", "point_count"]],
          paint: circlePaint(dataset),
          layout: { visibility },
        });
        layerIndex.set(dataset.layerIds[0], { dataset: dataset, cluster: true, name: dataset.name });
        layerIndex.set(dataset.layerIds[2], { dataset: dataset, name: dataset.name });
        continue;
      }

      map.addSource(dataset.sourceId, { type: "geojson", data: data });
      const kind = dataset.geometryKind;
      if (kind === "polygon" || kind === "mixed" || kind === "unknown") {
        map.addLayer({
          id: fillId,
          type: "fill",
          source: dataset.sourceId,
          filter: ["==", ["geometry-type"], "Polygon"],
          paint: fillPaint(dataset),
          layout: { visibility },
        });
        layerIndex.set(fillId, { dataset: dataset, name: dataset.name });
      }
      if (kind === "polygon" || kind === "line" || kind === "mixed" || kind === "unknown") {
        map.addLayer({
          id: lineId,
          type: "line",
          source: dataset.sourceId,
          filter: ["in", ["geometry-type"], ["literal", ["Polygon", "LineString"]]],
          paint: linePaint(dataset),
          layout: { visibility, "line-join": "round", "line-cap": "round" },
        });
        layerIndex.set(lineId, { dataset: dataset, name: dataset.name });
      }
      if (kind === "point" || kind === "mixed" || kind === "unknown") {
        map.addLayer({
          id: circleId,
          type: "circle",
          source: dataset.sourceId,
          filter: ["==", ["geometry-type"], "Point"],
          paint: circlePaint(dataset),
          layout: { visibility },
        });
        layerIndex.set(circleId, { dataset: dataset, name: dataset.name });
        const styled = map.getStyle && map.getStyle();
        if (dataset.labelField && styled && styled.glyphs) {
          const labelId = dataset.sourceId + "-labels";
          map.addLayer({
            id: labelId,
            type: "symbol",
            source: dataset.sourceId,
            filter: ["==", ["geometry-type"], "Point"],
            layout: {
              visibility,
              "text-field": ["to-string", ["get", dataset.labelField]],
              "text-font": basemapFont(),
              "text-size": 11,
              "text-offset": [0, 1.15],
              "text-anchor": "top",
              "text-allow-overlap": false,
              "text-optional": true,
              "text-max-width": 8,
            },
            paint: {
              "text-color": "#0f172a",
              "text-halo-color": "#ffffff",
              "text-halo-width": 1.4,
            },
          });
          layerIndex.set(labelId, { dataset: dataset, name: dataset.name });
        }
      }
    }
    if (meta.raster) addRasterLayer();
    buildLayersBox();
  }

  function buildLayersBox() {
    if (!layersBox) return;
    layersBox.textContent = "";
    if (datasets.length < 2) return;
    datasets.forEach((dataset) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = dataset.visible;
      input.addEventListener("change", () => {
        dataset.visible = input.checked;
        for (const id of dataset.layerIds) {
          if (map.getLayer(id)) {
            map.setLayoutProperty(id, "visibility", input.checked ? "visible" : "none");
          }
        }
      });
      const dot = document.createElement("i");
      dot.className = "gp-dot";
      dot.style.background = dataset.color;
      const text = document.createElement("span");
      text.textContent = dataset.name;
      label.appendChild(input);
      label.appendChild(dot);
      label.appendChild(text);
      layersBox.appendChild(label);
    });
  }

  function render(layers) {
    if (meta.raster) {
      addRasterLayer();
      if (!fitted) {
        const bounds = rasterBounds();
        if (!bounds) throw new Error("The raster has no usable bounds.");
        const [[west, south], [east, north]] = bounds;
        if (west === east && south === north) {
          map.jumpTo({ center: [west, south], zoom: 12 });
        } else {
          fitWithHud(bounds, 15);
        }
        const raster = meta.raster;
        const parts = [raster.width.toLocaleString() + "×" + raster.height.toLocaleString()];
        if (raster.source_width && (raster.source_width !== raster.width || raster.source_height !== raster.height)) {
          parts.push("from " + raster.source_width.toLocaleString() + "×" + raster.source_height.toLocaleString());
        }
        parts.push(raster.bands + (raster.bands === 1 ? " band" : " bands"));
        if (raster.crs) parts.push(raster.crs);
        setStats(parts.join(" · "));
        if (raster.mode === "continuous" && Array.isArray(raster.range)) {
          showLegend({
            type: "numeric",
            title: "Band 1",
            subtitle: "Continuous",
            colors: VIRIDIS,
            min: raster.range[0],
            max: raster.range[1],
          });
        } else {
          showLegend({
            type: "rgb",
            title: "RGB",
            subtitle: raster.bands === 1 ? "Color mapped" : raster.bands + " bands",
            colors: ["#ef4444", "#22c55e", "#3b82f6"],
          });
        }
        for (const note of meta.notes || []) addHudNote(note);
        document.body.classList.add("gp-ready");
        hideOverlay();
        fitted = true;
      }
      return;
    }

    if (!layers || !layers.length) throw new Error("The file contains no layers.");
    if (!datasets.length) {
      for (let i = 0; i < layers.length; i++) {
        datasets.push(prepareDataset(layers[i], i));
      }
    }

    addDataLayers();

    if (fitted) return;

    let combined = null;
    let totalFeatures = 0;
    let totalPoints = 0;
    for (const dataset of datasets) {
      totalFeatures += dataset.features.filter((feature) => feature && feature.geometry).length;
      for (const feature of dataset.features) {
        totalPoints += countGeometryPoints(feature && feature.geometry);
      }
      const datasetBounds = coordinateBounds(dataset.features);
      if (!datasetBounds) continue;
      if (!combined) {
        combined = datasetBounds;
      } else {
        combined[0][0] = Math.min(combined[0][0], datasetBounds[0][0]);
        combined[0][1] = Math.min(combined[0][1], datasetBounds[0][1]);
        combined[1][0] = Math.max(combined[1][0], datasetBounds[1][0]);
        combined[1][1] = Math.max(combined[1][1], datasetBounds[1][1]);
      }
    }

    if (!combined) {
      throw new Error("The features have no usable coordinates.");
    }

    const singlePoint = combined[0][0] === combined[1][0] && combined[0][1] === combined[1][1];
    if (singlePoint) {
      map.jumpTo({ center: combined[0], zoom: 12 });
    } else {
      fitWithHud(combined, 14);
    }

    const parts = [];
    parts.push(totalFeatures.toLocaleString() + (totalFeatures === 1 ? " feature" : " features"));
    if (totalPoints && totalPoints !== totalFeatures) {
      parts.push(totalPoints.toLocaleString() + " vertices");
    }
    if (datasets.length > 1) parts.push(datasets.length + " layers");
    if (datasets.some((dataset) => dataset.clustered)) parts.push("clustered");
    setStats(parts.join(" · "));

    showLegend(datasets.length === 1 ? legendForDataset(datasets[0]) : null);
    for (const note of meta.notes || []) addHudNote(note);
    if (datasets.some((dataset) => dataset.clustered)) {
      addHudNote("Points are clustered; click a cluster to zoom in.");
    }
    document.body.classList.add("gp-ready");
    hideOverlay();
    fitted = true;

    if (totalFeatures > 50000) addHudNote("Large dataset: panning and zooming may be slow.");
  }

  function visibleLayerIds() {
    const ids = [];
    for (const dataset of datasets) {
      if (!dataset.visible) continue;
      for (const id of dataset.layerIds) {
        if (map.getLayer(id)) ids.push(id);
      }
    }
    return ids;
  }

  map.on("click", (event) => {
    const ids = visibleLayerIds();
    if (!ids.length) return;
    const features = map.queryRenderedFeatures(event.point, { layers: ids });
    if (!features.length) return;
    const feature = features[0];
    const info = layerIndex.get(feature.layer.id);
    if (info && info.cluster) {
      const source = map.getSource(info.dataset.sourceId);
      const clusterId = feature.properties && feature.properties.cluster_id;
      if (source && source.getClusterExpansionZoom && clusterId !== undefined) {
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          map.easeTo({
            center: feature.geometry.coordinates,
            zoom: Math.min(zoom + 0.5, 16),
            duration: 380,
          });
        });
      }
      return;
    }
    const popup = new maplibregl.Popup({ maxWidth: "460px", minWidth: "220px" })
      .setLngLat(event.lngLat)
      .setDOMContent(popupContent(feature, info ? info.name : ""))
      .addTo(map);
    void popup;
  });

  map.on("mousemove", (event) => {
    const ids = visibleLayerIds();
    const canvas = map.getCanvas();
    if (!ids.length) {
      canvas.style.cursor = "";
      return;
    }
    const features = map.queryRenderedFeatures(event.point, { layers: ids });
    canvas.style.cursor = features.length ? "pointer" : "";
  });

  /* ---------- Entry ---------- */

  function fileName(path) {
    const parts = String(path || "").replace(/\\/g, "/").split("/");
    return parts[parts.length - 1] || "geodataviewer";
  }

  if (hudTitle) hudTitle.textContent = meta.name || fileName(meta.path);
  document.title = (meta.name || fileName(meta.path)) + " — geodataviewer";

  async function parse() {
    if (meta.raster) return [];
    if (Array.isArray(meta.layers)) {
      if (!meta.layers.length) throw new Error("The file contains no layers.");
      return meta.layers;
    }
    const format = String(meta.format || "").toLowerCase();
    if (!sourceText && !meta.shp && !meta.fgb) {
      throw new Error("No data was supplied to the preview.");
    }
    if (format === "shp") return parseShapefile();
    if (format === "fgb" || format === "flatgeobuf") return parseFlatGeobuf();
    if (format === "kml") return [{ name: meta.name || "KML", features: parseKml(sourceText) }];
    if (format === "gpx") return [{ name: meta.name || "GPX", features: parseGpx(sourceText) }];
    if (format === "wkt") return [{ name: meta.name || "WKT", features: parseWkt(sourceText) }];
    if (format === "csv" || format === "tsv") return [{ name: meta.name || "CSV", features: parseCsv(sourceText) }];
    const root = parseJson(sourceText);
    return [{ name: meta.name || "GeoJSON", features: toFeatureList(root) }];
  }

  const dataPromise = parse().then((layers) => {
    hideOverlay();
    return layers;
  }).catch((err) => {
    setStats("Could not render");
    showError("Could not preview this file", err && err.message ? err.message : String(err));
    throw err;
  });

  function start() {
    return dataPromise.then(render);
  }
})();
