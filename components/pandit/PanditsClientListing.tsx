'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import PanditCard from '@/components/pandit/PanditCard';
import { Pandit } from '@/types/pandit';

interface PanditsClientListingProps {
  initialPandits: Pandit[];
}

export default function PanditsClientListing({ initialPandits }: PanditsClientListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const languages = Array.from(
    new Set(initialPandits.flatMap((p) => p.languages))
  );
  const specializations = Array.from(
    new Set(initialPandits.flatMap((p) => p.specializations))
  );

  const filteredPandits = initialPandits.filter((pandit) => {
    const matchesSearch =
      pandit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pandit.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pandit.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLang = selectedLanguage ? pandit.languages.includes(selectedLanguage) : true;
    const matchesSpec = selectedSpecialization
      ? pandit.specializations.includes(selectedSpecialization)
      : true;

    return matchesSearch && matchesLang && matchesSpec;
  });

  return (
    <div className="py-12 bg-[#fffaf2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certified Veda Scholars"
          title="Find Your Verified Pandit Ji"
          subtitle="Browse experienced Veda Pandits for authentic rituals, Mahakal Pooja, and astrological dosh nivaran in Ujjain."
        />

        {/* Filter Controls Bar */}
        <div className="bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#75695d] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, location, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
            />
          </div>

          {/* Language Filter */}
          <div className="relative">
            <Filter className="w-4 h-4 text-[#75695d] absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Specialization Filter */}
          <div className="relative">
            <Filter className="w-4 h-4 text-[#75695d] absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
            >
              <option value="">All Specializations</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredPandits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPandits.map((pandit) => (
              <PanditCard key={pandit.id} pandit={pandit} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#eadfce] rounded-3xl p-12 text-center my-10 max-w-md mx-auto">
            <p className="heading-spiritual text-2xl font-bold text-[#8f3f12] mb-2">
              No Pandits Found
            </p>
            <p className="text-sm text-[#75695d] mb-6">
              Try adjusting your search criteria or resetting filters to find available Pandits.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('');
                setSelectedSpecialization('');
              }}
              className="bg-saffron-gradient text-white text-xs font-bold px-6 py-3 rounded-full shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
