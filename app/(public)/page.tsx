import { getServerCategories, getServerNewArrivals, getServerShopSettings } from '@/lib/supabase-server';
import CategoryCard from '@/components/catalogue/CategoryCard';
import HowItWorksStrip from '@/components/catalogue/HowItWorksStrip';
import NewArrivalsCarousel from '@/components/catalogue/NewArrivalsCarousel';
import SearchBox from '@/components/catalogue/SearchBox';
import { Sparkles, MessageCircle, Camera, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { buildCustomDesignEnquiryUrl } from '@/lib/whatsapp';

export const revalidate = 300;

export default async function HomePage() {
  const [categories, rawNewArrivals, settings] = await Promise.all([
    getServerCategories(),
    getServerNewArrivals(),
    getServerShopSettings()
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
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-standard">
          <div className="hero-inner">
            <div className="hero-pill">
              <Sparkles size={14} className="hero-pill-icon" />
              <span>Custom-Crafted Furniture in Kangeyam</span>
            </div>
            <h1 className="hero-title">
              Crafted for Your Space. <br />
              <span className="hero-title-accent">Made to Your Dimensions.</span>
            </h1>
            <p className="hero-subtitle">
              Browse our bespoke catalogue of solid teak wood sofas, beds, dining sets, and storage units. Tap any piece to customise wood and dimensions directly on WhatsApp.
            </p>

            {/* Instant Search Bar — Always visible at top */}
            <div className="hero-search-wrapper">
              <SearchBox shopPhone={settings.whatsapp_number} />
            </div>

            <div className="hero-actions">
              <a href="#categories" className="btn-browse-hero">
                <span>Browse 17 Categories</span>
                <ArrowRight size={16} />
              </a>
              <a
                href={customOrderWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-custom-hero"
              >
                <Camera size={18} />
                <span>Share Custom Photo</span>
              </a>
            </div>

            {/* Quick Value Badges */}
            <div className="hero-trust-row">
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>100% Solid Wood Options</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>Custom Dimensions Welcome</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>Direct WhatsApp Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Carousel (High priority for Instagram bio traffic) */}
      <NewArrivalsCarousel products={newArrivalsWithSlug} shopPhone={settings.whatsapp_number} />

      {/* 17 Categories Grid */}
      <section id="categories" className="categories-section" aria-labelledby="cat-heading">
        <div className="container-standard">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Complete Catalogue</span>
              <h2 id="cat-heading" className="section-title">
                Explore by Category
              </h2>
            </div>
            <p className="section-caption">
              17 specialized categories — tap in to view designs and request sizing.
            </p>
          </div>

          <div className="category-grid">
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
                Have Your Own Design in Mind?
              </h2>
              <p className="custom-text">
                Saw something inspiring on Pinterest, Instagram, or an interior catalogue? Send us your reference photo, required dimensions, and preferred wood type on WhatsApp for a fast, transparent quote.
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

      {/* How It Works 5-Step Strip */}
      <HowItWorksStrip />

      <style>{`
        .hero-section {
          padding: 3rem 0 3.5rem;
          text-align: center;
          position: relative;
        }

        .hero-inner {
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-pill {
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
          margin-bottom: 1.25rem;
        }

        .hero-pill-icon {
          color: var(--accent-primary);
        }

        .hero-title {
          font-size: clamp(2rem, 5.5vw, 3rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin-bottom: 1.25rem;
        }

        .hero-title-accent {
          color: var(--accent-primary);
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.15rem);
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 620px;
          margin-bottom: 2rem;
        }

        .hero-search-wrapper {
          width: 100%;
          max-width: 580px;
          margin: 0 auto 2rem;
          position: relative;
          z-index: 30;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-browse-hero {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          padding: 0.85rem 1.5rem;
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          transition: background-color 0.15s ease, transform 0.1s ease;
        }

        .btn-browse-hero:hover {
          background-color: var(--accent-hover);
          transform: translateY(-1px);
        }

        .btn-custom-hero {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--bg-surface);
          color: var(--text-primary);
          border: 1.5px solid var(--border-subtle);
          padding: 0.85rem 1.35rem;
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }

        .btn-custom-hero:hover {
          background-color: var(--bg-surface-secondary);
          border-color: var(--accent-primary);
        }

        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .trust-check {
          color: #059669;
        }

        .categories-section {
          padding: 2.5rem 0 3.5rem;
        }

        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .section-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 0.25rem;
        }

        .section-title {
          font-size: clamp(1.4rem, 3.5vw, 1.85rem);
        }

        .section-caption {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .category-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }

        @media (min-width: 1024px) {
          .category-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        .custom-photo-section {
          padding: 1.5rem 0 3rem;
        }

        .custom-photo-card {
          background: linear-gradient(135deg, #1C1917 0%, #292524 100%);
          color: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .custom-card-content {
          max-width: 620px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .custom-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          color: #FDE68A;
          margin-bottom: 1.25rem;
        }

        .custom-heading {
          color: #FFFFFF;
          font-size: clamp(1.5rem, 4vw, 2.15rem);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .custom-text {
          color: #D6D3D1;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .custom-btn-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .after-hours-home-note {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .after-hours-home-note .inline-clock {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .btn-whatsapp-large {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.9rem 1.75rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);
          transition: background-color 0.15s ease, transform 0.1s ease;
        }

        .btn-whatsapp-large:hover {
          background-color: var(--whatsapp-dark);
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .custom-photo-card {
            padding: 2.25rem 1.25rem;
          }
          .hero-actions {
            width: 100%;
          }
          .btn-browse-hero, .btn-custom-hero {
            width: 100%;
            justify-content: center;
          }
          .hero-trust-row {
            flex-direction: column;
            gap: 0.6rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
