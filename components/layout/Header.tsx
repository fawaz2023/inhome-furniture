import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

export default function Header() {
  return (
    <header className="header-wrapper">
      <div className="container-standard header-container">
        {/* Brand Wordmark & Location */}
        <div className="header-brand-block">
          <Link href="/" className="header-logo-link">
            <span className="header-brand-name">INHOME FURNITURE</span>
            <span className="header-location">
              <MapPin size={12} className="location-pin" />
              Kangeyam, Tamil Nadu
            </span>
          </Link>

          {/* Static Google 4.8 Rating Badge */}
          <a
            href="https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam+Tamil+Nadu"
            target="_blank"
            rel="noopener noreferrer"
            className="google-rating-badge"
            title="4.8 Stars on Google (23 Reviews)"
          >
            <span className="rating-score">4.8</span>
            <Star size={13} className="star-icon" fill="currentColor" />
            <span className="rating-label">Google</span>
          </a>
        </div>

        {/* Navigation Tabs */}
        <nav className="header-nav">
          <Link href="/" className="nav-item">
            Home
          </Link>
          <Link href="/catalogue" className="nav-item">
            Catalogue
          </Link>
          <Link href="/about" className="nav-item">
            <span className="nav-text-desktop">About & Showroom</span>
            <span className="nav-text-mobile">About</span>
          </Link>
          <Link href="/gallery" className="nav-item nav-item-secondary">
            Gallery
          </Link>
        </nav>
      </div>

      <style>{`
        .header-wrapper {
          position: sticky;
          top: 0;
          z-index: 50;
          background-color: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--header-height);
          gap: 1rem;
        }

        .header-brand-block {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          min-width: 0;
        }

        .header-logo-link {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          min-width: 0;
        }

        .header-brand-name {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          white-space: nowrap;
          line-height: 1.15;
        }

        .header-location {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 0.1rem;
        }

        .location-pin {
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .google-rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.25rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
          transition: background-color 0.15s ease;
          flex-shrink: 0;
        }

        .google-rating-badge:hover {
          background-color: var(--bg-surface-hover);
        }

        .star-icon {
          color: #F59E0B;
        }

        .rating-label {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.7rem;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-item {
          min-height: var(--min-touch-target);
          display: inline-flex;
          align-items: center;
          padding: 0.4rem 0.85rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          transition: color 0.15s ease, background-color 0.15s ease;
        }

        .nav-item:hover, .nav-item:focus-visible {
          color: var(--text-primary);
          background-color: var(--bg-surface-secondary);
        }

        .nav-text-mobile {
          display: none;
        }

        @media (max-width: 640px) {
          .google-rating-badge {
            display: none;
          }
          .nav-text-desktop {
            display: none;
          }
          .nav-text-mobile {
            display: inline;
          }
          .header-container {
            gap: 0.5rem;
          }
          .header-nav {
            gap: 0.2rem;
          }
          .nav-item {
            padding: 0.35rem 0.45rem;
            font-size: 0.8125rem;
          }
          .header-brand-name {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </header>
  );
}
