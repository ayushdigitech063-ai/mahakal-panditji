'use client';

import React from 'react';
import { Search, MapPin, Star, Building, Home } from 'lucide-react';

interface HotelFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedLocation: string;
  onLocationChange: (val: string) => void;
  propertyType: string;
  onPropertyTypeChange: (val: string) => void;
  maxPrice: number;
  onPriceChange: (val: number) => void;
  minRating: number;
  onRatingChange: (val: number) => void;
}

export const HotelFilters: React.FC<HotelFiltersProps> = ({
  search,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  propertyType,
  onPropertyTypeChange,
  maxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm space-y-6">
      {/* Centered Property Type Toggle Buttons (Hotels vs Dharmashalas only) */}
      <div className="flex justify-center border-b border-[#eadfce] pb-4">
        <div className="flex items-center gap-2 bg-[#fffaf2] p-1.5 rounded-full border border-[#eadfce] shadow-xs">
          <button
            type="button"
            onClick={() => onPropertyTypeChange('Hotel')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              propertyType === 'Hotel'
                ? 'bg-saffron-gradient text-white shadow-md'
                : 'text-[#75695d] hover:text-[#7a1f1f]'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Hotels</span>
          </button>

          <button
            type="button"
            onClick={() => onPropertyTypeChange('Dharmashala')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              propertyType === 'Dharmashala'
                ? 'bg-saffron-gradient text-white shadow-md'
                : 'text-[#75695d] hover:text-[#7a1f1f]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Dharmashalas</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Search Input */}
        <div>
          <label className="block font-semibold text-[#75695d] mb-1">Search Name</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#75695d] absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Hotel or Dharmashala..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2] focus:outline-none focus:border-[#c96b18]"
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="block font-semibold text-[#75695d] mb-1">Location</label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-[#75695d] absolute left-3 top-3" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2] focus:outline-none focus:border-[#c96b18] appearance-none"
            >
              <option value="ALL">All Locations</option>
              <option value="Near Mahakaleshwar Temple, Ujjain">Near Mahakal Temple</option>
              <option value="Ujjain, Madhya Pradesh">Ujjain City</option>
            </select>
          </div>
        </div>

        {/* Max Price Range */}
        <div>
          <label className="block font-semibold text-[#75695d] mb-1">
            Max Price: <span className="text-[#8f3f12] font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
          </label>
          <input
            type="range"
            min={400}
            max={6000}
            step={200}
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full accent-[#c96b18] mt-2 cursor-pointer"
          />
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block font-semibold text-[#75695d] mb-1">Min Rating</label>
          <div className="relative">
            <Star className="w-3.5 h-3.5 text-[#75695d] absolute left-3 top-3" />
            <select
              value={minRating}
              onChange={(e) => onRatingChange(Number(e.target.value))}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2] focus:outline-none focus:border-[#c96b18] appearance-none"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={4.7}>4.7+ Stars</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
