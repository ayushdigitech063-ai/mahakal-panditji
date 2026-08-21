'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Festival, HomepageSettings } from '../../types';

interface SpecialFestivalSectionProps {
  festivals: Festival[];
  settings?: HomepageSettings['festivalSection'];
}

export const SpecialFestivalSection: React.FC<SpecialFestivalSectionProps> = ({ festivals, settings }) => {
  if (settings && !settings.isVisible) return null;

  const heading = settings?.heading || 'Special Pooja & Seva For 2026';
  const year = settings?.year || '2026';

  const visibleFestivals = festivals.filter((f) => f.isVisible);
  if (visibleFestivals.length === 0) return null;

  return (
    <section className="py-20 bg-spiritual-gradient text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upcoming Ujjain Festivals ({year})</span>
          </div>
          <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-amber-100">
            {heading}
          </h2>
          <p className="text-sm text-amber-100/70">
            Reserve your divine abhishek and special mahotsav pujan slots in advance for holy occasions in Ujjain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleFestivals.map((fest, idx) => (
            <motion.div
              key={fest._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-black/40 border border-amber-500/30 rounded-3xl overflow-hidden backdrop-blur-md flex flex-col sm:flex-row group hover:border-amber-400/60 transition-all"
            >
              <div className="relative h-56 sm:h-auto sm:w-1/2 overflow-hidden bg-amber-950/40">
                <Image
                  src={fest.image}
                  alt={fest.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full w-fit mb-2 border border-amber-800/40">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{fest.dateText}</span>
                  </div>
                  <h3 className="heading-spiritual text-xl font-bold text-amber-100 mt-2">
                    {fest.title}
                  </h3>
                  <p className="text-xs text-amber-100/70 mt-2 leading-relaxed">
                    {fest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-500/20">
                  <Link
                    href={`/contact?service=${encodeURIComponent(fest.poojaName)}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                  >
                    <span>Reserve Festival Seva</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
