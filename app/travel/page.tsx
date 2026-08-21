'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { TravelCard } from '../../components/travel/TravelCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { NewModuleEnquiryModal } from '../../components/forms/NewModuleEnquiryModal';
import { travelService } from '../../services/travelService';
import { TravelService as ITravelService } from '../../types';
import { Car, MapPin, ChevronRight } from 'lucide-react';

export default function TravelPage() {
  const [vehicles, setVehicles] = useState<ITravelService[]>([]);
  const [routes, setRoutes] = useState<Array<{ name: string; price: string; desc: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedVehicleName, setSelectedVehicleName] = useState('');

  const whatsAppNumber = '919876543210';

  useEffect(() => {
    async function fetchData() {
      const [vData, rData] = await Promise.all([
        travelService.getTravelServices(),
        travelService.getTravelRoutes(),
      ]);
      setVehicles(vData);
      setRoutes(rData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleOpenEnquiry = (vehicleName: string) => {
    setSelectedVehicleName(vehicleName);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18] bg-amber-100/60 border border-amber-200 px-3.5 py-1 rounded-full">
            Ujjain Cab & Taxi Seva
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Travel With Comfort
          </h1>
          <p className="text-sm text-[#75695d]">
            Reliable transportation for your Ujjain spiritual journey.
          </p>
        </div>

        {/* Section 1: Fleet Categories Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[#eadfce] pb-3">
            <Car className="w-5 h-5 text-[#c96b18]" />
            <h2 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
              Our Vehicle Fleet
            </h2>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {vehicles.map((v) => (
                <TravelCard key={v.id} service={v} onGetQuote={handleOpenEnquiry} />
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Popular Travel Routes & Airport Pickups */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[#eadfce] pb-3">
            <MapPin className="w-5 h-5 text-[#c96b18]" />
            <h2 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
              Popular Pickup & Transfer Routes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routes.map((route, i) => {
              const whatsAppRouteText = encodeURIComponent(
                `Pranam Pandit Ji, I want to book a cab for the route "${route.name}" (${route.desc}, Price: ${route.price}). Please confirm availability and driver pickup details.`
              );

              return (
                <div key={i} className="bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#c96b18] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block">
                      Fixed Price Route
                    </span>
                    <h3 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">{route.name}</h3>
                    <p className="text-xs text-[#75695d]">{route.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-[#eadfce] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#75695d] block uppercase">Starts from</span>
                      <span className="text-lg font-extrabold text-[#7a1f1f]">{route.price}</span>
                    </div>

                    <a
                      href={`https://wa.me/${whatsAppNumber}?text=${whatsAppRouteText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1 shrink-0"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Book Cab</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Why Choose Our Travel Services */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-8 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-[#c96b18] mx-auto flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-sm text-[#7a1f1f]">Verified Drivers</h4>
            <p className="text-xs text-[#75695d]">Experienced local drivers knowledgeable about Ujjain temple timings and shortcuts.</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-[#c96b18] mx-auto flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-sm text-[#7a1f1f]">Fixed & Transparent Pricing</h4>
            <p className="text-xs text-[#75695d]">No hidden toll or night surge charges. Clean upfront pricing.</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-[#c96b18] mx-auto flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-sm text-[#7a1f1f]">Punctual Pickup</h4>
            <p className="text-xs text-[#75695d]">Guaranteed on-time pickup for early morning 3:00 AM Bhasma Aarti transfers.</p>
          </div>
        </div>
      </main>

      {/* Travel Quote Enquiry Modal */}
      <NewModuleEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title="Transport Cab Enquiry"
        moduleType="Travel"
        prefilledItemName={selectedVehicleName}
      />

      <Footer />
    </div>
  );
}
