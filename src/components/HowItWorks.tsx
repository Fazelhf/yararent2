import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/content';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HowItWorksProps {
  onStartBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartBooking }) => {
  return (
    <section id="how-it-works-section" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
            <span>فرآیند ۳ مرحله‌ای آسان</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            چطور خودرو اجاره کنیم؟
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            از انتخاب آنلاین تا نشستن پشت فرمان؛ تنها چند دقیقه فاصله دارید
          </p>
        </div>

        {/* 3 Sequential Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#D6B36A]/20 to-transparent -translate-y-6 pointer-events-none" />

          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              id={`how-step-${idx + 1}`}
              className="glass-card p-7 rounded-3xl relative flex flex-col justify-between group hover:border-[#D6B36A]/40 transition-all duration-300"
            >
              <div>
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D6B36A]/20 to-white/5 border border-[#D6B36A]/30 flex items-center justify-center text-xl font-mono font-extrabold text-[#D6B36A]">
                    {step.step}
                  </div>
                  <span className="text-xs font-medium text-neutral-500 group-hover:text-[#D6B36A] transition-colors flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    مرحله {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D6B36A] transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  {idx === 0 ? 'آنلاین در سایت' : idx === 1 ? 'کمتر از ۱۵ دقیقه' : 'درب منزل یا فرودگاه'}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D6B36A]/60 group-hover:scale-150 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartBooking}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#D6B36A]/40 text-sm font-semibold transition-all shadow-lg cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
            <span>شروع درخواست رزرو خودرو</span>
            <ArrowLeft className="w-4 h-4 text-[#D6B36A]" />
          </button>
        </div>
      </div>
    </section>
  );
};
