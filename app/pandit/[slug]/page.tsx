'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Award, CheckCircle2, Phone, MessageCircle, ArrowLeft, Flame, HelpCircle, Tag, ScrollText, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { panditService } from '@/services/panditService';
import { Pandit } from '@/types';
import { SERVER_ORIGIN } from '@/lib/api';

export default function PanditDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [pandit, setPandit] = useState<Pandit | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (slug) {
      panditService.getPanditBySlug(slug).then((data) => {
        setPandit(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf2]">
        <Navbar />
        <div className="pt-32"><LoadingSpinner /></div>
      </div>
    );
  }

  if (!pandit) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffaf2]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <h1 className="heading-spiritual text-3xl font-bold text-[#7a1f1f]">Pandit Ji Profile Not Found</h1>
          <p className="text-sm text-[#75695d] mt-2 mb-6">The requested priest profile is either hidden or does not exist.</p>
          <Link href="/pandits" className="bg-saffron-gradient text-white px-6 py-2.5 rounded-full font-semibold">
            Back to All Pandits
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const defaultFaqs = [
    {
      q: 'उज्जैन में पूजा करवाने की क्या प्रक्रिया है?',
      a: 'आप हमारी वेबसाइट के माध्यम से सीधे पंडित जी से व्हाट्सएप या कॉल पर संपर्क करके मुहूर्त एवं तिथि तय कर सकते हैं। पूजा का संपूर्ण सामान (सामग्री) पंडित जी द्वारा स्वयं व्यवस्थित किया जाता है।',
    },
    {
      q: 'क्या ऑनलाईन / ई-पूजा का विकल्प भी उपलब्ध है?',
      a: 'जी हाँ, जो भक्त उज्जैन आने में असमर्थ हैं, उनके नाम एवं गोत्र का संकल्प लेकर पंडित जी द्वारा सीधे मंदिर परिसर या क्षिप्रा तट पर ऑनलाइन (लाइव वीडियो कॉल) पूजा संपन्न कराई जाती है।',
    },
    {
      q: 'पूजा की दक्षिणा एवं आवश्यक सामग्री का क्या नियम है?',
      a: 'पूजा की दक्षिणा एवं सामग्री का पारदर्शी विवरण पंडित जी द्वारा अग्रिम बता दिया जाता है। किसी भी प्रकार का कोई छिपा हुआ शुल्क नहीं लिया जाता है।',
    },
  ];

  const defaultTags = pandit.tags && pandit.tags.length > 0 
    ? pandit.tags 
    : ['महाकाल रुद्राभिषेक', 'कालसर्प दोष निवारण', 'मंगलनाथ मंगल दोष', 'महामृत्युंजय जाप', 'सिद्धवट पितृदोष', 'नवग्रह शांति'];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <Link href="/pandits" className="inline-flex items-center gap-2 text-xs font-bold text-[#c96b18] hover:text-[#8f3f12]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pandits List</span>
        </Link>

        {/* Profile Banner & Detail Header Card */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-10 shadow-spiritual grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-amber-950/10 shadow-md">
            <Image
              src={
                pandit.image?.startsWith('/uploads')
                  ? `${SERVER_ORIGIN}${pandit.image}`
                  : (pandit.image || '/images/pandits/pandit1.jpg')
              }
              alt={pandit.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="md:col-span-2 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              {pandit.isVerified && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Verified Pandit Ji
                </span>
              )}
              <span className="bg-amber-100 text-[#8f3f12] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-300">
                <Award className="w-4 h-4 text-[#c96b18]" />
                {pandit.experience} Years Vedic Experience
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-orange-300">
                <Flame className="w-4 h-4 text-orange-600" />
                {pandit.poojasCompleted || 500}+ Sacred Poojas Completed
              </span>
            </div>

            <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
              {pandit.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#75695d]">
              <MapPin className="w-4.5 h-4.5 text-[#c96b18]" />
              <span className="font-medium">{pandit.location}</span>
            </div>

            <p className="text-sm sm:text-base text-[#2b2118] leading-relaxed font-light">
              {pandit.shortDescription}
            </p>

            {/* Direct Contact Buttons Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`https://wa.me/${pandit.whatsAppNumber || '919876543210'}?text=${encodeURIComponent(`Pranam Pandit Ji, I want to inquire about booking a pooja ritual with ${pandit.name} in Ujjain.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Direct WhatsApp Chat</span>
              </a>

              <a
                href={`tel:${pandit.phone || '+919876543210'}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#fffaf2] hover:bg-amber-100/50 text-[#7a1f1f] border border-[#c96b18] font-bold px-6 py-4 rounded-2xl transition-all text-sm"
              >
                <Phone className="w-4.5 h-4.5 text-[#c96b18]" />
                <span>Call {pandit.phone || '+91 98765 43210'}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#eadfce] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#75695d] block">Languages Spoken</span>
                <span className="text-sm font-semibold text-[#2b2118]">{pandit.languages.join(', ')}</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#75695d] block">Devotee Rating</span>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{pandit.rating} / 5.0 ({pandit.reviewsCount} Devotee Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section Grid: Left (Bio & Specializations & FAQs) & Right (Quick Contact Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Short Description Overview Card */}
            {pandit.shortDescription && (
              <div className="bg-[#fffaf2] rounded-3xl border border-[#eadfce] p-6 shadow-sm space-y-2">
                <h4 className="text-xs uppercase font-bold text-[#c96b18] tracking-widest">
                  Quick Overview (संक्षिप्त विवरण)
                </h4>
                <p className="text-sm sm:text-base font-semibold text-[#7a1f1f] leading-relaxed">
                  {pandit.shortDescription}
                </p>
              </div>
            )}

            {/* Full Biography / About Pandit Ji Card */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#eadfce] pb-3">
                <ScrollText className="w-6 h-6 text-[#c96b18]" />
                <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                  Biography & Vedic Background (पंडित जी का विस्तृत विवरण)
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#2b2118] leading-relaxed whitespace-pre-line font-normal pt-2">
                {pandit.bio}
              </p>
            </div>

            {/* Specialization List */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-4">
              <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                Ritual Specializations & Expertise (विशेषज्ञता)
              </h3>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {pandit.specializations.map((spec, i) => (
                  <span
                    key={i}
                    className="bg-[#fffaf2] text-[#8f3f12] border border-[#eadfce] text-sm font-bold px-4 py-2 rounded-xl shadow-xs"
                  >
                    ✨ {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions (Pooja FAQs Accordion) */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-[#eadfce] pb-4">
                <HelpCircle className="w-6 h-6 text-[#c96b18]" />
                <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                  पवित्र पूजा एवं अनुष्ठान से जुड़े प्रमुख प्रश्न (FAQs)
                </h3>
              </div>

              <div className="space-y-3">
                {((pandit.faqs && pandit.faqs.length > 0) ? pandit.faqs : defaultFaqs).map((faq: any, index: number) => {
                  const isOpen = openFaqIndex === index;
                  const questionText = faq.question || faq.q;
                  const answerText = faq.answer || faq.a;

                  return (
                    <div
                      key={index}
                      className="bg-[#fffaf2] rounded-2xl border border-[#eadfce] overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#7a1f1f] text-sm sm:text-base hover:bg-amber-100/40 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-[#c96b18]">Q{index + 1}.</span>
                          <span>{questionText}</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#c96b18] shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#75695d] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#75695d] border-t border-[#eadfce]/50 leading-relaxed bg-white/70">
                          {answerText}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pandit Tags Section */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#eadfce] pb-3">
                <Tag className="w-5 h-5 text-[#c96b18]" />
                <h3 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">
                  पंडित जी से जुड़े मुख्य टैग (Tags)
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {defaultTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-amber-50 text-[#8f3f12] border border-amber-200 px-3.5 py-1.5 rounded-full hover:bg-amber-100 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact & Booking Quick Card (Form completely removed) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfce] shadow-spiritual space-y-6 sticky top-28">
              <div className="w-12 h-12 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md mx-auto">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                  Direct Booking & Consultation
                </h3>
                <p className="text-xs text-[#75695d] leading-relaxed">
                  No forms or middleman waiting! Contact {pandit.name} directly via WhatsApp or Call for instant date & mahurat booking.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${pandit.whatsAppNumber || '919876543210'}?text=${encodeURIComponent(`Pranam Pandit Ji, I want to book a pooja ritual with ${pandit.name} in Ujjain.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-md transition-all text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${pandit.phone || '+919876543210'}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#fffaf2] hover:bg-amber-100/60 text-[#7a1f1f] border border-[#c96b18] font-bold py-3.5 rounded-2xl transition-all text-sm"
                >
                  <Phone className="w-4.5 h-4.5 text-[#c96b18]" />
                  <span>Call {pandit.phone || '+91 98765 43210'}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#eadfce] space-y-2.5 text-xs text-[#75695d]">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% Verified Ujjain Vedic Scholar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Direct Consultation with Priest</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Complete Samagri & Vidhi Managed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
