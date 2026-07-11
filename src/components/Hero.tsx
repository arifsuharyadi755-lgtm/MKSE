import React from "react";
import { Wrench, Cpu, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import MKSLogo from "./MKSLogo";

interface HeroProps {
  onExploreServices: () => void;
}

export default function Hero({ onExploreServices }: HeroProps) {
  const features = [
    {
      icon: Wrench,
      title: "Servis Kilat & Transparan",
      desc: "Perbaikan laptop, notebook, & MacBook langsung ditangani teknisi bersertifikat. Estimasi biaya jelas di awal.",
      badge: "Bergaransi"
    },
    {
      icon: Cpu,
      title: "Rakit PC Gaming & Kerja",
      desc: "Konsultasikan part terbaik, rakit rapi, cable management profesional, & uji stress-test benchmark sebelum dikirim.",
      badge: "Gratis Instalasi"
    },
    {
      icon: ShieldCheck,
      title: "Garansi Resmi Toko",
      desc: "Semua pergantian sparepart dan servis laptop/PC dijamin garansi resmi toko hingga 1 bulan penuh tanpa ribet.",
      badge: "100% Aman"
    }
  ];

  // Motion variants for staggering left content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom elegant ease-out
      },
    },
  };

  // Motion variants for right content card stagger
  const rightContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.35,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Slow ambient zoom-in for the background glow
  const glowVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="hero-section" className="relative bg-zinc-950 py-16 lg:py-24 overflow-hidden border-b border-zinc-900/60 tech-grid">
      {/* Visual background glows animated */}
      <motion.div 
        variants={glowVariants}
        initial="hidden"
        animate="visible"
        className="absolute -left-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"
      ></motion.div>
      <motion.div 
        variants={glowVariants}
        initial="hidden"
        animate="visible"
        className="absolute right-10 top-10 w-96 h-96 bg-red-900/5 rounded-full blur-[150px] pointer-events-none"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Hero Content with Immersive Typography) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-start">
              {/* Immersive Brand Logo & Badge */}
              <div id="hero-brand-pill" className="flex items-center gap-3 mb-4 bg-zinc-900/40 border border-zinc-850/60 px-4 py-2 rounded-full backdrop-blur-sm">
                <MKSLogo className="w-10 h-10 text-red-500 shrink-0" />
                <div className="leading-tight">
                  <span className="text-[10px] font-black tracking-wider text-white uppercase block">
                    MKS COMPUTER
                  </span>
                  <span className="text-[9px] font-mono text-zinc-550 uppercase block font-bold">
                    ITC CEMPAKA MAS
                  </span>
                </div>
              </div>

              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[11px] mb-3 block">
                MASTERING PERFORMANCE SINCE 2014
              </span>
              <h2 className="text-4xl sm:text-6xl font-black leading-[1.05] tracking-tighter text-white mb-6 uppercase">
                Vendor Produk Kebutuhan<br />
                Komputer & <span className="text-red-600">Service.</span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              Layanan reparasi laptop profesional, rakit PC gaming monster, dan toko hardware terlengkap dengan standar teknisi bersertifikat nasional. Berlokasi strategis di ITC Cempaka Mas.
            </motion.p>

            {/* Quick stats boxes from immersive mockup */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <div className="p-4 bg-zinc-900/60 border-l-4 border-red-600 flex flex-col justify-center min-w-[140px] rounded-r-md hover:bg-zinc-900 transition-colors duration-300">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Laptops Ready</span>
                <span className="text-2xl font-black font-mono text-white">142+</span>
              </div>
              <div className="p-4 bg-zinc-900/60 border-l-4 border-red-600 flex flex-col justify-center min-w-[140px] rounded-r-md hover:bg-zinc-900 transition-colors duration-300">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Repairs Done</span>
                <span className="text-2xl font-black font-mono text-white">8.4K</span>
              </div>
              <div className="p-4 bg-zinc-900/60 border-l-4 border-red-600 flex flex-col justify-center min-w-[140px] rounded-r-md hover:bg-zinc-900 transition-colors duration-300">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Garansi Servis</span>
                <span className="text-2xl font-black font-mono text-white">30 Hari</span>
              </div>
            </motion.div>

            {/* Interactive Actions */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="https://wa.me/6281319503899"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Hubungi WA Admin</span>
                <ChevronRight className="h-4 w-4 animate-pulse" />
              </a>
              <button
                onClick={onExploreServices}
                className="px-8 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Estimasi Biaya Servis</span>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column (High Tech Feature Cards) */}
          <motion.div 
            variants={rightContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-4"
          >
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, x: 4, borderColor: "rgba(220, 38, 38, 0.4)" }}
                  className="bg-zinc-900/30 border border-zinc-800/80 p-5 rounded-lg hover:border-red-600/30 glow-red transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/5 rotate-45 translate-x-8 -translate-y-8 pointer-events-none"></div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 rounded text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-black uppercase tracking-wider text-white">
                          {feat.title}
                        </h3>
                        <span className="text-[8px] bg-red-950 text-red-500 border border-red-900/50 px-1.5 py-0.5 font-bold uppercase tracking-widest rounded shrink-0">
                          {feat.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
