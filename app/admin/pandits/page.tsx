'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Eye, EyeOff, Trash2, Edit, CheckCircle, Search, Upload, X } from 'lucide-react';
import { panditService } from '@/services/panditService';
import { apiClient } from '@/lib/apiClient';
import { Pandit } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { resolveImageUrl } from '@/lib/api';

export default function AdminPanditsPage() {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPandit, setEditingPandit] = useState<Pandit | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    experience: 5,
    location: 'Ujjain, Madhya Pradesh',
    languages: 'Hindi, Sanskrit',
    specializations: 'Mahakal Rudrabhishek, Kaal Sarp Dosh',
    tags: 'महाकाल रुद्राभिषेक, कालसर्प दोष, मंगल दोष, सिद्धवट',
    poojasCompleted: 500,
    phone: '9876543210',
    whatsAppNumber: '919876543210',
    email: 'pandit@mahakalpandit.com',
    shortDescription: '',
    bio: '',
    faqs: [
      { question: 'उज्जैन में पूजा करवाने की क्या प्रक्रिया है?', answer: 'आप हमारी वेबसाइट के माध्यम से सीधे पंडित जी से व्हाट्सएप या कॉल पर संपर्क करके मुहूर्त एवं तिथि तय कर सकते हैं।' },
      { question: 'क्या ऑनलाईन / ई-पूजा का विकल्प भी उपलब्ध है?', answer: 'जी हाँ, आपके नाम एवं गोत्र का संकल्प लेकर ऑनलाइन (लाइव वीडियो कॉल) पूजा संपन्न कराई जाती है।' }
    ],
    isVerified: true,
    isActive: true,
  });

  const loadPandits = async () => {
    try {
      const data = await panditService.getAdminPandits();
      setPandits(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPandits();
  }, []);

  const handleToggleStatus = async (id: string, name: string, currentStatus: boolean) => {
    const confirm = await showAlert.confirm(
      currentStatus ? 'Hide Pandit?' : 'Show Pandit?',
      `Are you sure you want to ${currentStatus ? 'hide' : 'show'} ${name} on the public website?`,
      currentStatus ? 'Yes, Hide' : 'Yes, Show'
    );
    if (confirm.isConfirmed) {
      try {
        await panditService.togglePanditStatus(id);
        await showAlert.success('Success', `Pandit ${currentStatus ? 'hidden' : 'activated'}`);
        loadPandits();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirm = await showAlert.confirm('Delete Pandit?', `Are you sure you want to delete ${name}?`);
    if (confirm.isConfirmed) {
      try {
        await panditService.deletePandit(id);
        await showAlert.success('Deleted', 'Pandit deleted successfully');
        loadPandits();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const res = await apiClient.upload('pandits', file);
        if (res.success && res.data.url) {
          setFormData((prev) => ({ ...prev, image: res.data.url }));
          showAlert.success('Uploaded', 'Profile image uploaded successfully');
        }
      } catch (err: any) {
        showAlert.error('Upload Error', err.message);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingPandit(null);
    setFormData({
      name: '',
      image: '/images/pandits/pandit1.jpg',
      experience: 5,
      location: 'Ujjain, Madhya Pradesh',
      languages: 'Hindi, Sanskrit',
      specializations: 'Mahakal Rudrabhishek, Kaal Sarp Dosh',
      tags: 'महाकाल रुद्राभिषेक, कालसर्प दोष, मंगल दोष, सिद्धवट',
      poojasCompleted: 500,
      phone: '9876543210',
      whatsAppNumber: '919876543210',
      email: 'pandit@mahakalpandit.com',
      shortDescription: 'Gold Medalist Acharya specializing in Mahakal rituals.',
      bio: 'Detailed background and education of Pandit Ji in Sanskrit scriptures...',
      faqs: [
        { question: 'उज्जैन में पूजा करवाने की क्या प्रक्रिया है?', answer: 'आप हमारी वेबसाइट के माध्यम से सीधे पंडित जी से व्हाट्सएप या कॉल पर संपर्क करके मुहूर्त एवं तिथि तय कर सकते हैं।' },
        { question: 'क्या ऑनलाईन / ई-पूजा का विकल्प भी उपलब्ध है?', answer: 'जी हाँ, आपके नाम एवं गोत्र का संकल्प लेकर ऑनलाइन (लाइव वीडियो कॉल) पूजा संपन्न कराई जाती है।' }
      ],
      isVerified: true,
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (p: Pandit) => {
    setEditingPandit(p);
    setFormData({
      name: p.name,
      image: p.image,
      experience: p.experience,
      location: p.location,
      languages: p.languages.join(', '),
      specializations: p.specializations.join(', '),
      tags: (p.tags || []).join(', '),
      poojasCompleted: p.poojasCompleted || 500,
      phone: p.phone,
      whatsAppNumber: p.whatsAppNumber || '919876543210',
      email: p.email,
      shortDescription: p.shortDescription,
      bio: p.bio,
      faqs: p.faqs && p.faqs.length > 0 ? p.faqs : [
        { question: 'उज्जैन में पूजा करवाने की क्या प्रक्रिया है?', answer: 'आप हमारी वेबसाइट के माध्यम से सीधे पंडित जी से व्हाट्सएप या कॉल पर संपर्क करके मुहूर्त एवं तिथि तय कर सकते हैं।' },
      ],
      isVerified: p.isVerified,
      isActive: p.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        languages: formData.languages.split(',').map((s) => s.trim()),
        specializations: formData.specializations.split(',').map((s) => s.trim()),
        tags: formData.tags ? formData.tags.split(',').map((s) => s.trim()) : [],
      };

      if (editingPandit) {
        await panditService.updatePandit(editingPandit._id, payload);
        await showAlert.success('Updated', 'Pandit Ji profile updated successfully');
      } else {
        await panditService.createPandit(payload);
        await showAlert.success('Created', 'New Pandit Ji created successfully');
      }

      setModalOpen(false);
      loadPandits();
    } catch (err: any) {
      showAlert.error('Validation Error', err.message);
    }
  };

  const filtered = pandits.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

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
            placeholder="Search Pandits..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-[#eadfce] bg-[#fffaf2] focus:outline-none focus:border-[#c96b18]"
          />
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:opacity-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Pandit Ji</span>
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
                  <th className="py-3 px-4">Profile</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#eadfce] bg-amber-950/10">
                        <Image 
                          src={resolveImageUrl(p.image, '/images/pandits/pandit1.jpg')} 
                          alt={p.name} 
                          fill 
                          className="object-cover"
                          onError={(e: any) => {
                            e.currentTarget.srcset = '/images/pandits/pandit1.jpg';
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">{p.name}</td>
                    <td className="py-3 px-4">{p.location}</td>
                    <td className="py-3 px-4 font-semibold">{p.experience} Years</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {p.isActive ? 'Active (Public)' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(p._id, p.name, p.isActive)}
                        className="p-1.5 rounded-lg border border-[#eadfce] hover:bg-amber-100 text-[#c96b18]"
                        title={p.isActive ? 'Hide' : 'Show'}
                      >
                        {p.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-lg border border-[#eadfce] hover:bg-amber-100 text-[#7a1f1f]"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
                        className="p-1.5 rounded-lg border border-red-200 hover:bg-red-100 text-red-600"
                        title="Delete"
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
                {editingPandit ? 'Edit Pandit Ji Profile' : 'Add New Pandit Ji'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200 text-[#7a1f1f] flex items-center justify-center transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
              </div>

              {/* Image Upload Input */}
              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Profile Image URL or Upload</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Phone Number (10-Digit)</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
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

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Specializations (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={formData.specializations}
                  onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Languages (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">WhatsApp Number (e.g. 919876543210)</label>
                  <input
                    type="text"
                    value={formData.whatsAppNumber}
                    onChange={(e) => setFormData({ ...formData, whatsAppNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Completed Poojas Count</label>
                  <input
                    type="number"
                    value={formData.poojasCompleted}
                    onChange={(e) => setFormData({ ...formData, poojasCompleted: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Custom Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="महाकाल रुद्राभिषेक, कालसर्प दोष, मंगलनाथ"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Detailed Bio</label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              {/* Custom FAQs Manager */}
              <div className="space-y-3 pt-2 border-t border-[#eadfce]">
                <div className="flex items-center justify-between">
                  <label className="block font-bold uppercase text-[#7a1f1f]">Custom Pandit FAQs (सवाल & जवाब)</label>
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

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span>Is Active (Visible Publicly)</span>
                </label>
                <label className="flex items-center gap-2 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                  />
                  <span>Is Verified Badge</span>
                </label>
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
                  Save Pandit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
