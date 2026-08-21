'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Heart, MapPin, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [showEarthIntro, setShowEarthIntro] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user has ALREADY SEEN the intro in this browser session
    const hasSeenIntro = sessionStorage.getItem('hasSeenEarthIntro');

    if (!hasSeenIntro) {
      setShowEarthIntro(true);
      sessionStorage.setItem('hasSeenEarthIntro', 'true');

      // Stage 1: Earth spins & zooms into Ujjain MP (2.4 seconds)
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(true);
      }, 2400);

      // Stage 2: Dismiss intro overlay & reveal website (4.6 seconds total)
      const finishTimer = setTimeout(() => {
        setShowEarthIntro(false);
      }, 4600);

      return () => {
        clearTimeout(welcomeTimer);
        clearTimeout(finishTimer);
      };
    }
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-screen flex flex-col justify-center overflow-hidden bg-spiritual-gradient text-white pt-24 sm:pt-28 pb-10 sm:pb-16">
      {/* Earth Intro Animation - RUNS EXACTLY 1 TIME PER USER SESSION */}
      <AnimatePresence>
        {showEarthIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#100502] flex flex-col items-center justify-center p-4 text-center overflow-hidden"
          >
            {/* Spiritual Cosmic Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/35 via-amber-950/90 to-[#100502]" />

            {/* Pure Round Circle Globe Container */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{
                scale: showWelcome ? 1.05 : [0.75, 1.1, 2.5],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 2.4,
                ease: 'easeInOut',
              }}
              className="relative w-[300px] h-[300px] sm:w-[540px] sm:h-[540px] rounded-full overflow-hidden shadow-[0_0_160px_rgba(201,107,24,1)] border-4 border-amber-400/90 z-10 flex items-center justify-center"
            >
              {/* Perfectly Straight Upright Earth Image inside Pure Round Circle */}
              <motion.div
                animate={{ rotate: showWelcome ? 0 : 360 }}
                transition={{ duration: 2.4, ease: 'linear' }}
                className="relative w-full h-full"
              >
                <Image
                  src={showWelcome ? '/images/ujjain-map.jpg' : '/images/earth.jpg'}
                  alt="Round Earth Globe Map"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Glowing Location Pin Marker inside Round Circle */}
              {!showWelcome && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-500/50 border-2 border-white flex items-center justify-center shadow-[0_0_40px_#f59e0b]"
                  >
                    <MapPin className="w-7 h-7 sm:w-9 sm:h-9 text-amber-200 fill-amber-500" />
                  </motion.div>
                  <span className="mt-2 bg-saffron-gradient text-white font-extrabold text-xs sm:text-sm px-4 py-1 rounded-full shadow-2xl border border-amber-300 whitespace-nowrap">
                    📍 उज्जैन (M.P.)
                  </span>
                </div>
              )}

              {/* Round Circle Welcome Text Overlay */}
              <AnimatePresence>
                {showWelcome && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-black/75 backdrop-blur-md rounded-full flex flex-col items-center justify-center p-6 sm:p-8 text-center z-30 border-2 border-amber-400/90"
                  >
                    <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-saffron-gradient flex items-center justify-center text-white shadow-xl animate-bounce mb-2">
                      <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-amber-200" />
                    </div>

                    <h2 className="heading-spiritual text-xl sm:text-4xl font-extrabold text-amber-300 tracking-wide drop-shadow-md">
                      जय श्री महाकाल 🙏
                    </h2>

                    <h3 className="heading-spiritual text-sm sm:text-2xl font-bold text-amber-50 leading-snug my-1.5 sm:my-2">
                      आपका स्वागत है महाकाल नगरी में
                    </h3>

                    <p className="text-[10px] sm:text-xs text-amber-200/90 font-medium max-w-xs">
                      बाबा महाकालेश्वर की पवित्र अवंतिका (M.P.) भूमि — सिद्ध पूजन एवं विद्वान पंडित परामर्श
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f0b04]/80 via-[#2b170c]/30 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-auto text-center flex flex-col items-center">
        {/* Eyebrow with Ujjain Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-amber-500/30 backdrop-blur-md border border-amber-400/50 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-amber-200 mb-4 sm:mb-6 shadow-xl"
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-pulse shrink-0" />
          <span>उज्जैन महाकाल — प्रामाणिक वैदिक पूजा केंद्र</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="heading-spiritual text-2xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-amber-50 leading-snug sm:leading-tight mb-3 sm:mb-6 drop-shadow-lg"
        >
          उज्जैन महाकाल धाम में पाएं प्रामाणिक <span className="text-amber-400 font-serif italic">पंडित जी</span> से सिद्ध पूजन एवं दोष निवारण
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl text-xs sm:text-lg md:text-xl text-amber-100/95 mb-6 sm:mb-10 leading-relaxed font-normal drop-shadow-md"
        >
          गुरुदेव पंडित जी द्वारा सिद्ध वैदिक मंत्रोच्चार के साथ काल सर्प दोष, रुद्राभिषेक, मंगल भात पूजा एवं ग्रह शांति अनुष्ठान कराएं।
        </motion.p>

        {/* Action Buttons: 2 in Top Line + 1 Below */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-md mx-auto space-y-2.5 sm:space-y-0 sm:flex sm:flex-row items-center justify-center sm:gap-4"
        >
          <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto">
            <Link
              href="/pandits"
              className="inline-flex items-center justify-center gap-1 bg-saffron-gradient text-white px-3 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-full font-bold text-xs sm:text-base shadow-spiritual hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-amber-300/40 text-center truncate"
            >
              <span>पंडित जी खोजें</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
            <Link
              href="/pooja"
              className="inline-flex items-center justify-center gap-1 bg-black/40 hover:bg-black/60 backdrop-blur-md text-amber-100 px-3 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-full font-semibold text-xs sm:text-base transition-all duration-300 border border-white/30 hover:border-amber-400 text-center truncate"
            >
              <span>पूजन अनुष्ठान</span>
            </Link>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 sm:mt-14 pt-5 sm:pt-8 border-t border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-6 text-xs sm:text-sm text-amber-100 w-full max-w-3xl font-medium drop-shadow"
        >
          <div className="flex items-center justify-start sm:justify-center gap-3 bg-black/30 p-2.5 sm:p-3 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>100% प्रामाणिक विद्वान पंडित</span>
          </div>
          <div className="flex items-center justify-start sm:justify-center gap-3 bg-black/30 p-2.5 sm:p-3 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>25,000+ संतुष्ट यजमान</span>
          </div>
          <div className="flex items-center justify-start sm:justify-center gap-3 bg-black/30 p-2.5 sm:p-3 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>20+ वर्षों का वैदिक अनुभव</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-amber-300/80 text-xs">
        <span className="tracking-widest uppercase text-[10px]">नीचे स्क्रॉल करें</span>
        <div className="w-4 h-7 border-2 border-amber-300/60 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-amber-300 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
