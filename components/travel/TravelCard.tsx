'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Car, Check, ChevronRight } from 'lucide-react';
import { TravelService } from '../../types';

interface TravelCardProps {
  service: TravelService;
  onGetQuote?: (vehicleName: string) => void;
}

export const TravelCard: React.FC<TravelCardProps> = ({ service }) => {
  const whatsAppNumber = '919876543210';
  const whatsAppText = encodeURIComponent(
    `Pranam Pandit Ji, I want to book cab travel for "${service.name}" (${service.vehicleType}, ${service.capacity} Passengers, starting ₹${service.startingPrice}). Please share cab availability and tariff details.`
  );

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group">
      {/* Vehicle Image & Capacity Badge */}
      <div className="relative h-40 sm:h-56 w-full overflow-hidden bg-amber-950/10">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-md text-amber-300 text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 border border-amber-500/30">
          <Users className="w-3 h-3" />
          <span>{service.capacity} Pass</span>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-saffron-gradient text-white text-[9px] sm:text-xs font-extrabold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
          <Car className="w-3 h-3" />
          <span>{service.vehicleType}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
            <h3 className="heading-spiritual text-sm sm:text-xl font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors truncate">
              {service.name}
            </h3>
            <span className="text-xs sm:text-base font-extrabold text-[#7a1f1f]">
              ₹{service.startingPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Features List */}
          <div className="mt-2 space-y-1 border-t border-[#eadfce]/60 pt-2">
            {service.features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center gap-1 text-[9px] sm:text-xs text-[#75695d] font-medium truncate">
                <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button: Direct WhatsApp Inquiry */}
        <div className="pt-2 sm:pt-4 border-t border-[#eadfce]">
          <a
            href={`https://wa.me/${whatsAppNumber}?text=${whatsAppText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-1.5 sm:py-3 rounded-lg sm:rounded-xl shadow-md transition-all text-[10px] sm:text-xs truncate"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp Cab</span>
            <ChevronRight className="w-3 h-3 shrink-0 hidden sm:inline" />
          </a>
        </div>
      </div>
    </div>
  );
};
