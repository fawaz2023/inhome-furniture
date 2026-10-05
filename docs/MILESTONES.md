# Antigravity Implementation Milestones
## INHOME FURNITURE — Phased Build Roadmap

This document outlines the sequential, testable milestones for building the INHOME FURNITURE catalogue web application. Each milestone is independently verifiable before proceeding.

> **Context:** The site serves two primary entry points — (1) the owner sends a direct WhatsApp link to existing customers, and (2) the Instagram bio link for new visitors. Both demand an excellent first impression. The Gallery page is **not required for v1**. Real product photos are added by the owner via the admin panel after the foundation is live with mock data.

---

## Milestone Overview

```text
[Milestone 1] Foundation & Design System (Tokens, Layouts, Sticky Bottom Bar, Resilient Seed Data) [✅ COMPLETE]
      ↓
[Milestone 2] Customer Catalogue Flow (Home, Category Grid, Product Detail, Dual WhatsApp CTAs) [✅ COMPLETE]
      ↓
      ◉ VISUAL CHECKPOINT — audit appearance at 390px before any external link is shared [PASSED]
      ↓
[Milestone 3] WhatsApp Link Generation & Open Graph Engine (Link Preview Cards, JSON-LD Schema, Sitemap) [✅ COMPLETE]
      ↓
[Milestone 4] Supabase Backend & Keep-Alive (Schema + keywords & settings columns, Storage, Keep-Alive) [✅ COMPLETE]
      ↓
[Milestone 4.5] Client-Side Search (Cached JSON index, Search box on Home, Lazy-loaded results overlay) [✅ COMPLETE]
      ↓
[Milestone 5] Mobile-First Admin Panel (Dual-Image Compress, Keywords Field, WhatsApp Share, CRUD) [✅ COMPLETE]
      ↓
      ◉ CONTENT HANDOFF — owner adds real product photos via admin panel before site is shared publicly
      ↓
[Milestone 6] About & Showroom Page (/about, Google 4.8 Rating, Map, Opening Hours, After-Hours WhatsApp Note) [🔄 NEXT]
      ↓
[Milestone 7] QA, Visual Polish & Launch Readiness (Audits, Search Console, Page-View Counter)
      ↓
[Milestone 8] Gallery Page — Phase 1.5 (Showroom & Finished Work photos, Filter tabs, Lightbox)
```

> ⚠️ **WhatsApp unfurl testing (live preview cards) can only be verified after Milestone 4 (Supabase connected) and after a live domain with HTTPS is configured.** Mock data testing on localhost will not trigger WhatsApp crawlers.

---### Milestone 1: Project Foundation & Design System
**Focus:** Project structure, design tokens, responsive typography, navigation shell, and persistent mobile action bar.
- `[NEW]` Root workspace setup: Initialize Next.js 15+ App Router with TypeScript strict mode.
- `[NEW]` `types/database.ts`: TypeScript interfaces for `Category`, `Product`, `GalleryItem`, and `Settings`.
- `[NEW]` `app/globals.css`: Configure with the 2026 design token palette:
  - Deep timber/teak accent (`#8B5A2B`) and hover (`#6E4520`)
  - Warm sand canvas (`#FAF8F5`)
  - Crisp elevated card surfaces (`#FFFFFF`)
  - Muted stone text (`#78716C`) and primary charcoal (`#1C1917`)
  - WhatsApp green (`#25D366`), subtle border (`#E7E2DA`)
- `[NEW]` Package installation: Install `lucide-react` for consistent iconography.
- `[NEW]` `components/layout/Header.tsx`: INHOME FURNITURE typographic wordmark, "Kangeyam, Tamil Nadu" micro-subtitle, Google ⭐ 4.8 static badge, top navigation tabs.
- `[NEW]` `components/layout/StickyBottomBar.tsx`: Persistent `min-height: 56px` action bar with **Call** (`tel:+91...`), **WhatsApp** (`https://wa.me/...`), and **Directions** (Google Maps deep link). Support `env(safe-area-inset-bottom)`.
- `[NEW]` `components/layout/Footer.tsx`: TCL Tower address, hours, local trust copy.
- `[NEW]` `app/layout.tsx`: Root HTML layout importing Google Fonts (`Plus Jakarta Sans` / `Inter`), global styles, and layout shell.
- `[NEW]` `lib/mock-data.ts`: Complete fallback seed data with all **17 confirmed categories** and 2–3 realistic sample products per category. Must render fully without Supabase.

### Milestone 2: Customer Catalogue Flow
**Focus:** App-like browsing experience mirroring NineFinds / CU Malaysian Furniture.
- `[NEW]` `components/catalogue/HowItWorksStrip.tsx`: 5-step horizontal custom order process strip (no workshop claims).
- `[NEW]` `components/catalogue/CategoryCard.tsx`: Category card with 4:3 image, product count badge, and clean tap feedback.
- `[NEW]` `components/catalogue/ProductCard.tsx`: 2-column mobile card with WebP thumbnail, 2-line clamped title, and status badge.
- `[NEW]` `components/catalogue/NewArrivalsCarousel.tsx`: Horizontal scroll carousel for high-visibility recent additions.
- `[NEW]` `app/(public)/page.tsx`: Home page hero, How It Works strip, "Have Your Own Design?" custom CTA card, 17-category grid, and New Arrivals carousel.
- `[NEW]` `app/(public)/[category]/page.tsx`: Category detail page with breadcrumbs, category intro, product count, and 2-column card grid.
- `[NEW]` `app/(public)/[category]/[product]/page.tsx`: Product detail page with image gallery switcher, specification tags, customisation options panel, dual WhatsApp CTAs, and related category products.

---
> **◉ VISUAL CHECKPOINT (End of Milestone 2)**  
> Before proceeding to Milestone 3, run a visual audit at 390px (mobile) and 1440px (desktop):  
> - All touch targets ≥ 44×44px  
> - Zero horizontal overflow  
> - Typography scale and color tokens consistent  
> - Hero section makes a strong first impression  
> - "New Arrivals" carousel is functional and visually prominent  
> Only after this check passes should Milestone 3 begin.

### Milestone 3: WhatsApp Link Generation & Open Graph Engine
**Focus:** Infrastructure for reliable link unfurls and rich preview cards in WhatsApp chats.
- `[NEW]` `lib/whatsapp.ts`: Phone sanitizer (`91<10 digits>`), standard enquiry URL builder, and custom order enquiry URL builder.
- `[MODIFY]` `app/(public)/[category]/[product]/page.tsx`: Dynamic `generateMetadata()` with absolute HTTPS `og:image` (< 300 KB, ≥ 600×315px), `og:title`, and `og:description`.
- `[MODIFY]` `app/(public)/[category]/page.tsx`: Dynamic `generateMetadata()` for category preview cards.
- `[NEW]` `lib/seo.ts`: Schema.org JSON-LD structured data generators (`FurnitureStore` and `Product` + `Offer`).
- `[NEW]` `app/sitemap.ts`: Dynamic XML sitemap generator indexing home, category, and product routes.
- `[NEW]` `app/robots.ts`: Crawler rules disallowing `/admin/` and `/api/`.

### Milestone 4: Supabase Backend Integration & Keep-Alive
**Focus:** Live PostgreSQL persistence, image storage, free-tier keep-alive, and schema foundations for Search (M4.5) and After-Hours Note (M6).
- `[NEW]` `lib/supabase.ts`: Client-side Supabase client with graceful fallback to `lib/mock-data.ts`.
- `[NEW]` `lib/supabase-server.ts`: Server-side Supabase client (SSR / Server Actions) with fallback.
- `[NEW]` `supabase/schema.sql`: Full DDL migration script (tables: `categories`, `products`, `gallery_items`, `settings`, RLS, indexes).
  - `products` table: include `keywords text[]` column (optional, for M4.5 client-side search).
  - `products` table: include `image_url text` (display version, ≤ 1600px WebP) and `og_image_url text` (OG preview, 1200×630, < 300 KB) — dual columns for M5 dual-image uploader.
  - `settings` table: include `opening_hours varchar` and `after_hours_note varchar` columns (read by WhatsApp button UI in M6).
- `[NEW]` `supabase/seed.sql`: Seed data for the 17 initial categories + default `settings` row with placeholder opening hours and after-hours note.
- `[NEW]` `app/api/keep-alive/route.ts`: Database heartbeat ping endpoint checking category count.
- `[NEW]` `.github/workflows/keep-alive.yml`: GitHub Actions cron workflow to ping `/api/keep-alive` every 3 days.
- `[MODIFY]` `types/database.ts`: Add `keywords: string[]`, `og_image_url: string | null` to `Product` interface; add `opening_hours: string`, `after_hours_note: string` to `Settings` interface.
- `[MODIFY]` `lib/mock-data.ts`: Add `keywords` arrays to sample products; add `opening_hours` and `after_hours_note` to mock settings object.

### Milestone 4.5: Client-Side Search
**Focus:** Instant, privacy-friendly product and category search — no external service, works on slow phones.
- `[NEW]` `app/api/search-index/route.ts`: Cached JSON endpoint returning all **visible** products and categories (name, category, slug, thumbnail URL, keywords). Hidden or deleted products are excluded. Regenerated on-demand when content changes.
- `[NEW]` `components/catalogue/SearchBox.tsx`: Always-visible search input at the top of the Home page. Lazy-loads the search index only when the box is first focused — keeps initial page payload lean.
- `[NEW]` `components/catalogue/SearchResults.tsx`: Floating results overlay with case-insensitive "contains" matching on name, category, and keywords. Results render as the customer types. Empty state: *"No match. Browse categories or ask us on WhatsApp"* with a WhatsApp button.
- `[MODIFY]` `app/(public)/page.tsx`: Mount `SearchBox` at the top of the Home page, above the category grid.

### Milestone 5: Mobile-First Admin Panel
**Focus:** Single-hand mobile dashboard for showroom floor operation (owner-only login).
- `[NEW]` `app/admin/layout.tsx`: Admin layout with Supabase auth guard and thumb-friendly navigation bar.
- `[NEW]` `app/admin/login/page.tsx`: Clean, password-based admin login screen.
- `[NEW]` `app/admin/page.tsx`: Dashboard overview with quick action buttons (Add Product, Share Catalogue).
- `[NEW]` `components/admin/ImageUploader.tsx`: Dual-output browser-side canvas compressor:
  - **Display version:** long edge ≤ 1600px, WebP → stored as `image_url`.
  - **OG preview version:** 1200×630 crop/resize, WebP, strictly < 300 KB → stored as `og_image_url`.
  - Admin UI shows the resulting KB size for both outputs before confirming upload.
  - Rejects originals whose compressed OG output still exceeds 300 KB with a clear error message.
  - Original phone camera photos are never stored or served to customers.
- `[NEW]` `app/admin/products/page.tsx`: Product list with visibility toggles, direct WhatsApp share button, and edit links.
- `[NEW]` `app/admin/products/new/page.tsx`: Add product form with camera capture `<input capture="environment">`, `keywords` field (comma-separated tags for search), tags, and customisation fields.
- `[NEW]` `app/admin/products/[id]/page.tsx`: Edit product form (includes `keywords` field).
- `[NEW]` `app/admin/categories/page.tsx`: Category management (reorder, edit descriptions, toggle visibility).
- `[NEW]` `app/admin/gallery/page.tsx`: Showroom photo uploader with tags (`showroom`, `finished_work`, `new_arrival`).

---
> **◉ CONTENT HANDOFF (End of Milestone 5)**  
> After admin panel is live, the owner adds real product photos before the site is shared publicly with customers or placed in the Instagram bio.

### Milestone 6: About & Showroom Page + After-Hours WhatsApp Note
**Focus:** Trust signals, physical location credibility, contact details, and contextual reply-time note near all WhatsApp buttons.
- `[NEW]` `app/(public)/about/page.tsx`:
  - INHOME FURNITURE story as Kangeyam's trusted custom-furniture specialist (no workshop claims).
  - TCL Tower address block with Google Maps directions button.
  - Google ⭐ 4.8 static rating badge.
  - Showroom opening hours display — read from `settings.opening_hours`, never hardcoded.
  - Call and WhatsApp quick action CTAs.
- `[MODIFY]` `app/(public)/[category]/[product]/page.tsx` and `app/(public)/[category]/page.tsx`:
  - Add after-hours note label near every WhatsApp CTA button — e.g. *"We reply during shop hours (until 6 pm)"*.
  - Label text is read from `settings.after_hours_note`. If null/empty, the label is simply not rendered.
  - **Do NOT modify `lib/whatsapp.ts`** or the pre-filled message. This is a UI-only label, not part of the URL.
- `[MODIFY]` `components/layout/StickyBottomBar.tsx`: Display `settings.after_hours_note` as a micro-line beneath the WhatsApp icon (gracefully hidden when null).

### Milestone 7: QA, Visual Polish & Launch Readiness
**Focus:** Flawless visual and functional verification, analytics instrumentation, and pre-launch checklist before the site is shared publicly.
- `[MODIFY]` Visual Polish (`app/globals.css`, component layouts):
  - Audit across 390px, 768px, and 1440px viewports.
  - Enforce touch targets ≥ 44×44px.
  - Prevent any horizontal overflow.
  - Safe area insets on mobile notches and home indicator bars.
- `[NEW]` Verification Test Suite / Checklist:
  - Verify every WhatsApp CTA format and encoding.
  - Verify all 17 category routes.
  - Verify fallback behavior when Supabase credentials are not present.
  - Verify keep-alive API latency.
  - Verify search index excludes hidden/deleted products and returns correct results.
  - Verify after-hours note displays near WhatsApp buttons and updates when `settings.after_hours_note` changes.
  - Verify OG preview images are under 300 KB and display correctly in WhatsApp unfurl (requires live domain).
- `[NEW]` Launch Readiness — Analytics & Search Console:
  - Add Google Search Console verification meta tag to `app/layout.tsx`.
  - Submit `/sitemap.xml` in Google Search Console dashboard (operational step, no code).
  - `[NEW]` `app/api/pageview/route.ts`: Privacy-friendly page-view counter endpoint — no cookies, stores aggregated counts in the `settings` table or a lightweight `pageviews` table. Goal: confirm whether shared WhatsApp links are being opened.
  - `[MODIFY]` `app/layout.tsx`: Mount the page-view beacon script.

### Milestone 8: Gallery Page (Phase 1.5)
**Focus:** Showroom and finished-work gallery (post-v1 launch feature).
- `[NEW]` `app/(public)/gallery/page.tsx`: Filterable gallery grid (**All** | **Showroom** | **Finished Custom Work** | **New Arrivals**).
- `[NEW]` `components/catalogue/Lightbox.tsx`: Full-screen touch-friendly modal lightbox with "Ask about this piece on WhatsApp" button.llery items are managed through the admin panel gallery section (already built in Milestone 5).

---

## Open Items (Required Before Site Goes Live)

| Item | Status | Owner |
| :--- | :--- | :--- |
| Real WhatsApp / phone number | ⏳ TBD | Shop owner (copy from Google listing) |
| Confirmed opening hours | ⏳ TBD | Shop owner (currently placeholder: 9 AM) |
| Logo file (if available) | ⏳ TBD | Shop owner — header uses text wordmark until provided |
| "Rocking and Easy Chair" spelling | ⏳ TBD | Confirm with owner (slug will be locked after Milestone 1) |
| Domain name | ⏳ TBD | Not a build blocker; needed before WhatsApp unfurl testing |
| Real product photos | ⏳ TBD | Owner uploads via admin panel after Milestone 5 |

## Phase 2 Features (After v1 Launch)

- Tamil language version (requires i18n routing; architecture supports it — slug structure is neutral).
- QR code generator for bills, visiting cards, and counter display.
- Simple WhatsApp enquiry click tracking (lightweight analytics event).
- Measuring guide (room sizing tips for custom orders).
- Tamil language version (requires i18n routing; slug structure is neutral).
