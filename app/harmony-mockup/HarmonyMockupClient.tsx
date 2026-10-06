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
    </>
  );
}
