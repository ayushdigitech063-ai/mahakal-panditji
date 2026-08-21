'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Phone, User, Mail, MessageSquare, BookOpen } from 'lucide-react';
import { enquiryService } from '../../services/otherServices';
import { showAlert } from '../../lib/swal';

const phoneRegex = /^[6-9]\d{9}$/;

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number (e.g. 9876543210)'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(2, 'Please select a service'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  defaultService?: string;
  defaultPandit?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService = '', defaultPandit = '' }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: defaultService || (defaultPandit ? `Consultation with ${defaultPandit}` : 'Mahakal Rudrabhishek'),
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await enquiryService.submitEnquiry(data);
      if (res.success) {
        await showAlert.success(
          'Enquiry Submitted!',
          'Thank you! Pandit Ji coordination team will contact you shortly.'
        );
        reset();
      } else {
        await showAlert.error('Submission Failed', res.message || 'Please try again later.');
      }
    } catch (err: any) {
      await showAlert.error('Error', err.message || 'Something went wrong while submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfce] shadow-spiritual space-y-5">
      <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f] border-b border-[#eadfce] pb-3">
        Book Pooja or Request Consultation
      </h3>

      {/* Name */}
      <div>
        <label className="block text-xs font-semibold uppercase text-[#75695d] mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="w-5 h-5 text-[#c96b18] absolute left-3.5 top-3" />
          <input
            type="text"
            {...register('name')}
            placeholder="e.g. Rameshwar Vyas"
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] text-sm bg-[#fffaf2]"
          />
        </div>
        {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name.message}</p>}
      </div>

      {/* Grid Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-[#75695d] mb-1">
            10-Digit Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-[#c96b18] absolute left-3.5 top-3" />
            <input
              type="text"
              {...register('phone')}
              placeholder="e.g. 9876543210"
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] text-sm bg-[#fffaf2]"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-[#75695d] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-[#c96b18] absolute left-3.5 top-3" />
            <input
              type="email"
              {...register('email')}
              placeholder="e.g. ramesh@example.com"
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] text-sm bg-[#fffaf2]"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email.message}</p>}
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase text-[#75695d] mb-1">
          Select Service / Ritual <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <BookOpen className="w-5 h-5 text-[#c96b18] absolute left-3.5 top-3" />
          <select
            {...register('service')}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] text-sm bg-[#fffaf2]"
          >
            <option value="Mahakal Rudrabhishek">Mahakal Rudrabhishek</option>
            <option value="Kaal Sarp Dosh Pooja">Kaal Sarp Dosh Pooja</option>
            <option value="Mangal Dosh Shanti">Mangal Dosh Shanti</option>
            <option value="Maha Mrityunjaya Jaap">Maha Mrityunjaya Jaap</option>
            <option value="Navgraha Shanti">Navgraha Shanti</option>
            <option value="General Pandit Consultation">General Pandit Consultation</option>
          </select>
        </div>
        {errors.service && <p className="text-xs text-red-500 mt-1 font-medium">{errors.service.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold uppercase text-[#75695d] mb-1">
          Message & Preferred Date/Location <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-[#c96b18] absolute left-3.5 top-3" />
          <textarea
            rows={4}
            {...register('message')}
            placeholder="Tell us about your requirements or preferred date for Ujjain ritual..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] text-sm bg-[#fffaf2]"
          ></textarea>
        </div>
        {errors.message && <p className="text-xs text-red-500 mt-1 font-medium">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-saffron-gradient hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}</span>
      </button>
    </form>
  );
};
