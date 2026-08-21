'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { PanditCard } from '../../components/pandit/PanditCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { panditService } from '../../services/panditService';
import { Pandit } from '../../types';

export default function PanditsPage() {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchPandits() {
      const data = await panditService.getPandits();
      setPandits(data);
      setLoading(false);
    }
    fetchPandits();
  }, []);

  const filteredPandits = pandits.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
            Ujjain Priests Directory
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Find Experienced Pandit Ji in Ujjain
          </h1>
          <p className="text-sm text-[#75695d]">
            Choose from verified Vedic Pandits for Mahakal Rudrabhishek, Kaal Sarp Dosh Pooja, and all sacred Anushthans.
          </p>

          {/* Search Filter */}
          <div className="pt-4 max-w-md mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location, or specialization..."
              className="w-full px-5 py-3 rounded-full border border-[#eadfce] bg-white shadow-sm focus:outline-none focus:border-[#c96b18] text-sm text-[#2b2118]"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filteredPandits.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#eadfce]">
            <p className="text-base text-[#75695d]">No Pandits found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPandits.map((pandit) => (
              <PanditCard key={pandit._id} pandit={pandit} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
