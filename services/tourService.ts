import { apiClient } from '../lib/apiClient';
import { Tour } from '../types';

export const tourService = {
  async getTours(): Promise<Tour[]> {
    try {
      const res = await apiClient.get('/tours');
      return res.success ? res.data : [];
    } catch {
      return [];
    }
  },

  async getTourBySlug(slug: string): Promise<Tour | null> {
    try {
      const res = await apiClient.get(`/tours/${slug}`);
      return res.success ? res.data : null;
    } catch {
      return null;
    }
  },

  async getAdminTours(): Promise<Tour[]> {
    const res = await apiClient.get('/admin/tours');
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async createTour(data: Partial<Tour>): Promise<Tour> {
    const res = await apiClient.post('/admin/tours', data);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async updateTour(id: string, data: Partial<Tour>): Promise<Tour> {
    const res = await apiClient.put(`/admin/tours/${id}`, data);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async toggleTourStatus(id: string): Promise<Tour> {
    const res = await apiClient.patch(`/admin/tours/${id}/status`);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async deleteTour(id: string): Promise<void> {
    const res = await apiClient.delete(`/admin/tours/${id}`);
    if (!res.success) throw new Error(res.message);
  },
};
