import React, { useState } from 'react';
import { X, Sparkles, Phone, Shield, Check, Users, Fuel, Gauge, Award, Calendar, AlertCircle, Clock } from 'lucide-react';
import { Car } from '../types';
import { formatToman, toPersianDigits } from '../lib/formatters';

interface VehicleDetailModalProps {
  car: Car | null;
  onClose: () => void;
  onBookNow: (car: Car) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  car,
  onClose,
  onBookNow,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'terms' | 'pricing'>('specs');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!car) return null;

  const allImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      <div
        id="vehicle-detail-modal"
        className="glass-panel w-full max-w-4xl rounded-[2rem] border border-white/20 my-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 z-20 p-2.5 rounded-2xl bg-black/60 hover:bg-black/80 border border-white/15 text-white transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Hero Vehicle Section */}
        <div className="relative bg-gradient-to-b from-[#16161b] to-transparent p-6 sm:p-10 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#D6B36A] bg-[#D6B36A]/10 px-3 py-1 rounded-full border border-[#D6B36A]/20">
                {car.brand} • {toPersianDigits(car.year)}
              </span>
              <span className="text-xs text-neutral-400">
                {car.englishName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                موجود و آماده تحویل
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            {car.name}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed mb-6">
            {car.description}
          </p>

          {/* Large Floating Vehicle Showcase */}
          <div className="relative my-4 flex items-center justify-center">
            {/* Ambient Underglow */}
            <div className="absolute inset-0 bg-[#D6B36A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-h-[360px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={allImages[selectedImageIndex] || car.image}
                alt={car.name}
                className="w-full h-auto object-cover max-h-[360px] mx-auto transition-all duration-500"
              />
            </div>
          </div>

          {/* Image Thumbnails if gallery exists */}
          {allImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-10 rounded-xl overflow-hidden border transition-all ${
                    selectedImageIndex === idx ? 'border-[#D6B36A] scale-105' : 'border-white/10 opacity-60'
                  }`}
                >
                  <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 sm:px-10 pt-4 border-b border-white/10 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'border-[#D6B36A] text-[#D6B36A]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            مشخصات فنی و رفاهی
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'pricing'
                ? 'border-[#D6B36A] text-[#D6B36A]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            تعرفه‌ها و تخفیف‌ها
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'border-[#D6B36A] text-[#D6B36A]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            شرایط ودیعه و مدارک
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-10">
          {/* Tab 1: Specs */}
          {activeTab === 'specs' && (
            <div className="space-y-6 text-right">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-neutral-400 text-xs flex items-center gap-1 mb-1">
                    <Gauge className="w-3.5 h-3.5 text-[#D6B36A]" /> گیربکس
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {car.transmission === 'automatic' ? 'اتوماتیک هوشمند' : 'دستی'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-neutral-400 text-xs flex items-center gap-1 mb-1">
                    <Users className="w-3.5 h-3.5 text-[#D6B36A]" /> ظرفیت
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {toPersianDigits(car.seats)} سرنشین
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-neutral-400 text-xs flex items-center gap-1 mb-1">
                    <Fuel className="w-3.5 h-3.5 text-[#D6B36A]" /> نوع سوخت
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {car.fuel}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-neutral-400 text-xs flex items-center gap-1 mb-1">
                    <Shield className="w-3.5 h-3.5 text-[#D6B36A]" /> سقف مجاز
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {toPersianDigits(car.kmLimitPerDay)} کیلومتر/روز
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-sm font-bold text-white mb-3">امکانات و آپشن‌های ویژه:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {car.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Pricing */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 text-right">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-xs text-neutral-400 block mb-1">کرایه روزانه (۱ الی ۶ روز)</span>
                  <span className="text-lg font-black text-white gold-text-gradient block">
                    {formatToman(car.dailyRate)}
                  </span>
                  <span className="text-[10px] text-neutral-500">به ازای هر ۲۴ ساعت</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-center relative">
                  <span className="text-[10px] bg-[#D6B36A] text-black font-bold px-2 py-0.5 rounded-full absolute -top-2.5 left-1/2 -translate-x-1/2">
                    تخفیف هفتگی
                  </span>
                  <span className="text-xs text-neutral-300 block mb-1">کرایه هفتگی (۷ روز به بالا)</span>
                  <span className="text-lg font-black text-white block">
                    {formatToman(car.weeklyRate)}
                  </span>
                  <span className="text-[10px] text-[#D6B36A]">روزانه با تخفیف ویژه</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-xs text-neutral-400 block mb-1">کرایه ماهانه (۳۰ روز)</span>
                  <span className="text-lg font-black text-white block">
                    {formatToman(car.monthlyRate)}
                  </span>
                  <span className="text-[10px] text-emerald-400">حداکثر صرفه اقتصادی</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center justify-between">
                  <span>هزینه هر کیلومتر مازاد بر سقف مجاز:</span>
                  <span className="font-mono text-[#D6B36A]">{formatToman(car.extraKmFee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>بیمه شامل قرارداد:</span>
                  <span className="text-emerald-400">{car.insuranceIncluded}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Terms & Deposit */}
          {activeTab === 'terms' && (
            <div className="space-y-4 text-right">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-300 mb-1">ودیعه نقدی (دپوزیت):</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    مبلغ ودیعه برای این خودرو <strong className="text-white font-mono">{formatToman(car.deposit)}</strong> است که در زمان تحویل دریافت و در زمان عودت خودرو بلافاصله پس از بررسی کارشناسی بازگردانده می‌شود.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D6B36A]" /> شرایط بدون راننده
                  </h5>
                  <ul className="space-y-1.5 text-neutral-400 pr-4 list-disc">
                    <li>گواهینامه معتبر با حداقل ۱ سال سابقه</li>
                    <li>کارت ملی یا پاسپورت مسافرتی</li>
                    <li>چک یا سفته به ارزش خودرو</li>
                    <li>استرداد نقدی ودیعه در لحظه تحویل خودرو</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D6B36A]" /> شرایط با راننده (تشریفات)
                  </h5>
                  <ul className="space-y-1.5 text-neutral-400 pr-4 list-disc">
                    <li>بدون نیاز به ودیعه نقدی یا چک ضمانت</li>
                    <li>راننده مجرب و آشنا به پروتکل‌های VIP</li>
                    <li>مسئولیت کامل تصادف یا حوادث بر عهده شرکت</li>
                    <li>سرویس ۲۴ ساعته در اختیار</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="p-6 sm:px-10 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-neutral-400 block">کرایه روزانه:</span>
            <span className="text-xl font-black text-white gold-text-gradient">
              {formatToman(car.dailyRate)}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:02188889900"
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#D6B36A]" />
              <span>مشاوره قبل از اجاره</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(car);
              }}
              className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-gradient-to-r from-[#D6B36A] via-[#E5C57E] to-[#B89246] text-black text-xs font-bold shadow-lg shadow-[#D6B36A]/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>درخواست اجاره این خودرو</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
