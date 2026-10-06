'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HarmonyPreloader from './HarmonyPreloader';
import { RotateCcw } from 'lucide-react';

export default function HarmonyMockupClient() {
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
      <aside className="harm-banner" aria-label="Mockup Controls">
        <div className="harm-banner-left">
          <span className="harm-badge-pulse" />
          <span>Harmony Liquid Loading & Video Scroll Preview</span>
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
      </aside>
    </>
  );
}
