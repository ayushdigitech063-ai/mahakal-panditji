'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Edit, Upload } from 'lucide-react';
import { festivalService } from '@/services/otherServices';
import { apiClient } from '@/lib/apiClient';
import { Festival } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminFestivalsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFest, setEditingFest] = useState<Festival | null>(null);

  const [formData, setFormData] = useState({
    title: 'Maha Shivratri Mahotsav 2026',
    year: '2026',
    festivalName: 'Maha Shivratri',
    dateText: 'February 15, 2026',
    poojaName: 'Char Prahar Mahakal Abhishek',
    description: 'Special night-long abhishek booking in Ujjain.',
    image: '/images/general/festival1.jpg',
    isVisible: true,
  });

  const loadFestivals = async () => {
    try {
      const data = await festivalService.getAdminFestivals();
      setFestivals(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFestivals();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirm = await showAlert.confirm('Delete Festival?', `Are you sure you want to delete "${title}"?`);
    if (confirm.isConfirmed) {
      try {
        await festivalService.deleteFestival(id);
        await showAlert.success('Deleted', 'Festival deleted successfully');
        loadFestivals();
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
          setFormData((prev) => ({ ...prev, image: res.data.url }));
          showAlert.success('Uploaded', 'Festival image uploaded successfully');
        }
      } catch (err: any) {
        showAlert.error('Upload Error', err.message);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingFest(null);
    setFormData({
      title: 'Shravan Maas Divine Seva 2026',
      year: '2026',
      festivalName: 'Shravan Month',
      dateText: 'July 15 - August 15, 2026',
      poojaName: 'Daily Bilvarchana & Rudrabhishek',
      description: 'Book month-long daily bilva patra arcana for divine blessings.',
      image: '/images/general/festival2.jpg',
      isVisible: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (f: Festival) => {
    setEditingFest(f);
    setFormData({
      title: f.title,
      year: f.year,
      festivalName: f.festivalName,
      dateText: f.dateText,
      poojaName: f.poojaName,
      description: f.description,
      image: f.image,
      isVisible: f.isVisible,
    });
    setModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFest) {
        await festivalService.updateFestival(editingFest._id, formData);
        await showAlert.success('Updated', 'Festival card updated successfully');
      } else {
        await festivalService.createFestival(formData);
        await showAlert.success('Created', 'New Festival card created successfully');
      }
      setModalOpen(false);
      loadFestivals();
    } catch (err: any) {
      showAlert.error('Validation Error', err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Manage Special Festival Cards</h3>
        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Festival Card</span>
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
                  <th className="py-3 px-4">Banner</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {festivals.map((f) => (
                  <tr key={f._id} className="hover:bg-amber-50/40">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-8 rounded-lg overflow-hidden border border-[#eadfce]">
                        <Image src={f.image} alt={f.title} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">{f.title}</td>
                    <td className="py-3 px-4 font-semibold">{f.year}</td>
                    <td className="py-3 px-4">{f.dateText}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        f.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {f.isVisible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(f)}
                        className="p-1.5 rounded-lg border border-[#eadfce] text-[#7a1f1f]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(f._id, f.title)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#eadfce]">
            <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f] border-b border-[#eadfce] pb-3">
              {editingFest ? 'Edit Festival Card' : 'Add Festival Card'}
            </h3>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Year</label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Festival Name</label>
                  <input
                    type="text"
                    required
                    value={formData.festivalName}
                    onChange={(e) => setFormData({ ...formData, festivalName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Date Text</label>
                  <input
                    type="text"
                    required
                    value={formData.dateText}
                    onChange={(e) => setFormData({ ...formData, dateText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Pooja Name</label>
                  <input
                    type="text"
                    required
                    value={formData.poojaName}
                    onChange={(e) => setFormData({ ...formData, poojaName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Image URL or Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                  <label className="bg-saffron-gradient text-white px-3 py-2 rounded-xl cursor-pointer font-bold flex items-center gap-1 shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
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

              <div className="flex justify-end gap-3 pt-4 border-t border-[#eadfce]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-xl border border-[#eadfce] font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-saffron-gradient text-white px-6 py-2 rounded-xl font-bold">
                  Save Festival
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
