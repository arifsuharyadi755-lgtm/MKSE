import { Product, RepairIssue } from "./types";

export const BRANDS = [
  "ASUS / ROG",
  "Lenovo / Legion",
  "Acer / Predator",
  "HP / Omen",
  "Apple MacBook",
  "Dell / Alienware",
  "MSI",
  "Gigabyte",
  "Custom PC / Rakitan"
];

export const PRODUCTS: Product[] = [
  // LAPTOPS
  {
    id: "lap-1",
    name: "ASUS VivoBook Go 14",
    category: "laptop",
    price: 6499000,
    description: "Laptop ringan, tipis, dan kencang untuk mahasiswa dan kebutuhan kerja harian office. Dibekali prosesor AMD Ryzen generasi terbaru dan baterai tahan lama.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Layar 14\" FHD IPS", "AMD Ryzen 3 7320U", "RAM 8GB LPDDR5", "SSD 512GB NVMe PCIe", "Windows 11 Home + OHS"],
    rating: 4.7,
    stock: 8,
    brand: "ASUS / ROG"
  },
  {
    id: "lap-2",
    name: "Lenovo IdeaPad Slim 3",
    category: "laptop",
    price: 7899000,
    description: "Performa seimbang dengan AMD Ryzen 5. Layar luas dengan bezel tipis, sangat cocok untuk multitasking, pengerjaan tugas akhir, dan hiburan multimedia.",
    image: "https://images.unsplash.com/photo-1496181130204-7552cc1524e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Layar 14\" FHD IPS", "AMD Ryzen 5 7520U", "RAM 16GB LPDDR5", "SSD 512GB NVMe", "Windows 11 + OHS"],
    rating: 4.8,
    stock: 5,
    brand: "Lenovo / Legion"
  },
  {
    id: "lap-3",
    name: "MacBook Air M2 (2023)",
    category: "laptop",
    price: 16499000,
    description: "Laptop premium ultra-tipis dengan chip Apple M2 yang revolusioner. Layar Liquid Retina yang menakjubkan dan ketahanan baterai hingga 18 jam.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Layar Liquid Retina 13.6\"", "Chip Apple M2 (8-Core CPU/GPU)", "RAM 8GB Unified Memory", "SSD 256GB Superfast", "macOS Sonoma"],
    rating: 4.9,
    stock: 4,
    brand: "Apple MacBook"
  },
  {
    id: "lap-4",
    name: "ASUS ROG Zephyrus G14",
    category: "laptop",
    price: 24999000,
    description: "Laptop gaming monster dengan desain ringkas 14 inci. Dilengkapi dengan prosesor AMD Ryzen 9 dan kartu grafis NVIDIA RTX 4060 untuk melibas game AAA berat.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Layar 14\" ROG Nebula OLED QHD 120Hz", "AMD Ryzen 9 8945HS", "RAM 16GB DDR5 Dual Channel", "SSD 1TB NVMe Gen4", "NVIDIA GeForce RTX 4060 8GB"],
    rating: 4.9,
    stock: 3,
    brand: "ASUS / ROG"
  },

  // GAMING PCS (RAKIT PC READY)
  {
    id: "pc-1",
    name: "Rakit PC Gaming Entry 'Bronze Vibe'",
    category: "gaming-pc",
    price: 5450000,
    description: "PC gaming rakitan ramah kantong untuk memainkan game kompetitif seperti Valorant, Dota 2, CS2, dan GTA V dengan lancar di resolusi 1080p.",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["AMD Ryzen 5 5600G (Radeon Vega 7)", "Motherboard AMD A520M", "RAM 16GB DDR4 3200MHz", "SSD 512GB NVMe", "PSU 500W 80+ Bronze", "Casing Paradox Gaming Knight + 3 Fan RGB"],
    rating: 4.6,
    stock: 12,
    brand: "Custom PC / Rakitan"
  },
  {
    id: "pc-2",
    name: "Rakit PC Gaming Mid-Tier 'Silver Striker'",
    category: "gaming-pc",
    price: 11250000,
    description: "Kombo paling seimbang antara Intel Core i5 generasi ke-12 dan NVIDIA RTX 3060. Siap melibas game modern resolusi High 1080p dan editing video 4K ringan.",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Intel Core i5-12400F", "Motherboard Intel B760M", "RAM 16GB (2x8) DDR4 3200MHz", "GPU NVIDIA RTX 3060 12GB GDDR6", "SSD 512GB NVMe Gen4", "PSU 600W 80+ Bronze", "Casing Black Widow Tempered Glass + 4 Fan ARGB"],
    rating: 4.8,
    stock: 6,
    brand: "Custom PC / Rakitan"
  },
  {
    id: "pc-3",
    name: "Rakit PC Gaming High-End 'MKS Extreme Beast'",
    category: "gaming-pc",
    price: 24750000,
    description: "Performa maksimal tanpa kompromi. Memadukan kehebatan gaming AMD Ryzen 7 7800X3D (prosesor gaming terbaik dunia saat ini) dan NVIDIA RTX 4070 Super.",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["AMD Ryzen 7 7800X3D", "Water Cooler Liquid 360mm ARGB", "Motherboard MSI B650 Gaming WiFi", "RAM 32GB (2x16) DDR5 6000MHz", "GPU NVIDIA RTX 4070 Super 12GB GDDR6X", "SSD 1TB NVMe Gen4 High Speed", "PSU 750W 80+ Gold Fully Modular", "Casing Premium Panoramic Dual Chamber Red/Black Theme"],
    rating: 5.0,
    stock: 2,
    brand: "Custom PC / Rakitan"
  },

  // PC PARTS (FOR PC BUILDER)
  // CPU
  {
    id: "cpu-1",
    name: "Intel Core i5-12400F",
    category: "component",
    componentType: "cpu",
    price: 1850000,
    description: "Prosesor 6 Core / 12 Thread terbaik di kelas budget, performa gaming luar biasa.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["6 Cores / 12 Threads", "Base 2.5GHz / Boost 4.4GHz", "Socket LGA1700", "L3 Cache 18MB", "No Integrated Graphics"],
    rating: 4.8,
    stock: 20,
    brand: "Intel"
  },
  {
    id: "cpu-2",
    name: "AMD Ryzen 5 5600",
    category: "component",
    componentType: "cpu",
    price: 1750000,
    description: "Pilihan utama AMD gaming hemat energi dengan performa luar biasa di socket AM4.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["6 Cores / 12 Threads", "Base 3.5GHz / Boost 4.4GHz", "Socket AM4", "Total L3 Cache 32MB", "Include Wraith Stealth Cooler"],
    rating: 4.8,
    stock: 15,
    brand: "AMD"
  },
  {
    id: "cpu-3",
    name: "AMD Ryzen 7 7800X3D",
    category: "component",
    componentType: "cpu",
    price: 6450000,
    description: "Prosesor gaming tercepat di dunia berkat teknologi 3D V-Cache revolusioner.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["8 Cores / 16 Threads", "Base 4.2GHz / Boost 5.0GHz", "Socket AM5", "Total L3 Cache 96MB", "3D V-Cache Technology"],
    rating: 5.0,
    stock: 5,
    brand: "AMD"
  },

  // GPU
  {
    id: "gpu-1",
    name: "NVIDIA GTX 1650 4GB",
    category: "component",
    componentType: "gpu",
    price: 1950000,
    description: "Kartu grafis entry-level andalan hemat daya, tanpa butuh power pin tambahan.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["VRAM 4GB GDDR6", "Memory Bus 128-bit", "No External Power Connector Required", "Output: DP, HDMI, DVI"],
    rating: 4.5,
    stock: 14,
    brand: "NVIDIA"
  },
  {
    id: "gpu-2",
    name: "NVIDIA GeForce RTX 4060 8GB",
    category: "component",
    componentType: "gpu",
    price: 4950000,
    description: "Kartu grafis generasi terbaru dengan DLSS 3 Frame Generation dan Ray Tracing luar biasa.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["VRAM 8GB GDDR6", "NVIDIA DLSS 3 & Ray Tracing", "Power Consumption ~115W", "DP 1.4a & HDMI 2.1a"],
    rating: 4.8,
    stock: 9,
    brand: "NVIDIA"
  },
  {
    id: "gpu-3",
    name: "NVIDIA GeForce RTX 4070 Super 12GB",
    category: "component",
    componentType: "gpu",
    price: 11250000,
    description: "Kartu grafis gaming high-end untuk bermain game resolusi 1440p mentok kanan dengan lancar.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["VRAM 12GB GDDR6X", "Memory Bus 192-bit", "DLSS 3.0 & Ada Lovelace Architecture", "Recommended PSU 650W+"],
    rating: 4.9,
    stock: 4,
    brand: "NVIDIA"
  },

  // MOTHERBOARD
  {
    id: "mobo-1",
    name: "ASRock A520M-HDV (AM4)",
    category: "component",
    componentType: "motherboard",
    price: 850000,
    description: "Motherboard micro-ATX andalan budget ramah kantong untuk AMD Ryzen AM4.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Socket AM4", "DDR4 up to 4600MHz", "1x Ultra M.2 Slot", "4x SATA3 Ports", "Micro ATX Form Factor"],
    rating: 4.5,
    stock: 12,
    brand: "ASRock"
  },
  {
    id: "mobo-2",
    name: "MSI PRO B760M-A WiFi (LGA1700)",
    category: "component",
    componentType: "motherboard",
    price: 2250000,
    description: "Motherboard Intel berfitur lengkap dengan Wi-Fi onboard, ideal untuk prosesor Intel i5/i7.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Socket LGA1700", "Supports Intel 12th, 13th, & 14th Gen", "WiFi 6E & Bluetooth 5.3 Onboard", "DDR5 Dual Channel", "Lightning PCIe Gen 4x4 M.2"],
    rating: 4.8,
    stock: 8,
    brand: "MSI"
  },

  // RAM
  {
    id: "ram-1",
    name: "Kingston FURY Beast 16GB (2x8GB) DDR4 3200MHz",
    category: "component",
    componentType: "ram",
    price: 650000,
    description: "Memori RAM DDR4 dual channel andalan gaming yang super stabil dengan heat spreader hitam keren.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Kapasitas 16GB (Kit 2x8GB)", "Frekuensi 3200MHz DDR4", "Latency CL16", "Low Profile Heat Spreader", "Intel XMP 2.0 Ready"],
    rating: 4.8,
    stock: 30,
    brand: "Kingston"
  },
  {
    id: "ram-2",
    name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
    category: "component",
    componentType: "ram",
    price: 1750000,
    description: "RAM DDR5 ultra cepat generasi terbaru dengan pencahayaan RGB megah dan dukungan AMD Expo.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Kapasitas 32GB (Kit 2x16GB)", "Frekuensi 6000MHz DDR5", "AMD EXPO & Intel XMP 3.0", "Dynamic Multi-Zone RGB Lighting", "High Performance Heatspreader"],
    rating: 4.9,
    stock: 12,
    brand: "Corsair"
  },

  // STORAGE
  {
    id: "stor-1",
    name: "Adata Legend 710 512GB PCIe NVMe M.2",
    category: "component",
    componentType: "storage",
    price: 520000,
    description: "SSD M.2 NVMe super kencang, 3x lebih cepat dibandingkan SSD SATA tradisional.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Kapasitas 512GB", "Interface PCIe Gen3 x4", "Read up to 2,400 MB/s", "Write up to 1,800 MB/s", "Termasuk Heatsink Tipis"],
    rating: 4.7,
    stock: 25,
    brand: "Adata"
  },
  {
    id: "stor-2",
    name: "Samsung 980 Pro 1TB PCIe NVMe Gen4",
    category: "component",
    componentType: "storage",
    price: 1450000,
    description: "SSD Gen4 terbaik di dunia dengan performa luar biasa, sangat cocok untuk OS dan loading game instan.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Kapasitas 1TB", "Interface PCIe Gen4 x4 NVMe 1.3", "Read up to 7,000 MB/s", "Write up to 5,000 MB/s", "Sangat Direkomendasikan untuk PS5 & PC High-End"],
    rating: 5.0,
    stock: 15,
    brand: "Samsung"
  },

  // POWER SUPPLY (PSU)
  {
    id: "psu-1",
    name: "DeepCool DE600 v2 600W",
    category: "component",
    componentType: "psu",
    price: 480000,
    description: "PSU handal dengan harga sangat terjangkau untuk spesifikasi PC kantoran dan gaming ringan.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Daya Maksimal 600W", "Efisiensi s/d 80%", "Kipas Hening 120mm", "Proteksi OPP, OVP, SCP"],
    rating: 4.5,
    stock: 18,
    brand: "DeepCool"
  },
  {
    id: "psu-2",
    name: "Corsair CX650 650W 80+ Bronze",
    category: "component",
    componentType: "psu",
    price: 950000,
    description: "PSU bersertifikat 80 Plus Bronze jaminan daya stabil untuk komponen PC modern Anda.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Kapasitas Daya 650 Watt", "Sertifikasi 80 PLUS Bronze", "Kipas Heening Termal 120mm", "Garansi Resmi 5 Tahun"],
    rating: 4.8,
    stock: 10,
    brand: "Corsair"
  },

  // CASE
  {
    id: "case-1",
    name: "Paradox Gaming Knight M-ATX Black",
    category: "component",
    componentType: "case",
    price: 395000,
    description: "Casing ringkas berpintu Tempered Glass premium, sirkulasi udara optimal.",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Form Factor Micro-ATX / ITX", "Side Panel Tempered Glass", "Termasuk 3 Fan RGB Statis", "Magnetic Dust Filter"],
    rating: 4.6,
    stock: 15,
    brand: "Paradox"
  },
  {
    id: "case-2",
    name: "Invasion Panoramic Dual Chamber Red/Black Edition",
    category: "component",
    componentType: "case",
    price: 850000,
    description: "Casing panoramic kaca dua sisi bertema Hitam-Merah elegan untuk memamerkan jeroan PC gaming Anda.",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Panoramic Tempered Glass (No Front Pillar)", "Dual Chamber Layout (Manajemen Kabel Super Rapi)", "Mendukung Liquid Cooler s/d 360mm", "Black-Red Cyberpunk Color Aesthetic"],
    rating: 4.9,
    stock: 6,
    brand: "Invasion"
  },

  // COOLER
  {
    id: "cooler-1",
    name: "DeepCool AG400 LED Air Cooler",
    category: "component",
    componentType: "cooler",
    price: 295000,
    description: "Pendingin udara prosesor berkinerja tinggi dengan kipas LED, mendinginkan CPU secara efisien.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Single Tower Air Cooler", "4 Heatpipes Tembaga Direct Touch", "Kipas 120mm PWM LED", "Mendukung LGA1700 & AM4/AM5"],
    rating: 4.7,
    stock: 20,
    brand: "DeepCool"
  },
  {
    id: "cooler-2",
    name: "Thermalright Frozen Prism 360 ARGB Liquid Cooler",
    category: "component",
    componentType: "cooler",
    price: 1150000,
    description: "Water cooling AIO 360mm premium untuk performa pendinginan ekstrem dan estetik RGB mengagumkan.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Liquid Cooler AIO 360mm", "3x Kipas TL-E12-S ARGB", "Pompa Air Kebisingan Rendah", "Mendukung Overclocking CPU High-End"],
    rating: 4.9,
    stock: 8,
    brand: "Thermalright"
  },

  // ACCESSORIES
  {
    id: "acc-1",
    name: "Gaming Mouse MKS RGB",
    category: "accessories",
    price: 249000,
    description: "Mouse gaming ergonomis dengan pencahayaan RGB merah membara, tombol makro yang dapat diprogram, dan DPI tinggi.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Sinyal s/d 12.800 DPI", "6 Tombol Macro yang Dapat Diprogram", "Lampu Latar Merah & RGB Berputar", "Kabel Braided Kuat 1.8m"],
    rating: 4.6,
    stock: 45,
    brand: "Custom PC / Rakitan"
  },
  {
    id: "acc-2",
    name: "Keyboard Mekanikal MKS Outemu Blue",
    category: "accessories",
    price: 429000,
    description: "Keyboard mekanikal Tenkeyless (TKL) super responsif bertema hitam-merah dengan taktil clicky mantap dari switch Outemu Blue.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Layout TKL (87 Tombol)", "Outemu Blue Mechanical Switch (Clicky)", "Keycaps Double Injection Merah/Hitam", "Efek Lampu LED Kustom"],
    rating: 4.8,
    stock: 25,
    brand: "Custom PC / Rakitan"
  },
  {
    id: "acc-3",
    name: "Monitor Gaming MSI Optix G24 144Hz",
    category: "accessories",
    price: 1899000,
    description: "Monitor gaming lengkung (curved) super responsif dengan refresh rate tinggi untuk visual game yang sangat mulus.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Ukuran Layar 23.6\" FHD Lengkung", "Refresh Rate 144Hz & Response Time 1ms", "Panel VA Kontras Tinggi", "AMD FreeSync Premium", "HDMI & DisplayPort"],
    rating: 4.8,
    stock: 8,
    brand: "MSI"
  }
];

export const REPAIR_ISSUES: RepairIssue[] = [
  {
    id: "rep-1",
    name: "Ganti Layar Pecah/Bermasalah (LCD Screen)",
    description: "Perbaikan atau penggantian panel layar laptop yang retak, bergaris, berkedip, mati sebagian, atau tidak memunculkan gambar sama sekali.",
    basePriceMin: 850000,
    basePriceMax: 1800000,
    estimatedDuration: "1 - 3 Jam (Tergantung Stok LCD)",
    symptoms: ["Layar retak fisik", "Muncul garis horizontal/vertikal", "Layar blank hitam tapi mesin menyala", "Warna pudar atau flicker berlebih"],
  },
  {
    id: "rep-2",
    name: "Ganti Baterai Drop/Kembung",
    description: "Penggantian baterai laptop yang bocor, kembung (bisa merusak casing/trackpad), atau tidak dapat mengisi daya sama sekali.",
    basePriceMin: 450000,
    basePriceMax: 950000,
    estimatedDuration: "30 - 60 Menit",
    symptoms: ["Baterai hanya tahan kurang dari 30 menit", "Indikator baterai silang (X) atau 'Consider Replacing Battery'", "Casing bawah laptop terlihat melengkung karena baterai kembung", "Laptop langsung mati saat kabel charger dilepas"],
  },
  {
    id: "rep-3",
    name: "Ganti Keyboard Error / Macet",
    description: "Penggantian modul keyboard laptop akibat tuts yang memencet sendiri, macet, atau mati total akibat penggunaan lama atau terkena air.",
    basePriceMin: 250000,
    basePriceMax: 550000,
    estimatedDuration: "1 - 2 Jam",
    symptoms: ["Beberapa tombol tidak merespon saat ditekan", "Tombol tertekan terus menerus secara otomatis (ghosting)", "Keyboard tidak terdeteksi sama sekali oleh sistem", "Tombol lepas atau rusak fisik"],
  },
  {
    id: "rep-4",
    name: "Diagnosis & Servis Mati Total (Mainboard Short)",
    description: "Pemeriksaan mendalam dan perbaikan sirkuit listrik di motherboard (mainboard) yang mengalami konsleting (short), IC rusak, atau bios corrupt.",
    basePriceMin: 600000,
    basePriceMax: 1500000,
    estimatedDuration: "2 - 5 Hari Kerja",
    symptoms: ["Laptop sama sekali tidak merespon tombol power", "Lampu indikator charger tidak menyala saat dicolok", "Laptop mati tiba-tiba setelah tercium bau hangus", "Kipas berputar sekejap lalu mati berulang kali (looping)"],
  },
  {
    id: "rep-5",
    name: "Upgrade SSD Superfast & Reinstall OS",
    description: "Mengganti Harddisk lama (HDD) yang lambat dengan SSD berkecepatan tinggi, termasuk pembersihan file sampah, backup data, dan instalasi sistem operasi bersih.",
    basePriceMin: 350000,
    basePriceMax: 850000,
    estimatedDuration: "2 - 3 Jam",
    symptoms: ["Laptop booting memakan waktu lebih dari 3 menit", "Sering muncul disk usage 100% di task manager", "Sistem operasi lemot dan sering hang saat membuka aplikasi harian", "Muncul error 'No Bootable Device'"],
  },
  {
    id: "rep-6",
    name: "Bersihkan Debu, Ganti Thermal Paste & Overheat Service",
    description: "Perawatan fisik wajib laptop secara berkala untuk membersihkan debu kipas, heatsink, dan mengganti pasta pendingin prosesor agar suhu tetap dingin.",
    basePriceMin: 150000,
    basePriceMax: 300000,
    estimatedDuration: "1 Jam",
    symptoms: ["Bodi laptop terasa sangat panas di tangan", "Suara kipas terdengar sangat bising atau berdengung keras", "Laptop sering mati mendadak sendiri saat bermain game atau rendering", "Kinerja laptop drop tiba-tiba (thermal throttling)"],
  },
  {
    id: "rep-7",
    name: "Soket Charger Longgar / Rusak (DC Jack)",
    description: "Perbaikan solder atau penggantian lubang colokan charger di laptop yang rusak sehingga tidak stabil saat menyalurkan daya.",
    basePriceMin: 200000,
    basePriceMax: 450000,
    estimatedDuration: "2 - 4 Jam",
    symptoms: ["Laptop hanya mencharge saat kabel dicolok di sudut tertentu", "Soket terasa sangat goyang atau longgar saat dipasangkan", "Soket terasa panas berlebih saat proses charging berlangsung"],
  }
];
