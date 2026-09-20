import React, { useState } from 'react';
import { Search, Calendar, MapPin, Car as CarIcon, UserCheck, ShieldCheck } from 'lucide-react';
import { CarCategory, RentalType } from '../types';

interface SearchWidgetProps {
  onSearch: (filters: {
    category: CarCategory;
    rentalType: RentalType;
    city: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({ onSearch }) => {
  const [rentalType, setRentalType] = useState<RentalType>('without-driver');
  const [city, setCity] = useState('تهران - شعبه فرشته');
  const [startDate, setStartDate] = useState('امروز (تحویل فوری)');
  const [endDate, setEndDate] = useState('۳ روز بعد (آخر هفته)');
  const [category, setCategory] = useState<CarCategory>('all');

  const cities = [
    'تهران - شعبه فرشته',
    'تهران - فرودگاه امام خمینی (ره)',
    'تهران - فرودگاه مهرآباد',
    'جزیره کیش (منطقه آزاد)',
    'شیراز - دفتر فرودگاهی',
    'اصفهان - هتل عباسی'
  ];

  const dateOptions = [
    { label: 'امروز (تحویل فوری)', value: 'امروز (تحویل فوری)' },
    { label: 'فردا صبح', value: 'فردا صبح' },
    { label: 'پایان هفته (چهارشنبه)', value: 'پایان هفته' },
    { label: 'هفته آینده', value: 'هفته آینده' }
  ];

  const categories = [
    { id: 'all' as CarCategory, label: 'همه دسته‌ها' },
    { id: 'luxury' as CarCategory, label: 'لوکس و VIP' },
    { id: 'suv' as CarCategory, label: 'شاسی‌بلند SUV' },
    { id: 'sedan' as CarCategory, label: 'سدان تشریفاتی' },
    { id: 'sport' as CarCategory, label: 'اسپرت و کوپه' },
    { id: 'economy' as CarCategory, label: 'اقتصادی شهری' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      category,
      rentalType,
      city,
      startDate,
      endDate
    });
  };

  return (
    <div id="hero-search-panel" className="w-full max-w-5xl mx-auto">
      <div className="glass-panel p-4 sm:p-6 lg:p-7 rounded-3xl shadow-2xl relative overflow-hidden border border-white/15">
        {/* Subtle Ambient lighting effect */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#D6B36A]/10 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          {/* Top Row: Rental Type Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
              <button
                type="button"
                id="search-type-without-driver"
                onClick={() => setRentalType('without-driver')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  rentalType === 'without-driver'
                    ? 'bg-[#D6B36A] text-black shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <CarIcon className="w-4 h-4" />
                اجاره بدون راننده
              </button>

              <button
                type="button"
                id="search-type-with-driver"
                onClick={() => setRentalType('with-driver')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  rentalType === 'with-driver'
                    ? 'bg-[#D6B36A] text-black shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                اجاره با راننده (تشریفات)
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#D6B36A]">
              <ShieldCheck className="w-4 h-4" />
              <span>تحویل در محل با باک بنزین پر و گارانتی فنی</span>
            </div>
          </div>

          {/* Middle Row: Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* City Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D6B36A]" />
                محل تحویل خودرو
              </label>
              <div className="relative">
                <select
                  id="search-city-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D6B36A] appearance-none cursor-pointer hover:bg-white/[0.07] transition-colors"
                >
                  {cities.map((c) => (
                    <option key={c} value={c} className="bg-[#121216] text-white py-2">
                      {c}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D6B36A]" />
                تاریخ تحویل (شروع)
              </label>
              <div className="relative">
                <select
                  id="search-start-date-select"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D6B36A] appearance-none cursor-pointer hover:bg-white/[0.07] transition-colors"
                >
                  {dateOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#121216] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D6B36A]" />
                تاریخ عودت (پایان)
              </label>
              <div className="relative">
                <select
                  id="search-end-date-select"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D6B36A] appearance-none cursor-pointer hover:bg-white/[0.07] transition-colors"
                >
                  <option value="۳ روز بعد (آخر هفته)" className="bg-[#121216] text-white">
                    ۳ روز بعد (آخر هفته)
                  </option>
                  <option value="۵ روز بعد" className="bg-[#121216] text-white">
                    ۵ روز بعد
                  </option>
                  <option value="۱ هفته بعد (تخفیف ۱۰٪)" className="bg-[#121216] text-white">
                    ۱ هفته بعد (تخفیف ۱۰٪)
                  </option>
                  <option value="۱ ماه بعد (تخفیف ۲۵٪)" className="bg-[#121216] text-white">
                    ۱ ماه بعد (تخفیف ۲۵٪)
                  </option>
                </select>
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Category Chips & Search CTA */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-2">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  id={`filter-chip-${cat.id}`}
                  onClick={() => setCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                    category === cat.id
                      ? 'bg-white/20 text-[#D6B36A] border border-[#D6B36A]/50 font-bold'
                      : 'bg-white/[0.03] text-neutral-400 border border-white/[0.06] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              id="search-submit-btn"
              className="w-full lg:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D6B36A] via-[#E5C57E] to-[#B89246] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#D6B36A]/25 hover:shadow-[#D6B36A]/45 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-black" />
              <span>جستجوی خودروهای موجود</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
