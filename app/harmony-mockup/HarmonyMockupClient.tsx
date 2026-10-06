'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HarmonyPreloader from './HarmonyPreloader';
import { RotateCcw } from 'lucide-react';

interface HarmonyMockupClientProps {
  children: React.ReactNode;
}

export default function HarmonyMockupClient({ children }: HarmonyMockupClientProps) {
  const [showPreloader, setShowPreloader] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  const handleReplay = () => {
    setShowPreloader(true);
    setReplayKey((prev) => prev + 1);
  };

  return (
    <>
      {showPreloader && (
        <HarmonyPreloader
          key={replayKey}
          brandName="INHOME"
          subtitle="FURNITURE • KANGEYAM"
          onComplete={() => setShowPreloader(false)}
        />
      )}

      {/* Sandbox Header Strip with Replay Control */}
      <div className="harm-banner">
        <div className="harm-banner-left">
          <span className="harm-badge-pulse" />
          <span>Harmony Liquid Loading & Architectural Preview</span>
        </div>
        <div className="harm-banner-right">
          <button
            type="button"
            onClick={handleReplay}
            className="harm-replay-btn"
            title="Replay the liquid loading animation"
          >
            <RotateCcw size={13} />
            <span>Replay Loading Animation</span>
          </button>
          <Link href="/" className="harm-banner-link">
            Live Homepage &rarr;
          </Link>
        </div>
      </div>

      <div
        className="harm-content-wrapper"
        style={{
          opacity: showPreloader ? 0.95 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        {children}
      </div>

      <style jsx>{`
        .harm-banner {
          background-color: #12100E;
          color: #FAF8F5;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.6rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          z-index: 60;
          position: sticky;
          top: 0;
        }

        .harm-banner-left {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .harm-badge-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #E7C873;
          box-shadow: 0 0 8px #E7C873;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.85);
          }
        }

        .harm-banner-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .harm-replay-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(231, 200, 115, 0.18);
          color: #E7C873;
          border: 1px solid rgba(231, 200, 115, 0.35);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .harm-replay-btn:hover {
          background: rgba(231, 200, 115, 0.3);
        }

        .harm-banner-link {
          color: #D6D3D1;
          text-decoration: underline;
          text-underline-offset: 3px;
          font-size: 0.72rem;
        }

        .harm-banner-link:hover {
          color: #FFFFFF;
        }
      `}</style>
    </>
  );
}
