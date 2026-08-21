'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Flame, Sparkles, MapPin } from 'lucide-react';

interface EarthIntroAnimationProps {
  onComplete?: () => void;
}

export const EarthIntroAnimation: React.FC<EarthIntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'earth' | 'zoom' | 'welcome' | 'done'>('done');

  useEffect(() => {
    // Only run on initial website load (sessionStorage check)
    const hasSeenIntro = sessionStorage.getItem('mahakal_intro_seen');
    if (hasSeenIntro) {
      setPhase('done');
      if (onComplete) onComplete();
      return;
    }

    setPhase('earth');
    sessionStorage.setItem('mahakal_intro_seen', 'true');

    // 1. Earth centered on India for 2.2s
    const timer1 = setTimeout(() => {
      setPhase('zoom');
    }, 2200);

    // 2. Zoom directly into Ujjain, India for 1.8s
    const timer2 = setTimeout(() => {
      setPhase('welcome');
    }, 4000);

    // 3. Welcome text screen for 2.5s
    const timer3 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="earth-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 bg-[#060301] flex flex-col items-center justify-center overflow-hidden text-white select-none"
      >
        {/* Starry Sky Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-black to-black opacity-95" />

        {/* Phase 1 & 2: India-Centered Earth & Precision Zoom into Ujjain */}
        {(phase === 'earth' || phase === 'zoom') && (
          <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
            {/* India-Centered Earth Globe Container */}
            <motion.div
              animate={
                phase === 'zoom'
                  ? { scale: [1, 3.5, 10], opacity: [1, 1, 0] }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(201,107,24,0.4)]"
            >
              {/* India-Centered Satellite Globe (Fixed camera focused on India subcontinent) */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-2xl">
                <Image
                  src="/images/general/earth_india.jpg"
                  alt="Planet Earth Centered On India"
                  fill
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-amber-500/20" />
              </div>

              {/* Ujjain Pinpoint Location Marker right over India */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="relative z-20 flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-saffron-gradient flex items-center justify-center shadow-2xl shadow-amber-500/80 border-2 border-amber-300 animate-bounce">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <span className="mt-3 text-xs sm:text-sm font-extrabold text-amber-200 bg-black/90 px-4 py-1.5 rounded-full border border-amber-400/60 shadow-2xl backdrop-blur-md tracking-wide">
                  📍 Ujjain, Madhya Pradesh (India)
                </span>
              </motion.div>
            </motion.div>

            {/* Status Label */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-300 bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-500/30"
            >
              {phase === 'earth' ? 'Centering India — Locating Holy Ujjain Dham...' : 'Zooming into Avantika Nagri Ujjain...'}
            </motion.p>
          </div>
        )}

        {/* Phase 3: Grand Welcome Screen */}
        {phase === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-2xl px-6 space-y-6"
          >
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-24 h-24 rounded-full bg-saffron-gradient mx-auto flex items-center justify-center shadow-2xl shadow-amber-600/60 border-2 border-amber-300/60 text-white font-bold text-4xl leading-none"
            >
              ॐ
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-xs sm:text-base font-bold uppercase tracking-widest text-amber-300 bg-amber-950/80 px-6 py-2 rounded-full border border-amber-400/50 shadow-lg">
                🔱 महाकाल नगरी उज्जैन में आपका हार्दिक स्वागत है 🔱
              </span>
              <h1 className="heading-spiritual text-4xl sm:text-6xl font-extrabold text-amber-100 leading-tight pt-2 tracking-wide">
                जय श्री महाकाल
              </h1>
              <p className="text-base sm:text-lg text-amber-200/90 font-medium leading-relaxed pt-2">
                पवित्र अवंतिका धाम — सिद्ध रुद्राभिषेक, कालसर्प दोष निवारण एवं वैदिक अनुष्ठान केंद्र
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-4 flex items-center justify-center gap-2 text-xs text-amber-400/80 font-semibold"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Opening Sacred Seva Platform...</span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
