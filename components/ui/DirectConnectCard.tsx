'use client';

import React from 'react';
import { Phone, MessageCircle, Clock, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface DirectConnectCardProps {
  title?: string;
  subtitle?: string;
}

export const DirectConnectCard: React.FC<DirectConnectCardProps> = ({
  title = 'Direct Pandit Ji Booking & Assistance',
  subtitle = 'No form filling required! Connect directly with Ujjain Acharya coordination team via WhatsApp or Direct Call.',
}) => {
  const whatsAppNumber = '919876543210';
  const phoneNumber = '+919876543210';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfce] shadow-spiritual space-y-6 text-center">
      <div className="w-14 h-14 rounded-full bg-saffron-gradient text-white mx-auto flex items-center justify-center shadow-md">
        <Sparkles className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h3 className="heading-spiritual text-2xl sm:text-3xl font-bold text-[#7a1f1f]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#75695d] max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Action Buttons: Direct WhatsApp & Direct Phone Call */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
        <a
          href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent('Pranam Pandit Ji, I want to book a ritual/assistance in Ujjain.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm py-3.5 px-5 rounded-2xl shadow-md hover:scale-105 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat on WhatsApp</span>
        </a>

        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center gap-2 bg-saffron-gradient hover:opacity-95 text-white font-bold text-sm py-3.5 px-5 rounded-2xl shadow-md hover:scale-105 transition-all"
        >
          <Phone className="w-5 h-5" />
          <span>Direct Call Now</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="pt-6 border-t border-[#eadfce] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#75695d]">
        <div className="flex items-center justify-center gap-1.5 bg-[#fffaf2] p-2.5 rounded-xl border border-[#eadfce]">
          <Clock className="w-4 h-4 text-[#c96b18]" />
          <span>24/7 Available</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 bg-[#fffaf2] p-2.5 rounded-xl border border-[#eadfce]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Vedic Vidhi</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 bg-[#fffaf2] p-2.5 rounded-xl border border-[#eadfce] col-span-2 sm:col-span-1">
          <MapPin className="w-4 h-4 text-[#7a1f1f]" />
          <span>Ujjain Temple Zone</span>
        </div>
      </div>
    </div>
  );
};
