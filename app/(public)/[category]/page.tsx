import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMockCategories } from '@/lib/mock-data';
import {
  getServerCategoryBySlug,
  getServerProductsByCategorySlug,
  getServerShopSettings
} from '@/lib/supabase-server';
import ProductCard from '@/components/catalogue/ProductCard';
import { ChevronRight, Home, Sparkles, MessageCircle, Clock } from 'lucide-react';
import { buildCustomDesignEnquiryUrl } from '@/lib/whatsapp';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getMockCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getServerCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | INHOME FURNITURE',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in';
  const rawImage = category.image_url || '/og-default.jpg';
  const primaryImage = rawImage.startsWith('http') ? rawImage : `${baseUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

  return {
    title: `${category.name} | Custom Furniture Catalogue | INHOME FURNITURE Kangeyam`,
    description:
      category.description ||
      `Explore custom-made ${category.name} by INHOME FURNITURE in Kangeyam. Premium solid wood craftsmanship tailored to your specifications.`,
    alternates: {
      canonical: `/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Collection | INHOME FURNITURE Kangeyam`,
      description:
        category.description || `Browse custom handcrafted ${category.name} options. Chat directly with us on WhatsApp.`,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: `${category.name} Collection`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | INHOME FURNITURE`,
      description:
        category.description || `Customise ${category.name} with INHOME FURNITURE Kangeyam on WhatsApp.`,
      images: [primaryImage],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = await getServerCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [products, settings] = await Promise.all([
    getServerProductsByCategorySlug(slug),
    getServerShopSettings()
  ]);
  const customWhatsAppUrl = buildCustomDesignEnquiryUrl(settings.whatsapp_number);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Catalogue', url: '/catalogue' },
    { name: category.name, url: `/${category.slug}` },
  ]);

  return (
    <div className="category-page-wrapper">
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
          <span className="breadcrumb-current" aria-current="page">
            {category.name}
          </span>
        </nav>

        {/* Category Header */}
        <header className="category-header">
          <div className="category-header-text">
            <span className="category-eyebrow">Category Showcase</span>
            <h1 className="category-title">{category.name}</h1>
            {category.description && (
              <p className="category-description">{category.description}</p>
            )}
          </div>
          <div className="category-stat-badge">
            <span className="stat-count">{products.length}</span>
            <span className="stat-label">{products.length === 1 ? 'Design Listed' : 'Designs Listed'}</span>
          </div>
        </header>

        {/* Product Grid or Empty State */}
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={category.slug}
                shopPhone={settings.whatsapp_number}
              />
            ))}
          </div>
        ) : (
          <div className="empty-category-box">
            <Sparkles size={32} className="empty-icon" />
            <h3 className="empty-title">New Designs Currently in Production</h3>
            <p className="empty-desc">
              We create custom {category.name.toLowerCase()} tailored to your room dimensions and wood choice. Tap below to share a reference photo or request a quote.
            </p>
            <a
              href={customWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>Customise {category.name} on WhatsApp</span>
            </a>
            {settings.after_hours_note && (
              <span className="after-hours-category-note">
                <Clock size={12} className="inline-clock" />
                <span>{settings.after_hours_note}</span>
              </span>
            )}
          </div>
        )}

        {/* Custom Order Callout for this Category */}
        <div className="category-custom-banner">
          <div className="custom-banner-text">
            <h3 className="banner-title">Need custom dimensions or different wood?</h3>
            <p className="banner-desc">
              Every design above can be tailored in Teak Wood, Country Wood, or Rosewood with custom polish shades.
            </p>
          </div>
          <div className="banner-action-wrap">
            <a
              href={customWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageCircle size={17} />
              <span>Consult on WhatsApp</span>
            </a>
            {settings.after_hours_note && (
              <span className="after-hours-category-note">
                <Clock size={12} className="inline-clock" />
                <span>{settings.after_hours_note}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .category-page-wrapper {
          padding: 1.5rem 0 3.5rem;
        }

        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.825rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
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

        .category-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1.75rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .category-header-text {
          max-width: 680px;
        }

        .category-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 0.3rem;
        }

        .category-title {
          font-size: clamp(1.75rem, 4.5vw, 2.5rem);
          margin-bottom: 0.6rem;
        }

        .category-description {
          font-size: 1rem;
          line-height: 1.55;
          color: var(--text-muted);
        }

        .category-stat-badge {
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-count {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.725rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }

        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        .empty-category-box {
          background-color: var(--bg-surface);
          border: 1.5px dashed var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 3.5rem 1.5rem;
          text-align: center;
          max-width: 540px;
          margin: 2rem auto 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .empty-icon {
          color: var(--accent-primary);
          margin-bottom: 1rem;
        }

        .empty-title {
          font-size: 1.2rem;
          margin-bottom: 0.6rem;
        }

        .empty-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        .category-custom-banner {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          box-shadow: var(--shadow-sm);
        }

        .custom-banner-text {
          max-width: 580px;
        }

        .banner-title {
          font-size: 1.1rem;
          margin-bottom: 0.35rem;
        }

        .banner-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .banner-action-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.4rem;
        }

        .after-hours-category-note {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          color: var(--text-muted);
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-sm);
          width: fit-content;
        }

        .after-hours-category-note .inline-clock {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .category-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .category-stat-badge {
            align-self: flex-start;
          }
          .category-custom-banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
