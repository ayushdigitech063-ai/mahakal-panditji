'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { SEEDED_FESTIVALS_2026 } from '@/data/reviews';
import { openBookingModal } from '@/lib/sweetalert';

export default function SpecialYearSection() {
  const currentYear = new Date().getFullYear() < 2026 ? 2026 : new Date().getFullYear();

  return (
    <section className="py-20 bg-spiritual-gradient text-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-700/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Auspicious Muhurats & Parvs"
          title={`Special Pooja & Seva For ${currentYear}`}
          subtitle="Pre-book sacred Sevas during divine celestial alignments and holy Ujjain festivals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEEDED_FESTIVALS_2026.map((fest) => (
            <div
              key={fest.id}
              className="bg-white/5 backdrop-blur-md border border-amber-400/20 rounded-3xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={fest.image}
                    alt={fest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f0b04] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-amber-500/20 border border-amber-400/30 backdrop-blur-md text-amber-300 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                    {fest.badge}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{fest.date}</span>
                  </div>

                  <h3 className="heading-spiritual text-xl font-bold text-amber-100 mb-1 group-hover:text-amber-300 transition-colors">
                    {fest.name}
                  </h3>
                  <p className="text-xs text-amber-200/70 font-medium mb-3">
                    {fest.poojaName}
                  </p>
                  <p className="text-xs text-amber-100/60 leading-relaxed line-clamp-3">
                    {fest.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() =>
                    openBookingModal({
                      poojaName: `${fest.name} - ${fest.poojaName}`,
                    })
                  }
                  className="w-full bg-saffron-gradient text-white text-xs font-bold py-2.5 rounded-full shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Reserve Festival Seva</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
