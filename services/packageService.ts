import { SpiritualPackage } from '../types';
import { STATIC_PACKAGES } from '../data/packages';

export const packageService = {
  async getPackages(): Promise<SpiritualPackage[]> {
    // API-ready architecture: Static fallback for now
    return Promise.resolve(STATIC_PACKAGES.filter((p) => p.isActive));
  },

  async getPackageBySlug(slug: string): Promise<SpiritualPackage | null> {
    const found = STATIC_PACKAGES.find((p) => p.slug === slug && p.isActive);
    return Promise.resolve(found || null);
  },
};
