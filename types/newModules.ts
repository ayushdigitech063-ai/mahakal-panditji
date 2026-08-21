export interface Room {
  id: string;
  name: string;
  image: string;
  pricePerNight: number;
  maxGuests: number;
  bedType: string;
  amenities: string[];
}

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  galleryImages: string[];
  location: string;
  description: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  propertyType?: 'Hotel' | 'Dharmashala';
  amenities: string[];
  featured: boolean;
  isActive: boolean;
  rooms: Room[];
}

export interface Tour {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  duration: string;
  destination: string;
  startingPrice: number;
  description: string;
  highlights: string[];
  placesCovered?: string[];
  itinerary?: Array<{ day: number; title: string; details: string }>;
  inclusions?: string[];
  exclusions?: string[];
  featured: boolean;
  isActive: boolean;
}

export interface TravelService {
  id: string;
  name: string;
  slug: string;
  image: string;
  vehicleType: string;
  capacity: number;
  startingPrice: number;
  features: string[];
  isActive: boolean;
}

export interface SpiritualPackage {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  duration: string;
  startingPrice: number;
  description: string;
  inclusions: string[];
  highlights?: string[];
  itinerary?: Array<{ day: number; title: string; details: string }>;
  featured?: boolean;
  isActive: boolean;
}
