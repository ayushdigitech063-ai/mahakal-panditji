'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockPoojas } from '@/data/mockPoojas';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [poojaDropdownOpen, setPoojaDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPoojaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-[#fffaf2]/95 backdrop-blur-md shadow-lg py-3.5 border-b border-[#eadfce]'
          : 'bg-[#fffaf2] py-4 border-b border-[#eadfce]/80'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo with Authentic Pandit Ji Photo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 shadow-md group-hover:scale-105 transition-transform bg-amber-100">
            <Image
              src="/images/pandit-ji.jpg"
              alt="पंडित जी महाकाल उज्जैन"
              fill
              className="object-cover"
              priority
            />
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
        <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-1">
          <Link
            href="/"
            className={`text-sm sm:text-base font-semibold transition-colors py-1.5 whitespace-nowrap ${
              pathname === '/' ? 'text-[#c96b18]' : 'text-[#2b2118] hover:text-[#c96b18]'
            }`}
          >
            मुख्य पृष्ठ
          </Link>

          <Link
            href="/pandits"
            className={`text-sm sm:text-base font-semibold transition-colors py-1.5 whitespace-nowrap ${
              pathname === '/pandits' ? 'text-[#c96b18]' : 'text-[#2b2118] hover:text-[#c96b18]'
            }`}
          >
            पंडित जी
          </Link>

          {/* Pooja Services Dropdown with Larger Font and Padding */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPoojaDropdownOpen(!poojaDropdownOpen)}
              onMouseEnter={() => setPoojaDropdownOpen(true)}
              className={`flex items-center gap-1 text-sm sm:text-base font-semibold transition-colors py-1.5 whitespace-nowrap ${
                pathname?.startsWith('/pooja') ? 'text-[#c96b18]' : 'text-[#2b2118] hover:text-[#c96b18]'
              }`}
            >
              <span>पूजा सेवाएं</span>
              <ChevronDown
                className={`w-4 h-4 text-[#c96b18] transition-transform duration-200 ${
                  poojaDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Overlay with Larger Fonts for Pooja Titles */}
            <AnimatePresence>
              {poojaDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onMouseLeave={() => setPoojaDropdownOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-88 sm:w-[420px] bg-white border border-[#eadfce] rounded-3xl shadow-2xl p-5 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-3 py-2 border-b border-[#eadfce]/60 mb-3">
                    <span className="text-xs sm:text-sm font-extrabold text-[#8f3f12] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#c96b18]" />
                      <span>सिद्ध पूजन एवं दोष अनुष्ठान</span>
                    </span>
                    <Link
                      href="/pooja"
                      onClick={() => setPoojaDropdownOpen(false)}
                      className="text-xs font-bold text-[#c96b18] hover:underline"
                    >
                      सभी देखें &rarr;
                    </Link>
                  </div>

                  <div className="space-y-1.5">
                    {mockPoojas.map((pooja) => (
                      <Link
                        key={pooja.id}
                        href={`/pooja/${pooja.slug}`}
                        onClick={() => setPoojaDropdownOpen(false)}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#fffaf2] border border-transparent hover:border-[#eadfce] transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-[#c96b18]/10 text-[#c96b18] text-sm font-bold flex items-center justify-center shrink-0 group-hover:bg-saffron-gradient group-hover:text-white transition-all shadow-xs">
                            🕉️
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-[#2b2118] group-hover:text-[#8f3f12] transition-colors">
                              {pooja.name.split('(')[0]}
                            </h4>
                            <p className="text-xs text-[#75695d] font-medium mt-0.5">
                              समय अवधि: {pooja.duration}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/about"
            className={`text-sm sm:text-base font-semibold transition-colors py-1.5 whitespace-nowrap ${
              pathname === '/about' ? 'text-[#c96b18]' : 'text-[#2b2118] hover:text-[#c96b18]'
            }`}
          >
            हमारे बारे में
          </Link>

          <Link
            href="/blog"
            className={`text-sm sm:text-base font-semibold transition-colors py-1.5 whitespace-nowrap ${
              pathname === '/blog' ? 'text-[#c96b18]' : 'text-[#2b2118] hover:text-[#c96b18]'
            }`}
          >
            धार्मिक लेख
          </Link>

          <Link
            href="/contact"
            className={`text-sm sm:text-base font-semibold transition-colors py-1.5 whitespace-nowrap ${
              pathname === '/contact' ? 'text-[#c96b18]' : 'text-[#2b2118] hover:text-[#c96b18]'
            }`}
          >
            संपर्क करें
          </Link>
        </nav>

        {/* Right Side: Phone & WhatsApp Actions */}
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
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-base font-semibold text-[#2b2118]"
              >
                मुख्य पृष्ठ
              </Link>
              <Link
                href="/pandits"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-base font-semibold text-[#2b2118]"
              >
                पंडित जी
              </Link>

              {/* Mobile Pooja Services Submenu */}
              <div className="space-y-1.5 pl-4 border-l-2 border-[#c96b18]/40 py-1">
                <span className="text-xs font-bold text-[#8f3f12] uppercase block px-2 mb-1">
                  पूजा सेवाएं
                </span>
                {mockPoojas.map((pooja) => (
                  <Link
                    key={pooja.id}
                    href={`/pooja/${pooja.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-2 text-sm font-bold text-[#2b2118] hover:text-[#c96b18]"
                  >
                    • {pooja.name.split('(')[0]}
                  </Link>
                ))}
              </div>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-base font-semibold text-[#2b2118]"
              >
                हमारे बारे में
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-base font-semibold text-[#2b2118]"
              >
                धार्मिक लेख
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-base font-semibold text-[#2b2118]"
              >
                संपर्क करें
              </Link>

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
