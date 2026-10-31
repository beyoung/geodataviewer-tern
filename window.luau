--!strict
-- Window half: the palette command, its shortcut, and a Files pane button.

local preview = require("./lib/preview")

tern.command({
	id = "preview",
	title = "Preview geodata on a map",
	icon = "globe",
	group = "geodataviewer",
	keys = { "ctrl+shift+g" },
	run = function(cx)
		preview.command(cx)
	end,
})

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
