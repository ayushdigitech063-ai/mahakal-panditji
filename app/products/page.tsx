'use client';

import React, { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Search,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  Check,
  X,
  Filter,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { productService } from '@/services/productService';
import { panditService } from '@/services/panditService';
import { ProductCard } from '@/components/product/ProductCard';
import { Product, Pandit } from '@/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPandit, setSelectedPandit] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodList, panditList] = await Promise.all([
          productService.getProducts(),
          panditService.getPandits(),
        ]);
        setProducts(prodList);
        setPandits(panditList);
      } catch (err) {
        console.error('Failed to load products page data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const defaultCategories = [
    'Puja Samagri',
    'Rudraksha & Mala',
    'Yantra & Idols',
    'Brass & Silver',
    'Sacred Threads & Tilak',
  ];

  const categories = Array.from(
    new Set([
      'All',
      ...defaultCategories,
      ...products.map((p) => p.category).filter(Boolean),
    ])
  );

  const filteredProducts = products.filter((item) => {
    // Category Filter
    if (
      selectedCategory !== 'All' &&
      !item.category?.toLowerCase().includes(selectedCategory.toLowerCase())
    ) {
      return false;
    }
    // Pandit Filter
    if (selectedPandit !== 'All') {
      const pId =
        typeof item.panditId === 'object' && item.panditId !== null
          ? item.panditId._id || item.panditId.id
          : item.panditId;
      if (pId !== selectedPandit) return false;
    }
    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    // Max Price
    if (item.price > maxPrice) return false;
    // In Stock Only
    if (inStockOnly && item.inStock === false) return false;

    return true;
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedPandit('All');
    setSearchQuery('');
    setMaxPrice(10000);
    setInStockOnly(false);
  };

  const FilterContent = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-[#eadfce] pb-3.5">
        <div className="flex items-center gap-2 text-[#7a1f1f] font-bold text-base">
          <SlidersHorizontal className="w-4.5 h-4.5 text-[#c96b18]" />
          <span>Filter Products</span>
        </div>
        <button
          onClick={handleResetFilters}
          className="text-[11px] font-bold text-[#c96b18] hover:text-[#8f3f12] flex items-center gap-1 transition-colors"
          title="Reset Filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#75695d]">Search Products</label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#c96b18] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rudraksha, Shivlinga, Samagri..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#eadfce] bg-[#fffaf2] text-[#2b2118] focus:outline-none focus:border-[#c96b18]"
          />
        </div>
      </div>

      {/* Categories Filter List */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#75695d]">Category</label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                selectedCategory === cat
                  ? 'bg-saffron-gradient text-white shadow-xs'
                  : 'text-[#2b2118] hover:bg-amber-50/80 border border-transparent'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Range Filter */}
      <div className="space-y-2 pt-3 border-t border-[#eadfce]">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#75695d]">Max Price</span>
          <span className="text-[#7a1f1f]">₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min={200}
          max={10000}
          step={200}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#c96b18] cursor-pointer"
        />
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-2 border-t border-[#eadfce]">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2b2118]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 text-[#c96b18] rounded accent-[#c96b18]"
          />
          <span>In Stock Items Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2] text-[#2b2118] relative">
      {/* Top Main Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        {/* Hero Header Banner */}
        <section className="bg-spiritual-gradient text-white py-10 sm:py-14 px-4 relative overflow-hidden border-b border-amber-900/40">
          <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
            <span className="text-xs font-bold tracking-widest text-amber-300 uppercase bg-black/40 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Mahakal Ujjain Consecrated Samagri</span>
            </span>

            <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-amber-200">
              Sacred Puja Products & Samagri
            </h1>

            <p className="text-xs sm:text-base text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
              Pure, authentic Shivlingas, energized Rudrakshas, Yantras & Puja Samagri curated directly by experienced Ujjain Pandit Jis.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Genuine & Consecrated</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-xs">
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Direct WhatsApp Order (No Online Payment Needed)</span>
              </span>
            </div>
          </div>
        </section>

        {/* 2-Column Section: Left Filter Sidebar + Right Products Grid */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* DESKTOP LEFT FILTER SIDEBAR */}
            <aside className="hidden lg:block w-80 shrink-0 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-[#eadfce] shadow-spiritual sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <FilterContent />
              </div>
            </aside>

            {/* RIGHT PRODUCTS SHOWCASE GRID */}
            <div className="flex-1 w-full space-y-4 sm:space-y-6">
              {/* Top Result Summary Bar */}
              <div className="bg-white p-3 px-4 sm:p-4 sm:px-6 rounded-2xl border border-[#eadfce] shadow-xs flex items-center justify-between text-xs font-bold text-[#75695d]">
                <div>
                  Showing <span className="text-[#7a1f1f] font-extrabold">{filteredProducts.length}</span> sacred product{filteredProducts.length !== 1 ? 's' : ''}
                </div>
                {selectedCategory !== 'All' && (
                  <span className="bg-amber-100 text-[#8f3f12] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-amber-200 text-[10px] sm:text-xs">
                    {selectedCategory}
                  </span>
                )}
              </div>

              {/* Product Grid (2 Items per row on mobile!) */}
              {loading ? (
                <div className="py-20 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#eadfce] text-center space-y-4 shadow-xs">
                  <ShoppingBag className="w-12 h-12 text-[#c96b18] mx-auto opacity-50" />
                  <h3 className="heading-spiritual text-lg sm:text-xl font-bold text-[#7a1f1f]">
                    No Sacred Products Found
                  </h3>
                  <p className="text-xs text-[#75695d] max-w-md mx-auto">
                    No products match your selected filter criteria. Try resetting your search filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="bg-saffron-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:scale-105 transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 w-full">
                  {filteredProducts.map((product) => {
                    const keyId = product._id || product.id || product.slug;
                    return <ProductCard key={keyId} product={product} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE FLOATING FILTER BUTTON (BOTTOM LEFT CORNER) */}
      <button
        type="button"
        onClick={() => setMobileFilterOpen(true)}
        className="fixed bottom-6 left-6 z-40 lg:hidden bg-saffron-gradient text-white text-xs font-extrabold px-4.5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-amber-300/40 hover:scale-105 transition-all"
        aria-label="Open Filters"
      >
        <Filter className="w-4 h-4 fill-white" />
        <span>Filter Products</span>
      </button>

      {/* MOBILE LEFT SLIDE-OVER FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex lg:hidden">
          <div
            className="fixed inset-0 cursor-pointer"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative z-10 bg-white w-80 max-w-[85vw] h-full p-6 overflow-y-auto space-y-4 border-r border-[#eadfce] shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-[#eadfce] pb-3">
              <span className="heading-spiritual text-base font-bold text-[#7a1f1f]">Product Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full bg-amber-100 text-[#7a1f1f] hover:bg-amber-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterContent />

            <div className="pt-3 border-t border-[#eadfce]">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-saffron-gradient text-white font-bold py-3 rounded-2xl shadow-md text-xs"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
