import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Heart, Users, Award, Sparkles, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Mahakal Pandit | Trusted Spiritual Services in Ujjain',
  description:
    'Learn about Mahakal Pandit mission to bridge devotees worldwide with certified Veda Pandits for authentic rituals at Mahakaleshwar Dham.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#fffaf2] min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Sacred Purpose"
          title="Preserving & Serving Authentic Vedic Traditions"
          subtitle="Connecting Mahakal devotees globally with certified Gurukul Pandits for authentic, scriptures-guided Hindu rituals in Ujjain."
        />

        {/* Hero Image & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative h-96 rounded-3xl overflow-hidden shadow-xl border border-[#eadfce]">
            <Image
              src="https://images.unsplash.com/photo-1609102026400-3d0817730704?auto=format&fit=crop&w=800&q=80"
              alt="Mahakal Temple Ujjain Sanctum"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#c96b18] bg-[#c96b18]/10 px-3 py-1 rounded-full inline-block">
              Our Journey
            </span>
            <h2 className="heading-spiritual text-3xl font-bold text-[#8f3f12]">
              Rooted in the Holy Sanctum of Avantika (Ujjain)
            </h2>
            <p className="text-sm text-[#75695d] leading-relaxed">
              Mahakal Pandit was established with a singular devotion: to eliminate chaos and lack of transparency when devotees seek authentic Pandits for sacred rituals in Ujjain.
            </p>
            <p className="text-sm text-[#75695d] leading-relaxed">
              Whether you are travelling to Mahakaleshwar Dham for Kaal Sarp Dosh Shanti or booking online Rudrabhishek from the comfort of your home, our platform guarantees Gurukul-verified Veda Pandits who strictly adhere to classical Shastras.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/pandits"
                className="bg-saffron-gradient text-white text-xs font-bold px-6 py-3 rounded-full shadow-spiritual hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Meet Our Pandits</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="pt-16">
          <SectionHeading
            eyebrow="Devotee Trust"
            title="Why Choose Mahakal Pandit?"
            subtitle="We uphold uncompromising standards of spiritual purity, transparency, and authentic Vedic recitation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-[#eadfce] rounded-3xl p-6 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#c96b18]/10 flex items-center justify-center text-[#c96b18]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="heading-spiritual text-xl font-bold text-[#8f3f12]">
                100% Certified Pandits
              </h3>
              <p className="text-xs text-[#75695d] leading-relaxed">
                Every Pandit Ji registered on our platform is verified for Gurukul education, Veda Parayan mastery, and years of experience.
              </p>
            </div>

            <div className="bg-white border border-[#eadfce] rounded-3xl p-6 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#c96b18]/10 flex items-center justify-center text-[#c96b18]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="heading-spiritual text-xl font-bold text-[#8f3f12]">
                Authentic Samagri
              </h3>
              <p className="text-xs text-[#75695d] leading-relaxed">
                We arrange pristine, pure ritual Samagri including organic Bhasma, pure Desi Ghee, Gangajal, and holy herbs.
              </p>
            </div>

            <div className="bg-white border border-[#eadfce] rounded-3xl p-6 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#c96b18]/10 flex items-center justify-center text-[#c96b18]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="heading-spiritual text-xl font-bold text-[#8f3f12]">
                Transparent Pricing
              </h3>
              <p className="text-xs text-[#75695d] leading-relaxed">
                No hidden costs or unexpected demands. Clear upfront Dakshina and Samagri package pricing for complete peace of mind.
              </p>
            </div>

            <div className="bg-white border border-[#eadfce] rounded-3xl p-6 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#c96b18]/10 flex items-center justify-center text-[#c96b18]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="heading-spiritual text-xl font-bold text-[#8f3f12]">
                Live Stream Option
              </h3>
              <p className="text-xs text-[#75695d] leading-relaxed">
                Unable to travel? Experience live HD video streaming of your Sankalp and Pooja with Prasad delivered to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
