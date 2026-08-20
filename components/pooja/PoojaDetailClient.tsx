'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, CheckCircle2, ShieldCheck, Sparkles, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { Pooja } from '@/types/pooja';
import ContactSection from '@/components/forms/ContactSection';

interface PoojaDetailClientProps {
  pooja: Pooja;
}

export default function PoojaDetailClient({ pooja }: PoojaDetailClientProps) {
  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent(
    `जय श्री महाकाल 🙏 मुझे ${pooja.name} की बुकिंग एवं मुहूर्त परामर्श हेतु संपर्क करना है।`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-[#fffaf2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Detail Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-spiritual-gradient text-white min-h-[350px] flex items-end p-8 md:p-12 shadow-xl">
          <Image
            src={pooja.image}
            alt={pooja.name}
            fill
            className="object-cover mix-blend-overlay opacity-50"
            priority
          />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
              {pooja.category}
            </span>

            <h1 className="heading-spiritual text-3xl sm:text-5xl font-bold text-amber-50 leading-tight">
              {pooja.name}
            </h1>

            <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed font-light">
              {pooja.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-amber-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                समय अवधि: {pooja.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                {pooja.samagriIncluded ? 'संपूर्ण प्रामाणिक सामग्री शामिल' : 'विशेष व्यवस्था'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white border border-[#eadfce] rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h2 className="heading-spiritual text-2xl font-bold text-[#8f3f12]">
                {pooja.name} के बारे में
              </h2>
              <p className="text-sm text-[#2b2118] leading-relaxed font-normal">
                {pooja.fullDescription}
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-white border border-[#eadfce] rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h2 className="heading-spiritual text-2xl font-bold text-[#8f3f12]">
                धार्मिक एवं आध्यात्मिक लाभ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pooja.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-[#fffaf2] border border-[#eadfce]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#c96b18] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#2b2118] font-medium leading-normal">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure */}
            <div className="bg-white border border-[#eadfce] rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h2 className="heading-spiritual text-2xl font-bold text-[#8f3f12]">
                वैदिक विधि एवं पूजन प्रक्रिया
              </h2>
              <ol className="space-y-3">
                {pooja.procedure?.map((step: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#2b2118]">
                    <span className="w-6 h-6 rounded-full bg-[#c96b18] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQs */}
            {pooja.faqs && pooja.faqs.length > 0 && (
              <div className="bg-white border border-[#eadfce] rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
                <h2 className="heading-spiritual text-2xl font-bold text-[#8f3f12] flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-[#c96b18]" />
                  <span>अक्सर पूछे जाने वाले प्रश्न (FAQs)</span>
                </h2>
                <div className="space-y-4">
                  {pooja.faqs.map((faq, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-[#fffaf2] border border-[#eadfce]">
                      <h4 className="text-sm font-bold text-[#8f3f12] mb-1">
                        प्रश्न: {faq.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#75695d]">उत्तर: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Direct WhatsApp & Call Action Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white border border-[#eadfce] rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
              <div className="border-b border-[#eadfce] pb-4">
                <span className="text-xs uppercase font-bold text-[#75695d]">अनुष्ठान प्रारंभिक शुल्क</span>
                <div className="heading-spiritual text-4xl font-bold text-[#8f3f12] mt-1">
                  ₹{pooja.startingPrice}
                </div>
                <p className="text-xs text-[#75695d] mt-1">शास्त्रीय दक्षिणा एवं संपूर्ण सामग्री सहित</p>
              </div>

              <div className="space-y-3 text-xs text-[#2b2118]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c96b18]" />
                  <span>गुरुकुल प्रशिक्षित सिद्ध वेद पंडित</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c96b18]" />
                  <span>उज्जैन में प्रत्यक्ष अथवा लाइव वीडियो संकल्प</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c96b18]" />
                  <span>व्यक्तिगत वीडियो एवं प्रसाद कूरियर सेवा</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp पर अभी बुक करें</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="w-full border border-[#eadfce] hover:border-[#c96b18] text-[#8f3f12] font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs bg-[#fffaf2]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c96b18]" />
                  <span>पंडित जी से फोन पर बात करें</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactSection initialService={pooja.name} />
      </div>
    </div>
  );
}
