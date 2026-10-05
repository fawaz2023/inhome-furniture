import Link from 'next/link';
import { MapPin, Clock, Phone, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';

import { getServerShopSettings } from '@/lib/supabase-server';

export default async function Footer() {
  const settings = await getServerShopSettings();
  const phone = settings.phone || '+919999999999';
  const phoneClean = phone.replace(/\s+/g, '');
  const address = settings.address || 'TCL Tower, 3/43A, Chennimalai Rd, Kangeyam, Tamil Nadu 638701';
  const openingHours = settings.opening_hours || 'Monday – Saturday: 9:00 AM – 6:00 PM';
  const googleRating = settings.google_rating ?? 4.8;
  const googleReviewsCount = settings.google_reviews_count ?? 23;

  return (
    <footer className="footer-wrapper">
      <div className="container-standard footer-container">
        {/* Brand & Bio */}
        <div className="footer-col">
          <div className="footer-brand-title">INHOME FURNITURE</div>
          <p className="footer-tagline">
            Custom-crafted furniture specialists and design consultants in Kangeyam. Every piece is crafted to your specifications using authentic Nilambur teak wood, curated solid timber, and hand-buffed finishes.
          </p>
          <div className="footer-trust-badge">
            <ShieldCheck size={16} className="trust-icon" />
            <span>Google Rated {googleRating.toFixed(1)} / 5 Stars ({googleReviewsCount} Verified Reviews)</span>
          </div>
        </div>

        {/* Visit & Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Showroom & Visit</h4>
          <ul className="footer-info-list">
            <li className="footer-info-item">
              <MapPin size={18} className="info-icon" />
              <span>
                {address}
              </span>
            </li>
            <li className="footer-info-item">
              <Clock size={18} className="info-icon" />
              <span>{openingHours}</span>
            </li>
            <li className="footer-info-item">
              <Phone size={18} className="info-icon" />
              <a href={`tel:${phoneClean}`} className="info-link">
                {phone} (Showroom Desk)
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <ul className="footer-nav-list">
            <li>
              <Link href="/" className="footer-link">
                Home (Nilambur Teak Story)
              </Link>
            </li>
            <li>
              <Link href="/catalogue" className="footer-link">
                Browse Full Catalogue
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-link">
                About & Showroom Directions
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="footer-link">
                Finished Custom Projects
              </Link>
            </li>
            <li>
              <a
                href="https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link external"
              >
                <span>Google Maps Profile</span>
                <ExternalLink size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Subfooter */}
      <div className="footer-bottom">
        <div className="container-standard footer-bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} INHOME FURNITURE, Kangeyam. All rights reserved. Custom-made to order.
          </p>
          <div className="subfooter-links">
            <Link href="/admin/login" className="admin-login-link">
              Owner Admin
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background-color: var(--bg-surface-secondary);
          border-top: 1px solid var(--border-subtle);
          margin-top: 4rem;
          color: var(--text-primary);
        }

        .footer-container {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 2.5rem;
          padding-top: 3.5rem;
          padding-bottom: 3.5rem;
        }

        .footer-brand-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .footer-tagline {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          max-width: 380px;
        }

        .footer-trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.4rem 0.75rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .trust-icon {
          color: #059669;
          flex-shrink: 0;
        }

        .footer-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .footer-info-list, .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-info-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .info-icon {
          color: var(--accent-primary);
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        .info-link, .footer-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.15s ease;
        }

        .info-link:hover, .footer-link:hover {
          color: var(--accent-primary);
        }

        .footer-link.external {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .footer-bottom {
          border-top: 1px solid var(--border-subtle);
          background-color: rgba(0, 0, 0, 0.02);
          padding: 1.25rem 0;
        }

        .footer-bottom-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .copyright-text {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .admin-login-link {
          font-size: 0.75rem;
          color: var(--text-subtle);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .admin-login-link:hover {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding-top: 2.5rem;
            padding-bottom: 2.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
