'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { Pandit } from '../../types';
import { resolveImageUrl } from '../../lib/api';

interface PanditCardProps {
  pandit: Pandit;
}

const DEFAULT_PANDIT_IMG = '/images/pandits/pandit1.jpg';

export const PanditCard: React.FC<PanditCardProps> = ({ pandit }) => {
  const initialUrl = resolveImageUrl(pandit.image, DEFAULT_PANDIT_IMG);
  const [imgSrc, setImgSrc] = useState<string>(initialUrl);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group">
      {/* Image & Badge */}
      <div className="relative h-40 sm:h-64 w-full overflow-hidden bg-amber-950/10">
        <Image
          src={imgSrc}
          alt={pandit.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 380px"
          loading="lazy"
          decoding="async"
          onError={() => {
            if (imgSrc !== DEFAULT_PANDIT_IMG) {
              setImgSrc(DEFAULT_PANDIT_IMG);
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {pandit.isVerified && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-glass border border-amber-300 text-[#8f3f12] text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-[#c96b18]" />
            <span className="hidden sm:inline">Verified Pandit</span>
            <span className="sm:hidden">Verified</span>
          </div>
        )}

        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-[9px] sm:text-xs font-semibold">
          <div className="flex items-center gap-0.5 sm:gap-1 bg-black/60 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{pandit.experience} Yrs</span>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1 bg-amber-500/90 text-white px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-bold">
            <Star className="w-3.5 h-3.5 fill-white" />
            <span>{pandit.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
        <div>
          <h3 className="heading-spiritual text-sm sm:text-xl font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors truncate">
            {pandit.name}
          </h3>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#75695d] mt-0.5 truncate">
            <MapPin className="w-3 h-3 text-[#c96b18] shrink-0" />
            <span className="truncate">{pandit.location}</span>
          </div>
          <p className="text-[10px] sm:text-xs text-[#75695d] mt-1.5 line-clamp-2 leading-snug sm:leading-relaxed">
            {pandit.shortDescription}
          </p>

          {/* Specializations Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {pandit.specializations.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[9px] sm:text-[11px] font-medium bg-[#fffaf2] text-[#8f3f12] border border-[#eadfce] px-1.5 py-0.5 rounded-md truncate max-w-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: 2 in 1 Line on Mobile Grid */}
        <div className="pt-2 sm:pt-4 border-t border-[#eadfce] grid grid-cols-2 gap-1.5 sm:gap-3">
          <Link
            href={`/pandit/${pandit.slug}`}
            className="text-center text-[10px] sm:text-xs font-semibold py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-lg sm:rounded-xl border border-[#c96b18] text-[#c96b18] hover:bg-[#c96b18]/10 transition-colors truncate"
          >
            Profile
          </Link>
          <a
            href={`https://wa.me/${pandit.whatsAppNumber || '919876543210'}?text=${encodeURIComponent(`Pranam Pandit Ji, I want to book a pooja ritual with ${pandit.name} in Ujjain.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[10px] sm:text-xs font-bold py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center justify-center gap-0.5 truncate"
          >
            <span>WhatsApp</span>
            <ChevronRight className="w-3 h-3 shrink-0 hidden sm:inline" />
          </a>
        </div>
      </div>
    </div>
  );
};
