import { API_BASE_URL } from './api';

interface RequestOptions extends RequestInit {
  data?: any;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  }

  private async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { data, headers: customHeaders, ...customOptions } = options;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(customHeaders as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...customOptions,
      headers,
    };

    if (data && !(data instanceof FormData)) {
      config.body = JSON.stringify(data);
    } else if (data instanceof FormData) {
      delete headers['Content-Type']; // Let browser set boundary
      config.body = data;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    let responseData;
    try {
      responseData = await response.json();
    } catch {
      responseData = { success: false, message: 'Server returned an invalid response' };
    }

    if (!response.ok) {
      if (response.status === 401 && typeof window !== 'undefined' && endpoint.startsWith('/admin')) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
      }
      throw new Error(responseData.message || 'API request failed');
    }

    return responseData;
  }

  public get<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', data });
  }

  public put<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', data });
  }

  public patch<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', data });
  }

  public delete<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  public async upload<T = any>(folder: string, file: File): Promise<T> {
    const formData = new FormData();
    formData.append('image', file);
    return this.post<T>(`/uploads/${folder}`, formData);
  }
}

export const apiClient = new ApiClient();
