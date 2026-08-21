'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Flame, HelpCircle, Tag, Info, BookOpen } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroBanner } from '../components/home/HeroBanner';
import { StatsSection } from '../components/home/StatsSection';
import { PanditCard } from '../components/pandit/PanditCard';
import { PoojaCard } from '../components/pooja/PoojaCard';
import { BlogCard } from '../components/blog/BlogCard';
import { SpecialFestivalSection } from '../components/home/SpecialFestivalSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { ContactForm } from '../components/forms/ContactForm';
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

  useEffect(() => {
    async function loadData() {
      const [pRes, poRes, bRes, rRes, fRes, hpRes, stRes] = await Promise.all([
        panditService.getPandits(),
        poojaService.getPoojas(),
        blogService.getBlogs(),
        reviewService.getReviews(),
        festivalService.getFestivals(),
        homepageService.getHomepage(),
        settingsService.getSettings(),
      ]);
      setPandits(pRes);
      setPoojas(poRes);
      setBlogs(bRes);
      setReviews(rRes);
      setFestivals(fRes);
      setHomepageData(hpRes);
      setSiteSettings(stRes);
    }
    loadData();
  }, []);

  const defaultHomepageFaqs = [
    {
      question: 'उज्जैन में महाकाल पूजा की अग्रिम बुकिंग कैसे करें?',
      answer: 'हमारी वेबसाइट के माध्यम से आप सीधे प्रमाणित पंडित जी से व्हाट्सएप या कॉल पर बात करके अपनी सुविधानुसार तिथि एवं समय पर संकल्पित पूजा बुक कर सकते हैं।',
    },
    {
      question: 'कालसर्प दोष और मंगल दोष पूजा का मुख्य स्थान कौन सा है?',
      answer: 'उज्जैन में कालसर्प दोष निवारण हेतु महाकालेश्वर मंदिर परिसर एवं सिद्धवट घाट तथा मंगल दोष निवारण हेतु प्रसिद्ध मंगलनाथ मंदिर मुख्य स्थान माने जाते हैं।',
    },
    {
      question: 'क्या ऑनलाइन वीडियो कॉल पर पूजा संपन्न हो सकती है?',
      answer: 'जी हाँ, जो भक्त उज्जैन नहीं आ सकते, उनके नाम एवं गोत्र का संकल्प लेकर पंडित जी द्वारा लाइव वीडियो कॉल पर पूर्ण वैदिक विधि-विधान से पूजा संपन्न करवाई जाती है।',
    },
  ];

  const defaultHomepageTags = [
    'उज्जैन महाकाल मंदिर', 'कालसर्प दोष पूजा उज्जैन', 'मंगलनाथ मंगल दोष निवारण', 'महाकाल रुद्राभिषेक पूजा', 'सिद्धवट पितृदोष शांति', 'महामृत्युंजय जाप उज्जैन', 'नवग्रह शांति पूजा', 'उज्जैन सर्वश्रेष्ठ पंडित'
  ];

  const defaultShortDescription = 'महाकाल पंडित उज्जैन — पवित्र अवंतिका धाम में कालसर्प दोष, मंगल दोष, महाकाल रुद्राभिषेक एवं समस्त वैदिक पूजा अनुष्ठानों के लिए सीधे प्रामाणिक विद्वान पंडित जी से संपर्क करें।';

  const faqsToRender = homepageData?.homepageFaqs && homepageData.homepageFaqs.length > 0 
    ? homepageData.homepageFaqs 
    : defaultHomepageFaqs;

  const tagsToRender = homepageData?.homepageTags && homepageData.homepageTags.length > 0 
    ? homepageData.homepageTags 
    : defaultHomepageTags;

  const shortDescriptionToRender = homepageData?.websiteShortDescription || defaultShortDescription;

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

        {/* Find Pandit Section */}
        {(!homepageData?.panditSection || homepageData.panditSection.isVisible) && (
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
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

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {pandits.slice(0, homepageData?.panditSection?.countToShow || 4).map((pandit) => (
                <PanditCard key={pandit._id} pandit={pandit} />
              ))}
            </div>
          </section>
        )}

        {/* Mukhya Pooja Section */}
        {(!homepageData?.poojaSection || homepageData.poojaSection.isVisible) && (
          <section className="py-20 bg-amber-900/5 border-y border-[#eadfce]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {poojas.map((pooja) => (
                  <PoojaCard key={pooja._id} pooja={pooja} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Hotels & Bhakt Niwas Dharmashala Slider */}
        <HomeAccommodationsSlider />


        {/* Special Festivals 2026 */}
        <SpecialFestivalSection festivals={festivals} settings={homepageData?.festivalSection} />

        {/* 1. Live Photo Gallery Section */}
        <LiveGallerySection />

        {/* 2. Blog / Knowledge Section (Right Below Gallery) */}
        {(!homepageData?.blogSection || homepageData.blogSection.isVisible) && (
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#eadfce]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(0, homepageData?.blogSection?.countToShow || 6).map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </section>
        )}

        {/* Devotee Reviews */}
        <ReviewsSection reviews={reviews} />

        {/* 3. Homepage Collapsible Accordion FAQs Section */}
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
                  className="bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#7a1f1f] text-base sm:text-lg hover:bg-[#fffaf2] transition-colors"
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
                    <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#75695d] border-t border-[#eadfce]/50 leading-relaxed bg-[#fffaf2]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Homepage SEO Keywords & Tags Bar */}
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

        {/* 5. Dynamic Website Overview & Short Description Section */}
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

        {/* Contact & Booking Section */}
        {(!homepageData?.contactSection || homepageData.contactSection.isVisible) && (
          <section className="py-20 bg-amber-900/5 border-t border-[#eadfce]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md">
                  <Flame className="w-7 h-7 text-white" />
                </div>
                <h2 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f]">
                  {homepageData?.contactSection?.heading || 'Book Your Sacred Ritual Today'}
                </h2>
                <p className="text-base text-[#75695d] leading-relaxed">
                  {homepageData?.contactSection?.description || 'Have questions or need assistance? Fill out the form and our priest coordination team will reach out.'}
                </p>
                <div className="space-y-4 pt-4 border-t border-[#eadfce]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <span className="text-sm font-semibold text-[#2b2118]">100% Purity & Vedic Vidhi Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <span className="text-sm font-semibold text-[#2b2118]">Direct Support from Ujjain Pandits</span>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer settings={siteSettings} />
    </div>
  );
}
