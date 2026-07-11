import React, { useState, useMemo } from "react";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { Search, ShoppingBag, Star, HelpCircle, Eye, X, MessageCircleQuestion, CheckCircle2, SlidersHorizontal, ArrowUpDown, RefreshCw, GitCompare } from "lucide-react";
import ProductComparisonModal from "./ProductComparisonModal";

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(25000000);
  const [sortBy, setSortBy] = useState<string>("default"); // default, price-asc, price-desc, rating
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  const handleToggleCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 2) {
        setCompareList([compareList[0], product]);
      } else {
        setCompareList([...compareList, product]);
      }
    }
  };

  const categories = [
    { id: "all", label: "Semua Produk" },
    { id: "laptop", label: "Laptop / Notebook" },
    { id: "gaming-pc", label: "Rakit PC" },
    { id: "component", label: "Komponen PC" },
    { id: "accessories", label: "Aksesoris" },
  ];

  // Dynamically compute product count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((prod) => {
      const matchCategory = selectedCategory === "all" || prod.category === selectedCategory;
      const matchPrice = prod.price <= maxPrice;
      const matchSearch = 
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.specs.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchPrice && matchSearch;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setMaxPrice(25000000);
    setSortBy("default");
  };

  const handleAskWhatsApp = (prod: Product) => {
    const text = `Halo MKS Computer, saya tertarik dengan produk *${prod.name}* seharga *${formatRupiah(prod.price)}* yang tercantum di website Anda. Apakah produk ini ready stock?`;
    const url = `https://wa.me/6281319503899?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setDetailProduct(null); // Close modal
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section id="catalog" className="py-20 bg-zinc-950 border-b border-zinc-900/60 tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">HARDWARE & DEVICES</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase mb-4">
            Katalog Produk <span className="text-red-500">Toko Komputer</span>
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto">
            Jelajahi laptop harian, laptop gaming flagship, komponen PC modding, hingga aksesoris esports premium bersertifikasi garansi resmi.
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filter Panel */}
          <div className="lg:col-span-3 space-y-6 bg-zinc-900/20 border border-zinc-850 p-5 rounded-xl sticky top-24 backdrop-blur-sm shadow-xl">
            
            {/* Title / Reset Header */}
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
              <div className="flex items-center gap-2 text-white">
                <SlidersHorizontal className="h-4 w-4 text-red-500" />
                <span className="text-xs font-black uppercase tracking-wider">Filter Pencarian</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset Semua"
              >
                <RefreshCw className="h-3 w-3" />
                Reset
              </button>
            </div>

            {/* 1. Search input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Cari Produk</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Ketik tipe atau nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 text-xs border border-zinc-850 rounded-sm pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-sans"
                />
              </div>
            </div>

            {/* 2. Category list */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Kategori</label>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count = categoryCounts[cat.id] || 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-[11px] font-black uppercase tracking-wider rounded-sm transition-all text-left cursor-pointer border ${
                        isActive
                          ? "bg-red-600/10 border-red-600 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                          : "bg-zinc-950/40 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-800 hover:bg-zinc-900/30"
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        isActive ? "bg-red-600 text-white" : "bg-zinc-900 text-zinc-500"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Price Filter Slider */}
            <div className="space-y-3.5 border-t border-zinc-850/60 pt-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <span>Budget Maksimal</span>
                <span className="text-red-500 font-mono font-black">{formatRupiah(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="300000"
                max="25000000"
                step="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600 h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer border border-zinc-850"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-600 font-bold">
                <span>Rp 300K</span>
                <span>Rp 25M</span>
              </div>
              
              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                <button
                  onClick={() => setMaxPrice(1000000)}
                  className={`px-2 py-1 text-[8px] font-black uppercase tracking-wider rounded-sm border transition-colors cursor-pointer ${
                    maxPrice === 1000000
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-white hover:border-zinc-800"
                  }`}
                >
                  &lt; 1 Jt
                </button>
                <button
                  onClick={() => setMaxPrice(5000000)}
                  className={`px-2 py-1 text-[8px] font-black uppercase tracking-wider rounded-sm border transition-colors cursor-pointer ${
                    maxPrice === 5000000
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-white hover:border-zinc-800"
                  }`}
                >
                  &lt; 5 Jt
                </button>
                <button
                  onClick={() => setMaxPrice(12000000)}
                  className={`px-2 py-1 text-[8px] font-black uppercase tracking-wider rounded-sm border transition-colors cursor-pointer ${
                    maxPrice === 12000000
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-white hover:border-zinc-800"
                  }`}
                >
                  &lt; 12 Jt
                </button>
                <button
                  onClick={() => setMaxPrice(25000000)}
                  className={`px-2 py-1 text-[8px] font-black uppercase tracking-wider rounded-sm border transition-colors cursor-pointer ${
                    maxPrice === 25000000
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-white hover:border-zinc-800"
                  }`}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* 4. Sorting dropdown */}
            <div className="space-y-2 border-t border-zinc-850/60 pt-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Urutkan</label>
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-3 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-zinc-950 text-[11px] font-black uppercase tracking-wider border border-zinc-850 rounded-sm pl-9 pr-8 py-3 text-white focus:outline-none focus:border-red-500 appearance-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Harga: Rendah ke Tinggi</option>
                  <option value="price-desc">Harga: Tinggi ke Rendah</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

          </div>

          {/* Right Main Column: Active filters & Product Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Active Filters Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/10 border border-zinc-850/80 p-4 rounded-xl">
              <div className="text-xs text-zinc-400 font-mono">
                Menampilkan <span className="text-white font-bold">{filteredProducts.length}</span> dari <span className="text-zinc-500 font-bold">{PRODUCTS.length}</span> produk
              </div>

              {/* Active clearable filter pill labels */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory !== "all" && (
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="flex items-center gap-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    Kategori: {categories.find(c => c.id === selectedCategory)?.label.split(" /")[0]}
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
                {maxPrice < 25000000 && (
                  <button
                    onClick={() => setMaxPrice(25000000)}
                    className="flex items-center gap-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    Budget &lt; {formatRupiah(maxPrice)}
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="flex items-center gap-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    Cari: "{searchQuery}"
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
                {sortBy !== "default" && (
                  <button
                    onClick={() => setSortBy("default")}
                    className="flex items-center gap-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    Urutan: {sortBy === "price-asc" ? "Termurah" : sortBy === "price-desc" ? "Termahal" : "Rating"}
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  id={`prod-card-${prod.id}`}
                  className="group bg-zinc-900/30 border border-zinc-800/80 hover:border-red-500/30 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 glow-red"
                >
                  
                  {/* Product Image */}
                  <div className="relative aspect-video bg-zinc-950 overflow-hidden shrink-0">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-zinc-950/95 border border-zinc-850 text-[8px] uppercase font-black text-zinc-400 tracking-wider">
                      {prod.brand}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex-1 flex flex-col font-sans">
                    {/* Category Badge & Stars */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[9px] text-red-500 font-black uppercase tracking-widest">
                        {prod.category === "gaming-pc" ? "Rakit PC" : prod.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 shrink-0" />
                        <span>{prod.rating}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-black uppercase text-white group-hover:text-red-500 transition-colors line-clamp-1 mb-2 tracking-wide">
                      {prod.name}
                    </h3>

                    {/* Specifications short list */}
                    <ul className="text-[10px] text-zinc-500 space-y-1 mb-5 flex-1 font-mono">
                      {prod.specs.slice(0, 3).map((spec, i) => (
                        <li key={i} className="truncate list-disc list-inside">
                          {spec}
                        </li>
                      ))}
                    </ul>

                    {/* Stock Indicator */}
                    <div className="text-[11px] mb-3 flex items-center gap-1.5 font-bold uppercase tracking-wider font-mono">
                      {prod.stock <= 3 ? (
                        <span className="text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 text-[8px]">Stok Menipis ({prod.stock})</span>
                      ) : (
                        <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 text-[8px]">Tersedia ({prod.stock})</span>
                      )}
                    </div>

                    {/* Bottom Row Pricing & Action */}
                    <div className="pt-3 border-t border-zinc-850/60 flex items-center justify-between gap-2">
                      <div className="font-mono text-xs font-black text-white">
                        {formatRupiah(prod.price)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleCompare(prod)}
                          className={`p-2.5 rounded border transition-colors cursor-pointer flex items-center justify-center ${
                            compareList.some((p) => p.id === prod.id)
                              ? "bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                              : "bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border-zinc-850 hover:border-zinc-700"
                          }`}
                          title={compareList.some((p) => p.id === prod.id) ? "Batal Bandingkan" : "Bandingkan Spesifikasi"}
                        >
                          <GitCompare className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDetailProduct(prod)}
                          className="p-2.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded border border-zinc-850 hover:border-zinc-700 transition-colors cursor-pointer"
                          title="Lihat Detail"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-20 bg-zinc-900/10 rounded-lg border border-dashed border-zinc-850">
                  <ShoppingBag className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Produk tidak ditemukan.</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 text-xs font-black text-red-500 hover:text-red-400 uppercase tracking-widest underline cursor-pointer"
                  >
                    Reset Filter & Pencarian
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Product Detail Modal */}
      {detailProduct && (
        <div id="product-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-zinc-950 border border-zinc-850 w-full max-w-2xl rounded shadow-2xl overflow-hidden flex flex-col md:flex-row glow-red">
            
            {/* Close Button */}
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded border border-zinc-800 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              
              {/* Left Column Image */}
              <div className="relative aspect-square md:aspect-auto bg-zinc-950 border-r border-zinc-850">
                <img
                  src={detailProduct.image}
                  alt={detailProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column Info */}
              <div className="p-6 flex flex-col justify-between max-h-[500px] overflow-y-auto bg-zinc-900/40">
                <div>
                  {/* Category and brand */}
                  <span className="text-[9px] text-red-500 font-black uppercase tracking-widest block">
                    {detailProduct.category}
                  </span>
                  <h3 className="text-base font-black text-white mt-1 uppercase tracking-wide">
                    {detailProduct.name}
                  </h3>
                  <div className="text-xs font-mono text-zinc-500 mt-2 uppercase">
                    Brand: {detailProduct.brand}
                  </div>

                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                    {detailProduct.description}
                  </p>

                  {/* Specifications Full list */}
                  <div className="mt-5">
                    <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">Spesifikasi Detail:</h4>
                    <ul className="space-y-1.5 font-mono">
                      {detailProduct.specs.map((spec, i) => (
                        <li key={i} className="text-[11px] text-zinc-400 flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Pricing & AI Bridge */}
                <div className="pt-6 border-t border-zinc-850 mt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Harga Retail</span>
                    <span className="text-lg font-mono font-black text-red-500">
                      {formatRupiah(detailProduct.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAskWhatsApp(detailProduct)}
                    className="w-full bg-zinc-950 hover:bg-zinc-900 text-red-500 hover:text-white border border-red-600/30 hover:border-red-500 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircleQuestion className="h-4 w-4 text-red-500" />
                    Tanyakan Stok & Spesifikasi (WhatsApp)
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Floating Comparison Tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xl bg-zinc-950/95 border border-red-500/40 rounded-xl px-5 py-4 backdrop-blur-md shadow-[0_0_50px_rgba(239,68,68,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto py-1">
            <div className="flex -space-x-2">
              {compareList.map((item) => (
                <div key={item.id} className="relative group shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-950 overflow-hidden shadow-lg">
                    <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => handleToggleCompare(item)}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[8px] border border-zinc-900 hover:bg-red-500 cursor-pointer"
                    title="Hapus"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </div>
              ))}
              {compareList.length < 2 && (
                <div className="w-10 h-10 rounded-full border-2 border-zinc-850 border-dashed bg-zinc-900/40 flex items-center justify-center text-zinc-500 font-mono text-[10px] font-bold">
                  +1
                </div>
              )}
            </div>
            
            <div className="min-w-0 flex-1">
              <h5 className="text-[10px] font-black uppercase text-white tracking-wider">Perbandingan</h5>
              <p className="text-[9px] text-zinc-400 font-mono truncate">
                {compareList.length === 1 
                  ? "Pilih 1 produk lagi untuk dibandingkan" 
                  : `${compareList[0].brand} vs ${compareList[1].brand}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setCompareList([])}
              className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border border-zinc-800"
            >
              Batal
            </button>
            <button
              disabled={compareList.length < 2}
              onClick={() => setShowComparisonModal(true)}
              className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                compareList.length === 2
                  ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "bg-zinc-900 text-zinc-600 border border-zinc-850 cursor-not-allowed"
              }`}
            >
              <GitCompare className="h-3.5 w-3.5" />
              Bandingkan ({compareList.length}/2)
            </button>
          </div>
        </div>
      )}

      {/* Comparison Details Modal */}
      {showComparisonModal && compareList.length === 2 && (
        <ProductComparisonModal
          productA={compareList[0]}
          productB={compareList[1]}
          onClose={() => setShowComparisonModal(false)}
          onAskWhatsApp={handleAskWhatsApp}
          formatRupiah={formatRupiah}
        />
      )}

    </section>
  );
}
