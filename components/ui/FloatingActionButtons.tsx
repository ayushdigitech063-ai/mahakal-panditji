'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingActionButtons() {
  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent(
    'जय श्री महाकाल 🙏 मुझे पंडित जी से पूजा एवं मुहूर्त परामर्श हेतु संपर्क करना है।'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 pointer-events-auto">
      {/* Phone Call Floating Button */}
      <a
        href="tel:+919876543210"
        aria-label="Call Support"
        className="w-13 h-13 rounded-full bg-saffron-gradient text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/60 group relative"
      >
        <Phone className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute right-16 bg-[#8f3f12] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          पंडित जी को कॉल करें
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Contact"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/60 group relative animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        <span className="absolute right-17 bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          WhatsApp पर मैसेज करें
        </span>
      </a>
    </div>
  );
}
