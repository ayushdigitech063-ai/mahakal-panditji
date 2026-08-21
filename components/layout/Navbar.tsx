'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Flame, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { poojaService } from '../../services/poojaService';
import { Pooja } from '../../types';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [poojasDropdownOpen, setPoojasDropdownOpen] = useState(false);
  const [poojasList, setPoojasList] = useState<Pooja[]>([]);
  const pathname = usePathname();

  const whatsAppNumber = '919876543210';
  const phoneNumber = '+919876543210';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    poojaService.getPoojas().then((data) => {
      if (data && data.length > 0) {
        setPoojasList(data.filter((p) => p.isActive));
      }
    });
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Pandit Ji', href: '/pandits' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Tours', href: '/tours' },
    { name: 'Travel', href: '/travel' },
    { name: 'Packages', href: '/packages' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-glass shadow-spiritual border-b border-[#eadfce] py-3'
          : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent text-white py-3.5 sm:py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between">
        {/* Brand Logo - Extreme Left Corner */}
        <Link href="/" className="flex items-center gap-2 group shrink-0 mr-4 xl:mr-8">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <span className={`heading-spiritual text-base sm:text-xl xl:text-2xl font-bold tracking-tight block leading-none ${isScrolled ? 'text-[#7a1f1f]' : 'text-amber-300'}`}>
              Mahakal Pandit
            </span>
            <span className={`text-[8px] sm:text-[10px] tracking-widest uppercase block ${isScrolled ? 'text-[#75695d]' : 'text-amber-100/80'}`}>
              Ujjain Sacred Seva
            </span>
          </div>
        </Link>

        {/* Center Nav Links with Balanced Spacing */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 mx-auto">
          <Link
            href="/"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Home
          </Link>

          <Link
            href="/pandits"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/pandits' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Pandit Ji
          </Link>

          {/* Dynamic Poojas Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPoojasDropdownOpen(true)}
            onMouseLeave={() => setPoojasDropdownOpen(false)}
          >
            <Link
              href="/pooja"
              className={`inline-flex items-center gap-1 text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
                pathname.startsWith('/pooja') ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
              }`}
            >
              <span>Pooja Rituals</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#c96b18]" />
            </Link>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {poojasDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-72 bg-white rounded-2xl border border-[#eadfce] shadow-2xl p-3 space-y-1 z-50 mt-1"
                >
                  <div className="px-3 py-1.5 text-[11px] uppercase font-bold text-[#c96b18] border-b border-[#eadfce]/60 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sacred Mahakal Rituals</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-0.5 pt-1">
                    {poojasList.map((pooja) => (
                      <Link
                        key={pooja._id}
                        href={`/pooja/${pooja.slug}`}
                        onClick={() => setPoojasDropdownOpen(false)}
                        className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#2b2118] hover:bg-[#fffaf2] hover:text-[#7a1f1f] transition-colors"
                      >
                        {pooja.name}
                      </Link>
                    ))}
                    <Link
                      href="/pooja"
                      onClick={() => setPoojasDropdownOpen(false)}
                      className="block px-3 py-2 text-center text-xs font-bold text-[#c96b18] bg-amber-50 hover:bg-amber-100/70 rounded-xl transition-colors mt-2"
                    >
                      View All Rituals →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/hotels"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname.startsWith('/hotels') ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Hotels
          </Link>

          <Link
            href="/tours"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname.startsWith('/tours') ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Tours
          </Link>

          <Link
            href="/travel"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/travel' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Travel
          </Link>

          <Link
            href="/packages"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname.startsWith('/packages') ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Packages
          </Link>

          <Link
            href="/about"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/about' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            About
          </Link>

          <Link
            href="/blog"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/blog' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/contact' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Corner: Call Number + WhatsApp Button + Book Pooja Button with Spacing */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 ml-4 xl:ml-8">
          {/* Phone Call Link */}
          <a
            href={`tel:${phoneNumber}`}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
              isScrolled
                ? 'border-[#c96b18] text-[#c96b18] hover:bg-[#c96b18]/10'
                : 'border-white/40 text-white hover:bg-white/10'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 98765 43210</span>
          </a>

          {/* WhatsApp Direct Icon Button */}
          <a
            href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent('Pranam Pandit Ji, I want to book a pooja ritual in Ujjain.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all border border-white/40"
            title="Direct WhatsApp"
            aria-label="Direct WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>

          {/* Book Pooja CTA Button */}
          <Link
            href="/contact"
            className="bg-saffron-gradient text-white text-xs font-bold px-4.5 py-2 rounded-full shadow-spiritual hover:shadow-spiritual-hover hover:scale-105 transition-all whitespace-nowrap"
          >
            Book Pooja
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-[#2b2118]' : 'text-white'
          }`}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#fffaf2] border-b border-[#eadfce] shadow-xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="px-4 py-5 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-medium py-2 border-b border-[#eadfce]/50 ${
                    pathname === link.href ? 'text-[#c96b18] font-bold' : 'text-[#2b2118]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 flex flex-col gap-2.5">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl border border-[#c96b18] text-[#c96b18]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 98765 43210</span>
                </a>

                <a
                  href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent('Pranam Pandit Ji, I want to book a pooja ritual in Ujjain.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl bg-[#25D366] text-white shadow-md"
                >
                  <span>WhatsApp Contact</span>
                </a>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-saffron-gradient text-white text-xs font-semibold py-3 rounded-xl shadow-md"
                >
                  Book Pooja Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
