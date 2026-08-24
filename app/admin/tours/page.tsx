'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Eye, EyeOff, Trash2, Edit, Search, Upload, X } from 'lucide-react';
import { tourService } from '@/services/tourService';
import { apiClient } from '@/lib/apiClient';
import { Tour } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { resolveImageUrl } from '@/lib/api';

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    coverImage: '',
    duration: '2 Days / 1 Night',
    destination: 'Ujjain',
    startingPrice: 4999,
    description: '',
    highlights: 'Mahakal VIP Darshan, Rudrabhishek Ritual, AC Cab',
    isActive: true,
  });

  const loadTours = async () => {
    try {
      const data = await tourService.getAdminTours();
      setTours(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  const handleToggleStatus = async (id: string, name: string, currentStatus: boolean) => {
    const confirm = await showAlert.confirm(
      currentStatus ? 'Hide Package?' : 'Show Package?',
      `Are you sure you want to ${currentStatus ? 'hide' : 'show'} ${name}?`,
      currentStatus ? 'Yes, Hide' : 'Yes, Show'
    );
    if (confirm.isConfirmed) {
      try {
        await tourService.toggleTourStatus(id);
        await showAlert.success('Success', `Tour ${currentStatus ? 'hidden' : 'activated'}`);
        loadTours();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirm = await showAlert.confirm('Delete Tour Package?', `Are you sure you want to delete ${name}?`);
    if (confirm.isConfirmed) {
      try {
        await tourService.deleteTour(id);
        await showAlert.success('Deleted', 'Tour package deleted successfully');
        loadTours();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const res = await apiClient.upload('general', file);
        if (res.success && res.data.url) {
          setFormData((prev) => ({ ...prev, coverImage: res.data.url }));
          showAlert.success('Uploaded', 'Cover image uploaded successfully');
        }
      } catch (err: any) {
        showAlert.error('Upload Error', err.message);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingTour(null);
    setFormData({
      name: '',
      slug: '',
      coverImage: '/images/tours/tour1.jpg',
      duration: '2 Days / 1 Night',
      destination: 'Ujjain',
      startingPrice: 4999,
      description: 'Sacred Ujjain tour with guaranteed Mahakal Darshan guidance, 3-star AC stay, and AC cab.',
      highlights: 'Mahakal VIP Darshan, Rudrabhishek Ritual, AC Cab',
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (t: Tour) => {
    setEditingTour(t);
    setFormData({
      name: t.name,
      slug: t.slug,
      coverImage: t.coverImage,
      duration: t.duration,
      destination: t.destination,
      startingPrice: t.startingPrice,
      description: t.description,
      highlights: (t.highlights || []).join(', '),
      isActive: t.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        highlights: formData.highlights.split(',').map((s) => s.trim()),
      };

      if (editingTour) {
        await tourService.updateTour((editingTour as any)._id || editingTour.id, payload);
        await showAlert.success('Updated', 'Tour package updated successfully');
      } else {
        await tourService.createTour(payload);
        await showAlert.success('Created', 'New Tour package created successfully');
      }

      setModalOpen(false);
      loadTours();
    } catch (err: any) {
      showAlert.error('Validation Error', err.message);
    }
  };

  const filtered = tours.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-[#75695d] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Tour Packages..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-[#eadfce] bg-[#fffaf2] focus:outline-none focus:border-[#c96b18]"
          />
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:opacity-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tour Package</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-3xl border border-[#eadfce] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2b2118]">
              <thead className="bg-[#fffaf2] text-[#75695d] uppercase border-b border-[#eadfce]">
                <tr>
                  <th className="py-3 px-4">Cover</th>
                  <th className="py-3 px-4">Tour Name</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Starting Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {filtered.map((t: any) => (
                  <tr key={t._id || t.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-10 rounded-xl overflow-hidden border border-[#eadfce] bg-amber-950/10">
                        <Image src={resolveImageUrl(t.coverImage)} alt={t.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">{t.name}</td>
                    <td className="py-3 px-4 font-semibold">{t.duration}</td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">₹{t.startingPrice?.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          t.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {t.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(t._id || t.id, t.name, t.isActive)}
                        className="p-1.5 rounded-lg border border-[#eadfce] hover:bg-amber-100 text-[#c96b18]"
                      >
                        {t.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(t)}
                        className="p-1.5 rounded-lg border border-[#eadfce] hover:bg-amber-100 text-[#7a1f1f]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t._id || t.id, t.name)}
                        className="p-1.5 rounded-lg border border-red-200 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#eadfce]">
            <div className="flex items-center justify-between border-b border-[#eadfce] pb-3">
              <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                {editingTour ? 'Edit Tour Package' : 'Add New Tour Package'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Tour Package Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Cover Image</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                  <label className="bg-saffron-gradient text-white px-3 py-2 rounded-xl cursor-pointer font-bold flex items-center gap-1 shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Destination</label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Highlights (Comma separated)</label>
                <input
                  type="text"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span>Is Active</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#eadfce]">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2 rounded-xl border border-[#eadfce]">
                  Cancel
                </button>
                <button type="submit" className="bg-saffron-gradient text-white px-6 py-2 rounded-xl font-bold">
                  Save Tour Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
