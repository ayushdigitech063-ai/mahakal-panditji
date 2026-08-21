'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HomepageSettings } from '../../types';

interface AnnouncementBarProps {
  data?: HomepageSettings['announcement'];
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ data }) => {
  if (data && !data.isVisible) return null;

  const text = data?.text || '🔱 Special Mahakal Pooja Bookings Open — Connect With Experienced Pandit Ji';
  const ctaText = data?.ctaText || 'Book Now';
  const ctaLink = data?.ctaLink || '/pooja';

  return (
    <div className="bg-saffron-gradient text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 relative z-50 shadow-sm">
      <Sparkles className="w-4 h-4 animate-pulse text-amber-200" />
      <span className="truncate max-w-[80vw] sm:max-w-none">{text}</span>
      <Link
        href={ctaLink}
        className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm transition-all ml-1 shrink-0"
      >
        <span>{ctaText}</span>
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
};
