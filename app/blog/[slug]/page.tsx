'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { blogService } from '../../../services/blogService';
import { Blog } from '../../../types';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      blogService.getBlogBySlug(slug).then((data) => {
        setBlog(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf2]">
        <Navbar />
        <div className="pt-32"><LoadingSpinner /></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffaf2]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <h1 className="heading-spiritual text-3xl font-bold text-[#7a1f1f]">Article Not Found</h1>
          <p className="text-sm text-[#75695d] mt-2 mb-6">The blog post you requested does not exist.</p>
          <Link href="/blog" className="bg-saffron-gradient text-white px-6 py-2.5 rounded-full font-semibold">
            Back to All Articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#c96b18] hover:text-[#8f3f12]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 text-center">
          <span className="bg-amber-100 text-[#8f3f12] text-xs font-bold px-3 py-1 rounded-full inline-block">
            {blog.category}
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f] leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-xs text-[#75695d] pt-2">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#c96b18]" />
              <span>By {blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#c96b18]" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-spiritual border border-[#eadfce] bg-amber-950/10">
          <Image src={blog.featuredImage} alt={blog.title} fill className="object-cover" />
        </div>

        {/* Article Content */}
        <article className="bg-white p-8 sm:p-12 rounded-3xl border border-[#eadfce] shadow-sm prose prose-amber max-w-none text-[#2b2118] leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
