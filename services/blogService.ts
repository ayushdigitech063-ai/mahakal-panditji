import { apiClient } from '../lib/apiClient';
import { ENDPOINTS } from '../lib/endpoints';
import { Blog, ApiResponse } from '../types';

export const blogService = {
  getBlogs: async (): Promise<Blog[]> => {
    try {
      const res = await apiClient.get<ApiResponse<Blog[]>>(ENDPOINTS.blogs);
      return res.data || [];
    } catch {
      return [];
    }
  },

  getBlogBySlug: async (slug: string): Promise<Blog | null> => {
    try {
      const res = await apiClient.get<ApiResponse<Blog>>(`${ENDPOINTS.blogs}/${slug}`);
      return res.data || null;
    } catch {
      return null;
    }
  },

  // Admin
  getAdminBlogs: async (): Promise<Blog[]> => {
    const res = await apiClient.get<ApiResponse<Blog[]>>(ENDPOINTS.admin.blogs);
    return res.data || [];
  },

  createBlog: async (data: Partial<Blog>): Promise<Blog> => {
    const res = await apiClient.post<ApiResponse<Blog>>(ENDPOINTS.admin.blogs, data);
    return res.data;
  },

  updateBlog: async (id: string, data: Partial<Blog>): Promise<Blog> => {
    const res = await apiClient.put<ApiResponse<Blog>>(`${ENDPOINTS.admin.blogs}/${id}`, data);
    return res.data;
  },

  toggleBlogStatus: async (id: string, status: string): Promise<Blog> => {
    const res = await apiClient.patch<ApiResponse<Blog>>(`${ENDPOINTS.admin.blogs}/${id}/status`, { status });
    return res.data;
  },

  deleteBlog: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.admin.blogs}/${id}`);
  },
};
