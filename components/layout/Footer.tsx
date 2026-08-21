'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { SiteSettings } from '../../types';

interface FooterProps {
  settings?: SiteSettings | null;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const siteName = settings?.siteName || 'Mahakal Pandit';
  const phone = settings?.phone || '+91 98765 43210';
  const email = settings?.email || 'contact@mahakalpandit.com';
  const address = settings?.address || 'Mahakal Marg, Near Shri Mahakaleshwar Temple, Ujjain, Madhya Pradesh 456001';
  const footerText = settings?.footerText || 'Connecting devotees with authentic Vedic Pandits in Ujjain for sacred rituals and spiritual peace.';
  const copyright = settings?.copyrightText || '© 2026 Mahakal Pandit. All Rights Reserved.';

  return (
    <footer className="bg-spiritual-gradient text-[#eadfce] pt-16 pb-8 border-t border-amber-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-amber-900/40">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="heading-spiritual text-2xl font-bold tracking-tight text-amber-300">
                {siteName}
              </span>
            </Link>
            <p className="text-sm text-amber-100/70 leading-relaxed">
              {footerText}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/60 p-2.5 rounded-lg border border-amber-800/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Verified Ujjain Pandits & Vedic Rituals</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-spiritual text-lg font-semibold text-amber-300 mb-4 pb-1 border-b border-amber-800/40">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-amber-100/80">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/pandits" className="hover:text-amber-400 transition-colors">Find Pandit Ji</Link>
              </li>
              <li>
                <Link href="/pooja" className="hover:text-amber-400 transition-colors">Mukhya Pooja Services</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">Spiritual Articles</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact & Booking</Link>
              </li>
            </ul>
          </div>

          {/* Top Services */}
          <div>
            <h4 className="heading-spiritual text-lg font-semibold text-amber-300 mb-4 pb-1 border-b border-amber-800/40">
              Popular Rituals
            </h4>
            <ul className="space-y-2.5 text-sm text-amber-100/80">
              <li>
                <Link href="/pooja/mahakal-rudrabhishek-pooja" className="hover:text-amber-400 transition-colors">Mahakal Rudrabhishek</Link>
              </li>
              <li>
                <Link href="/pooja/kaal-sarp-dosh-pooja" className="hover:text-amber-400 transition-colors">Kaal Sarp Dosh Shanti</Link>
              </li>
              <li>
                <Link href="/pooja/mangal-dosh-shanti-pooja" className="hover:text-amber-400 transition-colors">Mangal Dosh Nivaran</Link>
              </li>
              <li>
                <Link href="/pooja/maha-mrityunjaya-jaap-havan" className="hover:text-amber-400 transition-colors">Maha Mrityunjaya Jaap</Link>
              </li>
              <li>
                <Link href="/pooja" className="hover:text-amber-400 transition-colors">Navgraha Shanti</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="heading-spiritual text-lg font-semibold text-amber-300 mb-4 pb-1 border-b border-amber-800/40">
              Ujjain Office & Support
            </h4>
            <ul className="space-y-3 text-sm text-amber-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-amber-300">{phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-amber-300">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-100/60 gap-4">
          <p>{copyright}</p>
          <div className="flex items-center gap-1">
            <span>Crafted with devotion for devotees worldwide</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
