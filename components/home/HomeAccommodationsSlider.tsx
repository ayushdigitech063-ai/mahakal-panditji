'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Building2, Home, ArrowRight } from 'lucide-react';
import { hotelService } from '../../services/hotelService';
import { HotelCard } from '../hotel/HotelCard';
import { Hotel } from '../../types';

export const HomeAccommodationsSlider: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Hotel[]>([]);
  const [activeTab, setActiveTab] = useState<'Hotel' | 'Dharmashala'>('Hotel');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  useEffect(() => {
    hotelService.getHotels().then((data) => setAccommodations(data));
  }, []);

  const filtered = accommodations.filter(
    (item) => item.propertyType === activeTab
  );

  // 5-second Auto Slider
  useEffect(() => {
    if (filtered.length === 0 || isMouseDown) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const cardWidth = container.clientWidth > 640 ? 300 : 280;

        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [filtered, isMouseDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="py-12 sm:py-16 bg-amber-900/5 border-y border-[#eadfce] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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

        {/* Mobile: 2 Cards per View | Desktop: 4 Cards per View Grid Slider with 5s Auto-Rotation */}
        <div className="relative">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`grid grid-flow-col auto-cols-[calc(50%-0.375rem)] sm:auto-cols-[calc(33.333%-0.75rem)] lg:auto-cols-[calc(25%-0.9375rem)] gap-3 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth ${
              isMouseDown ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
          >
            {filtered.map((item) => (
              <div key={item.id} className="snap-start shrink-0">
                <HotelCard hotel={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
