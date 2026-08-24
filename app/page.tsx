'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, HelpCircle, Tag, Info, BookOpen, Flame, FolderOpen } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroBanner } from '../components/home/HeroBanner';
import { StatsSection } from '../components/home/StatsSection';
import { HomePanditSlider } from '../components/home/HomePanditSlider';
import { HomePoojaSlider } from '../components/home/HomePoojaSlider';
import { HomeBlogSlider } from '../components/home/HomeBlogSlider';
import { SpecialFestivalSection } from '../components/home/SpecialFestivalSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { DirectConnectCard } from '../components/ui/DirectConnectCard';
import { EarthIntroAnimation } from '../components/intro/EarthIntroAnimation';
import { LiveGallerySection } from '../components/home/LiveGallerySection';
import { HomeAccommodationsSlider } from '../components/home/HomeAccommodationsSlider';
import { FloatingContactWidget } from '../components/ui/FloatingContactWidget';
import { panditService } from '../services/panditService';
import { poojaService } from '../services/poojaService';
import { blogService } from '../services/blogService';
import { festivalService, homepageService, settingsService, reviewService } from '../services/otherServices';
import { Pandit, Pooja, Blog, Review, Festival, HomepageSettings, SiteSettings } from '../types';

export default function HomePage() {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [homepageData, setHomepageData] = useState<HomepageSettings | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Pure API-Driven Real-time Fetching (No Fake Static Seed Fallbacks)
  useEffect(() => {
    panditService.getPandits().then((res) => setPandits(res || []));
    poojaService.getPoojas().then((res) => setPoojas(res || []));
    blogService.getBlogs().then((res) => setBlogs(res || []));
    reviewService.getReviews().then((res) => setReviews(res || []));
    festivalService.getFestivals().then((res) => setFestivals(res || []));
    homepageService.getHomepage().then((res) => setHomepageData(res || null));
    settingsService.getSettings().then((res) => setSiteSettings(res || null));
  }, []);

  const faqsToRender = homepageData?.homepageFaqs || [];
  const tagsToRender = homepageData?.homepageTags || [];
  const shortDescriptionToRender = homepageData?.websiteShortDescription;

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2] relative">
      {/* First-Time Visit Earth Rotation & Ujjain Zoom Intro Animation */}
      <EarthIntroAnimation />

      <Navbar />

      {/* Floating 24/7 WhatsApp & Phone Call Widget */}
      <FloatingContactWidget />

      <main className="flex-1">
        {/* Full screen Video Hero */}
        <HeroBanner data={homepageData?.hero} />

        {/* Dynamic Stats */}
        <StatsSection stats={homepageData?.stats} />

        {/* 1. Find Pandit Section */}
        {(!homepageData?.panditSection || homepageData.panditSection.isVisible) && (
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
                  Verified Scholars
                </span>
                <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f] mt-1">
                  {homepageData?.panditSection?.heading || 'Find Your Pandit Ji'}
                </h2>
                <p className="text-sm text-[#75695d] mt-2 max-w-2xl">
                  {homepageData?.panditSection?.description || 'Connect with verified & authentic Vedic Scholars from Ujjain for sacred rites.'}
                </p>
              </div>
              <Link
                href="/pandits"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#c96b18] hover:text-[#8f3f12] transition-colors shrink-0"
              >
                <span>View All Pandits</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {pandits.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white rounded-3xl border border-[#eadfce] space-y-2">
                <FolderOpen className="w-10 h-10 text-amber-500 mx-auto opacity-60" />
                <p className="text-base font-bold text-[#7a1f1f]">No Pandits Found</p>
                <p className="text-xs text-[#75695d]">Super Admin will upload verified pandits soon.</p>
              </div>
            ) : (
              <HomePanditSlider pandits={pandits} />
            )}
          </section>
        )}

        {/* 2. Mukhya Pooja Section */}
        {(!homepageData?.poojaSection || homepageData.poojaSection.isVisible) && (
          <section className="py-20 bg-amber-900/5 border-y border-[#eadfce]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
                    Sacred Ceremonies
                  </span>
                  <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f] mt-1">
                    {homepageData?.poojaSection?.heading || 'Mukhya Pooja Services'}
                  </h2>
                  <p className="text-sm text-[#75695d] mt-2 max-w-2xl">
                    {homepageData?.poojaSection?.description || 'Sacred ceremonies performed strictly according to Vedic traditions.'}
                  </p>
                </div>
                <Link
                  href="/pooja"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#c96b18] hover:text-[#8f3f12] transition-colors shrink-0"
                >
                  <span>View All Pooja Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {poojas.length === 0 ? (
                <div className="text-center py-12 px-4 bg-white rounded-3xl border border-[#eadfce] space-y-2">
                  <FolderOpen className="w-10 h-10 text-amber-500 mx-auto opacity-60" />
                  <p className="text-base font-bold text-[#7a1f1f]">No Pooja Services Found</p>
                  <p className="text-xs text-[#75695d]">Super Admin will upload sacred pooja offerings soon.</p>
                </div>
              ) : (
                <HomePoojaSlider poojas={poojas} />
              )}
            </div>
          </section>
        )}

        {/* 3. Hotels & Bhakt Niwas Dharmashala */}
        <HomeAccommodationsSlider />

        {/* Special Festivals 2026 */}
        <SpecialFestivalSection festivals={festivals} settings={homepageData?.festivalSection} />

        {/* Live Photo Gallery Section */}
        <LiveGallerySection />

        {/* 4. Spiritual Knowledge & Guidance Blog */}
        {(!homepageData?.blogSection || homepageData.blogSection.isVisible) && (
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#eadfce] space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18] inline-flex items-center gap-1.5 bg-amber-100/60 border border-amber-200 px-3.5 py-1 rounded-full">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Vedic Knowledge Articles</span>
                </span>
                <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f] mt-2">
                  {homepageData?.blogSection?.heading || 'Spiritual Knowledge & Guidance'}
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#c96b18] hover:text-[#8f3f12] transition-colors shrink-0"
              >
                <span>Read All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white rounded-3xl border border-[#eadfce] space-y-2">
                <FolderOpen className="w-10 h-10 text-amber-500 mx-auto opacity-60" />
                <p className="text-base font-bold text-[#7a1f1f]">No Articles Found</p>
                <p className="text-xs text-[#75695d]">Super Admin will publish spiritual blog articles soon.</p>
              </div>
            ) : (
              <HomeBlogSlider blogs={blogs} />
            )}
          </section>
        )}

        {/* Devotee Reviews */}
        <ReviewsSection reviews={reviews} />

        {/* Homepage Collapsible Accordion FAQs Section */}
        {faqsToRender.length > 0 && (
          <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18] inline-flex items-center gap-1 bg-amber-100/60 border border-amber-200 px-3.5 py-1 rounded-full">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </span>
              <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f]">
                उज्जैन पूजा एवं अनुष्ठान से जुड़े सामान्य प्रश्न
              </h2>
              <p className="text-sm text-[#75695d]">
                श्रद्धालुओं द्वारा पूछे जाने वाले प्रमुख प्रश्नों के सटीक उत्तर।
              </p>
            </div>

            <div className="space-y-4">
              {faqsToRender.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-[#fffaf2] rounded-3xl border border-[#eadfce] overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#7a1f1f] text-base sm:text-lg hover:bg-white transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-[#c96b18]">Q{index + 1}.</span>
                        <span>{faq.question}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#c96b18] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#75695d] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#75695d] border-t border-[#eadfce]/50 leading-relaxed bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Homepage SEO Keywords & Tags Bar */}
        {tagsToRender.length > 0 && (
          <section className="py-10 bg-white border-t border-[#eadfce]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#c96b18]" />
                <h4 className="text-xs uppercase font-bold text-[#7a1f1f] tracking-widest">
                  Popular Searches & Sacred Tags
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {tagsToRender.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold bg-[#fffaf2] text-[#8f3f12] border border-[#eadfce] px-3.5 py-1.5 rounded-full hover:bg-amber-100/60 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Website Overview & Short Description Section */}
        {shortDescriptionToRender && (
          <section className="py-16 bg-[#fffaf2] border-t border-[#eadfce]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#eadfce] shadow-sm space-y-4 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-[#c96b18] mx-auto flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                  श्री महाकाल पंडित उज्जैन — पवित्र अनुष्ठान सेवा केंद्र
                </h3>
                <p className="text-sm sm:text-base text-[#75695d] leading-relaxed max-w-3xl mx-auto">
                  {shortDescriptionToRender}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Direct Connect Section (Replaced Contact Form with Direct WhatsApp / Call Card) */}
        {(!homepageData?.contactSection || homepageData.contactSection.isVisible) && (
          <section className="py-20 bg-amber-900/5 border-t border-[#eadfce]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <DirectConnectCard />
            </div>
          </section>
        )}
      </main>

      <Footer settings={siteSettings} />
    </div>
  );
}
