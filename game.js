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
        mod_picker: "Theme Customization",
        pause: "PAUSED",
        resume: "RESUME",
        coins: "Coins",
        cheater_speed: "Integrity Error: Movement speed anomaly detected.",
        cheater_tamper: "Integrity Error: Value consistency check failed.",
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
        mystery_void: "Mystery Void",
        settings: "Settings",
        music_volume: "Music Volume",
        sfx_volume: "Sound Effects",
        free_camera: "Free Camera Mode",
        game_won: "VICTORY! You have conquered the galaxy!",
        viper_realistic: "Viper Realistic"
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
        mod_picker: "تخصيص السمة",
        pause: "مؤقت",
        resume: "استئناف",
        coins: "العملات",
        cheater_speed: "خطأ في النزاهة: تم كشف شذوذ في سرعة الحركة.",
        cheater_tamper: "خطأ في النزاهة: فشل التحقق من اتساق القيم.",
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
        mod_picker: "主题定制",
        pause: "已暂停",
        resume: "恢复游戏",
        coins: "金币",
        cheater_speed: "完整性错误：检测到移动速度异常。",
        cheater_tamper: "完整性错误：数值一致性检查失败。",
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
    },
    fr: {
        game_title: "Jeu de Serpent 3D",
        space_journey: "Voyage Spatial",
        controls: "Flèches pour bouger",
        score: "Score",
        high: "Meilleur",
        start_game: "Jouer",
        open_shop: "Boutique",
        skins: "Apparences",
        backgrounds: "Décors",
        back_to_menu: "Retour",
        owned: "POSSÉDÉ",
        not_enough_coins: "Pas assez de pièces !",
        mod_picker: "Thèmes",
        pause: "PAUSE",
        resume: "REPRENDRE",
        coins: "Pièces",
        cheater_speed: "Erreur d'intégrité : Vitesse anormale.",
        cheater_tamper: "Erreur d'intégrité : Valeurs incohérentes.",
        classic_green: "Vert Classique",
        neon_blue: "Bleu Néon",
        lava_flow: "Lave",
        golden_midas: "Midas d'Or",
        void_walker: "Marcheur du Vide",
        matrix_code: "Code Matrix",
        deep_space: "Espace Profond",
        neon_city: "Ville Néon",
        sunset_grid: "Grille de Couchant",
        matrix_void: "Vide Matrix",
        hellscape: "Enfer",
        event_horizon: "Horizon des Événements",
        mystery_void: "Vide Mystérieux"
    },
    es: {
        game_title: "Juego de la Serpiente 3D",
        space_journey: "Viaje Espacial",
        controls: "Usa las flechas para moverte",
        score: "Puntos",
        high: "Récord",
        start_game: "Empezar",
        open_shop: "Tienda",
        skins: "Aspectos",
        backgrounds: "Fondos",
        back_to_menu: "Menú",
        owned: "OBTENIDO",
        not_enough_coins: "¡Faltan monedas!",
        mod_picker: "Temas",
        pause: "PAUSA",
        resume: "REANUDAR",
        coins: "Monedas",
        cheater_speed: "Error de integridad: Velocidad anómala.",
        cheater_tamper: "Error de integridad: Valores inconsistentes.",
        classic_green: "Verde Clásico",
        neon_blue: "Azul Neón",
        lava_flow: "Lava",
        golden_midas: "Midas de Oro",
        void_walker: "Caminante del Vacío",
        matrix_code: "Código Matrix",
        deep_space: "Espacio Profundo",
        neon_city: "Ciudad Neón",
        sunset_grid: "Rejilla Atardecer",
        matrix_void: "Vacío Matrix",
        hellscape: "Infierno",
        event_horizon: "Horizonte de Eventos",
        mystery_void: "Vacío Misterioso"
    },
    es: {
        game_title: "Juego de la Serpiente 3D",
        space_journey: "Viaje Espacial",
        controls: "Usa las flechas para moverte",
        score: "Puntos",
        high: "Récord",
        start_game: "Empezar",
        open_shop: "Tienda",
        skins: "Aspectos",
        backgrounds: "Fondos",
        back_to_menu: "Menú",
        owned: "OBTENIDO",
        not_enough_coins: "¡Faltan monedas!",
        mod_picker: "Temas",
        pause: "PAUSA",
        resume: "REANUDAR",
        coins: "Monedas",
        cheater_speed: "Error de integridad: Velocidad anómala.",
        cheater_tamper: "Error de integridad: Valores inconsistentes.",
        classic_green: "Verde Clásico",
        neon_blue: "Azul Neón",
        lava_flow: "Lava",
        golden_midas: "Midas de Oro",
        void_walker: "Caminante del Vacío",
        matrix_code: "Código Matrix",
        deep_space: "Espacio Profundo",
        neon_city: "Ciudad Neón",
        sunset_grid: "Rejilla Atardecer",
        matrix_void: "Vacío Matrix",
        hellscape: "Infierno",
        event_horizon: "Horizonte de Eventos",
        mystery_void: "Vacío Misterioso"
    },
    it: {
        game_title: "Gioco del Serpente 3D",
        space_journey: "Viaggio Spaziale",
        controls: "Usa le frecce per muoverti",
        score: "Punteggio",
        high: "Record",
        start_game: "Inizia",
        open_shop: "Negozio",
        skins: "Skin",
        backgrounds: "Sfondi",
        back_to_menu: "Menu",
        owned: "POSSEDUTO",
        not_enough_coins: "Monete insufficienti!",
        mod_picker: "Personalizza Temi",
        pause: "PAUSA",
        resume: "RIPRENDI",
        coins: "Monete",
        cheater_speed: "Errore di integrità: Velocità anomala rilevata.",
        cheater_tamper: "Errore di integrità: Verifica valori fallita.",
        classic_green: "Verde Classico",
        neon_blue: "Blu Neon",
        lava_flow: "Flusso di Lava",
        golden_midas: "Mida d'Oro",
        void_walker: "Viandante del Vuoto",
        matrix_code: "Codice Matrix",
        deep_space: "Spazio Profondo",
        neon_city: "Città Neon",
        sunset_grid: "Griglia Tramonto",
        matrix_void: "Vuoto Matrix",
        hellscape: "Inferno",
        event_horizon: "Orizzonte degli Eventi",
        mystery_void: "Vuoto Misterioso"
    },
    tr: {
        game_title: "3D Yılan Oyunu",
        space_journey: "Uzay Yolculuğu",
        controls: "Hareket için ok tuşlarını kullanın",
        score: "Skor",
        high: "En Yüksek",
        start_game: "Oyuna Başla",
        open_shop: "Mağaza",
        skins: "Kostümler",
        backgrounds: "Arka Planlar",
        back_to_menu: "Menüye Dön",
        owned: "SAHİP",
        not_enough_coins: "Yetersiz altın!",
        mod_picker: "Tema Özelleştirme",
        pause: "DURAKLATILDI",
        resume: "DEVAM ET",
        coins: "Altınlar",
        cheater_speed: "Bütünlük Hatası: Anormal hız tespit edildi.",
        cheater_tamper: "Bütünlük Hatası: Değer tutarlılık kontrolü başarısız.",
        classic_green: "Klasik Yeşil",
        neon_blue: "Neon Mavi",
        lava_flow: "Lav Akışı",
        golden_midas: "Altın Midas",
        void_walker: "Boşluk Gezgini",
        matrix_code: "Matrix Kodu",
        deep_space: "Derin Uzay",
        neon_city: "Neon Şehir",
        sunset_grid: "Gün Batımı Izgarası",
        matrix_void: "Matrix Boşluğu",
        hellscape: "Cehennem",
        event_horizon: "Olay Ufku",
        mystery_void: "Gizemli Boşluk"
    },
    fa: {
        game_title: "بازی مار سه بعدی",
        space_journey: "سفر فضایی",
        controls: "از کلیدهای پیکان برای حرکت استفاده کنید",
        score: "امتیاز",
        high: "بیشترین",
        start_game: "شروع بازی",
        open_shop: "فروشگاه",
        skins: "پوسته‌ها",
        backgrounds: "پس‌زمینه‌ها",
        back_to_menu: "بازگشت به منو",
        owned: "خریداری شده",
        not_enough_coins: "سکه کافی نیست!",
        mod_picker: "شخصی‌سازی تم",
        pause: "توقف",
        resume: "ادامه",
        coins: "سکه‌ها",
        cheater_speed: "خطای یکپارچگی: سرعت غیرطبیعی تشخیص داده شد.",
        cheater_tamper: "خطای یکپارچگی: عدم تطابق مقادیر.",
        classic_green: "سبز کلاسیک",
        neon_blue: "آبی نئون",
        lava_flow: "جریان گدازه",
        golden_midas: "میداس طلایی",
        void_walker: "رهرو خلاء",
        matrix_code: "کد ماتریکس",
        deep_space: "فضای عمیق",
        neon_city: "شهر نئون",
        sunset_grid: "شبکه غروب",
        matrix_void: "خلاء ماتریکس",
        hellscape: "جهنم",
        event_horizon: "خلاء ماتریکس",
        mystery_void: "خلاء مرموز"
    },
    vi: {
        game_title: "Trò chơi Rắn 3D",
        space_journey: "Hành trình Không gian",
        controls: "Sử dụng phím mũi tên để di chuyển",
        score: "Điểm số",
        high: "Cao nhất",
        start_game: "Bắt đầu",
        open_shop: "Cửa hàng",
        skins: "Trang phục",
        backgrounds: "Hình nền",
        back_to_menu: "Quay lại",
        owned: "ĐÃ SỞ HỮU",
        not_enough_coins: "Không đủ xu!",
        mod_picker: "Tùy chỉnh Giao diện",
        pause: "TẠM DỪNG",
        resume: "TIẾP TỤC",
        coins: "Xu",
        cheater_speed: "Lỗi toàn vẹn: Phát hiện tốc độ bất thường.",
        cheater_tamper: "Lỗi toàn vẹn: Kiểm tra giá trị thất bại.",
        classic_green: "Xanh cổ điển",
        neon_blue: "Xanh Neon",
        lava_flow: "Dòng dung nham",
        golden_midas: "Midas vàng",
        void_walker: "Kẻ hành xướng hư không",
        matrix_code: "Mã Matrix",
        deep_space: "Không gian sâu",
        neon_city: "Thành phố Neon",
        sunset_grid: "Lưới hoàng hôn",
        matrix_void: "Hư không Matrix",
        hellscape: "Cảnh địa ngục",
        event_horizon: "Chân trời sự kiện",
        mystery_void: "Hư không bí ẩn"
    },
    th: {
        game_title: "เกมงู 3 มิติ",
        space_journey: "การเดินทางในอวกาศ",
        controls: "ใช้ปุ่มลูกศรเพื่อเคลื่อนที่",
        score: "คะแนน",
        high: "สูงสุด",
        start_game: "เริ่มเกม",
        open_shop: "เปิดร้านค้า",
        skins: "สกิน",
        backgrounds: "พื้นหลัง",
        back_to_menu: "กลับสู่เมนู",
        owned: "เป็นเจ้าของแล้ว",
        not_enough_coins: "เหรียญไม่พอ!",
        mod_picker: "ปรับแต่งธีม",
        pause: "หยุดชั่วคราว",
        resume: "เล่นต่อ",
        coins: "เหรียญ",
        cheater_speed: "ข้อผิดพลาดด้านความสมบูรณ์: ตรวจพบความเร็วที่ผิดปกติ",
        cheater_tamper: "ข้อผิดพลาดด้านความสมบูรณ์: การตรวจสอบความสอดคล้องของค่าล้มเหลว",
        classic_green: "สีเขียวคลาสสิก",
        neon_blue: "สีฟ้านีออน",
        lava_flow: "ลาวาไหล",
        golden_midas: "ไมดาสทองคำ",
        void_walker: "ผู้เดินในความว่างเปล่า",
        matrix_code: "รหัสแมทริกซ์",
        deep_space: "อวกาศลึก",
        neon_city: "เมืองนีออน",
        sunset_grid: "ตารางพระอาทิตย์ตก",
        matrix_void: "ความว่างเปล่าแมทริกซ์",
        hellscape: "นรกภูมิ",
        event_horizon: "ขอบฟ้าเหตุการณ์",
        mystery_void: "ความว่างเปล่าลึกลับ"
    },
    id: {
        game_title: "Permainan Ular 3D",
        space_journey: "Perjalanan Luar Angkasa",
        controls: "Gunakan tombol panah untuk bergerak",
        score: "Skor",
        high: "Tertinggi",
        start_game: "Mulai",
        open_shop: "Toko",
        skins: "Skin",
        backgrounds: "Latar Belakang",
        back_to_menu: "Kembali",
        owned: "DIMILIKI",
        not_enough_coins: "Koin tidak cukup!",
        mod_picker: "Kustomisasi Tema",
        pause: "JEDA",
        resume: "LANJUTKAN",
        coins: "Koin",
        cheater_speed: "Kesalahan Integritas: Deteksi anomali kecepatan.",
        cheater_tamper: "Kesalahan Integritas: Gagal validasi nilai.",
        classic_green: "Hijau Klasik",
        neon_blue: "Biru Neon",
        lava_flow: "Aliran Lava",
        golden_midas: "Midas Emas",
        void_walker: "Penjelajah Hampa",
        matrix_code: "Kode Matrix",
        deep_space: "Luar Angkasa",
        neon_city: "Kota Neon",
        sunset_grid: "Sunset Grid",
        matrix_void: "Matrix Void",
        hellscape: "Hellscape",
        event_horizon: "Event Horizon",
        mystery_void: "Mystery Void"
    },
    ur: {
        game_title: "تھری ڈی سانپ گیم",
        space_journey: "خلائی سفر",
        controls: "حرکت کے لیے تیر والے بٹن استعمال کریں",
        score: "اسکور",
        high: "سب سے زیادہ",
        start_game: "شروع کریں",
        open_shop: "دکان",
        skins: "اسکنز",
        backgrounds: "پس منظر",
        back_to_menu: "مینو پر واپس جائیں",
        owned: "ملکیت",
        not_enough_coins: "سکے کم ہیں!",
        mod_picker: "تھیم کی تخصیص",
        pause: "روک دیں",
        resume: "جاری رکھیں",
        coins: "سکے",
        cheater_speed: "سالمیت کی غلطی: رفتار میں غیر معمولی تبدیلی محسوس کی گئی۔",
        cheater_tamper: "سالمیت کی غلطی: قیمتوں کی تصدیق ناکام ہو گئی۔",
        classic_green: "کلاسک سبز",
        neon_blue: "نیون نیلا",
        lava_flow: "لاوا",
        golden_midas: "گولڈن میڈاس",
        void_walker: "خلاء کا مسافر",
        matrix_code: "میٹرکس کوڈ",
        deep_space: "گہرا خلا",
        neon_city: "نیون شہر",
        sunset_grid: "غروب آفتاب گریڈ",
        matrix_void: "میٹرکس خلاء",
        hellscape: "جہنم کا منظر",
        event_horizon: "ایونٹ ہورائزن",
        mystery_void: "پراسرار خلاء"
    },
    bn: {
        game_title: "থ্রিডি স্নেক গেম",
        space_journey: "মহাকাশ ভ্রমণ",
        controls: "সরানোর জন্য তীর কীগুলি ব্যবহার করুন",
        score: "স্কোর",
        high: "সর্বোচ্চ",
        start_game: "খেলা শুরু করুন",
        open_shop: "দোকান খুলুন",
        skins: "স্কিনস",
        backgrounds: "ব্যাকগ্রাউন্ড",
        back_to_menu: "মেনুতে ফিরে যান",
        owned: "নিজের",
        not_enough_coins: "যথেষ্ট কয়েন নেই!",
        mod_picker: "থিম কাস্টমাইজেশন",
        pause: "বিরতি",
        resume: "পুনরায় শুরু করুন",
        coins: "কয়েন",
        cheater_speed: "অখণ্ডতা ত্রুটি: অস্বাভাবিক গতির সন্ধান পাওয়া গেছে।",
        cheater_tamper: "অখণ্ডতা ত্রুটি: মানের ধারাবাহিকতা পরীক্ষা ব্যর্থ হয়েছে।",
        classic_green: "ক্লাসিক গ্রিন",
        neon_blue: "নিয়ন ব্লু",
        lava_flow: "লাভা ফ্লো",
        golden_midas: "গোল্ডেন মিডাস",
        void_walker: "ভয়েড ওয়াকার",
        matrix_code: "ম্যাট্রিক্স কোড",
        deep_space: "ডিপ স্পেস",
        neon_city: "নিয়ন সিটি",
        sunset_grid: "সূর্যাস্ত গ্রিড",
        matrix_void: "ম্যাট্রিক্স ভয়েড",
        hellscape: "হেলস্কেপ",
        event_horizon: "ইভেন্ট হরাইজন",
        mystery_void: "রহস্যময় ভয়েড"
    },
    pt: {
        game_title: "Jogo da Cobra 3D",
        space_journey: "Jornada Espacial",
        controls: "Use as setas para mover",
        score: "Pontos",
        high: "Recorde",
        start_game: "Iniciar",
        open_shop: "Loja",
        skins: "Visuais",
        backgrounds: "Fundos",
        back_to_menu: "Voltar",
        owned: "ADQUIRIDO",
        not_enough_coins: "Moedas insuficientes!",
        mod_picker: "Temas",
        pause: "PAUSADO",
        resume: "RETOMAR",
        coins: "Moedas",
        cheater_speed: "Erro de Integridade: Velocidade anormal.",
        cheater_tamper: "Erro de Integridade: Valores inconsistentes.",
        classic_green: "Verde Clássico",
        neon_blue: "Azul Neon",
        lava_flow: "Fluxo de Lava",
        golden_midas: "Midas de Ouro",
        void_walker: "Caminhante do Vazio",
        matrix_code: "Código Matrix",
        deep_space: "Espaço Profundo",
        neon_city: "Cidade Neon",
        sunset_grid: "Grelha Pôr do Sol",
        matrix_void: "Vazio Matrix",
        hellscape: "Inferno",
        event_horizon: "Horizonte de Eventos",
        mystery_void: "Vazio Misterioso"
    },
    ru: {
        game_title: "3D Змейка",
        space_journey: "Космическое путешествие",
        controls: "Стрелки для управления",
        score: "Счет",
        high: "Рекорд",
        start_game: "Начать",
        open_shop: "Магазин",
        skins: "Облики",
        backgrounds: "Фоны",
        back_to_menu: "В меню",
        owned: "КУПЛЕНО",
        not_enough_coins: "Недостаточно монет!",
        mod_picker: "Темы",
        pause: "ПАУЗА",
        resume: "ПРОДОЛЖИТЬ",
        coins: "Монеты",
        cheater_speed: "Ошибка целостности: Аномальная скорость.",
        cheater_tamper: "Ошибка целостности: Несоответствие значений.",
        classic_green: "Классический зеленый",
        neon_blue: "Неоновый синий",
        lava_flow: "Лавовый поток",
        golden_midas: "Золотой Мидас",
        void_walker: "Странник Пустоты",
        matrix_code: "Код Матрицы",
        deep_space: "Глубокий космос",
        neon_city: "Неоновый город",
        sunset_grid: "Закатная сетка",
        matrix_void: "Пустота Матрицы",
        hellscape: "Адский пейзаж",
        event_horizon: "Горизонт событий",
        mystery_void: "Таинственная пустота"
    },
    he: {
        game_title: "משחק הנחש בתלת-מימד",
        space_journey: "מסע בחלל",
        controls: "השתמש במקשי החיצים כדי לזוז",
        score: "ניקוד",
        high: "שיא",
        start_game: "התחל משחק",
        open_shop: "פתח חנות",
        skins: "סקינים",
        backgrounds: "רקעים",
        back_to_menu: "חזרה לתפריט",
        owned: "בבעלותך",
        not_enough_coins: "אין מספיק מטבעות!",
        mod_picker: "התאמת עיצוב",
        pause: "הפסקה",
        resume: "המשך",
        coins: "מטבעות",
        cheater_speed: "שגיאת שלמות: זוהתה חריגה במהירות התנועה.",
        cheater_tamper: "שגיאת שלמות: בדיקת עקביות הערכים נכשלה.",
        classic_green: "ירוק קלאסי",
        neon_blue: "כחול נאון",
        lava_flow: "זרימת לבה",
        golden_midas: "מידאס המוזהב",
        void_walker: "צועד הריק",
        matrix_code: "קוד מטריקס",
        deep_space: "חלל עמוק",
        neon_city: "עיר נאון",
        sunset_grid: "רשת שקיעה",
        matrix_void: "ריק המטריקס",
        hellscape: "נוף גיהנום",
        event_horizon: "אופק האירועים",
        mystery_void: "ריק מסתורי"
    },
    el: {
        game_title: "3D Παιχνίδι Φιδάκι",
        space_journey: "Ταξίδι στο Διάστημα",
        controls: "Χρησιμοποιήστε τα βέλη για κίνηση",
        score: "Σκορ",
        high: "Καλύτερο",
        start_game: "Έναρξη",
        open_shop: "Κατάστημα",
        skins: "Εμφανίσεις",
        backgrounds: "Φόντα",
        back_to_menu: "Πίσω στο Μενού",
        owned: "ΙΔΙΟΚΤΗΤΟ",
        not_enough_coins: "Δεν υπάρχουν αρκετά νομίσματα!",
        mod_picker: "Προσαρμογή Θέματος",
        pause: "ΠΑΥΣΗ",
        resume: "ΣΥΝΕΧΕΙΑ",
        coins: "Νομίσματα",
        cheater_speed: "Σφάλμα Ακεραιότητας: Ανιχνεύθηκε ανωμαλία στην ταχύτητα.",
        cheater_tamper: "Σφάλμα Ακεραιότητας: Η επαλήθευση τιμών απέτυχε.",
        classic_green: "Κλασικό Πράσινο",
        neon_blue: "Νέον Μπλε",
        lava_flow: "Ροή Λάβας",
        golden_midas: "Χρυσός Μίδας",
        void_walker: "Περιπατητής του Κενού",
        matrix_code: "Κώδικας Matrix",
        deep_space: "Βαθύ Διάστημα",
        neon_city: "Νέον Πόλη",
        sunset_grid: "Πλέγμα Ηλιοβασιλέματος",
        matrix_void: "Κενό Matrix",
        hellscape: "Τοπίο Κολάσεως",
        event_horizon: "Ορίζοντας Γεγονότων",
        mystery_void: "Μυστηριώδες Κενό"
    },
    sq: {
        game_title: "Lojë Gjarpri 3D",
        space_journey: "Udhëtim në Hapësirë",
        controls: "Përdorni shigjetat për lëvizje",
        score: "Pikët",
        high: "Rekordi",
        start_game: "Fillo Lojën",
        open_shop: "Hap Dyqanin",
        skins: "Lëkurat",
        backgrounds: "Sfondet",
        back_to_menu: "Kthehu në Menu",
        owned: "E ZOTËRUAR",
        not_enough_coins: "Nuk keni mjaftueshëm monedha!",
        mod_picker: "Personalizimi i Temës",
        pause: "PAUZË",
        resume: "VAZHDO",
        coins: "Monedha",
        cheater_speed: "Gabim Integriteti: U zbulua anomali në shpejtësi.",
        cheater_tamper: "Gabim Integriteti: Verifikimi i vlerave dështoi.",
        classic_green: "Gjelbër Klasike",
        neon_blue: "Blun Neon",
        lava_flow: "Rrjedhë Lave",
        golden_midas: "Mida i Artë",
        void_walker: "Ecësi i Zbrazëtirës",
        matrix_code: "Kodi Matrix",
        deep_space: "Hapësirë e Thellë",
        neon_city: "Qytet Neon",
        sunset_grid: "Rrjeta e Perëndimit",
        matrix_void: "Zbrazëtira Matrix",
        hellscape: "Peizazh Ferri",
        event_horizon: "Horizonti i Ngjarjeve",
        mystery_void: "Zbrazëtirë Misterioze"
    },
    ro: {
        game_title: "Joc Sarpe 3D",
        space_journey: "Călătorie Spațială",
        controls: "Folosește săgețile pentru mișcare",
        score: "Scor",
        high: "Record",
        start_game: "Începe Jocul",
        open_shop: "Magazin",
        skins: "Skin-uri",
        backgrounds: "Fundaluri",
        back_to_menu: "Înapoi la Meniu",
        owned: "DEȚINUT",
        not_enough_coins: "Nu ai destule monede!",
        mod_picker: "Personalizare Temă",
        pause: "PAUZĂ",
        resume: "CONTINUĂ",
        coins: "Monede",
        cheater_speed: "Eroare de Integritate: Anomalie de viteză detectată.",
        cheater_tamper: "Eroare de Integritate: Verificarea valorilor a eșuat.",
        classic_green: "Verde Clasic",
        neon_blue: "Albastru Neon",
        lava_flow: "Flux de Lavă",
        golden_midas: "Midas de Aur",
        void_walker: "Călător prin Vid",
        matrix_code: "Cod Matrix",
        deep_space: "Spațiu Profund",
        neon_city: "Oraș Neon",
        sunset_grid: "Grilă de Apus",
        matrix_void: "Vid Matrix",
        hellscape: "Peisaj Infernal",
        event_horizon: "Orizontul Evenimentelor",
        mystery_void: "Vid Misterios"
    },
    bg: {
        game_title: "3D Змия",
        space_journey: "Космическо Пътешествие",
        controls: "Използвайте стрелките за движение",
        score: "Резултат",
        high: "Рекорд",
        start_game: "Започни Игра",
        open_shop: "Магазин",
        skins: "Кожи",
        backgrounds: "Фонове",
        back_to_menu: "Към Менюто",
        owned: "ПРИТЕЖАВАНО",
        not_enough_coins: "Нямате достатъчно монети!",
        mod_picker: "Персонализация",
        pause: "ПАУЗА",
        resume: "ПРОДЪЛЖИ",
        coins: "Монети",
        cheater_speed: "Грешка в целостта: Открита е аномалия в скоростта.",
        cheater_tamper: "Грешка в целостта: Проверката на стойностите е неуспешна.",
        classic_green: "Класическо Зелено",
        neon_blue: "Неоново Синьо",
        lava_flow: "Лавов Поток",
        golden_midas: "Златният Мидас",
        void_walker: "Пътешественик в Пустотата",
        matrix_code: "Матричен Код",
        deep_space: "Дълбок Космос",
        neon_city: "Неонов Град",
        sunset_grid: "Залезна Мрежа",
        matrix_void: "Матрична Пустота",
        hellscape: "Адски Пейзаж",
        event_horizon: "Хоризонт на Събитията",
        mystery_void: "Мистериозна Пустота"
    },
    nl: {
        game_title: "3D Slangenspel",
        space_journey: "Ruimtereis",
        controls: "Gebruik pijltjestoetsen om te bewegen",
        score: "Score",
        high: "Record",
        start_game: "Start Spel",
        open_shop: "Winkel",
        skins: "Skins",
        backgrounds: "Achtergronden",
        back_to_menu: "Terug naar Menu",
        owned: "EIGENDOM",
        not_enough_coins: "Niet genoeg munten!",
        mod_picker: "Thema Aanpassen",
        pause: "PAUZE",
        resume: "DOORGAAN",
        coins: "Munten",
        cheater_speed: "Integriteitsfout: Snelheidsafwijking gedetecteerd.",
        cheater_tamper: "Integriteitsfout: Waardecontrole mislukt.",
        classic_green: "Klassiek Groen",
        neon_blue: "Neon Blauw",
        lava_flow: "Lavastroom",
        golden_midas: "Gouden Midas",
        void_walker: "Leemte Wandelaar",
        matrix_code: "Matrix Code",
        deep_space: "Diepe Ruimte",
        neon_city: "Neon Stad",
        sunset_grid: "Zonsondergang Raster",
        matrix_void: "Matrix Leemte",
        hellscape: "Hellandschap",
        event_horizon: "Gebeurtenishorizon",
        mystery_void: "Mysterieuze Leemte"
    },
    pl: {
        game_title: "Gra Wąż 3D",
        space_journey: "Kosmiczna Podróż",
        controls: "Użyj strzałek, aby się poruszać",
        score: "Wynik",
        high: "Rekord",
        start_game: "Rozpocznij",
        open_shop: "Sklep",
        skins: "Skórki",
        backgrounds: "Tła",
        back_to_menu: "Powrót do Menu",
        owned: "POSIADANE",
        not_enough_coins: "Za mało monet!",
        mod_picker: "Dostosuj Motyw",
        pause: "PAUZA",
        resume: "WZNÓW",
        coins: "Monety",
        cheater_speed: "Błąd Integralności: Wykryto anomalię prędkości.",
        cheater_tamper: "Błąd Integralności: Weryfikacja wartości nie powiodła się.",
        classic_green: "Klasyczna Zieleń",
        neon_blue: "Neonowy Błękit",
        lava_flow: "Strumień Lawy",
        golden_midas: "Złoty Midas",
        void_walker: "Wędrowiec Pustki",
        matrix_code: "Kod Matrixa",
        deep_space: "Głęboki Kosmos",
        neon_city: "Neonowe Miasto",
        sunset_grid: "Siatka Zachodu Słońca",
        matrix_void: "Pustka Matrixa",
        hellscape: "Piekielny Krajobraz",
        event_horizon: "Horyzont Zdarzeń",
        mystery_void: "Tajemnicza Pustka"
    },
    fi: {
        game_title: "3D-Matopeli",
        space_journey: "Avaruusmatka",
        controls: "Käytä nuolinäppäimiä liikkuaksesi",
        score: "Pisteet",
        high: "Ennätys",
        start_game: "Aloita Peli",
        open_shop: "Kauppa",
        skins: "Skinit",
        backgrounds: "Taustat",
        back_to_menu: "Takaisin Valikkoon",
        owned: "OMISTETTU",
        not_enough_coins: "Ei tarpeeksi kolikoita!",
        mod_picker: "Muokkaa Teemaa",
        pause: "PAUSSI",
        resume: "JATKA",
        coins: "Kolikot",
        cheater_speed: "Eheysvirhe: Nopeuspoikkeama havaittu.",
        cheater_tamper: "Eheysvirhe: Arvotarkistus epäonnistui.",
        classic_green: "Klassinen Vihreä",
        neon_blue: "Neon Sininen",
        lava_flow: "Laavavirta",
        golden_midas: "Kultainen Midas",
        void_walker: "Tyhjyyden Kulkija",
        matrix_code: "Matrix-koodi",
        deep_space: "Syvä Avaruus",
        neon_city: "Neonkaupunki",
        sunset_grid: "Auringonlasku-ruudukko",
        matrix_void: "Matrix-tyhjyys",
        hellscape: "Helvetti",
        event_horizon: "Tapahtumahorisontti",
        mystery_void: "Mystinen Tyhjyys"
    },
    hi: {
        game_title: "3D सांप गेम",
        space_journey: "अंतरिक्ष यात्रा",
        controls: "चलने के लिए तीर कुंजियों का उपयोग करें",
        score: "अंक",
        high: "उच्चतम",
        start_game: "खेल शुरू करें",
        open_shop: "दुकान खोलें",
        skins: "खाल",
        backgrounds: "पृष्ठभूमि",
        back_to_menu: "मेन्यू पर वापस जाएं",
        owned: "स्वामित्व",
        not_enough_coins: "पर्याप्त सिक्के नहीं हैं!",
        mod_picker: "थीम अनुकूलन",
        pause: "विराम",
        resume: "जारी रखें",
        coins: "सिक्के",
        cheater_speed: "अखंडता त्रुटि: असामान्य गति का पता चला।",
        cheater_tamper: "अखंडта त्रुटि: मानों में विसंगति।",
        classic_green: "क्लासिक हरा",
        neon_blue: "नियॉन नीला",
        lava_flow: "लावा प्रवाह",
        golden_midas: "गोल्डन मिडास",
        void_walker: "शून्य यात्री",
        matrix_code: "मैट्रिक्स कोड",
        deep_space: "गहरा अंतरिक्ष",
        neon_city: "नियॉन सिटी",
        sunset_grid: "सूर्यास्त ग्रिड",
        matrix_void: "मैट्रिक्स शून्य",
        hellscape: "नरक",
        event_horizon: "इवेंट होराइजन",
        mystery_void: "रहस्यमय शून्य"
    },
    de: {
        game_title: "3D Schlangenspiel",
        space_journey: "Weltraumreise",
        controls: "Pfeiltasten zum Bewegen",
        score: "Punkte",
        high: "Rekord",
        start_game: "Starten",
        open_shop: "Shop",
        skins: "Skins",
        backgrounds: "Hintergründe",
        back_to_menu: "Zurück",
        owned: "BESITZT",
        not_enough_coins: "Nicht genug Münzen!",
        mod_picker: "Themen",
        pause: "PAUSE",
        resume: "WEITER",
        coins: "Münzen",
        cheater_speed: "Integritätsfehler: Abnormale Geschwindigkeit.",
        cheater_tamper: "Integritätsfehler: Inkonsistente Werte.",
        classic_green: "Klassisches Grün",
        neon_blue: "Neon Blau",
        lava_flow: "Lavafluss",
        golden_midas: "Goldener Midas",
        void_walker: "Leerenläufer",
        matrix_code: "Matrix Code",
        deep_space: "Tiefer Weltraum",
        neon_city: "Neonstadt",
        sunset_grid: "Sonnenuntergangsgitter",
        matrix_void: "Matrix Leere",
        hellscape: "Höllenlandschaft",
        event_horizon: "Ereignishorizont",
        mystery_void: "Geheimnisvolle Leere"
    },
    ko: {
        game_title: "3D 스네이크 게임",
        space_journey: "우주 여행",
        controls: "화살표 키를 사용하여 이동",
        score: "점수",
        high: "최고 점수",
        start_game: "게임 시작",
        open_shop: "상점 열기",
        skins: "스킨",
        backgrounds: "배경",
        back_to_menu: "메뉴로 돌아가기",
        owned: "보유함",
        not_enough_coins: "코인이 부족합니다!",
        mod_picker: "테마 설정",
        pause: "일시 정지",
        resume: "재개",
        coins: "코인",
        cheater_speed: "무결성 오류: 이동 속도 이상 감지.",
        cheater_tamper: "무결성 오류: 값 일관성 검사 실패.",
        classic_green: "클래식 그린",
        neon_blue: "네온 블루",
        lava_flow: "용암 흐름",
        golden_midas: "골든 마이더스",
        void_walker: "보이드 워커",
        matrix_code: "매트릭스 코드",
        deep_space: "심우주",
        neon_city: "네온 시티",
        sunset_grid: "선셋 그리드",
        matrix_void: "매트릭스 보이드",
        hellscape: "헬스케이프",
        event_horizon: "이벤트 호라이즌",
        mystery_void: "미스터리 보이드"
    },
    sv: {
        game_title: "3D Ormspel",
        space_journey: "Rymdresa",
        controls: "Använd pilarna för att flytta",
        score: "Poäng",
        high: "Rekord",
        start_game: "Starta spel",
        open_shop: "Öppna butik",
        skins: "Skins",
        backgrounds: "Bakgrunder",
        back_to_menu: "Tillbaka till menyn",
        owned: "ÄGD",
        not_enough_coins: "Inte tillräckligt med mynt!",
        mod_picker: "Temaanpassning",
        pause: "PAUS",
        resume: "ÅTERUPPTA",
        coins: "Mynt",
        cheater_speed: "Integritetsfel: Onormal hastighet upptäckt.",
        cheater_tamper: "Integritetsfel: Värdekontroll misslyckades.",
        classic_green: "Klassisk grön",
        neon_blue: "Neonblå",
        lava_flow: "Lavaflöde",
        golden_midas: "Gyllene Midas",
        void_walker: "Tomrumsvandrare",
        matrix_code: "Matrix-kod",
        deep_space: "Djupt rymd",
        neon_city: "Neonstad",
        sunset_grid: "Solnedgångsnät",
        matrix_void: "Matrix-tomrum",
        hellscape: "Hellscape",
        event_horizon: "Händelsehorisont",
        mystery_void: "Mysterietomrum"
    },
    no: {
        game_title: "3D Slangespill",
        space_journey: "Romreise",
        controls: "Bruk piltastene for å bevege deg",
        score: "Poeng",
        high: "Rekord",
        start_game: "Start spill",
        open_shop: "Åpne butikk",
        skins: "Skins",
        backgrounds: "Bakgrunner",
        back_to_menu: "Tilbake til menyen",
        owned: "EID",
        not_enough_coins: "Ikke nok mynter!",
        mod_picker: "Tematilpasning",
        pause: "PAUSE",
        resume: "FORTSETT",
        coins: "Mynter",
        cheater_speed: "Integritetsfeil: Unormal hastighet oppdaget.",
        cheater_tamper: "Integritetsfeil: Verdikontroll mislyktes.",
        classic_green: "Klassisk grønn",
        neon_blue: "Neonblå",
        lava_flow: "Lavastrøm",
        golden_midas: "Gylne Midas",
        void_walker: "Tomromsvandrer",
        matrix_code: "Matrix-kode",
        deep_space: "Dyprommet",
        neon_city: "Neonby",
        sunset_grid: "Solnedgangsnett",
        matrix_void: "Matrix-tomrom",
        hellscape: "Hellscape",
        event_horizon: "Hendelseshorisont",
        mystery_void: "Mysterietomrom"
    },
    "es-BO": {
        game_title: "Juego de la Serpiente 3D",
        space_journey: "Viaje Espacial",
        controls: "Usa las flechitas para moverte",
        score: "Puntos",
        high: "Récord",
        start_game: "¡Dale!",
        open_shop: "La Tienda",
        skins: "Pinturas",
        backgrounds: "Fondos",
        back_to_menu: "Atrás",
        owned: "YA LO TIENES",
        not_enough_coins: "¡No tienes platita!",
        mod_picker: "Temas",
        pause: "QUIETO",
        resume: "SIGUE",
        coins: "Monedas",
        cheater_speed: "Error de integridad: ¡Te pasaste de velocidad, pues!",
        cheater_tamper: "Error de integridad: Valores inventados.",
        classic_green: "Verde Clásico",
        neon_blue: "Azul Neón",
        lava_flow: "Lava",
        golden_midas: "Midas de Oro",
        void_walker: "Caminante del Vacío",
        matrix_code: "Código Matrix",
        deep_space: "Espacio Profundo",
        neon_city: "Ciudad Neón",
        sunset_grid: "Rejilla Atardecer",
        matrix_void: "Vacío Matrix",
        hellscape: "Infierno",
        event_horizon: "Horizonte de Eventos",
        mystery_void: "Vacío Misterioso"
    },
    ja: {
        game_title: "3D スネークゲーム",
        space_journey: "宇宙の旅",
        controls: "矢印キーで移動",
        score: "スコア",
        high: "最高",
        start_game: "スタート",
        open_shop: "ショップ",
        skins: "スキン",
        backgrounds: "背景",
        back_to_menu: "メニューに戻る",
        owned: "所有済み",
        not_enough_coins: "コインが足りません！",
        mod_picker: "テーマのカスタマイズ",
        pause: "一時停止",
        resume: "再開",
        coins: "コイン",
        cheater_speed: "整合性エラー：移動速度の異常を検出。",
        cheater_tamper: "整合性エラー：数値の一貫性チェックに失敗。",
        classic_green: "クラシックグリーン",
        neon_blue: "ネオンブルー",
        lava_flow: "溶岩流",
        golden_midas: "ゴールデンマイダス",
        void_walker: "ボイドウォーカー",
        matrix_code: "マトリックスコード",
        deep_space: "ディープスペース",
        neon_city: "ネオンシティ",
        sunset_grid: "サンセットグリッド",
        matrix_void: "マトリックスボイド",
        hellscape: "ヘルスケープ",
        event_horizon: "事象の地平線",
        mystery_void: "ミステリーボイド"
    },
    mn: {
        game_title: "3D Могой тоглоом",
        space_journey: "Сансрын аялал",
        controls: "Суман товчлуураар хөдөлнө үү",
        score: "Оноо",
        high: "Дээд",
        start_game: "Тоглоом эхлүүлэх",
        open_shop: "Дэлгүүр нээх",
        skins: "Арьс",
        backgrounds: "Дэвсгэр",
        back_to_menu: "Цэс рүү буцах",
        owned: "Эзэмшсэн",
        not_enough_coins: "Зоос хүрэлцэхгүй байна!",
        mod_picker: "Загвар тохируулах",
        pause: "Түр зогсолт",
        resume: "Үргэлжлүүлэх",
        coins: "Зоос",
        cheater_speed: "Бүрэн бүтэн байдлын алдаа: Хурдны хэвийн бус байдал илэрлээ.",
        cheater_tamper: "Бүрэн бүтэн байдлын алдаа: Утга шалгалт амжилтгүй боллоо.",
        classic_green: "Сонгодог ногоон",
        neon_blue: "Неон цэнхэр",
        lava_flow: "Лаав",
        golden_midas: "Алтан Мидас",
        void_walker: "Хоосон орон зайн аялагч",
        matrix_code: "Матрикс код",
        deep_space: "Гүн сансар",
        neon_city: "Неон хот",
        sunset_grid: "Жаргах нарны тор",
        matrix_void: "Матрикс хоосон орон зай",
        hellscape: "Там",
        event_horizon: "Үйл явдлын хаяа",
        mystery_void: "Нууцлаг хоосон орон зай"
    },
    uk: {
        game_title: "3D Змійка",
        space_journey: "Космічна подорож",
        controls: "Використовуйте стрілки для руху",
        score: "Рахунок",
        high: "Рекорд",
        start_game: "Почати гру",
        open_shop: "Магазин",
        skins: "Скіни",
        backgrounds: "Фони",
        back_to_menu: "В меню",
        owned: "КУПЛЕНО",
        not_enough_coins: "Недостатньо монет!",
        mod_picker: "Налаштування теми",
        pause: "ПАУЗА",
        resume: "ПРОДОВЖИТИ",
        coins: "Монети",
        cheater_speed: "Помилка цілісності: Виявлено аномальну швидкість.",
        cheater_tamper: "Помилка цілісності: Невідповідність значень.",
        classic_green: "Класичний зелений",
        neon_blue: "Неоновий синій",
        lava_flow: "Потік лави",
        golden_midas: "Золотий Мідас",
        void_walker: "Мандрівник Порожнечі",
        matrix_code: "Код Матриці",
        deep_space: "Глибокий космос",
        neon_city: "Неонове місто",
        sunset_grid: "Західна сітка",
        matrix_void: "Порожнеча Матриці",
        hellscape: "Пекельний пейзаж",
        event_horizon: "Горизонт подій",
        mystery_void: "Таємнича порожнеча"
    },
    da: {
        game_title: "3D Slangespil",
        space_journey: "Rumrejse",
        controls: "Brug piletasterne til at bevæge dig",
        score: "Point",
        high: "Rekord",
        start_game: "Start spillet",
        open_shop: "Åbn butik",
        skins: "Skins",
        backgrounds: "Baggrunde",
        back_to_menu: "Tilbage til menu",
        owned: "EJET",
        not_enough_coins: "Ikke nok mønter!",
        mod_picker: "Tematilpasning",
        pause: "PAUSE",
        resume: "FORTSÆT",
        coins: "Mønter",
        cheater_speed: "Integritetsfejl: Unormal hastighed detekteret.",
        cheater_tamper: "Integritetsfejl: Værditjek fejlede.",
        classic_green: "Klassisk Grøn",
        neon_blue: "Neon Blå",
        lava_flow: "Lavastrøm",
        golden_midas: "Gyldne Midas",
        void_walker: "Tomrumsvandrer",
        matrix_code: "Matrix-kode",
        deep_space: "Dybt rum",
        neon_city: "Neonby",
        sunset_grid: "Solnedgangsnet",
        matrix_void: "Matrix-tomrum",
        hellscape: "Hellscape",
        event_horizon: "Begivenhedshorisont",
        mystery_void: "Mystisk tomrum"
    },
    pcm: {
        game_title: "3D Snake Game",
        space_journey: "Space Waka",
        controls: "Use arrow keys for movement",
        score: "Score",
        high: "High",
        start_game: "Start Game",
        open_shop: "Open Shop",
        skins: "Skins",
        backgrounds: "Backgrounds",
        back_to_menu: "Go Back",
        owned: "YOU GET AM",
        not_enough_coins: "Money no reach!",
        mod_picker: "Theme Settings",
        pause: "PAUSE",
        resume: "CONTINUE",
        coins: "Coins",
        cheater_speed: "Integrity Error: Your speed too much.",
        cheater_tamper: "Integrity Error: Something wrong with the values.",
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
    kk: {
        game_title: "3D Жылан ойыны",
        space_journey: "Ғарыш сапары",
        controls: "Қозғалу үшін көрсеткілерді пайдаланыңыз",
        score: "Ұпай",
        high: "Рекорд",
        start_game: "Ойынды бастау",
        open_shop: "Дүкенді ашу",
        skins: "Кейіптер",
        backgrounds: "Фондар",
        back_to_menu: "Мәзірге қайту",
        owned: "САТЫП АЛЫНДЫ",
        not_enough_coins: "Тиындар жеткіліксіз!",
        mod_picker: "Тақырыпты баптау",
        pause: "КІДІРІС",
        resume: "ЖАЛҒАСТЫРУ",
        coins: "Тиындар",
        cheater_speed: "Тұтастық қатесі: Қозғалыс жылдамдығында ауытқу анықталды.",
        cheater_tamper: "Тұтастық қатесі: Мәндерді тексеру сәтсіз аяқталды.",
        classic_green: "Классикалық жасыл",
        neon_blue: "Неонды көк",
        lava_flow: "Лава ағыны",
        golden_midas: "Алтын Мидас",
        void_walker: "Бос орын кезбесі",
        matrix_code: "Матрица коды",
        deep_space: "Терең ғарыш",
        neon_city: "Неонды қала",
        sunset_grid: "Күн бату торы",
        matrix_void: "Матрица бостығы",
        hellscape: "Тозақ пейзажы",
        event_horizon: "Оқиғалар көжиегі",
        mystery_void: "Жұмбақ бостық"
    },
    am: {
        game_title: "3D የእባብ ጨዋታ",
        space_journey: "የጠፈር ጉዞ",
        controls: "ለመንቀሳቀስ የቀስት ቁልፎችን ይጠቀሙ",
        score: "ውጤት",
        high: "ከፍተኛ",
        start_game: "ጨዋታ ጀምር",
        open_shop: "ሱቅ ክፈት",
        skins: "ቆዳዎች",
        backgrounds: "ዳራዎች",
        back_to_menu: "ወደ ምናሌ ተመለስ",
        owned: "የተያዘ",
        not_enough_coins: "በቂ ሳንቲሞች የሉም!",
        mod_picker: "ጭብጥ ማበጀት",
        pause: "ቆም በል",
        resume: "ቀጥል",
        coins: "ሳንቲሞች",
        cheater_speed: "የታማኝነት ስህተት፡ ያልተለመደ የፍጥነት እንቅስቃሴ ተገኝቷል።",
        cheater_tamper: "የታማኝነት ስህተት፡ የእሴት ወጥነት ፍተሻ አልተሳካም።",
        classic_green: "ክላሲክ አረንጓዴ",
        neon_blue: "ኒዮን ሰማያዊ",
        lava_flow: "የላቫ ፍሰት",
        golden_midas: "ጎልደን ሚዳስ",
        void_walker: "ቮይድ ዎከር",
        matrix_code: "ማትሪክስ ኮድ",
        deep_space: "ጥልቅ ጠፈር",
        neon_city: "ኒዮን ሲቲ",
        sunset_grid: "ሰንሰት ግሪድ",
        matrix_void: "ማትሪክስ ቮይድ",
        hellscape: "ሄልስኬፕ",
        event_horizon: "ኢቨንት ሆራይዘን",
        mystery_void: "ሚስጥራዊ ቮይድ"
    },
    "es-AR": {
        game_title: "Juego de la Serpiente 3D",
        space_journey: "Viaje Espacial",
        controls: "Usá las flechas para moverte",
        score: "Puntos",
        high: "Récord",
        start_game: "Arrancar",
        open_shop: "Tienda",
        skins: "Aspectos",
        backgrounds: "Fondos",
        back_to_menu: "Volver",
        owned: "LO TENÉS",
        not_enough_coins: "¡No tenés un mango!",
        mod_picker: "Temas",
        pause: "PAUSA",
        resume: "SEGUIR",
        coins: "Monedas",
        cheater_speed: "Error de integridad: Velocidad re loca detectada.",
        cheater_tamper: "Error de integridad: Valores cualquiera.",
        classic_green: "Verde Clásico",
        neon_blue: "Azul Neón",
        lava_flow: "Lava",
        golden_midas: "Midas de Oro",
        void_walker: "Caminante del Vacío",
        matrix_code: "Código Matrix",
        deep_space: "Espacio Profundo",
        neon_city: "Ciudad Neón",
        sunset_grid: "Rejilla Atardecer",
        matrix_void: "Vacío Matrix",
        hellscape: "Infierno",
        event_horizon: "Horizonte de Eventos",
        mystery_void: "Vacío Misterioso"
    },
    "es-CU": {
        game_title: "Juego de la Serpiente 3D",
        space_journey: "Viaje Espacial",
        controls: "Asere, usa las flechas pa' moverte",
        score: "Puntos",
        high: "Récord",
        start_game: "Dale play",
        open_shop: "La Tienda",
        skins: "Pinturas",
        backgrounds: "Fondos",
        back_to_menu: "Pa'trás",
        owned: "YA ES TUYO",
        not_enough_coins: "¡No hay divisa, asere!",
        mod_picker: "Temas",
        pause: "AGUANTA",
        resume: "SIGUE",
        coins: "Monedas",
        cheater_speed: "Error de integridad: Te pasaste de velocidad, consorte.",
        cheater_tamper: "Error de integridad: Valores inventa'os.",
        classic_green: "Verde Clásico",
        neon_blue: "Azul Neón",
        lava_flow: "Lava",
        golden_midas: "Midas de Oro",
        void_walker: "Caminante del Vacío",
        matrix_code: "Código Matrix",
        deep_space: "Espacio Profundo",
        neon_city: "Ciudad Neón",
        sunset_grid: "Rejilla Atardecer",
        matrix_void: "Vacío Matrix",
        hellscape: "Infierno",
        event_horizon: "Horizonte de Eventos",
        mystery_void: "Vacío Misterioso"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = ['ar', 'fa', 'he'].includes(lang) ? 'rtl' : 'ltr';
    
    // Persist manual selection to cache to be resilient to refreshes
    Security.save('snake3d_lang_cache', lang);
    Security.setCookie('snake3d_lang_cache', lang, 365); // Mirror to cookie for cache-clearing resilience
    
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
    // 1. Check for cached language first (resilient to refresh/clear)
    let cachedLang = Security.load('snake3d_lang_cache', null);
    
    // Fallback to cookie if localStorage was cleared
    if (!cachedLang) {
        cachedLang = Security.getCookie('snake3d_lang_cache');
    }

    if (cachedLang && TRANSLATIONS[cachedLang]) {
        setLanguage(cachedLang);
        return;
    }

    // 2. Check for explicit geolocation consent
    const geoConsented = Security.load('snake3d_geo_consented', false);
    
    if (geoConsented) {
        // Resilience: Try multiple providers in case one is blocked or down
        const providers = [
            { url: 'https://ipapi.co/json/', key: 'country_code' },
            { url: 'https://ip-api.com/json/', key: 'countryCode' }
        ];

        for (const provider of providers) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout for resilience

                const response = await fetch(provider.url, { signal: controller.signal });
                clearTimeout(timeoutId);
                
                const data = await response.json();
                const countryCode = data[provider.key];
                
                if (countryCode) {
                    const mapping = {
                        'FR': 'fr', 'MX': 'es', 'ES': 'es', 'IT': 'it', 'TR': 'tr', 'IR': 'fa',
                        'BR': 'pt', 'RU': 'ru', 'IN': 'hi', 'DE': 'de', 'KR': 'ko', 'JP': 'ja',
                        'MN': 'mn', 'UA': 'uk', 'ET': 'am', 'AR': 'es-AR', 'CU': 'es-CU',
                        'VN': 'vi', 'TH': 'th', 'ID': 'id', 'PK': 'ur', 'BD': 'bn',
                        'IL': 'he', 'GR': 'el', 'AL': 'sq', 'RO': 'ro', 'BG': 'bg',
                        'NL': 'nl', 'BE': 'nl', 'PL': 'pl', 'FI': 'fi',
                        'SE': 'sv', 'NO': 'no', 'BO': 'es-BO',
                        'DK': 'da', 'NG': 'pcm', 'KZ': 'kk'
                    };

                    let detectedLang = mapping[countryCode] || 'en';
                    
                    // Special case for Chinese/Arabic regions
                    if (['CN', 'TW', 'HK'].includes(countryCode)) detectedLang = 'zh';
                    else if (['SA', 'AE', 'EG', 'JO', 'LB', 'MA', 'QA'].includes(countryCode)) detectedLang = 'ar';

                    setLanguage(detectedLang); // setLanguage also handles the caching
                    return;
                }
            } catch (e) {
                console.warn(`GeoIP provider ${provider.url} failed:`, e.message);
                continue; // Try next provider
            }
        }
    }

    // 3. Fallback to navigator.language (Privacy-friendly, no IP tracking)
    const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
    if (TRANSLATIONS[browserLang]) {
        setLanguage(browserLang);
        return;
    }
    
    setLanguage('en');
}

// Skins configuration
const SKINS = [
    { id: 'classic', nameKey: 'classic_green', head: 0x00ff00, body: 0x008800, price: 0 },
    { id: 'neon', nameKey: 'neon_blue', head: 0x00ffff, body: 0x0000ff, price: 50 },
    { id: 'lava', nameKey: 'lava_flow', head: 0xff4400, body: 0x880000, price: 100 },
    { id: 'gold', nameKey: 'golden_midas', head: 0xffff00, body: 0xaa8800, price: 250 },
    { id: 'void', nameKey: 'void_walker', head: 0xff00ff, body: 0x440044, price: 500 },
    { id: 'matrix', nameKey: 'matrix_code', head: 0x00ff00, body: 0x003300, emissive: 0x00ff00, price: 1000 },
    { id: 'viper', nameKey: 'viper_realistic', head: 0x228b22, body: 0x1a4a1a, price: 5000, isRealistic: true, modelPath: '3D Models/Viper Realistic/scene.gltf' }
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
        id: 'neon', nameKey: 'neon_city', color: 0x000011, stars: true, grid: 0xff00ff, fog: 0x000022, envType: 'cubes', price: 100,
        groundTexture: 'neon',
        ambientLightColor: 0x220044,
        ambientLightIntensity: 0.8,
        pointLightColor: 0x00ffff,
        pointLightIntensity: 1.5,
        particleColor: 0x00ffff,
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
            // Load mods in parallel for faster startup
            await Promise.all(manifest.mods.map(modFolder => this.loadMod(modFolder)));
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
                Notifications.show(`System Alert: Failed to load theme config for "${folder}" (${res.status})`, 'warning');
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
                        
                        if (skin.headTexture && !headTexture) Notifications.show(`System Alert: Texture not found - ${skin.headTexture}`, 'warning');
                        if (skin.bodyTexture && !bodyTexture) Notifications.show(`System Alert: Texture not found - ${skin.bodyTexture}`, 'warning');

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
                                    Notifications.show(`System Alert: Model not found - ${bg.modelPath}`, 'warning');
                                    return null;
                                });
                        }
                        if (bg.texturePath) {
                            envTexture = await textureLoader.loadAsync(`${basePath}Background/Textures/${bg.texturePath}`)
                                .catch(() => {
                                    Notifications.show(`System Alert: Texture not found - ${bg.texturePath}`, 'warning');
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
            
            // Show Theme Customization button if multiple themes exist
            if (this.mods.length > 1) {
                document.getElementById('mod-picker-btn').style.display = 'block';
            }
            console.log(`Successfully loaded theme: ${modData.name}`);
        } catch (e) {
            console.error(`Failed to load theme from ${folder}:`, e);
            Notifications.show(`System Alert: Critical error loading "${folder}"`, 'error');
        }
    }
};

// Anti-cheat / Security Manager
const Security = {
    _key: 'snake_secret_salt',
    // Cookie helpers for resilience to localStorage clearing
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    },
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
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
        
        // Resilience: Sync critical flags to cookies
        if (key === 'snake3d_consented' || key === 'snake3d_geo_consented' || key === 'snake3d_consent_version') {
            this.setCookie(key, value, 365);
        }
    },
    load(key, defaultValue) {
        const data = localStorage.getItem(key);
        let val = this.deobfuscate(data);
        
        // Resilience: Fallback to cookies if localStorage is cleared
        if (val === null && (key === 'snake3d_consented' || key === 'snake3d_geo_consented' || key === 'snake3d_consent_version')) {
            const cookieVal = this.getCookie(key);
            if (cookieVal !== null) {
                val = cookieVal;
                // Sync back to localStorage
                localStorage.setItem(key, this.obfuscate(val));
            }
        }

        if (val === null) return defaultValue;

        // Type conversion logic
        if (typeof defaultValue === 'number') return parseFloat(val);
        if (typeof defaultValue === 'boolean') return val === 'true';
        return val;
    },
    resetData() {
        if (confirm("DANGER: This will permanently delete all your game progress, coins, and settings. Are you sure?")) {
            localStorage.clear();
            // Also clear resilience cookies
            this.setCookie('snake3d_consented', '', -1);
            this.setCookie('snake3d_geo_consented', '', -1);
            this.setCookie('snake3d_consent_version', '', -1);
            this.setCookie('snake3d_lang_cache', '', -1);
            location.reload();
        }
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
let isFreeCamera = Security.load('snake3d_free_cam', false);
let keyBinds = JSON.parse(Security.load('snake3d_keybinds', JSON.stringify({
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    shop: "s",
    perf: "f",
    freeCam: "c",
    pause: "p",
    volUp: "+",
    volDown: "-"
})));
let keysPressed = {};
let particles = [];
let decorativeObjects = [];
let cheaterDetected = false;
let starfield = null;

// Mobile Swipe state
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;
let swipeCameraVelocity = new THREE.Vector2(0, 0);

// Audio setup
class AudioManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.musicReverb = null;
        this.sfxReverb = null;
        this.musicLoopId = null;
        this.currentMusicConfig = null;
        this.externalMusicSource = null;
        this.externalAudioBuffers = new Map();
        this.isMuted = Security.load('snake3d_muted', false);
        this.musicVolume = Security.load('snake3d_music_volume', 0.5);
        this.sfxVolume = Security.load('snake3d_sfx_volume', 0.5);
    }

    init() {
        if (this.ctx) {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            return;
        }
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 1.0;
        
        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = this.musicVolume;
        
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.sfxVolume;

        // Chain: musicGain/sfxGain -> masterGain -> destination
        this.musicGain.connect(this.masterGain);
        this.sfxGain.connect(this.masterGain);
        
        // Create separate reverb paths for music and SFX to prevent bleeding
        this.musicReverb = this.ctx.createConvolver();
        this.sfxReverb = this.ctx.createConvolver();
        
        const impulse = this.createReverbBuffer(1.5, 2.0);
        this.musicReverb.buffer = impulse;
        this.sfxReverb.buffer = impulse;

        this.musicReverb.connect(this.musicGain);
        this.sfxReverb.connect(this.sfxGain);
        
        this.masterGain.connect(this.ctx.destination);
    }

    setMusicVolume(value) {
        this.musicVolume = value;
        Security.save('snake3d_music_volume', value);
        if (this.musicGain) {
            this.musicGain.gain.setTargetAtTime(value, this.ctx.currentTime, 0.1);
        }
    }

    setSfxVolume(value) {
        this.sfxVolume = value;
        Security.save('snake3d_sfx_volume', value);
        if (this.sfxGain) {
            this.sfxGain.gain.setTargetAtTime(value, this.ctx.currentTime, 0.1);
        }
    }

    // Procedural Reverb Impulse Response
    createReverbBuffer(duration, decay) {
        if (!this.ctx) return null;
        const sampleRate = this.ctx.sampleRate;
        const length = sampleRate * duration;
        const impulse = this.ctx.createBuffer(2, length, sampleRate);
        for (let i = 0; i < 2; i++) {
            const channel = impulse.getChannelData(i);
            for (let j = 0; j < length; j++) {
                channel[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / length, decay);
            }
        }
        return impulse;
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

    playExternalSound(url, isMusic = false) {
        if (!this.ctx || !this.externalAudioBuffers.has(url)) return false;
        const source = this.ctx.createBufferSource();
        source.buffer = this.externalAudioBuffers.get(url);
        source.connect(isMusic ? this.musicGain : this.sfxGain);
        source.start(0);
        return true;
    }

    updateMusicTheme(bgId) {
        const bg = BACKGROUNDS.find(b => b.id === bgId) || BACKGROUNDS[0];
        if (this.currentMusicConfig === bg.music) return;
        this.currentMusicConfig = bg.music;
        
        if (this.ctx && this.musicReverb) {
            this.musicReverb.buffer = this.createReverbBuffer(2.0, bg.music.reverb * 5 || 2.0);
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
        
        // Route to correct channel and reverb
        const targetGain = options.isMusic ? this.musicGain : this.sfxGain;
        const targetReverb = options.isMusic ? this.musicReverb : this.sfxReverb;

        if (options.useReverb) {
            gain.connect(targetReverb);
        } else {
            gain.connect(targetGain);
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
                this.externalMusicSource.connect(this.musicGain);
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
                        sustain: 0.3,
                        isMusic: true // Mark as music
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

// Texture & Model Loaders with LoadingManager for performance monitoring
const loadingManager = new THREE.LoadingManager();
const loadingBar = document.getElementById('loading-bar');
const loadingStatus = document.getElementById('loading-status');
const loadingOverlay = document.getElementById('loading-overlay');

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100;
    if (loadingBar) loadingBar.style.width = `${progress}%`;
    if (loadingStatus) loadingStatus.innerText = `Downloading: ${url.split('/').pop()}...`;
};

loadingManager.onLoad = () => {
    if (loadingStatus) loadingStatus.innerText = "System Ready. Initializing Simulation...";
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => loadingOverlay.style.display = 'none', 500);
        }
    }, 500);
};

loadingManager.onError = (url) => {
    console.error('Loading error:', url);
    Notifications.show(`CORE SYNC ERROR: Failed to load ${url}`, 'error');
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager);

// Realistic Viper Model Data
let viperModel = null;
let viperAnimations = [];
const viperMixers = new Set();

async function loadViperModel() {
    if (viperModel) return; 
    try {
        console.log("Starting to load Viper Realistic model...");
        const gltf = await gltfLoader.loadAsync('3D%20Models/Viper%20Realistic/scene.gltf');
        viperModel = gltf.scene;
        viperAnimations = gltf.animations;
        console.log("Viper Realistic model loaded successfully with " + viperAnimations.length + " animations.");
        
        // Refresh scene if using viper skin
        if (currentSkinId === 'viper') {
            console.log("Refreshing menu scene with new Viper model...");
            if (isMainMenu) {
                MenuManager.createMenuScene();
            }
            
            // Refresh shop if open
            if (document.getElementById('shop-overlay').style.display !== 'none') {
                updateShopPreview();
            }
        }
    } catch (e) {
        console.error("CRITICAL: Failed to load Viper Realistic model:", e);
        Notifications.show(`System Alert: Failed to load Viper model. ${e.message}`, "error");
    }
}

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
controls.enableRotate = isFreeCamera; // Respect initial setting
controls.update();

// Lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Directional light for Sun (Deep Space only)
const sunLight = new THREE.DirectionalLight(0xffffff, 0);
scene.add(sunLight);
scene.add(sunLight.target); // Need to add target to scene to move it independently if needed

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
    
    // Default light position
    pointLight.position.set(10, 10, 10);
    pointLight.distance = 100;
    
    // Default sun light state
    sunLight.intensity = 0;

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
        case 'planets': {
            // Add a Sun
            const sunGeom = new THREE.SphereGeometry(25, 32, 32);
            const sunMat = new THREE.MeshBasicMaterial({ color: 0xffffaa });
            const sun = new THREE.Mesh(sunGeom, sunMat);
            // Position sun in front of the starting camera to be clearly visible
            const sunPos = new THREE.Vector3(0, 80, -250);
            sun.position.copy(sunPos);
            scene.add(sun);
            decorativeObjects.push({ mesh: sun, rotationSpeed: 0.0005 });

            // Update sun directional light source
            sunLight.position.copy(sunPos);
            sunLight.target.position.set(0, 0, 0);
            sunLight.intensity = 2.0; 

            // Dim the point light in space to let the Sun dominate
            pointLight.intensity = 0.5;

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
                    sunDirection: { value: sunPos.clone().normalize() }
                },
                vertexShader: `
                    uniform vec3 sunDirection;
                    varying vec2 vUv;
                    varying vec3 vWorldNormal;
                    void main() {
                        vUv = uv;
                        vWorldNormal = normalize(vec3(modelMatrix * vec4(normal, 0.0)));
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform sampler2D dayTexture;
                    uniform sampler2D nightTexture;
                    uniform vec3 sunDirection;
                    varying vec2 vUv;
                    varying vec3 vWorldNormal;
                    void main() {
                        float intensity = dot(normalize(vWorldNormal), normalize(sunDirection));
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
        }
        case 'cubes': {
            const skyscraperCount = isLowPerformance ? 10 : 40;
            const colors = [0x00ffff, 0xff00ff, 0x00ff00, 0xffff00];
            
            for (let i = 0; i < skyscraperCount; i++) {
                const w = Math.random() * 4 + 2;
                const h = Math.random() * 30 + 10;
                const d = Math.random() * 4 + 2;
                const geometry = new THREE.BoxGeometry(w, h, d);
                
                const color = colors[Math.floor(Math.random() * colors.length)];
                const material = new THREE.MeshPhongMaterial({ 
                    color: 0x111111, 
                    emissive: color,
                    emissiveIntensity: 0.2,
                    shininess: 100
                });
                
                const mesh = new THREE.Mesh(geometry, material);
                
                // Position around the grid
                let x = (Math.random() - 0.5) * 150;
                let z = (Math.random() - 0.5) * 150;
                
                // Don't place buildings too close to the playable grid
                if (Math.abs(x) < 15 && Math.abs(z) < 15) {
                    x += x > 0 ? 20 : -20;
                    z += z > 0 ? 20 : -20;
                }
                
                mesh.position.set(x, h/2 - 5, z);
                scene.add(mesh);
                
                // Add wireframe "neon" edges
                const edges = new THREE.EdgesGeometry(geometry);
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: color }));
                mesh.add(line);
                
                decorativeObjects.push({ mesh, rotationSpeed: 0 });
            }
            
            // Add "Neon Traffic"
            const trafficCount = isLowPerformance ? 5 : 20;
            for (let i = 0; i < trafficCount; i++) {
                const size = Math.random() * 0.3 + 0.1;
                const geometry = new THREE.SphereGeometry(size, 8, 8);
                const color = colors[Math.floor(Math.random() * colors.length)];
                const material = new THREE.MeshBasicMaterial({ color: color });
                const mesh = new THREE.Mesh(geometry, material);
                
                const axis = Math.random() > 0.5 ? 'x' : 'z';
                const speed = (Math.random() * 0.2 + 0.1) * (Math.random() > 0.5 ? 1 : -1);
                
                mesh.position.set(
                    (Math.random() - 0.5) * 100,
                    Math.random() * 5 + 1,
                    (Math.random() - 0.5) * 100
                );
                
                scene.add(mesh);
                decorativeObjects.push({ mesh, speed, axis });
            }
            break;
        }
        case 'sun': {
            const sunGeom = new THREE.SphereGeometry(10, 32, 32);
            const sunMat = new THREE.MeshBasicMaterial({ color: 0xff00ff });
            const sunMesh = new THREE.Mesh(sunGeom, sunMat);
            sunMesh.position.set(0, 0, -80);
            scene.add(sunMesh);
            decorativeObjects.push({ mesh: sunMesh, rotationSpeed: 0.001 });
            break;
        }
        case 'code': {
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
        }
        case 'lava': {
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
        }
        case 'blackhole': {
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
        }
        case 'custom': {
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
    if (particles.length === 0) return;
    
    // Process particles in-place for better performance
    let j = 0;
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.mesh.position.add(p.velocity);
        p.life -= 0.02;
        
        if (p.life > 0) {
            p.mesh.scale.set(p.life, p.life, p.life);
            particles[j++] = p;
        } else {
            scene.remove(p.mesh);
        }
    }
    particles.length = j;
}

// Materials
const foodMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x440000 });
const coinMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc00, emissive: 0x443300 });
const cubeGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const tongueGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.4);
const tongueMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

function createSnakeMesh(type, skinId, dir = null) {
    const skin = SKINS.find(s => s.id === skinId) || SKINS[0];
    const materials = getSkinMaterials(skinId);
    
    if (skin.isRealistic) {
        if (skinId === 'viper') {
            if (viperModel) {
                const modelClone = viperModel.clone();
                // Scale model to fit the grid cell (approx 1 unit)
                modelClone.scale.setScalar(0.5); 
                
                if (type === 'head') {
                    const mixer = new THREE.AnimationMixer(modelClone);
                    modelClone.userData.mixer = mixer;
                    viperMixers.add(mixer);
                    
                    // Initial animation
                    const moveClip = THREE.AnimationClip.findByName(viperAnimations, 'SnakeBones|SnakeMove1');
                    if (moveClip) {
                        const action = mixer.clipAction(moveClip);
                        action.play();
                        modelClone.userData.currentAction = action;
                    }

                    if (dir) {
                        const target = new THREE.Vector3().copy(dir);
                        modelClone.lookAt(target);
                    }
                    return modelClone;
                } else {
                    // For body/tail, use the same model but offset animation
                    const mixer = new THREE.AnimationMixer(modelClone);
                    modelClone.userData.mixer = mixer;
                    viperMixers.add(mixer);
                    
                    const moveClip = THREE.AnimationClip.findByName(viperAnimations, 'SnakeBones|SnakeMove1');
                    if (moveClip) {
                        const action = mixer.clipAction(moveClip);
                        action.play();
                        // Offset time based on type to avoid perfect sync
                        action.time = type === 'tail' ? 0.5 : 0.25; 
                        modelClone.userData.currentAction = action;
                    }

                    if (dir) {
                        const target = new THREE.Vector3().copy(dir);
                        modelClone.lookAt(target);
                    }
                    return modelClone;
                }
            } else {
                console.log("Viper model not loaded yet, using primitives as fallback.");
            }
        }

        if (type === 'head') {
            const headGroup = new THREE.Group();
            const headMesh = new THREE.Mesh(sphereGeometry, materials.head);
            headGroup.add(headMesh);
            
            // Add eyes
            const eyeR = new THREE.Mesh(eyeGeometry, eyeMaterial);
            eyeR.position.set(0.2, 0.2, 0.4);
            const eyeL = new THREE.Mesh(eyeGeometry, eyeMaterial);
            eyeL.position.set(-0.2, 0.2, 0.4);
            headGroup.add(eyeR, eyeL);
            
            // Add flickering tongue
            const tongue = new THREE.Mesh(tongueGeometry, tongueMaterial);
            tongue.position.set(0, -0.1, 0.5);
            headGroup.add(tongue);
            headGroup.userData.tongue = tongue;
            
            // Rotate head to face movement direction
            if (dir) {
                const target = new THREE.Vector3().copy(dir);
                headGroup.lookAt(target);
            }
            return headGroup;
        } else if (type === 'tail') {
            const tailMesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), materials.body);
            return tailMesh;
        } else {
            return new THREE.Mesh(sphereGeometry, materials.body);
        }
    } else {
        return new THREE.Mesh(cubeGeometry, type === 'head' ? materials.head : materials.body);
    }
}

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
    snake.forEach(segment => {
        if (segment.mesh.userData.mixer) {
            viperMixers.delete(segment.mesh.userData.mixer);
        }
        scene.remove(segment.mesh);
    });
    snake = [];
    viperMixers.clear(); // Clear all mixers for new game
    if (food) scene.remove(food.mesh);
    food = null;
    if (coin) scene.remove(coin.mesh);
    coin = null;

    const materials = getSkinMaterials(currentSkinId);
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        let type = 'body';
        if (i === 0) type = 'head';
        else if (i === INITIAL_SNAKE_LENGTH - 1) type = 'tail';
        
        const mesh = createSnakeMesh(type, currentSkinId, direction);
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
    // Spinning coin mesh (cylinder as a flat disk, or sphere on mobile)
    const geometry = isTouchDevice ? 
        new THREE.SphereGeometry(0.35, 16, 16) : 
        new THREE.CylinderGeometry(0.35, 0.35, 0.1, 16);
    const mesh = new THREE.Mesh(geometry, coinMaterial);
    mesh.position.copy(pos);
    if (!isTouchDevice) mesh.rotation.x = Math.PI / 2; // Flat disk facing camera
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
        if (tail.mesh.userData.mixer) {
            viperMixers.delete(tail.mesh.userData.mixer);
        }
        scene.remove(tail.mesh);

        // Update new tail geometry if realistic
        const currentSkin = SKINS.find(s => s.id === currentSkinId);
        if (currentSkin.isRealistic && snake.length > 0) {
            const lastSegment = snake[snake.length - 1];
            scene.remove(lastSegment.mesh);
            lastSegment.mesh = createSnakeMesh('tail', currentSkinId);
            lastSegment.mesh.position.copy(lastSegment.pos);
            scene.add(lastSegment.mesh);
        }
    } else {
        // Normal move: remove tail
        const tail = snake.pop();
        if (tail.mesh.userData.mixer) {
            viperMixers.delete(tail.mesh.userData.mixer);
        }
        scene.remove(tail.mesh);

        // Update new tail geometry if realistic
        const currentSkin = SKINS.find(s => s.id === currentSkinId);
        if (currentSkin.isRealistic && snake.length > 0) {
            const lastSegment = snake[snake.length - 1];
            scene.remove(lastSegment.mesh);
            lastSegment.mesh = createSnakeMesh('tail', currentSkinId);
            lastSegment.mesh.position.copy(lastSegment.pos);
            scene.add(lastSegment.mesh);
        }
    }

    const newHeadMesh = createSnakeMesh('head', currentSkinId, direction);
    newHeadMesh.position.copy(newHeadPos);
    scene.add(newHeadMesh);
    
    // Update old head to body if realistic (otherwise just update material)
    const currentSkin = SKINS.find(s => s.id === currentSkinId);
    if (snake.length > 0) {
        if (currentSkin.isRealistic) {
            const oldHead = snake[0];
            if (oldHead.mesh.userData.mixer) {
                viperMixers.delete(oldHead.mesh.userData.mixer);
            }
            scene.remove(oldHead.mesh);
            oldHead.mesh = createSnakeMesh('body', currentSkinId);
            oldHead.mesh.position.copy(oldHead.pos);
            scene.add(oldHead.mesh);
        } else {
            snake[0].mesh.material = getSkinMaterials(currentSkinId).body;
        }
    }
    
    snake.unshift({ pos: newHeadPos, mesh: newHeadMesh });

    // Victory check: Fill the entire grid
    if (snake.length >= GRID_SIZE * GRID_SIZE) {
        endGame('game_won');
    }
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
    
    if (reason === 'game_won') {
        audioManager.playCoinSound();
        setTimeout(() => audioManager.playCoinSound(), 200);
        setTimeout(() => audioManager.playCoinSound(), 400);
        coins += 500; // Major victory reward
    } else {
        audioManager.playGameOverSound();
    }
    
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
let shopScene, shopCamera, shopRenderer, shopSnake, shopGrid, shopStars, shopLight, shopSunLight;
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

    shopLight = new THREE.PointLight(0xffffff, 1, 100);
    shopLight.position.set(5, 5, 5);
    shopScene.add(shopLight);

    shopSunLight = new THREE.DirectionalLight(0xffffff, 0);
    shopScene.add(shopSunLight);
    shopScene.add(shopSunLight.target);

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
    if (shopSnake) {
        shopSnake.traverse(child => {
            if (child.userData.mixer) {
                viperMixers.delete(child.userData.mixer);
            }
        });
        shopScene.remove(shopSnake);
    }
    const group = new THREE.Group();
    const materials = getSkinMaterials(currentSkinId);
    for (let i = 0; i < 3; i++) {
        let type = 'body';
        if (i === 0) type = 'head';
        else if (i === 2) type = 'tail';
        
        const mesh = createSnakeMesh(type, currentSkinId, new THREE.Vector3(1, 0, 0));
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
    
    // Reset shop light position
    if (shopLight) {
        shopLight.position.set(5, 5, 5);
        shopLight.intensity = 1.0;
    }

    if (shopSunLight) {
        shopSunLight.intensity = 0;
    }

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
        case 'planets': {
            // Add a small Sun for Shop
            const shopSunGeom = new THREE.SphereGeometry(2.5, 32, 32);
            const shopSunMat = new THREE.MeshBasicMaterial({ color: 0xffffaa });
            const shopSun = new THREE.Mesh(shopSunGeom, shopSunMat);
            const shopSunPos = new THREE.Vector3(10, 5, -15);
            shopSun.position.copy(shopSunPos);
            shopScene.add(shopSun);
            shopDecorativeObjects.push({ mesh: shopSun, rotationSpeed: 0.001 });

            if (shopSunLight) {
                shopSunLight.position.copy(shopSunPos);
                shopSunLight.target.position.set(0, 0, 0);
                shopSunLight.intensity = 1.5;
            }
            
            if (shopLight) {
                shopLight.intensity = 0.5;
            }

            // Small Earth for Shop
            const earthGeom = new THREE.SphereGeometry(1.5, 32, 32);
            const earthMat = new THREE.ShaderMaterial({
                uniforms: {
                    dayTexture: { value: planetTextures.earthDay },
                    nightTexture: { value: planetTextures.earthNight },
                    sunDirection: { value: shopSunPos.clone().normalize() }
                },
                vertexShader: `
                    uniform vec3 sunDirection;
                    varying vec2 vUv;
                    varying vec3 vWorldNormal;
                    void main() {
                        vUv = uv;
                        vWorldNormal = normalize(vec3(modelMatrix * vec4(normal, 0.0)));
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform sampler2D dayTexture;
                    uniform sampler2D nightTexture;
                    uniform vec3 sunDirection;
                    varying vec2 vUv;
                    varying vec3 vWorldNormal;
                    void main() {
                        float intensity = dot(normalize(vWorldNormal), normalize(sunDirection));
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
        }
        case 'cubes': {
            const colors = [0x00ffff, 0xff00ff, 0x00ff00, 0xffff00];
            for (let i = 0; i < 15; i++) {
                const h = Math.random() * 10 + 5;
                const geometry = new THREE.BoxGeometry(2, h, 2);
                const color = colors[Math.floor(Math.random() * colors.length)];
                const material = new THREE.MeshPhongMaterial({ color: 0x111111, emissive: color, emissiveIntensity: 0.3 });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set((Math.random() - 0.5) * 20, h/2 - 2, (Math.random() - 0.5) * 20);
                
                const edges = new THREE.EdgesGeometry(geometry);
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: color }));
                mesh.add(line);
                
                shopScene.add(mesh);
                shopDecorativeObjects.push({ mesh, rotationSpeed: 0 });
            }
            break;
        }
        case 'sun': {
            const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff00ff }));
            sunMesh.position.set(0, 0, -10);
            shopScene.add(sunMesh);
            shopDecorativeObjects.push({ mesh: sunMesh, rotationSpeed: 0.01 });
            break;
        }
        case 'code': {
            for (let i = 0; i < 20; i++) {
                const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 }));
                mesh.position.set((Math.random() - 0.5) * 10, Math.random() * 10, (Math.random() - 0.5) * 10);
                shopScene.add(mesh);
                shopDecorativeObjects.push({ mesh, speed: 0.1 });
            }
            break;
        }
        case 'lava': {
            for (let i = 0; i < 10; i++) {
                const mesh = new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 0.5 + 0.2, 8, 8), new THREE.MeshPhongMaterial({ color: 0xff4400 }));
                mesh.position.set((Math.random() - 0.5) * 10, -2, (Math.random() - 0.5) * 10);
                shopScene.add(mesh);
                shopDecorativeObjects.push({ mesh, floatSpeed: 0.02, initialY: -2 });
            }
            break;
        }
        case 'blackhole': {
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
        }
        case 'custom': {
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
}

function animateDecorativeObjects(objects) {
    const now = Date.now();
    objects.forEach(obj => {
        if (obj.rotationSpeed) {
            obj.mesh.rotation.y += obj.rotationSpeed;
            obj.mesh.rotation.x += obj.rotationSpeed * 0.5;
        }
        if (obj.speed) {
            if (obj.axis === 'x') {
                obj.mesh.position.x += obj.speed;
                if (obj.mesh.position.x > 100) obj.mesh.position.x = -100;
                if (obj.mesh.position.x < -100) obj.mesh.position.x = 100;
            } else if (obj.axis === 'z') {
                obj.mesh.position.z += obj.speed;
                if (obj.mesh.position.z > 100) obj.mesh.position.z = -100;
                if (obj.mesh.position.z < -100) obj.mesh.position.z = 100;
            } else {
                obj.mesh.position.y -= obj.speed;
                if (obj.mesh.position.y < -50) obj.mesh.position.y = 50;
            }
        }
        if (obj.floatSpeed) {
            obj.mesh.position.y = obj.initialY + Math.sin(now * 0.001 * obj.floatSpeed * 50) * 2;
        }
    });
}

function animateShop() {
    if (document.getElementById('shop-overlay').style.display !== 'none') {
        requestAnimationFrame(animateShop);
        if (shopSnake) shopSnake.rotation.y += 0.02;
        if (currentSkinId === 'viper') {
            updateViperAnimations();
        }
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
     if (!isFreeCamera) {
         camera.position.set(0, 30, 0);
         camera.lookAt(0, 0, 0);
         controls.enableRotate = false; // Disable rotation for better bird's eye experience
     }
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

document.getElementById('reset-data-btn').onclick = () => {
    audioManager.playUiClick();
    Security.resetData();
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
    audioManager.masterGain.gain.setTargetAtTime(audioManager.isMuted ? 0 : 1.0, audioManager.ctx.currentTime, 0.1);
    Security.save('snake3d_muted', audioManager.isMuted);
    document.getElementById('mute-btn').innerText = audioManager.isMuted ? '🔇' : '🔊';
    audioManager.playUiClick();
};

document.getElementById('settings-btn').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('settings-overlay').style.display = 'flex';
    
    // Sync UI with current settings
    document.getElementById('music-volume-slider').value = audioManager.musicVolume;
    document.getElementById('sfx-volume-slider').value = audioManager.sfxVolume;
    document.getElementById('free-cam-checkbox').checked = isFreeCamera;
    
    // Sync keybinds UI
    document.querySelectorAll('.key-bind-btn').forEach(btn => {
        const action = btn.getAttribute('data-action');
        btn.innerText = keyBinds[action];
    });
};

// Key Rebinding Logic
let rebindingAction = null;
document.querySelectorAll('.key-bind-btn').forEach(btn => {
    btn.onclick = (e) => {
        audioManager.playUiClick();
        if (rebindingAction) return; // Already waiting
        
        rebindingAction = btn.getAttribute('data-action');
        btn.classList.add('waiting');
        btn.innerText = '...';
        
        const onBindKey = (event) => {
            event.preventDefault();
            const newKey = event.key;
            keyBinds[rebindingAction] = newKey;
            btn.innerText = newKey;
            btn.classList.remove('waiting');
            Security.save('snake3d_keybinds', JSON.stringify(keyBinds));
            rebindingAction = null;
            window.removeEventListener('keydown', onBindKey);
        };
        
        window.addEventListener('keydown', onBindKey);
    };
});

document.getElementById('close-settings-btn').onclick = () => {
    audioManager.playUiClick();
    document.getElementById('settings-overlay').style.display = 'none';
};

document.getElementById('music-volume-slider').oninput = (e) => {
    audioManager.setMusicVolume(parseFloat(e.target.value));
};

document.getElementById('sfx-volume-slider').oninput = (e) => {
    audioManager.setSfxVolume(parseFloat(e.target.value));
};

document.getElementById('free-cam-checkbox').onchange = (e) => {
    isFreeCamera = e.target.checked;
    Security.save('snake3d_free_cam', isFreeCamera);
    audioManager.playUiClick();
    
    if (isFreeCamera) {
        controls.enableRotate = true;
        if (isTouchDevice) {
            document.getElementById('camera-swipe-area').style.display = 'block';
            document.getElementById('touch-controls').style.display = 'none';
        }
    } else if (isTouchDevice) {
        controls.enableRotate = false;
        document.getElementById('camera-swipe-area').style.display = 'none';
        document.getElementById('touch-controls').style.display = 'flex';
    }
};

// Swipe Area Event Listeners for Mobile Free Camera
const swipeArea = document.getElementById('camera-swipe-area');
swipeArea.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchMoved = false;
}, { passive: true });

swipeArea.addEventListener('touchmove', (e) => {
    if (!isFreeCamera) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;
    
    // Convert swipe delta to camera velocity
    // Sensitivity factor
    const sensitivity = 0.005;
    swipeCameraVelocity.set(deltaX * sensitivity, deltaY * sensitivity);
    
    touchMoved = true;
    // We don't update touchStartX/Y here to keep it relative to start for continuous movement
}, { passive: true });

swipeArea.addEventListener('touchend', () => {
    swipeCameraVelocity.set(0, 0);
    touchMoved = false;
}, { passive: true });

document.getElementById('lang-select').onchange = (e) => {
    setLanguage(e.target.value);
    audioManager.playUiClick();
};

// Add hover sounds to all buttons
document.querySelectorAll('button').forEach(btn => {
    btn.onmouseenter = () => audioManager.playUiHover();
});

function onKeyDown(event) {
    if (!event.key) return;
    const key = event.key.toLowerCase();
    const originalKey = event.key; // For volume +/- which might be case-sensitive in some layouts
    keysPressed[key] = true;

    // Prevent game keys from triggering while typing in inputs (Account modal)
    if (event.target.tagName === 'INPUT') return;

    // Global shortcuts (available even if game not started)
    if (rebindingAction) return;

    // Helper to check keybinds
    const isBind = (action, k) => (keyBinds[action] && keyBinds[action].toLowerCase() === k.toLowerCase()) || keyBinds[action] === k;

    if (isBind('shop', originalKey) || isBind('shop', 'b')) { // Keep 'b' as a hardcoded fallback for shop
        if (isMainMenu) return; // Disable shop in main menu
        const shopOverlay = document.getElementById('shop-overlay');
        if (shopOverlay.style.display === 'flex') {
            document.getElementById('close-shop-btn').click();
        } else {
            document.getElementById('shop-btn').click();
        }
        return;
    }

    if (isBind('perf', originalKey)) {
        document.getElementById('perf-btn').click();
        return;
    }

    if (isBind('freeCam', originalKey)) {
        if (isMainMenu) return; // Disable freecam toggle in main menu
        isFreeCamera = !isFreeCamera;
        Security.save('snake3d_free_cam', isFreeCamera);
        audioManager.playUiClick();
        if (isFreeCamera) {
            controls.enableRotate = true;
            if (isTouchDevice) {
                document.getElementById('camera-swipe-area').style.display = 'block';
                document.getElementById('touch-controls').style.display = 'none';
            }
        } else if (isTouchDevice) {
            controls.enableRotate = false;
            document.getElementById('camera-swipe-area').style.display = 'none';
            document.getElementById('touch-controls').style.display = 'flex';
        }
        const cb = document.getElementById('free-cam-checkbox');
        if (cb) cb.checked = isFreeCamera;
        Notifications.show(isFreeCamera ? "FREE CAMERA: ON" : "FREE CAMERA: OFF", 'warning');
        return;
    }

    if (isBind('volUp', originalKey) || originalKey === '=') {
        audioManager.setMusicVolume(Math.min(1, audioManager.musicVolume + 0.1));
        audioManager.setSfxVolume(Math.min(1, audioManager.sfxVolume + 0.1));
        Notifications.show(`VOLUME: ${Math.round(audioManager.musicVolume * 100)}%`, 'warning');
        return;
    }

    if (isBind('volDown', originalKey) || originalKey === '_') {
        audioManager.setMusicVolume(Math.max(0, audioManager.musicVolume - 0.1));
        audioManager.setSfxVolume(Math.max(0, audioManager.sfxVolume - 0.1));
        Notifications.show(`VOLUME: ${Math.round(audioManager.musicVolume * 100)}%`, 'warning');
        return;
    }

    if (!gameStarted || isMainMenu) return;
    
    if (isBind('pause', originalKey) || originalKey === ' ') { // Keep space as a hardcoded fallback for pause
        togglePause();
        return;
    }
    
    if (isPaused) return;
    
    // Movement Binds
    if (originalKey === keyBinds.up || originalKey === 'ArrowUp') { if (direction.z === 0) nextDirection.set(0, 0, -1); }
    else if (originalKey === keyBinds.down || originalKey === 'ArrowDown') { if (direction.z === 0) nextDirection.set(0, 0, 1); }
    else if (originalKey === keyBinds.left || originalKey === 'ArrowLeft') { if (direction.x === 0) nextDirection.set(-1, 0, 0); }
    else if (originalKey === keyBinds.right || originalKey === 'ArrowRight') { if (direction.x === 0) nextDirection.set(1, 0, 0); }
}

function onKeyUp(event) {
    if (!event.key) return;
    keysPressed[event.key.toLowerCase()] = false;
}

let isMainMenu = true;
let menuSnake = null;
let menuDecorativeGroup = null;

// Main Menu Manager
const MenuManager = {
    init() {
        this.setupEventListeners();
        this.createMenuScene();
        this.showMenu();
        
        // Ensure game engine overlays are hidden
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('shop-overlay').style.display = 'none';
        document.getElementById('settings-overlay').style.display = 'none';
        document.getElementById('info').style.visibility = 'hidden';
    },

    setupEventListeners() {
        // Prevent form submission
        const accountForm = document.getElementById('account-form');
        if (accountForm) {
            accountForm.onsubmit = (e) => e.preventDefault();
        }

        document.getElementById('main-singleplayer-btn').onclick = () => this.startSinglePlayer();
        document.getElementById('main-settings-btn').onclick = () => this.toggleModal('main-settings-modal', true);
        document.getElementById('main-account-btn').onclick = () => this.toggleModal('main-account-modal', true);
        document.getElementById('main-exit-btn').onclick = () => {
            if (confirm("Are you sure you want to exit?")) {
                window.close();
                // Fallback for browsers that prevent window.close()
                setTimeout(() => { window.location.href = "about:blank"; }, 100);
            }
        };
        
        document.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.onclick = (e) => this.toggleModal(e.target.closest('.modal-3d').id, false);
        });

        // Settings logic
        document.getElementById('fullscreen-toggle').onclick = (e) => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                e.target.innerText = 'ON';
                e.target.classList.add('on');
            } else {
                document.exitFullscreen();
                e.target.innerText = 'OFF';
                e.target.classList.remove('on');
            }
        };

        const musicSlider = document.getElementById('main-music-slider');
        const sfxSlider = document.getElementById('main-sfx-slider');
        
        musicSlider.value = audioManager.musicVolume;
        sfxSlider.value = audioManager.sfxVolume;

        musicSlider.oninput = (e) => audioManager.setMusicVolume(parseFloat(e.target.value));
        sfxSlider.oninput = (e) => audioManager.setSfxVolume(parseFloat(e.target.value));
    },

    createMenuScene() {
        if (menuDecorativeGroup) {
            menuDecorativeGroup.traverse(child => {
                if (child.userData.mixer) {
                    viperMixers.delete(child.userData.mixer);
                }
            });
            scene.remove(menuDecorativeGroup);
        }
        menuDecorativeGroup = new THREE.Group();
        
        // Create a cool snake for the menu
        const snakeGroup = new THREE.Group();
        const colors = [0x00ffff, 0x00cccc, 0x00aaaa, 0x008888, 0x006666];
        for (let i = 0; i < 25; i++) {
            let type = 'body';
            if (i === 0) type = 'head';
            else if (i === 24) type = 'tail';
            
            const mesh = createSnakeMesh(type, currentSkinId, new THREE.Vector3(0, 0, 1));
            mesh.position.set(0, 0, -i * 1.5);
            snakeGroup.add(mesh);
        }
        menuSnake = snakeGroup;
        menuDecorativeGroup.add(menuSnake);
        
        // Floating "Data Cubes" for a more digital vibe
        for (let i = 0; i < 30; i++) {
            const size = Math.random() * 0.5 + 0.2;
            const cubeGeom = new THREE.BoxGeometry(size, size, size);
            const cubeMat = new THREE.MeshPhongMaterial({ 
                color: 0x00ff00, 
                emissive: 0x00ff00,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.4
            });
            const cube = new THREE.Mesh(cubeGeom, cubeMat);
            cube.position.set(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 60
            );
            cube.userData = { 
                rotSpeed: Math.random() * 0.02,
                floatSpeed: Math.random() * 0.01
            };
            menuDecorativeGroup.add(cube);
        }

        // Animated "Grid Floor" for the menu
        const menuGrid = new THREE.GridHelper(200, 40, 0x00ff00, 0x002200);
        menuGrid.position.y = -20;
        menuDecorativeGroup.add(menuGrid);

        scene.add(menuDecorativeGroup);
        
        // Distant Cinematic Camera position
        camera.position.set(-60, 30, 80);
        camera.lookAt(0, 0, 0);
        controls.enabled = false;
        
        // Setup current background for menu
        updateBackground();
    },

    showMenu() {
        document.getElementById('main-menu-overlay').style.display = 'flex';
        isMainMenu = true;
        // Ensure visibility
        document.getElementById('overlay').style.display = 'none';
    },

    toggleModal(id, show) {
        audioManager.playUiClick();
        document.getElementById(id).style.display = show ? 'flex' : 'none';
    },

    async startSinglePlayer() {
        audioManager.playUiClick();
        document.getElementById('main-menu-overlay').style.display = 'none';
        
        // Cinematic Transition
        const duration = 2500;
        const startPos = camera.position.clone();
        const endPos = new THREE.Vector3(0, 10, 20);
        const startTime = Date.now();

        const animateTransition = () => {
            const now = Date.now();
            const p = Math.min(1, (now - startTime) / duration);
            const easeP = p * p * (3 - 2 * p); // Smoothstep

            camera.position.lerpVectors(startPos, endPos, easeP);
            camera.lookAt(0, 0, 0);

            if (p < 1) {
                requestAnimationFrame(animateTransition);
            } else {
                this.finishTransition();
            }
        };

        animateTransition();
    },

    finishTransition() {
        isMainMenu = false;
        scene.remove(menuDecorativeGroup);
        controls.enabled = true;
        document.getElementById('overlay').style.display = 'flex';
        document.getElementById('info').style.visibility = 'visible';
        audioManager.init();
        audioManager.updateMusicTheme(currentBgId);
    }
};

const SPEED_THRESHOLD = 150;
const clock = new THREE.Clock();

function updateViperAnimations() {
    const delta = clock.getDelta();
    
    // Update all active mixers
    viperMixers.forEach(mixer => {
        mixer.update(delta);
        const model = mixer.getRoot();
        
        let targetAnim = 'SnakeBones|SnakeMove1';
        
        if (isPaused) {
            targetAnim = 'SnakeBones|SnakeSearch.001';
        } else if (moveInterval <= SPEED_THRESHOLD) {
            targetAnim = 'SnakeBones|SnakeMove2';
        }
        
        const currentAction = model.userData.currentAction;
        if (currentAction && currentAction.getClip().name !== targetAnim) {
            const nextClip = THREE.AnimationClip.findByName(viperAnimations, targetAnim);
            if (nextClip) {
                const nextAction = mixer.clipAction(nextClip);
                nextAction.reset();
                nextAction.setEffectiveTimeScale(1);
                nextAction.setEffectiveWeight(1);
                
                // Crossfade for smoothness
                currentAction.crossFadeTo(nextAction, 0.5, true);
                nextAction.play();
                model.userData.currentAction = nextAction;
            }
        }
    });
}

function animate() {
     requestAnimationFrame(animate);
     
     // Update animations for Viper Realistic skin
     if (currentSkinId === 'viper') {
         updateViperAnimations();
     }
     
     if (isMainMenu) {
         // Menu animations
         if (menuSnake) {
             menuSnake.rotation.y += 0.003;
             menuSnake.rotation.z += 0.001;
             menuSnake.position.y = Math.sin(Date.now() * 0.001) * 3;
         }
         if (menuDecorativeGroup) {
             menuDecorativeGroup.children.forEach((child, idx) => {
                 if (child.geometry && child.geometry.type === 'BoxGeometry' && child !== menuSnake) {
                     // Animate floating data cubes
                     if (child.userData.rotSpeed) {
                         child.rotation.x += child.userData.rotSpeed;
                         child.rotation.y += child.userData.rotSpeed;
                     }
                     child.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.05;
                 }
                 if (child.geometry && child.geometry.type === 'TorusGeometry') {
                     child.rotation.z += 0.002 * (idx + 1);
                     child.rotation.y += 0.001 * (idx + 1);
                 }
             });
         }
         animateDecorativeObjects(decorativeObjects);
         renderer.render(scene, camera);
         return;
     }

     update();
     updateParticles();
     animateDecorativeObjects(decorativeObjects);
     
     if (isFreeCamera) {
         // WASD movement for free camera
         const moveSpeed = 0.5;
         const forward = new THREE.Vector3();
         camera.getWorldDirection(forward);
         forward.y = 0; // Keep movement on ground plane
         forward.normalize();
         
         const right = new THREE.Vector3();
         right.crossVectors(forward, camera.up).normalize();

         if (keysPressed['w']) camera.position.addScaledVector(forward, moveSpeed);
         if (keysPressed['s']) camera.position.addScaledVector(forward, -moveSpeed);
         if (keysPressed['a']) camera.position.addScaledVector(right, -moveSpeed);
         if (keysPressed['d']) camera.position.addScaledVector(right, moveSpeed);
         if (keysPressed['q']) camera.position.y += moveSpeed;
         if (keysPressed['e']) camera.position.y -= moveSpeed;
         
         // In free camera mode, we still want to look at something if needed, 
         // but usually OrbitControls handles the "lookAt" via its target.
         // If we move the camera manually, OrbitControls target stays behind.
         // Let's update the target to move with the camera to keep it intuitive.
         controls.target.addScaledVector(forward, (keysPressed['w'] ? moveSpeed : 0) + (keysPressed['s'] ? -moveSpeed : 0));
         controls.target.addScaledVector(right, (keysPressed['a'] ? -moveSpeed : 0) + (keysPressed['d'] ? moveSpeed : 0));
         controls.target.y += (keysPressed['q'] ? moveSpeed : 0) + (keysPressed['e'] ? -moveSpeed : 0);

         // Apply swipe movement for mobile free camera
         if (isTouchDevice && touchMoved) {
             camera.position.addScaledVector(forward, -swipeCameraVelocity.y * 10);
             camera.position.addScaledVector(right, swipeCameraVelocity.x * 10);
             controls.target.addScaledVector(forward, -swipeCameraVelocity.y * 10);
             controls.target.addScaledVector(right, swipeCameraVelocity.x * 10);
         }
     } else if (snake.length > 0) {
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

     // Animate snake tongue if realistic
     if (snake.length > 0 && snake[0].mesh.userData.tongue) {
         const tongue = snake[0].mesh.userData.tongue;
         tongue.scale.z = 1 + Math.sin(Date.now() * 0.02) * 0.5;
         tongue.position.z = 0.5 + (tongue.scale.z - 1) * 0.2;
     }

     // Animate coin
    if (coin) {
        coin.mesh.rotation.y += 0.05;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

let resizeTimeout;
window.addEventListener('resize', () => {
    // Basic debounce for mobile rotation
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Update main game renderer
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Update shop renderer if it exists and is visible
        const shopOverlay = document.getElementById('shop-overlay');
        if (shopRenderer && shopOverlay && shopOverlay.style.display !== 'none') {
            const container = document.getElementById('skin-preview-container');
            if (container) {
                shopCamera.aspect = container.clientWidth / container.clientHeight;
                shopCamera.updateProjectionMatrix();
                shopRenderer.setSize(container.clientWidth, container.clientHeight);
            }
        }
        
        // Mobile-specific camera adjustments on rotation
        if (isTouchDevice && !isFreeCamera) {
            // Re-center camera for bird's eye view
            camera.position.set(0, 30, 0);
            camera.lookAt(0, 0, 0);
        }
    }, 100);
});

animate();

// Global Error Handling
window.onerror = function(message, source, lineno, colno, error) {
    Notifications.show(`SYSTEM GLITCH: ${message.split(':')[1] || message}`, 'error');
    return false;
};

// Consent Management
const Consent = {
    VERSION: '1.2.0', // Updated version for Arbitration & Legal Agreement
    check() {
        const consented = Security.load('snake3d_consented', false);
        const consentVersion = Security.load('snake3d_consent_version', '1.0.0');
        
        if (!consented || consentVersion !== this.VERSION) {
            document.getElementById('consent-overlay').style.display = 'flex';
            
            // Add listener for legal checkbox to enable button
            const legalCheckbox = document.getElementById('legal-consent-checkbox');
            const acceptBtn = document.getElementById('accept-consent-btn');
            if (legalCheckbox && acceptBtn) {
                legalCheckbox.onchange = (e) => {
                    acceptBtn.disabled = !e.target.checked;
                };
            }
            return false;
        }
        return true;
    },
    accept() {
        const geoCheckbox = document.getElementById('geo-consent-checkbox');
        const legalCheckbox = document.getElementById('legal-consent-checkbox');
        
        // Final validation
        if (!legalCheckbox || !legalCheckbox.checked) {
            alert("You must agree to the Terms of Service to play.");
            return;
        }

        const geoConsented = geoCheckbox ? geoCheckbox.checked : false;
        
        Security.save('snake3d_consented', true);
        Security.save('snake3d_geo_consented', geoConsented);
        Security.save('snake3d_consent_version', this.VERSION);
        
        document.getElementById('consent-overlay').style.display = 'none';
        
        // Unlock menu buttons
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.title = "";
        }
        const shopBtn = document.getElementById('shop-btn');
        if (shopBtn) {
            shopBtn.disabled = false;
            shopBtn.title = "";
        }
        
        // Clear cached language for fresh detection
        Security.save('snake3d_lang_cache', null);
        detectLanguage();
        ModManager.loadMods();
    }
};

document.getElementById('accept-consent-btn').onclick = () => {
    audioManager.playUiClick();
    Consent.accept();
};

// Initialize
async function startApp() {
    if (Consent.check()) {
        detectLanguage();
        ModManager.loadMods();
        
        // Wait for viper model if it's the current skin
        if (currentSkinId === 'viper' && !viperModel) {
            await loadViperModel();
        }
        
        MenuManager.init();
    } else {
        // Lock start button if consent is not verified
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.title = "Please accept Terms of Service first";
        }
        const shopBtn = document.getElementById('shop-btn');
        if (shopBtn) {
            shopBtn.disabled = true;
            shopBtn.title = "Please accept Terms of Service first";
        }
        
        // Also prevent menu initialization until consent
        const acceptBtn = document.getElementById('accept-consent-btn');
        const originalAccept = acceptBtn.onclick;
        acceptBtn.onclick = async () => {
            originalAccept();
            
            // Re-check skin after consent (in case it changed during detection)
            if (currentSkinId === 'viper' && !viperModel) {
                await loadViperModel();
            }
             MenuManager.init();
         };
     }
     
     // Start loading Viper model in background if not already started
     loadViperModel();
 }
 
 startApp();
