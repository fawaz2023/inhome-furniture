'use client';

import { useEffect } from 'react';

/**
 * HarmonyStatsCounter
 * Orchestrates smooth ticking counter animations for .harm-counter elements
 * when they enter viewport on scroll.
 *
 * CRITICAL SEO RULE:
 * The component does NOT reset text to "0" on mount.
 * Elements arrive with real values in SSR HTML (e.g., "17", "4.8★", "100%").
 * The reset and count-up animation only occur once the IntersectionObserver
 * triggers on actual user viewport entry.
 */
export default function HarmonyStatsCounter() {
  useEffect(() => {
    // If IntersectionObserver is not supported, do nothing (keep SSR values)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const counterElements = document.querySelectorAll<HTMLElement>('.harm-counter');
    if (!counterElements.length) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animateCounter = (el: HTMLElement) => {
      const targetStr = el.getAttribute('data-target');
      if (!targetStr) return;

      const target = parseFloat(targetStr);
      if (isNaN(target)) return;

      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 1800; // 1.8 seconds smooth count
      const startTime = performance.now();

      // Reset to 0 only when observer triggers
      el.textContent = (0).toFixed(decimals) + suffix;

      const updateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic ease-out: 1 - (1 - t)^3
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeOut * target;

        el.textContent = currentVal.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetEl = entry.target as HTMLElement;
            observer.unobserve(targetEl);
            animateCounter(targetEl);
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    counterElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
