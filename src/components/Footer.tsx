import React from 'react';
import { Phone, Mail, MapPin, Instagram, Send, MessageCircle, ShieldCheck, ArrowUp } from 'lucide-react';
import { BRANCHES_LIST } from '../data/content';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#030304] border-t border-white/[0.08] pt-16 pb-12 relative text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Wordmark & Summary */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6B36A] to-[#8C6D2B] p-0.5">
                <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-[#D6B36A] text-lg">M</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white block">مجتبی رنت</span>
                <span className="text-[10px] tracking-widest text-[#A1A1AA] uppercase font-mono">
                  Mojtaba Rent Luxury Cars
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 max-w-sm">
              سامانه مدرن اجاره خودروهای لوکس، شاسی‌بلند و اقتصادی در ایران. ارائه خدمات تشریفاتی با و بدون راننده، ترانسفر فرودگاهی و تحویل در محل با قرارداد رسمی و ضمانت استرداد ودیعه.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#D6B36A]/20 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#D6B36A] transition-all"
                aria-label="اینستاگرام مجتبی رنت"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#D6B36A]/20 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#D6B36A] transition-all"
                aria-label="تلگرام مجتبی رنت"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/989128889900"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#D6B36A]/20 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#D6B36A] transition-all"
                aria-label="واتساپ مجتبی رنت"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
              دسترسی سریع
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cars')}
                  className="hover:text-white transition-colors"
                >
                  ناوگان خودروها
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors text-[#D6B36A]"
                >
                  رزرو آنلاین خودرو
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  خدمات تشریفات و مراسم
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  درباره مجتبی رنت
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors"
                >
                  سؤالات متداول و قوانین
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Branches & Hubs */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
              شعب و ایستگاه‌های تحویل
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              {BRANCHES_LIST.slice(0, 3).map((branch) => (
                <div key={branch.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="font-semibold text-neutral-200 block mb-0.5">{branch.name}</span>
                  <span className="text-[11px] text-neutral-500 block truncate">{branch.address}</span>
                  <span className="text-[11px] text-[#D6B36A] font-mono mt-1 block" dir="ltr">{branch.phone}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Trust, Licenses & Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
              پشتیبانی و مجوزها
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6B36A]" />
                <span dir="ltr" className="font-mono text-xs">۰۲۱ - ۸۸۸۸ ۹۹۰۰</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#D6B36A]" />
                <span dir="ltr" className="font-mono text-xs">۰۹۱۲ - ۸۸۸ ۹۹۰۰ (واتساپ)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6B36A]" />
                <span dir="ltr" className="font-mono text-xs">vip@mojtabarent.ir</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] text-neutral-400 leading-relaxed">
                  تهران، خیابان فرشته (شهید فیاضی)، برج آناهیتا، پلاک ۲۴
                </span>
              </div>

              {/* License Seals Placeholders */}
              <div className="pt-2 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] text-neutral-300">عضو رسمی اتحادیه</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D6B36A]" />
                  <span className="text-[10px] text-neutral-300">ضمانت رسمی قرارداد</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© تمامی حقوق مادی و معنوی این وبسایت متعلق به برند «مجتبی رنت» (Mojtaba Rent) است.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-[#D6B36A] transition-colors py-1 px-3 rounded-lg bg-white/[0.03] border border-white/5"
          >
            <span>بازگشت به بالا</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
