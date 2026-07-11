import React, { useState } from "react";
import { 
  Cpu, 
  Thermometer, 
  Battery, 
  Wind, 
  ShieldAlert, 
  Wrench, 
  Sparkles, 
  Trash2, 
  Monitor, 
  AlertTriangle, 
  Info, 
  X, 
  Check, 
  Zap, 
  Gauge,
  HelpCircle,
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Tip {
  id: string;
  category: "thermal" | "battery" | "system" | "physical";
  title: string;
  shortDesc: string;
  symptom: string;
  diyGuide: string[];
  mksAdvice: string;
  difficulty: "Mudah" | "Sedang" | "Butuh Teknisi";
  frequency: string;
  icon: React.ElementType;
}

const MAINTENANCE_TIPS: Tip[] = [
  {
    id: "thermal-paste",
    category: "thermal",
    title: "Ganti Thermal Paste Berkala",
    shortDesc: "Thermal paste mengering seiring waktu, menyebabkan laptop overheat mendadak dan penurunan performa (thermal throttling).",
    symptom: "Suhu idle di atas 60°C, kipas berisik bahkan saat hanya membuka browser, atau laptop tiba-tiba mati sendiri saat main game.",
    diyGuide: [
      "Bersihkan sisa paste lama pada chip CPU & GPU menggunakan Isopropyl Alcohol 90%+ dan kain microfiber.",
      "Gunakan thermal paste berkualitas tinggi (seperti Honeywell PTM7950, Arctic MX-6, atau Noctua NT-H2).",
      "Oleskan tipis merata atau satu titik seukuran biji kacang polong di tengah die chip.",
      "Kencangkan sekrup heatsink sesuai nomor urut yang tercetak untuk tekanan yang merata."
    ],
    mksAdvice: "Kami merekomendasikan penggantian thermal paste setiap 12-18 bulan sekali. MKS Computer menggunakan pembersih khusus dan pasta termal premium (seperti Honeywell Phase-Change Pad) untuk menjaga kestabilan suhu ekstrem.",
    difficulty: "Sedang",
    frequency: "Setiap 1 Tahun",
    icon: Thermometer
  },
  {
    id: "dust-cleaning",
    category: "thermal",
    title: "Sirkulasi Udara & Debu Kipas",
    shortDesc: "Debu yang menyumbat sirip heatsink menghalangi pembuangan panas, memaksa kipas berputar kencang tanpa mendinginkan hardware.",
    symptom: "Bagian bawah laptop terasa sangat panas menyengat, hembusan angin dari ventilasi terasa sangat lemah meskipun kipas meraung kencang.",
    diyGuide: [
      "Jangan pernah menggunakan laptop di atas kasur, sofa, atau selimut karena menyumbat lubang sirkulasi udara di bawah.",
      "Gunakan kaleng udara bertekanan (compressed air) untuk meniup debu keluar dari kisi-kisi ventilasi secara teratur.",
      "Tahan baling-baling kipas dengan jari atau tusuk gigi saat meniupnya agar dinamo kipas tidak berputar berlebih dan rusak."
    ],
    mksAdvice: "Lakukan deep cleaning internal minimal 6 bulan sekali jika Anda sering bekerja di ruangan non-AC atau memiliki hewan peliharaan berbulu. Tim kami menyediakan paket deep-cleaning ekspres hanya 30 menit.",
    difficulty: "Mudah",
    frequency: "Setiap 6 Bulan",
    icon: Wind
  },
  {
    id: "battery-charging",
    category: "battery",
    title: "Mitos 0% & Overcharging Baterai",
    shortDesc: "Membiarkan baterai lithium-ion kosong hingga 0% merusak struktur kimia sel, sementara membiarkannya selalu 100% mempercepat degradasi.",
    symptom: "Daya tahan baterai berkurang drastis (hanya bertahan < 1 jam), atau casing laptop mulai menggelembung (baterai kembung).",
    diyGuide: [
      "Usahakan untuk mulai mengisi daya (charger) saat baterai menyentuh angka 20% dan cabut atau batasi di angka 80% jika memungkinkan.",
      "Aktifkan fitur pembatasan pengisian baterai (Battery Health Manager) bawaan pabrik (seperti ASUS Battery Health Charging, Lenovo Conservation Mode).",
      "Hindari menggunakan laptop untuk komputasi berat (game/rendering) hanya dengan daya baterai tanpa dicolok ke listrik."
    ],
    mksAdvice: "Jika baterai Anda sudah mulai kembung, segera bawa ke MKS Computer ITC Cempaka Mas untuk diganti. Baterai kembung sangat berbahaya karena berisiko bocor, terbakar, atau merusak trackpad dan keyboard di atasnya.",
    difficulty: "Mudah",
    frequency: "Setiap Hari",
    icon: Battery
  },
  {
    id: "storage-health",
    category: "system",
    title: "Monitor Kesehatan SSD & HDD",
    shortDesc: "Semua media penyimpanan memiliki batas umur pakai. Kehilangan data mendadak akibat bad sector atau degradasi NAND flash bisa berakibat fatal.",
    symptom: "Windows sering mengalami Blue Screen of Death (BSOD), proses booting memakan waktu bermenit-menit, atau file tiba-tiba corrupt.",
    diyGuide: [
      "Gunakan software gratis seperti CrystalDiskInfo atau Hard Disk Sentinel untuk memantau indikator kesehatan (Health %) drive Anda.",
      "Selalu sisakan kapasitas kosong minimal 15-20% pada SSD utama Anda agar performa write/read tetap optimal (proses garbage collection berjalan baik).",
      "Lakukan backup data penting Anda ke cloud atau harddisk eksternal secara berkala secara otomatis."
    ],
    mksAdvice: "Jika kesehatan SSD Anda sudah di bawah 60% atau berstatus 'Caution/Bad', segeralah upgrade ke SSD NVMe generasi terbaru di MKS. Kami melayani kloning sistem operasi langsung tanpa harus instal ulang program kerja Anda.",
    difficulty: "Mudah",
    frequency: "Setiap 3 Bulan",
    icon: Gauge
  },
  {
    id: "bloatware-removal",
    category: "system",
    title: "Pembersihan Malware & Bloatware",
    shortDesc: "Terlalu banyak aplikasi background tak berguna (bloatware) dan virus tersembunyi memakan RAM serta resource CPU secara konstan.",
    symptom: "RAM selalu terpakai di atas 80% saat idle, laptop terasa lambat saat klik kanan di desktop, atau sering muncul pop-up iklan aneh.",
    diyGuide: [
      "Buka Task Manager (Ctrl + Shift + Esc) dan nonaktifkan aplikasi yang tidak perlu pada tab 'Startup Apps'.",
      "Uninstall program bawaan merk laptop yang tidak pernah digunakan melalui menu 'Apps & Features'.",
      "Gunakan Windows Defender bawaan yang selalu up-to-date, hindari menginstal dua antivirus pihak ketiga secara bersamaan yang dapat bentrok."
    ],
    mksAdvice: "Hindari mendownload software bajakan atau jamu crack yang seringkali disisipi trojan/miner bitcoin tersembunyi yang membuat laptop panas tanpa sebab. Teknisi MKS siap membantu clean-install OS berlisensi resmi.",
    difficulty: "Sedang",
    frequency: "Setiap 1 Bulan",
    icon: ShieldAlert
  },
  {
    id: "physical-screen",
    category: "physical",
    title: "Cara Membersihkan Layar & Keyboard",
    shortDesc: "Cairan pembersih yang salah dapat merusak lapisan anti-glare LCD, sementara remah makanan dapat merusak mekanisme switch keyboard.",
    symptom: "Layar terlihat baret halus, terdapat noda putih permanen (keyboard mark), atau beberapa tombol keyboard terasa keras saat ditekan.",
    diyGuide: [
      "Jangan pernah menyemprotkan cairan pembersih langsung ke layar LCD. Semprotkan sedikit pada kain microfiber terlebih dahulu.",
      "Gunakan hanya cairan pembersih khusus layar (lens cleaner) bebas alkohol, atau air distilasi biasa.",
      "Bersihkan sela-sela keyboard dengan kuas halus secara berkala dan usahakan jangan makan/minum di dekat laptop aktif."
    ],
    mksAdvice: "Gunakan pelindung layar berkualitas atau taruh kain microfiber tipis di atas keyboard sebelum menutup layar laptop untuk mencegah goresan keyboard membekas permanen pada panel LCD.",
    difficulty: "Mudah",
    frequency: "Setiap 2 Minggu",
    icon: Monitor
  }
];

export default function MaintenanceTips() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "thermal" | "battery" | "system" | "physical">("all");
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  // Diagnostic Quiz State
  const [quizStep, setQuizStep] = useState<number>(0); // 0: intro, 1-3: questions, 4: result
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScoreResult, setQuizScoreResult] = useState<{
    score: number;
    status: string;
    color: string;
    advice: string;
  } | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "Kapan terakhir kali laptop Anda dibersihkan dan diganti thermal paste internals?",
      options: [
        { text: "Kurang dari 1 tahun yang lalu", points: 30 },
        { text: "1 - 2 tahun yang lalu", points: 15 },
        { text: "Lebih dari 2 tahun yang lalu / Belum pernah", points: 5 }
      ]
    },
    {
      id: 2,
      question: "Bagaimana kondisi suhu dan suara kipas laptop Anda saat digunakan bekerja atau bermain game?",
      options: [
        { text: "Dingin/hangat wajar, suara kipas sangat senyap", points: 35 },
        { text: "Agak panas, kipas sesekali berputar sangat kencang dan berisik", points: 20 },
        { text: "Sangat panas menyengat, kipas selalu meraung bising atau laptop mati tiba-tiba", points: 5 }
      ]
    },
    {
      id: 3,
      question: "Berapa lama daya tahan baterai laptop Anda saat digunakan tanpa dicolok ke charger?",
      options: [
        { text: "Sangat awet, bertahan lebih dari 3 - 4 jam", points: 35 },
        { text: "Mulai menurun, bertahan sekitar 1.5 - 2 jam", points: 20 },
        { text: "Sangat boros, mati kurang dari 45 menit / harus selalu dicolok terus", points: 5 }
      ]
    }
  ];

  const handleAnswer = (questionIndex: number, points: number) => {
    const updatedAnswers = { ...quizAnswers, [questionIndex]: points };
    setQuizAnswers(updatedAnswers);

    if (questionIndex < quizQuestions.length - 1) {
      setQuizStep(questionIndex + 1);
    } else {
      // Calculate final score
      const answersList = Object.values(updatedAnswers) as number[];
      const totalScore = answersList.reduce((sum, val) => sum + val, 0);
      let status = "SEHAT PRIMA";
      let color = "text-emerald-400 border-emerald-500 bg-emerald-500/10";
      let advice = "Luar biasa! Laptop Anda dalam kondisi prima. Tetap pertahankan kebiasaan baik dengan menjaga sirkulasi udara bebas debu dan pantau kesehatan penyimpanan berkala.";

      if (totalScore < 50) {
        status = "KRITIS / PERLU PENANGANAN";
        color = "text-red-500 border-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]";
        advice = "Peringatan! Laptop Anda menunjukkan gejala keausan termal dan degradasi daya yang parah. Sangat direkomendasikan untuk melakukan deep-cleaning, ganti thermal paste premium, atau cek kondisi baterai di lab teknisi MKS Computer ITC Cempaka Mas demi mencegah kerusakan motherboard permanen.";
      } else if (totalScore < 85) {
        status = "PERINGATAN / BUTUH PERAWATAN";
        color = "text-amber-400 border-amber-500 bg-amber-500/10";
        advice = "Laptop Anda mulai menunjukkan tanda-atanda kelelahan hardware. Direkomendasikan melakukan pembersihan debu internal kipas dan batasi beban kerja berlebih agar suhu tetap terkontrol dengan baik sebelum menjadi kritis.";
      }

      setQuizScoreResult({ score: totalScore, status, color, advice });
      setQuizStep(4);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizScoreResult(null);
  };

  const filteredTips = selectedCategory === "all" 
    ? MAINTENANCE_TIPS 
    : MAINTENANCE_TIPS.filter(tip => tip.category === selectedCategory);

  const categories = [
    { id: "all", label: "Semua Tips" },
    { id: "thermal", label: "Suhu & Kipas" },
    { id: "battery", label: "Baterai & Daya" },
    { id: "system", label: "SSD & Sistem" },
    { id: "physical", label: "Perawatan Fisik" }
  ];

  return (
    <section id="maintenance-tips" className="py-20 bg-zinc-950/40 border-b border-zinc-900/60 font-sans relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">
            MKS INTERACTIVE EDUCATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            Panduan & <span className="text-red-500">Tips MKS</span>
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto">
            Pelajari cara menjaga performa laptop Anda tetap ngebut, dingin, dan berumur panjang secara mandiri, atau cek status kesehatan instan laptop Anda lewat kalkulator kesehatan kami.
          </p>
        </div>

        {/* Bento Grid: Split Diagnostic Quiz and Main Tips Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Interactive Diagnostic Health Quiz (4 cols) */}
          <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-850 p-6 rounded-xl backdrop-blur-sm shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-red-600/5 rounded-full blur-[50px] pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-zinc-850/60 mb-5">
                <Gauge className="h-5 w-5 text-red-500" />
                <h3 className="text-xs font-black uppercase text-white tracking-widest">
                  Kalkulator Kesehatan Laptop
                </h3>
              </div>

              {/* Quiz Step 0: Intro */}
              {quizStep === 0 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Khawatir dengan kondisi kesehatan internal laptop Anda? Jawab 3 pertanyaan interaktif kilat ini untuk mendeteksi tingkat degradasi thermal paste, debu, dan performa daya laptop Anda secara otomatis.
                  </p>
                  <div className="bg-zinc-950/60 p-4 rounded border border-zinc-850 text-[11px] space-y-2 text-zinc-500 font-mono">
                    <div className="flex gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Diagnosa instan kurang dari 1 menit</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Rekomendasi tindakan yang disesuaikan</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Gratis tanpa perlu bongkar casing</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setQuizStep(1)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px] py-3.5 rounded transition-all cursor-pointer shadow-lg hover:shadow-red-600/20"
                  >
                    MULAI DIAGNOSA SEKARANG
                  </button>
                </div>
              )}

              {/* Quiz Steps 1 to 3: Questions */}
              {quizStep >= 1 && quizStep <= 3 && (
                <div className="space-y-5 animate-in slide-in-from-right duration-300">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-500">
                    <span>PERTANYAAN {quizStep} DARI 3</span>
                    <span className="text-red-500">Progress {Math.round((quizStep / 3) * 100)}%</span>
                  </div>
                  
                  {/* Progress Bar indicator */}
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600 transition-all duration-300"
                      style={{ width: `${(quizStep / 3) * 100}%` }}
                    />
                  </div>

                  <h4 className="text-xs sm:text-sm font-black text-white leading-snug">
                    {quizQuestions[quizStep - 1].question}
                  </h4>

                  <div className="space-y-2.5 pt-2">
                    {quizQuestions[quizStep - 1].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(quizStep, option.points)}
                        className="w-full text-left bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-red-500/40 p-4 rounded text-xs text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-between gap-3 font-medium"
                      >
                        <span>{option.text}</span>
                        <ChevronRight className="h-4 w-4 text-zinc-600 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz Step 4: Results */}
              {quizStep === 4 && quizScoreResult && (
                <div className="space-y-5 animate-in zoom-in-95 duration-300">
                  <div className="text-center py-4">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block tracking-wider">SKOR INDEKS KESEHATAN</span>
                    <span className="text-4xl font-black font-mono text-white mt-1 block">
                      {quizScoreResult.score}<span className="text-xs text-zinc-500">/100</span>
                    </span>
                    
                    <div className={`mt-3 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider inline-block ${quizScoreResult.color}`}>
                      {quizScoreResult.status}
                    </div>
                  </div>

                  <div className="bg-zinc-950/60 p-4 rounded border border-zinc-850 space-y-3">
                    <div className="flex gap-2 items-start">
                      <Info className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {quizScoreResult.advice}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      onClick={resetQuiz}
                      className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] font-black uppercase tracking-wider py-3 rounded cursor-pointer transition-colors"
                    >
                      Ulangi Tes
                    </button>
                    
                    <button
                      onClick={() => {
                        const text = `Halo Admin MKS Computer, saya baru saja melakukan tes kesehatan laptop mandiri dan mendapatkan skor *${quizScoreResult.score}/100* dengan status *${quizScoreResult.status}*. Saya ingin melakukan konsultasi perawatan laptop atau ganti thermal paste.`;
                        window.open(`https://wa.me/6281319503899?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider py-3 rounded cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    >
                      Hubungi CS
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Brand Stamp inside card */}
            <div className="mt-8 pt-4 border-t border-zinc-850/40 flex items-center justify-between text-[8px] font-mono text-zinc-600 uppercase">
              <span>MKS COMP DIAGNOSTICS</span>
              <span>STANDAR EKSPRES</span>
            </div>
          </div>

          {/* Right Column: Dynamic Care Tips Filters & Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                      : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-850"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Tips Interactive Grid Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTips.map((tip) => {
                const isExpanded = expandedTip === tip.id;
                const IconComponent = tip.icon;

                return (
                  <div
                    key={tip.id}
                    className={`bg-zinc-900/20 border transition-all duration-300 rounded-xl p-5 md:p-6 flex flex-col justify-between relative group ${
                      isExpanded 
                        ? "border-red-600/60 bg-zinc-950/80 shadow-[0_0_30px_rgba(239,68,68,0.06)] md:col-span-2" 
                        : "border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/40"
                    }`}
                  >
                    {/* Floating Info Tag badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded flex items-center justify-center border transition-all ${
                          isExpanded ? "bg-red-600/10 border-red-500/20 text-red-500" : "bg-zinc-950 border-zinc-850 text-zinc-400 group-hover:text-white"
                        }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                          {tip.category === "thermal" ? "SUHU & KIPAS" : tip.category === "battery" ? "BATERAI" : tip.category === "system" ? "SISTEM SSD" : "FISIK & LAYAR"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[8px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                          tip.difficulty === "Mudah" 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : tip.difficulty === "Sedang"
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}>
                          {tip.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Tip Titles */}
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide group-hover:text-red-400 transition-colors">
                        {tip.title}
                      </h4>
                      
                      {!isExpanded && (
                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                          {tip.shortDesc}
                        </p>
                      )}
                    </div>

                    {/* Interactive Expanded Content Accordion Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-zinc-850/60 space-y-4 text-xs font-sans"
                        >
                          {/* 1. Symptoms Alert banner */}
                          <div className="bg-red-950/10 border border-red-500/10 p-3.5 rounded flex items-start gap-2.5">
                            <AlertTriangle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-wider block">Gejala / Tanda-Tanda Kerusakan:</span>
                              <p className="text-[11px] text-zinc-300 mt-0.5 leading-relaxed">
                                {tip.symptom}
                              </p>
                            </div>
                          </div>

                          {/* 2. DIY Action Steps list */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">Solusi Mandiri (Langkah DIY):</span>
                            <ul className="space-y-1.5 pl-1">
                              {tip.diyGuide.map((step, index) => (
                                <li key={index} className="flex gap-2.5 items-start text-[11px] text-zinc-300">
                                  <span className="w-4 h-4 rounded-full bg-red-600/10 text-red-500 text-[9px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    {index + 1}
                                  </span>
                                  <span className="leading-relaxed">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 3. MKS Professional Advice notes */}
                          <div className="bg-zinc-950/60 p-3.5 rounded border border-zinc-850 flex gap-2.5 items-start">
                            <Info className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider block">Rekomendasi Teknisi MKS Computer:</span>
                              <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                                {tip.mksAdvice}
                              </p>
                            </div>
                          </div>

                          {/* 4. Action details specs foot */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/40 p-3 rounded border border-zinc-850/60 text-[10px] font-mono text-zinc-500">
                            <div className="flex gap-4">
                              <span>Saran Frekuensi: <strong className="text-zinc-300">{tip.frequency}</strong></span>
                              <span>Kesulitan: <strong className="text-zinc-300">{tip.difficulty}</strong></span>
                            </div>
                            
                            <button
                              onClick={() => {
                                const text = `Halo Admin MKS Computer, saya membaca artikel tips perawatan laptop tentang *${tip.title}*. Saya berminat untuk melakukan pengerjaan perawatan ini di toko MKS Computer ITC Cempaka Mas. Boleh info jadwal pengerjaannya?`;
                                window.open(`https://wa.me/6281319503899?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
                              }}
                              className="text-[9px] font-mono font-bold text-red-500 hover:text-red-400 uppercase tracking-wider flex items-center gap-1 cursor-pointer ml-auto sm:ml-0"
                            >
                              Tanya Jadwal Servis →
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom action trigger bar */}
                    <div className="mt-5 pt-3 border-t border-zinc-850/30 flex items-center justify-between">
                      <span className="text-[9px] text-zinc-500 font-mono font-medium">
                        Disarankan: {tip.frequency}
                      </span>
                      
                      <button
                        onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                        className={`text-[9px] font-black uppercase tracking-widest cursor-pointer transition-colors flex items-center gap-1 py-1 px-2.5 rounded border ${
                          isExpanded 
                            ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white" 
                            : "bg-red-600/10 hover:bg-red-600 hover:text-white text-red-400 border-red-500/10 hover:border-red-500 transition-all"
                        }`}
                      >
                        {isExpanded ? "Tutup Detail" : "Baca Panduan DIY"}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Quick Diagnostic Notice Banner */}
        <div className="p-5 bg-zinc-900/20 border border-zinc-850 rounded-xl flex flex-col md:flex-row items-center justify-between gap-5 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-red-600/5 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-red-600/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-500">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wide">Menderita Overheat Kronis atau Macet-Macet?</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed font-sans max-w-xl">
                Bawa laptop Anda langsung ke laboratorium MKS Computer ITC Cempaka Mas Lantai 6 No. 85. Kami menyediakan inspeksi hardware menyeluruh dan deep-cleaning ekspres yang bisa ditunggu.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const text = `Halo Admin MKS Computer, laptop saya sedang bermasalah dan ingin berkonsultasi mengenai perbaikan/servis laptop.`;
              window.open(`https://wa.me/6281319503899?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
            }}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded transition-colors cursor-pointer shrink-0 text-center"
          >
            Hubungi Konsultasi Teknisi
          </button>
        </div>

      </div>
    </section>
  );
}
