'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BlogCard } from '../../components/blog/BlogCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { blogService } from '../../services/blogService';
import { Blog } from '../../types';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await blogService.getBlogs();
      setBlogs(data);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
            Vedic Wisdom & Astrology
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Spiritual Articles & Guidance
          </h1>
          <p className="text-sm text-[#75695d]">
            Deep dive into Vedic scriptures, Ujjain temple history, and planetary dosha remedies written by expert Pandits.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
