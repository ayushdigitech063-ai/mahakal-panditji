'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Sparkles, X, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryService, GalleryItem } from '../../services/galleryService';
import { SERVER_ORIGIN } from '../../lib/api';

export const LiveGallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse / Touch Drag-to-Scroll State
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    galleryService.getPublicGallery().then((data) => {
      if (data && data.length > 0) {
        setItems(data);
      }
    });
  }, []);

  // Lock body background scroll when Drawer modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  // Auto-scroll gallery slider every 2.5 seconds (only when not dragging or inspecting)
  useEffect(() => {
    if (items.length === 0 || selectedItem || isMouseDown) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const scrollAmount = container.clientWidth > 640 ? 340 : 300;
        
        // If reached near end, smooth scroll back to 0
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [items, selectedItem, isMouseDown]);

  // Drag handlers for desktop mouse drag & touch swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
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
    const walk = (x - startX) * 1.5; // Drag sensitivity
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-[#fffaf2] to-[#f7eedd] border-b border-[#eadfce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18] inline-flex items-center gap-1.5 bg-amber-100/60 border border-amber-200 px-3.5 py-1 rounded-full">
            <Camera className="w-3.5 h-3.5" />
            <span>Sacred Ujjain Live Gallery</span>
          </span>
          <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f]">
            महाकाल नगरी उज्जैन - दिव्य दर्शन गैलरी
          </h2>
          <p className="text-sm text-[#75695d]">
            Super Admin द्वारा लाइव अपडेट की जाने वाली उज्जैन के प्रसिद्ध मंदिरों एवं अनुष्ठानों की अलौकिक झलकियाँ। स्वाइप करके या फोटो पर क्लिक करके विवरण देखें।
          </p>
        </div>

        {/* Single Line Horizontal Gallery Row with Drag & Auto-Scroll */}
        <div className="relative">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`flex items-center gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory ${
              isMouseDown ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
          >
            {items.map((item) => {
              const imageUrl = item.image.startsWith('/uploads') ? `${SERVER_ORIGIN}${item.image}` : item.image;
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    if (!hasDragged) {
                      setSelectedItem(item);
                    }
                  }}
                  className="snap-start shrink-0 w-72 sm:w-80 bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c96b18] transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <div className="relative h-48 sm:h-52 w-full bg-amber-950/10 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      ✨ {item.category}
                    </span>
                  </div>

                  <div className="p-4 flex items-center justify-between gap-2 bg-white">
                    <div>
                      <h4 className="font-bold text-sm text-[#7a1f1f] group-hover:text-[#c96b18] transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#75695d] flex items-center gap-1 mt-0.5">
                        <Info className="w-3 h-3 text-[#c96b18]" />
                        <span>Click for details drawer</span>
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#fffaf2] border border-[#eadfce] group-hover:bg-[#c96b18] group-hover:text-white flex items-center justify-center text-[#c96b18] transition-all shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide-over Drawer for Selected Gallery Image Details */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl border-l border-[#eadfce] flex flex-col justify-between"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-[#eadfce] flex items-center justify-between bg-[#fffaf2]">
                  <div className="flex items-center gap-2 text-[#7a1f1f]">
                    <Sparkles className="w-5 h-5 text-[#c96b18]" />
                    <h3 className="heading-spiritual text-lg font-bold">Darshan & Vidhi Details</h3>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-[#7a1f1f] flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Main Image & Details Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#eadfce] shadow-md bg-amber-950/10">
                    <Image
                      src={selectedItem.image.startsWith('/uploads') ? `${SERVER_ORIGIN}${selectedItem.image}` : selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#8f3f12] px-3 py-1 rounded-full border border-amber-300 inline-block">
                      {selectedItem.category}
                    </span>
                    <h2 className="heading-spiritual text-2xl font-extrabold text-[#7a1f1f]">
                      {selectedItem.title}
                    </h2>
                    <p className="text-sm text-[#2b2118] leading-relaxed whitespace-pre-line border-t border-[#eadfce] pt-3 font-light">
                      {selectedItem.description || 'बाबा महाकाल की पवित्र अवंतिका नगरी का अलौकिक दृश्य एवं सिद्ध पूजन।'}
                    </p>
                  </div>
                </div>

                {/* Drawer Footer CTA: Direct WhatsApp Only */}
                <div className="p-6 border-t border-[#eadfce] bg-[#fffaf2] space-y-3">
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Pranam Pandit Ji, I want to inquire about ritual/pooja related to ${selectedItem.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm"
                  >
                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full text-center text-xs font-bold text-[#75695d] py-1"
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
