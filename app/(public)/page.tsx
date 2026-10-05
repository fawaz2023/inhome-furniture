import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getServerCategories, getServerNewArrivals, getServerShopSettings } from '@/lib/supabase-server';
import ProductCard from '@/components/catalogue/ProductCard';
import HowItWorksStrip from '@/components/catalogue/HowItWorksStrip';
import {
  Sparkles,
  MessageCircle,
  Camera,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  TreeDeciduous,
  Ruler,
  Star,
  MapPin,
  Award
} from 'lucide-react';
import { buildCustomDesignEnquiryUrl } from '@/lib/whatsapp';

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: 'INHOME FURNITURE Kangeyam | Authentic Nilambur Teak & Custom Furniture',
  },
  description:
    'Experience handcrafted custom furniture made from genuine Nilambur teak and curated solid woods. Tailored to your room dimensions at our Kangeyam showroom. Enquire directly on WhatsApp.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'INHOME FURNITURE Kangeyam | Sovereign Nilambur Teak Furniture',
    description:
      'Custom-crafted solid Nilambur teak sofas, dining tables, cots, and bespoke pieces in Kangeyam, Tamil Nadu. Direct WhatsApp design consultation.',
    url: '/',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app'}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'INHOME FURNITURE Sovereign Nilambur Teak Showcase',
      },
    ],
  },
};

export default async function HomePage() {
  const [categories, rawNewArrivals, settings] = await Promise.all([
    getServerCategories(),
    getServerNewArrivals(),
    getServerShopSettings()
  ]);

  // Featured signature products (first 4 items)
  const signaturePieces = rawNewArrivals.slice(0, 4).map((product) => {
    const cat = categories.find((c) => c.id === product.category_id);
    return {
      ...product,
      categorySlug: cat ? cat.slug : 'custom-furniture',
    };
  });

  const customOrderWhatsAppUrl = buildCustomDesignEnquiryUrl(settings.whatsapp_number);
  const address = settings.address || 'TCL Tower, 3/43A, Chennimalai Rd, Kangeyam, Tamil Nadu 638701';
  const openingHours = settings.opening_hours || 'Mon - Sat: 9:00 AM - 6:00 PM';
  const googleMapsUrl = settings.google_maps_url || 'https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam';
  const googleRating = settings.google_rating ?? 4.8;
  const googleReviewsCount = settings.google_reviews_count ?? 23;

  // Curated spotlight categories for fast visual entry
  const spotlightCategories = categories.filter((c) =>
    ['sofas', 'beds', 'cots', 'dining-tables', 'tv-units', 'wardrobes'].includes(c.slug)
  ).slice(0, 6);

  return (
    <div className="nilambur-home-wrapper">
      {/* 1. Hero Section: Sovereign Nilambur Teak */}
      <section className="heritage-hero-section">
        <div className="container-standard">
          <div className="hero-content-stack">
            <div className="heritage-pill">
              <TreeDeciduous size={15} className="heritage-pill-icon" />
              <span>Authentic Nilambur Teak • Custom-Crafted to Order</span>
            </div>

            <h1 className="hero-main-title">
              The Sovereign Teak of Nilambur. <br />
              <span className="hero-main-accent">Crafted for Generations.</span>
            </h1>

            <p className="hero-main-lead">
              We create custom solid wood furniture using genuine, seasoned Nilambur Teak — world-renowned for its golden grain density, natural termite immunity, and heirloom durability. Every piece is made to your exact room dimensions in our Kangeyam showroom.
            </p>

            <div className="hero-cta-group">
              <Link href="/catalogue" className="btn-explore-catalogue">
                <span>Browse Full Catalogue</span>
                <ArrowRight size={17} />
              </Link>
              <a
                href={customOrderWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-share-reference"
              >
                <Camera size={18} />
                <span>Share Reference Photo</span>
              </a>
            </div>

            {/* Prestige Value Markers */}
            <div className="heritage-markers-row">
              <div className="marker-item">
                <ShieldCheck size={18} className="marker-icon" />
                <span>GI-Tagged Nilambur Timber</span>
              </div>
              <div className="marker-item">
                <Ruler size={18} className="marker-icon" />
                <span>Custom Sized to Your Blueprint</span>
              </div>
              <div className="marker-item">
                <Star size={18} className="marker-icon star-filled" />
                <span>4.8 Google Rated (Kangeyam Showroom)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Nilambur Teak Distinction (Why It Matters) */}
      <section className="nilambur-distinction-section">
        <div className="container-standard">
          <div className="section-narrative-header">
            <span className="narrative-eyebrow">The Nilambur Difference</span>
            <h2 className="narrative-title">Why Nilambur Teak Stands Alone</h2>
            <p className="narrative-subtitle">
              Sourced from the historic teak reserves of Nilambur, Kerala — the world's first teak plantation and home to the finest timber on earth.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <TreeDeciduous size={24} />
              </div>
              <h3 className="pillar-headline">Dense Growth Rings & Golden Hue</h3>
              <p className="pillar-body">
                Fed by the rich alluvial soils of the Chaliyar river basin, Nilambur teak develops tight annular rings that produce unmatched tensile strength and a lustrous golden-amber patina that deepens with age.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
              <h3 className="pillar-headline">Natural Oil Termite Immunity</h3>
              <p className="pillar-body">
                High concentrations of natural tectoquinones and organic timber oils provide perpetual self-preservation. It is naturally resistant to termites, borers, and tropical seasonal humidity without toxic chemical dips.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <Ruler size={24} />
              </div>
              <h3 className="pillar-headline">Bespoke Millimeter Precision</h3>
              <p className="pillar-body">
                Commercial furniture is mass-produced to fixed sizes. We custom-cut and sculpt each solid teak piece to your room's specific length, ceiling height, and fabric swatch preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Fast Catalogue Category Portals */}
      <section className="spotlight-categories-section">
        <div className="container-standard">
          <div className="section-row-header">
            <div>
              <span className="narrative-eyebrow">Custom Collections</span>
              <h2 className="narrative-title">Browse by Category</h2>
            </div>
            <Link href="/catalogue" className="view-all-catalogue-link">
              <span>View All 17 Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="spotlight-grid">
            {spotlightCategories.map((cat) => (
              <Link key={cat.id} href={`/${cat.slug}`} className="spotlight-card">
                <div className="spotlight-image-container">
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="spotlight-img"
                  />
                  <div className="spotlight-overlay" />
                </div>
                <div className="spotlight-info">
                  <h3 className="spotlight-cat-name">{cat.name}</h3>
                  <span className="spotlight-subtext">Customise on WhatsApp &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="center-cta-box">
            <Link href="/catalogue" className="btn-catalogue-wide">
              <span>Open Complete 17-Category Catalogue</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Signature Pieces Showcase */}
      {signaturePieces.length > 0 && (
        <section className="signature-pieces-section">
          <div className="container-standard">
            <div className="section-narrative-header">
              <span className="narrative-eyebrow">Heirloom Handcraft</span>
              <h2 className="narrative-title">Signature Nilambur Teak Pieces</h2>
              <p className="narrative-subtitle">
                Each design can be custom-crafted in pure Nilambur Teak, Country Wood, or customized finishes. Tap to enquire with our Kangeyam showroom on WhatsApp.
              </p>
            </div>

            <div className="signature-grid">
              {signaturePieces.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={product.categorySlug}
                  shopPhone={settings.whatsapp_number}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Custom Photo WhatsApp Section */}
      <section className="custom-elevation-section">
        <div className="container-standard">
          <div className="custom-elevation-box">
            <div className="elevation-content">
              <span className="elevation-pill">
                <Camera size={14} /> Bespoke Furniture Consultation
              </span>
              <h2 className="elevation-title">
                Have an Architectural Elevation or Pinterest Design?
              </h2>
              <p className="elevation-text">
                Send us your reference photo, required dimensions, and preferred wood species (Nilambur Teak, Country Wood, or Rosewood). We will review the wood grain feasibility and share an itemized quote directly on WhatsApp.
              </p>
              <div className="elevation-actions">
                <a
                  href={customOrderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-elevation"
                >
                  <MessageCircle size={20} />
                  <span>Send Reference Photo on WhatsApp</span>
                </a>
                {settings.after_hours_note && (
                  <span className="elevation-note">
                    <Clock size={13} />
                    <span>{settings.after_hours_note}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Kangeyam Showroom & Google Review Trust */}
      <section className="showroom-trust-section">
        <div className="container-standard">
          <div className="showroom-card-grid">
            <div className="showroom-info-panel">
              <span className="narrative-eyebrow">Experience the Grain</span>
              <h2 className="showroom-heading">Visit Our Kangeyam Showroom</h2>
              <p className="showroom-desc">
                Feel the solid weight, hand-buffed finishes, and touch the actual wood slabs before custom orders are carved. Located at TCL Tower on Chennimalai Road.
              </p>

              <div className="showroom-details-list">
                <div className="detail-row">
                  <MapPin size={20} className="detail-icon" />
                  <div>
                    <strong>Showroom Address:</strong>
                    <p>{address}</p>
                  </div>
                </div>
                <div className="detail-row">
                  <Clock size={20} className="detail-icon" />
                  <div>
                    <strong>Hours of Consultation:</strong>
                    <p>{openingHours}</p>
                  </div>
                </div>
              </div>

              <div className="showroom-action-buttons">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-maps-route"
                >
                  <MapPin size={16} />
                  <span>Get Google Maps Directions</span>
                </a>
                <Link href="/about" className="btn-about-link">
                  <span>Showroom Story & Team &rarr;</span>
                </Link>
              </div>
            </div>

            <div className="google-trust-panel">
              <div className="rating-badge-large">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} className="star-icon-solid" fill="currentColor" />
                  ))}
                </div>
                <div className="score-big">{googleRating.toFixed(1)} / 5.0</div>
                <div className="reviews-subtext">
                  Verified rating across <strong>{googleReviewsCount} Google Reviews</strong> from custom furniture clients across Tamil Nadu.
                </div>
              </div>

              <div className="verified-quote">
                <p>
                  "The quality of the Nilambur teak and the finish on our 8-seater dining table exceeded expectations. Perfect dimensions as promised."
                </p>
                <span className="quote-author">— Kangeyam Client Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. How It Works Strip */}
      <HowItWorksStrip />

      <style>{`
        .nilambur-home-wrapper {
          padding-bottom: 2rem;
        }

        .heritage-hero-section {
          padding: 3.5rem 0 4rem;
          background: linear-gradient(180deg, #F3EFEA 0%, var(--bg-main) 100%);
          border-bottom: 1px solid var(--border-subtle);
          text-align: center;
        }

        .hero-content-stack {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .heritage-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #FEF3C7;
          color: #92400E;
          border: 1px solid #FDE68A;
          padding: 0.4rem 1.1rem;
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
        }

        .heritage-pill-icon {
          color: #B45309;
        }

        .hero-main-title {
          font-size: clamp(2.2rem, 5.5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 1.35rem;
        }

        .hero-main-accent {
          color: var(--accent-primary);
        }

        .hero-main-lead {
          font-size: clamp(1.05rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 680px;
          margin-bottom: 2.25rem;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2.75rem;
        }

        .btn-explore-catalogue {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 0.9rem 1.85rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          min-height: var(--min-touch-target);
          box-shadow: 0 4px 14px rgba(139, 90, 43, 0.25);
          transition: background-color 0.15s ease, transform 0.15s ease;
        }

        .btn-explore-catalogue:hover {
          background-color: var(--accent-hover);
          transform: translateY(-1px);
        }

        .btn-share-reference {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: var(--bg-surface);
          color: var(--text-primary);
          font-size: 1.05rem;
          font-weight: 700;
          padding: 0.9rem 1.85rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          min-height: var(--min-touch-target);
          border: 1px solid var(--border-subtle);
          transition: background-color 0.15s ease;
        }

        .btn-share-reference:hover {
          background-color: var(--bg-surface-secondary);
        }

        .heritage-markers-row {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          justify-content: center;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .marker-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .marker-icon {
          color: var(--accent-primary);
        }

        .star-filled {
          color: #EAB308;
          fill: currentColor;
        }

        .nilambur-distinction-section {
          padding: 4.5rem 0;
        }

        .section-narrative-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 3rem;
        }

        .narrative-eyebrow {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 0.35rem;
        }

        .narrative-title {
          font-size: clamp(1.75rem, 4vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .narrative-subtitle {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .pillars-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .pillar-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
        }

        .pillar-icon-wrapper {
          width: 48px;
          height: 48px;
          background-color: #FEF3C7;
          color: #92400E;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .pillar-headline {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .pillar-body {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        .spotlight-categories-section {
          padding: 3.5rem 0 4.5rem;
          background-color: #F8F5F0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .section-row-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.25rem;
          gap: 1rem;
        }

        .view-all-catalogue-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent-primary);
          text-decoration: none;
        }

        .spotlight-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        @media (min-width: 768px) {
          .spotlight-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }

        .spotlight-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background-color: #000000;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          aspect-ratio: 4 / 3;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .spotlight-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .spotlight-image-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .spotlight-img {
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .spotlight-card:hover .spotlight-img {
          transform: scale(1.04);
        }

        .spotlight-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.75) 100%);
        }

        .spotlight-info {
          position: relative;
          z-index: 2;
          padding: 1.25rem;
          color: #FFFFFF;
        }

        .spotlight-cat-name {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
          color: #FFFFFF;
        }

        .spotlight-subtext {
          font-size: 0.825rem;
          color: #FDE68A;
          font-weight: 600;
        }

        .center-cta-box {
          text-align: center;
        }

        .btn-catalogue-wide {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 0.95rem 2rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(139, 90, 43, 0.2);
        }

        .signature-pieces-section {
          padding: 4.5rem 0;
        }

        .signature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }

        @media (min-width: 1024px) {
          .signature-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        .custom-elevation-section {
          padding: 1rem 0 4rem;
        }

        .custom-elevation-box {
          background: linear-gradient(135deg, #1C1917 0%, #292524 100%);
          color: #FAF8F5;
          border-radius: var(--radius-lg);
          padding: clamp(2.25rem, 5vw, 3.5rem);
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        .elevation-content {
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .elevation-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background-color: rgba(255, 255, 255, 0.12);
          color: #FAF8F5;
          padding: 0.35rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.775rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        .elevation-title {
          font-size: clamp(1.5rem, 4vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #FAF8F5;
          margin-bottom: 1rem;
        }

        .elevation-text {
          font-size: 0.975rem;
          line-height: 1.6;
          color: #D6D3D1;
          margin-bottom: 2rem;
        }

        .elevation-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          width: 100%;
        }

        .btn-whatsapp-elevation {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 0.95rem 1.85rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          min-height: var(--min-touch-target);
          width: 100%;
          max-width: 380px;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }

        .elevation-note {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: #A8A29E;
        }

        .showroom-trust-section {
          padding: 3rem 0 4.5rem;
        }

        .showroom-card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: clamp(2rem, 5vw, 3rem);
          box-shadow: var(--shadow-sm);
        }

        @media (min-width: 900px) {
          .showroom-card-grid {
            grid-template-columns: 1.2fr 0.8fr;
            align-items: center;
          }
        }

        .showroom-heading {
          font-size: clamp(1.5rem, 3.5vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
        }

        .showroom-desc {
          font-size: 0.975rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
        }

        .showroom-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .detail-row {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
          font-size: 0.925rem;
        }

        .detail-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .showroom-action-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .btn-maps-route {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--text-primary);
          color: #FFFFFF;
          font-size: 0.925rem;
          font-weight: 700;
          padding: 0.8rem 1.4rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          min-height: var(--min-touch-target);
        }

        .btn-about-link {
          font-size: 0.925rem;
          font-weight: 700;
          color: var(--accent-primary);
          text-decoration: none;
        }

        .google-trust-panel {
          background-color: #FAF8F5;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 2rem;
          text-align: center;
        }

        .stars-row {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
        }

        .star-icon-solid {
          color: #EAB308;
        }

        .score-big {
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .reviews-subtext {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .verified-quote {
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.25rem;
          font-style: italic;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--text-primary);
        }

        .quote-author {
          display: block;
          margin-top: 0.4rem;
          font-style: normal;
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
}
