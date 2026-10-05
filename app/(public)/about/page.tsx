import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Star,
  Award,
  Sparkles,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Compass,
  Truck
} from 'lucide-react';
import { getServerShopSettings } from '@/lib/supabase-server';
import { buildCustomDesignEnquiryUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'About Our Showroom & Custom Crafting | INHOME FURNITURE Kangeyam',
  description:
    'Visit the INHOME FURNITURE showroom at TCL Tower, Chennimalai Rd, Kangeyam. Custom-crafted solid teak wood, country wood, and custom furniture made to your specifications.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About INHOME FURNITURE | Showroom & Custom Crafting Kangeyam',
    description:
      'Custom furniture specialists in Kangeyam. Handcrafted solid teak wood sofas, beds, and dining sets made to your exact room specifications.',
    url: '/about',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app'}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: 'INHOME FURNITURE Showroom Kangeyam',
      },
    ],
  },
};

export default async function AboutPage() {
  const settings = await getServerShopSettings();
  const phone = settings.phone || '+919999999999';
  const whatsappNumber = settings.whatsapp_number || '919999999999';
  const address = settings.address || 'TCL Tower, 3/43A, Chennimalai Rd, Kangeyam, Tamil Nadu 638701';
  const googleRating = settings.google_rating ?? 4.8;
  const googleReviewsCount = settings.google_reviews_count ?? 23;
  const openingHours = settings.opening_hours || 'Mon - Sat: 9:00 AM - 6:00 PM';
  const googleMapsUrl = settings.google_maps_url || 'https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam';

  const whatsappUrl = buildCustomDesignEnquiryUrl(whatsappNumber);
  const callUrl = `tel:${phone.replace(/\s+/g, '')}`;

  return (
    <div className="about-page-wrapper">
      <div className="container-standard">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb-link">
            <span>Catalogue</span>
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">About & Showroom</span>
        </nav>

        {/* Hero Section */}
        <header className="about-hero">
          <div className="about-hero-badge">
            <Award size={15} />
            <span>Kangeyam&apos;s Custom Furniture Specialists</span>
          </div>
          <h1 className="about-title">
            Custom-Crafted Furniture, <br />
            <span className="highlight-text">Made to Your Specifications</span>
          </h1>
          <p className="about-intro">
            At <strong>INHOME FURNITURE</strong>, we believe your home deserves furniture designed precisely for your space, lifestyle, and aesthetic. Rather than mass-produced compromises, we consult with you on room dimensions, wood species, and fabric tones — bringing bespoke designs to life through expert artisans and seasoned custom furniture specialists.
          </p>
        </header>

        {/* Dual Column Story & Visuals */}
        <section className="story-grid">
          <div className="story-card">
            <h2 className="story-heading">The INHOME Story</h2>
            <p className="story-text">
              Founded in Kangeyam, Tamil Nadu, <strong>INHOME FURNITURE</strong> was established with a singular vision: to give homeowners across the Tirupur, Erode, and Coimbatore region access to masterfully tailored solid wood furniture without astronomical designer markups.
            </p>
            <p className="story-text">
              Every home has unique dimensions. A standard catalogue sofa may block a walkway, or a store dining set may not comfortably accommodate your family gatherings. We bridge that gap by offering pure made-to-order flexibility across 17 distinct furniture categories.
            </p>
            <div className="story-highlights">
              <div className="highlight-item">
                <CheckCircle2 size={18} className="highlight-icon" />
                <div>
                  <strong>Pure Solid Wood:</strong> Grade-A Teak Wood, seasoned Country Wood, and luxury Rosewood. Zero weak particle boards.
                </div>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={18} className="highlight-icon" />
                <div>
                  <strong>Bespoke Dimensions:</strong> Sized down to the exact inch to suit your living room, bedroom, or dining hall.
                </div>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={18} className="highlight-icon" />
                <div>
                  <strong>Showroom Consultations:</strong> Touch raw wood swatches, test cushion densities, and review finish samples in person.
                </div>
              </div>
            </div>
          </div>

          <div className="story-image-card">
            <div className="image-frame">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
                alt="Solid teak wood furniture showcase by INHOME FURNITURE"
                className="story-img"
                loading="eager"
              />
              <div className="image-caption-badge">
                <Sparkles size={14} />
                <span>Hand-Selected Teak Timber</span>
              </div>
            </div>
          </div>
        </section>

        {/* Physical Showroom & Location Card */}
        <section className="showroom-section">
          <div className="section-header-centered">
            <span className="section-eyebrow">Physical Showroom</span>
            <h2 className="section-main-title">Visit Us in Kangeyam</h2>
            <p className="section-subtext">
              Experience the quality in person. Walk through our curated display pieces, evaluate joinery and finishes, and discuss your interior floor plans directly with our showroom team.
            </p>
          </div>

          <div className="showroom-card">
            <div className="showroom-info-col">
              {/* Google 4.8 Rating Trust Header */}
              <div className="rating-card">
                <div className="rating-score-block">
                  <span className="rating-number">{googleRating.toFixed(1)}</span>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>
                <div className="rating-details">
                  <span className="rating-status">Google Verified Business</span>
                  <span className="rating-count">Based on {googleReviewsCount}+ customer reviews</span>
                </div>
              </div>

              {/* Showroom Address */}
              <div className="detail-row">
                <div className="icon-bubble">
                  <MapPin size={20} />
                </div>
                <div className="detail-content">
                  <h3 className="detail-title">Showroom Address</h3>
                  <p className="detail-value">{address}</p>
                  <span className="detail-landmark">
                    Landmark: Situated on Chennimalai Road, TCL Tower (Customer parking available)
                  </span>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="detail-row">
                <div className="icon-bubble">
                  <Clock size={20} />
                </div>
                <div className="detail-content">
                  <h3 className="detail-title">Showroom Timings</h3>
                  <p className="detail-value">{openingHours}</p>
                  {settings.after_hours_note && (
                    <div className="after-hours-inline-note">
                      <Clock size={13} className="note-icon" />
                      <span>{settings.after_hours_note}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Phone */}
              <div className="detail-row">
                <div className="icon-bubble">
                  <Phone size={20} />
                </div>
                <div className="detail-content">
                  <h3 className="detail-title">Direct Consultation Desk</h3>
                  <a href={callUrl} className="phone-link">
                    {phone}
                  </a>
                  <span className="detail-hint">Tap to call our showroom team during opening hours</span>
                </div>
              </div>

              {/* Showroom Action Buttons */}
              <div className="showroom-cta-group">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-directions"
                >
                  <Compass size={18} />
                  <span>Google Maps Directions</span>
                  <ExternalLink size={14} className="ext-icon" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-about"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Visual Location / Map Card */}
            <div className="showroom-map-col">
              <div className="map-placeholder-card">
                <div className="map-embed-wrapper">
                  <iframe
                    title="INHOME FURNITURE Showroom Location Map"
                    src="https://maps.google.com/maps?q=INHOME+FURNITURE+Kangeyam+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="map-iframe"
                    loading="lazy"
                    aria-label="Interactive Google Map showing INHOME FURNITURE Kangeyam showroom"
                  />
                </div>
                <div className="map-artistic-header">
                  <div className="map-brand-pin-row">
                    <MapPin size={22} className="map-pin-pulse" />
                    <span className="map-card-brand">INHOME FURNITURE</span>
                  </div>
                  <span className="map-card-address">TCL Tower, Chennimalai Rd, Kangeyam</span>
                </div>
                <div className="map-highlights-list">
                  <div className="map-feature">
                    <span className="feature-bullet">•</span>
                    <span>15 mins from Kangeyam Bus Stand</span>
                  </div>
                  <div className="map-feature">
                    <span className="feature-bullet">•</span>
                    <span>Direct access on Kangeyam–Chennimalai highway</span>
                  </div>
                  <div className="map-feature">
                    <span className="feature-bullet">•</span>
                    <span>Dedicated customer vehicle parking</span>
                  </div>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-open-maps"
                >
                  <span>Open Live Location in Maps</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Custom Crafting Process */}
        <section className="process-section">
          <div className="section-header-centered">
            <span className="section-eyebrow">Our Working Process</span>
            <h2 className="section-main-title">How Custom Ordering Works</h2>
            <p className="section-subtext">
              Zero complexity. Clear timelines and transparent communication at every step.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-step-num">01</div>
              <h3 className="process-card-title">Choose or Share Design</h3>
              <p className="process-card-text">
                Browse our online catalogue or share reference photos from Pinterest, Instagram, or architectural floor plans.
              </p>
            </div>

            <div className="process-card">
              <div className="process-step-num">02</div>
              <h3 className="process-card-title">Specify Wood & Size</h3>
              <p className="process-card-text">
                Select your preferred wood species (Teak, Country Wood, Rosewood), fabric colorways, and exact inch dimensions.
              </p>
            </div>

            <div className="process-card">
              <div className="process-step-num">03</div>
              <h3 className="process-card-title">Transparent Quotation</h3>
              <p className="process-card-text">
                Receive an itemized quote with no hidden extras. We confirm specifications and crafting timelines upfront.
              </p>
            </div>

            <div className="process-card">
              <div className="process-step-num">04</div>
              <div className="process-icon-wrap">
                <Truck size={18} />
              </div>
              <h3 className="process-card-title">Crafted & Delivered</h3>
              <p className="process-card-text">
                Expert artisans meticulously build and finish your piece to order, followed by careful doorstep delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Regional Delivery Banner */}
        <section className="delivery-banner">
          <div className="delivery-content">
            <div className="delivery-icon-box">
              <Truck size={28} />
            </div>
            <div>
              <h3 className="delivery-title">Doorstep Delivery Across Tamil Nadu</h3>
              <p className="delivery-desc">
                We deliver custom furniture pieces safely across Kangeyam, Tirupur, Erode, Coimbatore, Dharapuram, Vellakovil, Palladam, Karur, and surrounding districts.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Consultation CTA */}
        <section className="about-bottom-cta">
          <h2 className="cta-heading">Ready to Discuss Your Custom Furniture?</h2>
          <p className="cta-desc">
            Send us your ideas, ask questions about wood varieties, or visit our showroom on Chennimalai Road today.
          </p>
          <div className="cta-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-whatsapp"
            >
              <MessageCircle size={20} />
              <span>Enquire on WhatsApp</span>
            </a>
            <a href={callUrl} className="btn-cta-call">
              <Phone size={18} />
              <span>Call Showroom</span>
            </a>
          </div>
          {settings.after_hours_note && (
            <p className="cta-after-hours-note">
              <Clock size={13} className="inline-clock" />
              <span>{settings.after_hours_note}</span>
            </p>
          )}
        </section>
      </div>

      <style>{`
        .about-page-wrapper {
          padding: 1.5rem 0 4rem;
        }

        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-size: 0.85rem;
        }

        .breadcrumb-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .breadcrumb-link:hover {
          color: var(--color-primary);
        }

        .breadcrumb-separator {
          color: var(--text-muted);
          opacity: 0.6;
        }

        .breadcrumb-current {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Hero */
        .about-hero {
          max-width: 820px;
          margin-bottom: 3.5rem;
        }

        .about-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          color: var(--color-primary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }

        .about-title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        .highlight-text {
          color: var(--color-primary);
        }

        .about-intro {
          font-size: 1.1rem;
          line-height: 1.65;
          color: var(--text-muted);
        }

        /* Story Grid */
        .story-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 4.5rem;
        }

        .story-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 2.25rem;
          box-shadow: var(--shadow-sm);
        }

        .story-heading {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .story-text {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .story-highlights {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-primary);
        }

        .highlight-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .story-image-card {
          position: relative;
        }

        .image-frame {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-subtle);
          aspect-ratio: 4 / 3;
        }

        .story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-caption-badge {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background-color: rgba(28, 25, 23, 0.85);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Showroom Section */
        .showroom-section {
          margin-bottom: 5rem;
        }

        .section-header-centered {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 2.5rem;
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .section-main-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }

        .section-subtext {
          font-size: 1rem;
          line-height: 1.55;
          color: var(--text-muted);
        }

        .showroom-card {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 2rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
        }

        .showroom-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Rating Header */
        .rating-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
        }

        .rating-score-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid var(--border-subtle);
          padding-right: 1.25rem;
        }

        .rating-number {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .rating-stars {
          display: flex;
          gap: 0.15rem;
          margin-top: 0.35rem;
        }

        .rating-details {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .rating-status {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .rating-count {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Detail Rows */
        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .icon-bubble {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background-color: var(--bg-surface-secondary);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--border-subtle);
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }

        .detail-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.45;
        }

        .detail-landmark {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .after-hours-inline-note {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background-color: var(--bg-surface-secondary);
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          margin-top: 0.4rem;
          width: fit-content;
        }

        .note-icon {
          color: var(--color-primary);
        }

        .phone-link {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .phone-link:hover {
          color: var(--color-primary-hover);
        }

        .detail-hint {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Showroom CTA Group */
        .showroom-cta-group {
          display: flex;
          gap: 0.85rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-directions {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: var(--text-primary);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0 1.25rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: opacity 0.15s ease;
        }

        .btn-directions:hover {
          opacity: 0.92;
        }

        .ext-icon {
          opacity: 0.7;
        }

        .btn-whatsapp-about {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0 1.25rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: background-color 0.15s ease;
        }

        .btn-whatsapp-about:hover {
          background-color: var(--whatsapp-dark);
        }

        /* Map Placeholder Card */
        .showroom-map-col {
          display: flex;
        }

        .map-placeholder-card {
          width: 100%;
          background: linear-gradient(145deg, #F3EFEA 0%, #E7E2DA 100%);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }

        .map-embed-wrapper {
          width: 100%;
          height: 190px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }

        .map-iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .map-artistic-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 1.25rem;
        }

        .map-brand-pin-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .map-pin-pulse {
          color: #DC2626;
        }

        .map-card-brand {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .map-card-address {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .map-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          text-align: left;
          background-color: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(4px);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
          font-size: 0.82rem;
          color: var(--text-primary);
        }

        .map-feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .feature-bullet {
          color: var(--color-primary);
          font-weight: bold;
        }

        .btn-open-maps {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background-color: #FFFFFF;
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.85rem;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          transition: background-color 0.15s ease;
        }

        .btn-open-maps:hover {
          background-color: var(--bg-surface-secondary);
        }

        /* Process Grid */
        .process-section {
          margin-bottom: 5rem;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .process-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.25rem;
          box-shadow: var(--shadow-sm);
          position: relative;
        }

        .process-step-num {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-primary);
          opacity: 0.85;
          margin-bottom: 0.75rem;
        }

        .process-icon-wrap {
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .process-card-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .process-card-text {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-muted);
        }

        /* Delivery Banner */
        .delivery-banner {
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.75rem 2rem;
          margin-bottom: 5rem;
        }

        .delivery-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .delivery-icon-box {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .delivery-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .delivery-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Bottom CTA */
        .about-bottom-cta {
          text-align: center;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 3.5rem 2rem;
          box-shadow: var(--shadow-md);
        }

        .cta-heading {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .cta-desc {
          font-size: 1rem;
          color: var(--text-muted);
          max-width: 560px;
          margin: 0 auto 2rem;
          line-height: 1.55;
        }

        .cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-cta-whatsapp {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0 1.75rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          transition: background-color 0.15s ease;
        }

        .btn-cta-whatsapp:hover {
          background-color: var(--whatsapp-dark);
        }

        .btn-cta-call {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: var(--bg-surface-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0 1.5rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: background-color 0.15s ease;
        }

        .btn-cta-call:hover {
          background-color: var(--bg-surface-hover);
        }

        .cta-after-hours-note {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 1.25rem;
        }

        .inline-clock {
          color: var(--color-primary);
        }

        /* Mobile Breakpoints */
        @media (max-width: 900px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .showroom-card {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.75rem;
          }

          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .about-title {
            font-size: 1.85rem;
          }

          .about-intro {
            font-size: 1rem;
          }

          .story-card {
            padding: 1.5rem;
          }

          .process-grid {
            grid-template-columns: 1fr;
          }

          .delivery-content {
            flex-direction: column;
            text-align: center;
          }

          .rating-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .rating-score-block {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--border-subtle);
            padding-bottom: 0.75rem;
            width: 100%;
            align-items: flex-start;
          }

          .showroom-cta-group {
            flex-direction: column;
          }

          .btn-directions, .btn-whatsapp-about {
            width: 100%;
          }

          .cta-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn-cta-whatsapp, .btn-cta-call {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
