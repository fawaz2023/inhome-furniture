# Wireframe Spec v2 — Harmony Globe Habitat Implementation
**Screen Name:** Homepage (Harmony Video Scroll Architecture — UPDATED)
**File:** `wireframes/wireframe-harmony-homepage-2026-10-06.md`
**Date:** 2026-10-06
**Status:** ACTIVE IMPLEMENTATION PLAN — Ready for Engineering
**Mode:** fz-wireframer · Mode 2 (Screen Wireframing) + Mode 3 (Design Handoff)

---

## CHANGE LOG v2

| Change | Status |
|---|---|
| Header hidden on load, reveals on scroll | BUILT |
| Floating INHOME brand pill top-left | BUILT |
| Scroll orchestrator (IntersectionObserver) | BUILT |
| Center Play/Pause Ring Button | BUILT |
| Ticking Counter Stats (scroll-in) | BUILT |
| Horizontal Swipe Category Cards | BUILT |
| Route-group layout invariant | FIXED — deleted `app/harmony-mockup/layout.tsx`; BUG-015 closed |
| Preloader brand text legibility (cream `INHOME` on dark `#0D0B0A`) | BUILT — cream #FFF8DC on dark, 7:1+ contrast |
| Suspended async video decode (mobile rendering) | BUILT — single active video element + `preload="metadata"` |

---

## 1. SEO IMPACT AUDIT

> Googlebot uses headless Chromium. It executes JS and CSS. It does NOT scroll or click.
> Every technique below is assessed against this reality.

| Technique | SEO Impact | Why | Verdict |
|---|---|---|---|
| Header hidden via transform translateY(-100%) | ZERO | Header HTML in SSR DOM. Nav links indexed regardless of transform | SAFE |
| position:sticky video hero | ZERO | CSS-only. H1/subtitle text fully in SSR HTML | SAFE |
| opacity:0 on preloader | ZERO | aria-hidden=true. Content under it fully indexed | SAFE |
| IntersectionObserver scroll reveal | ZERO | Crawler does not scroll. Content in SSR HTML, indexed | SAFE |
| Center play/pause ring button | ZERO | It is a button with aria-label. No text content, pure UI | SAFE |
| Ticking counter animation (rAF) | WATCH | Final number depends on JS. SSR MUST render real value in data-target | SAFE IF done correctly |
| Horizontal swipe rail (overflow-x scroll) | ZERO | All category names and links in SSR HTML. Scroll is CSS visual only | SAFE |
| scroll-snap on rail | ZERO | Pure CSS. No DOM impact | SAFE |
| preload=metadata on video | POSITIVE | Reduces LCP delay. Core Web Vital improvement | BENEFICIAL |
| robots index:false on /harmony-mockup | INTENTIONAL | Sandbox page. Real homepage will not have this | CORRECT |

### THE ONE CRITICAL COUNTER RULE

Server renders:    17  (real value in HTML)
JS reads:         data-target="17"
JS sets to:       0 then animates 0 to 17
Googlebot reads:  "17" from SSR — indexes correctly

NEVER render 0 as the SSR starting value. Always render the real final number.

---

## 2. FEATURE A — Center Play/Pause Ring Button

### Component Inventory

```
STAGE 1: STICKY HERO — NEW ELEMENTS
  [x] Center Play/Pause Ring Button
      Position:    Absolute center of video stage (50% / 50%)
      Shape:       Circle, transparent fill, border ring (NOT filled)
      Size:        72x72px mobile, 88x88px desktop
      State 1:     Pause state — pause icon, ring pulses subtly
      State 2:     Play state — play icon, ring static
      Auto-hide:   Fades out after 3 seconds of no interaction
      Re-show:     Any tap or mousemove restores it
      REPLACES:    The 34x34 dock toggle button in harm-scene-switcher-panel
      a11y:        role=button, aria-label="Pause video" or "Play video"
```

### Mobile Wireframe (390px) — Hero Only

```
+==============================================+
|  STAGE 1: STICKY VIDEO HERO (100vh)          |
|  ############################################|
|  #                                          #|
|  # [INHOME FURNITURE] <- glass pill         #|  top: 1.25rem, left: 1.25rem, z-index: 5
|  #                                          #|
|  #                                          #|
|  #             +-----------+               #|
|  #             |  (  PP  ) |  *            #|  CENTER RING BUTTON
|  #             |  72 x 72  |               #|  position: absolute; top: 50%; left: 50%
|  #             +-----------+               #|  transform: translate(-50%, -50%)
|  #                                          #|
|  #  H1: Spaces that feel like home.        #|
|  #  P:  Custom-crafted Nilambur Teak...    #|
|  #                                          #|
|  #  [ * BROWSE CATALOGUE ]                  #|
|  #  [ SHARE REFERENCE PHOTO ]               #|
|  #                                          #|
|  #  5-stars 4.8 · TCL Tower · Mon-Sat 6PM  #|
|  #                                          #|
|  # [Showroom] [Grain] [Living] [Bedroom]    #|  Scene switcher dock
|  ############################################|
+==============================================+
```

### Desktop Wireframe (1440px) — Hero Only

```
+================================================================================================+
|  STAGE 1: FULLSCREEN STICKY VIDEO HERO (100vh)                                                  |
|  #############################################################################################  |
|  #                                                                                           #  |
|  # [INHOME FURNITURE]   <- pill, top-left                                                    #  |
|  #                                                                                           #  |
|  #                          +-----------+                                                    #  |
|  #                          |  (  PP  ) |  *                                                 #  |
|  #                          |  88 x 88  |                                                    #  |
|  #                          +-----------+                                                    #  |
|  #                                                                                           #  |
|  #  H1: Spaces that feel like home.                                                          #  |
|  #      Crafted for generations.                                                             #  |
|  #  P:  Solid teak sofas, cots, dining tables...                                             #  |
|  #                                                                                           #  |
|  #  [ * BROWSE FULL CATALOGUE ]   [ SHARE REFERENCE PHOTO ]                                  #  |
|  #                                                                                           #  |
|  #                                              [ Scroll to Explore v ]  <- bottom right     #  |
|  #  [Showroom | Teak Grain | Living Room | Bedroom]   NO PLAY TOGGLE (removed)               #  |
|  #############################################################################################  |
+================================================================================================+
```

### Interaction State Map

```
VIDEO STATE          BUTTON SHOWS       RING BEHAVIOUR
─────────────────────────────────────────────────────
Playing (default) → Pause icon (PP)    Gentle slow pulse animation
Paused            → Play icon (>)      Static ring, no pulse
Scene switch      → Pause icon (PP)    Flashes once (opacity 1 to 0.5 to 1)
User idle 3s      → Fades out          opacity: 0; pointer-events: none
User taps screen  → Fades back in      opacity: 1; pointer-events: auto
```

### Annotations

```
LAYOUT ANNOTATIONS — Center Play Ring Button

PRIMARY ACTION: Video play/pause control
POSITION:
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  z-index: 4   (above video and overlay, BELOW content layer)

AUTO-HIDE:
  setTimeout 3000ms after each interaction
  Add class .harm-play-ring-hidden -> opacity: 0; pointer-events: none; transition: 0.5s
  On any window touchstart / mousemove -> remove class

SIZES:
  Mobile:  width: 72px; height: 72px; border: 2px solid rgba(255,255,255,0.72)
  Desktop: width: 88px; height: 88px; border: 2.5px solid rgba(255,255,255,0.85)

ICONS:
  Pause: Lucide <Pause size={24} fill="currentColor">
  Play:  Lucide <Play size={24} fill="currentColor">

REMOVE when building this:
  The .harm-video-playback-toggle button in scene switcher dock
  Its CSS rule .harm-video-playback-toggle in harmony.css
```

---

## 3. FEATURE B — Ticking Counter Stats

### Component Inventory (Delta)

```
STATS STRIP — MODIFIED
  BEFORE: Static text numbers
  AFTER:  Same SSR HTML, JS animates 0 to final value on scroll-in

  Stats and animation:
  1. "17"   label: Curated Collections    -> animate 0 to 17
  2. "4.8*" label: Google Rating          -> animate 0.0 to 4.8 (1 decimal)
  3. "100%" label: Solid Wood Timber      -> animate 0% to 100%
  4. "1:1"  label: Bespoke Consultation   -> NO animation (ratio, not a number)
```

### Mobile Wireframe (390px) — Stats Strip

```
|==============================================|
|  STATS STRIP                                 |
|  +-------------------+ +------------------+  |
|  | [0 -> 17]         | | [0.0 -> 4.8]     |  |  Counter animation on scroll-in
|  | Curated           | | Google Rated     |  |
|  | Collections       | |                  |  |
|  +-------------------+ +------------------+  |
|  +-------------------+ +------------------+  |
|  | [0% -> 100%]      | | [STATIC: 1 : 1]  |  |  No animation on ratio
|  | Solid Wood Timber | | Bespoke          |  |
|  +-------------------+ +------------------+  |
|==============================================|
```

### Data Attribute Spec (SSR HTML)

```
CORRECT (Googlebot indexes "17"):
<span class="harm-stat-val harm-counter"
      data-target="17"
      data-suffix=""
      data-decimals="0">17</span>

CORRECT (Googlebot indexes "4.8 Google"):
<span class="harm-stat-val harm-counter"
      data-target="4.8"
      data-suffix="★"
      data-decimals="1">4.8★</span>

CORRECT (Googlebot indexes "100%"):
<span class="harm-stat-val harm-counter"
      data-target="100"
      data-suffix="%"
      data-decimals="0">100%</span>

CORRECT (No animation needed):
<span class="harm-stat-val">1 : 1</span>
```

### New Component Spec

```
NEW FILE: app/harmony-mockup/HarmonyStatsCounter.tsx
TYPE: 'use client'
RENDERS: null (pure DOM side-effect)

LOGIC FLOW:
  1. useEffect on mount
  2. Find all elements with .harm-counter class
  3. Create IntersectionObserver threshold: 0.3
  4. On intersect:
     a. Read data-target, data-suffix, data-decimals from element
     b. Set textContent = "0" + suffix
     c. Start requestAnimationFrame loop, duration 1800ms, ease-out
     d. On complete: set exact data-target value (prevent float drift)
  5. Disconnect observer after first trigger (runs ONCE only)

ANIMATION ALGORITHM:
  elapsed = currentTime - startTime
  progress = Math.min(elapsed / 1800, 1)
  eased = 1 - Math.pow(1 - progress, 3)   // cubic ease-out
  current = start + (end - start) * eased
  element.textContent = current.toFixed(decimals) + suffix
```

---

## 4. FEATURE C — Horizontal Swipe Category Rail

### Component Inventory (Delta)

```
CATEGORY SECTION — MODIFIED
  BEFORE: 2-column grid (mobile), 3-column grid (desktop)
  AFTER:
    Mobile (< 1024px):  Horizontal swipe rail
    Desktop (>= 1024px): 3-column grid (unchanged)

  Rail properties:
    display: flex
    overflow-x: scroll
    scroll-snap-type: x mandatory
    scrollbar-width: none
    -webkit-overflow-scrolling: touch

  Each card:
    scroll-snap-align: start
    width: calc(50vw - 1.5rem)     <- 2 visible + peek of 3rd
    min-width: 160px
    max-width: 200px
    flex-shrink: 0

  Peek affordance:
    Last visible card bleeds 40px past right edge
    Parent section must NOT clip overflow on the right
    padding-right: 0 on rail wrapper; add only padding-left: 1.25rem
```

### Mobile Wireframe (390px) — Category Rail

```
|==============================================|
|  EYEBROW: Our Portfolio                      |
|  H2: Collections for Every Room             |
|  [View all 17 categories ->]                 |
|                                              |
|  +---------+ +---------+ +-..---+           |
|  | [IMAGE] | | [IMAGE] | | [IM  |  <- bleed |
|  | Sofas   | | Beds    | | Din  |           |
|  | 4 items | | 3 items | | 5 it |           |
|  +---------+ +---------+ +-..---+           |
|                                              |
|  <- drag to see more ->                      |
|==============================================|
```

### Desktop Wireframe (1440px) — Grid (Unchanged)

```
|================================================================================================|
|  EYEBROW: Our Portfolio     H2: Collections for Every Room      [View all 17 ->]               |
|                                                                                                |
|  +-------------------+  +-------------------+  +-------------------+                          |
|  | [###] Sofas       |  | [###] Dining      |  | [###] Cots & Beds |                          |
|  | 4 Designs         |  | 5 Designs         |  | 3 Designs         |                          |
|  +-------------------+  +-------------------+  +-------------------+                          |
|  +-------------------+  +-------------------+  +-------------------+                          |
|  | [###] Wardrobes   |  | [###] TV Units    |  | [###] Puja        |                          |
|  | 2 Designs         |  | 2 Designs         |  | 4 Designs         |                          |
|  +-------------------+  +-------------------+  +-------------------+                          |
|================================================================================================|
```

### Annotations

```
LAYOUT ANNOTATIONS — Swipe Rail

NO JS NEEDED: Pure CSS overflow-x scroll + snap
MOMENTUM: Browser-native (-webkit-overflow-scrolling: touch)
NO ARROWS: No left/right navigation arrows
NO DOTS: No pagination indicators

CONTAINER CSS:
  .harm-cat-rail {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    padding-left: 1.25rem;
    gap: 0.75rem;
    padding-bottom: 0.5rem;   <- space for card shadow
  }
  .harm-cat-rail::-webkit-scrollbar { display: none; }

CARD CSS:
  .harm-cat-rail .category-card {
    flex-shrink: 0;
    width: calc(50vw - 1.5rem);
    min-width: 160px;
    max-width: 200px;
    scroll-snap-align: start;
  }

DESKTOP OVERRIDE:
  @media (min-width: 1024px) {
    .harm-cat-rail {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      overflow-x: unset;
      scroll-snap-type: unset;
      padding: 0;
    }
    .harm-cat-rail .category-card {
      width: auto;
      max-width: none;
    }
  }

SEO NOTE:
  All category names and href links are in server-rendered HTML.
  overflow-x: scroll is visual-only. Googlebot reads all cards. SAFE.
```

---

## 5. FULL LAYOUT WIREFRAME (All Features Combined)

### Mobile (390px)

```
+==============================================+
| [SANDBOX BANNER: Replay | Live Homepage ->] |
+==============================================+
| [HEADER — CSS hidden until scroll]          |
+==============================================+

STICKY HERO (100vh, position: sticky, top: 0, z-index: 1)
##############################################################
#                                                            #
# [INHOME • FURNITURE]  <- glass pill, z-index: 5            #
#                                                            #
#                                                            #
#                    +----------+                            #
#                    |  ( PP )  |  *  <- CENTER RING         #
#                    |  72x72px |                            #
#                    +----------+                            #
#                    auto-hides 3s                           #
#                                                            #
#  H1: Spaces that feel like home.                           #
#      Crafted for generations.                              #
#  P:  Solid teak sofas, cots, dining...                     #
#                                                            #
#  [ * BROWSE CATALOGUE ]                                    #
#  [ SHARE REFERENCE PHOTO ]                                 #
#                                                            #
#  5-star 4.8 · TCL Tower · Mon-Sat 6PM                     #
#                                                            #
# [Showroom] [Grain] [Living] [Bedroom]  (NO DOCK TOGGLE)   #
##############################################################

[1px Sentinel DIV]   <- IntersectionObserver watches this

RISING CURTAIN SHEET (position: relative, z-index: 10)
  border-radius: 20px top corners
  background: warm white

+----------------------------------------------+
| STATS STRIP (animates on scroll-in)           |
| [0->17]        | [0.0->4.8 star]              |
| Collections    | Google Rated                 |
| [0%->100%]     | [static 1:1]                |
| Solid Wood     | Bespoke Consult              |
+----------------------------------------------+

SECTION: Nilambur Teak Distinction
  H2: Why Nilambur Teak Stands Alone
  [Dense Grain Card]
  [Termite Immunity Card]
  [Bespoke Precision Card]

SECTION: Category Rail <- HORIZONTAL SWIPE
  H2: Collections for Every Room
  [View all 17 ->]
  +---------+ +---------+ +--.---+
  | Sofas   | | Beds    | | Dini | -> bleed
  +---------+ +---------+ +--.---+

SECTION: Flagship Editorial
  [Dark card: Image left, text right on desktop]
  [PRODUCT NAME + Tags + Browse + WhatsApp CTA]

SECTION: New Arrivals (2-col grid)
  [Prod 1] [Prod 2]
  [Prod 3] [Prod 4]

SECTION: How It Works
  1. Browse  ->  2. WhatsApp  ->  3. Delivered

SECTION: Showroom + Bespoke
  [Address Card] [Bespoke Photo Card]

FOOTER

(safe area spacer 32px)
+==============================================+
| [CALL] | [WHATSAPP *] | [DIRECTIONS]        |  <- Sticky bottom bar
+==============================================+
```

---

## 6. IMPLEMENTATION ORDER

```
STEP 1 — Center Play/Pause Ring Button         BLAST RADIUS: ISOLATED
  File: app/harmony-mockup/HarmonyHeroVideo.tsx
  Add:  Ring button JSX inside harm-video-hero-stage
  CSS:  .harm-play-ring, .harm-play-ring-hidden in harmony.css
  ALSO REMOVE: harm-video-playback-toggle button from scene dock
  ALSO REMOVE: .harm-video-playback-toggle CSS rule from harmony.css

STEP 2 — Ticking Counter Animation            BLAST RADIUS: ISOLATED
  New:  app/harmony-mockup/HarmonyStatsCounter.tsx (renders null)
  Edit: app/harmony-mockup/page.tsx
        -> Add data-target, data-suffix, data-decimals to stat spans
        -> Add class harm-counter to animatable spans
        -> Import and render <HarmonyStatsCounter />
  SEO:  Confirm SSR still renders "17", "4.8★", "100%" NOT "0"

STEP 3 — Horizontal Swipe Category Rail       BLAST RADIUS: ISOLATED
  Edit: app/harmony-mockup/harmony.css
        -> Replace .harm-grid with .harm-cat-rail flex + scroll rules
        -> Add @media (min-width: 1024px) grid override
  Edit: app/harmony-mockup/page.tsx
        -> Change className from harm-grid to harm-cat-rail on category section
  No JS needed — pure CSS
```

---

## 7. STRUCTURAL AUDIT

```
WARNING [Severity: HIGH]
  What:  Two play/pause controls (dock toggle + new center ring)
  Where: harm-scene-switcher-panel
  Fix:   Remove dock toggle button and its CSS when center ring is built

WARNING [Severity: MEDIUM]
  What:  Stats briefly show "0" if JS runs before observer fires
  Where: harm-stats-section on fast connections
  Fix:   Set textContent to "0" ONLY inside the observer callback, not on mount
         SSR value ("17" etc.) persists until scroll triggers animation

WARNING [Severity: LOW]
  What:  Horizontal rail has no visible affordance indicator
  Where: Mobile category section
  Fix:   Card bleed of 40px past right edge is sufficient (Harmony pattern)
         No dots or arrows needed

HIERARCHY CHECK:   PASS - Video -> Ring -> H1 -> CTAs -> Stats -> Categories
FLOW CHECK:        PASS - Every element routes to a category, product, or WhatsApp
MOBILE THUMB ZONE: PASS - CTAs in lower 60%, sticky bar always present
TOUCH TARGETS:     PASS - Ring 72px, cards full-height, pills min 36px (secondary)
SEO:               PASS - All content in SSR HTML, no text gated behind JS events
```

---

## 8. DESIGN HANDOFF SPEC

```
===================================================
WIREFRAME HANDOFF SPEC v2
Screen: INHOME FURNITURE Homepage (Harmony Build)
Platform: Mobile-first responsive web
Date: 2026-10-06
===================================================

PRIMARY ACTION: Browse Catalogue button — hero center, above fold

STRUCTURAL DECISIONS — DO NOT CHANGE
  Navigation: Hidden on load via CSS, springs in on scroll
  Hero: Sticky 100vh video, z-index 1
  Content: Rising curtain sheet, z-index 10, rounded top corners
  Stats: Server-rendered real values in HTML (SEO requirement)
  Ring button: Absolute center of hero, auto-hide 3s
  Category rail: Horizontal swipe mobile, grid desktop

ELEMENT ORDER (top to bottom, do not reorder)
  1. Brand pill (hero, top-left)
  2. Center play ring (hero, center)
  3. H1 + Subtitle (hero, bottom third)
  4. Primary CTA + Secondary CTA (hero, bottom third)
  5. Proof line: stars + rating + location (hero, bottom)
  6. Scene switcher dock (hero, bottom bar)
  7. Stats strip (curtain, first element)
  8. Teak distinction pillars (curtain)
  9. Category swipe rail (curtain)
  10. Flagship editorial (curtain)
  11. New arrivals grid (curtain)
  12. How it works strip (curtain)
  13. Showroom + Bespoke cards (curtain)
  14. Footer

CONTENT CONSTRAINTS
  Category rail: minimum 4 cards, maximum 6 visible in spec
  Stats: exactly 4 stats, layout is 2x2 grid
  Ring button: must be 72px minimum (touch target rule)
  H1: maximum 12 words, 2 lines maximum

INTERACTION MAP
  Ring button     -> toggle video play/pause
  Scene pill      -> switch active video source
  Category card   -> navigate to /[category]
  Product card    -> navigate to /[category]/[product]
  WhatsApp CTAs   -> open wa.me/ deeplink with pre-filled message
  Sticky bar      -> tel: / wa.me: / Google Maps deeplinks

WHAT MUST NOT CHANGE
  lib/whatsapp.ts — P0 ground truth, zero modifications
  SSR stat values in HTML — SEO critical
  Sticky 100vh hero + rising curtain architecture
  No shopping cart, no prices, no checkout flow

WHAT fz-uidesigner HAS FULL FREEDOM ON
  Ring button: stroke weight, glow, backdrop blur, pulse animation style
  Counter typography: weight, size, color treatment
  Card aspect ratio: 3/4 portrait or 4/3 landscape
  Easing curve: cubic vs spring vs bouncy for counter animation
```
