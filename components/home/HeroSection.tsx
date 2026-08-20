'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Award, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-spiritual-gradient text-white">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105 opacity-80"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Soft Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f0b04]/70 via-[#2b170c]/25 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-amber-500/30 backdrop-blur-md border border-amber-400/50 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-amber-200 mb-6 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>उज्जैन महाकाल — प्रामाणिक वैदिक पूजा केंद्र</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="heading-spiritual text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-amber-50 leading-tight md:leading-tight mb-6 drop-shadow-lg"
        >
          उज्जैन महाकाल धाम में पाएं प्रामाणिक <span className="text-amber-400 font-serif italic">पंडित जी</span> से सिद्ध पूजन एवं दोष निवारण
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl text-base sm:text-lg md:text-xl text-amber-100/95 mb-10 leading-relaxed font-normal drop-shadow-md"
        >
          गुरुदेव पंडित जी द्वारा सिद्ध वैदिक मंत्रोच्चार के साथ काल सर्प दोष, रुद्राभिषेक, मंगल भात पूजा एवं ग्रह शांति अनुष्ठान कराएं।
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/pandits"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-saffron-gradient text-white px-8 py-4 rounded-full font-bold text-base shadow-spiritual hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/40"
          >
            <span>पंडित जी खोजें</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/pooja"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-amber-100 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 border border-white/30 hover:border-amber-400"
          >
            <span>पूजन अनुष्ठान देखें</span>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-amber-100 w-full max-w-3xl font-medium drop-shadow"
        >
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span>100% प्रामाणिक विद्वान पंडित</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <span>25,000+ संतुष्ट यजमान</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-amber-400 shrink-0" />
            <span>20+ वर्षों का वैदिक अनुभव</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-amber-300/80 text-xs">
        <span className="tracking-widest uppercase text-[10px]">नीचे स्क्रॉल करें</span>
        <div className="w-4 h-7 border-2 border-amber-300/60 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-amber-300 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
