# 3D Snake Game - Space Journey

A thrilling 3D snake experience set in a deep space starfield. Collect energy spheres, grow your snake, and explore themed environments!

## Visual Themes & Customization

The 3D Snake Game features a customization system that allows for static visual themes. These themes are **data-only** (JSON and images) and do not execute arbitrary scripts.

### Safety & Security
- **No Script Execution**: The customization system is designed to load only static data (colors, textures, 3D models). No executable code or scripts are loaded from theme folders.
- **Privacy First**: This project does not track IP addresses, use cookies, or collect any user data. All game progress is stored locally in your browser.
- **Ethics**: We strictly prohibit any themes containing illegal, NSFW, or CASM content. Please refer to our [Content Guidelines](legal/MODDING_GUIDELINES.md).

### Creating Custom Themes

The system supports:
- **Custom Skins** - Visual snake appearances with colors and textures.
- **Custom Environments** - Themed backgrounds with 3D models and textures.

### Getting Started

1. **Create a theme folder** inside the `mods/` directory (e.g., `mods/my-neon-theme/`).
2. **Create a `mod.json` file** in your folder to define visual properties.
3. **Update the manifest** - Add your folder name to `mods/manifest.json`.

---

### Theme Structure

```
mods/
├── manifest.json          # Lists all active themes
└── my-neon-theme/
    ├── mod.json          # Visual configuration (JSON only)
    ├── Background/
    │   ├── Models/       # GLTF 3D models
    │   └── Textures/     # Environment textures
    └── Audio/
        ├── Music/        # Procedural music configs or files
        └── SFX/          # Sound effects
```

---

### 1. Custom Skins

Add a `skins` array to your `mod.json`:

```json
{
  "name": "My Custom Theme",
  "skins": [
    {
      "id": "cyberpunk",
      "name": "Cyberpunk Skin",
      "headColor": "00ff00",
      "bodyColor": "0088ff",
      "headTexture": "cyberpunk_head.png",
      "bodyTexture": "cyberpunk_body.png"
    }
  ]
}
```

**Skin Properties:**
- `id` - Unique identifier.
- `name` - Display name.
- `headColor` / `bodyColor` - Hex colors.
- `headTexture` / `bodyTexture` - Image paths (relative to theme folder).

---

### 2. Custom Environments

Add a `backgrounds` array to your `mod.json`:

```json
{
  "backgrounds": [
    {
      "id": "neon_arcade",
      "name": "Neon Arcade",
      "color": "0a0a2e",
      "gridColor": "ff006e",
      "modelPath": "arcade_model.gltf",
      "texturePath": "arcade_texture.png"
    }
  ]
}
```

---

### 3. Prohibited Content
All customization assets must be free of:
- Illegal or infringing material.
- NSFW/Adult content.
- CASM (Child Abuse Sexual Material).
- Any executable code or scripts.

For full details, see our [Theme Customization Guidelines](legal/MODDING_GUIDELINES.md).

To make your mod look professional in the **Mod Picker**, include these fields in `mod.json`:
- `title`: The display title for the mod picker (e.g., "The Void Expansion")
- `description`: A short blurb about what your mod adds
- `banner`: A PNG image (e.g., 600x120) for the mod's background in the picker
- `favicon`: A small square PNG (e.g., 48x48) for the mod's icon

---

### 7. Updating the Manifest

Edit `mods/manifest.json` to register your mod:

```json
{
  "mods": ["my-awesome-mod", "another-mod"]
}
```

---

### How It Works

The game's **ModManager** (in `game.js`):
1. Reads `mods/manifest.json`
2. Loads each mod's `mod.json`
3. Registers skins and backgrounds
4. Loads textures and 3D models
5. Pre-caches audio files
6. Makes them available for purchase/selection in the shop

---

### Tips

✅ Keep folder structure clean and consistent
✅ Use lowercase, kebab-case for file names
✅ Test your mod by opening the game locally
✅ Use reasonable prices (100-500 coins)
✅ Ensure textures are optimized (not too large)
✅ Mod content is prefixed with `[MOD]` in the shop UI
