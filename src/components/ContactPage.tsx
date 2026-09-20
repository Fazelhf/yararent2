import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2, Headphones } from 'lucide-react';
import { BRANCHES_LIST } from '../data/content';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('استعلام قیمت و رزرو');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSentSuccess(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
    }, 1500);
  };

  return (
    <div id="contact-page" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
          <Headphones className="w-3.5 h-3.5" />
          <span>ارتباط بدون واسطه</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          تماس با مجتبی رنت
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
          تیم تشریفات و پشتیبانی ما به‌صورت ۲۴ ساعته آماده پاسخگویی و مشاوره هستند
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Contact Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-right">
          <h3 className="text-xl font-bold text-white mb-2">ارسال پیام یا درخواست مشاوره</h3>
          <p className="text-xs text-neutral-400 mb-6">
            اطلاعات خود را وارد کنید، کارشناس ما در سریع‌ترین زمان با شما تماس می‌گیرد.
          </p>

          {sentSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">پیام شما دریافت شد</h4>
              <p className="text-xs text-neutral-300">
                کارشناسان مجتبی رنت حداکثر تا ۱۵ دقیقه آینده با شما تماس خواهند گرفت.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    نام و نام خانوادگی <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: کامران رستمی"
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[#D6B36A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    شماره همراه <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[#D6B36A] focus:outline-none text-left"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  موضوع درخواست
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                >
                  <option value="استعلام قیمت و رزرو" className="bg-[#121216]">استعلام قیمت و رزرو</option>
                  <option value="اجاره خودرو با راننده و تشریفات" className="bg-[#121216]">اجاره خودرو با راننده و تشریفات</option>
                  <option value="اجاره برای مراسم عروسی" className="bg-[#121216]">اجاره برای مراسم عروسی</option>
                  <option value="ترانسفر فرودگاهی امام خمینی" className="bg-[#121216]">ترانسفر فرودگاهی امام خمینی</option>
                  <option value="قرارداد بلندمدت شرکتی" className="bg-[#121216]">قرارداد بلندمدت شرکتی</option>
                  <option value="انتقاد یا پیشنهاد" className="bg-[#121216]">انتقاد یا پیشنهاد</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  متن پیام یا توضیحات
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="خودرو یا تاریخ مورد نظر خود را ذکر بفرمایید..."
                  className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[#D6B36A] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B89246] text-black text-xs font-bold shadow-md shadow-[#D6B36A]/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-black" />
                <span>ارسال پیام به مجتبی رنت</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels */}
        <div className="lg:col-span-5 flex flex-col gap-4 text-right">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D6B36A]" />
              ساعات کاری و پاسخگویی
            </h4>
            <div className="text-xs text-neutral-300 space-y-1.5">
              <p>• دیسپچ و رزرو فوری: ۲۴ ساعته در تمام ایام هفته (بدون تعطیلی)</p>
              <p>• پذیرش حضوری در شعب: شنبه تا پنجشنبه از ساعت ۰۸:۰۰ الی ۲۱:۰۰</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D6B36A]" />
              شماره‌های مستقیم
            </h4>
            
            <a
              href="tel:02188889900"
              className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center justify-between transition-colors"
            >
              <span className="text-xs text-neutral-300">تلفن گویا و پشتیبانی مرکزی</span>
              <span dir="ltr" className="text-xs font-mono font-bold text-white">۰۲۱ - ۸۸۸۸ ۹۹۰۰</span>
            </a>

            <a
              href="https://wa.me/989128889900"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center justify-between transition-colors"
            >
              <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                واتساپ واحد VIP
              </span>
              <span dir="ltr" className="text-xs font-mono font-bold text-white">۰۹۱۲ - ۸۸۸ ۹۹۰۰</span>
            </a>

            <a
              href="mailto:info@mojtabarent.ir"
              className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center justify-between transition-colors"
            >
              <span className="text-xs text-neutral-300">پست الکترونیک رسمی</span>
              <span dir="ltr" className="text-xs font-mono text-neutral-400">info@mojtabarent.ir</span>
            </a>
          </div>
        </div>
      </div>

      {/* Branches Locations Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-right">
          ایستگاه‌ها و شعب تحویل خودرو
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRANCHES_LIST.map((branch) => (
            <div
              key={branch.id}
              className="glass-card p-5 rounded-2xl text-right space-y-2 border border-white/10"
            >
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <MapPin className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
                <span>{branch.name}</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed min-h-[36px]">
                {branch.address}
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] text-[#D6B36A] font-mono" dir="ltr">
                {branch.phone}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
