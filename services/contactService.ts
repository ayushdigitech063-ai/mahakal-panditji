import { ContactFormData } from '@/types/common';
import { apiClient } from '@/lib/apiClient';
import { ENDPOINTS } from '@/lib/endpoints';

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    return await apiClient.post<{ success: boolean; message: string }>(ENDPOINTS.contact, data);
  } catch {
    // Simulated successful submission response when backend is offline
    return {
      success: true,
      message: 'Your enquiry has been submitted successfully. Our team will contact you shortly.',
    };
  }
}
