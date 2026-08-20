'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/blog/BlogCard';
import { Blog } from '@/types/blog';

interface BlogClientListingProps {
  initialBlogs: Blog[];
}

export default function BlogClientListing({ initialBlogs }: BlogClientListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(initialBlogs.map((b) => b.category)));

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-[#fffaf2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Vedic Wisdom & Insights"
          title="Spiritual Knowledge & Guidance"
          subtitle="Explore authentic articles on Mahakal Vidhi, Panchang Tithis, Astrological Remedies, and Ujjain Pilgrimage Guides."
        />

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#75695d] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search spiritual articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-[#75695d] absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#eadfce] rounded-3xl p-12 text-center my-10 max-w-md mx-auto">
            <p className="heading-spiritual text-2xl font-bold text-[#8f3f12] mb-2">
              No Articles Found
            </p>
            <p className="text-sm text-[#75695d] mb-6">
              Try adjusting your search criteria or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="bg-saffron-gradient text-white text-xs font-bold px-6 py-3 rounded-full shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
