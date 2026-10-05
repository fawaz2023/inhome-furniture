import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/database';
import { Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { buildProductEnquiryUrl } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  categorySlug: string;
  shopPhone?: string;
}

export default function ProductCard({ product, categorySlug, shopPhone }: ProductCardProps) {
  const isMadeToOrder = product.product_type === 'made_to_order';
  const detailUrl = `/${categorySlug}/${product.slug}`;
  const whatsappUrl = buildProductEnquiryUrl(
    product.name,
    categorySlug,
    product.slug,
    'standard',
    shopPhone
  );
  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';

  return (
    <article className="product-card">
      <Link href={detailUrl} className="product-card-link">
        {/* Media Container */}
        <div className="product-media-wrapper">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="product-image"
          />

          {/* Status Badge */}
          <div className="product-badge-position">
            {isMadeToOrder ? (
              <span className="badge badge-order">
                <Sparkles size={11} />
                <span>Made to order</span>
              </span>
            ) : (
              <span className="badge badge-ready">
                <CheckCircle2 size={11} />
                <span>Ready stock</span>
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="product-content">
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>

          <p className="product-spec-snippet">
            {product.customisation_options?.wood_options?.slice(0, 2).join(' • ') || 'Customizable wood & size'}
          </p>
        </div>
      </Link>

      {/* WhatsApp Quick Enquiry Button */}
      <div className="product-footer-action">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-quick-enquire"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
        >
          <MessageCircle size={15} />
          <span>Enquire</span>
        </a>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }

        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-primary);
        }

        .product-card-link {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          flex: 1;
        }

        .product-media-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background-color: var(--bg-surface-secondary);
          overflow: hidden;
        }

        .product-image {
          object-fit: cover;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-badge-position {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          z-index: 2;
        }

        .product-content {
          padding: 0.85rem 0.85rem 0.5rem;
          display: flex;
          flex-direction: column;
        }

        .product-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.5rem;
          margin-bottom: 0.25rem;
        }

        .product-spec-snippet {
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-footer-action {
          padding: 0.5rem 0.85rem 0.85rem;
          margin-top: auto;
        }

        .btn-quick-enquire {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          width: 100%;
          min-height: 44px;
          background-color: var(--bg-surface-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .btn-quick-enquire:hover {
          background-color: #ECFDF5;
          color: #047857;
          border-color: #A7F3D0;
        }

        @media (max-width: 640px) {
          .product-title {
            font-size: 0.875rem;
          }
          .product-content {
            padding: 0.75rem 0.75rem 0.4rem;
          }
          .product-footer-action {
            padding: 0.4rem 0.75rem 0.75rem;
          }
        }
      `}</style>
    </article>
  );
}
