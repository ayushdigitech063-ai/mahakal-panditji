export interface Pandit {
  _id: string;
  name: string;
  slug: string;
  image: string;
  experience: number;
  location: string;
  languages: string[];
  specializations: string[];
  tags?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  poojasCompleted?: number;
  rating: number;
  reviewsCount: number;
  phone: string;
  email: string;
  whatsAppNumber?: string;
  shortDescription: string;
  bio: string;
  isVerified: boolean;
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pooja {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  benefits: string[];
  procedure: string[];
  duration: string;
  samagri: string[];
  price: number;
  category: string;
  tags?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  status: 'draft' | 'published' | 'hidden';
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  panditId?: string;
  panditName?: string;
  isApproved: boolean;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Festival {
  _id: string;
  title: string;
  year: string;
  festivalName: string;
  dateText: string;
  poojaName: string;
  description: string;
  image: string;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  favicon: string;
  phone: string;
  email: string;
  whatsApp: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  footerText: string;
  copyrightText: string;
  seoTitle: string;
  seoDescription: string;
}

export interface HomepageSettings {
  announcement: {
    text: string;
    ctaText: string;
    ctaLink: string;
    isVisible: boolean;
  };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
    videoUrl: string;
    fallbackImageUrl: string;
    isVisible: boolean;
  };
  stats: Array<{
    number: string;
    label: string;
    iconName: string;
    isVisible: boolean;
  }>;
  panditSection: {
    heading: string;
    description: string;
    countToShow: number;
    isVisible: boolean;
  };
  poojaSection: {
    heading: string;
    description: string;
    isVisible: boolean;
  };
  festivalSection: {
    heading: string;
    year: string;
    isVisible: boolean;
  };
  blogSection: {
    heading: string;
    countToShow: number;
    isVisible: boolean;
  };
  contactSection: {
    heading: string;
    description: string;
    isVisible: boolean;
  };
  homepageFaqs?: Array<{ question: string; answer: string }>;
  homepageTags?: string[];
  websiteShortDescription?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
  errors?: Record<string, string[]>;
}

export * from './newModules';
