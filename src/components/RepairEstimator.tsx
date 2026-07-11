import React, { useState, useMemo, useEffect } from "react";
import { BRANDS, REPAIR_ISSUES } from "../data";
import { RepairIssue } from "../types";
import { Wrench, Check, ShieldAlert, Calendar, User, PhoneCall, CheckCircle2, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RepairEstimator() {
  const [selectedBrand, setSelectedBrand] = useState<string>(BRANDS[0]);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  
  // AI Calculation Simulation State
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Trigger calculation simulation on selection changes
  useEffect(() => {
    if (selectedIssueIds.length === 0) {
      setIsCalculating(false);
      return;
    }

    setIsCalculating(true);
    
    const steps = [
      `Menganalisis sistem ${selectedBrand}...`,
      "Mengkalkulasi biaya sparepart & suku cadang...",
      "Mengecek database stok MKS Computer...",
      "Menyusun rincian estimasi biaya..."
    ];
    setCalculationSteps(steps);
    setActiveStepIndex(0);

    const stepTimer1 = setTimeout(() => setActiveStepIndex(1), 250);
    const stepTimer2 = setTimeout(() => setActiveStepIndex(2), 550);
    const stepTimer3 = setTimeout(() => setActiveStepIndex(3), 850);
    const finishTimer = setTimeout(() => {
      setIsCalculating(false);
    }, 1100);

    return () => {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(finishTimer);
    };
  }, [selectedBrand, selectedIssueIds]);
  
  // Appointment Form State
  const [customerName, setCustomerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const toggleIssue = (id: string) => {
    setSelectedIssueIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const selectedIssues = useMemo(() => {
    return REPAIR_ISSUES.filter((issue) => selectedIssueIds.includes(issue.id));
  }, [selectedIssueIds]);

  const { minTotal, maxTotal, maxDuration } = useMemo(() => {
    let min = 0;
    let max = 0;
    let durationString = "30 - 60 Menit";

    if (selectedIssues.length > 0) {
      selectedIssues.forEach((issue) => {
        min += issue.basePriceMin;
        max += issue.basePriceMax;
      });

      // Simple heuristic for cumulative duration
      const hasMatiTotal = selectedIssues.some((i) => i.id === "rep-4");
      if (hasMatiTotal) {
        durationString = "2 - 5 Hari Kerja (Analisis Motherboard)";
      } else if (selectedIssues.length > 2) {
        durationString = "1 Hari Kerja";
      } else {
        durationString = "1 - 3 Jam (Bisa Ditunggu)";
      }
    }

    return { minTotal: min, maxTotal: max, maxDuration: durationString };
  }, [selectedIssues]);

  // Brand-specific warning/advice
  const brandAdvice = useMemo(() => {
    if (selectedBrand === "Apple MacBook") {
      return "Sistem Apple MacBook menggunakan arsitektur logic board terintegrasi. Memerlukan solder mikro-elektronika presisi tingkat tinggi dan komponen IC asli. Estimasi biaya pengerjaan dapat bervariasi bergantung pada ketersediaan suku cadang Apple original.";
    }
    if (selectedBrand.includes("ROG") || selectedBrand.includes("Legion") || selectedBrand.includes("Predator") || selectedBrand.includes("Omen") || selectedBrand.includes("MSI")) {
      return "Laptop Gaming berperforma tinggi memiliki sistem pendinginan dual-fan heatsink yang kompleks serta thermal pad tebal. Kami merekomendasikan penggantian thermal paste kualitas premium (seperti Liquid Metal atau Honeywell PTM) agar performa termal kembali dingin dan tidak bottlenecking saat bermain game.";
    }
    return "Laptop reguler standar umumnya memiliki komponen yang modular dan ramah upgrade. Pengerjaan pembersihan debu, pergantian SSD, RAM, keyboard, maupun LCD dapat diselesaikan secara kilat dalam hitungan jam.";
  }, [selectedBrand]);

  const handleConsultWithWhatsApp = () => {
    if (selectedIssues.length === 0) return;
    
    const issueListStr = selectedIssues.map(i => `- ${i.name}`).join("\n");
    const text = `Halo MKS Computer! Saya memiliki laptop merek *${selectedBrand}* dengan kendala berikut:\n${issueListStr}\n\nMohon informasi estimasi biaya perbaikan dan ketersediaan part. Terima kasih!`;
    const waUrl = `https://wa.me/6281319503899?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !whatsapp || !appointmentDate) return;

    // Generate simulated booking code
    const randomCode = `MKS-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(randomCode);
    setIsBooked(true);
  };

  const resetBooking = () => {
    setIsBooked(false);
    setCustomerName("");
    setWhatsapp("");
    setAppointmentDate("");
    setSelectedIssueIds([]);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section id="estimator" className="py-20 bg-zinc-950 border-b border-zinc-900/60 tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">INSTANT PRICING ENGINE</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            Estimasi Biaya <span className="text-red-500">Perbaikan & Servis</span>
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto">
            Pilih merk perangkat Anda dan centang jenis kerusakan untuk melihat rincian biaya transparan 
            dan waktu pengerjaan secara instan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column Left: Selector and Issues list */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Brand Selection */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-lg glow-red">
              <label className="block text-xs font-black uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-600 inline-block"></span>
                Langkah 1: Pilih Merk Laptop / Perangkat
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BRANDS.map((brand) => (
                  <button
                    key={brand}
                    id={`brand-btn-${brand.replace(/\s+/g, "-")}`}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-3 rounded-sm text-xs font-bold border transition-all text-left truncate cursor-pointer uppercase tracking-wider ${
                      selectedBrand === brand
                        ? "bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                        : "bg-zinc-950/80 text-zinc-400 border-zinc-850 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Issue Checklist */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-lg glow-red">
              <label className="block text-xs font-black uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-600 inline-block"></span>
                Langkah 2: Pilih Gejala / Kerusakan Laptop (Multi-Select)
              </label>
              <div className="space-y-3">
                {REPAIR_ISSUES.map((issue) => {
                  const isChecked = selectedIssueIds.includes(issue.id);
                  return (
                    <div
                      key={issue.id}
                      id={`issue-item-${issue.id}`}
                      onClick={() => toggleIssue(issue.id)}
                      className={`flex items-start gap-4 p-4 rounded-sm border transition-all cursor-pointer ${
                        isChecked
                          ? "bg-zinc-900/90 border-red-600/50"
                          : "bg-zinc-950/50 border-zinc-900 hover:border-zinc-800"
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-sm flex items-center justify-center border transition-all ${
                        isChecked 
                          ? "bg-red-600 border-red-500 text-white" 
                          : "border-zinc-750 bg-zinc-900"
                      }`}>
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className={`text-sm font-bold uppercase tracking-wide transition-colors ${isChecked ? "text-red-500" : "text-white"}`}>
                            {issue.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-zinc-400 shrink-0">
                            {formatRupiah(issue.basePriceMin)} - {formatRupiah(issue.basePriceMax)}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                          {issue.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brand Advice Box */}
            <div className="bg-zinc-900/20 border border-zinc-850/60 p-5 rounded-md flex gap-3.5 items-start">
              <ShieldAlert className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10px] uppercase font-black tracking-widest text-zinc-300 mb-1">
                  Catatan Khusus untuk {selectedBrand}
                </h5>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {brandAdvice}
                </p>
              </div>
            </div>

          </div>

          {/* Column Right: Live Pricing & Booking / Checkout Form */}
          <div className="lg:col-span-5">
            
            {/* Price Estimator Widget Panel */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-lg overflow-hidden sticky top-24 glow-red">
              
              {/* Header */}
              <div className="bg-zinc-950/80 p-6 border-b border-zinc-850">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">Ringkasan Estimasi</span>
                  <span className="px-2.5 py-0.5 rounded-sm bg-red-600/10 border border-red-500/20 text-red-500 text-[9px] font-bold uppercase tracking-wider">
                    {selectedBrand}
                  </span>
                </div>
                <h3 className="text-lg font-black uppercase text-white mt-1">Rincian Perbaikan</h3>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                
                {/* AI Processing Status */}
                <AnimatePresence mode="popLayout">
                  {isCalculating && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="bg-red-950/15 border border-red-900/30 rounded p-4 flex items-center gap-4 mb-2">
                        {/* Glowing dynamic loading spinner */}
                        <div className="relative flex items-center justify-center shrink-0">
                          <div className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-red-600 animate-spin"></div>
                          <div className="absolute w-4 h-4 rounded-full bg-red-600/20 animate-pulse"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest font-mono">MKS Pricing AI</span>
                            <span className="text-[9px] text-zinc-500 font-mono font-bold">{activeStepIndex + 1} / 4</span>
                          </div>
                          <p className="text-xs text-zinc-300 font-mono truncate mt-0.5 animate-pulse">
                            {calculationSteps[activeStepIndex]}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chosen Issues */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Kerusakan Terpilih</span>
                  {selectedIssues.length === 0 ? (
                    <div className="text-zinc-600 text-xs py-4 border border-dashed border-zinc-850 rounded bg-zinc-950/40 text-center">
                      Silakan centang kerusakan di samping kiri
                    </div>
                  ) : isCalculating ? (
                    /* Elegant Skeleton Screen loader for lists */
                    <div className="space-y-2">
                      {[...Array(Math.min(selectedIssues.length, 3))].map((_, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-zinc-950/40 p-2.5 rounded border border-zinc-850/50 animate-pulse">
                          <div className="h-3.5 bg-zinc-800 rounded w-1/2"></div>
                          <div className="h-3.5 bg-zinc-800/80 rounded w-1/4"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                      {selectedIssues.map((issue) => (
                        <div key={issue.id} className="flex justify-between items-center text-xs bg-zinc-950/80 p-2.5 rounded border border-zinc-850">
                          <span className="text-zinc-300 font-medium truncate max-w-[200px]">{issue.name}</span>
                          <span className="text-red-500 font-mono font-semibold shrink-0">
                            {formatRupiah(issue.basePriceMin)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing totals */}
                <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                  <div className="flex justify-between items-center text-zinc-400 text-xs">
                    <span className="uppercase tracking-wider font-bold">Estimasi Durasi</span>
                    {isCalculating ? (
                      <div className="h-4 w-24 bg-zinc-800 animate-pulse rounded"></div>
                    ) : (
                      <span className="text-white font-semibold font-mono">{selectedIssues.length > 0 ? maxDuration : "-"}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-zinc-400 text-xs pb-1 uppercase tracking-wider font-bold">Total Perkiraan</span>
                    <div className="text-right">
                      {isCalculating ? (
                        <div className="h-7 w-40 bg-zinc-800 animate-pulse rounded mb-1 ml-auto"></div>
                      ) : (
                        <div className="text-xl font-black text-red-500 font-mono">
                          {selectedIssues.length > 0 ? (
                            `${formatRupiah(minTotal)} - ${formatRupiah(maxTotal)}`
                          ) : (
                            "Rp 0"
                          )}
                        </div>
                      )}
                      <span className="text-[9px] text-zinc-500 block uppercase tracking-wide font-medium">Biaya termasuk jasa instalasi & part</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Consultation Action */}
                {selectedIssues.length > 0 && (
                  <button
                    onClick={handleConsultWithWhatsApp}
                    disabled={isCalculating}
                    className="w-full bg-zinc-950 hover:bg-zinc-900 text-red-500 hover:text-white border border-red-600/30 hover:border-red-500 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <MessageSquareText className="h-4 w-4 text-red-500 animate-pulse" />
                    KONSULTASIKAN VIA WHATSAPP
                  </button>
                )}

                {/* 3. Booking Offline Form */}
                <div className="pt-6 border-t border-zinc-800/80 space-y-4">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Form Reservasi Servis Offline</span>
                  
                  {isBooked ? (
                    <div className="bg-zinc-950/80 border border-green-600/30 p-5 rounded-lg text-center space-y-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Reservasi Berhasil Diagendakan!</h4>
                        <p className="text-[11px] text-zinc-500 mt-1">Simpan kode reservasi Anda di bawah untuk klaim antrean prioritas.</p>
                      </div>
                      <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">KODE RESERVASI</span>
                        <span className="text-lg font-mono font-black text-red-500 tracking-widest">{bookingCode}</span>
                      </div>
                      <div className="text-left text-[11px] text-zinc-500 space-y-1 bg-zinc-900/40 p-3 rounded border border-zinc-800/40">
                        <div><strong className="text-zinc-300">Nama:</strong> {customerName}</div>
                        <div><strong className="text-zinc-300">WA:</strong> {whatsapp}</div>
                        <div><strong className="text-zinc-300">Tanggal:</strong> {appointmentDate}</div>
                        <div><strong className="text-zinc-300">Laptop:</strong> {selectedBrand}</div>
                      </div>
                      <button
                        onClick={resetBooking}
                        className="text-xs text-zinc-400 hover:text-white underline font-medium cursor-pointer"
                      >
                        Buat Reservasi Baru
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleBooking} className="space-y-3">
                      <div>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                          <input
                            type="text"
                            required
                            disabled={selectedIssues.length === 0 || isCalculating}
                            placeholder="Nama Lengkap Anda"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-zinc-950 text-xs border border-zinc-850 rounded pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:opacity-50"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="relative">
                          <PhoneCall className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                          <input
                            type="tel"
                            required
                            disabled={selectedIssues.length === 0 || isCalculating}
                            placeholder="Nomor WhatsApp (Aktif)"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            className="w-full bg-zinc-950 text-xs border border-zinc-850 rounded pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                          <input
                            type="date"
                            required
                            disabled={selectedIssues.length === 0 || isCalculating}
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            className="w-full bg-zinc-950 text-xs border border-zinc-850 rounded pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={selectedIssues.length === 0 || isCalculating}
                        className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-widest shadow-md shadow-red-600/10 hover:shadow-red-600/20 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        Pesan Slot Servis & Dapatkan Antrean Prioritas
                      </button>
                    </form>
                  )}
                  
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
