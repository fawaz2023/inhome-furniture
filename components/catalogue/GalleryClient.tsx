'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Maximize2, MessageSquare, Sparkles } from 'lucide-react';
import { GalleryItem, GalleryItemType } from '@/types/database';
import Lightbox from './Lightbox';
import { formatWhatsAppNumber } from '@/lib/whatsapp';

interface GalleryClientProps {
  initialItems: GalleryItem[];
  shopPhone?: string;
  whatsappNumber?: string;
  afterHoursNote?: string | null;
}

type FilterKey = 'all' | GalleryItemType;

const FILTER_TABS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Pieces' },
  { key: 'showroom', label: 'Showroom Displays' },
  { key: 'finished_work', label: 'Finished Custom Work' },
  { key: 'new_arrival', label: 'New Arrivals' },
];

const TYPE_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  showroom: { label: 'Showroom', bg: '#EFF6FF', color: '#1D4ED8' },
  finished_work: { label: 'Custom Work', bg: '#FEF3C7', color: '#92400E' },
  new_arrival: { label: 'New Arrival', bg: '#ECFDF5', color: '#047857' },
};

export default function GalleryClient({
  initialItems,
  shopPhone = '919999999999',
  whatsappNumber = '919999999999',
  afterHoursNote,
}: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return initialItems;
    return initialItems.filter((item) => item.item_type === activeFilter);
  }, [initialItems, activeFilter]);

  // Counts per filter
  const counts = useMemo(() => {
    const map: Record<FilterKey, number> = {
      all: initialItems.length,
      showroom: 0,
      finished_work: 0,
      new_arrival: 0,
    };
    initialItems.forEach((item) => {
      if (map[item.item_type] !== undefined) {
        map[item.item_type]++;
      }
    });
    return map;
  }, [initialItems]);

  const customOrderUrl = `https://wa.me/${formatWhatsAppNumber(whatsappNumber)}?text=${encodeURIComponent(
    "Hi INHOME Furniture, I have my own custom furniture idea / reference photo. I'd like to share details and get a quote."
  )}`;

  return (
    <div className="gallery-client">
      {/* Filter Tabs Bar */}
      <div className="filter-scroll-container">
        <div className="filter-tabs-wrapper" role="tablist" aria-label="Gallery category filters">
          {FILTER_TABS.map((tab) => {
            const count = counts[tab.key];
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(tab.key)}
                className={`filter-tab-btn ${isActive ? 'active' : ''}`}
              >
                <span>{tab.label}</span>
                <span className={`tab-count-badge ${isActive ? 'active' : ''}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Gallery Cards */}
      {filteredItems.length === 0 ? (
        <div className="empty-gallery-state">
          <p className="empty-title">No pieces found in this category</p>
          <button
            type="button"
            className="empty-reset-btn"
            onClick={() => setActiveFilter('all')}
          >
            View All Pieces
          </button>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredItems.map((item, index) => {
            const config = TYPE_CONFIG[item.item_type] || {
              label: 'Craft',
              bg: '#F3EFEA',
              color: '#1C1917',
            };

            return (
              <article
                key={item.id}
                className="gallery-card"
                onClick={() => setLightboxIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.caption || 'gallery item'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIndex(index);
                  }
                }}
              >
                <div className="gallery-media-wrapper">
                  <Image
                    src={item.image_url}
                    alt={item.caption || 'INHOME Furniture Gallery Piece'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
                    className="gallery-card-img"
                  />
                  <div className="gallery-card-overlay">
                    <span className="zoom-hint">
                      <Maximize2 size={16} />
                    </span>
                  </div>

                  {/* Badge */}
                  <span
                    className="gallery-type-pill"
                    style={{ backgroundColor: config.bg, color: config.color }}
                  >
                    {config.label}
                  </span>
                </div>

                {item.caption && (
                  <div className="gallery-card-body">
                    <p className="gallery-caption">{item.caption}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Bespoke Custom Inquiry Banner */}
      <section className="gallery-custom-banner">
        <div className="banner-content">
          <div className="banner-icon-badge">
            <Sparkles size={20} className="sparkle-icon" />
          </div>
          <div className="banner-text">
            <h2 className="banner-title">Have a specific design in mind?</h2>
            <p className="banner-desc">
              Share your room dimensions, architectural sketches, or inspiration photos directly on WhatsApp for an exact custom quote.
            </p>
          </div>
        </div>
        <div className="banner-action-col">
          <a
            href={customOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="banner-whatsapp-btn"
          >
            <MessageSquare size={18} />
            <span>Consult on WhatsApp</span>
          </a>
          {afterHoursNote && (
            <p className="banner-after-hours">{afterHoursNote}</p>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        selectedIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        shopPhone={shopPhone}
        afterHoursNote={afterHoursNote}
      />

      <style jsx>{`
        .gallery-client {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .filter-scroll-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 0.25rem;
          margin: 0 -1rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .filter-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .filter-tabs-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          min-width: max-content;
        }

        .filter-tab-btn {
          min-height: var(--min-touch-target, 44px);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full, 9999px);
          border: 1px solid var(--border-subtle);
          background-color: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .filter-tab-btn:hover {
          border-color: var(--accent-primary);
          background-color: var(--bg-surface-secondary);
        }

        .filter-tab-btn.active {
          background-color: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
          box-shadow: 0 4px 12px rgba(139, 90, 43, 0.2);
        }

        .tab-count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          background-color: var(--bg-surface-secondary);
          color: var(--text-muted);
        }

        .tab-count-badge.active {
          background-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        .gallery-card {
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md, 12px);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .gallery-card:hover {
          transform: translateY(-2px);
          border-color: rgba(139, 90, 43, 0.4);
          box-shadow: var(--shadow-md, 0 8px 16px rgba(0, 0, 0, 0.08));
        }

        .gallery-media-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background-color: var(--bg-surface-secondary);
          overflow: hidden;
        }

        :global(.gallery-card-img) {
          object-fit: cover !important;
          transition: transform 0.35s ease !important;
        }

        .gallery-card:hover :global(.gallery-card-img) {
          transform: scale(1.05);
        }

        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.5) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 0.75rem;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .gallery-card:hover .gallery-card-overlay {
          opacity: 1;
        }

        .zoom-hint {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.9);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .gallery-type-pill {
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full, 9999px);
          letter-spacing: 0.03em;
          text-transform: uppercase;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .gallery-card-body {
          padding: 0.75rem 0.85rem;
          background-color: var(--bg-surface);
          flex: 1;
          display: flex;
          align-items: center;
        }

        .gallery-caption {
          font-size: 0.8125rem;
          line-height: 1.4;
          color: var(--text-primary);
          font-weight: 500;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .empty-gallery-state {
          padding: 3rem 1.5rem;
          text-align: center;
          background-color: var(--bg-surface);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-md, 12px);
        }

        .empty-title {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .empty-reset-btn {
          min-height: var(--min-touch-target, 44px);
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-sm, 8px);
          background-color: var(--accent-primary);
          color: #ffffff;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }

        .gallery-custom-banner {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg, 16px);
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: var(--shadow-sm);
        }

        @media (min-width: 768px) {
          .gallery-custom-banner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 2rem;
          }
        }

        .banner-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          max-width: 620px;
        }

        .banner-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: #fef3c7;
          color: #92400e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .banner-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 0.35rem;
        }

        .banner-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .banner-action-col {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 240px;
        }

        .banner-whatsapp-btn {
          min-height: var(--min-touch-target, 48px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background-color: #25d366;
          color: #ffffff;
          font-size: 0.925rem;
          font-weight: 700;
          border-radius: var(--radius-md, 10px);
          text-decoration: none;
          padding: 0.6rem 1.25rem;
          transition: background-color 0.15s ease, transform 0.15s ease;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2);
        }

        .banner-whatsapp-btn:hover {
          background-color: #20ba5a;
          transform: translateY(-1px);
        }

        .banner-after-hours {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-align: center;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
