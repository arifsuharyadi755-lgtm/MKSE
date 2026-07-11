import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tool tip after 3 seconds for friendly conversion action
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip Notification */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-[260px] md:max-w-xs relative"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider font-mono">
                Admin MKS Computer
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Butuh bantuan servis atau tanya rakit PC? Hubungi kami sekarang!
              </p>
            </div>
            
            <button
              onClick={() => setShowTooltip(false)}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer self-start"
              aria-label="Tutup notifikasi"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Little caret indicator */}
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-zinc-900 border-r border-b border-zinc-850 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href="https://wa.me/6281319503899"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.5 
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)" 
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTooltip(false)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-colors cursor-pointer relative group"
        aria-label="Hubungi kami di WhatsApp"
      >
        {/* Pulsing radar border ring */}
        <span className="absolute inset-0 rounded-full border border-emerald-500 animate-ping opacity-40"></span>
        
        <MessageCircle className="h-6 w-6" />

        {/* Hover label for desktop */}
        <span className="absolute right-16 bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl hidden md:inline">
          Chat WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
