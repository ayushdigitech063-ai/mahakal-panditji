'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Flame, MapPin, Star } from 'lucide-react';
import { HomepageSettings } from '../../types';

interface StatsSectionProps {
  stats?: HomepageSettings['stats'];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const defaultStats = [
    { number: '500+', label: 'Experienced Pandits', iconName: 'UserCheck', isVisible: true },
    { number: '10K+', label: 'Pooja Performed', iconName: 'Flame', isVisible: true },
    { number: '50+', label: 'Cities Served', iconName: 'MapPin', isVisible: true },
    { number: '4.9/5', label: 'Customer Rating', iconName: 'Star', isVisible: true },
  ];

  const items = (stats && stats.length > 0 ? stats : defaultStats).filter((s) => s.isVisible);

  const getIcon = (name: string) => {
    switch (name) {
      case 'UserCheck':
        return <UserCheck className="w-8 h-8 text-[#c96b18]" />;
      case 'Flame':
        return <Flame className="w-8 h-8 text-[#c96b18]" />;
      case 'MapPin':
        return <MapPin className="w-8 h-8 text-[#c96b18]" />;
      case 'Star':
        return <Star className="w-8 h-8 text-[#c96b18]" />;
      default:
        return <Flame className="w-8 h-8 text-[#c96b18]" />;
    }
  };

  return (
    <section className="py-12 bg-white border-y border-[#eadfce] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {items.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#fffaf2] border border-[#eadfce] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center space-y-3"
            >
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60">
                {getIcon(stat.iconName)}
              </div>
              <span className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f] block">
                {stat.number}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#75695d] uppercase tracking-wider block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
