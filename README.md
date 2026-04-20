# 3D Snake Game - Space Journey

A thrilling 3D snake experience set in a deep space starfield. Collect energy spheres, grow your snake, and explore themed environments!

## How to Make Mods for 3D Snake Game

The 3D Snake Game has a built-in modding system. Please review our [Modding Guidelines](legal/MODDING_GUIDELINES.md) before creating or sharing any mods.

### Prohibited Content
All mods must be free of:
- Illegal or infringing material.
- NSFW/Adult content.
- CASM (Child Abuse Sexual Material).
- Malicious code.

The 3D Snake Game has a built-in modding system that supports:
- **Custom Skins** - Add new snake appearances with colors and textures
- **Custom Backgrounds** - Create themed environments with models, textures, and audio

### Getting Started

1. **Create a mod folder** inside the `mods/` directory with your mod's name (e.g., `mods/my-awesome-mod/`)
2. **Create a `mod.json` file** in your mod folder that describes your mod content
3. **Update the manifest** - Add your mod folder name to `mods/manifest.json`

---

### Mod Structure

```
mods/
├── manifest.json          # Lists all mods
└── my-awesome-mod/
    ├── mod.json          # Mod configuration
    ├── Background/
    │   ├── Models/       # GLTF 3D models
    │   └── Textures/     # Environment textures
    └── Audio/
        ├── Music/        # Background music files
        └── SFX/          # Sound effects
```

---

### 1. Creating Custom Skins

Add a `skins` array to your `mod.json`:

```json
{
  "name": "My Custom Mod",
  "skins": [
    {
      "id": "cyberpunk",
      "name": "Cyberpunk Snake",
      "headColor": "00ff00",
      "bodyColor": "0088ff",
      "price": 150,
      "headTexture": "cyberpunk_head.png",
      "bodyTexture": "cyberpunk_body.png",
      "emissiveColor": "ff0088",
      "emissiveIntensity": 0.8,
      "shininess": 50,
      "opacity": 1.0
    }
  ]
}
```

**Skin Properties:**
- `id` - Unique identifier (required)
- `name` - Display name (required)
- `headColor` / `bodyColor` - Hex colors (without #)
- `price` - Cost in coins to unlock
- `headTexture` / `bodyTexture` - PNG image paths (relative to mod folder)
- `emissiveColor` - Glow color (hex)
- `emissiveIntensity` - Glow strength (0.0-1.0)
- `shininess` - Surface reflectivity (0-100)
- `opacity` - Transparency (0.0-1.0)

---

### 2. Creating Custom Backgrounds

Add a `backgrounds` array to your `mod.json`:

```json
{
  "backgrounds": [
    {
      "id": "neon_arcade",
      "name": "Neon Arcade",
      "color": "0a0a2e",
      "gridColor": "ff006e",
      "fogColor": "16213e",
      "price": 200,
      "stars": true,
      "starSize": 0.15,
      "starColor": "ffbe0b",
      "gridOpacity": 0.8,
      "ambientLightColor": "404040",
      "ambientLightIntensity": 1.2,
      "pointLightColor": "ff006e",
      "pointLightIntensity": 2.0,
      "particleColor": "ffbe0b",
      "envType": "custom",
      "modelPath": "arcade_model.gltf",
      "texturePath": "arcade_texture.png",
      "music": {
        "type": "square",
        "sequence": [440, 494.88, 523.25, 587.33],
        "speed": 0.3,
        "random": false
      },
      "sfx": {
        "eat": "arcade_eat.mp3",
        "coin": "arcade_coin.mp3",
        "gameover": "arcade_gameover.mp3"
      }
    }
  ]
}
```

**Background Properties:**
- `id` - Unique identifier (required)
- `name` - Display name (required)
- `color` - Hex background color
- `gridColor` - Grid line color (hex)
- `fogColor` - Fog color (hex)
- `price` - Unlock cost in coins
- `stars` - Boolean to show starfield
- `starSize` - Size of star particles
- `starColor` - Star color (hex)
- `gridOpacity` - Grid transparency
- `ambientLightColor/Intensity` - Overall lighting
- `pointLightColor/Intensity` - Spotlight configuration
- `particleColor` - Color for collected food particles
- `envType` - `"custom"` for mod-specific environment
- `modelPath` - Path to `.gltf` 3D model (in `Background/Models/`)
- `texturePath` - Path to texture image (in `Background/Textures/`)
- `music` - Background music configuration
- `sfx` - Sound effects paths

---

### 3. Music Configuration

Define procedural synth music:

```json
"music": {
  "type": "sine",        // "sine", "square", "triangle", "sawtooth"
  "sequence": [440, 494.88, 523.25, 587.33],  // Frequencies in Hz
  "speed": 0.2,          // Note duration (seconds)
  "random": false,       // Randomize frequencies
  "reverb": 0.5,         // Reverb amount
  "fileName": "custom_music.mp3"  // Or use external audio file
}
```

**Common Frequencies (Hz):**
- 261.63 (C4), 293.66 (D4), 329.63 (E4), 349.23 (F4), 392.00 (G4), 440.00 (A4), 493.88 (B4)
- Use `null` to create silence in the sequence

---

### 4. 3D Models & Textures

- **Models**: Use Blender to create `.gltf` files and export to `Background/Models/`
- **Textures**: Prepare PNG or JPG images for `Background/Textures/`
- **Audio**: MP3 files for music/SFX in `Audio/Music/` and `Audio/SFX/`

---

### 5. Complete Example `mod.json`

```json
{
  "name": "Retro Neon",
  "title": "Retro Neon Space Adventure",
  "description": "A high-octane synthwave mod with neon grids and pulse music.",
  "banner": "banner.png",
  "favicon": "mod_icon.png",
  "skins": [
    {
      "id": "retro_pink",
      "name": "Retro Pink",
      "headColor": "ff1493",
      "bodyColor": "ff69b4",
      "price": 100
    }
  ],
  "backgrounds": [
    {
      "id": "synthwave",
      "name": "Synthwave",
      "color": "0a0414",
      "gridColor": "00d9ff",
      "fogColor": "1a0a2e",
      "price": 150,
      "stars": true,
      "envType": "custom",
      "music": {
        "type": "sine",
        "sequence": [440, 523.25, 659.25, 783.99, 659.25, 523.25],
        "speed": 0.4,
        "reverb": 0.7
      }
    }
  ]
}
```

---

### 6. Metadata Requirements

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
