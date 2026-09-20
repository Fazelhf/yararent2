import React from 'react';
import { SERVICES_LIST } from '../data/content';
import { Shield, Sparkles, Check, ArrowLeft, Phone, Calendar } from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: () => void;
  onContactUs: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onContactUs }) => {
  return (
    <div id="services-page" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>خدمات تشریفاتی و توریستی</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          خدمات اختصاصی مجتبی رنت
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
          انعطاف در نحوه اجاره، بالاترین استاندارد سرویس‌دهی و پشتیبانی بی‌وقفه برای هر سبک از سفر
        </p>
      </div>

      {/* Services Comprehensive Grid */}
      <div className="space-y-8">
        {SERVICES_LIST.map((service, index) => (
          <div
            key={service.id}
            id={`services-detail-${service.id}`}
            className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 hover:border-[#D6B36A]/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 text-right">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-[#D6B36A] px-2.5 py-1 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/20">
                    {service.badge}
                  </span>
                  <span className="text-xs text-neutral-500">سرویس کد ۰{index + 1}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D6B36A]/80 font-medium mb-4">
                  {service.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <span className="text-xs text-neutral-400 mb-2">ثبت سریع و هماهنگی اختصاصی</span>
                <span className="text-sm font-bold text-white mb-4">تحویل تضمین‌شده رأس ساعت</span>
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B89246] text-black text-xs font-bold shadow-md shadow-[#D6B36A]/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all cursor-pointer mb-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>رزرو این سرویس</span>
                </button>
                <button
                  onClick={onContactUs}
                  className="w-full py-2.5 rounded-xl bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>مشاوره تلفنی رایگان</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
