import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Game constants
const GRID_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 3;
const INITIAL_MOVE_INTERVAL = 200;
const MIN_MOVE_INTERVAL = 110;

const TRANSLATIONS = {
    en: {
        game_title: "3D Snake Game",
        space_journey: "Space Journey",
        controls: "Use Arrow Keys to move",
        score: "Score",
        high: "High",
        start_game: "Start Game",
        open_shop: "Open Shop",
        skins: "Skins",
        backgrounds: "Backgrounds",
        back_to_menu: "Back to Menu",
        owned: "OWNED",
        not_enough_coins: "Not enough coins!",
        mod_picker: "Mod Picker",
        pause: "PAUSED",
        resume: "RESUME",
        coins: "Coins",
        cheater_speed: "Cheater! Speed manipulation detected.",
        cheater_tamper: "Cheater! Value tampering detected.",
        classic_green: "Classic Green",
        neon_blue: "Neon Blue",
        lava_flow: "Lava Flow",
        golden_midas: "Golden Midas",
        void_walker: "Void Walker",
        matrix_code: "Matrix Code",
        deep_space: "Deep Space",
        neon_city: "Neon City",
        sunset_grid: "Sunset Grid",
        matrix_void: "Matrix Void",
        hellscape: "Hellscape",
        event_horizon: "Event Horizon",
        mystery_void: "Mystery Void"
    },
    ar: {
        game_title: "لعبة الثعبان ثلاثية الأبعاد",
        space_journey: "رحلة الفضاء",
        controls: "استخدم مفاتيح الأسهم للتحرك",
        score: "النتيجة",
        high: "الأعلى",
        start_game: "ابدأ اللعبة",
        open_shop: "افتح المتجر",
        skins: "الأشكال",
        backgrounds: "الخلفيات",
        back_to_menu: "العودة للقائمة",
        owned: "ممتلك",
        not_enough_coins: "ليس لديك عملات كافية!",
        mod_picker: "منتقي التعديلات",
        pause: "مؤقت",
        resume: "استئناف",
        coins: "العملات",
        cheater_speed: "غشاش! تم كشف التلاعب بالسرعة.",
        cheater_tamper: "غشاش! تم كشف التلاعب بالقيم.",
        classic_green: "الأخضر الكلاسيكي",
        neon_blue: "أزرق النيون",
        lava_flow: "تدفق الحمم",
        golden_midas: "ميداس الذهبي",
        void_walker: "مشاة الفراغ",
        matrix_code: "شفرة المصفوفة",
        deep_space: "الفضاء العميق",
        neon_city: "مدينة النيون",
        sunset_grid: "شبكة الغروب",
        matrix_void: "فراغ المصفوفة",
        hellscape: "مشهد الجحيم",
        event_horizon: "أفق الحدث",
        mystery_void: "الفراغ الغامض"
    },
    zh: {
        game_title: "3D 贪吃蛇游戏",
        space_journey: "太空之旅",
        controls: "使用方向键移动",
        score: "分数",
        high: "最高分",
        start_game: "开始游戏",
        open_shop: "打开商店",
        skins: "皮肤",
        backgrounds: "背景",
        back_to_menu: "返回菜单",
        owned: "已拥有",
        not_enough_coins: "金币不足！",
        mod_picker: "模组选择器",
        pause: "已暂停",
        resume: "恢复游戏",
        coins: "金币",
        cheater_speed: "作弊者！检测到速度篡改。",
        cheater_tamper: "作弊者！检测到数值篡改。",
        classic_green: "经典绿",
        neon_blue: "霓虹蓝",
        lava_flow: "岩浆流",
        golden_midas: "黄金迈达斯",
        void_walker: "虚空行者",
        matrix_code: "黑客帝国代码",
        deep_space: "深空",
        neon_city: "霓虹之城",
        sunset_grid: "日落网格",
        matrix_void: "矩阵虚空",
        hellscape: "地狱景观",
        event_horizon: "事件视界",
        mystery_void: "神秘虚空"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update select element if it exists
    const select = document.getElementById('lang-select');
    if (select) select.value = lang;
    
    // Update static text
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (TRANSLATIONS[lang][key]) {
            el.innerText = TRANSLATIONS[lang][key];
        }
    });

    // Update shop lists if they are already initialized
    if (document.getElementById('shop-overlay').style.display !== 'none') {
        updateShopList();
    }
    
    updateUI();
}

async function detectLanguage() {
    try {
        // Use a faster/simpler API for static sites
        const response = await fetch('https://ipapi.co/json/').catch(() => null);
        if (response && response.ok) {
            const data = await response.json();
            const country = data.country_code;
            if (country === 'CN') {
                setLanguage('zh');
            } else if (['SA', 'AE', 'EG', 'JO', 'KW', 'QA', 'BH', 'OM', 'LB', 'IQ', 'DZ', 'MA', 'TN', 'LY', 'SD', 'YE'].includes(country)) {
                setLanguage('ar');
            } else {
                setLanguage('en');
            }
        } else {
            setLanguage('en');
        }
    } catch (e) {
        setLanguage('en');
    }
}

// Skins configuration
const SKINS = [
    { id: 'classic', nameKey: 'classic_green', head: 0x00ff00, body: 0x008800, price: 0 },
    { id: 'neon', nameKey: 'neon_blue', head: 0x00ffff, body: 0x0000ff, price: 50 },
    { id: 'lava', nameKey: 'lava_flow', head: 0xff4400, body: 0x880000, price: 100 },
    { id: 'gold', nameKey: 'golden_midas', head: 0xffff00, body: 0xaa8800, price: 250 },
    { id: 'void', nameKey: 'void_walker', head: 0xff00ff, body: 0x440044, price: 500 },
    { id: 'matrix', nameKey: 'matrix_code', head: 0x00ff00, body: 0x003300, emissive: 0x00ff00, price: 1000 }
];

const BACKGROUNDS = [
    { 
        id: 'space', nameKey: 'deep_space', color: 0x000000, stars: true, grid: 0x444444, fog: 0x000000, envType: 'planets', price: 0,
        groundTexture: 'moon',
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
        id: 'neon', nameKey: 'neon_city', color: 0x000022, stars: false, grid: 0x00ffff, fog: 0x000044, envType: 'cubes', price: 100,
        groundTexture: 'neon',
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
        id: 'sunset', nameKey: 'sunset_grid', color: 0x220022, stars: false, grid: 0xff00ff, fog: 0x440044, envType: 'sun', price: 200,
        groundTexture: 'retro',
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
        id: 'matrix', nameKey: 'matrix_void', color: 0x000500, stars: true, grid: 0x00ff00, fog: 0x001100, envType: 'code', price: 500,
        groundTexture: 'circuit',
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
        id: 'hell', nameKey: 'hellscape', color: 0x220000, stars: false, grid: 0xff4400, fog: 0x440000, envType: 'lava', price: 300,
        groundTexture: 'lava',
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
        id: 'blackhole', nameKey: 'event_horizon', color: 0x000000, stars: true, grid: 0x333333, fog: 0x110022, envType: 'blackhole', price: 800,
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
        id: 'mystery', nameKey: 'mystery_void', color: 0x111111, stars: true, grid: 0xffffff, fog: 0x222222, envType: 'custom', price: 1000,
        groundTexture: 'sand',
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
    assets: new Map(), // Store loaded textures/models for mods

    async loadMods() {
        try {
            const response = await fetch('mods/manifest.json').catch(e => ({ ok: false }));
            if (!response.ok) {
                if (response.status === 404) console.log('Mod manifest not found (404)');
                return;
            }
            
            const manifest = await response.json();
            for (const modFolder of manifest.mods) {
                await this.loadMod(modFolder);
            }
            updateShopList();
        } catch (e) {
            console.log('No mods found or error loading manifest.');
        }
    },

    async loadMod(folder) {
        try {
            const basePath = `mods/${folder}/`;
            const res = await fetch(`${basePath}mod.json`);
            if (!res.ok) {
                Notifications.show(`SIGNAL LOST: Failed to load mod config for "${folder}" (${res.status})`, 'warning');
                return;
            }
            const modData = await res.json();
            
            // New Metadata Requirements
            const modInfo = {
                folder,
                title: modData.title || modData.name || folder,
                description: modData.description || "No description provided.",
                banner: modData.banner ? `${basePath}${modData.banner}` : null,
                favicon: modData.favicon ? `${basePath}${modData.favicon}` : null
            };

            if (modData.skins) {
                for (const skin of modData.skins) {
                    const skinId = `mod_${folder}_${skin.id}`;
                    
                    try {
                        let headTexture = null;
                        let bodyTexture = null;
                        if (skin.headTexture) headTexture = await textureLoader.loadAsync(`${basePath}${skin.headTexture}`).catch(() => null);
                        if (skin.bodyTexture) bodyTexture = await textureLoader.loadAsync(`${basePath}${skin.bodyTexture}`).catch(() => null);
                        
                        if (skin.headTexture && !headTexture) Notifications.show(`DATA CORRUPTION: Texture 404 - ${skin.headTexture}`, 'warning');
                        if (skin.bodyTexture && !bodyTexture) Notifications.show(`DATA CORRUPTION: Texture 404 - ${skin.bodyTexture}`, 'warning');

                        if (headTexture || bodyTexture) {
                            this.assets.set(skinId, { headTexture, bodyTexture });
                        }

                        SKINS.push({
                        id: skinId,
                        name: `[MOD] ${skin.name}`,
                        head: skin.headColor ? parseInt(skin.headColor, 16) : 0xffffff,
                        body: skin.bodyColor ? parseInt(skin.bodyColor, 16) : 0xffffff,
                        headTexture: skin.headTexture, // Store for 404 checks
                        bodyTexture: skin.bodyTexture,
                        emissive: skin.emissiveColor ? parseInt(skin.emissiveColor, 16) : null,
                        emissiveIntensity: skin.emissiveIntensity || 1.0,
                        shininess: skin.shininess || 30,
                        opacity: skin.opacity || 1.0,
                        transparent: skin.opacity < 1.0,
                        price: skin.price || 0,
                        isMod: true
                    });
                    } catch (e) {
                        Notifications.show(`Error loading assets for skin: ${skin.name}`);
                    }
                }
            }
            
            if (modData.backgrounds) {
                for (const bg of modData.backgrounds) {
                    const bgId = `mod_${folder}_${bg.id}`;
                    
                    try {
                        let customModel = null;
                        let envTexture = null;
                        
                        if (bg.modelPath) {
                            customModel = await gltfLoader.loadAsync(`${basePath}Background/Models/${bg.modelPath}`)
                                .then(gltf => gltf.scene)
                                .catch(() => {
                                    Notifications.show(`VOID ERROR: Model 404 - ${bg.modelPath}`, 'warning');
                                    return null;
                                });
                        }
                        if (bg.texturePath) {
                            envTexture = await textureLoader.loadAsync(`${basePath}Background/Textures/${bg.texturePath}`)
                                .catch(() => {
                                    Notifications.show(`DATA CORRUPTION: Texture 404 - ${bg.texturePath}`, 'warning');
                                    return null;
                                });
                        }

                        if (customModel || envTexture) {
                            this.assets.set(bgId, { customModel, envTexture });
                        }

                        // Parse modded music if provided
                        let modMusic = { type: 'triangle', sequence: [440, 523.25, 659.25, 783.99], speed: 0.2 };
                        if (bg.music) {
                            modMusic = {
                                type: bg.music.type || 'triangle',
                                sequence: bg.music.sequence || [440, 523.25, 659.25, 783.99],
                                speed: bg.music.speed || 0.2,
                                random: bg.music.random || false,
                                externalUrl: bg.music.fileName ? `${basePath}Audio/Music/${bg.music.fileName}` : null
                            };
                        }

                        BACKGROUNDS.push({
                            id: bgId,
                            name: `[MOD] ${bg.name}`,
                            color: parseInt(bg.color, 16),
                            stars: bg.stars || false,
                            starSize: bg.starSize || 0.1,
                            starColor: bg.starColor ? parseInt(bg.starColor, 16) : 0xffffff,
                            grid: parseInt(bg.gridColor, 16),
                            gridOpacity: bg.gridOpacity || 1.0,
                            fog: parseInt(bg.fogColor, 16),
                            ambientLightColor: bg.ambientLightColor ? parseInt(bg.ambientLightColor, 16) : 0x404040,
                            ambientLightIntensity: bg.ambientLightIntensity || 1.0,
                            pointLightColor: bg.pointLightColor ? parseInt(bg.pointLightColor, 16) : 0xffffff,
                            pointLightIntensity: bg.pointLightIntensity || 1.0,
                            particleColor: bg.particleColor ? parseInt(bg.particleColor, 16) : 0xff0000,
                            texturePath: bg.texturePath, // Store for 404 checks
                            envType: bg.envType || 'custom',
                            price: bg.price || 0,
                            isMod: true,
                            music: modMusic,
                            sfx: bg.sfx ? {
                                eat: bg.sfx.eat ? `${basePath}Audio/SFX/${bg.sfx.eat}` : null,
                                coin: bg.sfx.coin ? `${basePath}Audio/SFX/${bg.sfx.coin}` : null,
                                gameover: bg.sfx.gameover ? `${basePath}Audio/SFX/${bg.sfx.gameover}` : null
                            } : null
                        });

                    // Pre-load modded SFX if specified
                    if (bg.sfx) {
                        if (bg.sfx.eat) await audioManager.loadExternalAudio(`${basePath}Audio/SFX/${bg.sfx.eat}`);
                        if (bg.sfx.coin) await audioManager.loadExternalAudio(`${basePath}Audio/SFX/${bg.sfx.coin}`);
                        if (bg.sfx.gameover) await audioManager.loadExternalAudio(`${basePath}Audio/SFX/${bg.sfx.gameover}`);
                    }
                    } catch (e) {
                        Notifications.show(`Error loading assets for bg: ${bg.name}`);
                    }
                }
            }
            
            this.mods.push({ folder, ...modData, ...modInfo });
            
            // Show Mod Picker button if multiple mods exist
            if (this.mods.length > 1) {
                document.getElementById('mod-picker-btn').style.display = 'block';
            }
            console.log(`Successfully loaded mod: ${modData.name}`);
        } catch (e) {
            console.error(`Failed to load mod from ${folder}:`, e);
            Notifications.show(`MOD COLLAPSE: Critical error loading "${folder}"`, 'error');
        }
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
let isPaused = false;
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
let isLowPerformance = false;
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

    async loadExternalAudio(url) {
        if (!this.ctx) this.init();
        if (this.externalAudioBuffers.has(url)) return this.externalAudioBuffers.get(url);
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
            this.externalAudioBuffers.set(url, audioBuffer);
            return audioBuffer;
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
            this.createReverb(2.0, bg.music.reverb * 5 || 2.0);
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
        if (bg?.isMod && bg.sfx?.eat && this.playExternalSound(bg.sfx.eat)) return;
        this.init();
        const now = this.ctx.currentTime;
        // Harmonic blip
        this.playSynth(440, 'square', 0.2, 2000, 0.1, now, { freqSweep: 880, filterSweep: 500 });
        this.playSynth(660, 'sine', 0.1, 3000, 0.1, now, { freqSweep: 1320 });
    }

    playCoinSound() {
        const bg = BACKGROUNDS.find(b => b.id === currentBgId);
        if (bg?.isMod && bg.sfx?.coin && this.playExternalSound(bg.sfx.coin)) return;
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
        if (bg?.isMod && bg.sfx?.gameover && this.playExternalSound(bg.sfx.gameover)) return;
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

const groundTextures = {
    sand: textureLoader.load('textures/ground/sand.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);
    }),
    lava: textureLoader.load('textures/ground/lava.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 3);
    }),
    moon: textureLoader.load('textures/ground/moon-surface.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
    }),
    neon: textureLoader.load('textures/ground/neon-floor.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
    }),
    retro: textureLoader.load('textures/ground/retro.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
    }),
    circuit: textureLoader.load('textures/ground/circuit-board.jpg', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
    })
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

// Ground Plane
 const groundGeometry = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE);
 groundGeometry.computeBoundingBox(); // Ensure geometry is calculated correctly
 const groundMaterial = new THREE.MeshPhongMaterial({ 
     color: 0x222222, 
     transparent: true, 
     opacity: 0.8,
     side: THREE.DoubleSide
 });
 const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
 groundMesh.rotation.x = -Math.PI / 2;
 groundMesh.position.set(0, 0, 0); // Explicit center
 scene.add(groundMesh);

 // Ground Border
 const borderGeometry = new THREE.EdgesGeometry(groundGeometry);
 const borderMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
 const borderMesh = new THREE.LineSegments(borderGeometry, borderMaterial);
 borderMesh.rotation.x = -Math.PI / 2;
 borderMesh.position.set(0, 0.01, 0); // Explicit center and slight offset
 scene.add(borderMesh);

 // Grid helper
 const gridHelper = new THREE.GridHelper(GRID_SIZE, GRID_SIZE, 0x888888, 0x444444);
 gridHelper.position.set(0, 0.02, 0); // Explicit center and slight offset
 scene.add(gridHelper);

// Starfield background
function createStarfield() {
    if (starfield) scene.remove(starfield);
    const starCount = isLowPerformance ? 500 : 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starVertices = [];
    for (let i = 0; i < starCount; i++) {
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

    // Update Ground and Border
    borderMaterial.color.set(bg.grid);
    groundMaterial.color.set(bg.color);
    groundMaterial.opacity = 0.8;
    
    // Apply special textures or effects based on theme
    if (bg.groundTexture && groundTextures[bg.groundTexture]) {
        groundMaterial.map = groundTextures[bg.groundTexture];
        groundMaterial.color.set(0xffffff);
        groundMaterial.opacity = (bg.id === 'space') ? 0.6 : 1.0;
    } else {
        // Default mod/custom handling
        const modAssets = ModManager.assets.get(bg.id);
        if (modAssets?.envTexture) {
            groundMaterial.map = modAssets.envTexture;
            groundMaterial.color.set(0xffffff);
        } else {
            groundMaterial.map = null;
            groundMaterial.color.set(bg.color);
        }
        groundMaterial.opacity = 0.8;
    }
    groundMaterial.needsUpdate = true;
    
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
            if (isLowPerformance) {
                // Simplified planets for performance
                const earthGeom = new THREE.SphereGeometry(8, 16, 16);
                const earthMat = new THREE.MeshPhongMaterial({ map: planetTextures.earthDay });
                const earth = new THREE.Mesh(earthGeom, earthMat);
                earth.position.set(-40, 10, -40);
                scene.add(earth);
                decorativeObjects.push({ mesh: earth, rotationSpeed: 0.002 });
                break;
            }
            // Earth with Day/Night Shader
            const earthGeom = new THREE.SphereGeometry(8, 64, 64);
            const earthMat = new THREE.ShaderMaterial({
                uniforms: {
                    dayTexture: { value: planetTextures.earthDay },
                    nightTexture: { value: planetTextures.earthNight },
                    sunDirection: { value: new THREE.Vector3(1, 0.2, 1).normalize() }
                },
                vertexShader: `
                    uniform vec3 sunDirection;
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
            const cubeCount = isLowPerformance ? 5 : 20;
            for (let i = 0; i < cubeCount; i++) {
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
    if (isLowPerformance) return; // Skip particles in low performance mode
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
    if (gameOver || !gameStarted || isPaused || cheaterDetected) return;

    const currentTime = Date.now();
    if (currentTime - lastMoveTime < moveInterval - 10) return; // Basic rate check
    
    // Validate move timing (anti-speed hack)
    if (lastMoveTime > 0 && !Security.validateMove(lastMoveTime, moveInterval)) {
        endGame('cheater_speed');
        cheaterDetected = true;
        return;
    }
    
    // Check integrity of values
    if (!Security.checkIntegrity(score, coins)) {
        endGame('cheater_tamper');
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
    
    if (reason) {
        // Map common error keys if they are passed
        const translatedReason = TRANSLATIONS[currentLang][reason] || reason;
        alert(translatedReason);
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

    updateShopList();
}

function selectSkin(skin) {
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
            alert(TRANSLATIONS[currentLang].not_enough_coins);
            return;
        }
    }
    currentSkinId = skin.id;
    Security.save('snake3d_current_skin_secure', currentSkinId);
    updateShopList();
    updateShopPreview();
}

function selectBg(bg) {
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
            alert(TRANSLATIONS[currentLang].not_enough_coins);
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

    const ownedText = TRANSLATIONS[currentLang].owned || "OWNED";
    const coinsText = TRANSLATIONS[currentLang].coins || "Coins";

    skinList.innerHTML = '';
    SKINS.forEach(skin => {
        const item = document.createElement('div');
        const name = (skin.nameKey && TRANSLATIONS[currentLang][skin.nameKey]) || skin.name || skin.id;
        item.className = `skin-item ${ownedSkins.includes(skin.id) ? '' : 'locked'} ${currentSkinId === skin.id ? 'selected' : ''}`;
        item.innerHTML = `<h3>${name}</h3><div class="price">${ownedSkins.includes(skin.id) ? ownedText : skin.price + ' ' + coinsText}</div>`;
        item.onclick = () => selectSkin(skin);
        item.onmouseenter = () => audioManager.playUiHover();
        skinList.appendChild(item);
    });

    bgList.innerHTML = '';
    BACKGROUNDS.forEach(bg => {
        const item = document.createElement('div');
        const name = (bg.nameKey && TRANSLATIONS[currentLang][bg.nameKey]) || bg.name || bg.id;
        item.className = `bg-item ${ownedBgs.includes(bg.id) ? '' : 'locked'} ${currentBgId === bg.id ? 'selected' : ''}`;
        item.innerHTML = `<h3>${name}</h3><div class="price">${ownedBgs.includes(bg.id) ? ownedText : bg.price + ' ' + coinsText}</div>`;
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
    document.getElementById('skin-list').style.display = 'grid';
    document.getElementById('bg-list').style.display = 'none';
};

document.getElementById('tab-backgrounds').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('tab-backgrounds').classList.add('active');
    document.getElementById('tab-skins').classList.remove('active');
    document.getElementById('skin-list').style.display = 'none';
    document.getElementById('bg-list').style.display = 'grid';
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
                    uniform vec3 sunDirection;
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

document.getElementById('perf-btn').onclick = () => {
    isLowPerformance = !isLowPerformance;
    audioManager.playUiClick();
    document.getElementById('perf-btn').style.background = isLowPerformance ? '#ffcc00' : 'rgba(255, 255, 255, 0.1)';
    document.getElementById('perf-btn').style.color = isLowPerformance ? '#000' : '#fff';
    createStarfield();
    updateBackground();
    Notifications.show(isLowPerformance ? "PERFORMANCE MODE: ON" : "PERFORMANCE MODE: OFF", 'warning');
};

document.getElementById('pause-btn').onclick = togglePause;

function togglePause() {
    if (!gameStarted || gameOver) return;
    isPaused = !isPaused;
    audioManager.playUiClick();
    document.getElementById('pause-btn').innerText = isPaused ? '▶' : '⏸';
    if (isPaused) {
        audioManager.stopBackgroundMusic();
    } else {
        audioManager.startBackgroundMusic();
    }
}

document.getElementById('mod-picker-btn').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('mod-picker-overlay').style.display = 'flex';
    renderModList();
};

document.getElementById('close-mod-picker-btn').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('mod-picker-overlay').style.display = 'none';
};

function renderModList() {
    const modList = document.getElementById('mod-list');
    modList.innerHTML = '';
    ModManager.mods.forEach(mod => {
        const item = document.createElement('div');
        item.className = 'mod-item';
        item.innerHTML = `
            <img src="${mod.favicon || 'favicon/favicon.png'}" class="mod-favicon">
            <div class="mod-info">
                <h3>${mod.title}</h3>
                <p>${mod.description}</p>
                ${mod.banner ? `<div class="mod-banner" style="background-image: url('${mod.banner}')"></div>` : ''}
            </div>
        `;
        modList.appendChild(item);
    });
}

// Touch controls setup
 if (isTouchDevice) {
     document.getElementById('touch-controls').style.display = 'flex';
     document.getElementById('up-btn').ontouchstart = (e) => { e.preventDefault(); handleDirection(0, 0, -1); };
     document.getElementById('down-btn').ontouchstart = (e) => { e.preventDefault(); handleDirection(0, 0, 1); };
     document.getElementById('left-btn').ontouchstart = (e) => { e.preventDefault(); handleDirection(-1, 0, 0); };
     document.getElementById('right-btn').ontouchstart = (e) => { e.preventDefault(); handleDirection(1, 0, 0); };
     
     // Bird's eye-view for mobile
     camera.position.set(0, 30, 0);
     camera.lookAt(0, 0, 0);
     controls.enableRotate = false; // Disable rotation for better bird's eye experience
 }

function handleDirection(x, y, z) {
    if (z !== 0 && direction.z === 0) nextDirection.set(x, y, z);
    if (x !== 0 && direction.x === 0) nextDirection.set(x, y, z);
}

document.getElementById('shop-btn').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('shop-overlay').style.display = 'flex';
    audioManager.init();
    if (!shopRenderer) initShopPreview();
    updateShopList();
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

document.getElementById('lang-select').onchange = (e) => {
    setLanguage(e.target.value);
    audioManager.playUiClick();
};

// Add hover sounds to all buttons
document.querySelectorAll('button').forEach(btn => {
    btn.onmouseenter = () => audioManager.playUiHover();
});

function onKeyDown(event) {
    if (!gameStarted) return;
    if (event.key === 'p' || event.key === 'P' || event.key === ' ') {
        togglePause();
        return;
    }
    if (isPaused) return;
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
         if (isTouchDevice) {
             // Static bird's eye view for mobile
             camera.position.lerp(new THREE.Vector3(0, 30, 0), 0.05);
             controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.1);
         } else {
             // Dynamic trailing camera for desktop
             const targetPos = headPos.clone().add(new THREE.Vector3(0, 10, 20));
             camera.position.lerp(targetPos, 0.05);
             controls.target.lerp(headPos, 0.1);
         }
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
    Notifications.show(`SYSTEM GLITCH: ${message.split(':')[1] || message}`, 'error');
    return false;
};

// Consent Management
const Consent = {
    check() {
        const consented = Security.load('snake3d_consented', false);
        if (!consented) {
            document.getElementById('consent-overlay').style.display = 'flex';
            return false;
        }
        return true;
    },
    accept() {
        const geoEnabled = document.getElementById('geo-consent').checked;
        Security.save('snake3d_consented', true);
        Security.save('snake3d_geo_consent', geoEnabled);
        document.getElementById('consent-overlay').style.display = 'none';
        
        if (geoEnabled) {
            detectLanguage();
        } else {
            setLanguage('en');
        }
        
        // Load mods after consent
        ModManager.loadMods();
    }
};

document.getElementById('accept-consent-btn').onclick = () => {
    audioManager.playUiClick();
    Consent.accept();
};

// Initialize
if (Consent.check()) {
    const geoEnabled = Security.load('snake3d_geo_consent', false);
    if (geoEnabled) {
        detectLanguage();
    } else {
        setLanguage('en');
    }
    ModManager.loadMods();
}
