'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Map,
  Compass,
  UserCheck,
  Flame,
  ShoppingBag,
  Hotel,
  Bus,
  Car,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { panditService } from '@/services/panditService';
import { poojaService } from '@/services/poojaService';
import { productService } from '@/services/productService';
import { blogService } from '@/services/blogService';
import { Pandit, Pooja, Product, Blog } from '@/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function HTMLSitemapPage() {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [panditData, poojaData, productData, blogData] = await Promise.all([
          panditService.getPandits().catch(() => []),
          poojaService.getPoojas().catch(() => []),
          productService.getProducts().catch(() => []),
          blogService.getBlogs().catch(() => []),
        ]);
        setPandits(panditData);
        setPoojas(poojaData);
        setProducts(productData);
        setBlogs(blogData);
      } catch (e) {
        console.error('Failed to load sitemap items', e);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  const mainPages = [
    { title: 'Home', path: '/', desc: 'Mahakal Pandit Ji Ujjain Portal Homepage' },
    { title: 'Find Pandit Ji', path: '/pandits', desc: 'Browse and book verified Pandits in Ujjain' },
    { title: 'Mukhya Pooja Services', path: '/pooja', desc: 'Sacred Vedic rituals and puja bookings' },
    { title: 'Products & Samagri', path: '/products', desc: 'Authentic Ujjain mala, idols, and puja samagri' },
    { title: 'Hotels & Niwas', path: '/hotels', desc: 'Dharmashalas and hotels near Mahakaleshwar' },
    { title: 'Tour Packages', path: '/tours', desc: 'Ujjain & Omkareshwar spiritual darshan tours' },
    { title: 'Travel Cabs', path: '/travel', desc: 'Taxi and car rentals in Ujjain' },
    { title: 'Spiritual Packages', path: '/packages', desc: 'All-inclusive puja & darshan packages' },
    { title: 'Spiritual Blog & Articles', path: '/blog', desc: 'Mahakal katha, puja vidhi, and auspicious dates' },
    { title: 'About Us', path: '/about', desc: 'Our mission and authentic Vedic tradition' },
    { title: 'Contact & Support', path: '/contact', desc: 'Direct helpline and Ujjain office location' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2] text-[#2b2118]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-10 shadow-spiritual text-center space-y-3 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-[#7a1f1f] text-xs font-bold px-4 py-1.5 rounded-full border border-amber-300">
            <Map className="w-4 h-4 text-[#c96b18]" />
            <span>Complete Website Directory</span>
          </div>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Mahakal Pandit Website Sitemap
          </h1>
          <p className="text-sm text-[#75695d] max-w-2xl mx-auto">
            Explore all main sections, verified Pandits, sacred puja rituals, store products, and spiritual blog guides.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-10">
            {/* Section 1: Main Pages */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5 border-b border-[#eadfce] pb-4">
                <Compass className="w-6 h-6 text-[#c96b18]" />
                <h2 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                  Main Pages & Navigation
                </h2>
                <span className="text-xs bg-amber-100 text-[#8f3f12] font-semibold px-2.5 py-0.5 rounded-full ml-auto">
                  {mainPages.length} Pages
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainPages.map((page, idx) => (
                  <Link
                    key={idx}
                    href={page.path}
                    className="p-4 rounded-2xl border border-[#eadfce] bg-amber-50/30 hover:bg-amber-100/50 hover:border-amber-400 transition-all flex items-start justify-between group"
                  >
                    <div>
                      <span className="font-extrabold text-[#7a1f1f] text-sm block group-hover:text-[#c96b18]">
                        {page.title}
                      </span>
                      <span className="text-[11px] text-[#75695d] block mt-0.5">{page.desc}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#c96b18] group-hover:translate-x-1 transition-transform shrink-0 mt-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 2: Verified Pandits */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5 border-b border-[#eadfce] pb-4">
                <UserCheck className="w-6 h-6 text-[#c96b18]" />
                <h2 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                  Verified Pandits in Ujjain
                </h2>
                <span className="text-xs bg-amber-100 text-[#8f3f12] font-semibold px-2.5 py-0.5 rounded-full ml-auto">
                  {pandits.length} Pandits
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {pandits.map((p) => (
                  <Link
                    key={p._id || p.id}
                    href={`/pandit/${p.slug}`}
                    className="p-3.5 rounded-xl border border-[#eadfce] bg-white hover:border-[#c96b18] hover:bg-amber-50/50 transition-all flex items-center justify-between group"
                  >
                    <span className="text-xs font-bold text-[#2b2118] group-hover:text-[#7a1f1f] truncate">
                      {p.name} ({p.location || 'Ujjain'})
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#c96b18] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 3: Sacred Pooja Services */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5 border-b border-[#eadfce] pb-4">
                <Flame className="w-6 h-6 text-[#c96b18]" />
                <h2 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                  Pooja Services & Rituals
                </h2>
                <span className="text-xs bg-amber-100 text-[#8f3f12] font-semibold px-2.5 py-0.5 rounded-full ml-auto">
                  {poojas.length} Services
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {poojas.map((p) => (
                  <Link
                    key={p._id}
                    href={`/pooja/${p.slug}`}
                    className="p-3.5 rounded-xl border border-[#eadfce] bg-white hover:border-[#c96b18] hover:bg-amber-50/50 transition-all flex items-center justify-between group"
                  >
                    <span className="text-xs font-bold text-[#2b2118] group-hover:text-[#7a1f1f] truncate">
                      {p.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#c96b18] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 4: Products & Samagri */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5 border-b border-[#eadfce] pb-4">
                <ShoppingBag className="w-6 h-6 text-[#c96b18]" />
                <h2 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                  Products & Sacred Samagri
                </h2>
                <span className="text-xs bg-amber-100 text-[#8f3f12] font-semibold px-2.5 py-0.5 rounded-full ml-auto">
                  {products.length} Products
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {products.map((p) => (
                  <Link
                    key={p._id || p.id}
                    href={`/products/${p.slug}`}
                    className="p-3.5 rounded-xl border border-[#eadfce] bg-white hover:border-[#c96b18] hover:bg-amber-50/50 transition-all flex items-center justify-between group"
                  >
                    <span className="text-xs font-bold text-[#2b2118] group-hover:text-[#7a1f1f] truncate">
                      {p.name} ({p.category})
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#c96b18] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 5: Spiritual Blogs */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5 border-b border-[#eadfce] pb-4">
                <FileText className="w-6 h-6 text-[#c96b18]" />
                <h2 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                  Spiritual Blog Articles
                </h2>
                <span className="text-xs bg-amber-100 text-[#8f3f12] font-semibold px-2.5 py-0.5 rounded-full ml-auto">
                  {blogs.length} Articles
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {blogs.map((b) => (
                  <Link
                    key={b._id}
                    href={`/blog/${b.slug}`}
                    className="p-3.5 rounded-xl border border-[#eadfce] bg-white hover:border-[#c96b18] hover:bg-amber-50/50 transition-all flex items-center justify-between group"
                  >
                    <span className="text-xs font-bold text-[#2b2118] group-hover:text-[#7a1f1f] truncate">
                      {b.title}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#c96b18] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
