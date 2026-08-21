'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { HotelCard } from '../../components/hotel/HotelCard';
import { HotelFilters } from '../../components/hotel/HotelFilters';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { NewModuleEnquiryModal } from '../../components/forms/NewModuleEnquiryModal';
import { hotelService } from '../../services/hotelService';
import { Hotel } from '../../types';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [propertyType, setPropertyType] = useState('Hotel');
  const [maxPrice, setMaxPrice] = useState(6000);
  const [minRating, setMinRating] = useState(0);

  // Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedHotelName, setSelectedHotelName] = useState('');

  useEffect(() => {
    async function fetchHotels() {
      const data = await hotelService.getHotels();
      setHotels(data);
      setLoading(false);
    }
    fetchHotels();
  }, []);

  const handleOpenEnquiry = (hotelName: string) => {
    setSelectedHotelName(hotelName);
    setEnquiryModalOpen(true);
  };

  const filteredHotels = hotels.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.description.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = selectedLocation === 'ALL' || h.location.includes(selectedLocation) || selectedLocation.includes(h.location);
    const matchesType = propertyType === 'ALL' || h.propertyType === propertyType;
    const matchesPrice = h.startingPrice <= maxPrice;
    const matchesRating = h.rating >= minRating;

    return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18] bg-amber-100/60 border border-amber-200 px-3.5 py-1 rounded-full">
            Hotels & Dharmashalas Near Mahakal
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Stay Near Mahakal
          </h1>
          <p className="text-sm text-[#75695d]">
            Comfortable hotels and affordable pilgrim dharmashalas close to Mahakaleshwar Temple and Ram Ghat in Ujjain.
          </p>
        </div>

        {/* Frontend Filters */}
        <HotelFilters
          search={search}
          onSearchChange={setSearch}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          propertyType={propertyType}
          onPropertyTypeChange={setPropertyType}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          minRating={minRating}
          onRatingChange={setMinRating}
        />

        {/* Hotel Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#eadfce]">
            <p className="text-base text-[#75695d]">No stays found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} onEnquire={handleOpenEnquiry} />
            ))}
          </div>
        )}
      </main>

      {/* Booking Enquiry Modal */}
      <NewModuleEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title="Stay Reservation Enquiry"
        moduleType="Hotel"
        prefilledItemName={selectedHotelName}
      />

      <Footer />
    </div>
  );
}
