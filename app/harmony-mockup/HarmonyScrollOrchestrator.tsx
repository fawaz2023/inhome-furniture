'use client';

import { useEffect } from 'react';

/**
 * HarmonyScrollOrchestrator
 *
 * Implements the Harmony Globe Habitat scroll choreography:
 * - CSS hides the header by default (prevents FOUC)
 * - Reveals header with smooth spring animation when user scrolls > 100px
 * - Hides header when user returns to top (< 100px)
 *
 * Zero jank: Uses passive scroll listener with requestAnimationFrame debounce.
 * SEO: The <Header> is always in server-rendered HTML. Only CSS visibility
 * changes. Googlebot fully indexes the header content. Zero SEO impact.
 */
export default function HarmonyScrollOrchestrator() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.harm-page .header-wrapper');
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 100) {
            header.classList.add('harm-header-revealed');
          } else {
            header.classList.remove('harm-header-revealed');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial state based on current scroll position
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
