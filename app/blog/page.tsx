import { getBlogs } from '@/services/blogService';
import BlogClientListing from '@/components/blog/BlogClientListing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spiritual Knowledge & Blog | Mahakal Pandit',
  description:
    'Read authentic articles on Mahakal Vidhi, Rudrabhishek benefits, Kaal Sarp Dosh remedies, and auspicious Panchang Muhurats.',
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogClientListing initialBlogs={blogs} />;
}
