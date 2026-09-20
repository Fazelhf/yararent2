import React from 'react';
import { TRUST_STATS } from '../data/content';
import { Shield, Award, CheckCircle, Clock } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust-section" className="py-20 relative overflow-hidden bg-[#08080b] border-y border-white/[0.06]">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-[#D6B36A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>اعتماد و شفافیت</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            کارنامه عملکرد مجتبی رنت
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            آماری بر پایه سال‌ها همراهی مستمر با مشتریان خصوصی، سفارتخانه‌ها و شرکت‌های بین‌المللی
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.id}
              id={`stat-card-${stat.id}`}
              className="glass-card p-6 sm:p-8 rounded-3xl text-center flex flex-col items-center justify-center relative group hover:border-[#D6B36A]/30 transition-all"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white gold-text-gradient font-mono tracking-tight mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-neutral-200 mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-neutral-400">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Official Certifications Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D6B36A]/10 text-[#D6B36A]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">دارای پروانه رسمی از اتحادیه کرایه خودرو</h5>
              <p className="text-xs text-neutral-400">تمام قراردادها به صورت رسمی و همراه با نسخه الکترونیک معتبر صادر می‌گردد.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>پشتیبانی شبانه‌روزی فعال: ۰۲۱-۸۸۸۸۹۹۰۰</span>
          </div>
        </div>
      </div>
    </section>
  );
};
