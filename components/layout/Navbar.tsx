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
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-glass shadow-spiritual border-b border-[#eadfce] py-3'
          : 'bg-gradient-to-b from-black/60 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className={`heading-spiritual text-xl sm:text-2xl font-bold tracking-tight block leading-none ${isScrolled ? 'text-[#7a1f1f]' : 'text-amber-300'}`}>
              Mahakal Pandit
            </span>
            <span className={`text-[10px] tracking-widest uppercase block ${isScrolled ? 'text-[#75695d]' : 'text-amber-100/80'}`}>
              Ujjain Sacred Seva
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Home
          </Link>

          <Link
            href="/pandits"
            className={`text-sm font-medium transition-colors hover:text-[#c96b18] ${
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
              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#c96b18] ${
                pathname.startsWith('/pooja') ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
              }`}
            >
              <span>Pooja Rituals</span>
              <ChevronDown className="w-4 h-4 text-[#c96b18]" />
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
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/about' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            About
          </Link>

          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/blog' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-[#c96b18] ${
              pathname === '/contact' ? 'text-[#c96b18] font-semibold' : isScrolled ? 'text-[#2b2118]' : 'text-white/90'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+919876543210"
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
              isScrolled
                ? 'border-[#c96b18] text-[#c96b18] hover:bg-[#c96b18]/10'
                : 'border-white/40 text-white hover:bg-white/10'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 98765 43210</span>
          </a>
          <Link
            href="/contact"
            className="bg-saffron-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-spiritual hover:shadow-spiritual-hover hover:scale-105 transition-all"
          >
            Book Pooja
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
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
            className="md:hidden bg-[#fffaf2] border-b border-[#eadfce] shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base font-medium py-2 border-b border-[#eadfce]/50 ${
                  pathname === '/' ? 'text-[#c96b18] font-bold' : 'text-[#2b2118]'
                }`}
              >
                Home
              </Link>
              <Link
                href="/pandits"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base font-medium py-2 border-b border-[#eadfce]/50 ${
                  pathname === '/pandits' ? 'text-[#c96b18] font-bold' : 'text-[#2b2118]'
                }`}
              >
                Pandit Ji
              </Link>

              {/* Mobile Pooja Sub-links */}
              <div className="space-y-1 py-1 border-b border-[#eadfce]/50">
                <div className="text-xs uppercase font-bold text-[#c96b18]">Pooja Rituals</div>
                <div className="pl-3 space-y-1 pt-1">
                  {poojasList.map((pooja) => (
                    <Link
                      key={pooja._id}
                      href={`/pooja/${pooja.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-[#7a1f1f] font-semibold py-1"
                    >
                      • {pooja.name}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium py-2 border-b border-[#eadfce]/50 ${
                    pathname === link.href ? 'text-[#c96b18] font-bold' : 'text-[#2b2118]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border border-[#c96b18] text-[#c96b18]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 98765 43210</span>
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-saffron-gradient text-white font-semibold py-3 rounded-xl shadow-md"
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
