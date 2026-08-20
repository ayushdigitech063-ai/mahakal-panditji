'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Heart, MapPin, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [showEarthIntro, setShowEarthIntro] = useState(true);
  const [stage, setStage] = useState<'earth' | 'mpMap' | 'welcome'>('earth');

  useEffect(() => {
    // Stage 1: Earth globe spins & zooms (1.4 seconds)
    const timer1 = setTimeout(() => {
      setStage('mpMap');
    }, 1400);

    // Stage 2: Camera reaches MP Ujjain map & pin drops (1.4 seconds) -> Show Welcome Text
    const timer2 = setTimeout(() => {
      setStage('welcome');
    }, 2800);

    // Stage 3: Auto close intro & reveal main website after 5.0 seconds total
    const finishTimer = setTimeout(() => {
      setShowEarthIntro(false);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-spiritual-gradient text-white">
      {/* 3-Stage Fullscreen Animation: 3D Earth -> Zoom inside to MP Satellite Map -> "आपका स्वागत है महाकाल नगरी में" -> Website Reveal */}
      <AnimatePresence>
        {showEarthIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#100502] flex flex-col items-center justify-center p-4 text-center overflow-hidden"
          >
            {/* Spiritual Cosmic Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/35 via-amber-950/90 to-[#100502]" />

            {/* STAGE 1: Slow Spinning 3D Earth Globe */}
            {stage === 'earth' && (
              <motion.div
                key="earth-stage"
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1.25, opacity: 1, rotate: 180 }}
                exit={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="relative w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] rounded-full overflow-hidden shadow-[0_0_150px_rgba(201,107,24,1)] border-4 border-amber-400/90 z-10"
              >
                <Image
                  src="/images/earth.jpg"
                  alt="Slow Spinning 3D Earth Globe"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* STAGE 2: Deep Zooming into Madhya Pradesh (M.P.) Satellite Map with Pin */}
            {(stage === 'mpMap' || stage === 'welcome') && (
              <motion.div
                key="mp-stage"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: stage === 'welcome' ? 1.1 : 1, opacity: 1 }}
                exit={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="relative w-[340px] h-[220px] sm:w-[640px] sm:h-[380px] rounded-3xl overflow-hidden shadow-[0_0_160px_rgba(201,107,24,1)] border-2 border-amber-400 z-10"
              >
                <Image
                  src="/images/ujjain-map.jpg"
                  alt="Madhya Pradesh Ujjain Map Zoom"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Glowing Location Pin on MP Ujjain */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-14 h-14 rounded-full bg-amber-500/50 border-2 border-white flex items-center justify-center shadow-[0_0_50px_#f59e0b]"
                  >
                    <MapPin className="w-10 h-10 text-amber-200 fill-amber-500" />
                  </motion.div>
                  <span className="mt-2 bg-saffron-gradient text-white font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-2xl border border-amber-300">
                    📍 उज्जैन (मध्य प्रदेश - M.P.)
                  </span>
                </div>
              </motion.div>
            )}

            {/* STAGE 3: "आपका स्वागत है महाकाल नगरी में" Screen Appears when camera touches MP */}
            <AnimatePresence>
              {stage === 'welcome' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute z-30 flex flex-col items-center justify-center space-y-3.5 px-8 py-7 rounded-3xl bg-black/85 backdrop-blur-xl border-2 border-amber-400/90 shadow-[0_0_100px_rgba(201,107,24,1)] max-w-lg"
                >
                  <div className="w-14 h-14 rounded-full bg-saffron-gradient flex items-center justify-center text-white shadow-2xl animate-bounce">
                    <Sparkles className="w-8 h-8 text-amber-200" />
                  </div>

                  <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-wide drop-shadow-md">
                    जय श्री महाकाल 🙏
                  </h2>

                  <h3 className="heading-spiritual text-2xl sm:text-3xl font-bold text-amber-50 leading-snug">
                    आपका स्वागत है महाकाल नगरी में
                  </h3>

                  <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                    बाबा महाकालेश्वर की पवित्र अवंतिका (M.P.) भूमि — सिद्ध पूजन एवं विद्वान पंडित परामर्श
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

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
        {/* Eyebrow with Ujjain Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-amber-500/30 backdrop-blur-md border border-amber-400/50 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-amber-200 mb-6 shadow-xl"
        >
          <MapPin className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>उज्जैन महाकाल — प्रामाणिक वैदिक पूजा केंद्र</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="heading-spiritual text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-amber-50 leading-tight md:leading-tight mb-6 drop-shadow-lg"
        >
          उज्जैन महाकाल धाम में पाएं प्रामाणिक <span className="text-amber-400 font-serif italic">पंडित जी</span> से सिद्ध पूजन एवं दोष निवारण
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl text-base sm:text-lg md:text-xl text-amber-100/95 mb-10 leading-relaxed font-normal drop-shadow-md"
        >
          गुरुदेव पंडित जी द्वारा सिद्ध वैदिक मंत्रोच्चार के साथ काल सर्प दोष, रुद्राभिषेक, मंगल भात पूजा एवं ग्रह शांति अनुष्ठान कराएं।
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
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
          transition={{ duration: 1, delay: 0.6 }}
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
