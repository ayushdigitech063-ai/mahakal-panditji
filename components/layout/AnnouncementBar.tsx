'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent(
    'जय श्री महाकाल 🙏 मुझे महाकाल मंदिर पूजा एवं पंडित जी बुकिंग हेतु परामर्श चाहिए।'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-saffron-gradient text-white py-2 px-4 text-xs md:text-sm font-medium tracking-wide shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="animate-pulse flex items-center justify-center bg-white/20 p-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          </span>
          <span className="truncate">
            🚩 जय श्री महाकाल — उज्जैन महाकाल धाम में सिद्ध पूजन एवं पंडित जी बुकिंग केंद्र
          </span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-all border border-white/20 whitespace-nowrap ml-4"
        >
          <span>पूजा परामर्श लें</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
