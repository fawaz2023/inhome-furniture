'use client';

import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';
import { GalleryItem } from '@/types/database';
import { formatWhatsAppNumber } from '@/lib/whatsapp';

interface LightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  shopPhone?: string;
  afterHoursNote?: string | null;
}

const TYPE_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  showroom: { label: 'Showroom Display', bg: '#EFF6FF', text: '#1D4ED8' },
  finished_work: { label: 'Finished Custom Work', bg: '#FEF3C7', text: '#92400E' },
  new_arrival: { label: 'New Arrival', bg: '#ECFDF5', text: '#047857' },
};

export default function Lightbox({
  items,
  selectedIndex,
  onClose,
  onNavigate,
  shopPhone = '919999999999',
  afterHoursNote,
}: LightboxProps) {
  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length;
  const currentItem = isOpen ? items[selectedIndex] : null;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((selectedIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((selectedIndex + 1) % items.length);
      }
    },
    [isOpen, selectedIndex, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  const currentType = TYPE_LABELS[currentItem.item_type] || {
    label: 'Gallery Showcase',
    bg: '#F3EFEA',
    text: '#1C1917',
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://inhomefurniture.in/gallery';
  const whatsappMessage = `Hi INHOME Furniture, I saw this piece in your gallery (${currentItem.caption || 'Showcase piece'}): ${currentUrl}. Please share details and pricing.`;
  const whatsappUrl = `https://wa.me/${formatWhatsAppNumber(shopPhone)}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Image Lightbox"
      onClick={onClose}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Bar with Counter & Close Button */}
        <div className="lightbox-header">
          <div className="lightbox-counter">
            <span className="counter-pill">
              {selectedIndex + 1} / {items.length}
            </span>
            <span
              className="type-badge"
              style={{ backgroundColor: currentType.bg, color: currentType.text }}
            >
              {currentType.label}
            </span>
          </div>

          <button
            type="button"
            className="lightbox-btn-close"
            onClick={onClose}
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>

        {/* Central Stage with Image & Nav Controls */}
        <div className="lightbox-stage">
          {items.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn prev"
              onClick={() => onNavigate((selectedIndex - 1 + items.length) % items.length)}
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="lightbox-image-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.image_url}
              alt={currentItem.caption || 'INHOME Furniture Gallery Piece'}
              className="lightbox-img-element"
            />
          </div>

          {items.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn next"
              onClick={() => onNavigate((selectedIndex + 1) % items.length)}
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Footer with Caption & WhatsApp Enquiry CTA */}
        <div className="lightbox-footer">
          {currentItem.caption && (
            <p className="lightbox-caption">{currentItem.caption}</p>
          )}

          <div className="lightbox-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-whatsapp-btn"
            >
              <MessageSquare size={18} />
              <span>Ask About This Piece on WhatsApp</span>
              <ExternalLink size={14} className="ext-icon" />
            </a>

            {afterHoursNote && (
              <p className="lightbox-after-hours">{afterHoursNote}</p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background-color: rgba(15, 13, 11, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: lightboxFadeIn 0.2s ease;
        }

        .lightbox-content {
          position: relative;
          width: 100%;
          max-width: 980px;
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          background: #1c1917;
          border-radius: var(--radius-lg, 16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .lightbox-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background-color: rgba(28, 25, 23, 0.8);
        }

        .lightbox-counter {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .counter-pill {
          font-size: 0.8rem;
          font-weight: 700;
          color: #d6d3d1;
          letter-spacing: 0.02em;
        }

        .type-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .lightbox-btn-close {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background-color: rgba(255, 255, 255, 0.08);
          color: #fafaf9;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.15s ease, transform 0.15s ease;
        }

        .lightbox-btn-close:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .lightbox-stage {
          position: relative;
          width: 100%;
          flex: 1;
          min-height: 280px;
          height: 52vh;
          max-height: 580px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0c0a09;
        }

        .lightbox-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
        }

        .lightbox-img-element {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: var(--radius-sm, 8px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(28, 25, 23, 0.7);
          color: #fafaf9;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.15s ease, transform 0.15s ease;
        }

        .lightbox-nav-btn:hover {
          background-color: rgba(28, 25, 23, 0.95);
          transform: translateY(-50%) scale(1.08);
        }

        .lightbox-nav-btn.prev {
          left: 1rem;
        }

        .lightbox-nav-btn.next {
          right: 1rem;
        }

        .lightbox-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background-color: rgba(28, 25, 23, 0.9);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .lightbox-caption {
          font-size: 0.925rem;
          line-height: 1.45;
          color: #f5f5f4;
          font-weight: 500;
          margin: 0;
        }

        .lightbox-actions {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .lightbox-whatsapp-btn {
          min-height: 48px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background-color: #25d366;
          color: #ffffff;
          font-size: 0.925rem;
          font-weight: 700;
          border-radius: var(--radius-md, 10px);
          text-decoration: none;
          transition: background-color 0.15s ease, transform 0.15s ease;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
        }

        .lightbox-whatsapp-btn:hover {
          background-color: #20ba5a;
          transform: translateY(-1px);
        }

        .ext-icon {
          opacity: 0.8;
        }

        .lightbox-after-hours {
          font-size: 0.75rem;
          color: #a8a29e;
          text-align: center;
          margin: 0;
        }

        @keyframes lightboxFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .lightbox-overlay {
            padding: 0.5rem;
          }
          .lightbox-stage {
            height: 44vh;
          }
          .lightbox-nav-btn.prev {
            left: 0.5rem;
          }
          .lightbox-nav-btn.next {
            right: 0.5rem;
          }
          .lightbox-btn-close {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </div>
  );
}
