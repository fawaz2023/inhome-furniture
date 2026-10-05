import type { Metadata } from 'next';
import { getServerCategories, getServerNewArrivals, getServerShopSettings } from '@/lib/supabase-server';
import CategoryCard from '@/components/catalogue/CategoryCard';
import HowItWorksStrip from '@/components/catalogue/HowItWorksStrip';
import NewArrivalsCarousel from '@/components/catalogue/NewArrivalsCarousel';
import SearchBox from '@/components/catalogue/SearchBox';
import { Camera, Sparkles, MessageCircle, Clock, CheckCircle2, ShieldCheck, Ruler } from 'lucide-react';
import { buildCustomDesignEnquiryUrl } from '@/lib/whatsapp';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Full Furniture Catalogue | INHOME FURNITURE Kangeyam',
  description:
    'Browse all 17 custom solid wood furniture categories by INHOME FURNITURE in Kangeyam. Curated Nilambur teak sofas, cots, dining tables, and storage pieces. Enquire directly on WhatsApp.',
  alternates: {
    canonical: '/catalogue',
  },
  openGraph: {
    title: 'INHOME FURNITURE Full Catalogue | Kangeyam, Tamil Nadu',
    description:
      'Browse handcrafted solid Nilambur teak and country wood furniture across 17 categories. Instant custom quotes on WhatsApp.',
    url: '/catalogue',
    images: [
      {
        url: '/og-catalogue.jpg',
        width: 1200,
        height: 630,
        alt: 'INHOME FURNITURE Full Nilambur Teak Catalogue Kangeyam',
      },
    ],
  },
};

export default async function CataloguePage() {
  const [categories, rawNewArrivals, settings] = await Promise.all([
    getServerCategories(),
    getServerNewArrivals(),
    getServerShopSettings(),
  ]);

  // Attach category slug to new arrivals for deep-linking
  const newArrivalsWithSlug = rawNewArrivals.map((product) => {
    const cat = categories.find((c) => c.id === product.category_id);
    return {
      ...product,
      categorySlug: cat ? cat.slug : 'custom-furniture',
    };
  });

  const customOrderWhatsAppUrl = buildCustomDesignEnquiryUrl(settings.whatsapp_number);

  return (
    <div className="catalogue-wrapper">
      {/* Search Header Banner */}
      <section className="catalogue-header-section">
        <div className="container-standard">
          <div className="catalogue-header-inner">
            <div className="catalogue-pill">
              <Sparkles size={14} className="catalogue-pill-icon" />
              <span>Dedicated Catalogue Showcase</span>
            </div>
            <h1 className="catalogue-headline">
              Custom Furniture Catalogue
            </h1>
            <p className="catalogue-lead">
              Handcrafted from seasoned Nilambur Teak and curated solid timber. Search below or select any category to browse designs and customize dimensions directly on WhatsApp.
            </p>

            {/* Instant Search Bar */}
            <div className="catalogue-search-box-wrapper">
              <SearchBox shopPhone={settings.whatsapp_number} />
            </div>

            {/* Fast Highlights */}
            <div className="catalogue-features-row">
              <div className="feature-item">
                <ShieldCheck size={16} className="feature-icon" />
                <span>Genuine Nilambur Teak & Solid Timber</span>
              </div>
              <div className="feature-item">
                <Ruler size={16} className="feature-icon" />
                <span>Custom Dimensions Welcome</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Direct WhatsApp Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Carousel */}
      <NewArrivalsCarousel products={newArrivalsWithSlug} shopPhone={settings.whatsapp_number} />

      {/* 17 Categories Grid */}
      <section id="categories" className="categories-section" aria-labelledby="cat-heading">
        <div className="container-standard">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Explore Collections</span>
              <h2 id="cat-heading" className="section-title">
                Browse All 17 Categories
              </h2>
            </div>
            <span className="cat-count-badge">
              {categories.length} Categories
            </span>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* "Have Your Own Design?" Custom Photo Enquiry Card */}
      <section className="custom-photo-section">
        <div className="container-standard">
          <div className="custom-photo-card">
            <div className="custom-card-content">
              <div className="custom-badge">
                <Camera size={14} />
                <span>Bespoke Orders</span>
              </div>
              <h2 className="custom-heading">
                Have Your Own Design or Reference Photo?
              </h2>
              <p className="custom-text">
                Saw a design you love on Pinterest, Instagram, or an interior catalogue? Send us your reference image, room measurements, and preferred wood type on WhatsApp for a fast, custom quote.
              </p>
              <div className="custom-btn-wrapper">
                <a
                  href={customOrderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-large"
                >
                  <MessageCircle size={20} />
                  <span>Send Reference Photo on WhatsApp</span>
                </a>
                {settings.after_hours_note && (
                  <span className="after-hours-home-note">
                    <Clock size={13} className="inline-clock" />
                    <span>{settings.after_hours_note}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Strip */}
      <HowItWorksStrip />

      <style>{`
        .catalogue-wrapper {
          padding-bottom: 2rem;
        }

        .catalogue-header-section {
          padding: 2.5rem 0 3rem;
          text-align: center;
          background: linear-gradient(180deg, var(--bg-surface-secondary) 0%, var(--bg-main) 100%);
          border-bottom: 1px solid var(--border-subtle);
        }

        .catalogue-header-inner {
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .catalogue-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--accent-subtle);
          color: var(--accent-primary);
          padding: 0.35rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          margin-bottom: 1rem;
        }

        .catalogue-headline {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .catalogue-lead {
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 620px;
          margin-bottom: 1.75rem;
        }

        .catalogue-search-box-wrapper {
          width: 100%;
          max-width: 580px;
          margin: 0 auto 1.5rem;
          position: relative;
          z-index: 30;
        }

        .catalogue-features-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
          padding-top: 0.5rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .feature-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .categories-section {
          padding: 3.5rem 0;
        }

        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .section-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 0.25rem;
        }

        .section-title {
          font-size: clamp(1.4rem, 3.5vw, 1.85rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .cat-count-badge {
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          background-color: var(--bg-surface-secondary);
          color: var(--text-muted);
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          white-space: nowrap;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .categories-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }

        @media (min-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        .custom-photo-section {
          padding: 1.5rem 0 3.5rem;
        }

        .custom-photo-card {
          background: linear-gradient(135deg, #1C1917 0%, #292524 100%);
          color: #FAF8F5;
          border-radius: var(--radius-lg);
          padding: clamp(2rem, 5vw, 3rem);
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .custom-card-content {
          max-width: 620px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .custom-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: rgba(255, 255, 255, 0.12);
          color: #FAF8F5;
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .custom-heading {
          font-size: clamp(1.4rem, 3.5vw, 1.85rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.85rem;
          color: #FAF8F5;
        }

        .custom-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #D6D3D1;
          margin-bottom: 1.75rem;
        }

        .custom-btn-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
        }

        .btn-whatsapp-large {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.85rem 1.75rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          min-height: var(--min-touch-target);
          transition: transform 0.15s ease, filter 0.15s ease;
          width: 100%;
          max-width: 380px;
        }

        .btn-whatsapp-large:hover {
          filter: brightness(1.06);
          transform: translateY(-1px);
        }

        .after-hours-home-note {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.775rem;
          color: #A8A29E;
        }

        .inline-clock {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
