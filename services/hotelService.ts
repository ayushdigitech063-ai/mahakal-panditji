import { Hotel } from '../types';
import { STATIC_HOTELS } from '../data/hotels';

export const hotelService = {
  async getHotels(): Promise<Hotel[]> {
    // API-ready architecture: Static fallback for now
    return Promise.resolve(STATIC_HOTELS.filter((h) => h.isActive));
  },

  async getHotelBySlug(slug: string): Promise<Hotel | null> {
    const found = STATIC_HOTELS.find((h) => h.slug === slug && h.isActive);
    return Promise.resolve(found || null);
  },
};
