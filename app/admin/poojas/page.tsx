'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Eye, EyeOff, Trash2, Edit, Upload, X } from 'lucide-react';
import { poojaService } from '@/services/poojaService';
import { apiClient } from '@/lib/apiClient';
import { Pooja } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminPoojasPage() {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPooja, setEditingPooja] = useState<Pooja | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    duration: '2.5 Hours',
    price: 3100,
    category: 'Rudrabhishek',
    benefits: 'Removes negative energies, Health & Longevity',
    procedure: 'Sankalp, Abhishek with Panchamrit, Laghu Rudra Jaap, Aarti',
    samagri: 'Panchamrit, Belpatra, Bhasma, Gangajal',
    tags: 'महाकाल रुद्राभिषेक, उज्जैन पूजा, कालसर्प दोष',
    faqs: [
      { question: 'उज्जैन में पूजा करवाने की प्रक्रिया क्या है?', answer: 'आप सीधे व्हाट्सएप या फोन पर संपर्क करके शुभ मुहूर्त तय कर सकते हैं।' },
    ],
    isActive: true,
  });

  const loadPoojas = async () => {
    try {
      const data = await poojaService.getAdminPoojas();
      setPoojas(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPoojas();
  }, []);

  const handleToggleStatus = async (id: string, name: string, currentStatus: boolean) => {
    const confirm = await showAlert.confirm(
      currentStatus ? 'Hide Pooja?' : 'Show Pooja?',
      `Are you sure you want to ${currentStatus ? 'hide' : 'show'} ${name}?`
    );
    if (confirm.isConfirmed) {
      try {
        await poojaService.togglePoojaStatus(id);
        await showAlert.success('Success', `Pooja ${currentStatus ? 'hidden' : 'activated'}`);
        loadPoojas();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirm = await showAlert.confirm('Delete Pooja?', `Are you sure you want to delete ${name}?`);
    if (confirm.isConfirmed) {
      try {
        await poojaService.deletePooja(id);
        await showAlert.success('Deleted', 'Pooja deleted successfully');
        loadPoojas();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const res = await apiClient.upload('poojas', file);
        if (res.success && res.data.url) {
          setFormData((prev) => ({ ...prev, image: res.data.url }));
          showAlert.success('Uploaded', 'Pooja banner uploaded successfully');
        }
      } catch (err: any) {
        showAlert.error('Upload Error', err.message);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingPooja(null);
    setFormData({
      name: '',
      image: '/images/poojas/rudrabhishek.jpg',
      description: 'Sacred ritual bathing with Panchamrit in Ujjain.',
      duration: '2.5 Hours',
      price: 3100,
      category: 'Rudrabhishek',
      benefits: 'Removes negative energies, Ensures health & longevity',
      procedure: 'Sankalp & Ganpati Pujan, Abhishek with 11 dravyans, Aarti',
      samagri: 'Panchamrit, Belpatra (108), Bhasma, Gangajal',
      tags: 'महाकाल रुद्राभिषेक, उज्जैन पूजा, कालसर्प दोष',
      faqs: [
        { question: 'उज्जैन में पूजा करवाने की प्रक्रिया क्या है?', answer: 'आप सीधे व्हाट्सएप या फोन पर संपर्क करके शुभ मुहूर्त तय कर सकते हैं।' },
      ],
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (p: Pooja) => {
    setEditingPooja(p);
    setFormData({
      name: p.name,
      image: p.image,
      description: p.description,
      duration: p.duration,
      price: p.price,
      category: p.category,
      benefits: p.benefits.join(', '),
      procedure: p.procedure.join(', '),
      samagri: (p.samagri || []).join(', '),
      tags: (p.tags || []).join(', '),
      faqs: p.faqs && p.faqs.length > 0 ? p.faqs : [
        { question: 'उज्जैन में पूजा करवाने की प्रक्रिया क्या है?', answer: 'आप सीधे व्हाट्सएप या फोन पर संपर्क करके शुभ मुहूर्त तय कर सकते हैं।' },
      ],
      isActive: p.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        benefits: formData.benefits.split(',').map((s) => s.trim()),
        procedure: formData.procedure.split(',').map((s) => s.trim()),
        samagri: formData.samagri.split(',').map((s) => s.trim()),
        tags: formData.tags ? formData.tags.split(',').map((s) => s.trim()) : [],
      };

      if (editingPooja) {
        await poojaService.updatePooja(editingPooja._id, payload);
        await showAlert.success('Updated', 'Pooja service updated successfully');
      } else {
        await poojaService.createPooja(payload);
        await showAlert.success('Created', 'New Pooja created successfully');
      }

      setModalOpen(false);
      loadPoojas();
    } catch (err: any) {
      showAlert.error('Validation Error', err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Manage Pooja Catalog</h3>
        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Pooja</span>
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
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {poojas.map((p) => (
                  <tr key={p._id} className="hover:bg-amber-50/40">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-8 rounded-lg overflow-hidden border border-[#eadfce]">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">{p.name}</td>
                    <td className="py-3 px-4">{p.category}</td>
                    <td className="py-3 px-4 font-extrabold text-[#8f3f12]">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">{p.duration}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {p.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(p._id, p.name, p.isActive)}
                        className="p-1.5 rounded-lg border border-[#eadfce] text-[#c96b18]"
                      >
                        {p.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-lg border border-[#eadfce] text-[#7a1f1f]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
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

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#eadfce]">
            <div className="flex items-center justify-between border-b border-[#eadfce] pb-3">
              <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                {editingPooja ? 'Edit Pooja Service' : 'Add New Pooja Ceremony'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#7a1f1f]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Pooja Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
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
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Benefits (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Procedure Steps (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={formData.procedure}
                  onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">SEO Search Keywords & Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="महाकाल रुद्राभिषेक, उज्जैन पूजा, कालसर्प दोष, मंगलनाथ"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              {/* Custom FAQs Manager */}
              <div className="space-y-3 pt-2 border-t border-[#eadfce]">
                <div className="flex items-center justify-between">
                  <label className="block font-bold uppercase text-[#7a1f1f]">Custom Pooja FAQs (सवाल & जवाब)</label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        faqs: [...formData.faqs, { question: '', answer: '' }],
                      })
                    }
                    className="text-xs font-bold text-[#c96b18] hover:text-[#7a1f1f]"
                  >
                    + Add New FAQ
                  </button>
                </div>

                {formData.faqs.map((faq, index) => (
                  <div key={index} className="p-3 bg-[#fffaf2] rounded-xl border border-[#eadfce] space-y-2 relative">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          faqs: formData.faqs.filter((_, i) => i !== index),
                        })
                      }
                      className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:text-red-700"
                    >
                      ✕ Remove
                    </button>
                    <input
                      type="text"
                      placeholder={`Question ${index + 1}`}
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[index].question = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#eadfce] bg-white font-semibold"
                    />
                    <textarea
                      rows={2}
                      placeholder={`Answer ${index + 1}`}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[index].answer = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#eadfce] bg-white"
                    />
                  </div>
                ))}
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
                  Save Pooja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
