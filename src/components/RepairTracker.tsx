import React, { useState, useEffect } from "react";
import { 
  Search, 
  Wrench, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  Printer, 
  Calendar, 
  Cpu, 
  FileText, 
  Sparkles, 
  Info,
  Laptop,
  Check,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RepairLog {
  time: string;
  date: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface RepairTicket {
  ticketNumber: string;
  customerName: string;
  deviceBrand: string;
  deviceModel: string;
  issueDescription: string;
  technicianName: string;
  technicianRole: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  entryDate: string;
  estimatedFinishDate: string;
  currentStage: number; // 1 to 6
  stages: {
    id: number;
    label: string;
    description: string;
    statusText: string;
  }[];
  logs: RepairLog[];
}

const DEMO_TICKETS: Record<string, RepairTicket> = {
  "MKS-2026-8812": {
    ticketNumber: "MKS-2026-8812",
    customerName: "Budi Santoso",
    deviceBrand: "ASUS",
    deviceModel: "ROG Zephyrus G14 (GA401)",
    issueDescription: "Laptop Mati Total setelah korsleting listrik rumah & Pembersihan Thermal Paste Kering",
    technicianName: "Roni Wijaya",
    technicianRole: "Senior Board Level Micro-Soldering Specialist",
    estimatedCostMin: 750000,
    estimatedCostMax: 950000,
    entryDate: "08 Juli 2026",
    estimatedFinishDate: "12 Juli 2026",
    currentStage: 4, // Proses Perbaikan
    stages: [
      { id: 1, label: "Registrasi Perangkat", description: "Perangkat terdaftar & diterima oleh CS", statusText: "Selesai" },
      { id: 2, label: "Diagnosa Hardware", description: "Pengecekan jalur sirkuit tegangan motherboard", statusText: "Selesai" },
      { id: 3, label: "Konfirmasi Customer", description: "Persetujuan biaya perbaikan & sparepart", statusText: "Disetujui" },
      { id: 4, label: "Proses Perbaikan", description: "Penggantian IC Power & Kapasitor short-circuit", statusText: "Sedang Berjalan" },
      { id: 5, label: "Quality Control (QC)", description: "Stress-test performa GPU/CPU & stabilitas daya", statusText: "Belum Mulai" },
      { id: 6, label: "Siap Diambil", description: "Perbaikan selesai & penerbitan kartu garansi", statusText: "Belum Mulai" }
    ],
    logs: [
      { date: "10 Juli 2026", time: "11:30", title: "Memulai Solder Komponen Utama", description: "Teknisi sedang melakukan pelepasan IC regulator daya yang hangus dan membersihkan solder pad pada motherboard.", isCompleted: true },
      { date: "09 Juli 2026", time: "09:00", title: "Persetujuan Biaya Servis", description: "Customer menyetujui rincian estimasi biaya penggantian komponen IC Power sebesar Rp 850.000 via obrolan WhatsApp.", isCompleted: true },
      { date: "08 Juli 2026", time: "14:15", title: "Diagnosa Deteksi Korsleting", description: "Ditemukan kerusakan short-circuit pada jalur utama 19V sirkuit input daya, diakibatkan kapasitor keramik bocor.", isCompleted: true },
      { date: "08 Juli 2026", time: "10:30", title: "Penerimaan & Registrasi Fisik", description: "Laptop diserahkan langsung oleh customer di toko. Kelengkapan unit: Unit laptop & charger original 180W.", isCompleted: true }
    ]
  },
  "MKS-2026-1294": {
    ticketNumber: "MKS-2026-1294",
    customerName: "Sarah Olivia",
    deviceBrand: "Apple MacBook",
    deviceModel: "MacBook Air M1 2020 (A2337)",
    issueDescription: "Layar LCD Retak akibat tertutup bolpoin & Keyboard double-typing pada beberapa tombol",
    technicianName: "Dani Setiawan",
    technicianRole: "Apple Certified Repair Technician",
    estimatedCostMin: 1800000,
    estimatedCostMax: 2400000,
    entryDate: "09 Juli 2026",
    estimatedFinishDate: "14 Juli 2026",
    currentStage: 3, // Menunggu Konfirmasi
    stages: [
      { id: 1, label: "Registrasi Perangkat", description: "Perangkat terdaftar & diterima oleh CS", statusText: "Selesai" },
      { id: 2, label: "Diagnosa Hardware", description: "Pengecekan detail LCD assembly & keyboard flex", statusText: "Selesai" },
      { id: 3, label: "Konfirmasi Customer", description: "Persetujuan biaya penggantian panel LCD", statusText: "Menunggu Jawaban" },
      { id: 4, label: "Proses Perbaikan", description: "Pemasangan LCD Assembly baru & service mekanik keyboard", statusText: "Belum Mulai" },
      { id: 5, label: "Quality Control (QC)", description: "Pengecekan backlight bleeding & tes fungsi tuts", statusText: "Belum Mulai" },
      { id: 6, label: "Siap Diambil", description: "Unit dibersihkan & dipacking untuk serah terima", statusText: "Belum Mulai" }
    ],
    logs: [
      { date: "10 Juli 2026", time: "10:00", title: "Menghubungi Customer (Pending)", description: "Tim CS mengirimkan rincian estimasi biaya untuk penggantian LCD Assembly original Grade A senilai Rp 1.950.000. Menunggu konfirmasi persetujuan dari Kak Sarah.", isCompleted: false },
      { date: "09 Juli 2026", time: "16:30", title: "Analisis Kerusakan LCD & Keyboard", description: "Ditemukan bahwa panel LCD pecah dari bagian dalam (retak sudut kiri bawah). Keyboard terdeteksi double-typing pada tombol Space & huruf 'E' akibat korosi debu lembab.", isCompleted: true },
      { date: "09 Juli 2026", time: "11:00", title: "Penerimaan Unit & Inspeksi Awal", description: "Unit MacBook Air Space Gray diterima dengan kondisi layar blank bergaris. Kondisi fisik luar mulus tanpa penyok di sudut.", isCompleted: true }
    ]
  },
  "MKS-2026-5501": {
    ticketNumber: "MKS-2026-5501",
    customerName: "Kevin Wijaya",
    deviceBrand: "Lenovo",
    deviceModel: "Legion 5 Pro (16ACH6H)",
    issueDescription: "Upgrade SSD NVMe Samsung 980 Pro 1TB & Pembersihan Dust-clogged Dual Fan Heatsink + Repaste Premium",
    technicianName: "Ahmad Fathoni",
    technicianRole: "Lead System Integrator & High-Performance Cooler Specialist",
    estimatedCostMin: 450000,
    estimatedCostMax: 550000,
    entryDate: "10 Juli 2026",
    estimatedFinishDate: "10 Juli 2026",
    currentStage: 6, // Siap Diambil
    stages: [
      { id: 1, label: "Registrasi Perangkat", description: "Unit terdaftar untuk upgrade kilat", statusText: "Selesai" },
      { id: 2, label: "Diagnosa Hardware", description: "Pengecekan kompatibilitas PCIe Gen 4", statusText: "Selesai" },
      { id: 3, label: "Konfirmasi Customer", description: "Persetujuan upgrade SSD & jenis Thermal Paste", statusText: "Selesai" },
      { id: 4, label: "Proses Perbaikan", description: "Pemasangan SSD, kloning sistem OS, pembersihan heatsink", statusText: "Selesai" },
      { id: 5, label: "Quality Control (QC)", description: "Benchmark kecepatan SSD & stress test suhu CPU/GPU", statusText: "Selesai" },
      { id: 6, label: "Siap Diambil", description: "Unit selesai, dikemas rapi & siap diserah-terimakan", statusText: "Selesai" }
    ],
    logs: [
      { date: "10 Juli 2026", time: "14:00", title: "Siap Diambil di Counter", description: "Pekerjaan tuntas sempurna. Nota fisik telah dicetak, segel garansi dipasang, dan perangkat diletakkan di rak pickup prioritas.", isCompleted: true },
      { date: "10 Juli 2026", time: "13:30", title: "QC Stress Test & Speed Benchmark", description: "Lolos stress test CPU menggunakan Cinebench R23 selama 10 menit (suhu stabil di 78C). Kecepatan baca SSD Samsung 980 Pro terukur di 6900 MB/s (Gen 4 x4 speed).", isCompleted: true },
      { date: "10 Juli 2026", time: "12:00", title: "Pembersihan Heatsink & Repaste Premium", description: "Debu tebal pada sirip radiator dibersihkan. Dilakukan repaste menggunakan thermal paste Honeywell PTM7950 phase-change pad untuk performa pendinginan maksimal.", isCompleted: true },
      { date: "10 Juli 2026", time: "10:30", title: "Instalasi SSD & Kloning Data", description: "Pemasangan fisik SSD NVMe 1TB di slot M.2 sekunder. Melakukan proses kloning partisi OS Windows agar data dan aplikasi persis seperti semula tanpa install ulang.", isCompleted: true },
      { date: "10 Juli 2026", time: "09:00", title: "Registrasi Masuk & Serah Terima", description: "Penerimaan unit di pagi hari untuk pengerjaan paket Express 'Selesai Hari Yang Sama' (Same-Day Service).", isCompleted: true }
    ]
  }
};

export default function RepairTracker() {
  const [searchCode, setSearchCode] = useState<string>("");
  const [activeTicket, setActiveTicket] = useState<RepairTicket | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (codeToSearch: string) => {
    const formattedCode = codeToSearch.trim().toUpperCase();
    if (!formattedCode) return;

    setIsSearching(true);
    setSearchError(null);
    setActiveTicket(null);

    // Simulated high-speed network search to database
    setTimeout(() => {
      if (DEMO_TICKETS[formattedCode]) {
        setActiveTicket(DEMO_TICKETS[formattedCode]);
      } else if (formattedCode.startsWith("MKS-") && formattedCode.length >= 8) {
        // Generate a dynamic realistic ticket for any custom ticket format (e.g. MKS-2026-XXXX)
        // This adds incredible depth and prevents a dead-end
        const parsedDigits = formattedCode.replace(/\D/g, "");
        const seed = parsedDigits ? parseInt(parsedDigits) : 1234;
        
        const deviceBrands = ["Lenovo ThinkPad", "Dell Latitude", "Acer Aspire", "HP Pavilion", "ASUS Vivobook", "Xiaomi RedmiBook"];
        const technicians = ["Dani Setiawan", "Roni Wijaya", "Ahmad Fathoni", "Zulkifli Lubis"];
        const issues = [
          "Ganti Keyboard & Service Engsel Retak", 
          "Reinstall OS Windows 11 Pro + Backup Data Penting", 
          "Penggantian Baterai Kembung Original + Tune-up Termal",
          "Upgrade RAM 16GB Kingston DDR4 & Pembersihan Kipas Internal"
        ];

        const brandIndex = seed % deviceBrands.length;
        const techIndex = seed % technicians.length;
        const issueIndex = seed % issues.length;
        const stage = (seed % 4) + 2; // stage 2 to 5

        const customTicket: RepairTicket = {
          ticketNumber: formattedCode,
          customerName: "Customer Prioritas #" + (seed % 1000),
          deviceBrand: deviceBrands[brandIndex].split(" ")[0],
          deviceModel: deviceBrands[brandIndex],
          issueDescription: issues[issueIndex],
          technicianName: technicians[techIndex],
          technicianRole: techIndex === 1 ? "Senior Micro-Soldering Specialist" : "PC & Notebook Expert Engineer",
          estimatedCostMin: 350000 + (seed % 15) * 50000,
          estimatedCostMax: 500000 + (seed % 15) * 75000,
          entryDate: "10 Juli 2026",
          estimatedFinishDate: "12 Juli 2026",
          currentStage: stage,
          stages: [
            { id: 1, label: "Registrasi Perangkat", description: "Perangkat terdaftar & diterima oleh CS", statusText: "Selesai" },
            { id: 2, label: "Diagnosa Hardware", description: "Pengecekan menyeluruh oleh tim teknisi MKS", statusText: stage >= 2 ? "Selesai" : "Sedang Berjalan" },
            { id: 3, label: "Konfirmasi Customer", description: "Persetujuan estimasi biaya & suku cadang", statusText: stage === 3 ? "Sedang Berjalan" : stage > 3 ? "Selesai" : "Belum Mulai" },
            { id: 4, label: "Proses Perbaikan", description: "Pengerjaan fisik perbaikan & penggantian komponen", statusText: stage === 4 ? "Sedang Berjalan" : stage > 4 ? "Selesai" : "Belum Mulai" },
            { id: 5, label: "Quality Control (QC)", description: "Uji coba stabilitas thermal & fungsi sistem", statusText: stage === 5 ? "Sedang Berjalan" : "Belum Mulai" },
            { id: 6, label: "Siap Diambil", description: "Unit selesai, nota garansi diterbitkan", statusText: "Belum Mulai" }
          ],
          logs: [
            { 
              date: "10 Juli 2026", 
              time: "15:00", 
              title: stage === 2 ? "Proses Diagnosa Berjalan" : stage === 3 ? "Menunggu Konfirmasi Biaya" : stage === 4 ? "Pengerjaan Fisik Dimulai" : "Masuk Tahap Quality Control", 
              description: stage === 2 
                ? "Teknisi sedang melakukan pembongkaran casing dan analisis visual motherboard." 
                : stage === 3 
                ? "Menghubungi nomor WhatsApp terdaftar untuk konfirmasi biaya suku cadang." 
                : stage === 4 
                ? "Pemasangan komponen baru sedang dikerjakan dengan presisi tinggi." 
                : "Melakukan pengetesan hardware komprehensif pasca perbaikan.",
              isCompleted: stage > 2
            },
            { 
              date: "10 Juli 2026", 
              time: "11:45", 
              title: "Penugasan Teknisi Mandat", 
              description: `Unit diserahkan kepada Teknisi ${technicians[techIndex]} untuk penanganan spesifik sesuai dengan kendala perangkat.`, 
              isCompleted: true 
            },
            { 
              date: "10 Juli 2026", 
              time: "09:30", 
              title: "Registrasi Fisik Sukses", 
              description: "Data perangkat telah diinput ke dalam database MKS Computer. Tanda terima servis cetak diterbitkan.", 
              isCompleted: true 
            }
          ]
        };

        setActiveTicket(customTicket);
      } else {
        setSearchError("Kode tiket tidak ditemukan. Pastikan format penulisan benar (Contoh: MKS-2026-8812) atau gunakan tiket demo di bawah.");
      }
      setIsSearching(false);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  const getStageColor = (stageId: number, currentStage: number) => {
    if (stageId < currentStage) return "bg-emerald-500 border-emerald-400 text-white"; // Completed
    if (stageId === currentStage) {
      if (currentStage === 3) return "bg-amber-500 border-amber-400 text-black animate-pulse"; // Waiting confirm
      return "bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"; // Current progress
    }
    return "bg-zinc-950 border-zinc-800 text-zinc-500"; // Upcoming
  };

  const getStageIcon = (stageId: number, currentStage: number) => {
    if (stageId < currentStage) return <Check className="h-3 w-3 stroke-[3]" />;
    return <span className="text-[10px] font-mono font-bold">{stageId}</span>;
  };

  return (
    <section id="tracking" className="py-20 bg-zinc-950 border-b border-zinc-900/60 tech-grid print:bg-white print:text-black print:p-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 print:hidden">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">
            LIVE REPAIR STATUS SYSTEM
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            Lacak <span className="text-red-500">Status Servis & Perbaikan</span>
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto">
            Masukkan Nomor Tiket Servis (Service Ticket Number) unik Anda untuk memantau progress perbaikan laptop secara real-time langsung dari laboratorium teknisi kami.
          </p>
        </div>

        {/* Outer Frame Wrapper */}
        <div className="max-w-4xl mx-auto">
          
          {/* Tracking Search Form */}
          <div className="bg-zinc-900/30 border border-zinc-850 p-6 md:p-8 rounded-xl backdrop-blur-sm shadow-2xl relative overflow-hidden mb-8 print:hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-red-600/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSearch(searchCode); }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-3.5">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Masukkan Kode Tiket (Contoh: MKS-2026-8812)"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="w-full bg-zinc-950 text-sm border border-zinc-800 rounded-sm pl-12 pr-4 py-4 text-white uppercase tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-mono font-bold"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || !searchCode.trim()}
                  className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:shadow-[0_0_20px_rgba(239,68,68,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[150px] disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Melacak...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>CARI TIKET</span>
                    </>
                  )}
                </button>
              </div>

              {searchError && (
                <div className="bg-red-950/20 border border-red-500/20 text-red-500 text-xs p-3.5 rounded flex items-start gap-2.5 font-mono leading-relaxed">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{searchError}</span>
                </div>
              )}

              {/* Demo Quick Select Buttons */}
              <div className="border-t border-zinc-850/60 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <span className="text-[10px] text-zinc-500 font-mono font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-red-500 animate-pulse" />
                  Pilih Tiket Demo Untuk Simulasi:
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(DEMO_TICKETS).map((key) => {
                    const ticket = DEMO_TICKETS[key];
                    let badgeColor = "border-red-600/30 text-red-400 bg-red-600/5";
                    if (ticket.currentStage === 3) badgeColor = "border-amber-500/30 text-amber-400 bg-amber-500/5";
                    if (ticket.currentStage === 6) badgeColor = "border-emerald-500/30 text-emerald-400 bg-emerald-500/5";

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSearchCode(key);
                          handleSearch(key);
                        }}
                        className={`px-3 py-1.5 text-[10px] font-mono font-bold rounded border hover:bg-zinc-900 cursor-pointer transition-colors ${badgeColor}`}
                      >
                        {key} ({ticket.currentStage === 3 ? "Pending" : ticket.currentStage === 6 ? "Selesai" : "Proses"})
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {isSearching ? (
              /* High-Fidelity Scanning Loader */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-zinc-900/10 border border-zinc-850/80 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-4 print:hidden"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border border-red-500/20 flex items-center justify-center animate-ping absolute inset-0"></div>
                  <div className="w-16 h-16 rounded-full border-2 border-zinc-800 border-t-red-600 flex items-center justify-center animate-spin relative z-10">
                    <Wrench className="h-6 w-6 text-red-500" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-mono font-black text-white uppercase tracking-widest">
                    Mencari Server Database MKS...
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Memvalidasi ID enkripsi tiket & mendownload log aktivitas teknisi...
                  </p>
                </div>
              </motion.div>
            ) : activeTicket ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 print:space-y-6"
              >
                {/* 1. Ticket Overview Card Header */}
                <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden print:border-black print:bg-white print:p-0 print:shadow-none">
                  
                  {/* Decorative badge print instructions */}
                  <div className="absolute top-0 right-0 w-[200px] h-[150px] bg-red-600/5 rounded-full blur-[60px] pointer-events-none print:hidden"></div>
                  
                  {/* Top Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-850/60 pb-5 mb-5 print:border-b-2 print:border-black">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-black uppercase text-red-500 bg-red-600/10 border border-red-500/20 px-2.5 py-1 rounded-sm print:border-black print:text-black print:bg-transparent">
                          SERVICE TICKET
                        </span>
                        <span className="text-xs text-zinc-500 font-mono print:text-black">
                          Diterima: {activeTicket.entryDate}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black font-mono text-white mt-1.5 uppercase tracking-wide print:text-black">
                        {activeTicket.ticketNumber}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 print:hidden">
                      <button
                        onClick={handlePrint}
                        className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-850 hover:border-zinc-700 text-[10px] font-black uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Cetak Slip
                      </button>
                    </div>
                  </div>

                  {/* Info Specifications Matrix Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Customer & Device column */}
                    <div className="md:col-span-8 space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider block font-mono">Nama Pemilik (Customer)</span>
                          <span className="text-sm font-black text-white uppercase tracking-tight mt-0.5 block print:text-black">{activeTicket.customerName}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider block font-mono">Tipe & Merk Laptop</span>
                          <span className="text-sm font-black text-white uppercase tracking-tight mt-0.5 block flex items-center gap-1.5 print:text-black">
                            <Laptop className="h-4 w-4 text-red-500 shrink-0 print:text-black" />
                            {activeTicket.deviceBrand} {activeTicket.deviceModel}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-zinc-850/40 pt-4 print:border-t-2 print:border-zinc-200">
                        <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider block font-mono">Masalah / Deskripsi Service</span>
                        <p className="text-xs text-zinc-300 leading-relaxed mt-1 font-sans print:text-black">
                          {activeTicket.issueDescription}
                        </p>
                      </div>

                    </div>

                    {/* Cost / Finish column */}
                    <div className="md:col-span-4 bg-zinc-950/80 p-5 rounded border border-zinc-850/80 space-y-4 print:bg-transparent print:p-0 print:border-none">
                      <div>
                        <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider block font-mono">Estimasi Biaya Perbaikan</span>
                        <span className="text-base font-black text-red-500 font-mono block mt-0.5 print:text-black">
                          {formatRupiah(activeTicket.estimatedCostMin)} - {formatRupiah(activeTicket.estimatedCostMax)}
                        </span>
                        <span className="text-[8px] text-zinc-500 block leading-tight font-mono uppercase mt-0.5">Sudah termasuk jasa & sparepart</span>
                      </div>

                      <div className="border-t border-zinc-850/40 pt-3.5 print:border-t-2 print:border-zinc-200">
                        <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider block font-mono">Estimasi Selesai</span>
                        <span className="text-xs font-black text-white uppercase block mt-0.5 font-mono print:text-black">
                          {activeTicket.estimatedFinishDate}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* 2. Visual Vertical Timeline Progress */}
                <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden print:border-black print:bg-white print:p-0 print:shadow-none">
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-red-600/5 rounded-full blur-[60px] pointer-events-none print:hidden"></div>
                  
                  <div className="flex items-center gap-2.5 mb-6 md:mb-8 pb-3.5 border-b border-zinc-850/60 print:border-b-2 print:border-black">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    <h4 className="text-xs font-black uppercase text-white tracking-widest print:text-black">
                      Tahapan Progress Perbaikan Perangkat
                    </h4>
                  </div>

                  {/* Responsive Stepper Chain */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
                    
                    {/* Connector line behind on desktop */}
                    <div className="hidden md:block absolute top-[22px] left-[5%] right-[5%] h-0.5 bg-zinc-800 z-0" />

                    {activeTicket.stages.map((stage) => {
                      const isPast = stage.id < activeTicket.currentStage;
                      const isCurrent = stage.id === activeTicket.currentStage;
                      const isFuture = stage.id > activeTicket.currentStage;

                      return (
                        <div 
                          key={stage.id} 
                          className={`flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-3 relative z-10 ${
                            isFuture ? "opacity-50" : "opacity-100"
                          }`}
                        >
                          {/* Dot step circle */}
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold shrink-0 transition-all ${getStageColor(stage.id, activeTicket.currentStage)}`}>
                            {getStageIcon(stage.id, activeTicket.currentStage)}
                          </div>

                          {/* Stepper Texts */}
                          <div className="min-w-0 md:text-center">
                            <span className={`text-[10px] font-black uppercase tracking-wider block ${
                              isCurrent ? "text-red-500" : isPast ? "text-emerald-400" : "text-zinc-500"
                            }`}>
                              {stage.label}
                            </span>
                            <span className="text-[9px] text-zinc-500 mt-0.5 block leading-tight font-mono truncate hover:text-clip">
                              {stage.description}
                            </span>
                          </div>

                        </div>
                      );
                    })}

                  </div>

                </div>

                {/* 3. Splitted Column: Logs & Tech Profile */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Interactive Chronological Repair Logs */}
                  <div className="lg:col-span-8 bg-zinc-900/30 border border-zinc-850 p-6 md:p-8 rounded-xl backdrop-blur-sm shadow-2xl space-y-6 print:border-black print:p-0 print:shadow-none print:col-span-12">
                    
                    <div className="flex items-center justify-between border-b border-zinc-850/60 pb-4 print:border-b-2 print:border-black">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4.5 w-4.5 text-red-500 print:text-black" />
                        <h4 className="text-xs font-black uppercase text-white tracking-widest print:text-black">
                          Riwayat Aktivitas & Catatan Teknisi
                        </h4>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider print:text-black">
                        Total {activeTicket.logs.length} Entri Log
                      </span>
                    </div>

                    {/* Timeline logs stack */}
                    <div className="relative border-l border-zinc-800 ml-3.5 pl-6 space-y-6 md:space-y-8 py-2">
                      {activeTicket.logs.map((log, index) => {
                        return (
                          <div key={index} className="relative group">
                            
                            {/* Circle Node Dot */}
                            <div className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border border-zinc-900 transition-colors ${
                              log.isCompleted 
                                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                                : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse"
                            }`} />

                            {/* Timestamp log label */}
                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-500 mb-1">
                              <span>{log.date}</span>
                              <span className="text-zinc-700 font-normal">|</span>
                              <span>{log.time} WIB</span>
                              {!log.isCompleted && (
                                <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded font-sans">
                                  Menunggu Konfirmasi
                                </span>
                              )}
                            </div>

                            {/* Content body log */}
                            <h5 className="text-xs font-black uppercase tracking-wide text-white print:text-black">
                              {log.title}
                            </h5>
                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-2xl font-sans print:text-black">
                              {log.description}
                            </p>

                          </div>
                        );
                      })}
                    </div>

                  </div>

                  {/* Right: Technical Engineer Handover Profile */}
                  <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-850 p-6 rounded-xl backdrop-blur-sm shadow-2xl space-y-5 print:hidden">
                    
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest border-b border-zinc-850 pb-3 block">
                      TEKNISI PENANGGUNG JAWAB
                    </h4>

                    {/* Technician Visual Bio */}
                    <div className="flex items-center gap-3.5 bg-zinc-950/60 p-4 rounded border border-zinc-850">
                      <div className="w-12 h-12 rounded bg-red-600/15 border border-red-500/25 flex items-center justify-center shrink-0 text-red-500">
                        <User className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-black text-white uppercase truncate">
                          {activeTicket.technicianName}
                        </h5>
                        <p className="text-[9px] font-mono text-zinc-500 leading-tight mt-0.5">
                          {activeTicket.technicianRole}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      
                      {/* WhatsApp tech inquiry CTA */}
                      <button
                        onClick={() => {
                          const text = `Halo MKS Computer, saya ingin menanyakan status pengerjaan perangkat saya dengan Nomor Tiket *${activeTicket.ticketNumber}* atas nama *${activeTicket.customerName}*. Terima kasih!`;
                          window.open(`https://wa.me/6281319503899?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] py-3 rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        HUBUNGI TEKNISI VIA WA
                      </button>

                      <div className="bg-zinc-950/40 p-3.5 rounded border border-zinc-850/60 flex gap-2.5 items-start">
                        <Info className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                          Garansi resmi MKS Computer pasca servis adalah 1 - 3 Bulan (tergantung suku cadang). Simpan slip nota fisik untuk proses klaim.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>
            ) : (
              /* Blank Initial State or Guide Screen */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-900/10 border border-zinc-850/80 rounded-xl p-8 md:p-12 text-center max-w-xl mx-auto space-y-4 print:hidden"
              >
                <div className="w-12 h-12 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">
                    Belum Ada Tiket yang Dilacak
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Masukkan nomor tiket servis Anda yang tercetak pada nota tanda terima fisik dari MKS Computer (Contoh: MKS-2026-8812) pada kolom pencarian di atas.
                  </p>
                </div>
                
                {/* Visual Guidelines */}
                <div className="text-left bg-zinc-950/60 p-4 border border-zinc-850 rounded text-[11px] space-y-2.5 font-mono text-zinc-500">
                  <div className="flex gap-2">
                    <span className="text-red-500 font-bold shrink-0">1.</span>
                    <span>Tanda terima fisik mencantumkan format kode bar berawalan <strong className="text-zinc-400">MKS-</strong>.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-500 font-bold shrink-0">2.</span>
                    <span>Status live update diperbarui setiap kali teknisi melakukan penyelesaian sub-tugas hardware.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-500 font-bold shrink-0">3.</span>
                    <span>Jika Anda tidak menemukan nomor tiket Anda, silakan hubungi WhatsApp Support MKS Computer secara langsung.</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
