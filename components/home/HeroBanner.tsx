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
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-spiritual-gradient text-white">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f0b04]/80 via-black/30 to-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-spiritual text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-amber-100 leading-tight"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-amber-100/80 max-w-3xl mx-auto font-light leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            href={primaryBtnLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-saffron-gradient hover:opacity-95 text-white font-bold px-8 py-4 rounded-full text-base shadow-lg shadow-amber-900/40 hover:scale-105 transition-all"
          >
            <span>{primaryBtnText}</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href={secondaryBtnLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-glass-dark hover:bg-black/60 text-amber-200 border border-amber-400/40 font-semibold px-8 py-4 rounded-full text-base backdrop-blur-md hover:scale-105 transition-all"
          >
            <span>{secondaryBtnText}</span>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-amber-500/20"
        >
          <div className="flex items-center justify-center gap-3 bg-black/30 p-3 rounded-2xl border border-amber-500/10 backdrop-blur-sm">
            <Users className="w-6 h-6 text-amber-400" />
            <div className="text-left">
              <span className="text-sm font-bold text-amber-100 block">500+ Verified Pandits</span>
              <span className="text-xs text-amber-100/60 block">Experienced Vedic Scholars</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-black/30 p-3 rounded-2xl border border-amber-500/10 backdrop-blur-sm">
            <Flame className="w-6 h-6 text-amber-400" />
            <div className="text-left">
              <span className="text-sm font-bold text-amber-100 block">Authentic Rituals</span>
              <span className="text-xs text-amber-100/60 block">Strict Karma Kanda Vidhi</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-black/30 p-3 rounded-2xl border border-amber-500/10 backdrop-blur-sm">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div className="text-left">
              <span className="text-sm font-bold text-amber-100 block">10,000+ Devotees</span>
              <span className="text-xs text-amber-100/60 block">Trusted Sacred Platform</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
