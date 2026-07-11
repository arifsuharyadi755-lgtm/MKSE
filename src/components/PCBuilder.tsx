import React, { useState, useMemo } from "react";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { Cpu, ShieldAlert, Check, Plus, Trash2, HelpCircle, MessageSquare, Award, ArrowRight, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";


interface ComponentSlot {
  type: "cpu" | "gpu" | "motherboard" | "ram" | "storage" | "psu" | "case" | "cooler";
  label: string;
  required: boolean;
}

export default function PCBuilder() {
  const [selectedParts, setSelectedParts] = useState<Record<string, Product>>({});
  const [activeSlot, setActiveSlot] = useState<string>("cpu");

  const slots: ComponentSlot[] = [
    { type: "cpu", label: "Prosesor (CPU)", required: true },
    { type: "motherboard", label: "Mainboard", required: true },
    { type: "gpu", label: "Kartu Grafis (GPU)", required: true },
    { type: "ram", label: "Memori (RAM)", required: true },
    { type: "storage", label: "Penyimpanan (SSD)", required: true },
    { type: "psu", label: "Power Supply (PSU)", required: true },
    { type: "case", label: "Casing", required: false },
    { type: "cooler", label: "Pendingin (Cooler)", required: false },
  ];

  const handleSelectPart = (slotType: string, product: Product) => {
    setSelectedParts((prev) => ({
      ...prev,
      [slotType]: product,
    }));
    
    // Auto-advance to the next incomplete slot
    const currentIndex = slots.findIndex((s) => s.type === slotType);
    if (currentIndex < slots.length - 1) {
      setActiveSlot(slots[currentIndex + 1].type);
    }
  };

  const handleRemovePart = (slotType: string) => {
    setSelectedParts((prev) => {
      const updated = { ...prev };
      delete updated[slotType];
      return updated;
    });
    setActiveSlot(slotType);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.category === "component" && p.componentType === activeSlot
    );
  }, [activeSlot]);

  const totalBuildPrice = useMemo(() => {
    return Object.keys(selectedParts).reduce((acc, key) => acc + selectedParts[key].price, 0);
  }, [selectedParts]);

  // Compatibility Warnings Check
  const compatibilityWarnings = useMemo(() => {
    const warnings: string[] = [];
    const cpu = selectedParts["cpu"];
    const mobo = selectedParts["motherboard"];
    const ram = selectedParts["ram"];

    if (cpu && mobo) {
      // Check Intel Socket
      if (cpu.name.includes("Intel Core") && !mobo.name.includes("LGA1700") && !mobo.brand.includes("Intel")) {
        warnings.push("⚠️ Prosesor Intel Core membutuhkan Motherboard Socket LGA1700 (seperti MSI PRO B760M).");
      }
      // Check AMD Ryzen Socket
      if (cpu.name.includes("Ryzen 5 5600") && mobo.name.includes("LGA1700")) {
        warnings.push("⚠️ Prosesor AMD Ryzen AM4 membutuhkan Motherboard Socket AM4 (seperti ASRock A520M).");
      }
      if (cpu.name.includes("Ryzen 7 7800X3D") && !mobo.name.includes("AM5") && !mobo.name.includes("B650")) {
        warnings.push("⚠️ Prosesor AMD Ryzen 7 7800X3D (AM5) membutuhkan Motherboard Socket AM5 (seperti MSI B650 Gaming WiFi).");
      }
    }

    if (mobo && ram) {
      if (mobo.name.includes("B760M") && ram.name.includes("DDR4")) {
        warnings.push("⚠️ Motherboard B760M DDR5 membutuhkan Memori RAM bertipe DDR5 (seperti Corsair Vengeance DDR5).");
      }
      if (mobo.name.includes("A520M") && ram.name.includes("DDR5")) {
        warnings.push("⚠️ Motherboard A520M AM4 membutuhkan Memori RAM bertipe DDR4 (seperti Kingston FURY DDR4).");
      }
    }

    return warnings;
  }, [selectedParts]);

  const handleSendBuildToWhatsApp = () => {
    if (Object.keys(selectedParts).length === 0) return;

    let partListStr = "";
    slots.forEach((slot) => {
      const part = selectedParts[slot.type];
      partListStr += `- ${slot.label}: ${part ? `${part.name} (${formatRupiah(part.price)})` : "Belum dipilih"}\n`;
    });

    const text = `Halo MKS Computer! Saya ingin berkonsultasi mengenai rakitan PC custom saya dengan rincian berikut:\n\n${partListStr}\n*Total Estimasi Harga*: ${formatRupiah(totalBuildPrice)}\n\nApakah komponen ini ready stock dan optimal?`;
    const url = `https://wa.me/6281319503899?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const totalSlots = slots.length;
  const selectedCount = Object.keys(selectedParts).length;
  const totalRequiredCount = slots.filter((s) => s.required).length;
  const selectedRequiredCount = slots.filter((s) => s.required && selectedParts[s.type]).length;
  const isBuildComplete = selectedRequiredCount === totalRequiredCount;
  
  const totalPercent = Math.round((selectedCount / totalSlots) * 100);
  const requiredPercent = Math.round((selectedRequiredCount / totalRequiredCount) * 100);

  return (
    <section id="builder" className="py-20 bg-zinc-950 border-b border-zinc-900/60 tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">CUSTOM PC CONFIGURATOR</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            Simulator <span className="text-red-500">Rakit PC Custom</span>
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto">
            Rakit PC Gaming flagship atau PC Workstation idaman Anda. Sistem cerdas kami akan mendeteksi kompatibilitas 
            part secara otomatis. Kirim hasilnya ke WhatsApp untuk konsultasi ketersediaan barang!
          </p>
        </div>

        {/* Progress Step Indicator */}
        <div className="max-w-5xl mx-auto mb-12 bg-zinc-900/30 border border-zinc-850/80 rounded-xl p-5 md:p-6 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.35)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[150px] bg-red-600/5 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                  isBuildComplete 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse"
                }`}>
                  {isBuildComplete ? "Siap Dirakit" : "Konfigurasi Belum Lengkap"}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {isBuildComplete 
                    ? "Semua komponen wajib telah dipilih!" 
                    : `Menunggu ${totalRequiredCount - selectedRequiredCount} komponen wajib lagi`}
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1.5 uppercase tracking-tight">
                PROGRES RAKITAN PC ANDA
              </h3>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <div className="bg-zinc-950/80 px-4 py-2.5 rounded border border-zinc-850 text-center min-w-[110px] flex-1 sm:flex-initial">
                <div className="text-[9px] text-zinc-500 uppercase font-black tracking-wider font-mono">Part Wajib</div>
                <div className={`text-base font-black font-mono mt-0.5 ${isBuildComplete ? "text-emerald-400" : "text-red-500"}`}>
                  {selectedRequiredCount} / {totalRequiredCount}
                </div>
              </div>
              <div className="bg-zinc-950/80 px-4 py-2.5 rounded border border-zinc-850 text-center min-w-[110px] flex-1 sm:flex-initial">
                <div className="text-[9px] text-zinc-500 uppercase font-black tracking-wider font-mono">Total Part</div>
                <div className="text-base font-black font-mono mt-0.5 text-zinc-300">
                  {selectedCount} / {totalSlots}
                </div>
              </div>
              <div className="bg-zinc-950/80 px-4 py-2.5 rounded border border-zinc-850 text-center min-w-[90px] flex-1 sm:flex-initial">
                <div className="text-[9px] text-zinc-500 uppercase font-black tracking-wider font-mono">Persentase</div>
                <div className={`text-base font-black font-mono mt-0.5 ${isBuildComplete ? "text-emerald-400" : "text-red-500"}`}>
                  {requiredPercent}%
                </div>
              </div>
            </div>
          </div>

          {/* Double Progress Bar (Required vs Total) */}
          <div className="space-y-3 mb-6 relative z-10">
            <div>
              <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5">
                <span>Kelengkapan Komponen Wajib</span>
                <span className={isBuildComplete ? "text-emerald-400" : "text-red-500"}>{requiredPercent}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-850">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${requiredPercent}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`h-full rounded-full ${isBuildComplete ? "bg-gradient-to-r from-emerald-600 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_10px_rgba(220,38,38,0.3)]"}`}
                />
              </div>
            </div>
          </div>

          {/* Step Chain Row */}
          <div className="border-t border-zinc-850/60 pt-5 relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {slots.map((slot, index) => {
                const part = selectedParts[slot.type];
                const isActive = activeSlot === slot.type;
                const isSelected = !!part;
                const isRequired = slot.required;

                return (
                  <button
                    key={slot.type}
                    onClick={() => setActiveSlot(slot.type)}
                    className={`p-2.5 rounded-sm border text-left transition-all duration-200 cursor-pointer relative group flex flex-col justify-between h-20 ${
                      isActive
                        ? "bg-zinc-900 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.15)]"
                        : isSelected
                        ? "bg-zinc-950/60 border-emerald-500/30 hover:border-emerald-500/50"
                        : "bg-zinc-950/20 border-zinc-850 hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[9px] font-mono font-bold text-zinc-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {isSelected ? (
                        <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                          <Check className="h-2.5 w-2.5 stroke-[4]" />
                        </span>
                      ) : isRequired ? (
                        <span className="text-[8px] font-bold text-red-500 uppercase bg-red-500/10 px-1.5 py-0.2 rounded-sm border border-red-500/20">
                          Wajib
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono font-bold text-zinc-600 uppercase bg-zinc-900 px-1 py-0.2 rounded-sm border border-zinc-850">
                          Ops
                        </span>
                      )}
                    </div>

                    <div className="mt-auto min-w-0 w-full">
                      <div className={`text-[10px] font-black uppercase tracking-wide truncate ${
                        isActive ? "text-red-500" : "text-zinc-400 group-hover:text-white"
                      }`}>
                        {slot.label.split(" (")[0]}
                      </div>
                      <div className="text-[9px] text-zinc-500 truncate mt-0.5 font-mono">
                        {part ? part.name : "Belum dipilih"}
                      </div>
                    </div>

                    {/* Active slot indicator pill */}
                    {isActive && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Build Slots (Workflow) */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-black text-zinc-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-600 inline-block"></span>
              Alur Komponen Perakitan
            </h3>

            {slots.map((slot) => {
              const part = selectedParts[slot.type];
              const isActive = activeSlot === slot.type;
              return (
                <div
                  key={slot.type}
                  id={`slot-${slot.type}`}
                  className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between border p-4 transition-all duration-200 rounded-sm ${
                    isActive
                      ? "bg-zinc-900/90 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      : "bg-zinc-950/40 border-zinc-850"
                  }`}
                >
                  <div 
                    onClick={() => setActiveSlot(slot.type)}
                    className="flex-1 flex items-center gap-4 cursor-pointer"
                  >
                    {/* Badge number */}
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center font-mono text-xs font-bold ${
                      part 
                        ? "bg-green-500/10 text-green-400 border border-green-500/30" 
                        : isActive 
                        ? "bg-red-600 text-white" 
                        : "bg-zinc-900 text-zinc-500 border border-zinc-850"
                    }`}>
                      {part ? <Check className="h-4 w-4 stroke-[3]" /> : slots.findIndex(s => s.type === slot.type) + 1}
                    </div>
 
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                          {slot.label}
                        </span>
                        {slot.required && (
                          <span className="text-[8px] text-red-500 font-bold uppercase bg-red-500/10 px-1.5 py-0.2 rounded-sm border border-red-500/20">Wajib</span>
                        )}
                      </div>
                      
                      {part ? (
                        <h4 className="text-sm font-bold text-white mt-0.5 uppercase tracking-wide">{part.name}</h4>
                      ) : (
                        <h4 className="text-sm text-zinc-650 italic mt-0.5">Belum dipilih</h4>
                      )}
                    </div>
                  </div>

                  {/* Actions / Price on slot */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-850/60">
                    {part ? (
                      <>
                        <span className="text-sm font-mono font-black text-red-500">
                          {formatRupiah(part.price)}
                        </span>
                        <button
                          onClick={() => handleRemovePart(slot.type)}
                          className="p-2 text-zinc-500 hover:text-red-550 hover:bg-zinc-900 rounded transition-colors cursor-pointer"
                          title="Hapus part"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setActiveSlot(slot.type)}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                          isActive
                            ? "bg-red-600 text-white"
                            : "bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-white border border-zinc-800"
                        }`}
                      >
                        Pilih Part
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Column: Part Selector and Spec Summary */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Component Selector Panel */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-lg p-6 glow-red">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-850 pb-3">
                <h4 className="text-xs font-black text-white uppercase tracking-widest">
                  Pilihan: {slots.find((s) => s.type === activeSlot)?.label}
                </h4>
                <span className="text-[9px] text-zinc-400 uppercase font-mono bg-zinc-950 px-2 py-0.5 rounded-sm">
                  {filteredProducts.length} SKU
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {filteredProducts.map((prod) => {
                  const isSelected = selectedParts[activeSlot]?.id === prod.id;
                  return (
                    <div
                      key={prod.id}
                      id={`builder-prod-${prod.id}`}
                      className={`p-3.5 rounded-sm border transition-all ${
                        isSelected
                          ? "bg-zinc-950 border-red-500/50"
                          : "bg-zinc-950/40 border-zinc-850 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex gap-3">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-12 h-12 object-cover rounded border border-zinc-850 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-white truncate uppercase tracking-wide">{prod.name}</h5>
                          <span className="text-xs font-mono font-black text-red-500 block mt-0.5">
                            {formatRupiah(prod.price)}
                          </span>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {prod.specs.slice(0, 3).map((spec, i) => (
                              <span key={i} className="text-[9px] bg-zinc-900 text-zinc-500 px-1.5 py-0.2 rounded-sm font-mono">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-end">
                        {isSelected ? (
                          <div className="flex items-center gap-1.5 text-[9px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-sm uppercase tracking-wider font-mono">
                            <Check className="h-3 w-3 stroke-[3]" /> Terpilih
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSelectPart(activeSlot, prod)}
                            className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-sm transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" /> Ambil Part
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-zinc-650 text-xs italic font-mono uppercase tracking-wide">
                    Maaf, komponen {activeSlot} habis.
                  </div>
                )}
              </div>
            </div>

            {/* 2. Build Summary Panel */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-lg overflow-hidden glow-red">
              
              {/* Head */}
              <div className="bg-zinc-950/80 p-6 border-b border-zinc-850">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-red-500" />
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Ringkasan Rakitan Anda</h4>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                
                {/* Warnings list */}
                {compatibilityWarnings.length > 0 && (
                  <div className="bg-red-600/10 border border-red-500/20 p-4 rounded-sm space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-red-400 font-mono">
                      <ShieldAlert className="h-4 w-4" />
                      Kompatibilitas Error Terdeteksi!
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1 pl-1 font-mono">
                      {compatibilityWarnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pricing totals */}
                <div className="flex justify-between items-end bg-zinc-950 p-4 rounded-sm border border-zinc-850">
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-zinc-500 block">Total Komponen ({Object.keys(selectedParts).length}/8)</span>
                    <span className="text-[10px] text-zinc-500 mt-1 block uppercase font-medium">Jasa Perakitan Gratis</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-mono font-black text-red-500">
                      {formatRupiah(totalBuildPrice)}
                    </span>
                  </div>
                </div>

                {/* Send Specs to WhatsApp Button */}
                {Object.keys(selectedParts).length > 0 ? (
                  <button
                    onClick={handleSendBuildToWhatsApp}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-widest py-3.5 transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Kirim Spesifikasi ke WhatsApp
                  </button>
                ) : (
                  <div className="text-center py-3.5 text-xs font-mono uppercase tracking-wider text-zinc-650 bg-zinc-950/40 rounded-sm border border-dashed border-zinc-850">
                    Pilih komponen untuk mengirim spesifikasi ke WhatsApp
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
