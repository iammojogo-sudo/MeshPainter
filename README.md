# MeshPainter 1.3.3.0

MeshPainter is a Godot 3.6.2 desktop painting tool for adding **Vertex Color** or **UV Color** to 3D meshes. A browser demo is available on [itch.io](https://iammojogo.itch.io/meshpainter), and desktop builds are available for Windows, Linux, and macOS.

This patch corrects material and color-map exports, fixes sign-in feedback for rejected credentials, and retains hosted password recovery and the Windows UV helper. Automatic UV generation remains Windows-only.

## Get MeshPainter

- **Browser demo:** Try the included example meshes on [itch.io](https://iammojogo.itch.io/meshpainter) without downloading. Registered browser accounts can save and reopen `.mp` projects through browser storage and download copies, but the browser build cannot export mesh formats. Anonymous demo sessions cannot save.
- **Free desktop build:** Download the Windows, Linux, or macOS build from [GitHub Releases](https://github.com/iammojogo-sudo/MeshPainter/tree/main/exports). Anonymous sessions can paint on included examples. A registered free account can import OBJ files and save or reopen `.mp` projects; it cannot export painted meshes.
- **Paid edition:** The itch.io purchase unlocks UV Color painting, automatic UV generation on Windows, additional mesh import formats, mesh export, the eyedropper, and autosave. Mesh-format export requires the desktop build.

Windows is the tested desktop build. Linux and macOS builds are available, but have not been fully tested.

## Painting

- Paint and erase with adjustable brush radius, opacity, and falloff.
- Use **Vertex Color** or **UV Color**. The two modes keep separate paint data.
- Existing usable UV layouts are detected and reused for UV Color painting on supported builds.
- Windows can generate a new UV layout. Linux, macOS, and browser builds require usable UVs already on the mesh.
- Applying a newly generated UV layout starts a blank UV Color layer; vertex colors are retained, but existing UV Color marks are not transferred.
- Undo and redo paint strokes, use the wireframe overlay, and control the view with orbit or free-camera modes.
- The current paint workflow supports one mesh surface at a time.

MeshPainter paints colors to vertices or to a UV color map. Importing or painting image and material textures is not included in 1.3.3.0.

## Save and export

The editable `.mp` project stores mesh geometry, vertex colors, UV coordinates, and UV Color data. Registered free and paid accounts can save and reopen `.mp` projects. Anonymous demo sessions cannot save.

Paid desktop builds can import GLB, GLTF, STL, PLY, DAE, and FBX files, in addition to OBJ. Export behavior in 1.3.3.0 is:

| Format | Data included |
|---|---|
| OBJ | Geometry, UV coordinates, vertex-color values, and a linked MTL/PNG. The PNG combines Vertex Color with UV Color when a UV layer exists, and is aligned to OBJ's V-coordinate convention. |
| GLB | Geometry, vertex colors, UV coordinates, and the embedded UV Color image when present. Exports a rough, non-metal material and disables dielectric specular where the viewer supports the Khronos extension. Uses 32-bit indices above 65,535 vertices. |
| PLY | Geometry, vertex colors, and UV coordinates; no UV Color image or material. |
| STL | Geometry only. |

GLB keeps vertex colors and the UV Color image as separate inputs to the material. Standard glTF combines them by multiplying the texture color by the vertex color. OBJ's linked PNG now bakes that same combination for broader compatibility, while its optional inline vertex-color values may be ignored by some applications.

OBJ, MTL, and PNG files are written beside one another. The OBJ assigns the MTL material to its faces, and the MTL references the PNG by filename. OBJ's inline vertex-color values are retained, but many programs ignore them; the linked PNG is the portable color result.

## Password recovery

Password reset links open the hosted reset page in a browser, so recovery works across desktop platforms. MeshPainter no longer stores account passwords locally and clears passwords left by older versions. Saved email addresses and sign-in session tokens may still be retained locally.

Copyright (C) 2026 iammojogo. All rights reserved.

