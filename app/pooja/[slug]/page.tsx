'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, IndianRupee, CheckCircle, ArrowLeft, MessageCircle, Phone, HelpCircle, Tag, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { poojaService } from '../../../services/poojaService';
import { Pooja } from '../../../types';

export default function PoojaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [pooja, setPooja] = useState<Pooja | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const whatsAppNumber = '919876543210';
  const phoneNumber = '+919876543210';

  useEffect(() => {
    if (slug) {
      poojaService.getPoojaBySlug(slug).then((data) => {
        setPooja(data);
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

  if (!pooja) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffaf2]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <h1 className="heading-spiritual text-3xl font-bold text-[#7a1f1f]">Pooja Details Not Found</h1>
          <p className="text-sm text-[#75695d] mt-2 mb-6">The requested ritual is currently unavailable.</p>
          <Link href="/pooja" className="bg-saffron-gradient text-white px-6 py-2.5 rounded-full font-semibold">
            Back to All Poojas
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const defaultFaqs = [
    {
      question: `${pooja.name} पूजा करवाने का क्या मुहूर्त एवं प्रक्रिया है?`,
      answer: `उज्जैन में ${pooja.name} वैदिक रीति-रिवाज से पूर्ण संकल्प लेकर संपन्न कराई जाती है। आप सीधे व्हाट्सएप या फोन पर संपर्क करके शुभ मुहूर्त तय कर सकते हैं।`,
    },
    {
      question: 'क्या पूजा सामग्री हमें खुद लानी होगी?',
      answer: 'जी नहीं, पूजा की संपूर्ण प्रामाणिक सामग्री (समिधा, दूर्वा, बेलपत्र, दूध, पंचामृत आदि) पंडित जी द्वारा स्वयं व्यवस्थित की जाती है।',
    },
    {
      question: 'क्या हम ऑनलाइन (लाइव ई-पूजा) में भाग ले सकते हैं?',
      answer: 'जी हाँ, यदि आप उज्जैन आने में असमर्थ हैं, तो आपके नाम, गोत्र और संकल्प के साथ लाइव वीडियो कॉल पर पूजा संपन्न कराई जाती है।',
    },
  ];

  const defaultSEOKeywords = [
    pooja.name,
    `${pooja.name} Ujjain`,
    'Mahakaleshwar Puja Vidhi',
    'Ujjain Pandit Ji Contact',
    'Vedic Pooja Mahurat',
    'Bhasma Aarti & Rituals',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <Link href="/pooja" className="inline-flex items-center gap-2 text-xs font-bold text-[#c96b18] hover:text-[#8f3f12]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Pooja Ceremonies</span>
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-10 shadow-spiritual grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-amber-950/10">
            <Image src={pooja.image} alt={pooja.name} fill className="object-cover" />
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="bg-saffron-gradient text-white text-xs font-bold px-3 py-1 rounded-full w-fit inline-block">
              {pooja.category}
            </span>
            <h1 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f]">
              {pooja.name}
            </h1>
            <p className="text-sm text-[#75695d] leading-relaxed">
              {pooja.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#eadfce]">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#c96b18]" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#75695d] block">Ritual Duration</span>
                  <span className="text-sm font-bold text-[#2b2118]">{pooja.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-[#c96b18]" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#75695d] block">Dakshina / Price</span>
                  <span className="text-base font-extrabold text-[#7a1f1f]">₹{pooja.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Top Quick Direct WhatsApp / Call Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(`Pranam Pandit Ji, I want to book ${pooja.name} in Ujjain.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Book {pooja.name} on WhatsApp</span>
              </a>

              <a
                href={`tel:${phoneNumber}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#fffaf2] hover:bg-amber-100/50 text-[#7a1f1f] border border-[#c96b18] font-bold px-6 py-3.5 rounded-2xl transition-all text-sm"
              >
                <Phone className="w-4.5 h-4.5 text-[#c96b18]" />
                <span>Call +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Benefits */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-4">
              <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                Key Benefits & Divine Blessings
              </h3>
              <ul className="space-y-3">
                {pooja.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#2b2118]">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Procedure */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-4">
              <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                Sacred Procedure & Vidhi
              </h3>
              <ol className="space-y-3 list-decimal list-inside text-sm text-[#2b2118]">
                {pooja.procedure.map((p, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-semibold">{p}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* SEO FAQs Accordion Section */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-[#eadfce] pb-4">
                <HelpCircle className="w-6 h-6 text-[#c96b18]" />
                <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
                  {pooja.name} से जुड़े मुख्य प्रश्न (FAQs)
                </h3>
              </div>

              <div className="space-y-3">
                {defaultFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

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
                          <span>{faq.question}</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#c96b18] shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#75695d] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#75695d] border-t border-[#eadfce]/50 leading-relaxed bg-white/70">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEO Keywords & Sacred Tags Bar */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#eadfce] pb-3">
                <Tag className="w-5 h-5 text-[#c96b18]" />
                <h3 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">
                  {pooja.name} Search Tags & Keywords
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {defaultSEOKeywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-amber-50 text-[#8f3f12] border border-amber-200 px-3.5 py-1.5 rounded-full hover:bg-amber-100 transition-colors cursor-default"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp & Call Booking Card (No Contact Form) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfce] shadow-spiritual space-y-6 sticky top-28 text-center">
              <div className="w-12 h-12 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md mx-auto">
                <Sparkles className="w-7 h-7 text-white" />
              </div>

              <div className="space-y-2">
                <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                  Direct {pooja.name} Booking
                </h3>
                <p className="text-xs text-[#75695d] leading-relaxed">
                  No forms required! Chat directly with Ujjain Acharya team on WhatsApp or Call for instant date & mahurat confirmation.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(`Pranam Pandit Ji, I want to book ${pooja.name} in Ujjain.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 rounded-2xl shadow-md transition-all text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${phoneNumber}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#fffaf2] hover:bg-amber-100/60 text-[#7a1f1f] border border-[#c96b18] font-bold py-3.5 rounded-2xl transition-all text-sm"
                >
                  <Phone className="w-4.5 h-4.5 text-[#c96b18]" />
                  <span>Call +91 98765 43210</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#eadfce] space-y-2.5 text-xs text-[#75695d]">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% Vedic Vidhi & Pure Samagri</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Direct Guidance from Ujjain Priests</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Online / Live E-Pooja Available</span>
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
