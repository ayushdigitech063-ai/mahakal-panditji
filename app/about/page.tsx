'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        {/* About Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
            Sacred Heritage of Ujjain
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Connecting Devotees With Eternal Vedic Traditions
          </h1>
          <p className="text-base sm:text-lg text-[#75695d] max-w-3xl mx-auto leading-relaxed">
            Mahakal Pandit is Ujjain's premier priest booking platform dedicated to providing authentic, transparent, and devout spiritual services for pilgrims across the globe.
          </p>
        </section>

        {/* Mission & Story Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="heading-spiritual text-3xl font-bold text-[#7a1f1f]">
              Our Sacred Mission
            </h2>
            <p className="text-sm text-[#2b2118] leading-relaxed">
              For generations, Ujjain has been revered as Avanti Puri — the holy city of Lord Mahakaleshwar where cosmic time is calculated and planetary doshas are resolved. Our mission is to safeguard the scriptural sanctity of Karma Kanda rituals while offering seamless digital access for devotees.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c96b18]" />
                <span className="text-sm font-semibold text-[#2b2118]">Strict Verification of Priest Lineage & Degrees</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c96b18]" />
                <span className="text-sm font-semibold text-[#2b2118]">Transparent Fixed Dakshina without Middlemen</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c96b18]" />
                <span className="text-sm font-semibold text-[#2b2118]">Pure Samagri & Ritual Sanitation Assurance</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#eadfce] shadow-spiritual space-y-6">
            <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
              Why Choose Mahakal Pandit?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-2xl text-[#c96b18]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#2b2118]">Gold Medalist Scholars</h4>
                  <p className="text-xs text-[#75695d]">Our Pandits are educated at renowned Sanskrit Universities in Kashi & Ujjain.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-2xl text-[#c96b18]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#2b2118]">Guaranteed Vidhi Purity</h4>
                  <p className="text-xs text-[#75695d]">Every mantra chant and havan ahuti is conducted as prescribed in ancient Granthas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
