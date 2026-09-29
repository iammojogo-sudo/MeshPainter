# MeshPainter

MeshPainter is a real-time 3D mesh painting tool built with Godot 3.6.2 and GLES2. Desktop builds are available for Windows, Linux, and macOS, with a browser build on itch.io.

Paint directly on a model using vertex colors or a texture. Vertex painting is available in the free version. Texture painting and several export and workflow tools require a purchased license.

**itch.io:** https://iammojogo.itch.io/meshpainter

**GitHub:** https://github.com/iammojogo-sudo/MeshPainter

**Upcoming release:** 1.3.0 — package and test fresh exports before publishing.

## Features

### Vertex painting
- Paint and erase vertex colors with an adjustable planar brush.
- Set brush radius, opacity, color, and falloff.
- Undo and redo painting.
- Use orbit and free-camera modes, wireframe views, and seven included demo meshes.
- Save and reopen .mp projects.

### Texture painting (purchased feature)
- Paint onto a texture using the same brush workflow.
- Keep vertex-color and texture paint as separate data.
- Save UVs and texture paint in .mp project files.
- Use existing UVs on Windows, Linux, macOS, and browser builds.
- Generate and preview UVs at 1024, 2048, or 4096 resolution on Windows.
- Restore the mesh from before the most recent unwrap during the current session.

Automatic unwrapping currently requires Windows and supports one triangle surface. Applying a new UV layout starts a blank texture; existing texture paint is not transferred. See [USER_GUIDE.md](USER_GUIDE.md) for details and limitations.

### Other purchased tools
- Import and export supported mesh formats (OBJ, GLB, STL, and PLY).
- Use the eyedropper and autosave features.
- Use the app's paid tools after license verification.

## Controls

| Input | Action |
|---|---|
| Left mouse button / drag | Paint |
| Shift + left mouse button | Erase to white |
| Right mouse drag | Orbit camera |
| Mouse wheel | Zoom |
| Shift + mouse wheel | Change brush radius |
| Q / E | Pan up / down |
| A / D | Pan left / right |
| M | Toggle orbit / free camera |
| F | Focus or reframe the mesh |
| U | Show or hide the UV preview |
| Y | Toggle wireframe |
| X | Toggle wireframe X-ray |
| Ctrl + left mouse button | Eyedropper (purchased feature) |

The UV preview's mouse wheel zooms the preview when the pointer is over that panel. Painting remains in the 3D viewport.

## Project files and downloads

- **.mp** is the working project format. It stores mesh geometry, vertex colors, UV coordinates, and texture paint.
- **OBJ, GLB, STL, and PLY** support depends on the selected operation and license. Export details and limitations are described in the user guide.

Fresh desktop archives are staged under this project's exports folder: exports/Windows/MeshPainter_Windows.zip, exports/Linux/MeshPainter_Linux.zip, and exports/MacOSX/MeshPainter_MacOSX.zip. After building and testing the corresponding executables, upload the updated archives to itch.io and attach them to the [GitHub Releases](https://github.com/iammojogo-sudo/MeshPainter/releases) page. The packaging script at exports/package_exports.bat creates the Windows and Linux archives and can rebuild the browser archive at exports/HTML5/index.zip. The macOS archive needs a fresh macOS build/package before it is replaced.

The browser build is also available on the [itch.io page](https://iammojogo.itch.io/meshpainter). Feature availability can differ by build; automatic UV generation is currently Windows-only.

## Build and packaging

In the full local project, open the projectfiles folder with Godot 3.6.2, install matching export templates, and use projectfiles/export_presets.cfg. For Windows automatic UV generation, build and package the native helper as described in [native/README.md](native/README.md).

The GitHub project is configured to track documentation, release archives, and selected native/Supabase setup files. The full Godot client source under projectfiles/ remains excluded by .gitignore.

## Account and purchase setup

The client uses Supabase authentication and paid-status checks. Purchase redemption uses the Supabase Edge Function described in [supabase/SETUP.md](supabase/SETUP.md). The legacy projectfiles/server folder is separate from this current client flow.

## Documentation

- [User guide](USER_GUIDE.md): current painting, UV setup, save workflow, and known limitations.
- [Changelog](CHANGELOG.md): concise feature and fix history.
- [Devlog](devlog.md): development-session notes.
- [Native UV helper notes](native/README.md): build, packaging, and technical behavior.

## License

Copyright (C) 2026 iammojogo. All rights reserved. Do not redistribute or modify this software without permission.