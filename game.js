import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Localization Configuration
const TRANSLATIONS = {
    en: {
        title: "3D Snake Game",
        subtitle: "Space Journey",
        move_hint: "Use Arrow Keys to move",
        score: "Score",
        high: "High",
        coins: "Coins",
        start: "Start Game",
        shop: "Open Shop",
        skins: "Skins",
        backgrounds: "Backgrounds",
        back: "Back to Menu",
        owned: "OWNED",
        buy: "Buy",
        not_enough: "Not enough coins!",
        cheater_speed: "Cheater! Speed manipulation detected.",
        cheater_value: "Cheater! Value tampering detected.",
        system_glitch: "SYSTEM GLITCH",
        mods: "Mods",
        upload_mod: "Upload Mod Folder",
        no_mods: "No mods found yet",
        mod_invalid: "Invalid Mod: metadata.json missing",
        mod_loaded: "Mod loaded: ",
        skins_list: {
            classic: "Classic Green",
            neon: "Neon Blue",
            lava: "Lava Flow",
            gold: "Golden Midas",
            void: "Void Walker",
            matrix: "Matrix Code"
        },
        bg_list: {
            space: "Deep Space",
            neon: "Neon City",
            sunset: "Sunset Grid",
            matrix: "Matrix Void",
            hellscape: "Hellscape",
            blackhole: "Event Horizon",
            mystery: "Mystery Void"
        }
    },
    ar: {
        title: "لعبة الثعبان 3D",
        subtitle: "رحلة الفضاء",
        move_hint: "استخدم مفاتيح الأسهم للتحرك",
        score: "النتيجة",
        high: "الأعلى",
        coins: "العملات",
        start: "بدء اللعبة",
        shop: "المتجر",
        skins: "الأشكال",
        backgrounds: "الخلفيات",
        back: "العودة للقائمة",
        owned: "ممتلك",
        buy: "شراء",
        not_enough: "ليس لديك عملات كافية!",
        cheater_speed: "غشاش! تم اكتشاف تلاعب بالسرعة.",
        cheater_value: "غشاش! تم اكتشاف تلاعب بالقيم.",
        system_glitch: "خلل في النظام",
        mods: "التحسينات",
        upload_mod: "تحميل مجلد التحسينات",
        no_mods: "لا توجد تحسينات بعد",
        mod_invalid: "تحسين غير صالح: ملف metadata.json مفقود",
        mod_loaded: "تم تحميل التحسين: ",
        skins_list: {
            classic: "الأخضر الكلاسيكي",
            neon: "النيون الأزرق",
            lava: "تدفق الحمم",
            gold: "ميداس الذهبي",
            void: "ماش الفراغ",
            matrix: "كود الماتريكس"
        },
        bg_list: {
            space: "الفضاء العميق",
            neon: "مدينة النيون",
            sunset: "شبكة الغروب",
            matrix: "فراغ الماتريكس",
            hellscape: "مشهد الجحيم",
            blackhole: "أفق الحدث",
            mystery: "فراغ الغموض"
        }
    },
    zh: {
        title: "3D 贪吃蛇",
        subtitle: "太空之旅",
        move_hint: "使用方向键移动",
        score: "分数",
        high: "最高分",
        coins: "硬币",
        start: "开始游戏",
        shop: "商店",
        skins: "皮肤",
        backgrounds: "背景",
        back: "返回菜单",
        owned: "已拥有",
        buy: "购买",
        not_enough: "硬币不足！",
        cheater_speed: "作弊！检测到速度异常。",
        cheater_value: "作弊！检测到数值篡改。",
        system_glitch: "系统故障",
        mods: "模组",
        upload_mod: "上传模组文件夹",
        no_mods: "尚未发现模组",
        mod_invalid: "模组无效：缺少 metadata.json",
        mod_loaded: "模组已加载：",
        skins_list: {
            classic: "经典绿",
            neon: "霓虹蓝",
            lava: "熔岩流",
            gold: "黄金米达斯",
            void: "虚空行者",
            matrix: "黑客帝国",
        },
        bg_list: {
            space: "深空",
            neon: "霓虹城",
            sunset: "日落网格",
            matrix: "矩阵虚空",
            hellscape: "地狱景观",
            blackhole: "事件视界",
            mystery: "神秘虚空"
        }
    }
};

const LanguageManager = {
    current: Security.load('snake3d_lang_secure', 'en'),
    
    set(lang) {
        if (!TRANSLATIONS[lang]) return;
        this.current = lang;
        Security.save('snake3d_lang_secure', lang);
        this.apply();
    },

    apply() {
        const t = TRANSLATIONS[this.current];
        document.documentElement.lang = this.current;
        document.body.dir = this.current === 'ar' ? 'rtl' : 'ltr';
        
        // Update static UI
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if (t[key]) el.innerText = t[key];
        });

        // Update score labels (template strings)
        this.updateHUD();
        
        // Update dynamic lists
        if (typeof updateShopList === 'function') updateShopList();
    },

    updateHUD() {
        const t = TRANSLATIONS[this.current];
        const info = document.getElementById('info');
        if (info) {
            info.querySelector('h1').innerText = t.title;
            info.querySelector('p').innerText = t.move_hint;
            // The score line is complex, we target the spans directly in updateUI
        }
        
        const menu = document.getElementById('menu');
        if (menu) {
            menu.querySelector('h1').innerText = t.title;
            menu.querySelector('p').innerText = t.subtitle;
        }
    }
};

// Game constants
const GRID_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 3;
const INITIAL_MOVE_INTERVAL = 200;
const MIN_MOVE_INTERVAL = 110;

// Skins configuration
const SKINS = [
    { id: 'classic', name: 'Classic Green', head: 0x00ff00, body: 0x008800, price: 0 },
    { id: 'neon', name: 'Neon Blue', head: 0x00ffff, body: 0x0000ff, price: 50 },
    { id: 'lava', name: 'Lava Flow', head: 0xff4400, body: 0x880000, price: 100 },
    { id: 'gold', name: 'Golden Midas', head: 0xffff00, body: 0xaa8800, price: 250 },
    { id: 'void', name: 'Void Walker', head: 0xff00ff, body: 0x440044, price: 500 },
    { id: 'matrix', name: 'Matrix Code', head: 0x00ff00, body: 0x003300, emissive: 0x00ff00, price: 1000 }
];

const BACKGROUNDS = [
    { 
        id: 'space', name: 'Deep Space', color: 0x000000, stars: true, grid: 0x444444, fog: 0x000000, envType: 'planets', price: 0,
        music: { 
            speed: 0.25,
            reverb: 0.6,
            tracks: [
                { type: 'triangle', sequence: [261.63, null, 329.63, null, 392.00, null, 523.25, null], gain: 0.1, filter: 1000 },
                { type: 'sine', sequence: [130.81, 130.81, 164.81, 164.81, 196.00, 196.00, 130.81, 130.81], gain: 0.15, filter: 500 }
            ]
        }
    },
    { 
        id: 'neon', name: 'Neon City', color: 0x000022, stars: false, grid: 0x00ffff, fog: 0x000044, envType: 'cubes', price: 100,
        music: { 
            speed: 0.15,
            reverb: 0.3,
            tracks: [
                { type: 'square', sequence: [440, 349.23, 392, 261.63], gain: 0.05, filter: 2000 },
                { type: 'sawtooth', sequence: [110, 110, 110, 82.41], gain: 0.08, filter: 800 }
            ]
        }
    },
    { 
        id: 'sunset', name: 'Sunset Grid', color: 0x220022, stars: false, grid: 0xff00ff, fog: 0x440044, envType: 'sun', price: 200,
        music: { 
            speed: 0.5,
            reverb: 0.5,
            tracks: [
                { type: 'sawtooth', sequence: [196.00, 220.00, 261.63, 293.66], gain: 0.05, filter: 1500 },
                { type: 'sine', sequence: [98, 98, 110, 110], gain: 0.1, filter: 600 }
            ]
        }
    },
    { 
        id: 'matrix', name: 'Matrix Void', color: 0x000500, stars: true, grid: 0x00ff00, fog: 0x001100, envType: 'code', price: 500,
        music: { 
            speed: 0.1,
            reverb: 0.4,
            tracks: [
                { type: 'sine', sequence: [880, 987.77, 1046.50, 1318.51], gain: 0.08, filter: 3000 },
                { type: 'square', sequence: [220, 246.94, 261.63, 329.63], gain: 0.03, filter: 1000 }
            ]
        }
    },
    { 
        id: 'hell', name: 'Hellscape', color: 0x220000, stars: false, grid: 0xff4400, fog: 0x440000, envType: 'lava', price: 300,
        music: { 
            speed: 1.0,
            reverb: 0.8,
            tracks: [
                { type: 'sawtooth', sequence: [65.41, 73.42, 82.41, 61.74], gain: 0.15, filter: 400 },
                { type: 'sawtooth', sequence: [130.81, 146.83, 164.81, 123.47], gain: 0.1, filter: 800 }
            ]
        }
    },
    { 
        id: 'blackhole', name: 'Event Horizon', color: 0x000000, stars: true, grid: 0x333333, fog: 0x110022, envType: 'blackhole', price: 800,
        music: { 
            speed: 0.2,
            reverb: 0.9,
            random: true,
            tracks: [
                { type: 'sine', sequence: [110, 116.54, 123.47, 130.81], gain: 0.1, filter: 500 },
                { type: 'sine', sequence: [220, 233.08, 246.94, 261.63], gain: 0.05, filter: 1000 }
            ]
        }
    },
    { 
        id: 'mystery', name: 'Mystery Void', color: 0x111111, stars: true, grid: 0xffffff, fog: 0x222222, envType: 'custom', price: 1000,
        music: { 
            speed: 0.2,
            reverb: 0.7,
            tracks: [
                { type: 'triangle', sequence: [440, 523.25, 659.25, 783.99], gain: 0.1, filter: 1200 },
                { type: 'sine', sequence: [220, 261.63, 329.63, 392.00], gain: 0.1, filter: 600 }
            ]
        }
    }
];

// Notification Manager
const Notifications = {
    show(message, type = 'error') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.innerText = `> ${message}`;
        container.appendChild(notif);

        // Auto remove
        setTimeout(() => {
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 300);
        }, 4000);

        if (type === 'error') this.triggerGlitch();
    },
    triggerGlitch() {
        const overlay = document.getElementById('glitch-overlay');
        if (!overlay) return;
        overlay.style.display = 'block';
        audioManager.playErrorSound();
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }
};

// Modding Framework
const ModManager = {
    mods: [],
    assets: new Map(),
    enabledMods: new Set(JSON.parse(Security.load('snake3d_enabled_mods_secure', '[]'))),

    async init() {
        this.mods = JSON.parse(Security.load('snake3d_installed_mods_secure', '[]'));
        
        // Load Source-Level Mods (Physical directory)
        await this.loadSourceMods();
        
        await this.loadEnabledMods();
        this.updateModUI();
        
        // Setup upload listener
        const input = document.getElementById('mod-folder-input');
        const btn = document.getElementById('upload-mod-btn');
        if (btn && input) {
            btn.onclick = () => input.click();
            input.onchange = (e) => this.handleFolderUpload(e.target.files);
        }
    },

    async loadSourceMods() {
        try {
            const response = await fetch('mods/manifest.json').catch(() => ({ ok: false }));
            if (!response.ok) return;
            
            const manifest = await response.json();
            for (const folder of manifest.mods) {
                const basePath = `mods/${folder}/`;
                const [metaRes, modRes] = await Promise.all([
                    fetch(`${basePath}metadata.json`),
                    fetch(`${basePath}mod.json`)
                ]);
                
                if (metaRes.ok && modRes.ok) {
                    const metadata = await metaRes.json();
                    const content = await modRes.json();
                    
                    // Prefix asset paths with the folder path
                    if (metadata.banner) metadata.bannerBase64 = `${basePath}${metadata.banner}`;
                    if (metadata.favicon) metadata.faviconBase64 = `${basePath}${metadata.favicon}`;
                    
                    if (content.skins) {
                        content.skins.forEach(skin => {
                            if (skin.headTexture) skin.headTextureUrl = `${basePath}${skin.headTexture}`;
                            if (skin.bodyTexture) skin.bodyTextureUrl = `${basePath}${skin.bodyTexture}`;
                        });
                    }

                    if (content.backgrounds) {
                        content.backgrounds.forEach(bg => {
                            if (bg.music?.fileName) bg.music.fileNameUrl = `${basePath}${bg.music.fileName}`;
                            if (bg.modelPath) bg.modelUrl = `${basePath}${bg.modelPath}`;
                            if (bg.texturePath) bg.textureUrl = `${basePath}${bg.texturePath}`;
                            if (bg.sfx) {
                                Object.keys(bg.sfx).forEach(k => bg.sfx[k] = `${basePath}${bg.sfx[k]}`);
                            }
                        });
                    }

                    const sourceMod = {
                        id: `source_${folder}`,
                        metadata,
                        content,
                        isSource: true,
                        basePath
                    };
                    
                    // Only add if not already in mods (prevent duplicates)
                    if (!this.mods.find(m => m.id === sourceMod.id)) {
                        this.mods.push(sourceMod);
                        this.enabledMods.add(sourceMod.id); // Auto-enable source mods
                    }
                }
            }
        } catch (e) {
            console.log('No physical mods directory found or error loading manifest.');
        }
    },

    async loadEnabledMods() {
        for (const modId of this.enabledMods) {
            const mod = this.mods.find(m => m.id === modId);
            if (mod) await this.applyMod(mod);
        }
    },

    async applyMod(mod) {
        const t = TRANSLATIONS[LanguageManager.current];
        const lang = LanguageManager.current;
        
        const modTitle = mod.metadata.translations?.[lang]?.title || mod.metadata.title;
        
        // Load skins
        if (mod.content.skins) {
            for (const skin of mod.content.skins) {
                const skinId = `mod_${mod.id}_${skin.id}`;
                const skinName = skin.translations?.[lang]?.name || skin.name;
                
                let headTexture = null;
                let bodyTexture = null;
                
                // Handle both Source (URL) and In-Memory (Base64) assets
                if (skin.headTextureBase64) headTexture = await this.loadBase64Texture(skin.headTextureBase64);
                else if (skin.headTextureUrl) headTexture = await textureLoader.loadAsync(skin.headTextureUrl);
                
                if (skin.bodyTextureBase64) bodyTexture = await this.loadBase64Texture(skin.bodyTextureBase64);
                else if (skin.bodyTextureUrl) bodyTexture = await textureLoader.loadAsync(skin.bodyTextureUrl);

                if (headTexture || bodyTexture) {
                    this.assets.set(skinId, { headTexture, bodyTexture });
                }

                SKINS.push({
                    id: skinId,
                    name: `[MOD] ${skinName}`,
                    head: skin.headColor ? parseInt(skin.headColor, 16) : 0xffffff,
                    body: skin.bodyColor ? parseInt(skin.bodyColor, 16) : 0xffffff,
                    emissive: skin.emissiveColor ? parseInt(skin.emissiveColor, 16) : null,
                    emissiveIntensity: skin.emissiveIntensity || 1.0,
                    shininess: skin.shininess || 30,
                    opacity: skin.opacity !== undefined ? skin.opacity : 1.0,
                    transparent: skin.opacity < 1.0,
                    price: skin.price || 0,
                    isMod: true
                });
            }
        }

        // Load backgrounds
        if (mod.content.backgrounds) {
            for (const bg of mod.content.backgrounds) {
                const bgId = `mod_${mod.id}_${bg.id}`;
                const bgName = bg.translations?.[lang]?.name || bg.name;

                // Handle 3D Models and Textures for both Source and In-Memory
                let customModel = null;
                let envTexture = null;

                if (mod.isSource) {
                    if (bg.modelUrl) {
                        customModel = await gltfLoader.loadAsync(bg.modelUrl).then(gltf => gltf.scene).catch(() => null);
                    }
                    if (bg.textureUrl) {
                        envTexture = await textureLoader.loadAsync(bg.textureUrl).catch(() => null);
                    }
                } else {
                    if (bg.modelPath && mod.assets[bg.modelPath]) {
                        customModel = await this.loadBase64GLTF(mod.assets[bg.modelPath]).catch(() => null);
                    }
                    if (bg.texturePath && mod.assets[bg.texturePath]) {
                        envTexture = await this.loadBase64Texture(mod.assets[bg.texturePath]).catch(() => null);
                    }
                }

                if (customModel || envTexture) {
                    this.assets.set(bgId, { customModel, envTexture });
                }

                // Update music fileName to use the absolute URL if it's a source mod
                if (mod.isSource && bg.music?.fileNameUrl) {
                    bg.music.fileName = bg.music.fileNameUrl;
                }

                BACKGROUNDS.push({
                    id: bgId,
                    name: `[MOD] ${bgName}`,
                    color: parseInt(bg.color, 16),
                    stars: bg.stars || false,
                    starSize: bg.starSize || 0.1,
                    starColor: bg.starColor ? parseInt(bg.starColor, 16) : 0xffffff,
                    grid: parseInt(bg.gridColor, 16),
                    gridOpacity: bg.gridOpacity !== undefined ? bg.gridOpacity : 1.0,
                    fog: parseInt(bg.fogColor, 16),
                    ambientLightColor: bg.ambientLightColor ? parseInt(bg.ambientLightColor, 16) : 0x404040,
                    ambientLightIntensity: bg.ambientLightIntensity !== undefined ? bg.ambientLightIntensity : 1.0,
                    pointLightColor: bg.pointLightColor ? parseInt(bg.pointLightColor, 16) : 0xffffff,
                    pointLightIntensity: bg.pointLightIntensity !== undefined ? bg.pointLightIntensity : 1.0,
                    particleColor: bg.particleColor ? parseInt(bg.particleColor, 16) : 0xff0000,
                    envType: bg.envType || 'custom',
                    price: bg.price || 0,
                    isMod: true,
                    music: bg.music,
                    sfx: bg.sfx 
                });

                // Pre-load modded SFX
                if (bg.sfx) {
                    const assets = mod.isSource ? {} : mod.assets;
                    if (bg.sfx.eat) await audioManager.loadExternalAudio(bg.sfx.eat, assets?.[bg.sfx.eat]);
                    if (bg.sfx.coin) await audioManager.loadExternalAudio(bg.sfx.coin, assets?.[bg.sfx.coin]);
                    if (bg.sfx.gameover) await audioManager.loadExternalAudio(bg.sfx.gameover, assets?.[bg.sfx.gameover]);
                }
            }
        }
        console.log(`${t.mod_loaded}${modTitle}`);
    },

    async loadBase64Texture(base64) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const texture = new THREE.Texture(img);
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.needsUpdate = true;
                resolve(texture);
            };
            img.src = base64;
        });
    },

    async loadBase64GLTF(base64) {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.parse(base64, '', (gltf) => {
                resolve(gltf.scene);
            }, reject);
        });
    },

    async handleFolderUpload(files) {
        const t = TRANSLATIONS[LanguageManager.current];
        let modData = {
            id: 'mod_' + Date.now(),
            metadata: null,
            content: null,
            assets: {} // Store base64 audio/images indexed by relative path
        };

        const fileArray = Array.from(files);
        
        // 1. Find the root of the mod (where metadata.json is)
        const metadataFile = fileArray.find(f => f.name === 'metadata.json');
        if (!metadataFile) {
            Notifications.show(t.mod_invalid, 'error');
            return;
        }

        const rootPath = metadataFile.webkitRelativePath.replace('metadata.json', '');

        try {
            modData.metadata = JSON.parse(await metadataFile.text());
            const contentFile = fileArray.find(f => f.webkitRelativePath === rootPath + 'mod.json');
            if (contentFile) modData.content = JSON.parse(await contentFile.text());

            // 3. Process All Assets using relative paths
            for (const file of fileArray) {
                const relativePath = file.webkitRelativePath.replace(rootPath, '');
                
                // Process Images
                if (file.type.startsWith('image/')) {
                    const base64 = await this.fileToBase64(file);
                    modData.assets[relativePath] = base64; // Store in assets map

                    if (relativePath === modData.metadata.favicon) modData.metadata.faviconBase64 = base64;
                    if (relativePath === modData.metadata.banner) modData.metadata.bannerBase64 = base64;
                    
                    if (modData.content?.skins) {
                        modData.content.skins.forEach(skin => {
                            if (skin.headTexture === relativePath) skin.headTextureBase64 = base64;
                            if (skin.bodyTexture === relativePath) skin.bodyTextureBase64 = base64;
                        });
                    }
                }
                
                // Process 3D Models
                if (file.name.endsWith('.gltf') || file.name.endsWith('.glb')) {
                    const base64 = await this.fileToBuffer(file);
                    modData.assets[relativePath] = base64;
                }
                
                // Process Audio (Music & SFX)
                if (file.type.startsWith('audio/') || file.name.endsWith('.mp3') || file.name.endsWith('.wav') || file.name.endsWith('.ogg')) {
                    const base64 = await this.fileToBase64(file);
                    modData.assets[relativePath] = base64;
                }
            }

            this.mods.push(modData);
            Security.save('snake3d_installed_mods_secure', JSON.stringify(this.mods));
            this.updateModUI();
            Notifications.show(`${t.mod_loaded} ${modData.metadata.title}`, 'success');
        } catch (e) {
            Notifications.show(`MOD ERROR: ${e.message}`, 'error');
        }
    },

    fileToBase64(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    },

    fileToBuffer(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsArrayBuffer(file);
        });
    },

    toggleMod(modId) {
        if (this.enabledMods.has(modId)) this.enabledMods.delete(modId);
        else this.enabledMods.add(modId);
        Security.save('snake3d_enabled_mods_secure', JSON.stringify([...this.enabledMods]));
        location.reload();
    },

    deleteMod(modId) {
        this.mods = this.mods.filter(m => m.id !== modId);
        this.enabledMods.delete(modId);
        Security.save('snake3d_installed_mods_secure', JSON.stringify(this.mods));
        Security.save('snake3d_enabled_mods_secure', JSON.stringify([...this.enabledMods]));
        this.updateModUI();
    },

    updateModUI() {
        const container = document.getElementById('mod-list');
        if (!container) return;
        const t = TRANSLATIONS[LanguageManager.current];
        const lang = LanguageManager.current;
        if (this.mods.length === 0) {
            container.innerHTML = `<p style="color: #666; text-align: center; padding: 2rem;">${t.no_mods}</p>`;
            return;
        }
        container.innerHTML = '';
        this.mods.forEach(mod => {
            const modTitle = mod.metadata.translations?.[lang]?.title || mod.metadata.title;
            const modDesc = mod.metadata.translations?.[lang]?.description || mod.metadata.description;
            const card = document.createElement('div');
            card.className = `mod-card ${this.enabledMods.has(mod.id) ? 'active' : ''}`;
            card.innerHTML = `
                <div class="mod-banner" style="background-image: url(${mod.metadata.bannerBase64 || ''})"></div>
                <div class="mod-info">
                    <div class="mod-favicon" style="background-image: url(${mod.metadata.faviconBase64 || ''})"></div>
                    <div class="mod-details">
                        <h3>${modTitle}</h3>
                        <p>${modDesc}</p>
                    </div>
                </div>
                <div class="mod-controls">
                    <label class="toggle-switch">
                        <input type="checkbox" ${this.enabledMods.has(mod.id) ? 'checked' : ''} onchange="ModManager.toggleMod('${mod.id}')">
                        <span class="slider"></span>
                    </label>
                    <button class="delete-mod-btn" onclick="ModManager.deleteMod('${mod.id}')">Remove</button>
                </div>
            `;
            container.appendChild(card);
        });
    }
};

// Anti-cheat / Security Manager
const Security = {
    _key: 'snake_secret_salt',
    obfuscate(value) {
        const str = String(value);
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ this._key.charCodeAt(i % this._key.length));
        }
        return btoa(result);
    },
    deobfuscate(data) {
        if (!data) return null;
        try {
            const str = atob(data);
            let result = '';
            for (let i = 0; i < str.length; i++) {
                result += String.fromCharCode(str.charCodeAt(i) ^ this._key.charCodeAt(i % this._key.length));
            }
            return result;
        } catch (e) { return null; }
    },
    save(key, value) {
        localStorage.setItem(key, this.obfuscate(value));
    },
    load(key, defaultValue) {
        const data = localStorage.getItem(key);
        const val = this.deobfuscate(data);
        return val !== null ? (isNaN(val) ? (typeof val === 'string' && (val.startsWith('[') || val.startsWith('{')) ? val : val) : parseInt(val)) : defaultValue;
    },
    validateMove(lastTime, interval) {
        const now = Date.now();
        // Allow a small 10ms grace period for browser timing jitter
        if (now - lastTime < interval - 10) {
            console.warn('Speed hack detected!');
            return false;
        }
        return true;
    },
    checkIntegrity(score, coins) {
        // Simple internal consistency check
        // Check if values were modified by console directly
        if (this._lastScore !== undefined && score < this._lastScore) return false;
        if (this._lastCoins !== undefined && coins < this._lastCoins) return false;
        this._lastScore = score;
        this._lastCoins = coins;
        return true;
    }
};

// Game state
let snake = [];
let direction = new THREE.Vector3(1, 0, 0);
let nextDirection = new THREE.Vector3(1, 0, 0);
let food = null;
let coin = null;
let score = 0;
let highScore = Security.load('snake3d_highscore_secure', 0);
let coins = Security.load('snake3d_coins_secure', 0);
let ownedSkins = JSON.parse(Security.load('snake3d_owned_skins_secure', '["classic"]'));
let currentSkinId = Security.load('snake3d_current_skin_secure', 'classic');
let ownedBgs = JSON.parse(Security.load('snake3d_owned_bgs_secure', '["space"]'));
let currentBgId = Security.load('snake3d_current_bg_secure', 'space');
let lastMoveTime = 0;
let moveInterval = INITIAL_MOVE_INTERVAL;
let gameOver = false;
let gameStarted = false;
let particles = [];
let decorativeObjects = [];
let cheaterDetected = false;
let starfield = null;

// Audio setup
class AudioManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.reverbNode = null;
        this.musicLoopId = null;
        this.currentMusicConfig = null;
        this.externalMusicSource = null;
        this.externalAudioBuffers = new Map();
        this.isMuted = false;
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.2;
        
        // Create Reverb
        this.reverbNode = this.ctx.createConvolver();
        this.createReverb(1.5, 2.0); // Default reverb
        
        this.masterGain.connect(this.ctx.destination);
    }

    // Procedural Reverb Impulse Response
    createReverb(duration, decay) {
        if (!this.ctx) return;
        const sampleRate = this.ctx.sampleRate;
        const length = sampleRate * duration;
        const impulse = this.ctx.createBuffer(2, length, sampleRate);
        for (let i = 0; i < 2; i++) {
            const channel = impulse.getChannelData(i);
            for (let j = 0; j < length; j++) {
                channel[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / length, decay);
            }
        }
        this.reverbNode.buffer = impulse;
    }

    async loadExternalAudio(url, base64 = null) {
        if (!this.ctx) this.init();
        if (this.externalAudioBuffers.has(url)) return this.externalAudioBuffers.get(url);
        
        try {
            let buffer;
            if (base64) {
                // Load from base64 (Mod memory)
                const response = await fetch(base64);
                const arrayBuffer = await response.arrayBuffer();
                buffer = await this.ctx.decodeAudioData(arrayBuffer);
            } else {
                // Load from URL (Traditional mod folder)
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                buffer = await this.ctx.decodeAudioData(arrayBuffer);
            }
            this.externalAudioBuffers.set(url, buffer);
            return buffer;
        } catch (e) {
            console.error('Audio load failed:', url, e);
            return null;
        }
    }

    playExternalSound(url) {
        if (!this.ctx || !this.externalAudioBuffers.has(url)) return false;
        const source = this.ctx.createBufferSource();
        source.buffer = this.externalAudioBuffers.get(url);
        source.connect(this.masterGain);
        source.start(0);
        return true;
    }

    updateMusicTheme(bgId) {
        const bg = BACKGROUNDS.find(b => b.id === bgId) || BACKGROUNDS[0];
        if (this.currentMusicConfig === bg.music) return;
        this.currentMusicConfig = bg.music;
        
        if (this.ctx) {
            this.createReverb(2.0, (bg.music?.reverb || 0.5) * 5 || 2.0);
        }
        this.startBackgroundMusic();
    }

    // Advanced Procedural Synth Voice
    playSynth(freq, type, gainValue, filterFreq, duration, time, options = {}) {
        if (!this.ctx || freq === null) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);
        
        if (options.freqSweep) {
            osc.frequency.exponentialRampToValueAtTime(options.freqSweep, time + duration);
        }

        filter.type = options.filterType || 'lowpass';
        filter.frequency.setValueAtTime(filterFreq, time);
        if (options.filterSweep) {
            filter.frequency.exponentialRampToValueAtTime(options.filterSweep, time + duration);
        }

        // ADSR Envelope
        const attack = options.attack || 0.01;
        const decay = options.decay || 0.1;
        const sustain = options.sustain !== undefined ? options.sustain : 0.5;
        const release = options.release || 0.2;

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(gainValue, time + attack);
        gain.gain.exponentialRampToValueAtTime(gainValue * sustain, time + attack + decay);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        
        // Route to reverb if requested
        if (options.useReverb) {
            gain.connect(this.reverbNode);
            this.reverbNode.connect(this.masterGain);
        } else {
            gain.connect(this.masterGain);
        }

        osc.start(time);
        osc.stop(time + duration + release);
    }

    playEatSound() {
        const bg = BACKGROUNDS.find(b => b.id === currentBgId);
        if (bg?.sfx?.eat && this.playExternalSound(bg.sfx.eat)) return;
        this.init();
        const now = this.ctx.currentTime;
        // Harmonic blip
        this.playSynth(440, 'square', 0.2, 2000, 0.1, now, { freqSweep: 880, filterSweep: 500 });
        this.playSynth(660, 'sine', 0.1, 3000, 0.1, now, { freqSweep: 1320 });
    }

    playCoinSound() {
        const bg = BACKGROUNDS.find(b => b.id === currentBgId);
        if (bg?.sfx?.coin && this.playExternalSound(bg.sfx.coin)) return;
        this.init();
        const now = this.ctx.currentTime;
        // "Ding" sound with reverb
        this.playSynth(987.77, 'sine', 0.2, 5000, 0.4, now, { 
            freqSweep: 1975.53, 
            attack: 0.005, 
            release: 0.3, 
            useReverb: true 
        });
    }

    playErrorSound() {
        this.init();
        const now = this.ctx.currentTime;
        this.playSynth(150, 'sawtooth', 0.2, 800, 0.3, now, { freqSweep: 40, filterSweep: 100 });
    }

    playGameOverSound() {
        const bg = BACKGROUNDS.find(b => b.id === currentBgId);
        if (bg?.sfx?.gameover && this.playExternalSound(bg.sfx.gameover)) return;
        this.init();
        const now = this.ctx.currentTime;
        // Dramatic descent
        this.playSynth(220, 'sawtooth', 0.3, 1000, 1.0, now, { freqSweep: 55, filterSweep: 50, useReverb: true });
        this.playSynth(110, 'square', 0.2, 500, 1.0, now, { freqSweep: 27.5 });
    }

    playUiHover() {
        this.init();
        this.playSynth(880, 'sine', 0.05, 2000, 0.05, this.ctx.currentTime, { attack: 0.001 });
    }

    playUiClick() {
        this.init();
        this.playSynth(1760, 'sine', 0.1, 4000, 0.08, this.ctx.currentTime, { freqSweep: 2200 });
    }

    stopBackgroundMusic() {
        if (this.musicLoopId) clearTimeout(this.musicLoopId);
        if (this.externalMusicSource) {
            this.externalMusicSource.stop();
            this.externalMusicSource = null;
        }
    }

    async startBackgroundMusic() {
        if (!this.ctx) return;
        this.stopBackgroundMusic();
        
        const config = this.currentMusicConfig || BACKGROUNDS[0].music;
        if (!config) return;

        // Priority 1: Modded External Audio File
        if (config.fileName) {
            const mod = ModManager.mods.find(m => m.enabled && m.assets?.[config.fileName]);
            const buffer = await this.loadExternalAudio(config.fileName, mod?.assets?.[config.fileName]);
            if (buffer) {
                this.externalMusicSource = this.ctx.createBufferSource();
                this.externalMusicSource.buffer = buffer;
                this.externalMusicSource.loop = true;
                this.externalMusicSource.connect(this.masterGain);
                this.externalMusicSource.start(0);
                return;
            }
        }

        // Priority 2: Modded URL (Backward compatibility)
        if (config.externalUrl) {
            const buffer = await this.loadExternalAudio(config.externalUrl);
            if (buffer) {
                this.externalMusicSource = this.ctx.createBufferSource();
                this.externalMusicSource.buffer = buffer;
                this.externalMusicSource.loop = true;
                this.externalMusicSource.connect(this.masterGain);
                this.externalMusicSource.start(0);
                return;
            }
        }

        // Priority 3: Procedural Tracks
        if (config.tracks) {
            let time = this.ctx.currentTime + 0.1;
            const loop = () => {
                if (this.currentMusicConfig !== config) return;
                
                const longestTrack = Math.max(...config.tracks.map(t => t.sequence.length));
                
                config.tracks.forEach(track => {
                    track.sequence.forEach((freq, i) => {
                        if (freq === null) return;
                        const f = config.random ? freq * (0.95 + Math.random() * 0.1) : freq;
                        const noteTime = time + i * config.speed;
                        this.playSynth(f, track.type, track.gain, track.filter, config.speed * 0.9, noteTime, {
                            useReverb: true,
                            decay: config.speed * 0.5,
                            sustain: 0.3
                        });
                    });
                });

                time += longestTrack * config.speed;
                const delay = (time - this.ctx.currentTime) * 1000;
                this.musicLoopId = setTimeout(loop, Math.max(0, delay - 100));
            };
            loop();
        }
    }
}

const audioManager = new AudioManager();

// Texture & Model Loaders
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

// Glitch Fallback Texture (Classic Magenta/Black Checkerboard)
function createGlitchTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillRect(32, 32, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
}
const glitchTexture = createGlitchTexture();

const planetTextures = {
    earthDay: textureLoader.load('textures/earth/earth-day.png'),
    earthNight: textureLoader.load('textures/earth/earth-night.png'),
    venus: textureLoader.load('textures/venus/venus.png')
};

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);
controls.update();

// Lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Grid helper
const gridHelper = new THREE.GridHelper(GRID_SIZE, GRID_SIZE, 0x888888, 0x444444);
scene.add(gridHelper);

// Starfield background
function createStarfield() {
    if (starfield) scene.remove(starfield);
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starVertices = [];
    for (let i = 0; i < 2000; i++) {
        const x = (Math.random() - 0.5) * 500;
        const y = (Math.random() - 0.5) * 500;
        const z = (Math.random() - 0.5) * 500;
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);
}

function updateBackground() {
    const bg = BACKGROUNDS.find(b => b.id === currentBgId) || BACKGROUNDS[0];
    scene.background = new THREE.Color(bg.color);
    scene.fog = new THREE.Fog(bg.fog, 20, 100);
    
    // Advanced Lighting Controls
    ambientLight.color.set(bg.ambientLightColor || 0x404040);
    ambientLight.intensity = bg.ambientLightIntensity !== undefined ? bg.ambientLightIntensity : 1.0;
    pointLight.color.set(bg.pointLightColor || 0xffffff);
    pointLight.intensity = bg.pointLightIntensity !== undefined ? bg.pointLightIntensity : 1.0;

    gridHelper.material.color.set(bg.grid);
    gridHelper.material.opacity = bg.gridOpacity !== undefined ? bg.gridOpacity : 1.0;
    gridHelper.material.transparent = gridHelper.material.opacity < 1.0;
    
    if (bg.stars) {
        if (!starfield) createStarfield();
        starfield.visible = true;
        // Apply star tweaks
        starfield.material.size = bg.starSize || 0.1;
        starfield.material.color.set(bg.starColor || 0xffffff);
    } else if (starfield) {
        starfield.visible = false;
    }

    // Clear old decorative objects
    decorativeObjects.forEach(obj => scene.remove(obj.mesh));
    decorativeObjects = [];

    // Create new decorative objects based on environment
    switch (bg.envType) {
        case 'planets':
            // Earth with Day/Night Shader
            const earthGeom = new THREE.SphereGeometry(8, 64, 64);
            const earthMat = new THREE.ShaderMaterial({
                uniforms: {
                    dayTexture: { value: planetTextures.earthDay },
                    nightTexture: { value: planetTextures.earthNight },
                    sunDirection: { value: new THREE.Vector3(1, 0.2, 1).normalize() }
                },
                vertexShader: `
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec3 vSunDirection;
                    void main() {
                        vUv = uv;
                        vNormal = normalize(normalMatrix * normal);
                        vSunDirection = normalize(sunDirection);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform sampler2D dayTexture;
                    uniform sampler2D nightTexture;
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec3 vSunDirection;
                    void main() {
                        float intensity = dot(vNormal, vSunDirection);
                        vec4 dayColor = texture2D(dayTexture, vUv);
                        vec4 nightColor = texture2D(nightTexture, vUv);
                        
                        // Blend day and night based on light intensity
                        float mixRatio = smoothstep(-0.2, 0.2, intensity);
                        gl_FragColor = mix(nightColor, dayColor, mixRatio);
                    }
                `
            });
            const earth = new THREE.Mesh(earthGeom, earthMat);
            earth.position.set(-40, 10, -40);
            scene.add(earth);
            decorativeObjects.push({ mesh: earth, rotationSpeed: 0.002 });

            // Venus
            const venusGeom = new THREE.SphereGeometry(6, 64, 64);
            const venusMat = new THREE.MeshPhongMaterial({ 
                map: planetTextures.venus,
                emissive: 0x221100,
                emissiveIntensity: 0.2,
                shininess: 10
            });
            const venus = new THREE.Mesh(venusGeom, venusMat);
            venus.position.set(40, -10, -30);
            scene.add(venus);
            decorativeObjects.push({ mesh: venus, rotationSpeed: 0.001 });

            // Random extra asteroids/planets
            for (let i = 0; i < 4; i++) {
                const geometry = new THREE.SphereGeometry(Math.random() * 1.5 + 0.5, 16, 16);
                const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x888888 }));
                mesh.position.set(
                    (Math.random() - 0.5) * 150,
                    (Math.random() - 0.5) * 150,
                    (Math.random() - 0.5) * 150
                );
                if (mesh.position.length() < 30) mesh.position.multiplyScalar(2);
                scene.add(mesh);
                decorativeObjects.push({ mesh, rotationSpeed: Math.random() * 0.01 });
            }
            break;
        case 'cubes':
            for (let i = 0; i < 20; i++) {
                const geometry = new THREE.BoxGeometry(2, 2, 2);
                const material = new THREE.MeshPhongMaterial({ color: 0x00ffff, wireframe: true });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    (Math.random() - 0.5) * 100,
                    Math.random() * 50,
                    (Math.random() - 0.5) * 100
                );
                scene.add(mesh);
                decorativeObjects.push({ mesh, rotationSpeed: Math.random() * 0.02 });
            }
            break;
        case 'sun':
            const sunGeom = new THREE.SphereGeometry(10, 32, 32);
            const sunMat = new THREE.MeshBasicMaterial({ color: 0xff00ff });
            const sunMesh = new THREE.Mesh(sunGeom, sunMat);
            sunMesh.position.set(0, 0, -80);
            scene.add(sunMesh);
            decorativeObjects.push({ mesh: sunMesh, rotationSpeed: 0.001 });
            break;
        case 'code':
            for (let i = 0; i < 50; i++) {
                const geometry = new THREE.PlaneGeometry(0.5, 5);
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    (Math.random() - 0.5) * 100,
                    Math.random() * 100,
                    (Math.random() - 0.5) * 100
                );
                scene.add(mesh);
                decorativeObjects.push({ mesh, speed: Math.random() * 0.5 + 0.1 });
            }
            break;
        case 'lava':
            for (let i = 0; i < 15; i++) {
                const geometry = new THREE.SphereGeometry(Math.random() * 3 + 1, 8, 8);
                const material = new THREE.MeshPhongMaterial({ color: 0xff4400, emissive: 0x441100 });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    (Math.random() - 0.5) * 100,
                    -10,
                    (Math.random() - 0.5) * 100
                );
                scene.add(mesh);
                decorativeObjects.push({ mesh, floatSpeed: Math.random() * 0.05 + 0.02, initialY: -10 });
            }
            break;
        case 'blackhole':
            // Singularity
            const singularity = new THREE.Mesh(
                new THREE.SphereGeometry(15, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0x000000 })
            );
            singularity.position.set(0, 0, -100);
            scene.add(singularity);
            decorativeObjects.push({ mesh: singularity, rotationSpeed: 0.005 });

            // Accretion Disk
            const diskGeom = new THREE.TorusGeometry(25, 5, 2, 100);
            const diskMat = new THREE.MeshBasicMaterial({ 
                color: 0xffaa00, 
                transparent: true, 
                opacity: 0.8,
                side: THREE.DoubleSide 
            });
            const disk = new THREE.Mesh(diskGeom, diskMat);
            disk.position.set(0, 0, -100);
            disk.rotation.x = Math.PI / 2.5;
            scene.add(disk);
            decorativeObjects.push({ mesh: disk, rotationSpeed: 0.02 });
            
            // Distant gravitational lens effect (glow)
            const glowGeom = new THREE.SphereGeometry(30, 32, 32);
            const glowMat = new THREE.MeshBasicMaterial({ 
                color: 0x4400ff, 
                transparent: true, 
                opacity: 0.2,
                side: THREE.BackSide 
            });
            const glow = new THREE.Mesh(glowGeom, glowMat);
            glow.position.set(0, 0, -100);
            scene.add(glow);
            decorativeObjects.push({ mesh: glow, rotationSpeed: -0.01 });
            break;
        case 'custom':
            const modAssets = ModManager.assets.get(currentBgId);
            if (modAssets?.customModel) {
                // Apply texture to model if specified
                if (modAssets.envTexture) {
                    modAssets.customModel.traverse(child => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshPhongMaterial({ map: modAssets.envTexture });
                        }
                    });
                }
                
                // Clone the pre-loaded model
                for (let i = 0; i < 5; i++) {
                    const mesh = modAssets.customModel.clone();
                    mesh.position.set(
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 50,
                        (Math.random() - 0.5) * 100
                    );
                    mesh.scale.setScalar(2);
                    scene.add(mesh);
                    decorativeObjects.push({ mesh, rotationSpeed: 0.01 });
                }
            } else if (modAssets?.envTexture || BACKGROUNDS.find(b => b.id === currentBgId)?.texturePath) {
                // Apply custom texture to planets
                const tex = modAssets?.envTexture || glitchTexture;
                for (let i = 0; i < 5; i++) {
                    const geometry = new THREE.SphereGeometry(Math.random() * 3 + 1, 32, 32);
                    const material = new THREE.MeshPhongMaterial({ map: tex });
                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.position.set((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
                    scene.add(mesh);
                    decorativeObjects.push({ mesh, rotationSpeed: 0.01 });
                }
            } else {
                // Fallback mystery geom
                const mysteryGeom = new THREE.IcosahedronGeometry(10, 1);
                const mysteryMat = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true });
                const mysteryMesh = new THREE.Mesh(mysteryGeom, mysteryMat);
                mysteryMesh.position.set(0, 20, -50);
                scene.add(mysteryMesh);
                decorativeObjects.push({ mesh: mysteryMesh, rotationSpeed: 0.01 });
            }
            break;
    }
}
updateBackground();

// Particles
function createParticle(pos, color) {
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const particle = new THREE.Mesh(geometry, material);
    particle.position.copy(pos);
    const velocity = new THREE.Vector3((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2);
    scene.add(particle);
    particles.push({ mesh: particle, velocity, life: 1.0 });
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.mesh.position.add(p.velocity);
        p.life -= 0.02;
        p.mesh.scale.set(p.life, p.life, p.life);
        if (p.life <= 0) {
            scene.remove(p.mesh);
            particles.splice(i, 1);
        }
    }
}

// Materials
const foodMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x440000 });
const coinMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc00, emissive: 0x443300 });
const cubeGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);

function getSkinMaterials(skinId) {
    const skin = SKINS.find(s => s.id === skinId) || SKINS[0];
    const modAssets = ModManager.assets.get(skinId);
    
    // Check if texture was supposed to exist but failed (404)
    const hTex = modAssets?.headTexture || (skin.isMod && skin.headTexture ? glitchTexture : null);
    const bTex = modAssets?.bodyTexture || (skin.isMod && skin.bodyTexture ? glitchTexture : null);

    return {
        head: new THREE.MeshPhongMaterial({ 
            color: skin.head, 
            map: hTex,
            emissive: skin.emissive || (skin.head & 0x333333),
            emissiveIntensity: skin.emissiveIntensity || 1.0,
            shininess: skin.shininess || 30,
            opacity: skin.opacity || 1.0,
            transparent: skin.transparent || false
        }),
        body: new THREE.MeshPhongMaterial({ 
            color: skin.body,
            map: bTex,
            opacity: skin.opacity || 1.0,
            transparent: skin.transparent || false,
            shininess: skin.shininess || 30
        })
    };
}

function initGame() {
    snake.forEach(segment => scene.remove(segment.mesh));
    snake = [];
    if (food) scene.remove(food.mesh);
    food = null;
    if (coin) scene.remove(coin.mesh);
    coin = null;

    const materials = getSkinMaterials(currentSkinId);
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        const mesh = new THREE.Mesh(cubeGeometry, i === 0 ? materials.head : materials.body);
        const pos = new THREE.Vector3(-i + 0.5, 0.5, 0.5);
        mesh.position.copy(pos);
        scene.add(mesh);
        snake.push({ pos, mesh });
    }

    direction.set(1, 0, 0);
    nextDirection.set(1, 0, 0);
    score = 0;
    moveInterval = INITIAL_MOVE_INTERVAL;
    gameOver = false;
    cheaterDetected = false;
    Security._lastScore = 0;
    Security._lastCoins = coins;
    updateUI();
    spawnFood();
    spawnCoin();
}

function spawnFood() {
    if (food) scene.remove(food.mesh);
    const currentY = snake.length > 0 ? snake[0].pos.y : 0.5;
    const pos = new THREE.Vector3(
        Math.floor(Math.random() * GRID_SIZE) - GRID_SIZE / 2 + 0.5,
        currentY,
        Math.floor(Math.random() * GRID_SIZE) - GRID_SIZE / 2 + 0.5
    );
    if (snake.some(segment => segment.pos.distanceTo(pos) < 0.1) || (coin && coin.pos.distanceTo(pos) < 0.1)) {
        spawnFood();
        return;
    }
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), foodMaterial);
    mesh.position.copy(pos);
    scene.add(mesh);
    food = { pos, mesh };
}

function spawnCoin() {
    if (coin) scene.remove(coin.mesh);
    const currentY = snake.length > 0 ? snake[0].pos.y : 0.5;
    const pos = new THREE.Vector3(
        Math.floor(Math.random() * GRID_SIZE) - GRID_SIZE / 2 + 0.5,
        currentY,
        Math.floor(Math.random() * GRID_SIZE) - GRID_SIZE / 2 + 0.5
    );
    // Ensure coin doesn't spawn on snake or food
    if (snake.some(segment => segment.pos.distanceTo(pos) < 0.1) || (food && food.pos.distanceTo(pos) < 0.1)) {
        spawnCoin();
        return;
    }
    // Spinning coin mesh (cylinder as a flat disk)
    const geometry = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 16);
    const mesh = new THREE.Mesh(geometry, coinMaterial);
    mesh.position.copy(pos);
    mesh.rotation.x = Math.PI / 2; // Flat disk facing camera
    scene.add(mesh);
    coin = { pos, mesh };
}

function update() {
    if (gameOver || !gameStarted || cheaterDetected) return;

    const currentTime = Date.now();
    const t = TRANSLATIONS[LanguageManager.current];

    if (currentTime - lastMoveTime < moveInterval - 10) return; // Basic rate check
    
    // Validate move timing (anti-speed hack)
    if (lastMoveTime > 0 && !Security.validateMove(lastMoveTime, moveInterval)) {
        endGame(t.cheater_speed);
        cheaterDetected = true;
        return;
    }
    
    // Check integrity of values
    if (!Security.checkIntegrity(score, coins)) {
        endGame(t.cheater_value);
        cheaterDetected = true;
        return;
    }
    
    lastMoveTime = currentTime;

    direction.copy(nextDirection);
    const newHeadPos = snake[0].pos.clone().add(direction);
    const limit = GRID_SIZE / 2;
    if (Math.abs(newHeadPos.x) > limit || Math.abs(newHeadPos.y) > limit || Math.abs(newHeadPos.z) > limit) {
        endGame();
        return;
    }
    if (snake.some(segment => segment.pos.distanceTo(newHeadPos) < 0.1)) {
        endGame();
        return;
    }

    // Check food collision
    const ateFood = newHeadPos.distanceTo(food.pos) < 0.1;
    // Check coin collision
    const ateCoin = coin && newHeadPos.distanceTo(coin.pos) < 0.1;

    const t = TRANSLATIONS[LanguageManager.current];

    if (ateFood) {
        // Growth: we add the head and DON'T remove the tail
        score += 10;
        // Coins are now separate, food only gives score
        updateUI();
        moveInterval = Math.max(MIN_MOVE_INTERVAL, INITIAL_MOVE_INTERVAL - Math.floor(score / 50) * 10);
        audioManager.playEatSound();
        const pColor = BACKGROUNDS.find(b => b.id === currentBgId)?.particleColor || 0xff0000;
        for (let i = 0; i < 15; i++) createParticle(food.pos, pColor);
        spawnFood();
    } else if (ateCoin) {
        // Coin collection: don't grow, but give coins
        coins += 5; // Coins give more value now that they are separate
        updateUI();
        audioManager.playCoinSound();
        const cColor = BACKGROUNDS.find(b => b.id === currentBgId)?.particleColor || 0xffcc00;
        for (let i = 0; i < 15; i++) createParticle(coin.pos, cColor);
        spawnCoin();
        
        // When eating a coin, we still need to move, so we remove the tail
        const tail = snake.pop();
        scene.remove(tail.mesh);
    } else {
        // Normal move: remove tail
        const tail = snake.pop();
        scene.remove(tail.mesh);
    }

    const materials = getSkinMaterials(currentSkinId);
    const newHeadMesh = new THREE.Mesh(cubeGeometry, materials.head);
    newHeadMesh.position.copy(newHeadPos);
    scene.add(newHeadMesh);
    if (snake.length > 1) snake[0].mesh.material = materials.body;
    snake.unshift({ pos: newHeadPos, mesh: newHeadMesh });
}

function updateUI() {
    document.getElementById('score').innerText = score;
    document.getElementById('high-score').innerText = highScore;
    document.getElementById('coins').innerText = coins;
    document.getElementById('menu-high-score').innerText = highScore;
    document.getElementById('menu-coins').innerText = coins;
    
    // Secure saving
    Security.save('snake3d_coins_secure', coins);
}

function endGame(reason = null) {
    gameOver = true;
    audioManager.playGameOverSound();
    const t = TRANSLATIONS[LanguageManager.current];
    
    if (reason) {
        alert(reason);
        // If they cheated, reset their coins and highscore
        if (cheaterDetected) {
            coins = 0;
            highScore = 0;
            Security.save('snake3d_coins_secure', 0);
            Security.save('snake3d_highscore_secure', 0);
            updateUI();
        }
    } else {
        // Normal game over: Update high score
        if (score > highScore) {
            highScore = score;
            Security.save('snake3d_highscore_secure', highScore);
        }
    }
    
    updateUI();
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'flex';
        gameStarted = false;
        cheaterDetected = false; // Reset for next run
    }, 1000);
}

// Shop Logic
let shopScene, shopCamera, shopRenderer, shopSnake, shopGrid, shopStars;
let shopDecorativeObjects = [];
let shopCurrentBgId = null;

function initShopPreview() {
    const container = document.getElementById('skin-preview-container');
    if (!container) return; // Guard for early calls

    shopScene = new THREE.Scene();
    shopCamera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    shopRenderer = new THREE.WebGLRenderer({ antialias: true });
    shopRenderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(shopRenderer.domElement);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    shopScene.add(light);
    shopScene.add(new THREE.AmbientLight(0x404040));
    shopCamera.position.set(0, 2, 5);
    shopCamera.lookAt(0, 0, 0);

    // Initial shop background state
    shopCurrentBgId = currentBgId;
    updateShopPreviewBg();

    const list = document.getElementById('skin-list');
    list.innerHTML = '';
    SKINS.forEach(skin => {
        const item = document.createElement('div');
        item.className = `skin-item ${ownedSkins.includes(skin.id) ? '' : 'locked'} ${currentSkinId === skin.id ? 'selected' : ''}`;
        item.innerHTML = `<h3>${skin.name}</h3><div class="price">${ownedSkins.includes(skin.id) ? 'OWNED' : skin.price + ' Coins'}</div>`;
        item.onclick = () => selectSkin(skin);
        list.appendChild(item);
    });

    const bgList = document.getElementById('bg-list');
    bgList.innerHTML = '';
    BACKGROUNDS.forEach(bg => {
        const item = document.createElement('div');
        item.className = `bg-item ${ownedBgs.includes(bg.id) ? '' : 'locked'} ${currentBgId === bg.id ? 'selected' : ''}`;
        item.innerHTML = `<h3>${bg.name}</h3><div class="price">${ownedBgs.includes(bg.id) ? 'OWNED' : bg.price + ' Coins'}</div>`;
        item.onclick = () => selectBg(bg);
        bgList.appendChild(item);
    });
}

function selectSkin(skin) {
    const t = TRANSLATIONS[LanguageManager.current];
    audioManager.playUiClick();
    if (!ownedSkins.includes(skin.id)) {
        if (coins >= skin.price) {
            coins -= skin.price;
            ownedSkins.push(skin.id);
            Security.save('snake3d_owned_skins_secure', JSON.stringify(ownedSkins));
            updateUI();
            updateShopList();
        } else {
            audioManager.playErrorSound();
            alert(t.not_enough);
            return;
        }
    }
    currentSkinId = skin.id;
    Security.save('snake3d_current_skin_secure', currentSkinId);
    updateShopList();
    updateShopPreview();
}

function selectBg(bg) {
    const t = TRANSLATIONS[LanguageManager.current];
    audioManager.playUiClick();
    if (!ownedBgs.includes(bg.id)) {
        if (coins >= bg.price) {
            coins -= bg.price;
            ownedBgs.push(bg.id);
            Security.save('snake3d_owned_bgs_secure', JSON.stringify(ownedBgs));
            updateUI();
            updateShopList();
        } else {
            audioManager.playErrorSound();
            alert(t.not_enough);
            return;
        }
    }
    currentBgId = bg.id;
    shopCurrentBgId = bg.id; // Update shop preview background
    Security.save('snake3d_current_bg_secure', currentBgId);
    updateShopList();
    updateBackground();
    updateShopPreviewBg(); // Re-render shop background
    audioManager.updateMusicTheme(bg.id); // Update music in real-time
}

function updateShopList() {
    const skinList = document.getElementById('skin-list');
    const bgList = document.getElementById('bg-list');
    if (!skinList || !bgList) return;

    const t = TRANSLATIONS[LanguageManager.current];

    skinList.innerHTML = '';
    SKINS.forEach(skin => {
        const item = document.createElement('div');
        item.className = `skin-item ${ownedSkins.includes(skin.id) ? '' : 'locked'} ${currentSkinId === skin.id ? 'selected' : ''}`;
        
        const skinName = skin.isMod ? skin.name : (t.skins_list[skin.id] || skin.name);
        const priceText = ownedSkins.includes(skin.id) ? t.owned : `${skin.price} ${t.coins}`;
        
        item.innerHTML = `<h3>${skinName}</h3><div class="price">${priceText}</div>`;
        item.onclick = () => selectSkin(skin);
        item.onmouseenter = () => audioManager.playUiHover();
        skinList.appendChild(item);
    });

    bgList.innerHTML = '';
    BACKGROUNDS.forEach(bg => {
        const item = document.createElement('div');
        item.className = `bg-item ${ownedBgs.includes(bg.id) ? '' : 'locked'} ${currentBgId === bg.id ? 'selected' : ''}`;
        
        const bgName = bg.isMod ? bg.name : (t.bg_list[bg.id] || bg.name);
        const priceText = ownedBgs.includes(bg.id) ? t.owned : `${bg.price} ${t.coins}`;
        
        item.innerHTML = `<h3>${bgName}</h3><div class="price">${priceText}</div>`;
        item.onclick = () => selectBg(bg);
        item.onmouseenter = () => audioManager.playUiHover();
        bgList.appendChild(item);
    });
}

// Tab Switching
document.getElementById('tab-skins').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('tab-skins').classList.add('active');
    document.getElementById('tab-backgrounds').classList.remove('active');
    document.getElementById('tab-mods').classList.remove('active');
    document.getElementById('skin-list').style.display = 'grid';
    document.getElementById('bg-list').style.display = 'none';
    document.getElementById('mod-management').style.display = 'none';
};

document.getElementById('tab-backgrounds').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('tab-backgrounds').classList.add('active');
    document.getElementById('tab-skins').classList.remove('active');
    document.getElementById('tab-mods').classList.remove('active');
    document.getElementById('skin-list').style.display = 'none';
    document.getElementById('bg-list').style.display = 'grid';
    document.getElementById('mod-management').style.display = 'none';
};

document.getElementById('tab-mods').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('tab-mods').classList.add('active');
    document.getElementById('tab-skins').classList.remove('active');
    document.getElementById('tab-backgrounds').classList.remove('active');
    document.getElementById('skin-list').style.display = 'none';
    document.getElementById('bg-list').style.display = 'none';
    document.getElementById('mod-management').style.display = 'block';
};

function updateShopPreview() {
    if (shopSnake) shopScene.remove(shopSnake);
    const group = new THREE.Group();
    const materials = getSkinMaterials(currentSkinId);
    for (let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(cubeGeometry, i === 0 ? materials.head : materials.body);
        mesh.position.set(-i, 0, 0);
        group.add(mesh);
    }
    shopSnake = group;
    shopScene.add(shopSnake);
}

function updateShopPreviewBg() {
    if (!shopScene) return;
    const bg = BACKGROUNDS.find(b => b.id === (shopCurrentBgId || currentBgId)) || BACKGROUNDS[0];
    shopScene.background = new THREE.Color(bg.color);
    shopScene.fog = new THREE.Fog(bg.fog, 5, 20);
    
    // Update shop grid
    if (shopGrid) shopScene.remove(shopGrid);
    shopGrid = new THREE.GridHelper(10, 10, bg.grid, bg.grid);
    shopGrid.position.y = -1;
    shopScene.add(shopGrid);
    
    // Update shop stars
    if (shopStars) shopScene.remove(shopStars);
    if (bg.stars) {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
        const starVertices = [];
        for (let i = 0; i < 500; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            starVertices.push(x, y, z);
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        shopStars = new THREE.Points(starGeometry, starMaterial);
        shopScene.add(shopStars);
    }

    // Update shop decorative objects
    shopDecorativeObjects.forEach(obj => shopScene.remove(obj.mesh));
    shopDecorativeObjects = [];

    switch (bg.envType) {
        case 'planets':
            // Small Earth for Shop
            const earthGeom = new THREE.SphereGeometry(1.5, 32, 32);
            const earthMat = new THREE.ShaderMaterial({
                uniforms: {
                    dayTexture: { value: planetTextures.earthDay },
                    nightTexture: { value: planetTextures.earthNight },
                    sunDirection: { value: new THREE.Vector3(1, 0.2, 1).normalize() }
                },
                vertexShader: `
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec3 vSunDirection;
                    void main() {
                        vUv = uv;
                        vNormal = normalize(normalMatrix * normal);
                        vSunDirection = normalize(sunDirection);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform sampler2D dayTexture;
                    uniform sampler2D nightTexture;
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec3 vSunDirection;
                    void main() {
                        float intensity = dot(vNormal, vSunDirection);
                        vec4 dayColor = texture2D(dayTexture, vUv);
                        vec4 nightColor = texture2D(nightTexture, vUv);
                        float mixRatio = smoothstep(-0.2, 0.2, intensity);
                        gl_FragColor = mix(nightColor, dayColor, mixRatio);
                    }
                `
            });
            const earth = new THREE.Mesh(earthGeom, earthMat);
            earth.position.set(-4, 2, -5);
            shopScene.add(earth);
            shopDecorativeObjects.push({ mesh: earth, rotationSpeed: 0.01 });

            // Small Venus for Shop
            const venus = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshPhongMaterial({ map: planetTextures.venus })
            );
            venus.position.set(4, -1, -4);
            shopScene.add(venus);
            shopDecorativeObjects.push({ mesh: venus, rotationSpeed: 0.005 });
            break;
        case 'cubes':
            for (let i = 0; i < 10; i++) {
                const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x00ffff, wireframe: true }));
                mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
                shopScene.add(mesh);
                shopDecorativeObjects.push({ mesh, rotationSpeed: 0.03 });
            }
            break;
        case 'sun':
            const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff00ff }));
            sunMesh.position.set(0, 0, -10);
            shopScene.add(sunMesh);
            shopDecorativeObjects.push({ mesh: sunMesh, rotationSpeed: 0.01 });
            break;
        case 'code':
            for (let i = 0; i < 20; i++) {
                const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 }));
                mesh.position.set((Math.random() - 0.5) * 10, Math.random() * 10, (Math.random() - 0.5) * 10);
                shopScene.add(mesh);
                shopDecorativeObjects.push({ mesh, speed: 0.1 });
            }
            break;
        case 'lava':
            for (let i = 0; i < 10; i++) {
                const mesh = new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 0.5 + 0.2, 8, 8), new THREE.MeshPhongMaterial({ color: 0xff4400 }));
                mesh.position.set((Math.random() - 0.5) * 10, -2, (Math.random() - 0.5) * 10);
                shopScene.add(mesh);
                shopDecorativeObjects.push({ mesh, floatSpeed: 0.02, initialY: -2 });
            }
            break;
        case 'blackhole':
            const shopSingularity = new THREE.Mesh(
                new THREE.SphereGeometry(2, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0x000000 })
            );
            shopSingularity.position.set(0, 0, -8);
            shopScene.add(shopSingularity);
            shopDecorativeObjects.push({ mesh: shopSingularity, rotationSpeed: 0.01 });

            const shopDisk = new THREE.Mesh(
                new THREE.TorusGeometry(3.5, 0.5, 2, 50),
                new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
            );
            shopDisk.position.set(0, 0, -8);
            shopDisk.rotation.x = Math.PI / 2.5;
            shopScene.add(shopDisk);
            shopDecorativeObjects.push({ mesh: shopDisk, rotationSpeed: 0.03 });
            break;
        case 'custom':
            const modShopAssets = ModManager.assets.get(shopCurrentBgId || currentBgId);
            if (modShopAssets?.customModel) {
                // Apply texture to model if specified
                if (modShopAssets.envTexture) {
                    modShopAssets.customModel.traverse(child => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshPhongMaterial({ map: modShopAssets.envTexture });
                        }
                    });
                }
                const mesh = modShopAssets.customModel.clone();
                mesh.position.set(0, 0, -5);
                mesh.scale.setScalar(1);
                shopScene.add(mesh);
                shopDecorativeObjects.push({ mesh, rotationSpeed: 0.02 });
            } else if (modShopAssets?.envTexture || BACKGROUNDS.find(b => b.id === (shopCurrentBgId || currentBgId))?.texturePath) {
                const tex = modShopAssets?.envTexture || glitchTexture;
                const mesh = new THREE.Mesh(
                    new THREE.SphereGeometry(1, 32, 32),
                    new THREE.MeshPhongMaterial({ map: tex })
                );
                mesh.position.set(0, 0, -5);
                shopScene.add(mesh);
                shopDecorativeObjects.push({ mesh, rotationSpeed: 0.02 });
            } else {
                const shopMystery = new THREE.Mesh(
                    new THREE.IcosahedronGeometry(2, 1),
                    new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true })
                );
                shopMystery.position.set(0, 0, -8);
                shopScene.add(shopMystery);
                shopDecorativeObjects.push({ mesh: shopMystery, rotationSpeed: 0.02 });
            }
            break;
    }
}

function animateDecorativeObjects(objects) {
    objects.forEach(obj => {
        if (obj.rotationSpeed) {
            obj.mesh.rotation.y += obj.rotationSpeed;
            obj.mesh.rotation.x += obj.rotationSpeed * 0.5;
        }
        if (obj.speed) {
            obj.mesh.position.y -= obj.speed;
            if (obj.mesh.position.y < -50) obj.mesh.position.y = 50;
        }
        if (obj.floatSpeed) {
            obj.mesh.position.y = obj.initialY + Math.sin(Date.now() * 0.001 * obj.floatSpeed * 50) * 2;
        }
    });
}

function animateShop() {
    if (document.getElementById('shop-overlay').style.display !== 'none') {
        requestAnimationFrame(animateShop);
        if (shopSnake) shopSnake.rotation.y += 0.02;
        animateDecorativeObjects(shopDecorativeObjects);
        shopRenderer.render(shopScene, shopCamera);
    }
}

document.getElementById('shop-btn').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('shop-overlay').style.display = 'flex';
    audioManager.init();
    if (!shopRenderer) initShopPreview();
    updateShopPreview();
    updateShopPreviewBg(); // Ensure bg is correct when opening
    audioManager.updateMusicTheme(shopCurrentBgId || currentBgId); // Play shop bg music
    animateShop();
};

document.getElementById('close-shop-btn').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('shop-overlay').style.display = 'none';
};

document.getElementById('start-btn').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('overlay').style.display = 'none';
    audioManager.init();
    audioManager.updateMusicTheme(currentBgId); // Start themed music
    gameStarted = true;
    updateBackground(); // Ensure background is correct for game start
    initGame();
};

document.getElementById('mute-btn').onclick = () => {
    audioManager.init();
    audioManager.isMuted = !audioManager.isMuted;
    audioManager.masterGain.gain.setTargetAtTime(audioManager.isMuted ? 0 : 0.2, audioManager.ctx.currentTime, 0.1);
    document.getElementById('mute-btn').innerText = audioManager.isMuted ? '🔇' : '🔊';
    audioManager.playUiClick();
};

// Add hover sounds to all buttons
document.querySelectorAll('button').forEach(btn => {
    btn.onmouseenter = () => audioManager.playUiHover();
});

function onKeyDown(event) {
    if (!gameStarted) return;
    switch (event.key) {
        case 'ArrowUp': if (direction.z === 0) nextDirection.set(0, 0, -1); break;
        case 'ArrowDown': if (direction.z === 0) nextDirection.set(0, 0, 1); break;
        case 'ArrowLeft': if (direction.x === 0) nextDirection.set(-1, 0, 0); break;
        case 'ArrowRight': if (direction.x === 0) nextDirection.set(1, 0, 0); break;
    }
}

function animate() {
    requestAnimationFrame(animate);
    update();
    updateParticles();
    animateDecorativeObjects(decorativeObjects);
    
    if (snake.length > 0) {
        const headPos = snake[0].pos;
        const targetPos = headPos.clone().add(new THREE.Vector3(0, 10, 20));
        camera.position.lerp(targetPos, 0.05);
        controls.target.lerp(headPos, 0.1);
    }

    // Animate starfield slightly
    if (starfield) {
        starfield.rotation.y += 0.0005;
    }

    // Animate coin
    if (coin) {
        coin.mesh.rotation.y += 0.05;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('keydown', onKeyDown);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// Global Error Handling
window.onerror = function(message, source, lineno, colno, error) {
    const t = TRANSLATIONS[LanguageManager.current];
    Notifications.show(`${t.system_glitch}: ${message.split(':')[1] || message}`, 'error');
    return false;
};

// Initialize Mod Manager
ModManager.init();

// Apply Localization
LanguageManager.apply();
