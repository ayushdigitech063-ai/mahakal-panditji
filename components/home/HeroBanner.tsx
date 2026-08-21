'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Users, Sparkles, ChevronRight } from 'lucide-react';
import { HomepageSettings } from '../../types';

interface HeroProps {
  data?: HomepageSettings['hero'];
}

export const HeroBanner: React.FC<HeroProps> = ({ data }) => {
  if (data && !data.isVisible) return null;

  const eyebrow = data?.eyebrow || '🔱 Trusted Spiritual Guidance in Ujjain';
  const heading = data?.heading || 'Connect With Experienced Pandit Ji For Sacred Pooja & Spiritual Services';
  const description = data?.description || 'Perform authentic Mahakal Rudrabhishek, Kaal Sarp Dosh Pooja, and Vedic Rituals with verified Pandits of Ujjain.';
  const primaryBtnText = data?.primaryBtnText || 'Find Pandit Ji';
  const primaryBtnLink = data?.primaryBtnLink || '/pandits';
  const secondaryBtnText = data?.secondaryBtnText || 'Explore Pooja';
  const secondaryBtnLink = data?.secondaryBtnLink || '/pooja';

  return (
    <section className="relative min-h-[80vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-8 sm:pb-16 overflow-hidden bg-spiritual-gradient text-white">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 opacity-75">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={data?.videoUrl || '/videos/hero.mp4'} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f0b04]/90 via-black/40 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-8 my-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] sm:text-sm font-medium backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
          <span>{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-spiritual text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-amber-100 leading-snug sm:leading-tight"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-lg md:text-xl text-amber-100/90 max-w-3xl mx-auto font-light leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Action Buttons: 2 in 1 Line, 1 Below (Stacked 2 + 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-4 pt-1 max-w-md mx-auto"
        >
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <Link
              href={primaryBtnLink}
              className="inline-flex items-center justify-center gap-1 bg-saffron-gradient hover:opacity-95 text-white font-bold px-3 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-full text-xs sm:text-base shadow-lg shadow-amber-900/40 hover:scale-105 transition-all text-center truncate"
            >
              <span>{primaryBtnText}</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
            <Link
              href={secondaryBtnLink}
              className="inline-flex items-center justify-center gap-1 bg-glass-dark hover:bg-black/60 text-amber-200 border border-amber-400/40 font-semibold px-3 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-full text-xs sm:text-base backdrop-blur-md hover:scale-105 transition-all text-center truncate"
            >
              <span>{secondaryBtnText}</span>
            </Link>
          </div>
        </motion.div>

        {/* Responsive Trust Indicators Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-6 sm:pt-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-6 max-w-4xl mx-auto border-t border-amber-500/20"
        >
          <div className="flex items-center justify-start sm:justify-center gap-3 bg-black/40 p-2.5 sm:p-4 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-bold text-amber-100 block">500+ Verified Pandits</span>
              <span className="text-[10px] sm:text-xs text-amber-100/70 block">Experienced Vedic Scholars</span>
            </div>
          </div>

          <div className="flex items-center justify-start sm:justify-center gap-3 bg-black/40 p-2.5 sm:p-4 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-bold text-amber-100 block">Authentic Rituals</span>
              <span className="text-[10px] sm:text-xs text-amber-100/70 block">Strict Karma Kanda Vidhi</span>
            </div>
          </div>

          <div className="flex items-center justify-start sm:justify-center gap-3 bg-black/40 p-2.5 sm:p-4 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-bold text-amber-100 block">10,000+ Devotees</span>
              <span className="text-[10px] sm:text-xs text-amber-100/70 block">Trusted Sacred Platform</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
