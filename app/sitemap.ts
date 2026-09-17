import { MetadataRoute } from 'next';
import { panditService } from '@/services/panditService';
import { poojaService } from '@/services/poojaService';
import { productService } from '@/services/productService';
import { blogService } from '@/services/blogService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjain-mahakal.vercel.app';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/pandits`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/pooja`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/hotels`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tours`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/travel`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/packages`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/sitemap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    const [pandits, poojas, products, blogs] = await Promise.all([
      panditService.getPandits().catch(() => []),
      poojaService.getPoojas().catch(() => []),
      productService.getProducts().catch(() => []),
      blogService.getBlogs().catch(() => []),
    ]);

    const panditRoutes: MetadataRoute.Sitemap = (pandits || []).map((p) => ({
      url: `${baseUrl}/pandit/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const poojaRoutes: MetadataRoute.Sitemap = (poojas || []).map((p) => ({
      url: `${baseUrl}/pooja/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const productRoutes: MetadataRoute.Sitemap = (products || []).map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const blogRoutes: MetadataRoute.Sitemap = (blogs || []).map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticRoutes, ...panditRoutes, ...poojaRoutes, ...productRoutes, ...blogRoutes];
  } catch (error) {
    return staticRoutes;
  }
}
