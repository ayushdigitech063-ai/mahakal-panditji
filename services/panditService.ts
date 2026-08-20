import { Pandit } from '@/types/pandit';
import { SEEDED_PANDITS } from '@/data/pandits';
import { apiClient } from '@/lib/apiClient';
import { ENDPOINTS } from '@/lib/endpoints';

export async function getPandits(): Promise<Pandit[]> {
  try {
    const data = await apiClient.get<Pandit[]>(ENDPOINTS.pandits);
    return data;
  } catch {
    // Fallback to seeded data when backend API is unavailable
    return SEEDED_PANDITS;
  }
}

export async function getPanditBySlug(slug: string): Promise<Pandit | undefined> {
  try {
    const data = await apiClient.get<Pandit>(`${ENDPOINTS.pandits}/${slug}`);
    return data;
  } catch {
    return SEEDED_PANDITS.find((p) => p.slug === slug);
  }
}
