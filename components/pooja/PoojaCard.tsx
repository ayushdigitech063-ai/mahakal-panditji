'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { Pooja } from '@/types/pooja';

interface PoojaCardProps {
  pooja: Pooja;
}

export default function PoojaCard({ pooja }: PoojaCardProps) {
  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent(
    `जय श्री महाकाल 🙏 मुझे ${pooja.name} की बुकिंग एवं मुहूर्त परामर्श हेतु संपर्क करना है।`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="group bg-white border border-[#eadfce] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Image & Category Overlay */}
      <div className="relative w-full h-56 overflow-hidden bg-amber-900/10">
        <Image
          src={pooja.image}
          alt={pooja.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4 bg-glass text-[#8f3f12] text-xs font-bold px-3 py-1 rounded-full border border-[#c96b18]/30">
          {pooja.category}
        </div>

        {/* Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="heading-spiritual text-2xl font-bold text-amber-50 group-hover:text-amber-300 transition-colors">
            {pooja.name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <p className="text-sm text-[#75695d] line-clamp-2 leading-relaxed">
          {pooja.shortDescription}
        </p>

        {/* Key Benefits snippet */}
        <div className="space-y-1.5 pt-2">
          {pooja.benefits.slice(0, 2).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#2b2118]">
              <CheckCircle className="w-3.5 h-3.5 text-[#c96b18] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-[#75695d] pt-3 border-t border-[#eadfce]">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#c96b18]" />
            <span>{pooja.duration}</span>
          </div>
          {pooja.samagriIncluded && (
            <span className="bg-[#c96b18]/10 text-[#8f3f12] px-2.5 py-0.5 rounded-full font-medium">
              सामग्री सहित
            </span>
          )}
        </div>

        {/* Price & Direct WhatsApp CTA */}
        <div className="pt-4 border-t border-[#eadfce] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-[#75695d] uppercase block font-semibold">प्रारंभिक शुल्क</span>
            <span className="text-xl font-bold text-[#8f3f12]">₹{pooja.startingPrice}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/pooja/${pooja.slug}`}
              className="text-xs font-bold text-[#8f3f12] hover:text-[#c96b18] px-3 py-2 rounded-full border border-[#eadfce] hover:border-[#c96b18] transition-colors"
            >
              विवरण देखें
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
