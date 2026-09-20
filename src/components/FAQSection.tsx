import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 relative overflow-hidden bg-[#07070a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>پاسخ به ابهامات متداول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            پرسش‌های متداول مشتریان
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            تمامی قوانین، مدارک و شرایط ضمانت به شفافیت در این بخش گردآوری شده است
          </p>
        </div>

        {/* Search Bar for FAQs */}
        <div className="relative mb-6">
          <input
            type="text"
            id="faq-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در پرسش‌ها (مثلاً: مدارک، ودیعه، کنسلی...)"
            className="w-full py-3.5 px-11 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D6B36A] transition-colors"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              پاک کردن
            </button>
          )}
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'همه سوالات' },
            { id: 'docs', label: 'مدارک و ضمانت' },
            { id: 'pricing', label: 'قیمت و ودیعه' },
            { id: 'rules', label: 'قوانین و شرایط' },
            { id: 'driver', label: 'با / بدون راننده' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#D6B36A] text-black font-bold'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#D6B36A]/40 bg-white/[0.04]' : 'border-white/[0.07]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? 'text-[#D6B36A]' : 'text-white'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/[0.04] text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-[#D6B36A]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.04] animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-neutral-400 text-sm">
              موردی متناسب با جستجوی شما یافت نشد. می‌توانید مستقیماً با کارشناسان ما تماس بگیرید.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
