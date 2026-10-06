# Wireframe Spec: Harmony-Inspired Homepage & Video Scroll Engine
**Screen Name:** Homepage (Harmony Video Scroll Architecture)  
**File:** `wireframes/wireframe-harmony-homepage-2026-10-06.md`  
**Date:** 2026-10-06  
**Status:** Approved Structural Blueprint (Pre-UI Design)  
**Role:** Mode 2 (Screen Wireframing) + Mode 3 (Design Handoff Spec)

---

## 1. Context & User Goals

- **Screen Role:** Primary storefront landing page (`/` or `/harmony-mockup`).
- **Primary Audience:** Mobile-first customers arriving via direct WhatsApp chat links from the showroom owner or Instagram bio.
- **Primary Action (*):** Tap "Explore Catalogue" to view categories, or tap "Enquire on WhatsApp" for bespoke custom orders.
- **Experience Mechanism:** 
  1. Lightweight preloader wipe (brand entry).
  2. Sticky full-bleed 100vh video hero.
  3. Scroll-driven solid content sheet that slides up over the video curtain.
  4. Instant category discovery & product enquiry without cart/checkout.

---

## 2. Component Inventory

```text
NAVIGATION & SHELL
  [x] Fixed/Sticky Navigation Header (Logo + Nav Links + Quick WhatsApp Button)
  [x] Mobile Sticky Bottom Bar (Call + WhatsApp + Directions) [Mobile only]

STAGE 0: PRELOADER STATE
  [x] Fullscreen Preloader Overlay (Brand Wordmark + Minimalist Loading Indicator)

STAGE 1: STICKY HERO (PINNED 100vh)
  [x] Background Video Element (autoplay, muted, loop, playsinline, poster fallback)
  [x] Video Scene Switcher Pill (Switch between Showroom, Grain Macro, Living, Bedroom)
  [x] Hero Content Overlay (H1 Brand Headline, Subtitle, Primary CTA Button *, Secondary CTA)
  [x] Scroll Prompt Indicator (Bouncing cue indicating content below)

STAGE 2: RISING CURTAIN SHEET (SCROLLABLE BODY)
  [x] Trust / Distinction Metrics Strip (4 key pillars: Nilambur Teak, Custom Sizing, 4.8 Star Google, Kangeyam)
  [x] Curated Category Spotlight Grid (Browse popular categories with count badges)
  [x] New Arrivals / Signature Pieces Grid (2-column mobile, 4-column desktop with WhatsApp CTAs)
  [x] Bespoke Reference Photo Consultation Card (Send photo/sketch on WhatsApp CTA)
  [x] Kangeyam Showroom Visit & Directions Card (Opening hours, address, Google Maps link)
  [x] How It Works 3-Step Strip (1. Browse -> 2. Customise on WhatsApp -> 3. Delivered)
  [x] Standard Global Footer
```

---

## 3. Structural Wireframes

### Mobile Viewport (390px)

```text
+==============================================+
| INHOME FURNITURE                     [Menu]  |  <- Sticky Header (390x56)
+==============================================+
|                                              |
|  [ STAGE 1: STICKY HERO BACKGROUND - 100vh ]  |
|  ##########################################  |
|  #                                        #  |
|  #         [ VIDEO: Pinned 100vh ]        #  |
|  #                                        #  |
|  #  [ P1: Showroom | P2: Grain | P3: Bed ]#  |  <- Scene Switcher Pills
|  #                                        #  |
|  #  H1: INHOME FURNITURE                  #  |
|  #  P:  Custom-crafted Nilambur Teak      #  |
|  #                                        #  |
|  #  [ * EXPLORE CATALOGUE ]               #  |  <- Primary CTA (min 48px)
|  #  [ ENQUIRE ON WHATSAPP ]               #  |  <- Secondary CTA (min 48px)
|  #                                        #  |
|  #            [ v Scroll v ]              #  |
|  ##########################################  |
|                                              |
|==============================================|
|  [ STAGE 2: RISING CONTENT SHEET / CURTAIN ] |  <- Slides UP over video
|==============================================|
|                                              |
|  +----------------------------------------+  |
|  | TRUST METRICS STRIP (Horizontal Scroll)|  |
|  | [Nilambur Teak] [Custom Size] [4.8 G]  |  |
|  +----------------------------------------+  |
|                                              |
|  H2: Popular Categories                      |
|  +-------------------+  +-----------------+  |
|  | [###] Sofas       |  | [###] Dining    |  |  <- 2-Column Grid
|  | 4 Designs         |  | 3 Designs       |  |
|  +-------------------+  +-----------------+  |
|  +-------------------+  +-----------------+  |
|  | [###] Cots & Beds |  | [###] Wardrobes |  |
|  | 2 Designs         |  | 2 Designs       |  |
|  +-------------------+  +-----------------+  |
|                                              |
|  H2: Signature Teak Creations                |
|  +-------------------+  +-----------------+  |
|  | [###] Product 1   |  | [###] Product 2 |  |
|  | Teak Dining Table |  | Nilambur Cot    |  |
|  | [ WA Enquire ]    |  | [ WA Enquire ]  |  |
|  +-------------------+  +-----------------+  |
|                                              |
|  +----------------------------------------+  |
|  | BESPOKE ORDER CONSULTATION CARD        |  |
|  | H3: Have a Reference Photo or Sketch?  |  |
|  | P: Send us your design on WhatsApp     |  |
|  | [ SEND PHOTO ON WHATSAPP ]             |  |  <- Direct WhatsApp Action
|  +----------------------------------------+  |
|                                              |
|  +----------------------------------------+  |
|  | SHOWROOM VISIT & GOOGLE 4.8 CARD       |  |
|  | Kangeyam, Tamil Nadu                   |  |
|  | Open: Mon - Sat 9:00 AM - 6:00 PM      |  |
|  | [ GET MAP DIRECTIONS ]                 |  |
|  +----------------------------------------+  |
|                                              |
|  +----------------------------------------+  |
|  | HOW IT WORKS (3 Steps Vertical)        |  |
|  | 1. Select design -> 2. Chat -> 3. Make |  |
|  +----------------------------------------+  |
|                                              |
|  +----------------------------------------+  |
|  | FOOTER (Brand info, links, copyright)  |  |
|  +----------------------------------------+  |
|                                              |
|  (32px Safe Area Bottom Spacer)              |
+==============================================+
|  [ CALL ]   |   [ WHATSAPP * ]   |  [ MAP ]  |  <- Persistent Bottom Bar
+==============================================+
```

---

### Desktop Viewport (1440px)

```text
+================================================================================================+
|  INHOME FURNITURE          [Home]  [Catalogue]  [About]  [Gallery]        [ WA ENQUIRE (CTA) ]  |
+================================================================================================+
|                                                                                                |
|  [ STAGE 1: FULLSCREEN STICKY VIDEO HERO - 100vh ]                                             |
|  ############################################################################################  |
|  #                                                                                          #  |
|  #                               [ VIDEO BACKGROUND: 1080p ]                                #  |
|  #                                                                                          #  |
|  #                               [ Showroom | Teak Grain | Living Room | Bedroom ]          #  |
|  #                                                                                          #  |
|  #      H1: BESPOKE NILAMBUR TEAK FURNITURE                                                 #  |
|  #      P:  Handcrafted to your dimensions. Direct Kangeyam showroom consultation.           #  |
|  #                                                                                          #  |
|  #      [ * EXPLORE FULL CATALOGUE ]         [ CHAT WITH US ON WHATSAPP ]                   #  |
|  #                                                                                          #  |
|  #                                       [ v Scroll down v ]                                #  |
|  ############################################################################################  |
|                                                                                                |
|================================================================================================|
|  [ STAGE 2: RISING CONTENT SHEET / CURTAIN ]                                                   |
|================================================================================================|
|                                                                                                |
|  +------------------------------------------------------------------------------------------+  |
|  | TRUST METRICS: [GI Nilambur Teak]  |  [Custom Dimensions]  |  [4.8 Star Google]  | [Kangeyam]  |
|  +------------------------------------------------------------------------------------------+  |
|                                                                                                |
|  H2: Explore Categories                                                                        |
|  +-------------------+  +-------------------+  +-------------------+  +---------------------+  |
|  | [###] Sofas       |  | [###] Dining      |  | [###] Cots & Beds |  | [###] Wardrobes     |  |
|  | 4 Designs         |  | 3 Designs         |  | 2 Designs         |  | 2 Designs           |  |
|  +-------------------+  +-------------------+  +-------------------+  +---------------------+  |
|                                                                                                |
|  H2: Signature Teak Creations                                                                  |
|  +-------------------+  +-------------------+  +-------------------+  +---------------------+  |
|  | [###] Dining Tbl  |  | [###] Teak Sofa   |  | [###] Teak Cot    |  | [###] Sideboard     |  |
|  | [ WA Enquire ]    |  | [ WA Enquire ]    |  | [ WA Enquire ]    |  | [ WA Enquire ]      |  |
|  +-------------------+  +-------------------+  +-------------------+  +---------------------+  |
|                                                                                                |
|  +----------------------------------------------------+  +----------------------------------+  |
|  | BESPOKE ORDER CONSULTATION                          |  | VISIT OUR KANGEYAM SHOWROOM      |  |
|  | Have an architect plan or Pinterest photo?         |  | Direct showroom display.         |  |
|  | Send directly to our design consultant on WhatsApp. |  | Google Rating: 4.8 / 5.0 (23 rev)|  |
|  | [ SEND PHOTO ON WHATSAPP ]                         |  | [ GET GOOGLE MAP DIRECTIONS ]    |  |
|  +----------------------------------------------------+  +----------------------------------+  |
|                                                                                                |
|  +------------------------------------------------------------------------------------------+  |
|  | HOW IT WORKS: 1. Select Design  ->  2. Customise on WhatsApp  ->  3. Delivered to Your Home|  |
|  +------------------------------------------------------------------------------------------+  |
|                                                                                                |
|  +------------------------------------------------------------------------------------------+  |
|  | FOOTER (Full 4-column navigation, brand story, opening hours, disclaimers)               |  |
|  +------------------------------------------------------------------------------------------+  |
+================================================================================================+
```

---

## 4. Layout & Interaction Annotations

### Primary Action (*)
- **Explore Catalogue Button** and **WhatsApp Enquiry Buttons**:
  - Primary goal: Transition visitor into browsing or opening a pre-filled WhatsApp enquiry link.
  - Position: Hero center-bottom (above the fold) and persistent on mobile via `StickyBottomBar`.

### Hierarchy Intent:
1. **1st Eye Stop:** Full-screen video motion (Showroom panning or grain texture).
2. **2nd Eye Stop:** H1 Headline ("BESPOKE NILAMBUR TEAK FURNITURE") & Primary Actions.
3. **3rd Eye Stop:** The rising curtain sheet revealing categories and product cards on scroll.

### Scroll Mechanics (The Harmony Curtain Reveal):
- **Hero Container:** `position: sticky; top: 0; height: 100vh; z-index: 1;`
- **Video Element:** `object-fit: cover; width: 100%; height: 100%;`
- **Content Sheet:** `position: relative; z-index: 10; margin-top: 100vh;`
  - As the user scrolls down, the content sheet slides up over the video smoothly.
  - Top header transitions from transparent overlay mode to frosted solid sticky header.

### Video Scene Switcher Interaction:
- Floating pill strip at the bottom-right or center of hero:
  - `[Showroom]` $\to$ plays `hero-video-showroom.mp4`
  - `[Wood Grain]` $\to$ plays `hero-video-grain.mp4`
  - `[Living Room]` $\to$ plays `hero-video-living.mp4`
  - `[Bedroom Cot]` $\to$ plays `hero-video-bedroom.mp4`
- Tapping a pill smoothly swaps the active video source with zero flash, using the pre-cached poster image.

### Content Rules & Governance:
- Zero shopping cart, zero checkout.
- Never use "Made in our workshop" $\to$ Use "custom-crafted to order" / "made to your specifications".
- Brand is always "INHOME FURNITURE".
- Product card touch targets strictly $\ge 44\times 44$px.

---

## 5. Structural Audit

- **Hierarchy Check:** Passed. Video captures attention; H1 and CTAs provide immediate action paths.
- **Flow Check:** Passed. Every card and button routes directly to `/catalogue`, `/[category]`, or `wa.me/` link.
- **Mobile Thumb Zone:** Passed. All primary actions and the persistent sticky bar sit within the thumb reach zone (lower 60%).
- **Accessibility & Touch Targets:** Passed. All interactive elements designed with minimum 44px/48px height.

---

## 6. Handoff Spec for `fz-uidesigner` & Engineering

- **Platform:** Responsive Web (Next.js 15 App Router, React 19).
- **Core Video Assets:**
  - `public/hero-video-showroom.mp4` (4.47 MB)
  - `public/hero-video-grain.mp4` (1.24 MB)
  - `public/hero-video-living.mp4` (2.06 MB)
  - `public/hero-video-bedroom.mp4` (1.38 MB)
- **Core Poster Images:**
  - `public/hero-teak-showroom.jpg`
  - `public/hero-teak-grain.jpg`
  - `public/hero-teak-living.jpg`
  - `public/hero-teak-bedroom.jpg`
- **What Must Not Change:**
  - The sticky 100vh hero + rising curtain sheet architecture.
  - The WhatsApp link builder ground truth in `lib/whatsapp.ts`.
  - The absence of shopping carts or pricing in navigation.
