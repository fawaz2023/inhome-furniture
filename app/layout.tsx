import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getFurnitureStoreSchema } from '@/lib/seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#FAF8F5',
};

export const metadata: Metadata = {
  title: {
    default: 'INHOME FURNITURE | Custom Furniture Showcase | Kangeyam, Tamil Nadu',
    template: '%s | INHOME FURNITURE Kangeyam',
  },
  description:
    'Browse custom-crafted sofas, beds, dining sets, and solid wood furniture by INHOME FURNITURE in Kangeyam. Direct WhatsApp consultations with showroom experts.',
  keywords: [
    'INHOME FURNITURE',
    'Kangeyam furniture',
    'custom furniture Tamil Nadu',
    'teak wood sofa Kangeyam',
    'solid wood dining set',
    'teak bed Kangeyam',
    'furniture showroom Kangeyam'
  ],
  authors: [{ name: 'INHOME FURNITURE' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'INHOME FURNITURE',
    title: 'INHOME FURNITURE | Custom Furniture Showcase Kangeyam',
    description:
      'Browse handcrafted sofas, dining tables, teak cots, and custom wooden furniture. Tap to enquire directly on WhatsApp.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app'}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'INHOME FURNITURE Showcase Kangeyam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INHOME FURNITURE | Custom Furniture Kangeyam',
    description: 'Custom-crafted solid wood furniture in Kangeyam, Tamil Nadu. Enquire directly on WhatsApp.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app'}/og-default.jpg`],
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
        },
      }
    : {}),
};

import { Suspense } from 'react';
import PageViewBeacon from '@/components/analytics/PageViewBeacon';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let storeSchema;
  try {
    const { getServerShopSettings } = await import('@/lib/supabase-server');
    const settings = await getServerShopSettings();
    const phone = settings?.phone && settings.phone !== '+919999999999' ? settings.phone : undefined;
    storeSchema = getFurnitureStoreSchema(phone, undefined);
  } catch {
    storeSchema = getFurnitureStoreSchema();
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <PageViewBeacon />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
