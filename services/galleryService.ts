import { apiClient } from '../lib/apiClient';
import { ENDPOINTS } from '../lib/endpoints';
import { ApiResponse } from '../types';

export interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
  isActive: boolean;
}

export const galleryService = {
  getPublicGallery: async (): Promise<GalleryItem[]> => {
    try {
      const res = await apiClient.get<ApiResponse<GalleryItem[]>>(ENDPOINTS.gallery);
      return res.data || [];
    } catch {
      return [];
    }
  },

  getAdminGallery: async (): Promise<GalleryItem[]> => {
    const res = await apiClient.get<ApiResponse<GalleryItem[]>>(ENDPOINTS.admin.gallery);
    return res.data || [];
  },

  createGalleryItem: async (data: Partial<GalleryItem>): Promise<GalleryItem> => {
    const res = await apiClient.post<ApiResponse<GalleryItem>>(ENDPOINTS.admin.gallery, data);
    return res.data;
  },

  deleteGalleryItem: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.admin.gallery}/${id}`);
  },
};
