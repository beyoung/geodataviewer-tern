--!strict
-- Window half: the palette command, its shortcut, and a Files pane button.

local preview = require("./lib/preview")

tern.command({
	id = "preview",
	title = "Preview geodata on a map",
	icon = "globe",
	group = "geodataviewer",
	run = function(cx)
		preview.command(cx)
	end,
})

-- Cmd+Shift+V is part of Tern's preset, so a command key alone is ignored. A
-- settings-layer binding overrides the preset; it is the same user keybind a
-- person would add in Settings. Install it once, and never replace a binding
-- the user already chose for this chord.
local function is_preview_action(value: any): boolean
	if type(value) == "string" then
		return value == "plugin.geodataviewer.preview"
	end
	if type(value) == "table" then
		for _, action in value do
			if action == "plugin.geodataviewer.preview" then
				return true
			end
		end
	end
	return false
end

tern.timer(0, function(cx)
	if not cx or tern.kv.get("shortcut_installed") == true then
		return
	end
	local ok, err = pcall(function()
		local keybinds = cx.settings:keybinds()
		local existing = keybinds["cmd+shift+v"]
		if existing == nil or is_preview_action(existing) then
			cx.settings:bind("cmd+shift+v", "plugin.geodataviewer.preview")
			tern.kv.set("shortcut_installed", true)
		end
	end)
	if not ok then
		tern.log.warn("geodataviewer: keybind failed: " .. tostring(err))
	end
end)

-- The Files pane header button is desktop-only. A rejected registration must not
-- fail the whole plugin on hosts that do not offer it.
pcall(function()
	tern.files.button({
		id = "preview",
		title = "Preview on a map",
		icon = "globe",
		run = function(files, cx)
			preview.button(files, cx)
		end,
	})
end)
