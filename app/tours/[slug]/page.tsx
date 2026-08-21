'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, CheckCircle2, ArrowLeft, ShieldCheck, Compass, Send, CalendarDays, XCircle } from 'lucide-react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { NewModuleEnquiryModal } from '../../../components/forms/NewModuleEnquiryModal';
import { tourService } from '../../../services/tourService';
import { Tour } from '../../../types';

export default function TourDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      tourService.getTourBySlug(slug).then((data) => {
        setTour(data);
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

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffaf2]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <h1 className="heading-spiritual text-3xl font-bold text-[#7a1f1f]">Tour Package Not Found</h1>
          <p className="text-sm text-[#75695d] mt-2 mb-6">The requested spiritual tour package does not exist.</p>
          <Link href="/tours" className="bg-saffron-gradient text-white px-6 py-2.5 rounded-full font-semibold">
            Back to All Tour Packages
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <Link href="/tours" className="inline-flex items-center gap-2 text-xs font-bold text-[#c96b18] hover:text-[#8f3f12]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tours</span>
        </Link>

        {/* Tour Header Banner */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-10 shadow-spiritual grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-amber-950/10 shadow-md">
            <Image
              src={tour.coverImage}
              alt={tour.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              {tour.featured && (
                <span className="bg-saffron-gradient text-white text-xs font-extrabold px-3.5 py-1 rounded-full">
                  🚩 Popular Pilgrimage Yatra
                </span>
              )}
              <span className="bg-amber-100 text-[#8f3f12] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-300">
                <Clock className="w-4 h-4 text-[#c96b18]" />
                {tour.duration}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-300">
                <Compass className="w-4 h-4 text-emerald-600" />
                {tour.destination}
              </span>
            </div>

            <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
              {tour.name}
            </h1>

            <p className="text-sm sm:text-base text-[#2b2118] leading-relaxed font-light">
              {tour.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#eadfce]">
              <div>
                <span className="text-xs uppercase font-bold text-[#75695d] block">Starting Price</span>
                <span className="text-2xl font-extrabold text-[#7a1f1f]">₹{tour.startingPrice.toLocaleString('en-IN')} <span className="text-xs font-normal text-[#75695d]">/ person</span></span>
              </div>

              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full sm:w-auto bg-saffron-gradient text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enquire & Book Yatra</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights */}
            <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-4">
              <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f] border-b border-[#eadfce] pb-3">
                Tour Package Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-[#fffaf2] p-3 rounded-2xl border border-[#eadfce] text-xs font-semibold text-[#2b2118]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Itinerary Timeline */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#eadfce] p-8 shadow-sm space-y-6">
                <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f] border-b border-[#eadfce] pb-3">
                  Day-By-Day Itinerary (यात्रा कार्यक्रम)
                </h3>

                <div className="relative border-l-2 border-[#c96b18]/40 pl-6 ml-3 space-y-6">
                  {tour.itinerary.map((dayItem) => (
                    <div key={dayItem.day} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-saffron-gradient text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                        {dayItem.day}
                      </div>
                      <div className="bg-[#fffaf2] p-5 rounded-2xl border border-[#eadfce] space-y-2">
                        <span className="text-[10px] font-extrabold text-[#c96b18] uppercase tracking-wider block">
                          Day {dayItem.day}
                        </span>
                        <h4 className="font-bold text-sm text-[#7a1f1f]">{dayItem.title}</h4>
                        <p className="text-xs text-[#75695d] leading-relaxed">{dayItem.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tour.inclusions && (
                <div className="bg-white rounded-3xl border border-[#eadfce] p-6 shadow-sm space-y-3">
                  <h4 className="font-bold text-sm text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-[#eadfce] pb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>What's Included</span>
                  </h4>
                  <div className="space-y-2 pt-1 text-xs text-[#75695d]">
                    {tour.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tour.exclusions && (
                <div className="bg-white rounded-3xl border border-[#eadfce] p-6 shadow-sm space-y-3">
                  <h4 className="font-bold text-sm text-red-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-[#eadfce] pb-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>Exclusions</span>
                  </h4>
                  <div className="space-y-2 pt-1 text-xs text-[#75695d]">
                    {tour.exclusions.map((exc, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column Quick Contact Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfce] shadow-spiritual space-y-6 sticky top-28">
              <div className="w-12 h-12 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md mx-auto">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                  Book This Tour
                </h3>
                <p className="text-xs text-[#75695d] leading-relaxed">
                  Get customized itinerary, hotel choices, and private car options instantly from our Ujjain team.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full bg-saffron-gradient text-white font-bold py-4 rounded-2xl shadow-md hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Instant Enquiry</span>
              </button>

              <div className="pt-4 border-t border-[#eadfce] space-y-2 text-xs text-[#75695d]">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Customizable Itinerary</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Pure Vegetarian Satvik Food</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>24/7 Driver & Yatra Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewModuleEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title="Spiritual Tour Package Enquiry"
        moduleType="Tour"
        prefilledItemName={tour.name}
      />

      <Footer />
    </div>
  );
}
