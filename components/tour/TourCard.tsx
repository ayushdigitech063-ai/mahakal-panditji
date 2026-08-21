'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, CheckCircle2, Compass } from 'lucide-react';
import { Tour } from '../../types';

interface TourCardProps {
  tour: Tour;
  onEnquire?: (tourName: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const whatsAppNumber = '919876543210';
  const whatsAppText = encodeURIComponent(
    `Pranam Pandit Ji, I want to enquire about booking the spiritual tour "${tour.name}" (${tour.duration}, starting ₹${tour.startingPrice}). Please share tour package details.`
  );

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group">
      {/* Tour Cover Image & Badges */}
      <div className="relative h-36 sm:h-64 w-full overflow-hidden bg-amber-950/10">
        <Image
          src={tour.coverImage}
          alt={tour.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {tour.featured && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-saffron-gradient text-white text-[8px] sm:text-xs font-extrabold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
            🚩 Yatra
          </div>
        )}

        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-[8px] sm:text-xs font-semibold">
          <span className="bg-black/60 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-md flex items-center gap-0.5">
            <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-300" />
            <span>{tour.duration}</span>
          </span>
          <span className="font-extrabold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-amber-500/40">
            ₹{tour.startingPrice.toLocaleString('en-IN')} <span className="text-[7px] sm:text-[10px] font-normal text-amber-100">/pp</span>
          </span>
        </div>
      </div>

      {/* Tour Content */}
      <div className="p-2.5 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
        <div>
          <div className="flex items-center gap-1 text-[9px] sm:text-xs font-bold text-[#c96b18] uppercase tracking-wider mb-0.5">
            <Compass className="w-3 h-3" />
            <span className="truncate">{tour.destination}</span>
          </div>
          <h3 className="heading-spiritual text-xs sm:text-xl font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors truncate">
            {tour.name}
          </h3>
          <p className="text-[9px] sm:text-xs text-[#75695d] mt-1 line-clamp-2 leading-snug sm:leading-relaxed">
            {tour.description}
          </p>

          {/* Highlights List */}
          <div className="mt-1.5 space-y-1 border-t border-[#eadfce]/60 pt-1.5">
            {tour.highlights.slice(0, 2).map((item, i) => (
              <div key={i} className="flex items-center gap-1 text-[9px] sm:text-xs text-[#2b2118] font-medium truncate">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: Text Only Clean WhatsApp */}
        <div className="pt-2 sm:pt-4 border-t border-[#eadfce] grid grid-cols-2 gap-1.5 sm:gap-3">
          <Link
            href={`/tours/${tour.slug}`}
            className="text-center text-[10px] sm:text-xs font-bold py-1.5 sm:py-2.5 px-1 rounded-lg sm:rounded-xl border border-[#c96b18] text-[#c96b18] hover:bg-[#c96b18] hover:text-white transition-all flex items-center justify-center leading-none"
          >
            Package
          </Link>
          <a
            href={`https://wa.me/${whatsAppNumber}?text=${whatsAppText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[10px] sm:text-xs font-bold py-1.5 sm:py-2.5 px-1 rounded-lg sm:rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm transition-all flex items-center justify-center leading-none"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
