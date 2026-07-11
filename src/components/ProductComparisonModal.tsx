import React from "react";
import { Product } from "../types";
import { X, Check, Star, MessageCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface ProductComparisonModalProps {
  productA: Product;
  productB: Product;
  onClose: () => void;
  onAskWhatsApp: (product: Product) => void;
  formatRupiah: (price: number) => string;
}

export default function ProductComparisonModal({
  productA,
  productB,
  onClose,
  onAskWhatsApp,
  formatRupiah,
}: ProductComparisonModalProps) {
  // Find specs overlap and differences
  const allSpecs = Array.from(new Set([...productA.specs, ...productB.specs]));

  const isACheaper = productA.price < productB.price;
  const isBCheaper = productB.price < productA.price;

  const isARatedHigher = productA.rating > productB.rating;
  const isBRatedHigher = productB.rating > productA.rating;

  return (
    <div
      id="product-comparison-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative bg-zinc-950 border border-zinc-850 w-full max-w-4xl rounded shadow-2xl overflow-hidden my-8 glow-red flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-850 p-5 bg-zinc-900/60 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></span>
            <h3 className="text-sm font-black uppercase text-white tracking-wider">
              Bandingkan Spesifikasi Produk
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded border border-zinc-800 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1 font-sans">
          
          {/* Side-by-Side Hero Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 border-b border-zinc-850 pb-6">
            
            {/* Product A Card */}
            <div className="bg-zinc-900/20 border border-zinc-850/60 rounded-xl p-4 flex flex-col justify-between relative group hover:border-red-500/20 transition-all">
              <span className="absolute top-3 left-3 bg-red-600 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg text-white">
                Produk A
              </span>
              <div>
                <div className="aspect-video w-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-850 mb-4 mt-4">
                  <img
                    src={productA.image}
                    alt={productA.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-mono">
                  {productA.brand}
                </div>
                <h4 className="text-xs md:text-sm font-black text-white uppercase tracking-tight mt-1 line-clamp-2">
                  {productA.name}
                </h4>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-850/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs md:text-sm font-black font-mono text-white">
                  {formatRupiah(productA.price)}
                </span>
                <button
                  onClick={() => onAskWhatsApp(productA)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider py-2 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageCircle className="h-3 w-3" />
                  Pesan Part
                </button>
              </div>
            </div>

            {/* Product B Card */}
            <div className="bg-zinc-900/20 border border-zinc-850/60 rounded-xl p-4 flex flex-col justify-between relative group hover:border-red-500/20 transition-all">
              <span className="absolute top-3 left-3 bg-red-600 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg text-white">
                Produk B
              </span>
              <div>
                <div className="aspect-video w-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-850 mb-4 mt-4">
                  <img
                    src={productB.image}
                    alt={productB.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-mono">
                  {productB.brand}
                </div>
                <h4 className="text-xs md:text-sm font-black text-white uppercase tracking-tight mt-1 line-clamp-2">
                  {productB.name}
                </h4>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-850/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs md:text-sm font-black font-mono text-white">
                  {formatRupiah(productB.price)}
                </span>
                <button
                  onClick={() => onAskWhatsApp(productB)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider py-2 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageCircle className="h-3 w-3" />
                  Pesan Part
                </button>
              </div>
            </div>

          </div>

          {/* Comparison Matrix Table */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Matriks Perbandingan
            </h4>
            
            <div className="border border-zinc-850 rounded-lg overflow-hidden bg-zinc-950/40">
              
              {/* Row: Harga */}
              <div className="grid grid-cols-12 border-b border-zinc-850">
                <div className="col-span-4 p-3.5 bg-zinc-900/20 flex items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Harga Retail</span>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <div className="flex flex-col">
                    <span className="text-xs font-black font-mono text-white">{formatRupiah(productA.price)}</span>
                    {isACheaper && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 mt-1 self-start">
                        Lebih Hemat
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <div className="flex flex-col">
                    <span className="text-xs font-black font-mono text-white">{formatRupiah(productB.price)}</span>
                    {isBCheaper && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 mt-1 self-start">
                        Lebih Hemat
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Row: Rating */}
              <div className="grid grid-cols-12 border-b border-zinc-850">
                <div className="col-span-4 p-3.5 bg-zinc-900/20 flex items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Rating Kepuasan</span>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 text-xs font-bold text-white font-mono">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 shrink-0" />
                      <span>{productA.rating} / 5</span>
                    </div>
                    {isARatedHigher && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20 font-mono">
                        Tertinggi
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 text-xs font-bold text-white font-mono">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 shrink-0" />
                      <span>{productB.rating} / 5</span>
                    </div>
                    {isBRatedHigher && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20 font-mono">
                        Tertinggi
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Row: Brand */}
              <div className="grid grid-cols-12 border-b border-zinc-850">
                <div className="col-span-4 p-3.5 bg-zinc-900/20 flex items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Brand / Pabrikan</span>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <span className="text-xs text-zinc-300 font-mono uppercase font-bold">{productA.brand}</span>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <span className="text-xs text-zinc-300 font-mono uppercase font-bold">{productB.brand}</span>
                </div>
              </div>

              {/* Row: Kategori */}
              <div className="grid grid-cols-12 border-b border-zinc-850">
                <div className="col-span-4 p-3.5 bg-zinc-900/20 flex items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Kategori</span>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <span className="text-xs text-zinc-400 font-mono uppercase font-semibold">
                    {productA.category === "gaming-pc" ? "Rakit PC" : productA.category}
                  </span>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <span className="text-xs text-zinc-400 font-mono uppercase font-semibold">
                    {productB.category === "gaming-pc" ? "Rakit PC" : productB.category}
                  </span>
                </div>
              </div>

              {/* Row: Stok */}
              <div className="grid grid-cols-12 border-b border-zinc-850">
                <div className="col-span-4 p-3.5 bg-zinc-900/20 flex items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Ketersediaan Stok</span>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  {productA.stock <= 3 ? (
                    <span className="text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 text-[9px] font-mono font-bold">Stok Menipis ({productA.stock})</span>
                  ) : (
                    <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 text-[9px] font-mono font-bold">Tersedia ({productA.stock})</span>
                  )}
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  {productB.stock <= 3 ? (
                    <span className="text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 text-[9px] font-mono font-bold">Stok Menipis ({productB.stock})</span>
                  ) : (
                    <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 text-[9px] font-mono font-bold">Tersedia ({productB.stock})</span>
                  )}
                </div>
              </div>

              {/* Row: Deskripsi */}
              <div className="grid grid-cols-12 border-b border-zinc-850">
                <div className="col-span-4 p-3.5 bg-zinc-900/20 flex items-start">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mt-0.5">Deskripsi Singkat</span>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{productA.description}</p>
                </div>
                <div className="col-span-4 p-3.5 border-l border-zinc-850">
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{productB.description}</p>
                </div>
              </div>

              {/* Row: Spesifikasi Teknis */}
              <div className="grid grid-cols-12">
                <div className="col-span-4 p-3.5 bg-zinc-900/20 flex items-start">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mt-1">Spesifikasi Detail</span>
                </div>
                
                {/* Specs Product A */}
                <div className="col-span-4 p-3.5 border-l border-zinc-850 space-y-1.5 font-mono">
                  {productA.specs.map((spec, i) => (
                    <div key={i} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Specs Product B */}
                <div className="col-span-4 p-3.5 border-l border-zinc-850 space-y-1.5 font-mono">
                  {productB.specs.map((spec, i) => (
                    <div key={i} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Quick Support Reminder Foot */}
          <div className="p-4 bg-zinc-900/30 border border-zinc-850 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center border border-red-500/20 shrink-0 text-red-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-black text-white uppercase">Butuh Konsultasi Tambahan?</h5>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Tanyakan langsung pada Teknisi handal MKS Computer untuk menentukan part terbaik.</p>
              </div>
            </div>
            <button
              onClick={() => {
                const text = `Halo Admin MKS Computer, saya sedang membandingkan *${productA.name}* dengan *${productB.name}*. Boleh tolong berikan rekomendasi mana yang lebih cocok untuk kebutuhan saya? Terima kasih.`;
                window.open(`https://wa.me/6281319503899?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
              }}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-5 py-3 rounded flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi Rekomendasi
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
