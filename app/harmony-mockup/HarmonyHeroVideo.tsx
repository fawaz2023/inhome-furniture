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
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeScene = SCENES.find((s) => s.id === activeSceneId) || SCENES[0];

  const handleSelectScene = (scene: Scene) => {
    setActiveSceneId(scene.id);
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
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const scrollToContent = () => {
    const sheet = document.getElementById('harmony-content-sheet');
    if (sheet) {
      sheet.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="harm-video-hero-stage">
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

      {/* 3. Hero Content Overlay */}
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

      {/* 4. Interactive Scene Switcher Bar */}
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

        {/* Video Play/Pause Toggle */}
        <button
          type="button"
          onClick={togglePlay}
          className="harm-video-playback-toggle"
          title={isPlaying ? 'Pause video' : 'Play video'}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
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

      <style jsx>{`
        .harm-video-hero-stage {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: #0c0a09;
          z-index: 1;
        }

        .harm-hero-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          filter: brightness(0.92);
          transition: opacity 0.5s ease-in-out;
        }

        .harm-hero-overlay-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(12, 10, 9, 0.45) 0%,
            rgba(12, 10, 9, 0.55) 45%,
            rgba(12, 10, 9, 0.88) 85%,
            rgba(12, 10, 9, 0.98) 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        .harm-hero-content-layer {
          position: relative;
          z-index: 3;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          padding-bottom: 7rem;
        }

        .harm-hero-inner-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        .harm-eye {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.28);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          margin-bottom: 1.15rem;
          color: #FAF8F5;
        }

        .harm-h1 {
          font-size: clamp(2rem, 5.2vw, 3.6rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin-bottom: 1.15rem;
          max-width: 18ch;
        }

        .harm-h1 em {
          font-style: normal;
          color: #E7C873;
        }

        .harm-sub {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          line-height: 1.55;
          color: #E7E5E4;
          max-width: 58ch;
          margin-bottom: 1.75rem;
          font-weight: 400;
        }

        .harm-cta-group {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 1.75rem;
        }

        .harm-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background-color: #E7C873;
          color: #1C1917;
          font-weight: 800;
          font-size: 0.95rem;
          padding: 0.85rem 1.6rem;
          border-radius: 10px;
          min-height: 48px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(231, 200, 115, 0.25);
          transition: background-color 0.15s ease, transform 0.15s ease;
        }

        .harm-btn-primary:hover {
          background-color: #DAB962;
          transform: translateY(-1px);
        }

        .harm-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 1.5rem;
          border-radius: 10px;
          min-height: 48px;
          text-decoration: none;
          transition: background-color 0.15s ease;
        }

        .harm-btn-ghost:hover {
          background: rgba(255, 255, 255, 0.22);
        }

        .harm-hero-proof {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: #D6D3D1;
          font-weight: 500;
          flex-wrap: wrap;
        }

        .harm-stars {
          display: inline-flex;
          align-items: center;
          gap: 0.15rem;
          color: #F59E0B;
        }

        /* 4. Scene Switcher Floating Dock */
        .harm-scene-switcher-panel {
          position: absolute;
          bottom: 1.5rem;
          left: 1.25rem;
          right: 1.25rem;
          max-width: 1160px;
          margin: 0 auto;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(18, 16, 14, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 12px;
          padding: 0.5rem 0.75rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .harm-switcher-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #A8A29E;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          padding-left: 0.25rem;
        }

        .harm-switcher-pills {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          flex: 1;
        }

        .harm-switcher-pills::-webkit-scrollbar {
          display: none;
        }

        .harm-scene-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #E7E5E4;
          border-radius: 8px;
          padding: 0.35rem 0.65rem;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          min-height: 36px;
          transition: all 0.15s ease;
        }

        .harm-scene-pill:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
        }

        .harm-scene-pill.active {
          background: #E7C873;
          border-color: #E7C873;
          color: #1C1917;
          font-weight: 800;
        }

        .pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: currentColor;
          opacity: 0.8;
        }

        .pill-name {
          font-size: 0.78rem;
        }

        .pill-badge {
          font-size: 0.68rem;
          opacity: 0.75;
          font-weight: 500;
        }

        .harm-video-playback-toggle {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FAF8F5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.15s ease;
        }

        .harm-video-playback-toggle:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* 5. Scroll Prompt Cue (Desktop Right Side) */
        .harm-scroll-cue-btn {
          position: absolute;
          right: 2rem;
          bottom: 5.5rem;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: none;
          color: #E7C873;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .harm-scroll-cue-btn:hover {
          opacity: 0.85;
        }

        .harm-cue-arrow {
          animation: bounceCue 2s infinite ease-in-out;
        }

        @keyframes bounceCue {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        @media (max-width: 768px) {
          .harm-hero-content-layer {
            padding-bottom: 6.5rem;
          }
          .harm-scroll-cue-btn {
            display: none;
          }
          .harm-switcher-label {
            display: none;
          }
          .harm-scene-switcher-panel {
            bottom: 1rem;
            left: 0.75rem;
            right: 0.75rem;
            padding: 0.4rem 0.5rem;
          }
          .pill-badge {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
