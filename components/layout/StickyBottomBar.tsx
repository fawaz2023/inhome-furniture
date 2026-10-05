import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { formatWhatsAppNumber } from '@/lib/whatsapp';

interface StickyBottomBarProps {
  phoneNumber?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  afterHoursNote?: string | null;
}

export default function StickyBottomBar({
  phoneNumber = '919999999999',
  whatsappNumber = '919999999999',
  whatsappMessage = 'Hi INHOME Furniture, I have an enquiry regarding custom furniture.',
  afterHoursNote
}: StickyBottomBarProps) {
  const cleanPhone = formatWhatsAppNumber(phoneNumber);
  const cleanWhatsapp = formatWhatsAppNumber(whatsappNumber);
  const callUrl = `tel:+${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  const mapsUrl = 'https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam+Tamil+Nadu';

  return (
    <aside className="sticky-bar-wrapper" aria-label="Quick contact actions">
      <div className="sticky-bar-container">
        {/* Call Button */}
        <a
          href={callUrl}
          className="sticky-action-btn sticky-call-btn"
          aria-label="Call INHOME FURNITURE"
        >
          <Phone size={20} className="action-icon" />
          <span className="action-label">Call</span>
        </a>

        {/* WhatsApp Button (Primary CTA) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-action-btn sticky-whatsapp-btn"
          aria-label="Enquire on WhatsApp"
        >
          <div className="whatsapp-main-row">
            <MessageCircle size={20} className="action-icon" />
            <span className="action-label">WhatsApp</span>
          </div>
          {afterHoursNote && (
            <span className="sticky-micro-note">{afterHoursNote}</span>
          )}
        </a>

        {/* Directions Button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-action-btn sticky-directions-btn"
          aria-label="Get directions to Kangeyam showroom"
        >
          <Navigation size={20} className="action-icon" />
          <span className="action-label">Directions</span>
        </a>
      </div>

      <style>{`
        .sticky-bar-wrapper {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 90;
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sticky);
          padding-bottom: env(safe-area-inset-bottom, 8px);
        }

        .sticky-bar-container {
          display: grid;
          grid-template-columns: 1fr 1.6fr 1fr;
          gap: 0.5rem;
          max-width: 540px;
          margin: 0 auto;
          padding: 0.5rem 0.75rem;
          align-items: center;
        }

        .sticky-action-btn {
          min-height: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.1s ease, background-color 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .sticky-action-btn:active {
          transform: scale(0.97);
        }

        .sticky-call-btn, .sticky-directions-btn {
          background-color: var(--bg-surface-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
        }

        .sticky-call-btn:hover, .sticky-directions-btn:hover {
          background-color: var(--bg-surface-hover);
        }

        .sticky-whatsapp-btn {
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(37, 211, 102, 0.35);
        }

        .sticky-whatsapp-btn:hover {
          background-color: var(--whatsapp-dark);
        }

        .action-label {
          font-size: 0.75rem;
          line-height: 1;
          letter-spacing: 0.01em;
        }

        .sticky-whatsapp-btn .action-label {
          font-weight: 700;
          font-size: 0.8rem;
        }

        .whatsapp-main-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .sticky-micro-note {
          font-size: 0.62rem;
          line-height: 1;
          opacity: 0.92;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 140px;
          padding: 0 0.25rem;
        }

        @media (max-width: 360px) {
          .sticky-micro-note {
            max-width: 105px;
            font-size: 0.58rem;
          }
        }

        .action-icon {
          flex-shrink: 0;
        }
      `}</style>
    </aside>
  );
}
