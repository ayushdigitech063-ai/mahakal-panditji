'use client';

import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-widest font-semibold text-[#c96b18] bg-[#c96b18]/10 px-3 py-1 rounded-full inline-block mb-3 border border-[#c96b18]/20">
          {eyebrow}
        </span>
      )}
      <h2 className="heading-spiritual text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8f3f12] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[#75695d] font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
