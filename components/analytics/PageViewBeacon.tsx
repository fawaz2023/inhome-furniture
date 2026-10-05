'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageViewBeacon() {
  const pathname = usePathname();
  const lastLoggedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double logging the same path on initial load or re-renders
    if (!pathname || pathname === lastLoggedPath.current) return;
    // Don't track admin pages or API routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;

    lastLoggedPath.current = pathname;

    const payload = JSON.stringify({
      path: pathname,
      referrer: typeof document !== 'undefined' && document.referrer ? document.referrer : null,
    });

    try {
      // Prefer modern sendBeacon for non-blocking telemetry on page navigation / exit
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([payload], { type: 'application/json' });
        const sent = navigator.sendBeacon('/api/pageview', blob);
        if (sent) return;
      }

      // Fallback to fetch with keepalive
      fetch('/api/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Silently swallow analytics failure; never interrupt visitor experience
      });
    } catch {
      // Silently swallow analytics errors
    }
  }, [pathname]);

  return null;
}
