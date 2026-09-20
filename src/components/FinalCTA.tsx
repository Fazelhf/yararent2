import React from 'react';
import { ArrowLeft, Phone, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onExploreCars: () => void;
  onContactUs: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExploreCars, onContactUs }) => {
  return (
    <section id="final-cta-section" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-14 lg:p-16 rounded-[2.5rem] border border-white/15 relative overflow-hidden text-center flex flex-col items-center justify-center">
          {/* Ambient Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D6B36A]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-[#D6B36A] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>رزرو سریع در کمتر از ۳ دقیقه</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl">
            آماده‌ای حرکت کنی؟
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mb-9 leading-relaxed">
            خودروی موردنظرت را انتخاب کن و درخواست اجاره را همین حالا ثبت کن. کارشناسان ما جهت هماهنگی تحویل در سریع‌ترین زمان با شما تماس می‌گیرند.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              id="final-cta-explore-btn"
              onClick={onExploreCars}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D6B36A] via-[#E5C57E] to-[#B89246] text-black font-bold text-sm shadow-xl shadow-[#D6B36A]/25 hover:shadow-[#D6B36A]/45 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>مشاهده خودروها</span>
              <ArrowLeft className="w-4 h-4 text-black" />
            </button>

            <button
              id="final-cta-contact-btn"
              onClick={onContactUs}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D6B36A]" />
              <span>تماس با ما</span>
            </button>
          </div>

          {/* Quick contact numbers */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-neutral-400 font-mono" dir="ltr">
            <span>VIP Dispatch: +98 21 8888 9900</span>
            <span className="text-neutral-600">|</span>
            <span>WhatsApp: +98 912 888 9900</span>
          </div>
        </div>
      </div>
    </section>
  );
};
