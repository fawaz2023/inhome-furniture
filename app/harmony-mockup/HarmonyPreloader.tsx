'use client';

import React, { useState, useEffect } from 'react';
import { TreeDeciduous } from 'lucide-react';

interface HarmonyPreloaderProps {
  brandName?: string;
  subtitle?: string;
  onComplete?: () => void;
}

export default function HarmonyPreloader({
  brandName = 'INHOME',
  subtitle = 'FURNITURE • KANGEYAM',
  onComplete,
}: HarmonyPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2200; // 2.2 seconds fluid loading

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(step);
      } else {
        // Trigger zoom exit after a tiny pause at 100%
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsRemoved(true);
            if (onComplete) onComplete();
          }, 1100); // Wait for zoom and fade transition
        }, 250);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  if (isRemoved) return null;

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsRemoved(true);
      if (onComplete) onComplete();
    }, 400);
  };

  // Wave level rises as progress increases
  // Progress goes from 0 to 100, progressStyle adjusts the wave height
  const waveProgress = `${10 + progress * 0.78}%`;

  return (
    <div
      className={`harmony-preloader-overlay ${isExiting ? 'preloader-exit-fade' : ''}`}
      aria-hidden="true"
    >
      {/* Right Edge Architectural Vertical Tag */}
      <div className={`harmony-preloader-side-pill ${isExiting ? 'side-pill-exit' : ''}`}>
        <TreeDeciduous size={18} className="side-pill-icon" />
        <span className="side-pill-text">KANGEYAM</span>
      </div>

      {/* Center Liquid Brand Block */}
      <div className={`harmony-preloader-center ${isExiting ? 'center-exit-zoom' : ''}`}>
        <div className="harmony-liquid-wrapper">
          {/* Faint Background Outline */}
          <span className="harmony-liquid-ghost">{brandName}</span>

          {/* Liquid Wave Filled Text */}
          <span
            className="harmony-liquid-fill"
            style={{ '--progress': waveProgress } as React.CSSProperties}
          >
            {brandName}
          </span>

          {/* Subtitle letter stagger / reveal */}
          <div className="harmony-preloader-subtitle">
            {subtitle.split('').map((char, index) => (
              <span
                key={index}
                className="subtitle-char"
                style={{ animationDelay: `${0.2 + index * 0.03}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          {/* Live Percentage Counter */}
          <div className="harmony-preloader-counter">
            <span className="counter-label">crafting timber</span>
            <span className="counter-number">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Manual Skip Button for Convenience */}
      <button
        type="button"
        onClick={handleSkip}
        className="harmony-preloader-skip"
        title="Skip intro animation"
      >
        Skip Intro &rarr;
      </button>
    </div>
  );
}
