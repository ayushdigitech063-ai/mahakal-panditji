'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, IndianRupee, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { ContactForm } from '../../../components/forms/ContactForm';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { poojaService } from '../../../services/poojaService';
import { Pooja } from '../../../types';

export default function PoojaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [pooja, setPooja] = useState<Pooja | null>(null);
  const [loading, setLoading] = useState(true);

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
          </div>

          <div>
            <ContactForm defaultService={pooja.name} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
