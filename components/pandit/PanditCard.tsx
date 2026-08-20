'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Award, Users, MessageCircle, FileText } from 'lucide-react';
import { Pandit } from '@/types/pandit';

interface PanditCardProps {
  pandit: Pandit;
}

export default function PanditCard({ pandit }: PanditCardProps) {
  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent(
    `जय श्री महाकाल 🙏 मुझे ${pandit.name} जी से पूजा एवं मुहूर्त परामर्श हेतु संपर्क करना है।`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="group bg-white border border-[#eadfce] rounded-[28px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Top Image Section */}
      <div className="relative w-full h-72 overflow-hidden bg-amber-950/10">
        <Image
          src={pandit.image}
          alt={pandit.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges (Veda / Specialization Pill & Rating Box) */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="bg-white/90 backdrop-blur-md text-[#8f3f12] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-amber-200">
            <span className="text-amber-500">⭐</span>
            <span>{pandit.specializations[0] || 'वैदिक विशेषज्ञ'}</span>
          </div>

          <div className="bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{pandit.rating}</span>
            <span className="text-white/70">({pandit.reviewCount})</span>
          </div>
        </div>

        {/* Bottom Overlay Info (Name & Short Subtitle) */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <h3 className="heading-spiritual text-2xl font-bold text-amber-50 truncate">
            {pandit.name}
          </h3>
          <p className="text-xs text-amber-200/90 font-medium truncate mt-0.5">
            {pandit.title}
          </p>
        </div>
      </div>

      {/* Middle Grid Info Stats (Experience, Location, Happy Devotees) */}
      <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-2 text-center py-3 px-2 bg-[#fffaf2] border border-[#eadfce] rounded-2xl">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-[#8f3f12]">
              <Award className="w-3.5 h-3.5 text-[#c96b18]" />
              <span className="text-xs font-extrabold">{pandit.experienceYears}+ वर्ष</span>
            </div>
            <span className="text-[10px] text-[#75695d] block font-medium">अनुभव</span>
          </div>

          <div className="space-y-0.5 border-x border-[#eadfce]">
            <div className="flex items-center justify-center gap-1 text-[#8f3f12]">
              <MapPin className="w-3.5 h-3.5 text-[#c96b18]" />
              <span className="text-xs font-extrabold truncate">उज्जैन</span>
            </div>
            <span className="text-[10px] text-[#75695d] block font-medium">स्थान</span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-[#8f3f12]">
              <Users className="w-3.5 h-3.5 text-[#c96b18]" />
              <span className="text-xs font-extrabold">{pandit.stats.happyDevotees}+</span>
            </div>
            <span className="text-[10px] text-[#75695d] block font-medium">संतुष्ट ग्राहक</span>
          </div>
        </div>

        {/* Specialization Tags */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-[#8f3f12] uppercase tracking-wider block">
            विशेषज्ञता व पूजाएं
          </span>
          <div className="flex flex-wrap gap-1.5">
            {pandit.specializations.map((spec, i) => (
              <span
                key={i}
                className="text-xs bg-white border border-[#eadfce] text-[#75695d] px-2.5 py-1 rounded-lg font-medium shadow-2xs"
              >
                • {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions: View Details (विवरण देखें) & Direct WhatsApp Consultation (परामर्श लें / बुक करें) */}
        <div className="pt-3 border-t border-[#eadfce] grid grid-cols-2 gap-2">
          <Link
            href={`/pandit/${pandit.slug}`}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#8f3f12] bg-[#fffaf2] hover:bg-amber-50 py-3 rounded-xl border border-[#eadfce] hover:border-[#c96b18] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#c96b18]" />
            <span>विवरण देखें</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl shadow-md hover:scale-102 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>परामर्श लें</span>
          </a>
        </div>
      </div>
    </div>
  );
}
