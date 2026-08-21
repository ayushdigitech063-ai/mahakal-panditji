import { TravelService } from '../types';

export const STATIC_TRAVEL_SERVICES: TravelService[] = [
  {
    id: 'travel-001',
    name: 'Sedan Cab (Dzire / Etios)',
    slug: 'sedan-cab',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    vehicleType: 'Sedan',
    capacity: 4,
    startingPrice: 1499,
    features: ['AC', 'Professional Driver', 'Comfortable Seating', 'Luggage Carrier', 'Clean & Sanitized'],
    isActive: true,
  },
  {
    id: 'travel-002',
    name: 'SUV Cab (Ertiga / Triber)',
    slug: 'suv-cab',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    vehicleType: 'SUV',
    capacity: 6,
    startingPrice: 2199,
    features: ['AC', 'Professional Driver', 'Spacious Interior', 'Extra Luggage Space', 'Music System'],
    isActive: true,
  },
  {
    id: 'travel-003',
    name: 'Toyota Innova Crysta',
    slug: 'toyota-innova-crysta',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    vehicleType: 'Premium SUV',
    capacity: 7,
    startingPrice: 2799,
    features: ['AC Dual Blower', 'Experienced Driver', 'Comfortable for Families', 'Pushback Seats', 'Highway Toll Assist'],
    isActive: true,
  },
  {
    id: 'travel-004',
    name: 'Tempo Traveller (12 Seater)',
    slug: 'tempo-traveller-12',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    vehicleType: 'Mini Bus',
    capacity: 12,
    startingPrice: 4999,
    features: ['AC', 'Large Group Travel', 'Professional Driver', 'Reclining Seats', 'Ample Luggage Boot'],
    isActive: true,
  },
];

export const TRAVEL_ROUTES = [
  { name: 'Ujjain Railway Station Pickup', price: '₹399', desc: 'Direct station to Mahakal temple / hotel drop' },
  { name: 'Indore Airport (IDR) to Ujjain Transfer', price: '₹1,499', desc: '55 km smooth highway cab transfer' },
  { name: 'Ujjain Local Sightseeing (8 Hours / 80 Km)', price: '₹1,799', desc: 'Cover all major Ujjain temples in a day' },
  { name: 'Ujjain to Omkareshwar Same Day Return', price: '₹2,999', desc: '135 km roundtrip with waiting time included' },
  { name: 'Ujjain to Maheshwar & Mandu Excursion', price: '₹3,499', desc: 'Full day historical & spiritual road trip' },
];
