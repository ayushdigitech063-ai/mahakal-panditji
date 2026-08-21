'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { Pandit } from '../../types';

import { resolveImageUrl } from '../../lib/api';

interface PanditCardProps {
  pandit: Pandit;
}

export const PanditCard: React.FC<PanditCardProps> = ({ pandit }) => {
  return (
    <div className="bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group">
      {/* Image & Badge */}
      <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-amber-950/10">
        <Image
          src={resolveImageUrl(pandit.image, '/images/pandits/pandit1.jpg')}
          alt={pandit.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {pandit.isVerified && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-glass border border-amber-300 text-[#8f3f12] text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c96b18]" />
            <span>Verified Pandit</span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-sm text-[10px] sm:text-xs font-semibold">
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>{pandit.experience} Yrs Exp</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-500/90 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
            <span>{pandit.rating} ({pandit.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        <div>
          <h3 className="heading-spiritual text-lg sm:text-xl font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors">
            {pandit.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-[#75695d] mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#c96b18] shrink-0" />
            <span>{pandit.location}</span>
          </div>
          <p className="text-xs text-[#75695d] mt-2 line-clamp-2 leading-relaxed">
            {pandit.shortDescription}
          </p>

          {/* Specializations Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {pandit.specializations.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] sm:text-[11px] font-medium bg-[#fffaf2] text-[#8f3f12] border border-[#eadfce] px-2 py-0.5 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: 1 Line Grid on Mobile */}
        <div className="pt-3 border-t border-[#eadfce] grid grid-cols-2 gap-2 sm:gap-3">
          <Link
            href={`/pandit/${pandit.slug}`}
            className="text-center text-xs font-semibold py-2.5 px-2 rounded-xl border border-[#c96b18] text-[#c96b18] hover:bg-[#c96b18]/10 transition-colors truncate"
          >
            View Profile
          </Link>
          <a
            href={`https://wa.me/${pandit.whatsAppNumber || '919876543210'}?text=${encodeURIComponent(`Pranam Pandit Ji, I want to book a pooja ritual with ${pandit.name} in Ujjain.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-xs font-bold py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center justify-center gap-1 truncate"
          >
            <span>WhatsApp</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};
