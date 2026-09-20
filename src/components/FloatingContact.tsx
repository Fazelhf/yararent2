import React, { useState } from 'react';
import { Phone, MessageCircle, Send, Instagram, X, Headphones } from 'lucide-react';

interface FloatingContactProps {
  onOpenBooking: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ onOpenBooking }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop & Tablet Floating Action Menu in Bottom-Left (since layout is RTL) */}
      <div id="floating-contact-container" className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2.5">
        {/* Expanded Options */}
        {expanded && (
          <div className="glass-panel p-2 rounded-2xl flex flex-col gap-1.5 shadow-2xl border border-white/15 animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Phone Call */}
            <a
              href="tel:02188889900"
              id="floating-call-btn"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>تماس فوری (۰۲۱-۸۸۸۸۹۹۰۰)</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/989128889900"
              target="_blank"
              rel="noreferrer"
              id="floating-whatsapp-btn"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <span>پشتیبانی واتساپ</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              id="floating-telegram-btn"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Send className="w-3.5 h-3.5" />
              </div>
              <span>کانال تلگرام</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              id="floating-instagram-btn"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <span>پیج اینستاگرام</span>
            </a>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          type="button"
          id="floating-contact-trigger-btn"
          onClick={() => setExpanded(!expanded)}
          className="relative p-3.5 rounded-2xl bg-gradient-to-tr from-[#D6B36A] to-[#E5C57E] text-black shadow-2xl shadow-[#D6B36A]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          aria-label="تماس و پشتیبانی"
        >
          {expanded ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <div className="flex items-center gap-2">
              <Headphones className="w-6 h-6 text-black" />
              <span className="hidden sm:inline text-xs font-bold text-black pl-1">
                پشتیبانی ۲۴/۷
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Bottom Sticky Bar for High Conversion */}
      <div
        id="mobile-sticky-bottom-bar"
        className="fixed bottom-0 inset-x-0 z-40 bg-[#070709]/95 backdrop-blur-xl border-t border-white/10 p-3 sm:hidden flex items-center justify-between gap-2 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]"
      >
        <a
          href="tel:02188889900"
          className="flex-1 py-3 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-white flex items-center justify-center gap-1.5 text-xs font-semibold"
        >
          <Phone className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span>تماس فوری</span>
        </a>

        <a
          href="https://wa.me/989128889900"
          target="_blank"
          rel="noreferrer"
          className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-emerald-400 flex items-center justify-center"
          aria-label="واتساپ"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-[2] py-3 px-4 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B89246] text-black text-xs font-bold shadow-lg shadow-[#D6B36A]/30 flex items-center justify-center gap-1.5"
        >
          <span>رزرو آنلاین خودرو</span>
        </button>
      </div>
    </>
  );
};
