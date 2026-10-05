import { MetadataRoute } from 'next';
import { getMockCategories, getMockProductsByCategorySlug } from '@/lib/mock-data';

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in';
  const currentDate = new Date().toISOString();

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dynamic category routes
  const categories = getMockCategories();
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: cat.updated_at || currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = [];
  for (const cat of categories) {
    const products = getMockProductsByCategorySlug(cat.slug);
    for (const prod of products) {
      productRoutes.push({
        url: `${baseUrl}/${cat.slug}/${prod.slug}`,
        lastModified: prod.updated_at || currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    }
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
