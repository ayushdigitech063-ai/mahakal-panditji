'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Award, CheckCircle2, Phone, MessageCircle, HelpCircle, ChevronDown, Sparkles, Clock, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { Pandit } from '@/types/pandit';
import { Pooja } from '@/types/pooja';
import { openBookingModal } from '@/lib/sweetalert';
import ContactSection from '@/components/forms/ContactSection';

interface PanditDetailClientProps {
  pandit: Pandit;
  poojas: Pooja[];
}

export default function PanditDetailClient({ pandit, poojas }: PanditDetailClientProps) {
  const [openPoojaIndex, setOpenPoojaIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent(
    `जय श्री महाकाल 🙏 मुझे ${pandit.name} जी से पूजा एवं मुहूर्त परामर्श हेतु संपर्क करना है।`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const panditFaqs = [
    {
      question: `${pandit.name} जी पूजा की तैयारी एवं सामग्री स्वयं लाते हैं?`,
      answer: 'हाँ, पंडित जी द्वारा सभी आवश्यक प्रामाणिक पूजा सामग्री, हवन काष्ठ, भस्म एवं गंगाजल की व्यवस्था की जाती है।',
    },
    {
      question: `क्या हम पंडित जी से व्हाट्सएप या ऑनलाइन वीडियो पर परामर्श कर सकते हैं?`,
      answer: 'जी बिल्कुल! आप व्हाट्सएप पर डायरेक्ट संदेश भेजकर अपना गोत्र, जन्म तिथि एवं मुहूर्त संबंधी परामर्श प्राप्त कर सकते हैं।',
    },
    {
      question: `उज्जैन आने पर पंडित जी द्वारा पूजा स्थल की क्या व्यवस्था रहती है?`,
      answer: 'पंडित जी द्वारा महाकाल मंदिर प्रांगण, शिप्रा घाट एवं व्यक्तिगत पूजा स्थलों पर संपूर्ण शास्त्रीय सुरक्षा एवं सुविधा के साथ पूजा संपन्न कराई जाती है।',
    },
  ];

  return (
    <div className="bg-[#fffaf2] min-h-screen pb-16 space-y-10 font-sans w-full">
      {/* Premium Hexagonal Vedic Banner (Matching Screenshot in Sacred Saffron/Amber Theme) */}
      <div className="relative w-full bg-gradient-to-r from-[#210902] via-[#451406] to-[#210902] text-white py-10 px-4 sm:px-8 lg:px-12 border-b-2 border-amber-500/30 overflow-hidden shadow-2xl">
        {/* Subtle Background Zodiac Wheel Graphic Pattern */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none w-96 h-96 sm:w-[500px] sm:h-[500px]">
          <svg viewBox="0 0 200 200" className="w-full h-full text-amber-400 fill-current animate-spin-slow">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Block: Sacred Om Icon + Name & Credentials */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-start gap-6">
            {/* Golden Om Emblem */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-900/40 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-lg backdrop-blur-md">
              <span className="heading-spiritual text-4xl sm:text-5xl text-amber-300 drop-shadow-md">
                🕉️
              </span>
            </div>

            <div className="space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  Vedic Karma-Kandi Guru
                </span>
                <span className="bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  Ujjain Mahakal Expert
                </span>
                {pandit.isVerified && (
                  <span className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Pandit Ji</span>
                  </span>
                )}
              </div>

              {/* Title & Name */}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-50 tracking-tight leading-tight">
                {pandit.name.split(' ')[0]}{' '}
                <span className="text-amber-400 font-serif italic">
                  {pandit.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-amber-200/90 font-medium max-w-xl">
                {pandit.title} • {pandit.location}
              </p>

              <p className="text-xs sm:text-sm text-amber-100/75 leading-relaxed max-w-xl">
                Bringing divine sanctity to your life with authentic Vedic mantras, personalized Sankalp, and effective dosh nivarana rituals in Ujjain.
              </p>

              {/* Bottom Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-amber-500/20 text-xs sm:text-sm text-amber-200/90">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <div>
                    <span className="font-bold text-amber-100 block text-xs sm:text-sm">{pandit.experienceYears}+ Years</span>
                    <span className="text-[10px] text-amber-300/80 uppercase tracking-wider block">Vedic Experience</span>
                  </div>
                </div>

                <div className="w-px h-8 bg-amber-500/30 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="font-bold text-amber-100 block text-xs sm:text-sm">{pandit.stats.happyDevotees}+</span>
                    <span className="text-[10px] text-amber-300/80 uppercase tracking-wider block">Happy Devotees</span>
                  </div>
                </div>

                <div className="w-px h-8 bg-amber-500/30 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="font-bold text-amber-100 block text-xs sm:text-sm">100% Certified</span>
                    <span className="text-[10px] text-amber-300/80 uppercase tracking-wider block">Gurukul Trained</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Hexagonal Golden Framed Pandit Portrait */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Outer Golden Hexagon Glow Effect */}
              <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 blur-md opacity-60 group-hover:opacity-100 transition duration-500" />
              
              {/* Hexagon / Octagon Framed Image Box */}
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-[36px] overflow-hidden border-4 border-amber-400 shadow-2xl bg-amber-950 shrink-0">
                <Image
                  src={pandit.image}
                  alt={pandit.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Side-by-Side Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN (7 Columns): Poojas Conducted -> FAQs Accordion */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top (Left): Poojas Conducted Accordion */}
            <div className="bg-white border border-[#eadfce] rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
              <div className="border-b border-[#eadfce] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[#8f3f12]">
                  संपन्न कराई जाने वाली पूजाएं (Poojas Conducted)
                </h2>
                <p className="text-xs text-[#75695d] mt-0.5">
                  पूजा के नाम पर क्लिक करके विधि एवं लाभ देखें।
                </p>
              </div>

              <div className="space-y-3">
                {poojas.map((pooja, index) => {
                  const isOpen = openPoojaIndex === index;
                  return (
                    <div
                      key={pooja.id}
                      className="border border-[#eadfce] rounded-xl overflow-hidden transition-all bg-[#fffaf2]/30"
                    >
                      <button
                        onClick={() => setOpenPoojaIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-sm sm:text-base text-[#8f3f12] hover:bg-[#fffaf2] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-[#c96b18]/10 text-[#c96b18] text-xs font-bold flex items-center justify-center shrink-0">
                            0{index + 1}
                          </span>
                          <div>
                            <span className="text-base font-bold text-[#8f3f12] block">
                              {pooja.name}
                            </span>
                            <span className="text-xs font-normal text-[#75695d] block">
                              {pooja.category} • अवधि: {pooja.duration}
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#c96b18] transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-4 border-t border-[#eadfce] bg-white space-y-4">
                          <p className="text-xs sm:text-sm text-[#2b2118] leading-relaxed">
                            {pooja.fullDescription}
                          </p>

                          <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase text-[#8f3f12]">
                              मुख्य लाभ (Key Benefits)
                            </h4>
                            {pooja.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-[#2b2118]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#c96b18] shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 flex items-center justify-between gap-4 border-t border-[#eadfce]/60">
                            <span className="text-xs font-bold text-[#8f3f12]">
                              शुल्क: ₹{pooja.startingPrice}
                            </span>

                            <button
                              onClick={() =>
                                openBookingModal({
                                  panditName: pandit.name,
                                  poojaName: pooja.name,
                                  startingPrice: pooja.startingPrice,
                                })
                              }
                              className="bg-saffron-gradient text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                            >
                              <span>बुक करें</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom (Left): Frequently Asked Questions (FAQ) Accordion */}
            <div className="bg-white border border-[#eadfce] rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
              <div className="border-b border-[#eadfce] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[#8f3f12] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#c96b18]" />
                  <span>पूजन प्रश्नोत्तर (FAQs)</span>
                </h2>
                <p className="text-xs text-[#75695d] mt-0.5">
                  पूजा संबंधित सामान्य प्रश्नों के उत्तर।
                </p>
              </div>

              <div className="space-y-3">
                {panditFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-[#eadfce] rounded-xl overflow-hidden transition-colors bg-[#fffaf2]/30"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-3.5 text-left font-bold text-sm text-[#8f3f12] hover:bg-[#fffaf2] transition-colors"
                      >
                        <span>Q: {faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#c96b18] transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-3.5 pt-0 text-xs sm:text-sm text-[#75695d] leading-relaxed border-t border-[#eadfce]/40 bg-white">
                          Ans: {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 Columns): Pricing -> Biography -> Stats */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pricing & Contact Action Card */}
            <div className="bg-white border border-[#eadfce] rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
              <div className="border-b border-[#eadfce] pb-3">
                <span className="text-xs font-bold text-[#75695d] uppercase block">
                  अनुष्ठान प्रारंभिक शुल्क
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8f3f12] mt-0.5">
                  ₹{pandit.startingPrice}
                </div>
                <p className="text-xs text-[#75695d] mt-0.5">
                  शास्त्रीय दक्षिणा एवं संपूर्ण सामग्री सहित
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() =>
                    openBookingModal({
                      panditName: pandit.name,
                      startingPrice: pandit.startingPrice,
                    })
                  }
                  className="w-full bg-saffron-gradient text-white text-sm font-bold py-3 rounded-xl shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>पंडित जी से फोन परामर्श लें</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>व्हाट्सएप पर मैसेज भेजें</span>
                </a>
              </div>

              <div className="space-y-1.5 pt-1 text-xs text-[#75695d]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c96b18]" />
                  <span>100% प्रामाणिक उज्जैन पूजन विधि</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c96b18]" />
                  <span>ऑनलाइन वीडियो संकल्प उपलब्ध</span>
                </div>
              </div>
            </div>

            {/* Biography Card BELOW Pricing Box */}
            <div className="bg-white border border-[#eadfce] rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#8f3f12]">
                  जीवनी एवं परिचय (Biography)
                </h2>
                <p className="text-sm text-[#2b2118] leading-relaxed">
                  {pandit.bio}
                </p>
              </div>

              {/* Specializations */}
              <div className="space-y-2 pt-3 border-t border-[#eadfce]">
                <h3 className="text-xs font-bold text-[#8f3f12] uppercase tracking-wider">
                  विशेषज्ञता (Specializations)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pandit.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#fffaf2] border border-[#eadfce] text-[#8f3f12] px-3 py-1 rounded-lg font-bold"
                    >
                      🔱 {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="pt-1 text-xs text-[#75695d]">
                <strong className="text-[#2b2118]">भाषाएं (Languages):</strong> {pandit.languages.join(', ')}
              </div>
            </div>

            {/* Stats Grid BELOW Biography Card */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-[#eadfce] rounded-xl p-3.5 text-center shadow-xs">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#8f3f12]">
                  {pandit.stats.poojasPerformed}+
                </h3>
                <p className="text-[10px] font-bold text-[#75695d]">Poojas</p>
              </div>
              <div className="bg-white border border-[#eadfce] rounded-xl p-3.5 text-center shadow-xs">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#8f3f12]">
                  {pandit.stats.happyDevotees}+
                </h3>
                <p className="text-[10px] font-bold text-[#75695d]">Devotees</p>
              </div>
              <div className="bg-white border border-[#eadfce] rounded-xl p-3.5 text-center shadow-xs">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#8f3f12]">
                  {pandit.stats.citiesServed}+
                </h3>
                <p className="text-[10px] font-bold text-[#75695d]">Cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <ContactSection initialPandit={pandit.name} />
      </div>
    </div>
  );
}
