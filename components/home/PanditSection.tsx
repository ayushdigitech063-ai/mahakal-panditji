'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import PanditCard from '@/components/pandit/PanditCard';
import { Pandit } from '@/types/pandit';

interface PanditSectionProps {
  pandits: Pandit[];
}

export default function PanditSection({ pandits }: PanditSectionProps) {
  return (
    <section className="py-20 bg-[#fffaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Om Emblem & Subtitle Layout Matching User Screenshot */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center justify-center gap-2 text-2xl font-serif text-[#8f3f12]">
            <span className="w-8 h-px bg-amber-400/60" />
            <span>🕉️</span>
            <span className="w-8 h-px bg-amber-400/60" />
          </div>

          <h2 className="heading-spiritual text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#8f3f12] tracking-tight">
            उज्जैन के प्रसिद्ध जानकार पंडित जी
          </h2>

          <p className="text-sm sm:text-base font-medium text-[#75695d]">
            सत्य मार्गदर्शन | अनुभव की शक्ति | समाधान की गारंटी
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pandits.slice(0, 6).map((pandit) => (
            <PanditCard key={pandit.id} pandit={pandit} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pandits"
            className="inline-flex items-center gap-2 bg-saffron-gradient text-white px-8 py-3.5 rounded-full font-bold shadow-spiritual hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <span>सभी पंडित जी देखें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
