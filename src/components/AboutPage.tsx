import React from 'react';
import { Shield, Award, Users, CheckCircle, Sparkles, Phone, ArrowLeft } from 'lucide-react';
import { TRUST_STATS } from '../data/content';

interface AboutPageProps {
  onExploreCars: () => void;
  onContactUs: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExploreCars, onContactUs }) => {
  return (
    <div id="about-page" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>اصالت و تعهد</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          درباره مجتبی رنت
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
          بازتعریف تجربه اجاره خودرو در ایران؛ بدون تشریفات دست‌وپاگیر و با شفاف‌ترین استانداردها
        </p>
      </div>

      {/* Main Story & Values Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        <div className="lg:col-span-7 text-right space-y-4">
          <h2 className="text-2xl font-bold text-white leading-snug">
            ماموریت ما: ایجاد بالاترین حس امنیت، وقار و راحتی برای هر سفر
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed font-light">
            مجموعه «مجتبی رنت» با هدف برچیدن چالش‌های سنتی بازار اجاره خودرو از قبیل عدم شفافیت در قیمت‌ها، تاخیر در استرداد ودیعه، و خودروهای با نقص فنی پایه‌گذاری شد.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed font-light">
            امروز ما مفتخریم که با دارا بودن ناوگانی متشکل از بیش از ۶۵ خودروی لوکس، شاسی‌بلند و اقتصادی، پاسخگوی هزاران مسافر، کارآفرین، گردشگر و دیپلمات در تهران، کیش، شیراز و سراسر شهرهای ایران هستیم.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
              <span className="text-xs font-semibold text-white">عضو رسمی اتحادیه کرایه اتومبیل</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
              <span className="text-xs font-semibold text-white">ضمانت کتبی بازگشت آنی ودیعه</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
              <span className="text-xs font-semibold text-white">بیمه کامل بدنه و سرنشینان</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
              <span className="text-xs font-semibold text-white">پشتیبانی ۲۴ ساعته و امداد جاده‌ای</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D6B36A] to-[#8C6D2B] p-0.5 mx-auto mb-4">
              <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center">
                <span className="text-3xl font-black text-[#D6B36A]">M</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">مجتبی رنت</h3>
            <p className="text-xs text-neutral-400 font-mono mb-6">PREMIUM AUTOMOTIVE MOBILITY</p>
            
            <div className="grid grid-cols-2 gap-3 text-right">
              {TRUST_STATS.map((s) => (
                <div key={s.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-lg font-black text-[#D6B36A] block font-mono">{s.value}</span>
                  <span className="text-[11px] text-neutral-300">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="glass-card p-8 rounded-3xl text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h3 className="text-lg font-bold text-white">سفری بی‌دغدغه در انتظار شماست</h3>
          <p className="text-xs text-neutral-400">مشاهده مشخصات ناوگان خودروها یا تماس مستقیم با کارشناس تشریفات</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onContactUs}
            className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#D6B36A]" />
            <span>تماس با ما</span>
          </button>
          <button
            onClick={onExploreCars}
            className="px-6 py-3 rounded-xl bg-[#D6B36A] text-black text-xs font-bold shadow-md flex items-center gap-1.5"
          >
            <span>مشاهده خودروها</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
