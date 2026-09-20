import React from 'react';
import { Sparkles, Layers, DollarSign, Zap, Headphones } from 'lucide-react';
import { WHY_US_ITEMS } from '../data/content';

export const WhyUs: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'variety':
        return <Layers className="w-5 h-5 text-[#D6B36A]" />;
      case 'transparent-pricing':
        return <DollarSign className="w-5 h-5 text-[#D6B36A]" />;
      case 'fast-delivery':
        return <Zap className="w-5 h-5 text-[#D6B36A]" />;
      case 'real-support':
        return <Headphones className="w-5 h-5 text-[#D6B36A]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#D6B36A]" />;
    }
  };

  return (
    <section id="why-us-section" className="py-20 relative overflow-hidden bg-[#070709] border-y border-white/[0.06]">
      {/* Background Lighting */}
      <div className="absolute -top-32 right-1/3 w-96 h-96 bg-[#D6B36A]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
            <span>استانداردهای مجتبی رنت</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            چرا مجتبی رنت؟
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            تمایز ما در جزئیات، شفافیت قراردادها و ارزش نهادن به زمان و آرامش شماست
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`why-card-${item.id}`}
              className="glass-card p-6 rounded-3xl flex flex-col justify-between group hover:border-[#D6B36A]/30 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 group-hover:bg-[#D6B36A]/10 transition-colors">
                  {getIcon(item.id)}
                </div>

                <span className="text-[11px] font-mono text-[#D6B36A] px-2 py-0.5 rounded bg-[#D6B36A]/10 inline-block mb-2">
                  {item.highlight}
                </span>

                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
                <span>ضمانت کیفیت رسمی</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
