'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PanditCard } from '../pandit/PanditCard';
import { Pandit } from '../../types';

interface HomePanditSliderProps {
  pandits: Pandit[];
}

export const HomePanditSlider: React.FC<HomePanditSliderProps> = ({ pandits }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // 5-second Auto Slider
  useEffect(() => {
    if (pandits.length === 0 || isMouseDown) return;

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
  }, [pandits, isMouseDown]);

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
      {pandits.length > 4 && (
        <div className="hidden sm:flex items-center gap-2 absolute -top-16 right-0 z-10">
          <button
            type="button"
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full bg-white border border-[#eadfce] text-[#7a1f1f] hover:bg-[#c96b18] hover:text-white flex items-center justify-center shadow-sm transition-all"
            aria-label="Previous Pandit"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-white border border-[#eadfce] text-[#7a1f1f] hover:bg-[#c96b18] hover:text-white flex items-center justify-center shadow-sm transition-all"
            aria-label="Next Pandit"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Mobile: 2 Cards per View Grid Slider | Desktop: 4 Cards per View Grid Slider with 5s Auto-Rotation */}
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
        {pandits.map((pandit) => (
          <div key={pandit._id} className="snap-start shrink-0">
            <PanditCard pandit={pandit} />
          </div>
        ))}
      </div>
    </div>
  );
};
