--!strict
-- Turns the focused geodata file into a MapLibre page and opens it as a browser
-- picture-in-picture over the file's pane.
--
-- The page (and its embedded dataset) is built by scripts/make_preview.mjs in a
-- child process: reading and encoding a large GeoJSON on the window thread would
-- exceed the plugin hook's 50 ms budget.

local detect = require("./detect")

local M = {}

local last_targets: { [string]: { pane: number, path: string, host: string? } } = {}
local open_blocks: { [string]: { block: number, pane: number } } = {}

local function toast_error(cx: any, message: string, sub: string?)
	cx:toast("error", "geodataviewer: " .. message, sub)
end

local function host_is_remote(cx: any, host: string?): boolean
	if host == nil or host == "" or host == "local" then
		return false
	end
	local ok, hosts = pcall(function()
		return cx.hosts:list()
	end)
	if not ok or type(hosts) ~= "table" then
		return false
	end
	for _, entry in hosts do
		if entry.kind == "remote" and (entry.name == host or entry.address == host) then
			return true
		end
	end
	return false
end

local function open_map(cx: any, pane: number, url: string, allow_goto: boolean)
	local key = cx:window_key()
	local existing = open_blocks[key]

	if existing and allow_goto and existing.pane == pane then
		local ok, awaitable = pcall(function()
			return cx.browser:call({ op = "goto", block = existing.block, url = url })
		end)
		if ok then
			awaitable:next(function(result: any, _err: string?, next_cx: any)
				if result and result.ok then
					return
				end
				open_blocks[key] = nil
				open_map(next_cx, pane, url, false)
			end)
			return
		end
	end

	-- One map per window: another file closes the previous map instead of leaving a
	-- WebGL context per preview behind.
	if existing then
		pcall(function()
			cx.browser:call({ op = "close", block = existing.block })
		end)
		open_blocks[key] = nil
	end

	local ok, awaitable = pcall(function()
		return cx.browser:call({ op = "open", owner = pane, url = url, show = true })
	end)
	if not ok then
		toast_error(cx, "the browser is unavailable", tostring(awaitable))
		return
	end
	awaitable:next(function(result: any, err: string?, next_cx: any)
		if result and result.ok and result.ok.block then
			open_blocks[key] = { block = result.ok.block, pane = pane }
			return
		end
		local message = "the map window could not be opened"
		if result and result.error and result.error.message then
			message = result.error.message
		elseif err then
			message = err
		end
		toast_error(next_cx, message, nil)
	end)
end

local function find_target(cx: any): (number?, string?, string?)
	local focused = cx.session:focused()
	if focused then
		local read = cx.session:read(focused)
		if type(read) == "table"
			and (read.kind == "file" or read.kind == "database")
			and type(read.path) == "string" and read.path ~= "" then
			return focused, read.path, read.host
		end
	end

	local key = cx:window_key()
	local last = last_targets[key]
	if last then
		return last.pane, last.path, last.host
	end

	local tab = if focused then cx.session:tab_of(focused) else nil
	for _, info in cx.session:panes() do
		if tab ~= nil and info.tab ~= tab then
			continue
		end
		if info.kind == "file" and type(info.path) == "string" and info.path ~= "" then
			return info.pane, info.path, nil
		end
		if info.kind == "database" then
			local read = cx.session:read(info.pane)
			if type(read) == "table" and read.kind == "database"
				and type(read.path) == "string" and read.path ~= "" then
				return info.pane, read.path, nil
			end
		end
	end
	return nil, nil, nil
end

local function exists(path: string): boolean
	local ok, value = pcall(tern.fs.exists, path)
	return ok and value == true
end

local function list_dir(path: string): { string }
	local ok, entries = pcall(tern.fs.list, path)
	if not ok or type(entries) ~= "table" then
		return {}
	end
	return entries
end

local function version_number(name: string): number
	local major, minor, patch = name:match("(%d+)%.(%d+)%.(%d+)")
	if major then
		return tonumber(major) * 1000000 + tonumber(minor) * 1000 + tonumber(patch)
	end
	return 0
end

local function node_executable(): string
	local configured = tern.getenv("TERN_GEODATAVIEWER_NODE")
	if configured and configured ~= "" then
		return configured
	end

	local candidates: { string } = {
		"/opt/homebrew/bin/node",
		"/usr/local/bin/node",
		"/usr/bin/node",
		"/snap/bin/node",
	}
	local home = tern.getenv("HOME")
	if home and home ~= "" then
		table.insert(candidates, home .. "/.local/bin/node")
		table.insert(candidates, home .. "/.volta/bin/node")
		table.insert(candidates, home .. "/.asdf/shims/node")
		table.insert(candidates, home .. "/.local/share/mise/shims/node")

		local nvm = home .. "/.nvm/versions/node"
		local nvm_versions = list_dir(nvm)
		table.sort(nvm_versions, function(a, b) return version_number(a) > version_number(b) end)
		for _, version in nvm_versions do
			table.insert(candidates, nvm .. "/" .. version .. "/bin/node")
		end

		local fnm = home .. "/Library/Application Support/fnm/node-versions"
		local fnm_versions = list_dir(fnm)
		table.sort(fnm_versions, function(a, b) return version_number(a) > version_number(b) end)
		for _, version in fnm_versions do
			table.insert(candidates, fnm .. "/" .. version .. "/installation/bin/node")
		end
	end

	local program_files = tern.getenv("ProgramFiles")
	if program_files then
		table.insert(candidates, program_files .. "\\nodejs\\node.exe")
	end
	local local_app_data = tern.getenv("LOCALAPPDATA")
	if local_app_data then
		table.insert(candidates, local_app_data .. "\\Programs\\nodejs\\node.exe")
	end

	for _, path in candidates do
		if exists(path) then
			return path
		end
	end
	return "node"
end

local function generate(cx: any, path: string, host: string?, pane: number)
	local key = cx:window_key()
	local generator = tern.plugin.dir .. "/scripts/make_preview.mjs"
	local argv = {
		node_executable(),
		generator,
		path,
		tern.plugin.dir,
		tern.plugin.data,
		key,
	}

	local ok, spawn_error = pcall(function()
		tern.process.run(argv, { timeout_ms = 120000, cwd = tern.plugin.dir }, function(result, next_cx)
			if result.timed_out then
				toast_error(next_cx, "the preview generator timed out", path)
				return
			end

			local output = result.stdout or ""
			local line = output:match("([^\r\n]+)%s*$") or output
			local decoded, value = pcall(tern.json.decode, line)
			if not decoded or type(value) ~= "table" then
				local detail = (result.stderr or ""):gsub("%s+$", "")
				if detail == "" then
					detail = "exit status " .. tostring(result.status)
				end
				toast_error(next_cx, "the preview generator failed", detail)
				return
			end
			if not value.ok then
				toast_error(next_cx, tostring(value.error), nil)
				return
			end
			if type(value.url) ~= "string" or value.url == "" then
				toast_error(next_cx, "the preview generator returned no page", nil)
				return
			end

			last_targets[key] = { pane = pane, path = path, host = host }
			open_map(next_cx, pane, value.url, true)
		end)
	end)

	if not ok then
		toast_error(
			cx,
			"could not run Node",
			tostring(spawn_error) .. " — set TERN_GEODATAVIEWER_NODE to the Node executable"
		)
	end
end

--- Previews `path`, opening the map over `pane` (defaults to the focused pane).
function M.preview(cx: any, path: string, host: string?, pane: number?)
	if host_is_remote(cx, host) then
		toast_error(cx, "remote files are not supported yet", "The preview reads the file on this machine.")
		return
	end

	local target = pane or cx.session:focused()
	if not target then
		toast_error(cx, "no pane to open the map over", nil)
		return
	end

	if detect.format_for(path) == nil then
		toast_error(cx, "unsupported file type", detect.supported_names())
		return
	end

	generate(cx, path, host, target)
end

--- Palette command: preview the focused file (or the file last previewed in this window).
function M.command(cx: any)
	local pane, path, host = find_target(cx)
	if not pane or not path then
		cx:toast("info", "geodataviewer: focus a geodata file first", detect.supported_names())
		return
	end
	M.preview(cx, path, host, pane)
end

--- Files pane header button: preview the first selected geodata file.
function M.button(files: any, cx: any)
	local pane = cx.session:focused()
	if not pane then
		toast_error(cx, "no pane to open the map over", nil)
		return
	end
	for _, path in files.selection do
		if detect.format_for(path) ~= nil then
			M.preview(cx, path, files.host, pane)
			return
		end
	end
	cx:toast("info", "geodataviewer: select a geodata file", detect.supported_names())
end

return M
