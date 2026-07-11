import React, { useState } from "react";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Bus, 
  Train, 
  Search, 
  Building, 
  Layers, 
  Clock, 
  Phone, 
  Compass, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  Map,
  MapPinned,
  ArrowRight,
  Activity,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MKSLogo from "./MKSLogo";

interface RegionCoverage {
  city: string;
  districts: string[];
  fee: string;
  eta: string;
  status: "Sangat Cepat" | "Normal" | "Jadwal Khusus";
}

const REGION_COVERAGE: RegionCoverage[] = [
  {
    city: "Jakarta Pusat",
    districts: ["Cempaka Putih", "Kemayoran", "Senen", "Johar Baru", "Menteng", "Tanah Abang", "Sawah Besar", "Gambir"],
    fee: "Gratis (Promo)",
    eta: "1 - 2 Jam (Sameday)",
    status: "Sangat Cepat"
  },
  {
    city: "Jakarta Utara",
    districts: ["Kelapa Gading", "Tanjung Priok", "Sunter", "Koja", "Cilincing", "Penjaringan", "Pademangan"],
    fee: "Rp 15.000 - Rp 25.000",
    eta: "2 - 3 Jam",
    status: "Sangat Cepat"
  },
  {
    city: "Jakarta Timur",
    districts: ["Pulo Gadung", "Matraman", "Jatinegara", "Duren Sawit", "Cakung", "Kramat Jati", "Ciracas", "Makasar"],
    fee: "Rp 20.000 - Rp 30.000",
    eta: "2 - 4 Jam",
    status: "Normal"
  },
  {
    city: "Jakarta Barat & Selatan",
    districts: ["Tebet", "Setiabudi", "Pancoran", "Kebayoran", "Grogol", "Kebon Jeruk", "Palmerah", "Kembangan"],
    fee: "Rp 35.000 - Rp 45.000",
    eta: "Sameday (3 - 5 Jam)",
    status: "Normal"
  },
  {
    city: "Bekasi & Tangerang",
    districts: ["Bekasi Barat", "Bekasi Utara", "Harapan Indah", "Pondok Gede", "Tangerang Kota", "Ciputat"],
    fee: "Rp 50.000 - Rp 70.000",
    eta: "1 Hari Kerja (Next-day)",
    status: "Jadwal Khusus"
  }
];

export default function ServiceArea() {
  const [activeTab, setActiveTab] = useState<"map" | "guide" | "coverage">("map");
  const [searchDistrict, setSearchDistrict] = useState<string>("");
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>("Semua");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDistrict(e.target.value);
  };

  // Find coverage matches
  const filteredCoverage = REGION_COVERAGE.filter(item => {
    const matchesCity = selectedCityFilter === "Semua" || item.city === selectedCityFilter;
    if (!searchDistrict) return matchesCity;
    
    const hasDistrict = item.districts.some(d => 
      d.toLowerCase().includes(searchDistrict.toLowerCase())
    );
    const matchesCitySearch = item.city.toLowerCase().includes(searchDistrict.toLowerCase());
    
    return matchesCity && (hasDistrict || matchesCitySearch);
  });

  return (
    <section id="service-area" className="py-20 bg-zinc-950 border-b border-zinc-900/60 font-sans relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">
            VISIT OUR WORKSHOP
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            Area Layanan & <span className="text-red-500">Lokasi MKS</span>
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto">
            Temukan laboratorium fisik kami di ITC Cempaka Mas Jakarta Pusat, atau nikmati layanan antar-jemput kurir ekspres gratis langsung dari rumah Anda.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("map")}
            className={`px-5 py-3 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "map"
                ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-850"
            }`}
          >
            <MapPinned className="h-4 w-4" />
            Peta Navigasi & Lokasi Booth
          </button>
          
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-5 py-3 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "guide"
                ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-850"
            }`}
          >
            <Navigation className="h-4 w-4" />
            Panduan Transportasi & Parkir
          </button>

          <button
            onClick={() => setActiveTab("coverage")}
            className={`px-5 py-3 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "coverage"
                ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-850"
            }`}
          >
            <Truck className="h-4 w-4" />
            Cakupan Pick-up Kurir (Antar-Jemput)
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "map" && (
            <motion.div
              key="map-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Google Maps Interactive Frame */}
              <div className="lg:col-span-8 bg-zinc-900/30 border border-zinc-850 rounded-xl overflow-hidden min-h-[350px] lg:min-h-[500px] shadow-xl relative group">
                <div className="absolute top-4 left-4 bg-zinc-950/90 border border-zinc-800/80 px-3 py-2 rounded shadow-lg backdrop-blur-sm z-10 flex items-center gap-2 text-[10px] font-mono font-bold text-white uppercase">
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></div>
                  <span>Workshop MKS Cempaka Mas</span>
                </div>
                
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.626810214816!2d106.87321557585093!3d-6.180614193806742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4ea547eb6b5%3A0x6b7db02b70b55f1f!2sITC%20Cempaka%20Mas!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%)" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi ITC Cempaka Mas"
                  className="w-full h-full min-h-[350px] lg:min-h-[500px]"
                ></iframe>
              </div>

              {/* Open Location details stamp block */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="p-6 bg-zinc-900/20 border border-zinc-850 rounded-xl space-y-6">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase tracking-wider">ALAMAT RESMI</span>
                      <p className="text-sm text-white font-bold leading-relaxed mt-1">
                        ITC Cempaka Mas Mega Grosir, Jl. Letjen Suprapto LT.6 No. 85
                      </p>
                      <p className="text-xs text-zinc-500 mt-1 font-mono">
                        Kec. Kemayoran, Kota Jakarta Pusat, DKI Jakarta 10640
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-850/60 pt-4 space-y-3 text-xs text-zinc-400">
                    <p>
                      <strong>Lantai 6 No. 85</strong>
                    </p>
                    <p className="text-[11px] leading-relaxed text-zinc-500">
                      Unit toko kami berada di Lantai 6 No. 85 untuk memberikan layanan servis hardware (mikrosoldering), showroom laptop bekas, perakitan PC, dan ketersediaan sparepart lengkap dalam satu lobi utama.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <button 
                      onClick={() => window.open("https://maps.app.goo.gl/kX7Y2Z9Yq96pE2WJ8", "_blank")}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest py-3.5 rounded cursor-pointer transition-colors text-center shadow-md hover:shadow-red-600/10"
                    >
                      Buka di Google Maps →
                    </button>
                    <button 
                      onClick={() => window.open("https://wa.me/6281319503899?text=Halo%20MKS%20Computer,%20saya%20mau%20minta%20ancer-ancer%20atau%20arah%20menuju%20ke%20toko%20MKS%20di%20ITC%20Cempaka%20Mas%20Lantai%206.", "_blank")}
                      className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-[10px] font-black uppercase tracking-widest py-3.5 rounded cursor-pointer transition-colors text-center"
                    >
                      Hubungi CS Toko
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "guide" && (
            <motion.div
              key="guide-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card 1: Private Vehicle */}
              <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-full group hover:border-zinc-700 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-6">
                    <Car className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">Kendaraan Pribadi (Mobil / Motor)</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Akses paling mudah melalui jalan raya bypass Jl. Letjen Suprapto atau Jl. Yos Sudarso.
                  </p>
                  
                  <div className="space-y-3 pt-2 border-t border-zinc-850/40 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-red-600/10 text-red-500 text-[9px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <p className="text-zinc-400 font-sans leading-relaxed text-[11px]">
                        <strong>Rute Tol:</strong> Keluar di pintu tol <strong>Cempaka Putih / Pulomas</strong>, lalu langsung ambil jalur kiri menuju ITC Cempaka Mas.
                      </p>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-red-600/10 text-red-500 text-[9px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <p className="text-zinc-400 font-sans leading-relaxed text-[11px]">
                        <strong>Parkir Optimal:</strong> Parkir di gedung parkir mobil lantai P6 agar dekat dengan akses masuk langsung ke Lantai 6 ITC.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-850/20 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                  <span>Akses Parkir Mudah</span>
                  <span className="text-red-500 font-bold">Lantai P6</span>
                </div>
              </div>

              {/* Card 2: TransJakarta Busway */}
              <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-full group hover:border-zinc-700 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-6">
                    <Bus className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">TransJakarta Busway (Sangat Praktis)</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Halte TJ Cempaka Mas merupakan halte integrasi besar yang menghubungkan rute utara-selatan dan timur-barat.
                  </p>
                  
                  <div className="space-y-3 pt-2 border-t border-zinc-850/40 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-red-600/10 text-red-500 text-[9px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <p className="text-zinc-400 font-sans leading-relaxed text-[11px]">
                        <strong>Koridor Utama:</strong> Gunakan <strong>Koridor 2</strong> (Harmoni - Pulo Gadung) atau <strong>Koridor 10</strong> (Tanjung Priok - PGC Cililitan).
                      </p>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-red-600/10 text-red-500 text-[9px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <p className="text-zinc-400 font-sans leading-relaxed text-[11px]">
                        <strong>Langkah Masuk:</strong> Turun di <strong>Halte Cempaka Mas</strong>, lalu berjalan melalui jembatan penyeberangan (JPO) terintegrasi langsung ke dalam mall ITC.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-850/20 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                  <span>Halte Terdekat</span>
                  <span className="text-red-500 font-bold">Cempaka Mas</span>
                </div>
              </div>

              {/* Card 3: Commuter Line & Online Transit */}
              <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-full group hover:border-zinc-700 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-6">
                    <Train className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">Kereta KRL & Transportasi Online</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Jika datang dari luar Jakarta menggunakan kereta komuter line KRL Jabodetabek.
                  </p>
                  
                  <div className="space-y-3 pt-2 border-t border-zinc-850/40 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-red-600/10 text-red-500 text-[9px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <p className="text-zinc-400 font-sans leading-relaxed text-[11px]">
                        <strong>Stasiun Transit KRL:</strong> Turun di <strong>Stasiun Kemayoran</strong> atau <strong>Stasiun Kramat</strong> (Rute Lingkar Cikarang/Bekasi).
                      </p>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-red-600/10 text-red-500 text-[9px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <p className="text-zinc-400 font-sans leading-relaxed text-[11px]">
                        <strong>Koneksi Ojek:</strong> Dari stasiun, gunakan ojek online/taksi sejauh 10-15 menit langsung ke lobby utama utara ITC Cempaka Mas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-850/20 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                  <span>Stasiun Terdekat</span>
                  <span className="text-red-500 font-bold">Stasiun Kemayoran</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "coverage" && (
            <motion.div
              key="coverage-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              
              {/* Pickup & Delivery header and Search Bar */}
              <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-red-500" />
                    <h3 className="text-sm font-black text-white uppercase tracking-wide">
                      Layanan Antar-Jemput Laptop Se-Jabodetabek
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">
                    Malas keluar rumah atau tidak punya waktu luang? Tim kurir internal MKS siap menjemput laptop rusak Anda di rumah/kantor dan mengantarkannya kembali setelah beres diservis.
                  </p>
                </div>

                {/* Interactive Search Bar filter */}
                <div className="relative w-full md:w-80">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-550">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Cari kecamatan / daerah Anda..."
                    value={searchDistrict}
                    onChange={handleSearchChange}
                    className="w-full bg-zinc-950 text-xs border border-zinc-800 focus:border-red-500 rounded py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* District City Pills Filter */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {["Semua", "Jakarta Pusat", "Jakarta Utara", "Jakarta Timur", "Jakarta Barat & Selatan", "Bekasi & Tangerang"].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCityFilter(city)}
                    className={`px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                      selectedCityFilter === city
                        ? "bg-red-600/10 text-red-400 border-red-500/20"
                        : "bg-zinc-950 text-zinc-550 hover:text-zinc-300 border-zinc-850"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Coverage Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoverage.map((cov) => (
                  <div
                    key={cov.city}
                    className="bg-zinc-900/40 border border-zinc-850 p-5 rounded-xl flex flex-col justify-between h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-red-600/5 rounded-full blur-[30px] pointer-events-none"></div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-black">WILAYAH CAKUPAN</span>
                          <h4 className="text-sm font-black text-white uppercase tracking-wide mt-0.5">{cov.city}</h4>
                        </div>
                        
                        <span className={`text-[8px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                          cov.status === "Sangat Cepat"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : cov.status === "Normal"
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}>
                          {cov.status}
                        </span>
                      </div>

                      <div className="bg-zinc-950 p-3 rounded border border-zinc-850 text-[10px] font-mono space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Estimasi Pickup:</span>
                          <strong className="text-zinc-300">{cov.eta}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Tarif Ongkir:</span>
                          <strong className="text-red-400">{cov.fee}</strong>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Kecamatan Tercover:</span>
                        <div className="flex flex-wrap gap-1">
                          {cov.districts.map((dist) => (
                            <span
                              key={dist}
                              className="text-[10px] bg-zinc-950 border border-zinc-850/80 px-2 py-0.5 rounded text-zinc-400 font-sans"
                            >
                              {dist}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const text = `Halo Admin MKS Computer, saya ingin request layanan jemput-antar servis laptop. Lokasi rumah saya berada di daerah *${cov.city}* (Kecamatan: _klik di sini untuk ketik kecamatan_). Bagaimana prosedurnya?`;
                        window.open(`https://wa.me/6281319503899?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
                      }}
                      className="mt-6 w-full bg-zinc-950 hover:bg-zinc-900 text-[9px] font-black uppercase tracking-wider py-2.5 rounded border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Request Pickup Kurir</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                  </div>
                ))}

                {filteredCoverage.length === 0 && (
                  <div className="col-span-full bg-zinc-900/10 border border-zinc-850 rounded-xl p-8 text-center space-y-3">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto" />
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">Kecamatan Tidak Ditemukan</h4>
                    <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                      Jangan khawatir! Hubungi tim customer service kami via WhatsApp untuk mengecek cakupan khusus di luar area daftar di atas.
                    </p>
                    <button
                      onClick={() => window.open("https://wa.me/6281319503899?text=Halo%20Admin%20MKS%20Computer,%20apakah%20daerah%20tempat%20tinggal%20saya%20bisa%20tercover%20layanan%20jemput-antar%20servis%20laptop?", "_blank")}
                      className="bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded cursor-pointer transition-colors"
                    >
                      Tanya Manual via WA
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Help & Bottom Info Section */}
        <div className="mt-16 bg-gradient-to-r from-red-950/10 to-zinc-950/20 border border-zinc-850 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
              <Compass className="h-6 w-6 animate-spin-slow" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wide">
                Butuh Pemandu Cepat? Hubungi CS Toko Sekarang
              </h4>
              <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed max-w-xl">
                Tersesat saat mencari unit toko MKS di dalam ITC Cempaka Mas? Kirimkan pesan singkat ke WhatsApp kami, tim front-office kami akan memandu Anda secara langsung dari titik lobi manapun.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const text = `Halo Admin MKS Computer, saya sudah sampai di ITC Cempaka Mas dan ingin bertanya rute tercepat ke toko MKS di Lantai 6.`;
              window.open(`https://wa.me/6281319503899?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
            }}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded transition-colors cursor-pointer shrink-0 text-center shadow-lg hover:shadow-emerald-600/10"
          >
            Minta Panduan Rute (WhatsApp)
          </button>
        </div>

      </div>
    </section>
  );
}
