'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Flame, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent(
    'जय श्री महाकाल 🙏 मुझे पंडित जी से पूजा एवं मुहूर्त परामर्श हेतु संपर्क करना है।'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'मुख्य पृष्ठ', href: '/' },
    { label: 'पंडित जी', href: '/pandits' },
    { label: 'पूजा अनुष्ठान', href: '/pooja' },
    { label: 'हमारे बारे में', href: '/about' },
    { label: 'धार्मिक लेख', href: '/blog' },
    { label: 'संपर्क करें', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-[#fffaf2]/95 backdrop-blur-md shadow-lg py-4 border-b border-[#eadfce]'
          : 'bg-[#fffaf2] py-5 border-b border-[#eadfce]/80'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 rounded-full bg-saffron-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-amber-200 fill-amber-200/30 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="heading-spiritual text-xl sm:text-2xl font-bold tracking-tight text-[#8f3f12] group-hover:text-[#c96b18] transition-colors leading-none">
              महाकाल पंडित
            </span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#75695d] mt-1">
              उज्जैन महाकाल धाम
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm sm:text-base font-semibold transition-colors relative py-1.5 whitespace-nowrap ${
                  isActive ? 'text-[#c96b18]' : 'text-[#2b2118] hover:text-[#c96b18]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c96b18] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Direct Phone & Direct WhatsApp Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 text-xs font-bold text-[#8f3f12] hover:text-[#c96b18] px-3.5 py-2 rounded-full border border-[#eadfce] hover:border-[#c96b18] transition-colors whitespace-nowrap bg-white shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#c96b18]" />
            <span>+91 98765 43210</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>WhatsApp संपर्क</span>
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#2b2118] hover:bg-[#eadfce]/40 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#fffaf2] border-b border-[#eadfce] overflow-hidden"
          >
            <div className="px-5 py-6 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#c96b18]/10 text-[#c96b18]'
                        : 'text-[#2b2118] hover:bg-[#eadfce]/30'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#eadfce] flex flex-col gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-[#8f3f12] py-2.5 border border-[#eadfce] rounded-xl bg-white"
                >
                  <Phone className="w-4 h-4 text-[#c96b18]" />
                  <span>पंडित जी से बात करें: +91 98765 43210</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp मैसेज भेजें</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
