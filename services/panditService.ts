import { apiClient } from '../lib/apiClient';
import { ENDPOINTS } from '../lib/endpoints';
import { Pandit, ApiResponse } from '../types';

export const panditService = {
  getPandits: async (): Promise<Pandit[]> => {
    try {
      const res = await apiClient.get<ApiResponse<Pandit[]>>(ENDPOINTS.pandits);
      return res.data || [];
    } catch {
      return [];
    }
  },

  getPanditBySlug: async (slug: string): Promise<Pandit | null> => {
    try {
      const res = await apiClient.get<ApiResponse<Pandit>>(`${ENDPOINTS.pandits}/${slug}`);
      return res.data || null;
    } catch {
      return null;
    }
  },

  // Admin Methods
  getAdminPandits: async (query: string = ''): Promise<Pandit[]> => {
    const res = await apiClient.get<ApiResponse<Pandit[]>>(`${ENDPOINTS.admin.pandits}${query}`);
    return res.data || [];
  },

  createPandit: async (data: Partial<Pandit>): Promise<Pandit> => {
    const res = await apiClient.post<ApiResponse<Pandit>>(ENDPOINTS.admin.pandits, data);
    return res.data;
  },

  updatePandit: async (id: string, data: Partial<Pandit>): Promise<Pandit> => {
    const res = await apiClient.put<ApiResponse<Pandit>>(`${ENDPOINTS.admin.pandits}/${id}`, data);
    return res.data;
  },

  togglePanditStatus: async (id: string): Promise<Pandit> => {
    const res = await apiClient.patch<ApiResponse<Pandit>>(`${ENDPOINTS.admin.pandits}/${id}/status`);
    return res.data;
  },

  deletePandit: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.admin.pandits}/${id}`);
  },
};
