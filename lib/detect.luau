--!strict
-- Which files the map preview can read, and under which format name.

local M = {}

local EXTENSIONS: { [string]: string } = {
	geojson = "geojson",
	json = "json",
	topojson = "topojson",
	kml = "kml",
	gpx = "gpx",
	wkt = "wkt",
	csv = "csv",
	tsv = "csv",
	shp = "shp",
	fgb = "fgb",
	flatgeobuf = "fgb",
	txt = "sniff",
}

function M.extension(path: string): string
	local name = path:match("[^/\\]+$") or path
	local ext = name:match("%.([^.]+)$")
	return if ext then string.lower(ext) else ""
end

function M.format_for(path: string): string?
	return EXTENSIONS[M.extension(path)]
end

function M.supported_names(): string
	return "GeoJSON, TopoJSON, KML, GPX, WKT, CSV/TSV, Shapefile (.shp) and FlatGeobuf (.fgb)"
end

return M
