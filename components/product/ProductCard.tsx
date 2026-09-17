'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserCheck, MessageSquare, CheckCircle, Tag } from 'lucide-react';
import { Product } from '@/types';
import { resolveImageUrl } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const panditObj = typeof product.panditId === 'object' && product.panditId !== null ? product.panditId : null;
  const panditName = panditObj?.name || product.panditName || 'Mahakal Pandit Seva';
  const panditPhone = panditObj?.whatsAppNumber || '919876543210';

  const message = `Pranam Pandit Ji, I want to order the sacred product: "${product.name}" (Price: ₹${product.price.toLocaleString('en-IN')}). Associated Pandit Ji: ${panditName}. Please confirm availability and shipping details.`;
  const whatsappUrl = `https://wa.me/${panditPhone}?text=${encodeURIComponent(message)}`;

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const imgSrc = resolveImageUrl(product.image, '/images/products/sample.jpg');

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfce] overflow-hidden shadow-spiritual hover:shadow-spiritual-hover transition-all duration-300 flex flex-col group h-full">
      {/* Product Image & Badges */}
      <Link href={`/products/${product.slug}`} className="relative h-36 sm:h-52 w-full overflow-hidden bg-amber-950/10 block cursor-pointer">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Category Pill Top Left */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 max-w-[55%]">
          <span className="bg-[#7a1f1f] text-amber-200 text-[8px] sm:text-[10px] font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md border border-amber-400/40 flex items-center gap-0.5 truncate">
            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
            <span className="truncate">{product.category || 'Samagri'}</span>
          </span>
        </div>

        {/* Stock Status Top Right */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          {product.inStock !== false ? (
            <span className="bg-emerald-950/85 backdrop-blur-md text-emerald-300 text-[8px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-emerald-500/40 flex items-center gap-0.5">
              <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
              <span>In Stock</span>
            </span>
          ) : (
            <span className="bg-rose-950/85 backdrop-blur-md text-rose-300 text-[8px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-rose-500/40">
              Out of Stock
            </span>
          )}
        </div>

        {/* Pandit Ji Badge Bottom */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-2.5 sm:left-3 sm:right-3 flex items-center justify-between text-white text-xs z-10">
          <span className="bg-black/75 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-amber-300/30 flex items-center gap-1 truncate max-w-full">
            <UserCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
            <span className="truncate font-semibold text-amber-200 text-[9px] sm:text-[11px]">
              {panditName}
            </span>
          </span>
        </div>
      </Link>

      {/* Product Content Body */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
        <div className="space-y-1">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="heading-spiritual text-xs sm:text-base font-bold text-[#2b2118] group-hover:text-[#c96b18] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-[10px] sm:text-xs text-[#75695d] line-clamp-2 leading-tight sm:leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Full Width WhatsApp Action */}
        <div className="pt-2 sm:pt-3 border-t border-[#eadfce] space-y-2 sm:space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] sm:text-[11px] font-medium text-[#75695d]">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-base font-extrabold text-[#7a1f1f]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice ? (
                <span className="text-[9px] sm:text-xs text-gray-400 line-through font-medium">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              ) : null}
              {discountPercent && (
                <span className="text-[8px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1 sm:gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
            <span className="truncate">Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
