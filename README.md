# 3D Snake Game - Space Journey 🐍✨

A thrilling, feature-rich 3D snake experience set in a deep space starfield. Built with **Three.js**, featuring advanced procedural audio, global localization, and a powerful browser-based modding system.

## 🚀 Features

- **3D Gameplay**: Control your snake in a fully realized 3D environment with smooth camera interpolation and orbital controls.
- **Shop System**: Collect coins to unlock unique **Skins** (Neon, Lava, Void, etc.) and **Backgrounds** (Deep Space, Sunset Grid, Event Horizon).
- **Procedural Audio Engine**: Real-time synthesized music and sound effects with dynamic reverb and multi-track sequencing.
- **Global Localization**: Native support for **English**, **Arabic** (with full RTL layout), and **Chinese**.
- **Cyberpunk UI**: Modern, responsive interface with glitch effects and smooth animations.
- **Security & Anti-Cheat**: Secure obfuscated storage and move-timing validation to prevent speed hacks and value tampering.

## 🎮 Controls

- **Movement**: Arrow Keys
- **Camera**: Left Click + Drag to rotate, Scroll to zoom
- **Mute**: 🔊/🔇 button in the HUD
- **Language**: EN / AR / ZH switcher in the HUD

## 🛠️ Modding Guide

The game features a unique "In-Memory" modding system. You can upload entire folders to add your own content without touching the source code.

### Master Mod Structure
To ensure your mod works correctly for both **Source-Level** and **In-Memory** users, follow this definitive directory structure:

```text
my-mod/
├── metadata.json           # Mod info (Root)
├── mod.json                # Content definitions (Root)
├── Background/             # Environmental assets
│   ├── Models/             # 3D models (.gltf, .glb)
│   │   └── terrain.glb
│   └── Textures/           # Background/Model textures
│       └── surface.png
├── Audio/                  # Sound assets
│   ├── Music/              # Background music (.mp3, .wav)
│   │   └── theme.mp3
│   └── SFX/                # Event sounds (.mp3, .wav, .ogg)
│       ├── eat.wav
│       ├── coin.mp3
│       └── gameover.ogg
└── Skins/                  # Snake textures
    ├── head.png
    └── body.png
```

### Example `mod.json`
This example demonstrates how to reference assets within the structured directories:

```json
{
  "skins": [
    {
      "id": "pro_snake",
      "name": "Professional Serpent",
      "headTexture": "Skins/head.png",
      "bodyTexture": "Skins/body.png",
      "emissiveColor": "0x00ff00",
      "opacity": 0.9
    }
  ],
  "backgrounds": [
    {
      "id": "crystal_cave",
      "name": "Crystal Cave",
      "modelPath": "Background/Models/terrain.glb",
      "texturePath": "Background/Textures/surface.png",
      "ambientLightIntensity": 0.3,
      "music": { "fileName": "Audio/Music/theme.mp3" },
      "sfx": {
        "eat": "Audio/SFX/eat.wav",
        "coin": "Audio/SFX/coin.mp3",
        "gameover": "Audio/SFX/gameover.ogg"
      }
    }
  ]
}
```

### Key Rules
- **Root Files**: `metadata.json` and `mod.json` **must** be in the root of the mod folder.
- **Path References**: All paths in `mod.json` are relative to the mod root (e.g., `Audio/Music/theme.mp3`).
- **3D Models**: The game supports `.gltf` and `.glb` files. Textures can be applied to these models using the `texturePath` property.
- **Asset Types**:
    - **Images**: `.png`, `.jpg` (Skins, Backgrounds, Banners, Icons)
    - **Audio**: `.mp3`, `.wav`, `.ogg`
    - **3D**: `.gltf`, `.glb`

### How Storage Works
- **Base64 Encoding**: All assets (images & audio) are converted to Base64 and stored in `localStorage`.
- **Memory Limit**: Be careful with large audio files; browser storage is typically limited to ~5-10MB total.

### Installing Mods
1. Open the **Shop**.
2. Navigate to the **Mods** tab.
3. Click **Upload Mod Folder** and select your prepared folder.
4. Toggle the switch to **Enable** your mod. The game will reload to apply your assets!

## �‍💻 Source-Level Modding (Development)

If you are a developer or want to bundle mods directly with the game source, you can use the physical `mods/` directory.

### Setup
1. Create a folder named `mods` in the root of the project.
2. Inside `mods/`, create a file named `manifest.json`:
    ```json
    {
      "mods": ["my-first-mod", "cool-theme"]
    }
    ```
3. Create subdirectories for each mod (e.g., `mods/my-first-mod/`).
4. Place your `metadata.json`, `mod.json`, and all assets inside your mod's subdirectory.

### Why use Source-Level Modding?
- **No Upload Required**: Mods in the physical `mods/` folder are loaded automatically when the game starts.
- **Developer Friendly**: Perfect for testing mods during development without re-uploading folders.
- **Direct Path Support**: You can use relative paths within your JSON files as usual.

## ��️ Technical Stack

- **Engine**: [Three.js](https://threejs.org/)
- **Audio**: Web Audio API (Custom Procedural Synth)
- **Styling**: Pure CSS3 with Cyberpunk aesthetics
- **Storage**: `localStorage` with XOR obfuscation

---
*Created with ❤️ for the Space Journey.*
