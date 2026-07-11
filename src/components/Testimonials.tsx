import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  service: string;
  comment: string;
  rating: number;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Aris Munandar",
    role: "Verified Customer",
    service: "Servis Asus ROG - Overheat & Repaste",
    comment: "Sangat puas servis laptop ROG di sini. Sebelum servis sering thermal throttling pas main game berat. Setelah dibersihkan fan-nya dan ganti thermal paste Honeywell PTM7950, suhu turun sampai 15 derajat! Teknisi ramah dan transparan banget, bisa ditunggu langsung.",
    rating: 5,
    date: "1 minggu yang lalu"
  },
  {
    id: 2,
    name: "Siti Rahmawati",
    role: "Office Professional",
    service: "MacBook Air M1 - Ganti LCD Pecah",
    comment: "Kaget banget pas layar MacBook ketindih barang sampai retak dan bergaris. Tanya ke iBox harganya selangit dan inden lama. Untung direkomendasikan teman ke MKS Computer ITC Cempaka Mas. Ganti LCD langsung beres hari itu juga dengan harga jauh lebih bersahabat dan dapet garansi 1 bulan!",
    rating: 5,
    date: "3 hari yang lalu"
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Full-stack Developer",
    service: "Rakit PC Workstation & Gaming",
    comment: "Minta rekomendasi rakitan PC untuk development dan gaming tipis-tipis dengan budget 15 jutaan. Konsultasinya enak banget, detail dijelaskan kompatibilitasnya. Manajemen kabelnya sangat rapi, diuji benchmark dulu sebelum diserahkan. Sangat profesional!",
    rating: 5,
    date: "2 minggu yang lalu"
  },
  {
    id: 4,
    name: "Kevin Wijaya",
    role: "Graphic Designer",
    service: "Upgrade SSD & RAM ThinkPad",
    comment: "Laptop jadul ThinkPad saya tadinya lemot banget buat buka Photoshop. Setelah konsul, disarankan ganti SSD NVMe dan nambah RAM ke 16GB. Proses upgrade cuma makan waktu 30 menit dan hasilnya langsung kenceng banget kayak beli baru. Murah meriah tapi ngefek maksimal.",
    rating: 5,
    date: "1 bulan yang lalu"
  },
  {
    id: 5,
    name: "Dewi Lestari",
    role: "Content Creator",
    service: "PC Live Streaming - Setup & Clean",
    comment: "Langganan di sini buat maintenance PC editing video dan cleaning rutin. Pelayanannya konsisten ramah, harganya jujur tanpa ada biaya tersembunyi. Dikasih tips juga buat ngerawat PC biar gak gampang berdebu. Toko servis komputer paling recomended di Jakarta Pusat!",
    rating: 5,
    date: "2 minggu yang lalu"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Slide/Fade variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section id="testimonials" className="bg-zinc-950 py-16 lg:py-24 border-b border-zinc-900/60 relative overflow-hidden tech-grid">
      {/* Background glow matching the brand colors */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute left-[-5%] top-[-5%] w-[350px] h-[350px] bg-zinc-900/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[11px] mb-3 block">
            CUSTOMER TRUST & FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
            KATA <span className="text-red-600">MEREKA</span> YANG PUAS
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto leading-relaxed">
            Kepercayaan Anda adalah prioritas kami. Lihat testimoni asli dari pelanggan yang telah mempercayakan perbaikan laptop dan perakitan PC mereka kepada MKS Computer.
          </p>

          {/* Social Proof Badge */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-4 py-2 border border-zinc-850 rounded-full">
              <span className="text-amber-500 font-bold text-sm">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-zinc-500 text-xs">|</span>
              <span className="text-zinc-300 text-xs font-mono">520+ Google Reviews</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-4 py-2 border border-zinc-850 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="text-zinc-300 text-xs font-mono">100% Verified Customer</span>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="max-w-4xl mx-auto relative px-4 sm:px-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          
          {/* Main Review Window */}
          <div className="relative min-h-[340px] sm:min-h-[260px] bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-sm group">
            
            {/* Quote Icon Background decoration */}
            <Quote className="absolute right-8 top-6 h-20 w-20 text-zinc-850/50 pointer-events-none transform rotate-12 transition-transform group-hover:rotate-6 duration-500" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col h-full justify-between"
              >
                <div>
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex gap-1">
                      {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">
                      {TESTIMONIALS[currentIndex].date}
                    </span>
                  </div>

                  {/* Comment */}
                  <blockquote className="text-zinc-200 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    "{TESTIMONIALS[currentIndex].comment}"
                  </blockquote>
                </div>

                {/* Author Details & Serviced Item */}
                <div className="border-t border-zinc-850/80 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
                  <div>
                    <div className="flex items-center gap-2">
                      <cite className="not-italic font-bold text-white text-sm sm:text-base">
                        {TESTIMONIALS[currentIndex].name}
                      </cite>
                      <span className="h-1.5 w-1.5 bg-red-600 rounded-full"></span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {TESTIMONIALS[currentIndex].role}
                      </span>
                    </div>
                    <div className="text-xs text-red-500/90 font-medium mt-1 font-mono uppercase tracking-wider">
                      {TESTIMONIALS[currentIndex].service}
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500 uppercase tracking-widest font-black font-mono">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Verified
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {/* Left Button */}
          <button
            onClick={handlePrev}
            className="absolute left-[-16px] sm:left-[-24px] top-1/2 -translate-y-1/2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 shadow-lg hover:scale-105 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Button */}
          <button
            onClick={handleNext}
            className="absolute right-[-16px] sm:right-[-24px] top-1/2 -translate-y-1/2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel Dots Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex 
                    ? "w-8 bg-red-600" 
                    : "w-2 bg-zinc-800 hover:bg-zinc-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
        </div>

      </div>
    </section>
  );
}
