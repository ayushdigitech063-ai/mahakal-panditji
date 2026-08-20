import { Pooja } from '@/types/pooja';
import { SEEDED_POOJAS } from '@/data/poojas';
import { apiClient } from '@/lib/apiClient';
import { ENDPOINTS } from '@/lib/endpoints';

export async function getPoojas(): Promise<Pooja[]> {
  try {
    const data = await apiClient.get<Pooja[]>(ENDPOINTS.poojas);
    return data;
  } catch {
    return SEEDED_POOJAS;
  }
}

export async function getPoojaBySlug(slug: string): Promise<Pooja | undefined> {
  try {
    const data = await apiClient.get<Pooja>(`${ENDPOINTS.poojas}/${slug}`);
    return data;
  } catch {
    return SEEDED_POOJAS.find((p) => p.slug === slug);
  }
}
