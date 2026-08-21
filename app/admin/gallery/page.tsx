'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Upload, Search, Images, X } from 'lucide-react';
import { galleryService, GalleryItem } from '@/services/galleryService';
import { apiClient } from '@/lib/apiClient';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { resolveImageUrl } from '@/lib/api';
export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    image: '/images/pandits/pandit1.jpg',
    category: 'Mahakal Temple',
    description: 'पवित्र उज्जैन धाम के दिव्य दर्शन एवं वैदिक अनुष्ठान।',
    isActive: true,
  });

  const loadGallery = async () => {
    try {
      const data = await galleryService.getAdminGallery();
      setItems(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const res = await apiClient.upload('gallery', file);
        if (res.success && res.data.url) {
          setFormData((prev) => ({ ...prev, image: res.data.url }));
          showAlert.success('Uploaded', 'Gallery image uploaded successfully');
        }
      } catch (err: any) {
        showAlert.error('Upload Error', err.message);
      }
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirm = await showAlert.confirm('Delete Image?', `Are you sure you want to delete "${title}"?`);
    if (confirm.isConfirmed) {
      try {
        await galleryService.deleteGalleryItem(id);
        await showAlert.success('Deleted', 'Image removed from gallery');
        loadGallery();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await galleryService.createGalleryItem(formData);
      await showAlert.success('Success', 'New image added to gallery');
      setModalOpen(false);
      loadGallery();
    } catch (e: any) {
      showAlert.error('Error', e.message);
    }
  };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md">
            <Images className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Homepage Live Gallery</h2>
            <p className="text-xs text-[#75695d]">Manage sacred photos displayed on homepage carousel</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-[#75695d] absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Gallery..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-[#eadfce] bg-[#fffaf2] focus:outline-none focus:border-[#c96b18]"
            />
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:opacity-95 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Gallery Image</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div key={item._id} className="bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-sm hover:shadow-md transition-all group relative">
              <div className="relative h-48 w-full bg-amber-950/10">
                <Image
                  src={resolveImageUrl(item.image)}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => handleDelete(item._id, item.title)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] font-bold text-[#c96b18] uppercase tracking-wider block">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm text-[#7a1f1f] line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-[#eadfce]">
            <div className="flex items-center justify-between border-b border-[#eadfce] pb-3">
              <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Add New Gallery Image</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200 text-[#7a1f1f] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Photo Title / Caption</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. महाकाल भस्म आरती दर्शन"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahakal Temple, Shipra Aarti"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Photo Description / Vidhi Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. बाबा महाकाल की दिव्य आरती एवं दर्शन का विवरण..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Image URL or Local Upload</label>
                <div className="flex gap-2 items-center">
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
                {/* Live Image Preview Thumbnail */}
                {formData.image && (
                  <div className="mt-2 flex items-center gap-3 bg-[#fffaf2] p-2 rounded-2xl border border-[#eadfce]">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#eadfce] bg-amber-950/10 shrink-0">
                      <Image
                        src={resolveImageUrl(formData.image)}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-[#75695d] font-medium truncate">
                      Preview: {formData.image}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#eadfce]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-xl border border-[#eadfce] text-[#75695d] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-saffron-gradient text-white px-6 py-2 rounded-xl font-bold shadow-md"
                >
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
