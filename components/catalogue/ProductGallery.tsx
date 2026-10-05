'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
  ];

  return (
    <div className="gallery-container">
      {/* Main Large Image */}
      <div className="gallery-main-frame">
        <Image
          src={displayImages[selectedIndex]}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="gallery-main-image"
        />
      </div>

      {/* Thumbnails Row if multiple photos */}
      {displayImages.length > 1 && (
        <div className="gallery-thumbs-row">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`gallery-thumb-btn ${idx === selectedIndex ? 'active' : ''}`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="80px"
                className="gallery-thumb-image"
              />
            </button>
          ))}
        </div>
      )}

      <style>{`
        .gallery-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .gallery-main-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background-color: var(--bg-surface-secondary);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }

        .gallery-main-image {
          object-fit: cover;
          transition: opacity 0.2s ease;
        }

        .gallery-thumbs-row {
          display: flex;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          scrollbar-width: none;
        }

        .gallery-thumbs-row::-webkit-scrollbar {
          display: none;
        }

        .gallery-thumb-btn {
          position: relative;
          width: 72px;
          height: 54px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid transparent;
          background-color: var(--bg-surface-secondary);
          flex-shrink: 0;
          cursor: pointer;
          transition: border-color 0.15s ease, transform 0.1s ease;
        }

        .gallery-thumb-btn.active {
          border-color: var(--accent-primary);
        }

        .gallery-thumb-btn:hover {
          transform: translateY(-1px);
        }

        .gallery-thumb-image {
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
