'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, Home, ArrowRight } from 'lucide-react';
import { hotelService } from '../../services/hotelService';
import { HotelCard } from '../hotel/HotelCard';
import { Hotel } from '../../types';

export const HomeAccommodationsSlider: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Hotel[]>([]);
  const [activeTab, setActiveTab] = useState<'Hotel' | 'Dharmashala'>('Hotel');

  useEffect(() => {
    hotelService.getHotels().then((data) => setAccommodations(data));
  }, []);

  const filtered = accommodations.filter(
    (item) => item.propertyType === activeTab
  );

  return (
    <section className="py-12 sm:py-16 bg-amber-900/5 border-y border-[#eadfce] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18] bg-amber-100/70 border border-amber-200 px-3 py-1 rounded-full">
              Ujjain Yatri Stay
            </span>
            <h2 className="heading-spiritual text-2xl sm:text-4xl font-extrabold text-[#7a1f1f] mt-2">
              Hotels & Bhakt Niwas Dharmashala
            </h2>
            <p className="text-xs sm:text-sm text-[#75695d] mt-1 max-w-xl">
              Comfortable hotels & traditional satvik dharmashalas close to Mahakaleshwar Temple and Ram Ghat.
            </p>
          </div>

          {/* Clean Dual Tab Controls (Hotels vs Dharmashala) & View All */}
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center bg-white p-1 rounded-full border border-[#eadfce] shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('Hotel')}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                  activeTab === 'Hotel'
                    ? 'bg-saffron-gradient text-white shadow-xs'
                    : 'text-[#75695d] hover:text-[#7a1f1f]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Hotels</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('Dharmashala')}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                  activeTab === 'Dharmashala'
                    ? 'bg-saffron-gradient text-white shadow-xs'
                    : 'text-[#75695d] hover:text-[#7a1f1f]'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Dharmashala</span>
              </button>
            </div>

            <Link
              href="/hotels"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#c96b18] hover:text-[#8f3f12] bg-white px-3.5 py-2 rounded-full border border-[#eadfce] shrink-0 shadow-xs"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Responsive Grid View instead of overflowing clipped slider */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {filtered.slice(0, 4).map((item) => (
            <HotelCard key={item.id} hotel={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
