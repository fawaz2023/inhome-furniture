'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Share2, Edit2, Trash2, Eye, EyeOff, Check, Box } from 'lucide-react';
import { Product, Category } from '@/types/database';

interface ProductRowProps {
  product: Product;
  category?: Category;
  onToggleVisibility: (id: string, currentVisibility: boolean) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
}

export default function ProductRow({
  product,
  category,
  onToggleVisibility,
  onDeleteProduct
}: ProductRowProps) {
  const [isVisible, setIsVisible] = useState(product.visible);
  const [isToggling, setIsToggling] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const categorySlug = category ? category.slug : 'furniture';
  const categoryName = category ? category.name : 'Catalogue';
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in'}/${categorySlug}/${product.slug}`;

  // Direct 1-tap customer share link
  const shareMessage = `Hi! Here is our ${product.name} from INHOME FURNITURE Kangeyam: ${productUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  const handleToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);
    const newStatus = !isVisible;
    setIsVisible(newStatus);
    try {
      await onToggleVisibility(product.id, isVisible);
    } catch {
      // Revert on failure
      setIsVisible(!newStatus);
    } finally {
      setIsToggling(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareMessage);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  const thumbnail = product.image_url || (product.images && product.images.length > 0 ? product.images[0] : null);

  return (
    <div className={`product-row-card ${!isVisible ? 'hidden-product' : ''}`}>
      <div className="product-main-info">
        <div className="product-thumb-container">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={product.name}
              width={64}
              height={64}
              className="product-thumb-img"
              unoptimized
            />
          ) : (
            <div className="product-thumb-placeholder">
              <Box size={24} />
            </div>
          )}
          {!isVisible && (
            <div className="hidden-badge-overlay" title="Hidden from customers">
              <EyeOff size={14} />
            </div>
          )}
        </div>

        <div className="product-details">
          <div className="product-name-row">
            <span className="product-title">{product.name}</span>
          </div>

          <div className="product-badges-row">
            <span className="badge category-badge">{categoryName}</span>
            <span className={`badge type-badge ${product.product_type}`}>
              {product.product_type === 'ready_stock' ? 'Ready Stock' : 'Made to Order'}
            </span>
            {!thumbnail && (
              <span className="badge no-photo-badge">
                No Photo
              </span>
            )}
            {product.keywords && product.keywords.length > 0 && (
              <span className="badge keywords-count" title={product.keywords.join(', ')}>
                {product.keywords.length} tags
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Strip: Optimized for single-thumb mobile tapping */}
      <div className="product-actions-strip">
        {/* Visibility Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={isToggling}
          className={`btn-action btn-visibility ${isVisible ? 'active' : 'inactive'}`}
          title={isVisible ? 'Visible to customers (Tap to hide)' : 'Hidden (Tap to show)'}
          aria-label={isVisible ? 'Hide product' : 'Show product'}
        >
          {isVisible ? <Eye size={17} /> : <EyeOff size={17} />}
          <span className="action-text">{isVisible ? 'Visible' : 'Hidden'}</span>
        </button>

        {/* 1-Tap WhatsApp Share to Customer */}
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-action btn-whatsapp-share"
          title="Share direct link to customer via WhatsApp"
        >
          <Share2 size={16} />
          <span className="action-text">Share</span>
        </a>

        {/* Edit Link */}
        <Link
          href={`/admin/products/${product.id}`}
          className="btn-action btn-edit"
          title="Edit product specifications"
        >
          <Edit2 size={16} />
          <span className="action-text">Edit</span>
        </Link>

        {/* Delete */}
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Are you sure you want to remove "${product.name}"?`)) {
              onDeleteProduct(product.id);
            }
          }}
          className="btn-action btn-delete"
          title="Delete product"
          aria-label="Delete product"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <style jsx>{`
        .product-row-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          margin-bottom: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: border-color 0.15s ease, opacity 0.15s ease;
        }

        .product-row-card.hidden-product {
          background-color: #FBF9F7;
          border-color: #E2DDD5;
          opacity: 0.82;
        }

        .product-main-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.75rem;
        }

        .product-thumb-container {
          width: 58px;
          height: 58px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--bg-surface-secondary);
          flex-shrink: 0;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-thumb-placeholder {
          color: var(--text-muted);
        }

        .hidden-badge-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(28, 25, 23, 0.55);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-details {
          flex: 1;
          min-width: 0;
        }

        .product-name-row {
          margin-bottom: 0.25rem;
        }

        .product-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-badges-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
        }

        .category-badge {
          background-color: var(--bg-surface-secondary);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
        }

        .type-badge.ready_stock {
          background-color: #ECFDF5;
          color: #047857;
        }

        .type-badge.made_to_order {
          background-color: #FEF3C7;
          color: #92400E;
        }

        .no-photo-badge {
          background-color: #FEE2E2;
          color: #B91C1C;
          border: 1px solid #FECACA;
        }

        .keywords-count {
          background-color: var(--accent-subtle);
          color: var(--accent-primary);
        }

        .product-actions-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 0.65rem;
          border-top: 1px solid var(--border-subtle);
        }

        .btn-action {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.15s ease;
        }

        .btn-visibility.active {
          background-color: #ECFDF5;
          color: #047857;
          border-color: #A7F3D0;
        }

        .btn-visibility.inactive {
          background-color: #F3F4F6;
          color: #6B7280;
          border-color: #D1D5DB;
        }

        .btn-whatsapp-share {
          background-color: #25D366;
          color: #FFFFFF;
          margin-left: auto;
        }

        .btn-whatsapp-share:hover {
          background-color: #1EBE5D;
        }

        .btn-edit {
          background-color: var(--bg-surface-secondary);
          color: var(--text-primary);
          border-color: var(--border-subtle);
        }

        .btn-edit:hover {
          background-color: #E7E2DA;
        }

        .btn-delete {
          min-width: 44px;
          padding: 0;
          background-color: transparent;
          color: #DC2626;
        }

        .btn-delete:hover {
          background-color: #FEE2E2;
        }

        @media (max-width: 420px) {
          .action-text {
            display: none;
          }
          .btn-action {
            padding: 0 0.65rem;
          }
        }
      `}</style>
    </div>
  );
}
