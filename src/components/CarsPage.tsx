import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import { Car, CarCategory, RentalType } from '../types';
import { VehicleCard } from './VehicleCard';
import { toPersianDigits, formatToman } from '../lib/formatters';

interface CarsPageProps {
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
  initialFilters?: {
    category?: CarCategory;
    rentalType?: RentalType;
  };
}

export const CarsPage: React.FC<CarsPageProps> = ({
  onSelectCar,
  onBookCar,
  initialFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>(initialFilters?.category || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [rentalType, setRentalType] = useState<RentalType>(initialFilters?.rentalType || 'all');
  const [transmission, setTransmission] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'cheap' | 'expensive' | 'newest'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(30000000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(true);

  const brands = ['all', 'پورشه', 'مرسدس بنز', 'ب‌ام‌و', 'لکسوس', 'تویوتا', 'هیوندای', 'کیا', 'ایران خودرو'];

  const categories = [
    { id: 'all' as CarCategory, label: 'همه دسته‌ها' },
    { id: 'luxury' as CarCategory, label: 'لوکس' },
    { id: 'suv' as CarCategory, label: 'شاسی‌بلند SUV' },
    { id: 'sedan' as CarCategory, label: 'سدان' },
    { id: 'sport' as CarCategory, label: 'اسپرت' },
    { id: 'economy' as CarCategory, label: 'اقتصادی' },
  ];

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Search query
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;

      // Brand
      const matchesBrand = selectedBrand === 'all' || car.brand === selectedBrand;

      // Rental type
      const matchesRentalType =
        rentalType === 'all' ||
        (rentalType === 'with-driver' && car.withDriverAvailable) ||
        (rentalType === 'without-driver' && car.withoutDriverAvailable);

      // Transmission
      const matchesTransmission = transmission === 'all' || car.transmission === transmission;

      // Price
      const matchesPrice = car.dailyRate <= maxPrice;

      // Stock
      const matchesStock = !onlyInStock || car.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesRentalType &&
        matchesTransmission &&
        matchesPrice &&
        matchesStock
      );
    }).sort((a, b) => {
      if (sortBy === 'cheap') return a.dailyRate - b.dailyRate;
      if (sortBy === 'expensive') return b.dailyRate - a.dailyRate;
      if (sortBy === 'newest') return parseInt(b.year.replace(/[^\d]/g, '') || '0') - parseInt(a.year.replace(/[^\d]/g, '') || '0');
      // popular
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, selectedBrand, rentalType, transmission, maxPrice, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setRentalType('all');
    setTransmission('all');
    setMaxPrice(30000000);
    setOnlyInStock(false);
    setSortBy('popular');
  };

  return (
    <div id="cars-catalog-page" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ناوگان بروز و کارشناسی‌شده</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          خودروی مناسب شما را پیدا کنید
        </h1>
        <p className="text-sm text-neutral-400 mt-2">
          امکان فیلتر دقیق بر اساس کلاس بدنه، بودجه، نوع گیربکس و نحوه تحویل با راننده یا بدون راننده
        </p>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 mb-8 space-y-5">
        {/* Row 1: Search & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <input
              type="text"
              id="cars-search-query-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام خودرو، برند یا مدل (مثال: بنز، ماکان، راوفور، کمری...)"
              className="w-full py-3.5 px-11 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D6B36A] transition-colors"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                پاک کردن
              </button>
            )}
          </div>

          <div className="md:col-span-4 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-3.5 px-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D6B36A] appearance-none cursor-pointer"
            >
              <option value="popular" className="bg-[#121216]">مرتب‌سازی: محبوب‌ترین</option>
              <option value="cheap" className="bg-[#121216]">مرتب‌سازی: ارزان‌ترین</option>
              <option value="expensive" className="bg-[#121216]">مرتب‌سازی: گران‌ترین</option>
              <option value="newest" className="bg-[#121216]">مرتب‌سازی: جدیدترین مدل</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Row 2: Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#D6B36A] text-black font-bold shadow'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 3: Granular Dropdowns & Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/5 text-right">
          {/* Brand Filter */}
          <div>
            <label className="text-[11px] text-neutral-400 block mb-1">برند خودرو</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
            >
              <option value="all" className="bg-[#121216]">همه برندها</option>
              {brands.filter((b) => b !== 'all').map((b) => (
                <option key={b} value={b} className="bg-[#121216]">{b}</option>
              ))}
            </select>
          </div>

          {/* Rental Type */}
          <div>
            <label className="text-[11px] text-neutral-400 block mb-1">نوع اجاره</label>
            <select
              value={rentalType}
              onChange={(e) => setRentalType(e.target.value as RentalType)}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
            >
              <option value="all" className="bg-[#121216]">همه حالت‌ها</option>
              <option value="without-driver" className="bg-[#121216]">بدون راننده</option>
              <option value="with-driver" className="bg-[#121216]">با راننده (تشریفاتی)</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="text-[11px] text-neutral-400 block mb-1">نوع گیربکس</label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
            >
              <option value="all" className="bg-[#121216]">همه گیربکس‌ها</option>
              <option value="automatic" className="bg-[#121216]">اتوماتیک</option>
              <option value="manual" className="bg-[#121216]">دستی</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/10 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازنشانی فیلترها</span>
            </button>
          </div>
        </div>

        {/* Price Slider */}
        <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400">حداکثر بودجه روزانه:</span>
            <span className="text-xs font-bold text-[#D6B36A] font-mono">
              تا {formatToman(maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min="2000000"
            max="30000000"
            step="1000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full sm:w-64 accent-[#D6B36A] cursor-pointer"
          />
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-6 text-xs text-neutral-400">
        <span>نمایش {toPersianDigits(filteredCars.length)} خودرو آماده تحویل</span>
        <span className="text-[#D6B36A]">• تضمین بهترین قیمت و کیفیت فنی</span>
      </div>

      {/* Cars Grid: Responsive 3 or 4 columns Desktop, 2 Tablet, 1 Mobile */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <VehicleCard
              key={car.id}
              car={car}
              onSelectCar={onSelectCar}
              onBookCar={onBookCar}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div id="cars-empty-state" className="glass-panel p-12 rounded-3xl text-center max-w-lg mx-auto border border-white/10 my-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
            <Filter className="w-8 h-8 text-[#D6B36A]" />
          </div>
          <h3 className="text-lg font-bold text-white">
            در حال حاضر خودرویی با این مشخصات پیدا نشد.
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            لطفاً بازه قیمتی، برند یا نوع اجاره انتخابی را تغییر دهید تا گزینه‌های موجود نمایش داده شوند.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-[#D6B36A] text-black font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            فیلترها را تغییر دهید
          </button>
        </div>
      )}
    </div>
  );
};
