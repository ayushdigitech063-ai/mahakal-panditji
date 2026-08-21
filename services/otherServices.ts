import { apiClient } from '../lib/apiClient';
import { ENDPOINTS } from '../lib/endpoints';
import { Review, Festival, HomepageSettings, SiteSettings, Enquiry, ApiResponse } from '../types';

export const reviewService = {
  getReviews: async (): Promise<Review[]> => {
    try {
      const res = await apiClient.get<ApiResponse<Review[]>>(ENDPOINTS.reviews);
      return res.data || [];
    } catch {
      return [];
    }
  },
  getAdminReviews: async (): Promise<Review[]> => {
    const res = await apiClient.get<ApiResponse<Review[]>>(ENDPOINTS.admin.reviews);
    return res.data || [];
  },
  updateReviewStatus: async (id: string, data: { isApproved?: boolean; isVisible?: boolean }): Promise<Review> => {
    const res = await apiClient.patch<ApiResponse<Review>>(`${ENDPOINTS.admin.reviews}/${id}/status`, data);
    return res.data;
  },
  deleteReview: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.admin.reviews}/${id}`);
  },
};

export const festivalService = {
  getFestivals: async (): Promise<Festival[]> => {
    try {
      const res = await apiClient.get<ApiResponse<Festival[]>>(ENDPOINTS.festivals);
      return res.data || [];
    } catch {
      return [];
    }
  },
  getAdminFestivals: async (): Promise<Festival[]> => {
    const res = await apiClient.get<ApiResponse<Festival[]>>(ENDPOINTS.admin.festivals);
    return res.data || [];
  },
  createFestival: async (data: Partial<Festival>): Promise<Festival> => {
    const res = await apiClient.post<ApiResponse<Festival>>(ENDPOINTS.admin.festivals, data);
    return res.data;
  },
  updateFestival: async (id: string, data: Partial<Festival>): Promise<Festival> => {
    const res = await apiClient.put<ApiResponse<Festival>>(`${ENDPOINTS.admin.festivals}/${id}`, data);
    return res.data;
  },
  deleteFestival: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.admin.festivals}/${id}`);
  },
};

export const homepageService = {
  getHomepage: async (): Promise<HomepageSettings | null> => {
    try {
      const res = await apiClient.get<ApiResponse<HomepageSettings>>(ENDPOINTS.homepage);
      return res.data || null;
    } catch {
      return null;
    }
  },
  updateHomepage: async (data: Partial<HomepageSettings>): Promise<HomepageSettings> => {
    const res = await apiClient.put<ApiResponse<HomepageSettings>>(ENDPOINTS.admin.homepage, data);
    return res.data;
  },
};

export const settingsService = {
  getSettings: async (): Promise<SiteSettings | null> => {
    try {
      const res = await apiClient.get<ApiResponse<SiteSettings>>(ENDPOINTS.settings);
      return res.data || null;
    } catch {
      return null;
    }
  },
  updateSettings: async (data: Partial<SiteSettings>): Promise<SiteSettings> => {
    const res = await apiClient.put<ApiResponse<SiteSettings>>(ENDPOINTS.admin.settings, data);
    return res.data;
  },
};

export const enquiryService = {
  submitEnquiry: async (data: { name: string; phone: string; email: string; service: string; message: string }): Promise<any> => {
    const res = await apiClient.post<ApiResponse>(ENDPOINTS.enquiries, data);
    return res;
  },
  getAdminEnquiries: async (): Promise<Enquiry[]> => {
    const res = await apiClient.get<ApiResponse<Enquiry[]>>(ENDPOINTS.admin.enquiries);
    return res.data || [];
  },
  updateEnquiryStatus: async (id: string, status: string): Promise<Enquiry> => {
    const res = await apiClient.patch<ApiResponse<Enquiry>>(`${ENDPOINTS.admin.enquiries}/${id}/status`, { status });
    return res.data;
  },
};
