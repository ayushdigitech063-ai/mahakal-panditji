import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { getBlogBySlug, getBlogs } from '@/services/blogService';
import BlogCard from '@/components/blog/BlogCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);
  if (!blog) return { title: 'Article Not Found | Mahakal Pandit' };

  return {
    title: `${blog.title} | Mahakal Pandit Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);
  const allBlogs = await getBlogs();

  if (!blog) {
    notFound();
  }

  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <article className="bg-[#fffaf2] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8f3f12] hover:text-[#c96b18] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <span className="bg-[#c96b18]/10 text-[#8f3f12] text-xs font-bold px-3 py-1 rounded-full">
            {blog.category}
          </span>

          <h1 className="heading-spiritual text-3xl sm:text-5xl font-bold text-[#8f3f12] leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-[#eadfce] py-4 text-xs text-[#75695d]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden relative bg-[#c96b18]/20">
                <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
              </div>
              <div>
                <strong className="block text-[#2b2118]">{blog.author.name}</strong>
                <span className="text-[10px] text-[#75695d]">{blog.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#c96b18]" />
                {blog.publishDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#c96b18]" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
        </div>

        {/* Article Body */}
        <div
          className="prose prose-amber max-w-none text-[#2b2118] text-base leading-relaxed space-y-4 bg-white p-6 sm:p-10 rounded-3xl border border-[#eadfce] shadow-sm"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        <div className="flex items-center gap-2 pt-4">
          <Tag className="w-4 h-4 text-[#c96b18]" />
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-white border border-[#eadfce] text-[#75695d] px-3 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="pt-12 space-y-6">
            <h2 className="heading-spiritual text-2xl sm:text-3xl font-bold text-[#8f3f12]">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
