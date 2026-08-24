import { apiClient } from '../lib/apiClient';
import { Hotel } from '../types';

export const hotelService = {
  async getHotels(): Promise<Hotel[]> {
    try {
      const res = await apiClient.get('/hotels');
      return res.success ? res.data : [];
    } catch {
      return [];
    }
  },

  async getHotelBySlug(slug: string): Promise<Hotel | null> {
    try {
      const res = await apiClient.get(`/hotels/${slug}`);
      return res.success ? res.data : null;
    } catch {
      return null;
    }
  },

  async getAdminHotels(): Promise<Hotel[]> {
    const res = await apiClient.get('/admin/hotels');
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async createHotel(data: Partial<Hotel>): Promise<Hotel> {
    const res = await apiClient.post('/admin/hotels', data);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async updateHotel(id: string, data: Partial<Hotel>): Promise<Hotel> {
    const res = await apiClient.put(`/admin/hotels/${id}`, data);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async toggleHotelStatus(id: string): Promise<Hotel> {
    const res = await apiClient.patch(`/admin/hotels/${id}/status`);
    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  async deleteHotel(id: string): Promise<void> {
    const res = await apiClient.delete(`/admin/hotels/${id}`);
    if (!res.success) throw new Error(res.message);
  },
};
