import React, { useState } from 'react';
import { Sparkles, Shield, ArrowLeft, Check, Gauge, Zap } from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import { Car } from '../types';
import { formatToman, toPersianDigits } from '../lib/formatters';

interface FeaturedLuxurySectionProps {
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
}

export const FeaturedLuxurySection: React.FC<FeaturedLuxurySectionProps> = ({
  onSelectCar,
  onBookCar,
}) => {
  const luxuryFleet = CARS_DATA.filter((c) => c.category === 'luxury' || c.category === 'sport');
  const [selectedLuxuryCar, setSelectedLuxuryCar] = useState<Car>(luxuryFleet[0] || CARS_DATA[0]);

  return (
    <section id="featured-luxury-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#09090c] to-[#050505]">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-[#D6B36A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>کلکسیون VIP و تشریفاتی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              ناوگان پرچمدار و سوپرلوکس
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              خودروهای تشریفاتی برای رویدادهای خاص، دیدارهای دیپلماتیک و لحظات ماندگار
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {luxuryFleet.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedLuxuryCar(c)}
                className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                  selectedLuxuryCar.id === c.id
                    ? 'bg-[#D6B36A] text-black font-bold shadow-lg shadow-[#D6B36A]/20'
                    : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Spotlight Card (Large Floating Showcase) */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right: Technical Details, Perks & Price */}
            <div className="lg:col-span-6 flex flex-col items-start text-right">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-[#D6B36A] bg-[#D6B36A]/10 px-2.5 py-1 rounded-full border border-[#D6B36A]/20">
                  {selectedLuxuryCar.englishName}
                </span>
                <span className="text-xs text-neutral-400">
                  مدل {toPersianDigits(selectedLuxuryCar.year)}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                {selectedLuxuryCar.name}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {selectedLuxuryCar.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-6">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[11px] text-neutral-400 block mb-1">پیشرانه</span>
                  <span className="text-xs font-bold text-white truncate block">
                    {selectedLuxuryCar.engine}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[11px] text-neutral-400 block mb-1">گیربکس</span>
                  <span className="text-xs font-bold text-white block">
                    {selectedLuxuryCar.transmission === 'automatic' ? 'اتوماتیک تیپ‌ترونیک' : 'دستی'}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[11px] text-neutral-400 block mb-1">ظرفیت سرنشین</span>
                  <span className="text-xs font-bold text-white block">
                    {toPersianDigits(selectedLuxuryCar.seats)} نفر
                  </span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="flex flex-col gap-2 mb-8 w-full">
                {selectedLuxuryCar.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & CTA */}
              <div className="w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-400 block">کرایه روزانه:</span>
                  <span className="text-xl sm:text-2xl font-black text-white gold-text-gradient">
                    {formatToman(selectedLuxuryCar.dailyRate)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectCar(selectedLuxuryCar)}
                    className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                  >
                    جزئیات کامل
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookCar(selectedLuxuryCar)}
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B89246] hover:from-[#E5C57E] hover:to-[#C29B4F] text-black text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D6B36A]/25 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>رزرو اختصاصی</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Left: Big Hero Vehicle Visual with Reflection and Floating Shadow */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              <div className="relative w-full group">
                {/* Floating Glow Behind Car */}
                <div className="absolute inset-0 bg-[#D6B36A]/10 rounded-full blur-3xl group-hover:bg-[#D6B36A]/20 transition-all duration-700 pointer-events-none" />

                {/* Main Vehicle Image */}
                <div className="relative z-10 car-shadow-reflection overflow-hidden rounded-3xl border border-white/10">
                  <img
                    src={selectedLuxuryCar.image}
                    alt={selectedLuxuryCar.name}
                    className="w-full h-auto object-cover max-h-[380px] rounded-3xl transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Soft floor shadow */}
                <div className="w-4/5 mx-auto h-8 bg-black/95 rounded-[100%] blur-xl -mt-4 relative z-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
