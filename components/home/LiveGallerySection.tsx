'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Camera, Sparkles, X, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryService, GalleryItem } from '../../services/galleryService';
import { SERVER_ORIGIN } from '../../lib/api';

export const LiveGallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    galleryService.getPublicGallery().then((data) => {
      if (data && data.length > 0) {
        setItems(data);
      }
    });
  }, []);

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
            Super Admin द्वारा लाइव अपडेट की जाने वाली उज्जैन के प्रसिद्ध मंदिरों एवं अनुष्ठानों की अलौकिक झलकियाँ। किसी भी फोटो पर क्लिक करके विवरण देखें।
          </p>
        </div>

        {/* Single Line Horizontal Gallery Row */}
        <div className="relative">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory">
            {items.map((item) => {
              const imageUrl = item.image.startsWith('/uploads') ? `${SERVER_ORIGIN}${item.image}` : item.image;
              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
                  className="snap-start shrink-0 w-72 sm:w-80 bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c96b18] transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <div className="relative h-48 sm:h-52 w-full bg-amber-950/10 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
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

                {/* Drawer Footer CTA */}
                <div className="p-6 border-t border-[#eadfce] bg-[#fffaf2] space-y-3">
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Pranam Pandit Ji, I am inquiring about ritual/pooja related to ${selectedItem.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm"
                  >
                    <span>Inquire / Book This Seva via WhatsApp</span>
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
