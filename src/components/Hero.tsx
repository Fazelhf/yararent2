import React from 'react';
import { Sparkles, Shield, Clock, Award, ArrowLeft } from 'lucide-react';
import { SearchWidget } from './SearchWidget';
import { CarCategory, RentalType } from '../types';

interface HeroProps {
  onSearch: (filters: {
    category: CarCategory;
    rentalType: RentalType;
    city: string;
    startDate: string;
    endDate: string;
  }) => void;
  onExploreCars: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreCars, onOpenBooking }) => {
  return (
    <section id="hero-section" className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Dark Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#17171d] via-[#050505] to-[#050505]" />
        
        {/* Soft Gold / Champagne Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#D6B36A]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#D6B36A]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Subtle Luxury Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        {/* Hero Top Content: Two-column layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          
          {/* Right Column (in RTL): Copy, Headline, CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-right">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-5 animate-in fade-in duration-500">
              <span className="w-2 h-2 rounded-full bg-[#D6B36A] animate-pulse" />
              <span className="text-xs font-medium text-neutral-300">
                پلتفرم رسمی و برتر اجاره خودرو در ایران
              </span>
              <span className="text-[11px] text-[#D6B36A] font-mono px-1.5 py-0.5 rounded bg-[#D6B36A]/10 mr-1">
                VIP Fleet
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight mb-4">
              با انتخابی متفاوت،{' '}
              <span className="gold-text-gradient font-black block sm:inline">
                حرکت کن.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl mb-7">
              اجاره خودرو با شرایط شفاف، انتخاب آسان و پشتیبانی واقعی. ناوگانی از جدیدترین خودروهای لوکس، شاسی‌بلند و اقتصادی آماده تحویل فوری در سراسر کشور.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                id="hero-view-fleet-btn"
                onClick={onExploreCars}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#D6B36A] via-[#E5C57E] to-[#B89246] text-black font-bold text-sm shadow-xl shadow-[#D6B36A]/25 hover:shadow-[#D6B36A]/45 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>مشاهده ناوگان خودروها</span>
                <ArrowLeft className="w-4 h-4 text-black" />
              </button>

              <button
                id="hero-quick-reserve-btn"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D6B36A]" />
                <span>درخواست مشاوره اختصاصی</span>
              </button>
            </div>

            {/* Mini Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 w-full">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/[0.04] text-[#D6B36A]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">تحویل فوری</span>
                  <span className="text-[11px] text-neutral-400">کمتر از ۲ ساعت</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/[0.04] text-[#D6B36A]">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">بیمه طلایی</span>
                  <span className="text-[11px] text-neutral-400">بدون فرانشیز</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/[0.04] text-[#D6B36A]">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">ضمانت رسمی</span>
                  <span className="text-[11px] text-neutral-400">استرداد سریع ودیعه</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column (in RTL): Floating Cutout Car Visual with Studio Shadow & Lighting */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Circular Backlight Rim */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#D6B36A]/20 via-white/5 to-transparent blur-2xl pointer-events-none" />

            {/* Floating Car Presentation Container */}
            <div className="relative w-full max-w-lg lg:max-w-none group">
              {/* Subtle Floating Specs Badge */}
              <div className="absolute top-2 left-2 z-20 glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-xl border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div className="flex flex-col text-right">
                  <span className="text-[11px] text-neutral-400">خودروی پیشنهادی هفته</span>
                  <span className="text-xs font-bold text-white">Porsche Macan GTS</span>
                </div>
              </div>

              {/* Floating Rate Badge */}
              <div className="absolute bottom-6 right-2 z-20 glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-white/10">
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block">شروع نرخ روزانه</span>
                  <span className="text-xs font-bold text-[#D6B36A]">۲۸ میلیون تومان</span>
                </div>
              </div>

              {/* Vehicle Cutout (Background-removed studio aesthetic with soft reflection) */}
              <div className="relative z-10 car-shadow-reflection transition-transform duration-700 hover:scale-[1.03]">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                  alt="پورشه ماکان - اجاره خودرو مجتبی رنت"
                  className="w-full h-auto object-cover rounded-3xl shadow-2xl border border-white/10"
                  style={{
                    filter: 'contrast(1.05) brightness(1.02)'
                  }}
                />
              </div>

              {/* Realistic Soft Radial Floor Shadow below the floating vehicle */}
              <div className="w-4/5 mx-auto h-8 bg-black/90 rounded-[100%] blur-xl -mt-4 relative z-0" />
            </div>
          </div>
        </div>

        {/* Hero Bottom: Embedded Liquid Glass Search Widget */}
        <div className="mt-4">
          <SearchWidget onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};
