import { Blog } from '@/types/blog';
import { SEEDED_BLOGS } from '@/data/blogs';
import { apiClient } from '@/lib/apiClient';
import { ENDPOINTS } from '@/lib/endpoints';

export async function getBlogs(): Promise<Blog[]> {
  try {
    const data = await apiClient.get<Blog[]>(ENDPOINTS.blogs);
    return data;
  } catch {
    return SEEDED_BLOGS;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  try {
    const data = await apiClient.get<Blog>(`${ENDPOINTS.blogs}/${slug}`);
    return data;
  } catch {
    return SEEDED_BLOGS.find((b) => b.slug === slug);
  }
}
