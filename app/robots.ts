import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/harmony-mockup/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
