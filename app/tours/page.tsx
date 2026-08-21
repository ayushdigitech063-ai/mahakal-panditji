'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { TourCard } from '../../components/tour/TourCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { NewModuleEnquiryModal } from '../../components/forms/NewModuleEnquiryModal';
import { tourService } from '../../services/tourService';
import { Tour } from '../../types';

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedTourName, setSelectedTourName] = useState('');

  useEffect(() => {
    async function fetchTours() {
      const data = await tourService.getTours();
      setTours(data);
      setLoading(false);
    }
    fetchTours();
  }, []);

  const handleOpenEnquiry = (tourName: string) => {
    setSelectedTourName(tourName);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18] bg-amber-100/60 border border-amber-200 px-3.5 py-1 rounded-full">
            Guided Spiritual Pilgrimage
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Explore Sacred Journeys
          </h1>
          <p className="text-sm text-[#75695d]">
            Discover Mahakal, Ujjain and nearby spiritual destinations with thoughtfully planned travel experiences.
          </p>
        </div>

        {/* Tour Cards Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : tours.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#eadfce]">
            <p className="text-base text-[#75695d]">No tours currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onEnquire={handleOpenEnquiry} />
            ))}
          </div>
        )}
      </main>

      {/* Tour Enquiry Modal */}
      <NewModuleEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title="Spiritual Tour Package Enquiry"
        moduleType="Tour"
        prefilledItemName={selectedTourName}
      />

      <Footer />
    </div>
  );
}
