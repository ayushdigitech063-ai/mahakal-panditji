'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ContactForm } from '../../components/forms/ContactForm';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

function ContactContent() {
  const searchParams = useSearchParams();
  const service = searchParams?.get('service') || '';
  const pandit = searchParams?.get('pandit') || '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Info Side */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-[#eadfce] shadow-spiritual space-y-6">
          <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
            Ujjain Office Address
          </h3>

          <div className="space-y-4 text-sm text-[#2b2118]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#c96b18] shrink-0 mt-0.5" />
              <span>Mahakal Marg, Near Shri Mahakaleshwar Temple, Ujjain, Madhya Pradesh 456001</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#c96b18] shrink-0" />
              <a href="tel:+919876543210" className="font-semibold text-[#8f3f12]">+91 98765 43210</a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#c96b18] shrink-0" />
              <a href="mailto:contact@mahakalpandit.com" className="font-semibold text-[#8f3f12]">contact@mahakalpandit.com</a>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#eadfce]">
              <Clock className="w-5 h-5 text-[#c96b18] shrink-0" />
              <span>Office Hours: 06:00 AM - 10:00 PM (Daily)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="lg:col-span-2">
        <ContactForm defaultService={service} defaultPandit={pandit} />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
            Ujjain Support & Priest Coordination
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Get In Touch With Mahakal Pandit Team
          </h1>
          <p className="text-sm text-[#75695d]">
            We are available 24/7 to assist you with ritual scheduling, lodging guidance in Ujjain, and priest consultations.
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <ContactContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
