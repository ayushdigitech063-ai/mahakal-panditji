'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Eye, EyeOff, Trash2, Edit, Upload, X, ShoppingBag, UserCheck } from 'lucide-react';
import { productService } from '@/services/productService';
import { panditService } from '@/services/panditService';
import { apiClient } from '@/lib/apiClient';
import { Product, Pandit } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    images: [] as string[],
    price: 1100,
    originalPrice: 1500,
    category: 'Puja Samagri',
    description: '',
    panditId: '',
    inStock: true,
    isActive: true,
  });

  // Filters State for Admin Table
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [selectedStockFilter, setSelectedStockFilter] = useState('ALL');
  const [selectedPanditFilter, setSelectedPanditFilter] = useState('ALL');

  const loadData = async () => {
    try {
      setLoading(true);
      const [productData, panditData] = await Promise.all([
        productService.getAdminProducts(),
        panditService.getPandits(),
      ]);
      setProducts(productData);
      setPandits(panditData);
    } catch (e: any) {
      showAlert.error('Error', e.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (id: string, name: string, currentStatus: boolean) => {
    const confirm = await showAlert.confirm(
      currentStatus ? 'Hide Product?' : 'Show Product?',
      `Are you sure you want to ${currentStatus ? 'hide' : 'show'} ${name}?`
    );
    if (confirm.isConfirmed) {
      try {
        await productService.toggleProductStatus(id);
        await showAlert.success('Success', `Product ${currentStatus ? 'hidden' : 'activated'}`);
        loadData();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirm = await showAlert.confirm('Delete Product?', `Are you sure you want to delete "${name}"?`);
    if (confirm.isConfirmed) {
      try {
        await productService.deleteProduct(id);
        await showAlert.success('Deleted', 'Product deleted successfully');
        loadData();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const files = Array.from(e.target.files);
        const uploadPromises = files.map((file) => apiClient.upload('products', file));
        const results = await Promise.all(uploadPromises);

        const newUrls = results
          .filter((res) => res.success && res.data.url)
          .map((res) => res.data.url);

        if (newUrls.length > 0) {
          setFormData((prev) => {
            const combinedImages = [...prev.images, ...newUrls].slice(0, 6);
            return {
              ...prev,
              image: prev.image || combinedImages[0] || '',
              images: combinedImages,
            };
          });
          showAlert.success('Uploaded', `${newUrls.length} image(s) uploaded successfully`);
        }
      } catch (err: any) {
        showAlert.error('Upload Error', err.message);
      }
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        image: updatedImages[0] || '',
        images: updatedImages,
      };
    });
  };

  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  const defaultPresetCategories = [
    'Puja Samagri',
    'Rudraksha & Mala',
    'Yantra & Idols',
    'Brass & Silver Items',
    'Sacred Threads & Tilak',
    'Other',
  ];

  const availableCategories = Array.from(
    new Set([...defaultPresetCategories, ...products.map((p) => p.category).filter(Boolean)])
  );

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({
      name: '',
      image: '',
      images: [],
      price: 1100,
      originalPrice: 1500,
      category: 'Puja Samagri',
      description: 'Authentic Mahakal Ujjain consecrated sacred item.',
      panditId: pandits.length > 0 ? (pandits[0]._id || pandits[0].id || '') : '',
      inStock: true,
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    const pId = typeof prod.panditId === 'object' && prod.panditId !== null
      ? (prod.panditId._id || prod.panditId.id || '')
      : (prod.panditId || '');

    const cat = prod.category || 'Puja Samagri';
    setIsCustomCategory(!availableCategories.includes(cat));
    setCustomCategoryInput(!availableCategories.includes(cat) ? cat : '');

    const gallery = prod.images && prod.images.length > 0 ? prod.images : (prod.image ? [prod.image] : []);

    setFormData({
      name: prod.name,
      image: prod.image || (gallery[0] || ''),
      images: gallery,
      price: prod.price,
      originalPrice: prod.originalPrice || 0,
      category: cat,
      description: prod.description,
      panditId: pId,
      inStock: prod.inStock !== undefined ? prod.inStock : true,
      isActive: prod.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalCategory = isCustomCategory
        ? (customCategoryInput.trim() || 'Puja Samagri')
        : formData.category;

      const payload = { ...formData, category: finalCategory };

      if (editingProduct) {
        const pId = editingProduct._id || editingProduct.id;
        if (!pId) return;
        await productService.updateProduct(pId, payload);
        showAlert.success('Updated', 'Product details updated successfully');
      } else {
        await productService.createProduct(payload);
        showAlert.success('Created', 'New product added successfully');
      }
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      showAlert.error('Error', err.message || 'Operation failed');
    }
  };

  const filteredProducts = products.filter((prod) => {
    // Search Filter
    const matchesSearch =
      !searchTerm.trim() ||
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prod.category && prod.category.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category Filter
    const matchesCategory =
      selectedCategoryFilter === 'ALL' || prod.category === selectedCategoryFilter;

    // Stock Filter
    const matchesStock =
      selectedStockFilter === 'ALL' ||
      (selectedStockFilter === 'IN_STOCK' && prod.inStock) ||
      (selectedStockFilter === 'OUT_OF_STOCK' && !prod.inStock);

    // Pandit Filter
    const pId = typeof prod.panditId === 'object' && prod.panditId !== null
      ? (prod.panditId._id || prod.panditId.id || '')
      : (prod.panditId || '');

    const matchesPandit =
      selectedPanditFilter === 'ALL' ||
      (selectedPanditFilter === 'GENERAL' && !pId) ||
      pId === selectedPanditFilter;

    return matchesSearch && matchesCategory && matchesStock && matchesPandit;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#eadfce] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#c96b18]" />
            <h1 className="heading-spiritual text-2xl font-bold text-[#7a1f1f]">
              Products & Samagri CMS
            </h1>
          </div>
          <p className="text-xs text-[#75695d] mt-1">
            Upload and manage sacred puja items, malas & samagri assigned to live Pandits for WhatsApp ordering.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#eadfce] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#7a1f1f] uppercase tracking-wider">Filters:</span>
            <span className="text-[11px] bg-amber-100 text-[#8f3f12] font-semibold px-2.5 py-0.5 rounded-full">
              Showing {filteredProducts.length} of {products.length} Products
            </span>
          </div>

          {(searchTerm || selectedCategoryFilter !== 'ALL' || selectedStockFilter !== 'ALL' || selectedPanditFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategoryFilter('ALL');
                setSelectedStockFilter('ALL');
                setSelectedPanditFilter('ALL');
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline transition-colors"
            >
              Reset All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div>
            <label className="block text-[11px] font-bold text-[#75695d] mb-1">Search Product</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or category..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] bg-amber-50/20"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#75695d] mb-1">Category</label>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] bg-white text-[#2b2118]"
            >
              <option value="ALL">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#75695d] mb-1">Stock Status</label>
            <select
              value={selectedStockFilter}
              onChange={(e) => setSelectedStockFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] bg-white text-[#2b2118]"
            >
              <option value="ALL">All Stock Status</option>
              <option value="IN_STOCK">✅ In Stock Only</option>
              <option value="OUT_OF_STOCK">❌ Out of Stock Only</option>
            </select>
          </div>

          {/* Assigned Pandit Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#75695d] mb-1">Assigned Pandit</label>
            <select
              value={selectedPanditFilter}
              onChange={(e) => setSelectedPanditFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18] bg-white text-[#2b2118]"
            >
              <option value="ALL">All Pandits</option>
              <option value="GENERAL">General / Store Only</option>
              {pandits.map((p) => {
                const idVal = p._id || p.id || '';
                return (
                  <option key={idVal} value={idVal}>
                    {p.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-900/5 text-[#7a1f1f] text-xs font-bold border-b border-[#eadfce]">
                <th className="p-4">Product Info</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (₹)</th>
                <th className="p-4">Assigned Pandit Ji</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eadfce]/60 text-xs text-[#2b2118]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#75695d]">
                    No products match the selected filters. Try resetting filters or search term.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => {
                  const pId = prod._id || prod.id;
                  const panditObj = typeof prod.panditId === 'object' ? prod.panditId : null;
                  const panditDisplayName = panditObj?.name || prod.panditName || 'General / Store';

                  return (
                    <tr key={pId} className="hover:bg-amber-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-amber-100 border border-[#eadfce] shrink-0">
                            <Image
                              src={prod.image || '/images/products/sample.jpg'}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-[#2b2118] block text-sm">{prod.name}</span>
                            <span className="text-[10px] text-[#75695d] truncate max-w-xs block">
                              /{prod.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-[#8f3f12]">
                        <span className="bg-amber-100/70 border border-amber-200 px-2.5 py-1 rounded-full text-[10px]">
                          {prod.category}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-[#c96b18]">
                        ₹{prod.price.toLocaleString('en-IN')}
                        {prod.originalPrice ? (
                          <span className="text-[10px] text-gray-400 line-through ml-1">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        ) : null}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-[#7a1f1f] font-medium">
                          <UserCheck className="w-3.5 h-3.5 text-[#c96b18]" />
                          <span>{panditDisplayName}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        {prod.inStock ? (
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-bold text-[10px]">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md font-bold text-[10px]">
                            Out of Stock
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        {prod.isActive ? (
                          <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100/60 px-2.5 py-1 rounded-full border border-emerald-300">
                            Active
                          </span>
                        ) : (
                          <span className="text-gray-500 font-bold text-[10px] bg-gray-100 px-2.5 py-1 rounded-full border border-gray-300">
                            Hidden
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleStatus(pId!, prod.name, prod.isActive)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              prod.isActive
                                ? 'text-amber-700 border-amber-300 hover:bg-amber-100'
                                : 'text-gray-600 border-gray-300 hover:bg-gray-100'
                            }`}
                            title={prod.isActive ? 'Hide Product' : 'Activate Product'}
                          >
                            {prod.isActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="p-1.5 rounded-lg border border-amber-300 text-[#c96b18] hover:bg-amber-100 transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(pId!, prod.name)}
                            className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#eadfce] shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#eadfce] pb-4">
              <h2 className="heading-spiritual text-xl font-bold text-[#7a1f1f] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#c96b18]" />
                <span>{editingProduct ? 'Edit Product' : 'Add New Product'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#75695d] hover:text-[#7a1f1f] p-1 rounded-full hover:bg-amber-100/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2b2118] mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sphatik Shivlinga, Rudraksha Mala"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2b2118] mb-1">
                    Category *
                  </label>
                  <select
                    value={isCustomCategory ? '__CUSTOM__' : formData.category}
                    onChange={(e) => {
                      if (e.target.value === '__CUSTOM__') {
                        setIsCustomCategory(true);
                      } else {
                        setIsCustomCategory(false);
                        setFormData({ ...formData, category: e.target.value });
                      }
                    }}
                    className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18]"
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__CUSTOM__">➕ Add New / Custom Category...</option>
                  </select>

                  {isCustomCategory && (
                    <input
                      type="text"
                      required
                      value={customCategoryInput}
                      onChange={(e) => setCustomCategoryInput(e.target.value)}
                      placeholder="Enter new custom category name..."
                      className="w-full mt-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-[#c96b18] bg-amber-50/50 focus:outline-none focus:border-[#7a1f1f]"
                    />
                  )}
                </div>
              </div>

              {/* Pandit Selection Dropdown */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2">
                <label className="block text-xs font-bold text-[#7a1f1f] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#c96b18]" />
                  <span>Select Live Pandit Ji (Assign Product) *</span>
                </label>
                <select
                  value={formData.panditId}
                  onChange={(e) => setFormData({ ...formData, panditId: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-[#eadfce] bg-white text-[#2b2118] focus:outline-none focus:border-[#c96b18]"
                >
                  <option value="">-- General / No Specific Pandit --</option>
                  {pandits.map((p) => {
                    const idVal = p._id || p.id || '';
                    return (
                      <option key={idVal} value={idVal}>
                        {p.name} ({p.location || 'Ujjain'})
                      </option>
                    );
                  })}
                </select>
                <p className="text-[10px] text-[#75695d]">
                  Selecting a live Pandit Ji routes WhatsApp product enquiry orders directly with that Pandit Ji's details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2b2118] mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2b2118] mb-1">
                    Original MRP Price (₹) [Optional]
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18]"
                  />
                </div>
              </div>

              {/* Product Images Upload (Up to 5-6 Images) */}
              <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#7a1f1f]">
                    Product Images (Upload 4-5 Images) *
                  </label>
                  <span className="text-[10px] text-[#75695d]">
                    {formData.images.length} / 6 Images Added
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => {
                        const updated = [...prev.images];
                        if (updated.length === 0 && val) updated.push(val);
                        else if (val) updated[0] = val;
                        return { ...prev, image: val, images: updated };
                      });
                    }}
                    placeholder="Enter main image URL or upload multiple files..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#eadfce] bg-white focus:outline-none focus:border-[#c96b18]"
                  />
                  <label className="cursor-pointer bg-saffron-gradient text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 shrink-0 hover:scale-105 transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Images</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Gallery Previews Grid */}
                {formData.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {formData.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shadow-xs group bg-gray-100 ${
                          formData.image === imgUrl ? 'border-[#c96b18] ring-2 ring-[#c96b18]/30' : 'border-amber-200'
                        }`}
                      >
                        <Image src={imgUrl} alt={`Product image ${idx + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full shadow-md hover:bg-rose-700 transition-colors"
                          title="Remove Image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {formData.image === imgUrl && (
                          <span className="absolute bottom-0 inset-x-0 bg-[#c96b18] text-white text-[9px] font-bold text-center py-0.5">
                            Main
                          </span>
                        )}
                        {formData.image !== imgUrl && (
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, image: imgUrl }))}
                            className="absolute inset-0 bg-black/40 text-white text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center"
                          >
                            Set Main
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2b2118] mb-1">
                  Product Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe product authenticity, usage, and spiritual benefits..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#eadfce] focus:outline-none focus:border-[#c96b18]"
                />
              </div>

              {/* Stock Status & Visibility Controls */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 space-y-3">
                <label className="block text-xs font-bold text-[#7a1f1f] flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-[#c96b18]" />
                  <span>Product Inventory & Stock Status *</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Stock Status Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#75695d] mb-1">
                      Stock Availability
                    </label>
                    <select
                      value={formData.inStock ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.value === 'true' })}
                      className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-[#eadfce] bg-white text-[#2b2118] focus:outline-none focus:border-[#c96b18]"
                    >
                      <option value="true">✅ In Stock (उपलब्ध है)</option>
                      <option value="false">❌ Out of Stock (स्टॉक खत्म है)</option>
                    </select>
                  </div>

                  {/* Website Visibility Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#75695d] mb-1">
                      Website Visibility
                    </label>
                    <select
                      value={formData.isActive ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                      className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-[#eadfce] bg-white text-[#2b2118] focus:outline-none focus:border-[#c96b18]"
                    >
                      <option value="true">🟢 Active (Visible on Website)</option>
                      <option value="false">🔴 Hidden (Draft Mode)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#eadfce]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 text-xs font-bold text-[#75695d] hover:text-[#2b2118] rounded-full border border-[#eadfce]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-saffron-gradient text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-all"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
