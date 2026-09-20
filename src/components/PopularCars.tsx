import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import { Car } from '../types';
import { VehicleCard } from './VehicleCard';

interface PopularCarsProps {
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
  onViewAll: () => void;
}

export const PopularCars: React.FC<PopularCarsProps> = ({ onSelectCar, onBookCar, onViewAll }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const popularCars = CARS_DATA.filter((c) => c.isPopular || c.isFeatured);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="popular-cars-section" className="py-16 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D6B36A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-2">
              <span>ناوگان برتر</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              انتخاب‌های محبوب مشتریان
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              مجموعه‌ای از پرتقاضاترین خودروهای لوکس و اقتصادی با تحویل فوری در سراسر کشور
            </p>
          </div>

          {/* Carousel Arrows and View All */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('right')}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white hover:text-[#D6B36A] transition-colors cursor-pointer"
              aria-label="خودروی قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('left')}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white hover:text-[#D6B36A] transition-colors cursor-pointer"
              aria-label="خودروی بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onViewAll}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-[#D6B36A] transition-colors mr-2 cursor-pointer"
            >
              <span>مشاهده همه ناوگان</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {popularCars.map((car) => (
            <div
              key={car.id}
              className="w-[290px] sm:w-[330px] lg:w-[350px] flex-shrink-0 snap-start"
            >
              <VehicleCard car={car} onSelectCar={onSelectCar} onBookCar={onBookCar} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 sm:hidden">
          <button
            onClick={onViewAll}
            className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-[#D6B36A] flex items-center justify-center gap-2"
          >
            <span>مشاهده همه خودروها</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
