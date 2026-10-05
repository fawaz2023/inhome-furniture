import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/database';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const count = category.product_count ?? 0;

  return (
    <Link
      href={`/${category.slug}`}
      className="category-card"
      aria-label={`View ${category.name} collection (${count} designs)`}
    >
      <div className="card-media">
        <Image
          src={category.image_url}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="card-image"
        />
        <div className="card-overlay" />
        <span className="card-badge">
          {count} {count === 1 ? 'Design' : 'Designs'}
        </span>
      </div>

      <div className="card-body">
        <div className="card-text">
          <h3 className="card-title">{category.name}</h3>
          {category.description && (
            <p className="card-desc">{category.description}</p>
          )}
        </div>
        <div className="card-action-icon" aria-hidden="true">
          <ChevronRight size={18} />
        </div>
      </div>

      <style>{`
        .category-card {
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .category-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-primary);
        }

        .category-card:active {
          transform: scale(0.985);
        }

        .card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background-color: var(--bg-surface-secondary);
          overflow: hidden;
        }

        .card-image {
          object-fit: cover;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .category-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.45) 100%);
        }

        .card-badge {
          position: absolute;
          top: 0.65rem;
          right: 0.65rem;
          background-color: rgba(28, 25, 23, 0.75);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.02em;
        }

        .card-body {
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-surface);
          gap: 0.5rem;
          min-height: 3.5rem;
        }

        .card-text {
          min-width: 0;
        }

        .card-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 0.15rem;
        }

        .card-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }

        .card-action-icon {
          color: var(--text-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: color 0.15s ease, transform 0.15s ease;
        }

        .category-card:hover .card-action-icon {
          color: var(--accent-primary);
          transform: translateX(2px);
        }

        @media (max-width: 640px) {
          .card-body {
            padding: 0.75rem 0.85rem;
          }
          .card-title {
            font-size: 0.925rem;
          }
          .card-desc {
            display: none;
          }
        }
      `}</style>
    </Link>
  );
}
