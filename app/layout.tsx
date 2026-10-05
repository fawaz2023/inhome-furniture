import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyBottomBar from '@/components/layout/StickyBottomBar';
import { getFurnitureStoreSchema } from '@/lib/seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#FAF8F5',
};

export const metadata: Metadata = {
  title: 'INHOME FURNITURE | Custom Furniture Showcase | Kangeyam, Tamil Nadu',
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in'),
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
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
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
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || 'google-site-verification-token',
  },
};

import { Suspense } from 'react';
import { getServerShopSettings } from '@/lib/supabase-server';
import PageViewBeacon from '@/components/analytics/PageViewBeacon';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeSchema = getFurnitureStoreSchema();
  const settings = await getServerShopSettings();

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
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyBottomBar
          phoneNumber={settings.phone}
          whatsappNumber={settings.whatsapp_number}
          afterHoursNote={settings.after_hours_note}
        />
      </body>
    </html>
  );
}
