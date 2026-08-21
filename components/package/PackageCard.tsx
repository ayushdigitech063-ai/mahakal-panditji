'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { SpiritualPackage } from '../../types';

interface PackageCardProps {
  pkg: SpiritualPackage;
  onEnquire?: (packageName: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const whatsAppNumber = '919876543210';
  const whatsAppText = encodeURIComponent(
    `Pranam Pandit Ji, I am interested in booking the "${pkg.name}" (${pkg.duration}, starting ₹${pkg.startingPrice}). Please share availability and booking details.`
  );

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group relative">
      {/* Cover Image & Badges */}
      <div className="relative h-40 sm:h-64 w-full overflow-hidden bg-amber-950/10">
        <Image
          src={pkg.coverImage}
          alt={pkg.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-saffron-gradient text-white text-[9px] sm:text-xs font-extrabold px-2 py-0.5 sm:px-3.5 sm:py-1 rounded-full shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-200" />
          <span>Combo</span>
        </div>

        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-[9px] sm:text-xs font-semibold">
          <span className="bg-black/60 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-md flex items-center gap-0.5">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{pkg.duration}</span>
          </span>
          <span className="font-extrabold text-amber-300 bg-amber-950/90 px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full border border-amber-500/40">
            ₹{pkg.startingPrice.toLocaleString('en-IN')} <span className="text-[8px] sm:text-[10px] font-normal text-amber-100">/pp</span>
          </span>
        </div>
      </div>

      {/* Package Details */}
      <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
        <div>
          <h3 className="heading-spiritual text-sm sm:text-2xl font-bold text-[#7a1f1f] group-hover:text-[#c96b18] transition-colors truncate">
            {pkg.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-[#75695d] mt-1 line-clamp-2 leading-snug sm:leading-relaxed">
            {pkg.description}
          </p>

          {/* Inclusions List */}
          <div className="mt-2 bg-[#fffaf2] p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-[#eadfce] space-y-1">
            <span className="text-[9px] sm:text-[11px] font-extrabold text-[#c96b18] uppercase tracking-wider block border-b border-[#eadfce] pb-1">
              🎁 Inclusions:
            </span>
            <div className="space-y-1 pt-0.5">
              {pkg.inclusions.slice(0, 2).map((item, i) => (
                <div key={i} className="flex items-start gap-1 text-[9px] sm:text-xs text-[#2b2118] font-medium truncate">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons: Text Only Clean WhatsApp */}
        <div className="pt-2 sm:pt-4 border-t border-[#eadfce] grid grid-cols-2 gap-1.5 sm:gap-3">
          <Link
            href={`/packages/${pkg.slug}`}
            className="text-center text-[10px] sm:text-xs font-semibold py-1.5 sm:py-3 px-1 sm:px-3 rounded-lg sm:rounded-xl border border-[#c96b18] text-[#c96b18] hover:bg-[#c96b18]/10 transition-colors flex items-center justify-center truncate leading-none"
          >
            Details
          </Link>

          <a
            href={`https://wa.me/${whatsAppNumber}?text=${whatsAppText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[10px] sm:text-xs font-bold py-1.5 sm:py-3 px-1 sm:px-3 rounded-lg sm:rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm transition-all flex items-center justify-center leading-none"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
