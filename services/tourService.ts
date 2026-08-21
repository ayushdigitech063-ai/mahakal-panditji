import { Tour } from '../types';
import { STATIC_TOURS } from '../data/tours';

export const tourService = {
  async getTours(): Promise<Tour[]> {
    // API-ready architecture: Static fallback for now
    return Promise.resolve(STATIC_TOURS.filter((t) => t.isActive));
  },

  async getTourBySlug(slug: string): Promise<Tour | null> {
    const found = STATIC_TOURS.find((t) => t.slug === slug && t.isActive);
    return Promise.resolve(found || null);
  },
};
