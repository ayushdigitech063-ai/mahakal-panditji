'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Blog } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group bg-white border border-[#eadfce] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        <div className="relative w-full h-48 overflow-hidden bg-amber-900/10">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 bg-glass text-[#8f3f12] text-xs font-bold px-3 py-1 rounded-full border border-[#c96b18]/30">
            {blog.category}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-xs text-[#75695d] mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#c96b18]" />
              {blog.publishDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c96b18]" />
              {blog.readTime}
            </span>
          </div>

          <h3 className="heading-spiritual text-xl font-bold text-[#8f3f12] group-hover:text-[#c96b18] transition-colors leading-snug mb-3">
            {blog.title}
          </h3>

          <p className="text-xs text-[#75695d] line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 border-t border-[#eadfce]/50 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden relative bg-[#c96b18]/20">
            <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
          </div>
          <span className="text-xs font-semibold text-[#2b2118]">{blog.author.name}</span>
        </div>

        <Link
          href={`/blog/${blog.slug}`}
          className="text-xs font-bold text-[#c96b18] hover:text-[#8f3f12] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          <span>Read More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
