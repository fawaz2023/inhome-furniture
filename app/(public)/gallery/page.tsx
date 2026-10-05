import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { getServerGalleryItems, getServerShopSettings } from '@/lib/supabase-server';
import GalleryClient from '@/components/catalogue/GalleryClient';

export const metadata: Metadata = {
  title: 'Showroom & Finished Works Gallery | INHOME FURNITURE Kangeyam',
  description:
    'Explore our Kangeyam showroom displays, finished custom-crafted furniture pieces, and latest arrivals. Tap any piece to consult directly with us on WhatsApp.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Showroom & Finished Works Gallery | INHOME FURNITURE',
    description:
      'Explore our Kangeyam showroom displays, finished custom-crafted furniture pieces, and latest arrivals.',
    url: '/gallery',
    siteName: 'INHOME FURNITURE',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'INHOME FURNITURE Showroom & Finished Works Gallery',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Showroom & Finished Works Gallery | INHOME FURNITURE',
    description: 'Explore our Kangeyam showroom displays and finished custom-crafted furniture pieces.',
    images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

export default async function GalleryPage() {
  const [items, settings] = await Promise.all([
    getServerGalleryItems(),
    getServerShopSettings(),
  ]);

  return (
    <main className="gallery-page">
      <div className="container-standard">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="gallery-breadcrumb">
          <ol className="breadcrumb-list">
            <li>
              <Link href="/" className="breadcrumb-link">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="breadcrumb-separator">
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="breadcrumb-current">
              Gallery
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="gallery-header-section">
          <div className="header-meta-pill">
            <Sparkles size={14} className="pill-sparkle" />
            <span>Showroom & Client Commissions</span>
          </div>

          <h1 className="gallery-page-title">Gallery & Finished Works</h1>

          <p className="gallery-page-desc">
            Explore finished custom-crafted pieces delivered to client residences, live displays at our TCL Tower Kangeyam showroom, and new arrivals.
          </p>

          <div className="gallery-location-strip">
            <span className="location-tag">
              <MapPin size={13} className="loc-pin" />
              TCL Tower, Chennimalai Rd, Kangeyam
            </span>
            <span className="dot-divider">•</span>
            <span className="live-count">{items.length} Curated Photographs</span>
          </div>
        </header>

        {/* Interactive Filterable Gallery Client Component */}
        <GalleryClient
          initialItems={items}
          shopPhone={settings.phone || '+919999999999'}
          whatsappNumber={settings.whatsapp_number || '919999999999'}
          afterHoursNote={settings.after_hours_note}
        />
      </div>

      <style>{`
        .gallery-page {
          padding-top: 1.25rem;
          padding-bottom: 5rem;
        }

        .gallery-breadcrumb {
          margin-bottom: 1.5rem;
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .breadcrumb-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .breadcrumb-link:hover {
          color: var(--text-primary);
        }

        .breadcrumb-separator {
          display: inline-flex;
          align-items: center;
          margin: 0 0.5rem;
          color: var(--border-subtle);
        }

        .breadcrumb-current {
          color: var(--text-primary);
          font-weight: 600;
        }

        .gallery-header-section {
          margin-bottom: 2.25rem;
          max-width: 680px;
        }

        .header-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .pill-sparkle {
          color: var(--accent-primary);
        }

        .gallery-page-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        @media (min-width: 768px) {
          .gallery-page-title {
            font-size: 2.5rem;
          }
        }

        .gallery-page-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .gallery-location-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .location-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 500;
        }

        .loc-pin {
          color: var(--accent-primary);
        }

        .dot-divider {
          color: var(--border-subtle);
        }

        .live-count {
          font-weight: 600;
          color: var(--text-primary);
        }
      `}</style>
    </main>
  );
}
