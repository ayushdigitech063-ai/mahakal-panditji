'use client';

import React from 'react';
import { Users, Flame, Building2, Star } from 'lucide-react';
import { SEEDED_STATS } from '@/data/reviews';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: SEEDED_STATS.experiencedPandits,
      suffix: '+',
      label: 'विद्वान पंडित जी',
      sublabel: 'गुरुकुल शिक्षित',
    },
    {
      icon: Flame,
      value: SEEDED_STATS.poojasPerformed,
      suffix: '+',
      label: 'संपन्न अनुष्ठान',
      sublabel: 'उज्जैन महाकाल धाम',
    },
    {
      icon: Building2,
      value: SEEDED_STATS.citiesServed,
      suffix: '+',
      label: 'शहरों में यजमान',
      sublabel: 'देश-विदेश',
    },
    {
      icon: Star,
      value: SEEDED_STATS.rating,
      decimals: 1,
      suffix: ' / 5',
      label: 'यजमान रेटिंग',
      sublabel: 'संतुष्ट भक्तजन',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#fffaf2] border border-[#eadfce] rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#eadfce]">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`flex flex-col items-center text-center ${
                index > 0 ? 'pt-6 lg:pt-0' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#c96b18]/10 flex items-center justify-center text-[#c96b18] mb-3">
                <Icon className="w-6 h-6" />
              </div>
              <div className="heading-spiritual text-3xl sm:text-4xl font-bold text-[#8f3f12]">
                <AnimatedCounter value={stat.value} decimals={stat.decimals || 0} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm font-bold text-[#2b2118] mt-1">{stat.label}</p>
              <p className="text-xs text-[#75695d] mt-0.5">{stat.sublabel}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
