import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/content';
import { toPersianDigits } from '../lib/formatters';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#D6B36A] mb-3">
            <span>تجربه مشتریان</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            مشتریان ما چه می‌گویند؟
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            نظرات ثبت‌شده مشتریان پس از پایان مدت اجاره و عودت بدون معطلی ودیعه
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="glass-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between relative group hover:border-[#D6B36A]/30 transition-all duration-300"
            >
              <div>
                {/* Header: Stars & Car */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D6B36A]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D6B36A]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#D6B36A]">
                    {review.carName}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                  «{review.comment}»
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Monogram Initials instead of fake photos */}
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-bold text-[#D6B36A]">
                    {review.name.slice(0, 2)}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white">{review.name}</h4>
                      {review.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-500">{review.city}</span>
                  </div>
                </div>

                <span className="text-[11px] text-neutral-500 font-mono">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
