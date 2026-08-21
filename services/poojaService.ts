import { apiClient } from '../lib/apiClient';
import { ENDPOINTS } from '../lib/endpoints';
import { Pooja, ApiResponse } from '../types';

export const poojaService = {
  getPoojas: async (): Promise<Pooja[]> => {
    try {
      const res = await apiClient.get<ApiResponse<Pooja[]>>(ENDPOINTS.poojas);
      return res.data || [];
    } catch {
      return [];
    }
  },

  getPoojaBySlug: async (slug: string): Promise<Pooja | null> => {
    try {
      const res = await apiClient.get<ApiResponse<Pooja>>(`${ENDPOINTS.poojas}/${slug}`);
      return res.data || null;
    } catch {
      return null;
    }
  },

  // Admin
  getAdminPoojas: async (): Promise<Pooja[]> => {
    const res = await apiClient.get<ApiResponse<Pooja[]>>(ENDPOINTS.admin.poojas);
    return res.data || [];
  },

  createPooja: async (data: Partial<Pooja>): Promise<Pooja> => {
    const res = await apiClient.post<ApiResponse<Pooja>>(ENDPOINTS.admin.poojas, data);
    return res.data;
  },

  updatePooja: async (id: string, data: Partial<Pooja>): Promise<Pooja> => {
    const res = await apiClient.put<ApiResponse<Pooja>>(`${ENDPOINTS.admin.poojas}/${id}`, data);
    return res.data;
  },

  togglePoojaStatus: async (id: string): Promise<Pooja> => {
    const res = await apiClient.patch<ApiResponse<Pooja>>(`${ENDPOINTS.admin.poojas}/${id}/status`);
    return res.data;
  },

  deletePooja: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.admin.poojas}/${id}`);
  },
};
