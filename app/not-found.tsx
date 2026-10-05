import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';

export const metadata = {
  title: {
    absolute: 'Page Not Found | INHOME FURNITURE Kangeyam',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'var(--color-bg, #FAF8F5)',
        color: 'var(--color-text-main, #1C1917)',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(139, 90, 43, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          color: 'var(--color-primary, #8B5A2B)',
        }}
      >
        <Compass size={32} strokeWidth={1.75} />
      </div>

      <span
        style={{
          fontSize: '0.8125rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-primary, #8B5A2B)',
          marginBottom: '0.5rem',
        }}
      >
        Error 404
      </span>

      <h1
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 800,
          fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
          lineHeight: 1.2,
          marginBottom: '1rem',
          maxWidth: '20ch',
        }}
      >
        Design Not Found
      </h1>

      <p
        style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted, #78716C)',
          maxWidth: '460px',
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}
      >
        The page or furniture piece you are looking for has been moved or does not exist. Browse our complete catalogue to discover handcrafted teak designs.
      </p>

      <Link
        href="/catalogue"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 1.75rem',
          backgroundColor: 'var(--color-primary, #8B5A2B)',
          color: '#FFFFFF',
          borderRadius: '9999px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          textDecoration: 'none',
          minHeight: '44px',
          boxShadow: '0 4px 12px rgba(139, 90, 43, 0.25)',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        }}
      >
        <span>Explore Catalogue</span>
        <ArrowRight size={18} />
      </Link>
    </main>
  );
}
