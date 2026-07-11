import React from "react";
import { Wrench, Phone, MapPin, Clock, ShieldCheck, Cpu } from "lucide-react";
import MKSLogo from "./MKSLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer-section" className="bg-zinc-950 border-t border-zinc-900/60 pt-16 pb-8 text-zinc-400 tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScrollTo("estimator")}>
              <MKSLogo className="w-14 h-14 text-white -ml-2" />
              <div>
                <span className="font-display font-black text-lg tracking-tight text-white block">
                  MKS<span className="text-red-500"> COMPUTER</span>
                </span>
                <span className="font-mono text-[9px] text-zinc-550 tracking-widest block -mt-1 uppercase">
                  Cempaka Mas
                </span>
              </div>
            </div>
            
            <p className="text-xs text-zinc-500 leading-relaxed">
              Pusat perbaikan notebook, servis laptop, dan perakitan PC Gaming profesional bergaransi resmi. 
              Melayani dengan transparan, jujur, dan berteknologi tinggi.
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-400 font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-red-500" />
              <span>Teknisi Bersertifikasi</span>
            </div>
          </div>

          {/* Col 2: Navigation Shortcuts */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 border-l-2 border-red-500 pl-2.5">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wide">
              <li>
                <button onClick={() => handleScrollTo("estimator")} className="hover:text-red-500 transition-colors cursor-pointer text-left">
                  Estimasi Biaya Servis
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("catalog")} className="hover:text-red-500 transition-colors cursor-pointer text-left">
                  Katalog Laptop & Part
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("builder")} className="hover:text-red-500 transition-colors cursor-pointer text-left">
                  Simulator Rakit PC
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/6281319503899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors text-left block"
                >
                  Hubungi via WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Store Schedule */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 border-l-2 border-red-500 pl-2.5">
              Jam Operasional
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-500 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-300 block uppercase text-[10px] tracking-wide">Senin - Sabtu:</span>
                  <span className="text-[11px] text-zinc-500 font-mono">09:00 - 19:00 WIB</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-800 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-500 block uppercase text-[10px] tracking-wide">Minggu / Hari Libur:</span>
                  <span className="text-[11px] text-zinc-500 font-mono">Tutup (Respon Lambat via WA)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Location & Contact */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 border-l-2 border-red-500 pl-2.5">
              Hubungi Kami
            </h4>
            <ul className="space-y-3.5 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  ITC CEMPAKA MAS MEGA GROSIR, Jl. Letjen Suprapto LT.6 No. 85, Cemp. Baru, Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10640
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-500 shrink-0" />
                <span className="font-mono">+62 813-1950-3899 (WhatsApp)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-zinc-900/60 text-center text-[10px] text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4 uppercase tracking-widest font-mono">
          <div>
            &copy; {currentYear} MKS COMPUTER CEMPAKA MAS. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-red-600 animate-pulse" />
            <span>Membangun Performa & Solusi IT Terbaik</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
