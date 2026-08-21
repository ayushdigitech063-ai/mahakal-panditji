'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, CheckCircle2, ArrowLeft, Clock, ShieldCheck, PhoneCall, Building2, Wifi, ParkingCircle, Utensils } from 'lucide-react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { NewModuleEnquiryModal } from '../../../components/forms/NewModuleEnquiryModal';
import { hotelService } from '../../../services/hotelService';
import { Hotel } from '../../../types';

export default function HotelDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState('');

  useEffect(() => {
    if (slug) {
      hotelService.getHotelBySlug(slug).then((data) => {
        setHotel(data);
        if (data) {
          setSelectedImage(data.coverImage);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf2]">
        <Navbar />
        <div className="pt-32"><LoadingSpinner /></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffaf2]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <h1 className="heading-spiritual text-3xl font-bold text-[#7a1f1f]">Hotel Not Found</h1>
          <p className="text-sm text-[#75695d] mt-2 mb-6">The requested hotel property does not exist or has been removed.</p>
          <Link href="/hotels" className="bg-saffron-gradient text-white px-6 py-2.5 rounded-full font-semibold">
            Back to All Hotels
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <Link href="/hotels" className="inline-flex items-center gap-2 text-xs font-bold text-[#c96b18] hover:text-[#8f3f12]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotels List</span>
        </Link>

        {/* Gallery & Header Section */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-10 shadow-spiritual grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-amber-950/10 shadow-md">
              <Image
                src={selectedImage || hotel.coverImage}
                alt={hotel.name}
                fill
                priority
                className="object-cover transition-all duration-300"
              />
            </div>
            {hotel.galleryImages && hotel.galleryImages.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {hotel.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImage === img ? 'border-[#c96b18] scale-105' : 'border-[#eadfce] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="Gallery" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {hotel.featured && (
                <span className="bg-saffron-gradient text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-xs">
                  ⭐ Featured Property
                </span>
              )}
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-300">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                {hotel.rating} / 5.0 ({hotel.reviewCount} Devotee Reviews)
              </span>
            </div>

            <h1 className="heading-spiritual text-3xl sm:text-4xl font-extrabold text-[#7a1f1f]">
              {hotel.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#75695d]">
              <MapPin className="w-4.5 h-4.5 text-[#c96b18]" />
              <span className="font-medium">{hotel.location}</span>
            </div>

            <p className="text-sm text-[#2b2118] leading-relaxed font-light">
              {hotel.description}
            </p>

            {/* Quick Amenities */}
            <div className="pt-2 border-t border-[#eadfce]">
              <span className="text-xs font-bold text-[#7a1f1f] uppercase tracking-wider block mb-2">Key Hotel Amenities</span>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((item, idx) => (
                  <span key={idx} className="bg-[#fffaf2] text-[#8f3f12] border border-[#eadfce] text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Check-In / Policies */}
            <div className="grid grid-cols-2 gap-4 bg-[#fffaf2] p-4 rounded-2xl border border-[#eadfce] text-xs">
              <div>
                <span className="font-semibold text-[#75695d] block">Check-in Time</span>
                <span className="font-bold text-[#7a1f1f] text-sm">12:00 PM</span>
              </div>
              <div>
                <span className="font-semibold text-[#75695d] block">Check-out Time</span>
                <span className="font-bold text-[#7a1f1f] text-sm">11:00 AM</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedRoomName(hotel.name);
                setEnquiryModalOpen(true);
              }}
              className="w-full bg-saffron-gradient text-white font-bold py-4 rounded-2xl shadow-lg hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Enquire & Reserve Stay</span>
            </button>
          </div>
        </div>

        {/* Room Types & Pricing Grid */}
        <div className="space-y-6">
          <h2 className="heading-spiritual text-2xl font-bold text-[#7a1f1f] border-b border-[#eadfce] pb-3">
            Available Room Categories & Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotel.rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full bg-amber-950/10">
                    <Image src={room.image} alt={room.name} fill className="object-cover" />
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">{room.name}</h3>
                    <div className="flex items-center justify-between text-xs text-[#75695d]">
                      <span>Max Guests: <strong>{room.maxGuests} Person</strong></span>
                      <span>Bed: <strong>{room.bedType}</strong></span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {room.amenities.map((a, i) => (
                        <span key={i} className="text-[10px] bg-amber-50 text-[#8f3f12] border border-amber-200 px-2 py-0.5 rounded-md">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-[#eadfce] flex items-center justify-between bg-[#fffaf2]">
                  <div>
                    <span className="text-[10px] text-[#75695d] uppercase block">Price per night</span>
                    <span className="text-lg font-extrabold text-[#7a1f1f]">₹{room.pricePerNight.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRoomName(`${hotel.name} - ${room.name}`);
                      setEnquiryModalOpen(true);
                    }}
                    className="bg-[#c96b18] hover:bg-[#8f3f12] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs"
                  >
                    Enquire Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <NewModuleEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title="Hotel Room Reservation"
        moduleType="Hotel"
        prefilledItemName={selectedRoomName}
      />

      <Footer />
    </div>
  );
}
