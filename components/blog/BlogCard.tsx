'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Blog } from '../../types';

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <article className="bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group">
      <div className="relative h-48 w-full overflow-hidden bg-amber-950/10">
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 bg-glass border border-amber-300 text-[#8f3f12] text-xs font-bold px-3 py-1 rounded-full">
          {blog.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-4 text-xs text-[#75695d] mb-2">
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#c96b18]" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c96b18]" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <h3 className="heading-spiritual text-lg font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors leading-snug line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-xs text-[#75695d] mt-2 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-2 border-t border-[#eadfce]">
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c96b18] hover:text-[#8f3f12] transition-colors"
          >
            <span>Read Full Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
