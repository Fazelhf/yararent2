import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Users, Fuel, Sparkles, ChevronLeft, ShieldCheck, Gauge } from 'lucide-react';
import { Car } from '../types';
import { formatToman, toPersianDigits } from '../lib/formatters';

interface VehicleCardProps {
  car: Car;
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ car, onSelectCar, onBookCar }) => {
  const shouldReduceMotion = useReducedMotion();
  const carIndex = parseInt(car.id, 10) || 1;
  const phaseDelay = (carIndex % 4) * 0.5;

  return (
    <div
      id={`car-card-${car.id}`}
      className="glass-card rounded-3xl p-5 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Top Card Ambient Glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6B36A]/0 group-hover:bg-[#D6B36A]/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

      {/* Top Badges & Status */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300">
            {car.brand}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-[#D6B36A]">
            {toPersianDigits(car.year)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {car.isPopular && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D6B36A]/15 text-[#D6B36A] border border-[#D6B36A]/30">
              پرطرفدار
            </span>
          )}
          {car.withDriverAvailable && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-400">
              با راننده
            </span>
          )}
        </div>
      </div>

      {/* Vehicle Title & English Subtitle */}
      <div className="mb-4 relative z-10 text-right">
        <h3 className="text-lg font-bold text-white group-hover:text-[#D6B36A] transition-colors leading-tight">
          {car.name}
        </h3>
        <p className="text-xs text-neutral-400 font-mono tracking-wide mt-0.5">
          {car.englishName}
        </p>
      </div>

      {/* Vehicle Floating Image Presentation */}
      <div
        id={`car-image-container-${car.id}`}
        onClick={() => onSelectCar(car)}
        className="relative my-2 h-44 sm:h-48 w-full flex items-center justify-center cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent p-2"
      >
        {/* Under-car subtle soft light */}
        <div className="absolute bottom-2 inset-x-12 h-6 bg-[#D6B36A]/0 group-hover:bg-[#D6B36A]/20 rounded-full blur-md transition-all duration-500 pointer-events-none" />

        <motion.img
          id={`car-image-${car.id}`}
          src={car.image}
          alt={car.name}
          loading="lazy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : {
                  opacity: 1,
                  y: [0, -5, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  opacity: {
                    duration: 0.6,
                    ease: 'easeOut',
                    delay: Math.min(carIndex * 0.05, 0.4),
                  },
                  y: {
                    duration: 3.8,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                    delay: phaseDelay,
                  },
                }
          }
          whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
          className="w-full h-full object-cover rounded-xl group-hover:brightness-105 transition-[filter] duration-300"
        />

        {/* Soft floor shadow */}
        <motion.div
          className="absolute bottom-0 inset-x-8 h-4 bg-black/60 rounded-full blur-sm pointer-events-none"
          animate={
            shouldReduceMotion
              ? { opacity: 0.6, scaleX: 1 }
              : {
                  opacity: [0.6, 0.4, 0.6],
                  scaleX: [1, 0.92, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 3.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: phaseDelay,
                }
          }
        />
      </div>

      {/* Minimal Metadata Specs Grid */}
      <div className="grid grid-cols-3 gap-2 py-3 px-3 my-2 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-right">
        <div className="flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span className="text-[11px] text-neutral-300">
            {car.transmission === 'automatic' ? 'اتوماتیک' : 'دنده‌ای'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span className="text-[11px] text-neutral-300">
            {toPersianDigits(car.seats)} سرنشین
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Fuel className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span className="text-[11px] text-neutral-300 truncate">
            {car.fuel}
          </span>
        </div>
      </div>

      {/* Card Bottom: Price and Actions */}
      <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-neutral-400">کرایه روزانه:</span>
          <div className="text-left">
            <span className="text-base sm:text-lg font-black text-white group-hover:text-[#D6B36A] transition-colors">
              {formatToman(car.dailyRate)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            id={`view-car-btn-${car.id}`}
            onClick={() => onSelectCar(car)}
            className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-neutral-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <span>مشخصات</span>
            <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          <button
            type="button"
            id={`book-car-btn-${car.id}`}
            onClick={() => onBookCar(car)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B89246] hover:from-[#E5C57E] hover:to-[#C29B4F] text-black text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-[#D6B36A]/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-black" />
            <span>رزرو فوری</span>
          </button>
        </div>
      </div>
    </div>
  );
};
