'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import PoojaCard from '@/components/pooja/PoojaCard';
import { Pooja } from '@/types/pooja';

interface MukhyaPoojaSectionProps {
  poojas: Pooja[];
}

export default function MukhyaPoojaSection({ poojas }: MukhyaPoojaSectionProps) {
  const mukhyaPoojas = poojas.filter((p) => p.isMukhya);

  return (
    <section className="py-20 bg-gradient-to-b from-[#fffaf2] via-[#fff4e3] to-[#fffaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="सिद्ध वैदिक अनुष्ठान"
          title="प्रमुख पूजन एवं दोष निवारण"
          subtitle="महाकाल नगरी उज्जैन में कराई जाने वाली सिद्ध एवं फलदायी पूजाएं"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mukhyaPoojas.map((pooja) => (
            <PoojaCard key={pooja.id} pooja={pooja} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pooja"
            className="inline-flex items-center gap-2 bg-saffron-gradient text-white px-8 py-3.5 rounded-full font-bold shadow-spiritual hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <span>सभी पूजाएं देखें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
