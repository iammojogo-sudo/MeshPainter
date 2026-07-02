# Mesh Painter

A real-time 3D vertex color painting application for Windows, macOS, and Linux. Built with Godot 3.6 and GLES2.

Paint directly onto 3D meshes with a planar disc brush, import/export `.obj` and `.mp` project files, and manage your work with undo/redo and autosave.

**itch.io page:** https://iammojogo.itch.io/meshpainter

---

## Features

### Free (Beta)
- Real-time vertex color painting on 3D meshes
- 7 demo meshes (capsule, cube, cylinder, plane, prism, sphere, torus)
- Planar disc brush with radius, opacity, color, and falloff control
- 2D brush profile preview (falloff curve, opacity bar, radius bar)
- Shift+LMB erase (paints white)
- Undo/redo (up to 50 snapshots)
- Open/save `.mp` project files
- Orbit and freecam modes (M key toggle)
- Wireframe overlay (Y key toggle, X key X-ray)
- Dark and Light themes
- 7 demo meshes included

### Paid
- OBJ export with vertex colors + baked texture + MTL
- GLB export (glTF 2.0)
- Eye dropper (Ctrl+LMB on mesh)
- Autosave timer (configurable 1–10 min)
- Save/open `.obj` files with vertex color import
- Custom cursor for eye dropper

---

## Controls

| Input | Action |
|---|---|
| LMB hold | Paint |
| Shift+LMB hold | Erase (paint white) |
| RMB drag | Orbit camera |
| Scroll | Zoom / dolly |
| Shift+Scroll | Resize brush |
| Q / E | Pan camera up/down |
| A / D | Pan camera left/right |
| M | Toggle orbit / freecam |
| F | Focus mesh |
| Y | Toggle wireframe |
| X | Toggle wireframe X-ray |
| Ctrl+LMB | Eye dropper (paid) |

---

## Downloads

Pre-built binaries are available on the [Releases](https://github.com/iammojogo-sudo/mesh-painter-demo/releases) page.

Each release includes platform-specific archives with the executable + `.pck` file:

- **Windows** — `Mesh-Painter-vX.X.X_Windows.zip`
- **Linux** — `Mesh-Painter-vX.X.X_Linux.tar.gz`
- **macOS** — `Mesh-Painter-vX.X.X_macOS.zip`

Extract the archive and run the executable. The `.pck` file must remain in the same directory as the executable.

Web version is available to play directly on [itch.io](https://iammojogo.itch.io/meshpainter).

---

## Project Files

- **`.mp`** — Native project format (free). Saves vertex positions, normals, colors, UVs, and face indices.
- **`.obj`** — Wavefront OBJ with vertex colors (`v x y z r g b` format). Supported for import (free) and export (paid).

---

## Building from Source

1. Open `projectfiles/` in Godot 3.6.x
2. Export templates must match the Godot version
3. Export presets are configured for Windows, Linux, macOS, and HTML5

### Build requirements
- Godot 3.6.x (GLES2)
- Export templates for target platforms

---

## Architecture Notes

The app uses a **cloud auth + paid gating** model:
- **Supabase** for email/anonymous authentication
- **Render worker** (FastAPI) for HMAC-signed capability tokens
- Free version: `.mp` only, no export
- Paid version: `.obj` open/save, OBJ + GLB export, eye dropper, autosave

Mesh data is processed with a spatial grid (0.1-unit cells) for fast vertex lookup during painting. Large meshes (250k+ vertices) are supported with optimized grid culling.

---

## License

(C) 2026 iammojogo

All rights reserved. Source code is provided for transparency. Redistribution and modification are not permitted without permission.
