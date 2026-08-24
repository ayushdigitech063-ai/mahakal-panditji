'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User, Clock, ArrowLeft, HelpCircle, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { blogService } from '../../../services/blogService';
import { Blog } from '../../../types';
import { resolveImageUrl } from '@/lib/api';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  const defaultFaqs = [
    {
      question: `${blog.title} से जुड़ी मुख्य आध्यात्मिक जानकारी क्या है?`,
      answer: `यह आलेख उज्जैन धाम, भगवान महाकाल एवं वैदिक पूजा परंपराओं के रहस्यों एवं सही विधि को समझने में सहायता करता है।`,
    },
    {
      question: 'क्या हम इन अनुष्ठानों के लिए सीधे पंडित जी से बात कर सकते हैं?',
      answer: 'जी हाँ, हमारी वेबसाइट पर उपलब्ध किसी भी पंडित जी से आप सीधे व्हाट्सएप या फोन पर संपर्क करके अपना मुहूर्त बुक कर सकते हैं।',
    },
  ];

  const defaultTags = blog.tags && blog.tags.length > 0 
    ? blog.tags 
    : ['उज्जैन दर्शन', 'महाकाल मंदिर', 'वैदिक अनुष्ठान', 'कालसर्प दोष', 'मंगलनाथ'];

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
          <span className="bg-amber-100 text-[#8f3f12] text-xs font-bold px-3.5 py-1 rounded-full inline-block border border-amber-300">
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

        {/* Featured Image */}
        <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-spiritual border border-[#eadfce] bg-amber-950/10">
          <Image src={resolveImageUrl(blog.featuredImage)} alt={blog.title} fill className="object-cover" />
        </div>

        {/* Article Body Content */}
        <article className="bg-white p-6 sm:p-12 rounded-3xl border border-[#eadfce] shadow-sm text-[#2b2118] leading-relaxed break-words overflow-hidden">
          <div
            className="space-y-4 font-normal text-sm sm:text-base text-[#2b2118] [&>p]:leading-relaxed [&>h1]:heading-spiritual [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-[#7a1f1f] [&>h2]:heading-spiritual [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-[#7a1f1f] [&>h3]:heading-spiritual [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-[#7a1f1f] [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Article Custom FAQs Section */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-[#eadfce] pb-4">
            <HelpCircle className="w-6 h-6 text-[#c96b18]" />
            <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
              इस आलेख से जुड़े प्रमुख प्रश्न (FAQs)
            </h3>
          </div>

          <div className="space-y-3">
            {((blog.faqs && blog.faqs.length > 0) ? blog.faqs : defaultFaqs).map((faq: any, index: number) => {
              const isOpen = openFaqIndex === index;
              const questionText = faq.question;
              const answerText = faq.answer;

              return (
                <div
                  key={index}
                  className="bg-[#fffaf2] rounded-2xl border border-[#eadfce] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#7a1f1f] text-sm sm:text-base hover:bg-amber-100/40 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-[#c96b18]">Q{index + 1}.</span>
                      <span>{questionText}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#c96b18] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#75695d] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#75695d] border-t border-[#eadfce]/50 leading-relaxed bg-white/70">
                      {answerText}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Article SEO Keywords & Tags Bar */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#eadfce] pb-3">
            <Tag className="w-5 h-5 text-[#c96b18]" />
            <h3 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">
              Related Topics & Keywords (टैग्स)
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {defaultTags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold bg-amber-50 text-[#8f3f12] border border-amber-200 px-3.5 py-1.5 rounded-full hover:bg-amber-100 transition-colors cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
