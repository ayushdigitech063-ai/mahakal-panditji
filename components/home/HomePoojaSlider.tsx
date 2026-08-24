'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, IndianRupee, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Pooja } from '../../types';

interface HomePoojaSliderProps {
  poojas: Pooja[];
}

export const HomePoojaSlider: React.FC<HomePoojaSliderProps> = ({ poojas }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // 5-second Auto Slider
  useEffect(() => {
    if (poojas.length === 0 || isMouseDown) return;

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
  }, [poojas, isMouseDown]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Touch / Mouse Drag
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
    <div className="relative">
      {/* Navigation Buttons for Desktop */}
      {poojas.length > 4 && (
        <div className="hidden sm:flex items-center gap-2 absolute -top-16 right-0 z-10">
          <button
            type="button"
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full bg-white border border-[#eadfce] text-[#7a1f1f] hover:bg-[#c96b18] hover:text-white flex items-center justify-center shadow-sm transition-all"
            aria-label="Previous Pooja"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-white border border-[#eadfce] text-[#7a1f1f] hover:bg-[#c96b18] hover:text-white flex items-center justify-center shadow-sm transition-all"
            aria-label="Next Pooja"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Mobile: 2 Cards per View | Desktop: 4 Cards per View Grid Slider with 5s Auto-Rotation */}
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
        {poojas.map((pooja) => (
          <div
            key={pooja._id}
            className="snap-start shrink-0 bg-white rounded-2xl sm:rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group"
          >
            {/* Image */}
            <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-amber-950/10">
              <Image
                src={pooja.image}
                alt={pooja.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-saffron-gradient text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md truncate max-w-[85%]">
                {pooja.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
              <div>
                <h3 className="heading-spiritual text-xs sm:text-base font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors truncate">
                  {pooja.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#75695d] mt-1 line-clamp-2 leading-snug sm:leading-relaxed">
                  {pooja.description}
                </p>

                <div className="mt-2 sm:mt-3 flex items-center justify-between text-[9px] sm:text-xs text-[#8f3f12] bg-[#fffaf2] p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-[#eadfce]">
                  <div className="flex items-center gap-0.5 sm:gap-1 truncate">
                    <Clock className="w-3 h-3 text-[#c96b18] shrink-0" />
                    <span className="truncate">{pooja.duration}</span>
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1 font-bold text-xs sm:text-sm text-[#7a1f1f] shrink-0">
                    <IndianRupee className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c96b18]" />
                    <span>₹{pooja.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 sm:pt-2">
                <Link
                  href={`/pooja/${pooja.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1 bg-saffron-gradient hover:opacity-95 text-white text-[10px] sm:text-xs font-semibold py-2 sm:py-2.5 rounded-xl shadow-md transition-all text-center truncate"
                >
                  <span>Explore Ritual</span>
                  <ArrowRight className="w-3 h-3 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
