import React from 'react';
import { SERVICES_LIST } from '../data/content';
import { Sparkles, ArrowLeft, Check, Car, UserCheck, HeartHandshake, Plane, Building2 } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: () => void;
  onNavigateToServices?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking, onNavigateToServices }) => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'without-driver':
        return <Car className="w-5 h-5 text-[#D6B36A]" />;
      case 'with-driver':
        return <UserCheck className="w-5 h-5 text-[#D6B36A]" />;
      case 'wedding':
        return <HeartHandshake className="w-5 h-5 text-[#D6B36A]" />;
      case 'airport-transfer':
        return <Plane className="w-5 h-5 text-[#D6B36A]" />;
      case 'long-term-fleet':
        return <Building2 className="w-5 h-5 text-[#D6B36A]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#D6B36A]" />;
    }
  };

  return (
    <section id="services-section" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
            <span>راهکارهای اختصاصی سفر و تردد</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            خدمات مجتبی رنت
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            پوشش کامل نیازهای حمل و نقل تشریفاتی، سفرهای توریستی و رویدادهای ویژه
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="glass-card p-7 rounded-3xl flex flex-col justify-between group hover:border-[#D6B36A]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-[#D6B36A]/10 transition-colors">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#D6B36A]/10 text-[#D6B36A] border border-[#D6B36A]/20">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D6B36A] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-[#D6B36A]/80 font-medium mb-3">
                  {service.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#D6B36A]/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>ثبت درخواست این سرویس</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#D6B36A]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
