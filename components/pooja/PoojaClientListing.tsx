'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import PoojaCard from '@/components/pooja/PoojaCard';
import { Pooja } from '@/types/pooja';

interface PoojaClientListingProps {
  initialPoojas: Pooja[];
}

export default function PoojaClientListing({ initialPoojas }: PoojaClientListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(initialPoojas.map((p) => p.category)));

  const filteredPoojas = initialPoojas.filter((pooja) => {
    const matchesSearch =
      pooja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pooja.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? pooja.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-[#fffaf2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="सिद्ध वैदिक अनुष्ठान"
          title="उज्जैन महाकाल सिद्ध पूजन सेवाएं"
          subtitle="महाकालेश्वर ज्योतिर्लिंग, शिप्रा तट एवं मंगलनाथ धाम में सिद्ध पंडितों द्वारा कराई जाने वाली समस्त पूजाएं।"
        />

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#75695d] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="पूजा का नाम या लाभ खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-[#75695d] absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
            >
              <option value="">सभी पूजा श्रेणियां</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredPoojas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPoojas.map((pooja) => (
              <PoojaCard key={pooja.id} pooja={pooja} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#eadfce] rounded-3xl p-12 text-center my-10 max-w-md mx-auto">
            <p className="heading-spiritual text-2xl font-bold text-[#8f3f12] mb-2">
              कोई पूजा नहीं मिली
            </p>
            <p className="text-sm text-[#75695d] mb-6">
              कृपया दूसरा शब्द लिखकर खोजें या फ़िल्टर रीसेट करें।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="bg-saffron-gradient text-white text-xs font-bold px-6 py-3 rounded-full shadow-md"
            >
              फ़िल्टर रीसेट करें
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
