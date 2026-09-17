import { apiClient } from '../lib/apiClient';
import { ENDPOINTS } from '../lib/endpoints';
import { Product, ApiResponse } from '../types';

export const productService = {
  getProducts: async (params?: { panditId?: string; category?: string }): Promise<Product[]> => {
    try {
      let query = '';
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.panditId) searchParams.append('panditId', params.panditId);
        if (params.category) searchParams.append('category', params.category);
        const qStr = searchParams.toString();
        if (qStr) query = `?${qStr}`;
      }
      const res = await apiClient.get<ApiResponse<Product[]>>(`${ENDPOINTS.products}${query}`);
      return res.data || [];
    } catch {
      return [];
    }
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    try {
      const res = await apiClient.get<ApiResponse<Product>>(`${ENDPOINTS.products}/${slug}`);
      return res.data || null;
    } catch {
      return null;
    }
  },

  // Admin
  getAdminProducts: async (): Promise<Product[]> => {
    const res = await apiClient.get<ApiResponse<Product[]>>(ENDPOINTS.admin.products);
    return res.data || [];
  },

  createProduct: async (data: Partial<Product>): Promise<Product> => {
    const res = await apiClient.post<ApiResponse<Product>>(ENDPOINTS.admin.products, data);
    return res.data;
  },

  updateProduct: async (id: string, data: Partial<Product>): Promise<Product> => {
    const res = await apiClient.put<ApiResponse<Product>>(`${ENDPOINTS.admin.products}/${id}`, data);
    return res.data;
  },

  toggleProductStatus: async (id: string): Promise<Product> => {
    const res = await apiClient.patch<ApiResponse<Product>>(`${ENDPOINTS.admin.products}/${id}/status`);
    return res.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.admin.products}/${id}`);
  },
};
