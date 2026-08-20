'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/blog/BlogCard';
import { Blog } from '@/types/blog';

interface BlogSectionProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  return (
    <section className="py-20 bg-[#fffaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="धार्मिक ज्ञान एवं गाइड"
          title="धार्मिक लेख एवं महाकाल दर्शन गाइड"
          subtitle="महाकाल दर्शन, रुद्राभिषेक एवं दोष निवारण संबंधी प्रामाणिक लेख पढ़ें"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-saffron-gradient text-white px-8 py-3.5 rounded-full font-bold shadow-spiritual hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <span>सभी लेख पढ़ें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
