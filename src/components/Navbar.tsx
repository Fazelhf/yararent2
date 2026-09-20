import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Shield, Sparkles, ChevronLeft } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'خانه' },
    { id: 'cars', label: 'ناوگان خودروها' },
    { id: 'services', label: 'خدمات' },
    { id: 'about', label: 'درباره ما' },
    { id: 'faq', label: 'سؤالات متداول' },
    { id: 'contact', label: 'تماس با ما' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-white/10'
            : 'bg-gradient-to-b from-black/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Wordmark */}
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-right group focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6B36A] to-[#8C6D2B] p-0.5 shadow-lg shadow-[#D6B36A]/20 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-[#D6B36A] text-lg tracking-tighter">M</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white group-hover:text-[#D6B36A] transition-colors">
                    مجتبی رنت
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D6B36A]"></span>
                </div>
                <span className="text-[10px] tracking-widest text-[#A1A1AA] uppercase font-mono">
                  Mojtaba Rent Luxury
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              {navLinks.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all rounded-full ${
                      isActive
                        ? 'text-black bg-[#D6B36A] font-semibold shadow-md shadow-[#D6B36A]/25'
                        : 'text-neutral-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Action CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:02188889900"
                id="header-phone-link"
                className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-[#D6B36A] transition-colors py-2 px-3 rounded-lg border border-white/5 hover:border-white/20"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span>021 - 8888 9900</span>
              </a>

              <button
                id="header-booking-cta"
                onClick={onOpenBooking}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B36A] via-[#E5C57E] to-[#B89246] text-black text-sm font-bold shadow-lg shadow-[#D6B36A]/20 hover:shadow-[#D6B36A]/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-black" />
                  رزرو آنلاین خودرو
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:02188889900"
                id="mobile-header-call-btn"
                className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#D6B36A]"
                aria-label="تماس با مجتبی رنت"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:text-[#D6B36A]"
                aria-label="باز کردن منو"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-overlay"
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl lg:hidden pt-24 px-6 pb-10 flex flex-col justify-between animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-2">
            <div className="pb-4 mb-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs text-neutral-400">ناوبری مجتبی رنت</span>
              <span className="text-xs text-[#D6B36A] flex items-center gap-1">
                <Shield className="w-3 h-3" />
                تضمین رسمی خدمات
              </span>
            </div>

            {navLinks.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl text-right text-base font-medium transition-all ${
                    isActive
                      ? 'bg-[#D6B36A] text-black font-bold'
                      : 'bg-white/[0.03] text-white border border-white/[0.06] hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronLeft className={`w-4 h-4 ${isActive ? 'text-black' : 'text-neutral-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <button
              id="mobile-drawer-booking-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B89246] text-black text-center font-bold text-base shadow-lg shadow-[#D6B36A]/20"
            >
              رزرو آنلاین خودرو
            </button>

            <a
              href="tel:02188889900"
              id="mobile-drawer-phone"
              className="w-full py-3 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-200 text-center text-sm flex items-center justify-center gap-2"
              dir="ltr"
            >
              <Phone className="w-4 h-4 text-[#D6B36A]" />
              021 - 8888 9900
            </a>
          </div>
        </div>
      )}
    </>
  );
};
