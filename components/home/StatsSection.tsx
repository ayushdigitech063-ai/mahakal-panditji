'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, MapPin, Star } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import { HomepageSettings } from '../../types';

interface StatsSectionProps {
  stats?: HomepageSettings['stats'];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const defaultStats = [
    { number: '500+', label: 'Experienced Pandits', iconName: 'UserCheck', isVisible: true },
    { number: '10K+', label: 'Pooja Performed', iconName: 'Om', isVisible: true },
    { number: '50+', label: 'Cities Served', iconName: 'MapPin', isVisible: true },
    { number: '4.9/5', label: 'Customer Rating', iconName: 'Star', isVisible: true },
  ];

  const items = (stats && stats.length > 0 ? stats : defaultStats).filter((s) => s.isVisible);

  const getIcon = (name: string) => {
    switch (name) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 sm:w-8 sm:h-8 text-[#c96b18]" />;
      case 'Om':
      case 'Flame':
        return <span className="text-[#c96b18] font-bold text-lg sm:text-2xl leading-none">ॐ</span>;
      case 'MapPin':
        return <MapPin className="w-5 h-5 sm:w-8 sm:h-8 text-[#c96b18]" />;
      case 'Star':
        return <Star className="w-5 h-5 sm:w-8 sm:h-8 text-[#c96b18]" />;
      default:
        return <span className="text-[#c96b18] font-bold text-lg sm:text-2xl leading-none">ॐ</span>;
    }
  };

  /**
   * Helper function to parse numbers & suffixes like '500+', '10K+', '4.9/5'
   */
  const renderAnimatedStatNumber = (rawString: string) => {
    if (rawString.includes('K')) {
      const numericVal = parseFloat(rawString.replace(/[^0-9.]/g, ''));
      return (
        <span className="inline-flex items-center">
          <AnimatedCounter value={numericVal} decimals={0} />
          <span>K+</span>
        </span>
      );
    }

    if (rawString.includes('/')) {
      const parts = rawString.split('/');
      const numericVal = parseFloat(parts[0]);
      return (
        <span className="inline-flex items-center">
          <AnimatedCounter value={numericVal} decimals={1} />
          <span>/{parts[1]}</span>
        </span>
      );
    }

    const numericVal = parseFloat(rawString.replace(/[^0-9.]/g, ''));
    const hasPlus = rawString.includes('+');

    if (!isNaN(numericVal)) {
      return (
        <span className="inline-flex items-center">
          <AnimatedCounter value={numericVal} decimals={0} />
          {hasPlus && <span>+</span>}
        </span>
      );
    }

    return <span>{rawString}</span>;
  };

  return (
    <section className="py-8 sm:py-12 bg-white border-y border-[#eadfce] relative z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* 4 Stats Cards in 1 Line across Mobile & Desktop Grid */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-6 text-center">
          {items.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-2 sm:p-6 rounded-xl sm:rounded-2xl bg-[#fffaf2] border border-[#eadfce] shadow-xs sm:shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center space-y-1 sm:space-y-3"
            >
              <div className="p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center w-8 h-8 sm:w-14 sm:h-14">
                {getIcon(stat.iconName)}
              </div>
              <span className="heading-spiritual text-base sm:text-4xl font-extrabold text-[#7a1f1f] block leading-tight">
                {renderAnimatedStatNumber(stat.number)}
              </span>
              <span className="text-[8px] sm:text-sm font-semibold text-[#75695d] uppercase tracking-tighter sm:tracking-wider block leading-tight truncate max-w-full">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
