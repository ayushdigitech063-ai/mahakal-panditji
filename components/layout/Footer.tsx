'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-spiritual-gradient text-amber-50/90 pt-16 pb-8 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-amber-900/50">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center text-white shadow-md">
                <Flame className="w-6 h-6 text-amber-200" />
              </div>
              <span className="heading-spiritual text-2xl font-bold tracking-tight text-amber-400">
                महाकाल पंडित
              </span>
            </div>
            <p className="text-sm text-amber-100/70 leading-relaxed">
              उज्जैन महाकालेश्वर धाम में काल सर्प दोष, रुद्राभिषेक, भात पूजा एवं सभी प्रकार के वैदिक अनुष्ठान कराने हेतु देश का सबसे विश्वसनीय एवं प्रामाणिक स्थान।
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300/80 pt-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% प्रामाणिक गुरुकुल शिक्षित पंडित जी</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="heading-spiritual text-lg font-bold text-amber-300 mb-4 tracking-wide">
              त्वरित लिंक (Quick Links)
            </h3>
            <ul className="space-y-2.5 text-sm text-amber-100/80">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  मुख्य पृष्ठ (Home)
                </Link>
              </li>
              <li>
                <Link href="/pandits" className="hover:text-amber-400 transition-colors">
                  पंडित जी खोजें (Our Pandits)
                </Link>
              </li>
              <li>
                <Link href="/pooja" className="hover:text-amber-400 transition-colors">
                  सिद्ध पूजन अनुष्ठान (Poojas)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  हमारे बारे में (About Us)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">
                  धार्मिक लेख व गाइड (Blog)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  संपर्क करें (Contact Us)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div>
            <h3 className="heading-spiritual text-lg font-bold text-amber-300 mb-4 tracking-wide">
              प्रमुख सिद्ध पूजाएं
            </h3>
            <ul className="space-y-2.5 text-sm text-amber-100/80">
              <li>
                <Link href="/pooja/mahakal-pooja" className="hover:text-amber-400 transition-colors">
                  उज्जैन महाकाल पूजा
                </Link>
              </li>
              <li>
                <Link href="/pooja/rudrabhishek" className="hover:text-amber-400 transition-colors">
                  वैदिक रुद्राभिषेक
                </Link>
              </li>
              <li>
                <Link href="/pooja/kaal-sarp-dosh-pooja" className="hover:text-amber-400 transition-colors">
                  काल सर्प दोष निवारण
                </Link>
              </li>
              <li>
                <Link href="/pooja/grah-shanti" className="hover:text-amber-400 transition-colors">
                  ग्रह शांति एवं वास्तु पूजा
                </Link>
              </li>
              <li>
                <Link href="/pooja/navgraha-shanti" className="hover:text-amber-400 transition-colors">
                  नवग्रह शांति अनुष्ठान
                </Link>
              </li>
              <li>
                <Link href="/pooja/maha-mrityunjaya-jaap" className="hover:text-amber-400 transition-colors">
                  महामृत्युंजय जाप
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h3 className="heading-spiritual text-lg font-bold text-amber-300 mb-4 tracking-wide">
              मंदिर व संपर्क सूत्र
            </h3>
            <ul className="space-y-3.5 text-sm text-amber-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>महाकालेश्वर मंदिर मार्ग, शिप्रा घाट के पास, उज्जैन, मध्य प्रदेश - 456001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@mahakalpandit.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-amber-200/60">
          <p>© 2026 महाकाल पंडित। सर्वाधिकार सुरक्षित।</p>
          <div className="flex items-center gap-1">
            <span>महाकाल भक्तों हेतु समर्पित</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>उज्जैन महाकालेश्वर धाम।</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
