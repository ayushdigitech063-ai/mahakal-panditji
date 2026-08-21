'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, ShieldCheck, Flame, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '../../../lib/apiClient';
import { ENDPOINTS } from '../../../lib/endpoints';
import { showAlert } from '../../../lib/swal';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid admin email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@mahakalpandit.com',
      password: 'MahakalAdmin2026!',
    },
  });

  const handleQuickFill = () => {
    setValue('email', 'admin@mahakalpandit.com', { shouldValidate: true });
    setValue('password', 'MahakalAdmin2026!', { shouldValidate: true });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await apiClient.post(ENDPOINTS.auth.login, data);
      if (res.success && res.data.token) {
        localStorage.setItem('admin_token', res.data.token);
        await showAlert.success('Login Successful', 'Welcome to Mahakal Pandit CMS');
        // Force full page navigation to ensure auth headers and admin layout load freshly
        window.location.href = '/admin';
      } else {
        await showAlert.error('Login Failed', res.message || 'Invalid credentials');
      }
    } catch (err: any) {
      await showAlert.error('Authentication Error', err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-spiritual-gradient flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-[#eadfce] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-saffron-gradient mx-auto flex items-center justify-center shadow-lg">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <h1 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
            Super Admin Portal
          </h1>
          <p className="text-xs text-[#75695d]">
            Sign in to manage Pandits, Poojas, Blogs, and CMS Settings
          </p>

          {/* Quick Fill Box & Button */}
          <div className="bg-[#fffaf2] p-3 rounded-2xl border border-[#eadfce] text-left text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#7a1f1f]">🔑 Demo Admin Credentials:</span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="bg-[#c96b18] hover:bg-[#8f3f12] text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors shadow-sm"
              >
                1-Click AutoFill
              </button>
            </div>
            <p className="text-[11px] text-[#75695d]">
              Email: <code className="text-[#8f3f12] font-semibold">admin@mahakalpandit.com</code>
            </p>
            <p className="text-[11px] text-[#75695d]">
              Password: <code className="text-[#8f3f12] font-semibold">MahakalAdmin2026!</code>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#75695d] mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-[#c96b18] absolute left-3.5 top-3" />
              <input
                type="email"
                {...register('email')}
                placeholder="admin@mahakalpandit.com"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] text-sm bg-[#fffaf2]"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#75695d] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#c96b18] absolute left-3.5 top-3" />
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] text-sm bg-[#fffaf2]"
              />
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1 font-medium">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-saffron-gradient text-white font-bold py-3.5 rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>

          {/* Back to Public Website Link */}
          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-[#c96b18] hover:text-[#7a1f1f] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Website (मुख्य वेबसाइट पर जाएं)</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
