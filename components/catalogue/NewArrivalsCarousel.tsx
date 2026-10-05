import { Product } from '@/types/database';
import ProductCard from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NewArrivalsCarouselProps {
  products: (Product & { categorySlug: string })[];
  shopPhone?: string;
}

export default function NewArrivalsCarousel({ products, shopPhone }: NewArrivalsCarouselProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="new-arrivals-section" aria-labelledby="new-arrivals-heading">
      <div className="container-standard">
        <div className="section-head">
          <div>
            <div className="section-pill">
              <Sparkles size={13} className="pill-icon" />
              <span>Latest Additions</span>
            </div>
            <h2 id="new-arrivals-heading" className="section-title">
              New Designs & Ready Stock
            </h2>
          </div>
          <span className="scroll-hint">Swipe to explore →</span>
        </div>

        <div className="carousel-scroll-wrapper">
          <div className="carousel-track">
            {products.map((product) => (
              <div key={product.id} className="carousel-slide">
                <ProductCard
                  product={product}
                  categorySlug={product.categorySlug}
                  shopPhone={shopPhone}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .new-arrivals-section {
          padding: 2.5rem 0 3rem;
        }

        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .section-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background-color: var(--accent-subtle);
          color: var(--accent-primary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.4rem;
        }

        .pill-icon {
          color: var(--accent-primary);
        }

        .section-title {
          font-size: clamp(1.35rem, 3.5vw, 1.75rem);
        }

        .scroll-hint {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .carousel-scroll-wrapper {
          overflow-x: auto;
          margin-left: -1rem;
          margin-right: -1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-bottom: 1rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--border-subtle) transparent;
        }

        .carousel-track {
          display: flex;
          gap: 1rem;
          width: max-content;
        }

        .carousel-slide {
          width: 260px;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .carousel-slide {
            width: 220px;
          }
          .scroll-hint {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
