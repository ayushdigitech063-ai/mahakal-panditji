'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryItems = [
  {
    id: '1',
    src: '/images/gallery/gallery-1.jpg',
    title: 'उज्जैन महाकालेश्वर मंदिर परिसर',
    subtitle: 'पवित्र महाकाल मंदिर एवं यजमान दर्शन',
  },
  {
    id: '2',
    src: '/images/gallery/gallery-2.jpg',
    title: 'पंडित जी द्वारा कुण्डली एवं मुहूर्त विश्लेषण',
    subtitle: 'शास्त्रोक्त विधि से जन्मपत्री एवं ग्रह विचार',
  },
  {
    id: '3',
    src: '/images/gallery/gallery-3.jpg',
    title: 'दिव्य भस्म एवं रुद्राभिषेक श्रृंगार',
    subtitle: 'महाकालेश्वर ज्योतिर्लिंग सिद्ध पूजन',
  },
  {
    id: '4',
    src: '/images/gallery/gallery-4.jpg',
    title: 'गंगाजल व दूध से सिद्ध धारा रुद्राभिषेक',
    subtitle: 'शास्त्र सम्मत वैदिक अनुष्ठान एवं हवन',
  },
];

export default function GallerySection() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  // Get visible 3 items in carousel loop
  const visibleItems = [
    galleryItems[startIndex % galleryItems.length],
    galleryItems[(startIndex + 1) % galleryItems.length],
    galleryItems[(startIndex + 2) % galleryItems.length],
  ];

  return (
    <section className="py-20 bg-[#fffaf2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Om Emblem & Gallery Section Header matching reference screenshot */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center justify-center gap-2 text-2xl font-serif text-[#8f3f12]">
            <span className="w-8 h-px bg-amber-400/60" />
            <span>🕉️</span>
            <span className="w-8 h-px bg-amber-400/60" />
          </div>

          <h2 className="heading-spiritual text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#8f3f12] tracking-tight">
            गैलरी
          </h2>

          <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full mt-2" />
        </div>

        {/* Carousel Container with Gold Border Frame */}
        <div className="relative bg-white border border-[#eadfce] rounded-3xl p-4 sm:p-6 shadow-xl">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#eadfce] text-[#8f3f12] shadow-xl flex items-center justify-center hover:bg-[#c96b18] hover:text-white hover:border-[#c96b18] transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#eadfce] text-[#8f3f12] shadow-xl flex items-center justify-center hover:bg-[#c96b18] hover:text-white hover:border-[#c96b18] transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Gallery Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-8">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${startIndex}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative group h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md bg-amber-950/10 border border-[#eadfce]"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Image Title & Subtitle */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                    <h3 className="heading-spiritual text-base sm:text-lg font-bold text-amber-50 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-amber-200/80 font-medium line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
