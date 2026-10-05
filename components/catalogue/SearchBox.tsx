'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, MessageCircle, ArrowRight, Layers, Box } from 'lucide-react';
import { SearchIndexItem } from '@/app/api/search-index/route';
import { buildCustomDesignEnquiryUrl } from '@/lib/whatsapp';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  shopPhone?: string;
}

export default function SearchBox({
  placeholder = 'Search sofas, dining tables, rocking chairs...',
  className = '',
  shopPhone
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [indexData, setIndexData] = useState<SearchIndexItem[] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load index on first focus
  const loadSearchIndex = async () => {
    if (indexData !== null || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/search-index');
      if (res.ok) {
        const json = await res.json();
        setIndexData(json.items || []);
      }
    } catch (err) {
      console.error('Failed to load search index:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Close when tapping outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation: Escape closes results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Fast case-insensitive "contains" matching
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || !indexData) return [];

    const terms = trimmed.split(/\s+/).filter(Boolean);

    return indexData
      .filter((item) => {
        const nameMatch = item.name.toLowerCase();
        const catMatch = (item.categoryName || '').toLowerCase();
        const keywordsStr = item.keywords.join(' ');

        // Every typed term must match in name, category, or keywords
        return terms.every(
          (t) =>
            nameMatch.includes(t) ||
            catMatch.includes(t) ||
            keywordsStr.includes(t)
        );
      })
      .slice(0, 8); // Keep top 8 for lightweight rendering on slow phones
  }, [query, indexData]);

  const clearQuery = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const emptyStateWhatsAppUrl = buildCustomDesignEnquiryUrl(shopPhone);

  return (
    <div
      ref={containerRef}
      className={`search-box-container ${className}`}
      onKeyDown={handleKeyDown}
    >
      <div className={`search-input-wrapper ${isOpen ? 'focused' : ''}`}>
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            loadSearchIndex();
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search furniture designs and categories"
          aria-expanded={isOpen}
          role="combobox"
          autoComplete="off"
          spellCheck={false}
        />
        {isLoading && <div className="search-spinner" aria-label="Loading..." />}
        {query && !isLoading && (
          <button
            type="button"
            onClick={clearQuery}
            className="btn-clear"
            aria-label="Clear search query"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Floating Results Overlay */}
      {isOpen && query.trim().length > 0 && (
        <div className="search-results-overlay">
          {filteredResults.length > 0 ? (
            <div className="search-results-list" role="listbox">
              <div className="results-header">
                Matching Results ({filteredResults.length})
              </div>
              {filteredResults.map((item) => {
                const targetUrl =
                  item.type === 'category'
                    ? `/${item.slug}`
                    : `/${item.categorySlug || 'furniture'}/${item.slug}`;

                return (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={targetUrl}
                    onClick={() => setIsOpen(false)}
                    className="search-result-item"
                    role="option"
                    aria-selected="false"
                  >
                    <div className="result-thumb-wrapper">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="result-thumb"
                          unoptimized
                        />
                      ) : (
                        <div className="result-thumb-fallback">
                          {item.type === 'category' ? <Layers size={18} /> : <Box size={18} />}
                        </div>
                      )}
                    </div>
                    <div className="result-info">
                      <div className="result-title-row">
                        <span className="result-name">{item.name}</span>
                        <span className={`result-badge ${item.type}`}>
                          {item.type === 'category' ? 'Category' : item.categoryName || 'Design'}
                        </span>
                      </div>
                      <span className="result-meta">
                        {item.type === 'category' ? 'Explore full collection' : 'Tap for specs & enquiry'}
                      </span>
                    </div>
                    <ArrowRight size={16} className="result-arrow" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="search-empty-state">
              <p className="empty-title">No match found for &ldquo;{query}&rdquo;</p>
              <p className="empty-sub">
                Browse our categories or ask us directly on WhatsApp for custom pieces.
              </p>
              <div className="empty-actions">
                <a
                  href={emptyStateWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-empty-whatsapp"
                >
                  <MessageCircle size={16} />
                  <span>Ask us on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .search-box-container {
          position: relative;
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
          z-index: 40;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          background-color: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0 1rem;
          min-height: 48px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .search-input-wrapper.focused {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px var(--accent-subtle), 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .search-icon {
          color: var(--text-muted);
          flex-shrink: 0;
          margin-right: 0.6rem;
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          color: var(--text-primary);
          outline: none;
          padding: 0.6rem 0;
          min-width: 0;
        }

        .search-input::placeholder {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .btn-clear {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: -0.5rem;
          border-radius: var(--radius-full);
          transition: color 0.15s ease;
        }

        .btn-clear:hover {
          color: var(--text-primary);
        }

        .search-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--border-subtle);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .search-results-overlay {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          max-height: 440px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          z-index: 100;
        }

        @media (max-width: 640px) {
          .search-results-overlay {
            max-height: calc(100vh - 220px);
          }
          .search-results-list {
            padding-bottom: 3.5rem;
          }
        }

        .results-header {
          padding: 0.6rem 1rem 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          background-color: var(--bg-surface-secondary);
          border-bottom: 1px solid var(--border-subtle);
        }

        .search-result-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 1rem;
          text-decoration: none;
          border-bottom: 1px solid var(--border-subtle);
          min-height: 48px;
          transition: background-color 0.15s ease;
        }

        .search-result-item:last-child {
          border-bottom: none;
        }

        .search-result-item:hover,
        .search-result-item:active {
          background-color: var(--bg-surface-secondary);
        }

        .result-thumb-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--bg-surface-secondary);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .result-thumb-fallback {
          color: var(--text-muted);
        }

        .result-info {
          flex: 1;
          min-width: 0;
        }

        .result-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .result-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .result-badge {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
          background-color: var(--accent-subtle);
          color: var(--accent-primary);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .result-badge.category {
          background-color: #FEF3C7;
          color: #92400E;
        }

        .result-meta {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }

        .result-arrow {
          color: var(--text-muted);
          flex-shrink: 0;
          margin-left: 0.25rem;
        }

        .search-empty-state {
          padding: 1.5rem 1rem;
          text-align: center;
        }

        .empty-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .empty-sub {
          font-size: 0.825rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .empty-actions {
          display: flex;
          justify-content: center;
        }

        .btn-empty-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          padding: 0.65rem 1.15rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          min-height: 44px;
          transition: background-color 0.15s ease;
        }

        .btn-empty-whatsapp:hover {
          background-color: var(--whatsapp-dark);
        }
      `}</style>
    </div>
  );
}
