'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Review } from '../../types';

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const visibleReviews = reviews.filter((r) => r.isApproved && r.isVisible);
  if (visibleReviews.length === 0) return null;

  return (
    <section className="py-20 bg-[#fffaf2] border-t border-[#eadfce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
            Devotee Testimonials
          </span>
          <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f]">
            Trusted By Devotees Across India & Abroad
          </h2>
          <p className="text-sm text-[#75695d]">
            Read genuine experiences of pilgrims who performed holy rituals in Ujjain with our verified Pandits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleReviews.map((rev, idx) => (
            <motion.div
              key={rev._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-[#eadfce] shadow-spiritual relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-[#c96b18]/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-sm text-[#2b2118] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#eadfce]/60 flex items-center justify-between">
                <div>
                  <span className="heading-spiritual font-bold text-base text-[#7a1f1f] block">
                    {rev.name}
                  </span>
                  {rev.panditName && (
                    <span className="text-xs text-[#75695d] block">
                      Ritual with {rev.panditName}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-[#8f3f12] bg-[#fffaf2] border border-[#eadfce] px-2.5 py-1 rounded-full">
                  Verified Devotee
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
