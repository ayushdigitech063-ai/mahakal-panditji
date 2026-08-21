'use client';

import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { settingsService } from '@/services/otherServices';
import { SiteSettings } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminSettingsPage() {
  const [data, setData] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await settingsService.getSettings();
        setData(res);
      } catch (e: any) {
        showAlert.error('Error', e.message);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    try {
      await settingsService.updateSettings(data);
      await showAlert.success('Settings Saved', 'Global website settings updated successfully!');
    } catch (e: any) {
      showAlert.error('Error', e.message);
    }
  };

  if (loading || !data) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Global Website Settings</h3>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-6 py-3 rounded-full shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4 text-xs">
        <h4 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">Brand & Contact Information</h4>

        <div>
          <label className="block font-semibold text-[#75695d] uppercase mb-1">Website Name</label>
          <input
            type="text"
            value={data.siteName}
            onChange={(e) => setData({ ...data, siteName: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-[#75695d] uppercase mb-1">Support Phone</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#75695d] uppercase mb-1">Support Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#75695d] uppercase mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={data.whatsApp}
              onChange={(e) => setData({ ...data, whatsApp: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-[#75695d] uppercase mb-1">Ujjain Office Address</label>
          <textarea
            rows={2}
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
          />
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4 text-xs">
        <h4 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">Default SEO Settings</h4>

        <div>
          <label className="block font-semibold text-[#75695d] uppercase mb-1">Global Meta Title</label>
          <input
            type="text"
            value={data.seoTitle}
            onChange={(e) => setData({ ...data, seoTitle: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
          />
        </div>

        <div>
          <label className="block font-semibold text-[#75695d] uppercase mb-1">Global Meta Description</label>
          <textarea
            rows={3}
            value={data.seoDescription}
            onChange={(e) => setData({ ...data, seoDescription: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-saffron-gradient text-white font-bold py-4 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        <span>Save Global Settings</span>
      </button>
    </form>
  );
}
