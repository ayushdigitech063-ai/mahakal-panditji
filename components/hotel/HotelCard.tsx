'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Building2, Home } from 'lucide-react';
import { Hotel } from '../../types';

interface HotelCardProps {
  hotel: Hotel;
  onEnquire?: (hotelName: string) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const isDharmashala = hotel.propertyType === 'Dharmashala';
  const whatsAppNumber = '919876543210';
  const whatsAppText = encodeURIComponent(
    `Pranam Pandit Ji, I am interested in booking accommodation at "${hotel.name}" (${hotel.location}, starting ₹${hotel.startingPrice}/night). Please share room availability and reservation details.`
  );

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group">
      {/* Hotel Cover Image & Badges */}
      <div className="relative h-36 sm:h-64 w-full overflow-hidden bg-amber-950/10">
        <Image
          src={hotel.coverImage}
          alt={hotel.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1">
          {isDharmashala ? (
            <span className="bg-[#7a1f1f] text-amber-200 text-[8px] sm:text-xs font-extrabold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md flex items-center gap-0.5 border border-amber-400/40">
              <Home className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              <span>Dharmashala</span>
            </span>
          ) : (
            <span className="bg-saffron-gradient text-white text-[8px] sm:text-xs font-extrabold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md flex items-center gap-0.5">
              <Building2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              <span>Hotel</span>
            </span>
          )}
        </div>

        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-md text-amber-300 text-[8px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-0.5">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span>{hotel.rating}</span>
        </div>

        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-[8px] sm:text-xs font-semibold">
          <span className="bg-black/50 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-xs flex items-center gap-0.5 truncate max-w-[80px] sm:max-w-[150px]">
            <MapPin className="w-2.5 h-2.5 text-amber-300 shrink-0" />
            <span className="truncate">Near Temple</span>
          </span>
          <span className="font-extrabold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-amber-500/40">
            ₹{hotel.startingPrice.toLocaleString('en-IN')} <span className="text-[7px] sm:text-[10px] font-normal text-amber-100">/nt</span>
          </span>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="p-2.5 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
        <div>
          <h3 className="heading-spiritual text-xs sm:text-xl font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors truncate">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-0.5 text-[9px] sm:text-xs text-[#75695d] mt-0.5 truncate">
            <MapPin className="w-2.5 h-2.5 text-[#c96b18] shrink-0" />
            <span className="truncate">{hotel.location}</span>
          </div>
          <p className="text-[9px] sm:text-xs text-[#75695d] mt-1 line-clamp-2 leading-snug sm:leading-relaxed">
            {hotel.description}
          </p>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {hotel.amenities.slice(0, 2).map((item, i) => (
              <span
                key={i}
                className="text-[8px] sm:text-[11px] font-medium bg-[#fffaf2] text-[#8f3f12] border border-[#eadfce] px-1.5 py-0.5 rounded-md truncate max-w-full"
              >
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Text Only Clean WhatsApp */}
        <div className="pt-2 sm:pt-4 border-t border-[#eadfce] grid grid-cols-2 gap-1.5 sm:gap-3">
          <Link
            href={`/hotels/${hotel.slug}`}
            className="text-center text-[10px] sm:text-xs font-bold py-1.5 sm:py-2.5 px-1 rounded-lg sm:rounded-xl border border-[#c96b18] text-[#c96b18] hover:bg-[#c96b18] hover:text-white transition-all flex items-center justify-center leading-none"
          >
            Details
          </Link>

          <a
            href={`https://wa.me/${whatsAppNumber}?text=${whatsAppText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[10px] sm:text-xs font-bold py-1.5 sm:py-2.5 px-1 rounded-lg sm:rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm transition-all flex items-center justify-center leading-none"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
