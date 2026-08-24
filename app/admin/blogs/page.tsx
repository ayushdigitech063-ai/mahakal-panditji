'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Plus, Trash2, Edit, Upload, X } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';
import { blogService } from '@/services/blogService';
import { apiClient } from '@/lib/apiClient';
import { Blog } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="p-4 text-xs font-semibold text-[#75695d]">Loading Rich Text Editor...</div>,
});

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    featuredImage: '/images/blogs/blog1.jpg',
    category: 'Vedic Knowledge',
    excerpt: '',
    content: '<p>Discover the eternal glory and sacred rituals of Lord Mahakal in Ujjain...</p>',
    author: 'Mahakal Editorial Team',
    readTime: '5 min read',
    tags: 'महाकाल मंदिर, उज्जैन दर्शन, कालसर्प दोष पूजा',
    faqs: [
      { question: 'उज्जैन कालसर्प दोष पूजा की बुकिंग कैसे करें?', answer: 'आप सीधे हमारे अधिकृत पंडित जी से फोन या व्हाट्सएप पर संपर्क करके तिथि बुक कर सकते हैं।' },
    ],
    status: 'published' as 'published' | 'draft' | 'hidden',
  });

  const loadBlogs = async () => {
    try {
      const data = await blogService.getAdminBlogs();
      setBlogs(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await blogService.toggleBlogStatus(id, newStatus);
      await showAlert.success('Updated', `Blog status changed to ${newStatus}`);
      loadBlogs();
    } catch (e: any) {
      showAlert.error('Error', e.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirm = await showAlert.confirm('Delete Article?', `Are you sure you want to delete "${title}"?`);
    if (confirm.isConfirmed) {
      try {
        await blogService.deleteBlog(id);
        await showAlert.success('Deleted', 'Article deleted successfully');
        loadBlogs();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const res = await apiClient.upload('blogs', file);
        if (res.success && res.data.url) {
          setFormData((prev) => ({ ...prev, featuredImage: res.data.url }));
          showAlert.success('Uploaded', 'Featured image uploaded successfully');
        }
      } catch (err: any) {
        showAlert.error('Upload Error', err.message);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      featuredImage: '/images/blogs/blog1.jpg',
      category: 'Vedic Knowledge',
      excerpt: 'Discover the spiritual secrets of Ujjain and Mahakal rituals...',
      content: '<p>Ujjain is recognized as the eternal center of time (Mahakal)...</p>',
      author: 'Mahakal Editorial Team',
      readTime: '5 min read',
      tags: 'महाकाल मंदिर, उज्जैन दर्शन, कालसर्प दोष पूजा',
      faqs: [
        { question: 'उज्जैन कालसर्प दोष पूजा की बुकिंग कैसे करें?', answer: 'आप सीधे हमारे अधिकृत पंडित जी से फोन या व्हाट्सएप पर संपर्क करके तिथि बुक कर सकते हैं।' },
      ],
      status: 'published',
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (b: Blog) => {
    setEditingBlog(b);
    setFormData({
      title: b.title,
      featuredImage: b.featuredImage,
      category: b.category,
      excerpt: b.excerpt,
      content: b.content,
      author: b.author,
      readTime: b.readTime,
      tags: (b.tags || []).join(', '),
      faqs: b.faqs && b.faqs.length > 0 ? b.faqs : [
        { question: 'उज्जैन कालसर्प दोष पूजा की बुकिंग कैसे करें?', answer: 'आप सीधे हमारे अधिकृत पंडित जी से फोन या व्हाट्सएप पर संपर्क करके तिथि बुक कर सकते हैं।' },
      ],
      status: b.status,
    });
    setModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map((s) => s.trim()) : [],
      };

      if (editingBlog) {
        await blogService.updateBlog(editingBlog._id, payload);
        await showAlert.success('Updated', 'Blog article updated successfully');
      } else {
        await blogService.createBlog(payload);
        await showAlert.success('Created', 'New Blog article created successfully');
      }
      setModalOpen(false);
      loadBlogs();
    } catch (err: any) {
      showAlert.error('Validation Error', err.message);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'clean'],
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Manage Spiritual Articles</h3>
        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
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
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-amber-50/40">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-8 rounded-lg overflow-hidden border border-[#eadfce]">
                        <Image
                          src={b.featuredImage.startsWith('/uploads') ? `http://localhost:5000${b.featuredImage}` : b.featuredImage}
                          alt={b.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f] max-w-xs truncate">{b.title}</td>
                    <td className="py-3 px-4">{b.category}</td>
                    <td className="py-3 px-4">{b.author}</td>
                    <td className="py-3 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-[10px] font-extrabold uppercase border border-[#eadfce] ${
                          b.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="hidden">Hidden</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(b)}
                        className="p-1.5 rounded-lg border border-[#eadfce] text-[#7a1f1f]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b._id, b.title)}
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
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#eadfce]">
            <div className="flex items-center justify-between border-b border-[#eadfce] pb-3">
              <h3 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
                {editingBlog ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200 text-[#7a1f1f] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Featured Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
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
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#75695d] mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              {/* ReactQuill Rich Text Editor */}
              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">
                  Rich Text Content (React Quill Editor)
                </label>
                <div className="rounded-xl border border-[#eadfce] overflow-hidden bg-[#fffaf2]">
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={formData.content}
                    onChange={(newContent) => setFormData({ ...formData, content: newContent })}
                    className="h-64 mb-12"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">SEO Search Keywords & Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="महाकाल मंदिर, उज्जैन दर्शन, कालसर्प दोष पूजा, मंगलनाथ"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
                />
              </div>

              {/* Custom FAQs Manager for Article */}
              <div className="space-y-3 pt-2 border-t border-[#eadfce]">
                <div className="flex items-center justify-between">
                  <label className="block font-bold uppercase text-[#7a1f1f]">Article Custom FAQs (सवाल & जवाब)</label>
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
                  className="px-5 py-2 rounded-xl border border-[#eadfce] font-bold text-[#75695d]"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-saffron-gradient text-white px-6 py-2 rounded-xl font-bold shadow-md">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
