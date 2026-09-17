'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  UserCheck,
  MessageSquare,
  CheckCircle,
  ShieldCheck,
  Tag,
  Sparkles,
  Truck,
  Search,
  ChevronRight,
  Award,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { productService } from '@/services/productService';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { resolveImageUrl } from '@/lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedSearch, setRelatedSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      productService.getProductBySlug(slug).then((data) => {
        setProduct(data);
        if (data) {
          productService.getProducts().then((allProds) => {
            const related = allProds.filter(
              (p) => (p._id || p.id) !== (data._id || data.id)
            );
            setRelatedProducts(related);
          });
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf2]">
        <Navbar />
        <div className="pt-36 flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffaf2]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-36 pb-20 px-4 text-center">
          <ShoppingBag className="w-14 h-14 text-[#c96b18] mb-4" />
          <h1 className="heading-spiritual text-3xl font-bold text-[#7a1f1f]">
            Product Not Found
          </h1>
          <p className="text-sm text-[#75695d] mt-2 mb-6">
            The requested sacred product is unavailable or has been removed.
          </p>
          <Link
            href="/products"
            className="bg-saffron-gradient text-white px-6 py-2.5 rounded-full font-semibold shadow-md"
          >
            Back to Products Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const panditObj = typeof product.panditId === 'object' && product.panditId !== null ? product.panditId : null;
  const panditName = panditObj?.name || product.panditName || 'Mahakal Pandit Seva Ujjain';
  const panditPhone = panditObj?.whatsAppNumber || '919876543210';
  const panditSlug = panditObj?.slug;

  const message = `Pranam Pandit Ji, I want to order the sacred product: "${product.name}" (Price: ₹${product.price.toLocaleString('en-IN')}). Associated Pandit Ji: ${panditName}. Please confirm availability and shipping details.`;
  const whatsappUrl = `https://wa.me/${panditPhone}?text=${encodeURIComponent(message)}`;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const imgSrc = resolveImageUrl(product.image, '/images/products/sample.jpg');

  const filteredRelated = relatedProducts.filter((rel) => {
    if (!relatedSearch.trim()) return true;
    const q = relatedSearch.toLowerCase();
    return (
      rel.name.toLowerCase().includes(q) ||
      rel.category.toLowerCase().includes(q) ||
      rel.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2] text-[#2b2118]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#c96b18] hover:text-[#8f3f12] bg-white px-4 py-2 rounded-full border border-[#eadfce] shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Sacred Products</span>
          </Link>

          <span className="text-xs font-semibold text-[#75695d] hidden sm:inline-block">
            Home / Products / <span className="text-[#7a1f1f]">{product.name}</span>
          </span>
        </div>

        {/* Premium Product Detail Card Layout */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-5 sm:p-8 md:p-10 shadow-spiritual grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image & Badges (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-72 sm:h-96 md:h-[400px] rounded-3xl overflow-hidden bg-amber-950/10 border border-[#eadfce] shadow-md group">
              <Image
                src={imgSrc}
                alt={product.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Category Badge Top Left */}
              <div className="absolute top-3 left-3 z-10 max-w-[55%]">
                <span className="bg-[#7a1f1f] text-amber-200 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md border border-amber-400/40 flex items-center gap-1.5 truncate">
                  <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{product.category || 'Puja Samagri'}</span>
                </span>
              </div>

              {/* Stock Status Top Right */}
              <div className="absolute top-3 right-3 z-10">
                {product.inStock !== false ? (
                  <span className="bg-emerald-950/85 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>In Stock</span>
                  </span>
                ) : (
                  <span className="bg-rose-950/85 backdrop-blur-md text-rose-300 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-500/40">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Trust Features Bar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#fffaf2] p-3.5 rounded-2xl border border-[#eadfce] flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-[11px]">
                  <div className="font-bold text-[#7a1f1f]">100% Consecrated</div>
                  <div className="text-[#75695d]">Abhishekit in Ujjain</div>
                </div>
              </div>

              <div className="bg-[#fffaf2] p-3.5 rounded-2xl border border-[#eadfce] flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#c96b18] shrink-0" />
                <div className="text-[11px]">
                  <div className="font-bold text-[#7a1f1f]">Express Delivery</div>
                  <div className="text-[#75695d]">All India Speed Post</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pandit Card, Pricing, WhatsApp Order Action (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18]">
                  Mahakal Ujjain Sacred Item
                </span>
                <h1 className="heading-spiritual text-2xl sm:text-4xl font-extrabold text-[#7a1f1f] mt-1.5 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price & Savings Badge */}
              <div className="bg-[#fffaf2] p-4.5 rounded-2xl border border-[#eadfce] flex flex-wrap items-baseline gap-3">
                <div className="text-xs font-bold text-[#75695d] uppercase tracking-wider w-full mb-1">
                  Dakshina / Price
                </div>
                <span className="text-3xl font-extrabold text-[#7a1f1f]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice ? (
                  <span className="text-base text-gray-400 line-through font-semibold">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                ) : null}
                {discountPercent && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                    Save {discountPercent}% Instant
                  </span>
                )}
              </div>

              {/* Pandit Ji Display Card (Static Info Only) */}
              <div className="bg-amber-50/80 p-3.5 sm:p-4 rounded-2xl border border-amber-200 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md shrink-0 bg-amber-100">
                  <Image
                    src={resolveImageUrl(panditObj?.image, '/images/pandits/pandit1.jpg')}
                    alt={panditName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#c96b18] block tracking-wider">
                    Associated Priest / Pandit Ji
                  </span>
                  <span className="font-extrabold text-[#7a1f1f] text-sm sm:text-base block">
                    {panditName}
                  </span>
                </div>
              </div>

              {/* Product Overview Description */}
              <div className="space-y-2 pt-1">
                <h3 className="font-bold text-sm text-[#2b2118] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c96b18]" />
                  <span>Product Overview & Spiritual Significance</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#75695d] leading-relaxed whitespace-pre-line bg-[#fffaf2] p-4 rounded-2xl border border-[#eadfce]/80">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Order Button */}
            <div className="pt-4 border-t border-[#eadfce] space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm sm:text-base font-extrabold py-4 px-6 rounded-2xl shadow-spiritual hover:scale-[1.01] transition-all flex items-center justify-center gap-3 text-center"
              >
                <MessageSquare className="w-5 h-5 fill-current shrink-0" />
                <span>Order Now on WhatsApp (No Online Payment Required)</span>
              </a>

              <p className="text-xs text-[#75695d] text-center font-medium">
                Clicking opens direct WhatsApp connection with {panditName} for instant confirmation & dispatch details.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Showcase with Search Filter */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-[#eadfce] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="heading-spiritual text-xl sm:text-2xl font-bold text-[#7a1f1f]">
                More Sacred Products & Samagri
              </h2>
              <p className="text-xs text-[#75695d] mt-1">
                Explore related Shivlingas, Rudrakshas, Yantras & Puja Items.
              </p>
            </div>

            {/* Related Products Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#c96b18] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={relatedSearch}
                onChange={(e) => setRelatedSearch(e.target.value)}
                placeholder="Search related products..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[#eadfce] bg-white text-[#2b2118] focus:outline-none focus:border-[#c96b18]"
              />
            </div>
          </div>

          {filteredRelated.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-[#eadfce] text-center text-xs text-[#75695d]">
              No related products found matching "{relatedSearch}".
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredRelated.slice(0, 8).map((rel) => {
                const rKey = rel._id || rel.id || rel.slug;
                return <ProductCard key={rKey} product={rel} />;
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
