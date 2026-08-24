import { apiClient } from '../lib/apiClient';
import { TravelService } from '../types';
import { TRAVEL_ROUTES } from '../data/travel';

export const travelService = {
  async getTravelServices(): Promise<TravelService[]> {
    try {
      const res = await apiClient.get('/travel');
      return res.success ? res.data : [];
    } catch {
      return [];
    }
  },

  async getTravelRoutes() {
    return Promise.resolve(TRAVEL_ROUTES);
  },

  async getAdminTravelServices(): Promise<TravelService[]> {
    const res = await apiClient.get('/admin/travel');
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async createTravelService(data: Partial<TravelService>): Promise<TravelService> {
    const res = await apiClient.post('/admin/travel', data);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async updateTravelService(id: string, data: Partial<TravelService>): Promise<TravelService> {
    const res = await apiClient.put(`/admin/travel/${id}`, data);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async toggleTravelServiceStatus(id: string): Promise<TravelService> {
    const res = await apiClient.patch(`/admin/travel/${id}/status`);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async deleteTravelService(id: string): Promise<void> {
    const res = await apiClient.delete(`/admin/travel/${id}`);
    if (!res.success) throw new Error(res.message);
  },
};
