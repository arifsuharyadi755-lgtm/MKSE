import React, { useState } from "react";
import { Wrench, ShoppingBag, Cpu, MessageSquareCode, Phone, Menu, X, Search, Sparkles, MapPin } from "lucide-react";
import MKSLogo from "./MKSLogo";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "estimator", label: "Estimasi Servis", icon: Wrench },
    { id: "tracking", label: "Lacak Servis", icon: Search },
    { id: "maintenance-tips", label: "Tips MKS", icon: Sparkles },
    { id: "catalog", label: "Katalog MKS", icon: ShoppingBag },
    { id: "builder", label: "Rakit PC", icon: Cpu },
    { id: "service-area", label: "Lokasi & Area", icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header id="header-container" className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            id="nav-logo"
            onClick={() => handleNavClick("estimator")} 
            className="flex items-center gap-4 cursor-pointer group"
          >
            <MKSLogo className="w-14 h-14 text-white group-hover:scale-105 transition-transform duration-300 -my-2" />
            <div className="leading-none">
              <h1 className="text-xl font-black tracking-tighter text-white uppercase">
                MKS<span className="text-red-600"> COMPUTER</span>
              </h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                CEMPAKA MAS
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-black uppercase tracking-widest hover:text-red-500 transition-colors cursor-pointer py-2 ${
                    isActive 
                      ? "text-red-500 border-b-2 border-red-600" 
                      : "text-zinc-400"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Phone & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6281319503899"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all cursor-pointer flex items-center justify-center"
            >
              Hubungi Kami
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav" className="md:hidden bg-zinc-950 border-b border-zinc-800/80 px-4 py-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  isActive 
                    ? "bg-red-600/10 text-red-500 border border-red-500/30" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-zinc-800 mt-2">
            <a 
              href="https://wa.me/6281319503899" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900/40 hover:bg-zinc-800 text-white py-3 border border-zinc-800 text-xs font-black uppercase tracking-widest"
            >
              <Phone className="h-4 w-4 text-red-500" />
              <span>Hubungi WA Admin</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
