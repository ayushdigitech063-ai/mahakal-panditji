'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, IndianRupee, Shield, ArrowRight } from 'lucide-react';
import { Pooja } from '../../types';

interface PoojaCardProps {
  pooja: Pooja;
}

export const PoojaCard: React.FC<PoojaCardProps> = ({ pooja }) => {
  return (
    <div className="bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group">
      <div className="relative h-56 w-full overflow-hidden bg-amber-950/10">
        <Image
          src={pooja.image}
          alt={pooja.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 bg-saffron-gradient text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {pooja.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="heading-spiritual text-xl font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors">
            {pooja.name}
          </h3>
          <p className="text-xs text-[#75695d] mt-2 line-clamp-2 leading-relaxed">
            {pooja.description}
          </p>

          <div className="mt-4 flex items-center justify-between text-xs text-[#8f3f12] bg-[#fffaf2] p-2.5 rounded-xl border border-[#eadfce]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c96b18]" />
              <span>{pooja.duration}</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-sm text-[#7a1f1f]">
              <IndianRupee className="w-4 h-4 text-[#c96b18]" />
              <span>₹{pooja.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href={`/pooja/${pooja.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-saffron-gradient hover:opacity-95 text-white text-sm font-semibold py-3 rounded-2xl shadow-md transition-all"
          >
            <span>Explore Ritual Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
