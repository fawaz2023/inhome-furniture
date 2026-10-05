import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getMockCategories,
  getMockProductsByCategorySlug,
} from '@/lib/mock-data';
import {
  getServerCategoryBySlug,
  getServerProductBySlugs,
  getServerProductsByCategorySlug,
  getServerShopSettings
} from '@/lib/supabase-server';
import ProductGallery from '@/components/catalogue/ProductGallery';
import ProductCard from '@/components/catalogue/ProductCard';
import {
  ChevronRight,
  Home,
  MessageCircle,
  Sliders,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Ruler,
  Layers,
  Palette,
  Truck,
  Clock,
} from 'lucide-react';
import { buildProductEnquiryUrl } from '@/lib/whatsapp';
import { getProductSchema, getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

interface ProductPageProps {
  params: Promise<{
    category: string;
    product: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getMockCategories();
  const params: { category: string; product: string }[] = [];

  for (const cat of categories) {
    const products = getMockProductsByCategorySlug(cat.slug);
    for (const prod of products) {
      params.push({
        category: cat.slug,
        product: prod.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category: catSlug, product: prodSlug } = await params;
  const [product, category] = await Promise.all([
    getServerProductBySlugs(catSlug, prodSlug),
    getServerCategoryBySlug(catSlug)
  ]);

  if (!product || !category) {
    return {
      title: 'Product Not Found | INHOME FURNITURE',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app';
  const rawImage = product.og_image_url || product.images[0] || category.image_url || '/og-default.jpg';
  const primaryImage = rawImage.startsWith('http') ? rawImage : `${baseUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
  const canonicalUrl = `${baseUrl}/${category.slug}/${product.slug}`;

  return {
    title: `${product.name} | INHOME FURNITURE Kangeyam`,
    description:
      product.description ||
      `Custom-crafted ${product.name} by INHOME FURNITURE Kangeyam. Available in pure Teak, Country Wood, and customized finishes.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_IN',
      url: canonicalUrl,
      title: `${product.name} | INHOME FURNITURE`,
      description:
        product.description ||
        `Customise size and wood for this ${product.name}. Tap to chat on WhatsApp with our Kangeyam showroom.`,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | INHOME FURNITURE`,
      description:
        product.description ||
        `Customise size and wood for this ${product.name}. Tap to chat on WhatsApp with our Kangeyam showroom.`,
      images: [primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { category: catSlug, product: prodSlug } = await params;
  const [product, category, settings] = await Promise.all([
    getServerProductBySlugs(catSlug, prodSlug),
    getServerCategoryBySlug(catSlug),
    getServerShopSettings()
  ]);

  if (!product || !category) {
    notFound();
  }

  const isMadeToOrder = product.product_type === 'made_to_order';
  const standardWhatsAppUrl = buildProductEnquiryUrl(product.name, category.slug, product.slug, 'standard', settings.whatsapp_number);
  const customiseWhatsAppUrl = buildProductEnquiryUrl(product.name, category.slug, product.slug, 'customise', settings.whatsapp_number);
  const productSchema = getProductSchema(product, category.slug);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Catalogue', url: '/catalogue' },
    { name: category.name, url: `/${category.slug}` },
    { name: product.name, url: `/${category.slug}/${product.slug}` },
  ]);

  // Related products in this category (excluding current)
  const categoryProducts = await getServerProductsByCategorySlug(category.slug);
  const relatedProducts = categoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const customOpts = product.customisation_options || {};

  return (
    <div className="product-detail-wrapper">
      {/* Product & Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container-standard">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb-link">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <Link href="/catalogue" className="breadcrumb-link">
            <span>Catalogue</span>
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <Link href={`/${category.slug}`} className="breadcrumb-link">
            <span>{category.name}</span>
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current" aria-current="page">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase (2 columns on tablet/desktop) */}
        <div className="product-main-grid">
          {/* Left: Gallery */}
          <div className="product-gallery-col">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Specifications & CTAs */}
          <div className="product-info-col">
            {/* Status Badge */}
            <div className="badge-row">
              {isMadeToOrder ? (
                <span className="badge badge-order">
                  <Sparkles size={12} />
                  <span>Custom Made to Order</span>
                </span>
              ) : (
                <span className="badge badge-ready">
                  <CheckCircle2 size={12} />
                  <span>Ready Stock in Kangeyam</span>
                </span>
              )}
              <span className="badge-category-tag">{category.name}</span>
            </div>

            {/* Product Title */}
            <h1 className="product-page-title">{product.name}</h1>

            {/* Pricing Transparency Note */}
            <div className="pricing-note-card">
              <span className="pricing-badge">Custom Quote</span>
              <p className="pricing-text">
                Pricing depends on your selected wood species (Teak, Country Wood, Rosewood) and exact dimensions. Tap below for an instant quote.
              </p>
            </div>

            {/* Dual WhatsApp Action CTAs (Primary & Secondary) */}
            <div className="dual-cta-container">
              <a
                href={standardWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-primary"
              >
                <MessageCircle size={20} />
                <span>Enquire on WhatsApp</span>
              </a>

              <a
                href={customiseWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-customise-secondary"
              >
                <Sliders size={18} />
                <span>Customise Size or Wood</span>
              </a>
            </div>

            {/* After-Hours Response Note (UI Only, Read from Settings) */}
            {settings.after_hours_note && (
              <div className="after-hours-product-note">
                <Clock size={13} className="after-hours-icon" />
                <span>{settings.after_hours_note}</span>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="product-description-block">
                <h3 className="section-mini-heading">Design Overview</h3>
                <p className="description-text">{product.description}</p>
              </div>
            )}

            {/* Customisation Options Panel */}
            <div className="customisation-panel">
              <h3 className="section-mini-heading">Customisation Specifications</h3>

              <div className="specs-list">
                {customOpts.wood_options && customOpts.wood_options.length > 0 && (
                  <div className="spec-row">
                    <div className="spec-label">
                      <Layers size={16} className="spec-icon" />
                      <span>Available Timbers</span>
                    </div>
                    <div className="spec-value">
                      {customOpts.wood_options.join(', ')}
                    </div>
                  </div>
                )}

                {customOpts.size_notes && (
                  <div className="spec-row">
                    <div className="spec-label">
                      <Ruler size={16} className="spec-icon" />
                      <span>Dimensions</span>
                    </div>
                    <div className="spec-value">{customOpts.size_notes}</div>
                  </div>
                )}

                {customOpts.finish_options && customOpts.finish_options.length > 0 && (
                  <div className="spec-row">
                    <div className="spec-label">
                      <Palette size={16} className="spec-icon" />
                      <span>Finishes</span>
                    </div>
                    <div className="spec-value">
                      {customOpts.finish_options.join(', ')}
                    </div>
                  </div>
                )}

                {customOpts.fabric_notes && (
                  <div className="spec-row">
                    <div className="spec-label">
                      <Sparkles size={16} className="spec-icon" />
                      <span>Fabric & Upholstery</span>
                    </div>
                    <div className="spec-value">{customOpts.fabric_notes}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery & Showroom Guarantee */}
            <div className="trust-strip">
              <div className="trust-row-item">
                <Truck size={17} className="trust-icon" />
                <span>Safe doorstep delivery in Kangeyam & Tamil Nadu</span>
              </div>
              <div className="trust-row-item">
                <CheckCircle2 size={17} className="trust-icon" />
                <span>Inspect in showroom or review high-res photo updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Category Items */}
        {relatedProducts.length > 0 && (
          <section className="related-section" aria-labelledby="related-heading">
            <div className="related-header">
              <h2 id="related-heading" className="related-title">
                More from {category.name}
              </h2>
              <Link href={`/${category.slug}`} className="view-all-link">
                <span>View all {category.name}</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="related-grid">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  categorySlug={category.slug}
                  shopPhone={settings.whatsapp_number}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        .product-detail-wrapper {
          padding: 1.5rem 0 3.5rem;
        }

        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.825rem;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
        }

        .breadcrumb-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .breadcrumb-link:hover {
          color: var(--accent-primary);
        }

        .breadcrumb-separator {
          color: var(--text-subtle);
        }

        .breadcrumb-current {
          color: var(--text-primary);
          font-weight: 600;
        }

        .product-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
          margin-bottom: 4rem;
        }

        @media (min-width: 860px) {
          .product-main-grid {
            grid-template-columns: 1.15fr 1fr;
            gap: 3rem;
            align-items: start;
          }
        }

        .badge-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .badge-category-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          background-color: var(--bg-surface-secondary);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .product-page-title {
          font-size: clamp(1.6rem, 4vw, 2.25rem);
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }

        .pricing-note-card {
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
        }

        .pricing-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .pricing-text {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .dual-cta-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .after-hours-product-note {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
          width: fit-content;
        }

        .after-hours-product-note .after-hours-icon {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .btn-whatsapp-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.95rem 1.5rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          min-height: 50px;
          box-shadow: 0 3px 12px rgba(37, 211, 102, 0.35);
          transition: background-color 0.15s ease, transform 0.1s ease;
        }

        .btn-whatsapp-primary:hover {
          background-color: var(--whatsapp-dark);
          transform: translateY(-1px);
        }

        .btn-customise-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background-color: var(--bg-surface);
          color: var(--accent-primary);
          border: 1.5px solid var(--accent-primary);
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.85rem 1.5rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          min-height: 48px;
          transition: background-color 0.15s ease;
        }

        .btn-customise-secondary:hover {
          background-color: var(--accent-subtle);
        }

        .section-mini-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.75rem;
        }

        .product-description-block {
          margin-bottom: 1.75rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.5rem;
        }

        .description-text {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        .customisation-panel {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.75rem;
        }

        .specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .spec-row {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .spec-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .spec-label {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .spec-icon {
          color: var(--accent-primary);
        }

        .spec-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          padding-left: 1.5rem;
        }

        .trust-strip {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding: 1rem 1.25rem;
          background-color: var(--bg-surface-secondary);
          border-radius: var(--radius-md);
          font-size: 0.825rem;
          color: var(--text-muted);
        }

        .trust-row-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trust-icon {
          color: #059669;
          flex-shrink: 0;
        }

        .related-section {
          border-top: 1px solid var(--border-subtle);
          padding-top: 3rem;
        }

        .related-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .related-title {
          font-size: clamp(1.25rem, 3vw, 1.6rem);
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-primary);
          text-decoration: none;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .related-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
