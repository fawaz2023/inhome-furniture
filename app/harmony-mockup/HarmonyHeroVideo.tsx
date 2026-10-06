'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  Star,
  MapPin,
  Play,
  Pause,
  ChevronDown,
  Layers
} from 'lucide-react';

interface Scene {
  id: string;
  name: string;
  badge: string;
  videoSrc: string;
  posterSrc: string;
  headline: string;
  sub: string;
}

const SCENES: Scene[] = [
  {
    id: 'showroom',
    name: 'Showroom Pan',
    badge: 'Dining & Living',
    videoSrc: '/hero-video-showroom.mp4',
    posterSrc: '/hero-teak-showroom.jpg',
    headline: 'Spaces that feel like home. Crafted for generations.',
    sub: 'Solid teak sofas, cots, dining tables, and bespoke storage — made to your exact room dimensions from genuine, seasoned Nilambur Teak.',
  },
  {
    id: 'grain',
    name: 'Teak Grain',
    badge: 'Nilambur Timber',
    videoSrc: '/hero-video-grain.mp4',
    posterSrc: '/hero-teak-grain.jpg',
    headline: 'Centuries of Pedigree. Unrivalled Golden Grain.',
    sub: 'Tight annual rings and rich natural tectoquinone oils provide permanent immunity against termites and moisture.',
  },
  {
    id: 'living',
    name: 'Living Room',
    badge: 'Sofa & Lounge',
    videoSrc: '/hero-video-living.mp4',
    posterSrc: '/hero-teak-living.jpg',
    headline: 'Bespoke Living Spaces. Tailored to Your Home.',
    sub: 'Solid teak frames with handloom cushions, engineered for ergonomic comfort and heirloom longevity.',
  },
  {
    id: 'bedroom',
    name: 'Bedroom Cot',
    badge: 'Cane Headboard',
    videoSrc: '/hero-video-bedroom.mp4',
    posterSrc: '/hero-teak-bedroom.jpg',
    headline: 'A Restful Sanctuary. Handcrafted Teak Cots.',
    sub: 'Traditional woven cane headboards and hand-joined solid wood frames designed for generations of peaceful sleep.',
  },
];

interface HarmonyHeroVideoProps {
  customOrderWhatsAppUrl: string;
}

export default function HarmonyHeroVideo({ customOrderWhatsAppUrl }: HarmonyHeroVideoProps) {
  const [activeSceneId, setActiveSceneId] = useState<string>('showroom');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeScene = SCENES.find((s) => s.id === activeSceneId) || SCENES[0];

  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  React.useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleSelectScene = (scene: Scene) => {
    setActiveSceneId(scene.id);
    resetHideTimer();
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      resetHideTimer();
    }
  };

  const handleRingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlay();
  };

  const scrollToContent = () => {
    const sheet = document.getElementById('harmony-content-sheet');
    if (sheet) {
      sheet.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="harm-video-hero-stage"
      onMouseMove={resetHideTimer}
      onTouchStart={resetHideTimer}
    >
      {/* 1. Background Video Layer */}
      <video
        ref={videoRef}
        key={activeScene.videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={activeScene.posterSrc}
        className="harm-hero-bg-video"
      >
        <source src={activeScene.videoSrc} type="video/mp4" />
      </video>

      {/* 2. Gradient Vignette Overlay for Crisp Readability */}
      <div className="harm-hero-overlay-shade" />

      {/* 3. Center Cinematic Play/Pause Ring (Harmony Globe Habitat pattern) */}
      <button
        type="button"
        onClick={handleRingClick}
        className={`harm-play-ring ${!showControls && isPlaying ? 'harm-play-ring-hidden' : ''}`}
        aria-label={isPlaying ? 'Pause video preview' : 'Play video preview'}
        title={isPlaying ? 'Pause video preview' : 'Play video preview'}
      >
        <div className="harm-play-ring-inner">
          {isPlaying ? (
            <Pause size={28} className="harm-play-ring-icon" fill="currentColor" />
          ) : (
            <Play size={28} className="harm-play-ring-icon harm-play-icon-offset" fill="currentColor" />
          )}
        </div>
      </button>

      {/* 4. Floating Brand Pill (visible BEFORE header slides in — Harmony Globe Habitat pattern) */}
      <div className="harm-brand-pill" aria-label="INHOME FURNITURE">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="brand-pill-name">INHOME</span>
        <span className="brand-pill-sub">FURNITURE</span>
      </div>

      {/* 5. Hero Content Overlay */}
      <div className="harm-hero-content-layer">
        <div className="harm-hero-inner-container">
          <div className="harm-eye">
            <MapPin size={13} />
            <span>Kangeyam Showroom • Custom-Crafted to Order</span>
          </div>

          <h1 className="harm-h1">
            {activeScene.headline.split('. ')[0]}. <br />
            <em>{activeScene.headline.split('. ')[1] || 'Crafted for generations.'}</em>
          </h1>

          <p className="harm-sub">{activeScene.sub}</p>

          <div className="harm-cta-group">
            <Link href="/catalogue" className="harm-btn-primary">
              <span>Browse Full Catalogue</span>
              <ArrowRight size={17} />
            </Link>
            <a
              href={customOrderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="harm-btn-ghost"
            >
              <Camera size={18} />
              <span>Share Reference Photo</span>
            </a>
          </div>

          <div className="harm-hero-proof">
            <div className="harm-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <span>4.8 Google Rated • TCL Tower, Chennimalai Rd • Mon - Sat till 6 PM</span>
          </div>
        </div>
      </div>

      {/* 6. Interactive Scene Switcher Bar */}
      <div className="harm-scene-switcher-panel">
        <div className="harm-switcher-label">
          <Layers size={13} />
          <span>Cinematic Scene:</span>
        </div>
        <div className="harm-switcher-pills">
          {SCENES.map((scene) => {
            const isActive = scene.id === activeSceneId;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleSelectScene(scene)}
                className={`harm-scene-pill ${isActive ? 'active' : ''}`}
                title={`Switch to ${scene.name} (${scene.badge})`}
              >
                <span className="pill-dot" />
                <span className="pill-name">{scene.name}</span>
                <span className="pill-badge">{scene.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Scroll Prompt Cue */}
      <button
        type="button"
        onClick={scrollToContent}
        className="harm-scroll-cue-btn"
        aria-label="Scroll down to explore collections"
      >
        <span>Scroll to Explore</span>
        <ChevronDown size={16} className="harm-cue-arrow" />
      </button>
    </div>
  );
}
