'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { PoojaCard } from '../../components/pooja/PoojaCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { poojaService } from '../../services/poojaService';
import { Pooja } from '../../types';

export default function PoojasPage() {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPoojas() {
      const data = await poojaService.getPoojas();
      setPoojas(data);
      setLoading(false);
    }
    fetchPoojas();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
            Sacred Ritual Catalog
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Mukhya Pooja & Anushthan Services
          </h1>
          <p className="text-sm text-[#75695d]">
            Perform authentic Mahakal Rudrabhishek, Kaal Sarp Dosh Shanti, Mangal Dosh Nivaran, and Navgraha Pujan in Ujjain.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poojas.map((pooja) => (
              <PoojaCard key={pooja._id} pooja={pooja} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
