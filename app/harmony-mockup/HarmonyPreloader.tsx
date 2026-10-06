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

      <style jsx>{`
        .harmony-preloader-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #0D0B0A;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: auto;
        }

        .preloader-exit-fade {
          opacity: 0;
          pointer-events: none;
        }

        /* Right Architectural Tag */
        .harmony-preloader-side-pill {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: #E7C873;
          color: #1C1917;
          width: 44px;
          padding: 1.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          z-index: 10;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
          transition: transform 0.8s ease, opacity 0.8s ease;
        }

        .side-pill-exit {
          transform: translate(50px, -50%);
          opacity: 0;
        }

        .side-pill-icon {
          color: #1C1917;
        }

        .side-pill-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        /* Center Typography Container */
        .harmony-preloader-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-origin: center center;
          transition: transform 1.2s cubic-bezier(0.6, 0.01, -0.05, 0.95),
            opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* The signature portal zoom */
        .center-exit-zoom {
          transform: scale(45);
          opacity: 0;
        }

        .harmony-liquid-wrapper {
          position: relative;
          display: inline-block;
          text-align: center;
        }

        .harmony-liquid-ghost {
          display: block;
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(4rem, 16vw, 12rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: rgba(255, 255, 255, 0.12);
          user-select: none;
        }

        /* Liquid Wave Effect */
        .harmony-liquid-fill {
          position: absolute;
          inset: 0;
          display: block;
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(4rem, 16vw, 12rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: transparent;
          user-select: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,50 Q12.5,45 25,50 T50,50 Q62.5,45 75,50 T100,50 L100,100 L0,100 Z' fill='%23E7C873'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: liquidWave 1.6s linear infinite;
        }

        @keyframes liquidWave {
          0% {
            background-position: 0% var(--progress, 0%);
          }
          100% {
            background-position: 100% var(--progress, 0%);
          }
        }

        /* Subtitle Text with character fade */
        .harmony-preloader-subtitle {
          position: absolute;
          bottom: 18px;
          right: 0;
          display: flex;
          font-size: clamp(0.7rem, 1.8vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(255, 250, 217, 0.95);
          text-transform: uppercase;
        }

        .subtitle-char {
          opacity: 0;
          transform: translateY(8px);
          animation: charReveal 0.6s ease forwards;
        }

        @keyframes charReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Bottom Counter */
        .harmony-preloader-counter {
          position: absolute;
          bottom: -36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #A8A29E;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .counter-label {
          color: #78716C;
          font-size: 0.72rem;
        }

        .counter-number {
          color: #E7C873;
          font-variant-numeric: tabular-nums;
        }

        /* Skip Button */
        .harmony-preloader-skip {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #D6D3D1;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
          z-index: 20;
        }

        .harmony-preloader-skip:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
        }

        @media (max-width: 640px) {
          .harmony-preloader-side-pill {
            display: none;
          }
          .harmony-preloader-subtitle {
            bottom: 8px;
            font-size: 0.65rem;
          }
          .harmony-preloader-counter {
            bottom: -28px;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </div>
  );
}
