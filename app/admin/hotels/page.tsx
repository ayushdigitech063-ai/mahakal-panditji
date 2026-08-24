'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Eye, EyeOff, Trash2, Edit, Search, Upload, X, Building2, Home } from 'lucide-react';
import { hotelService } from '@/services/hotelService';
import { apiClient } from '@/lib/apiClient';
import { Hotel } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { resolveImageUrl } from '@/lib/api';

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    propertyType: 'Hotel' as 'Hotel' | 'Dharmashala',
    coverImage: '',
    location: 'Ujjain, Madhya Pradesh',
    description: '',
    startingPrice: 1499,
    amenities: 'AC, WiFi, Parking, 24/7 Hot Water',
    featured: false,
    isActive: true,
  });

  const loadHotels = async () => {
    try {
      const data = await hotelService.getAdminHotels();
      setHotels(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const handleToggleStatus = async (id: string, name: string, currentStatus: boolean) => {
    const confirm = await showAlert.confirm(
      currentStatus ? 'Hide Property?' : 'Show Property?',
      `Are you sure you want to ${currentStatus ? 'hide' : 'show'} ${name}?`,
      currentStatus ? 'Yes, Hide' : 'Yes, Show'
    );
    if (confirm.isConfirmed) {
      try {
        await hotelService.toggleHotelStatus(id);
        await showAlert.success('Success', `Property ${currentStatus ? 'hidden' : 'activated'}`);
        loadHotels();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirm = await showAlert.confirm('Delete Property?', `Are you sure you want to delete ${name}?`);
    if (confirm.isConfirmed) {
      try {
        await hotelService.deleteHotel(id);
        await showAlert.success('Deleted', 'Property deleted successfully');
        loadHotels();
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
    setEditingHotel(null);
    setFormData({
      name: '',
      slug: '',
      propertyType: 'Hotel',
      coverImage: '/images/hotels/hotel1.jpg',
      location: 'Near Mahakaleshwar Temple, Ujjain',
      description: 'Clean, peaceful accommodation with 24/7 hot water, satvik dining, and temple proximity.',
      startingPrice: 1499,
      amenities: 'AC, WiFi, Parking, 24/7 Hot Water',
      featured: false,
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (h: Hotel) => {
    setEditingHotel(h);
    setFormData({
      name: h.name,
      slug: h.slug,
      propertyType: h.propertyType || 'Hotel',
      coverImage: h.coverImage,
      location: h.location,
      description: h.description,
      startingPrice: h.startingPrice,
      amenities: (h.amenities || []).join(', '),
      featured: h.featured,
      isActive: h.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        amenities: formData.amenities.split(',').map((s) => s.trim()),
      };

      if (editingHotel) {
        await hotelService.updateHotel((editingHotel as any)._id || editingHotel.id, payload);
        await showAlert.success('Updated', 'Property updated successfully');
      } else {
        await hotelService.createHotel(payload);
        await showAlert.success('Created', 'New Property created successfully');
      }

      setModalOpen(false);
      loadHotels();
    } catch (err: any) {
      showAlert.error('Validation Error', err.message);
    }
  };

  const filtered = hotels.filter((h) => h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-[#75695d] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Hotels & Dharmashalas..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-[#eadfce] bg-[#fffaf2] focus:outline-none focus:border-[#c96b18]"
          />
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:opacity-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hotel / Dharmashala</span>
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-3xl border border-[#eadfce] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2b2118]">
              <thead className="bg-[#fffaf2] text-[#75695d] uppercase border-b border-[#eadfce]">
                <tr>
                  <th className="py-3 px-4">Cover</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Starting Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {filtered.map((h: any) => (
                  <tr key={h._id || h.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-10 rounded-xl overflow-hidden border border-[#eadfce] bg-amber-950/10">
                        <Image src={resolveImageUrl(h.coverImage)} alt={h.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">{h.name}</td>
                    <td className="py-3 px-4 font-semibold">
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-[#8f3f12] px-2 py-0.5 rounded-md text-[10px]">
                        {h.propertyType === 'Dharmashala' ? <Home className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                        <span>{h.propertyType}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">{h.location}</td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">₹{h.startingPrice?.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          h.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {h.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(h._id || h.id, h.name, h.isActive)}
                        className="p-1.5 rounded-lg border border-[#eadfce] hover:bg-amber-100 text-[#c96b18]"
                      >
                        {h.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(h)}
                        className="p-1.5 rounded-lg border border-[#eadfce] hover:bg-amber-100 text-[#7a1f1f]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(h._id || h.id, h.name)}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#eadfce]">
            <div className="flex items-center justify-between border-b border-[#eadfce] pb-3">
              <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                {editingHotel ? 'Edit Hotel / Dharmashala' : 'Add New Hotel / Dharmashala'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Property Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e: any) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Dharmashala">Dharmashala</option>
                  </select>
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
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
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
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
