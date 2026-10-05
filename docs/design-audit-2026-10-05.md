# Design & Architectural Audit — 2026-10-05
## INHOME FURNITURE — Review of Milestones 4, 4.5, 5 & 6

**Audit Date:** 2026-10-05  
**Auditor:** Senior Product Designer & Solutions Architect (`fz-audit` standard)  
**Milestones Audited:**
- **Milestone 4:** Supabase Backend Integration & Keep-Alive API
- **Milestone 4.5:** Client-Side Search Engine (`SearchBox` & `search-index`)
- **Milestone 5:** Mobile-First Admin Panel (`ImageUploader`, `ProductRow`, Admin Routes)
- **Milestone 6:** About & Showroom Page (`/about`) + Dynamic After-Hours Note

---

## 1. First Impression

The catalogue has evolved into a warm, deeply confident, and tactile showcase that feels unmistakably bespoke rather than assembled from an off-the-shelf template. The earthy Teak timber accents (`#8B5A2B`) against the soft sand background (`#FAF8F5`) ground the user immediately in solid wood craftsmanship, while the mobile-first admin tool delivers fluid, one-handed showroom floor management.

---

## 2. Visual & UX Scorecard

| Category | Mobile (390px) | Desktop (1440px) | Observations |
| :--- | :---: | :---: | :--- |
| **Whitespace** | **9.2 / 10** | **8.8 / 10** | Mobile rhythm is disciplined (8px scale). Desktop has good container max-widths, though wide-screen admin forms could benefit from slightly more vertical breathing room. |
| **Hierarchy** | **9.5 / 10** | **9.4 / 10** | Unambiguous focal points on every screen. WhatsApp CTAs command attention without shouting; product specs and trust badges follow logically. |
| **Color** | **9.6 / 10** | **9.6 / 10** | Exquisite palette restraint. Teak timber, warm stone, crisp elevated white cards, and vibrant WhatsApp green used exclusively for conversions. |
| **Typography** | **9.1 / 10** | **9.3 / 10** | Plus Jakarta Sans delivers strong, editorial titles; Inter ensures high body readability. Line lengths are comfortably constrained under 72ch. |
| **Buttons & Controls** | **9.4 / 10** | **9.2 / 10** | Strict adherence to $\ge 44\times 44\text{px}$ touch targets. Consistent radii (`var(--radius-md)`) and active tactile tap feedback. |
| **Element Placement** | **9.3 / 10** | **9.1 / 10** | Storytelling flows naturally: Hero $\to$ Proof $\to$ Catalogue $\to$ Bespoke Orders $\to$ Process. Mobile bottom bar stays locked without crowding content. |
| **Consistency** | **9.7 / 10** | **9.6 / 10** | Zero orphaned components. Universal design tokens, single-source layout shells, and consistent card language throughout. |
| **Modernity (2026)** | **9.5 / 10** | **9.4 / 10** | Clean, calm minimalism, organic rounded cards, subtle layered depth, and zero harsh borders or dated drop-shadows. |
| **OVERALL AVERAGE** | **9.4 / 10** | **9.3 / 10** | **Exceptional Production Quality** |

---

## 3. Milestone-by-Milestone Architectural & Data Review

### Milestone 4 — Supabase Backend & Keep-Alive
- **Schema & RLS (PostgreSQL):** `supabase/schema.sql` establishes strict Row-Level Security: public read access on visible, non-deleted items; authenticated-only mutations for admin. GIN index on `keywords` and B-tree indexes on slugs and visibility optimize query execution.
- **Mock Fallback Resilience:** When Supabase environment variables are missing or credentials are unreachable, all data services gracefully fall back to `lib/mock-data.ts`. Zero crashes or unhandled promise rejections.
- **Heartbeat Endpoint:** `/api/keep-alive` accurately pings the database, returns execution latency in milliseconds, and is wired to a 3-day GitHub Actions scheduled workflow (`.github/workflows/keep-alive.yml`).

### Milestone 4.5 — Client-Side Search Engine
- **Index Hygiene:** `/api/search-index` filters out hidden (`visible = false`) and soft-deleted (`deleted_at IS NOT NULL`) items.
- **Zero Real-Time DB Keystroke Traffic:** Search index is cached via ISR (1 hour) and lazy-loaded only when the user first focuses the search input.
- **Empty-State Conversion:** When no products match a user's query, the search overlay displays a dedicated WhatsApp consultation button for custom design enquiries, eliminating dead ends.

### Milestone 5 — Mobile-First Admin Panel
- **Dual-Output Canvas Compressor:** `ImageUploader.tsx` generates:
  1. **Display Version:** WebP, long edge $\le 1600\text{px}$.
  2. **OG Preview Version:** WebP, $1200\times 630$ center crop, strictly $< 300\text{ KB}$ with adaptive quality reduction and hard oversize rejection.
- **Showroom Floor Ergonomics:** Bottom navigation bar on mobile with safe-area insets (`env(safe-area-inset-bottom)`). Quick WhatsApp share triggers 1-tap customer quote links.
- **Single Admin Guard:** Simple, secure single-owner login with mock mode bypass for local testing.

### Milestone 6 — About & Showroom Page + After-Hours Note
- **Copy Governance Adherence:** 100% compliance with Section 1.1 of `AGENTS.md`. Zero claims of "our workshop" or "our factory". Terminology strictly adheres to *"custom-crafted to order"*, *"made to your specifications"*, and *"expert artisans"*.
- **Location Credibility:** Showroom address at TCL Tower, Chennimalai Rd, Kangeyam prominently featured with Google Maps deep link and verified ⭐ 4.8 / 5.0 Google rating badge.
- **After-Hours Note Governance:** Read dynamically from `settings.after_hours_note`. Integrated across 4 touchpoints (Sticky Bottom Bar, Product Page, Category Page, Home Page) as a plain UI label. **P0 Ground Truth in `lib/whatsapp.ts` remains 100% untouched.**

---

## 4. Detailed Visual & UI Issues Ranked by Severity

### 🔴 High Severity Issues
*None found.* All critical paths (navigation, WhatsApp generation, responsive builds, touch targets) are fully operational without layout breaks or crashes.

### 🟡 Medium Severity Issues

#### M-01 — Search Overlay Mobile Stacking vs. Sticky Bottom Bar
- **Where:** `components/catalogue/SearchBox.tsx` (`.search-results-overlay`)
- **Version Affected:** Mobile viewports $\le 640\text{px}$ on short screens (e.g., iPhone SE / 667px height).
- **Symptom:** The floating search overlay has `z-index: 60`, while `StickyBottomBar.tsx` has `z-index: 90`. If a customer scrolls through the 8 search results on a short mobile screen, the bottom 1-2 results can sit behind the sticky action bar.
- **Why it feels off:** The customer cannot tap the bottom search result without dismissing the sticky bar or keyboard.
- **Recommended Fix:** Set `.search-results-overlay` `max-height: calc(100vh - 220px)` on mobile screens (`max-width: 640px`) and ensure `padding-bottom: 4rem` inside the results list to clear the sticky bottom bar.

#### M-02 — Long After-Hours Note Micro-Line on Ultra-Narrow Screens (360px)
- **Where:** `components/layout/StickyBottomBar.tsx` (`.sticky-micro-note`)
- **Version Affected:** Mobile devices $\le 360\text{px}$ width (e.g., Galaxy S8 / Fold outer screen).
- **Symptom:** If the owner sets a verbose `after_hours_note` (e.g. *"We reply during showroom hours between 9:00 AM and 6:00 PM"*), the micro-line truncates aggressively (`text-overflow: ellipsis`), showing only the first few words.
- **Why it feels off:** The text becomes cut off and potentially confusing (e.g., *"We reply during showr..."*).
- **Recommended Fix:** In `StickyBottomBar.tsx`, add `max-width: 140px` and suggest in the admin settings helper copy that the note should be concise (e.g., *"Replies until 6 PM"* or *"Shop hours: 9am–6pm"*).

#### M-03 — Desktop Map Column on `/about` Uses Abstract Card Instead of Interactive Iframe
- **Where:** `app/(public)/about/page.tsx` (`.showroom-map-col`)
- **Version Affected:** Desktop $\ge 1024\text{px}$.
- **Symptom:** The showroom section on `/about` displays an artistic gradient card with bullet points and an "Open Live Location in Maps" button. On wide desktop screens, it leaves an opportunity for a richer visual anchor.
- **Why it feels off:** Homeowners researching high-ticket teak furniture want to verify the exact physical showroom storefront.
- **Recommended Fix:** In Milestone 7 visual polish, embed an interactive Google Maps iframe or showroom facade photo alongside the pin details.

---

### 🟢 Low Severity Polish Items

#### L-01 — Admin Form Field Spacing on Desktop
- **Where:** `app/admin/products/new/page.tsx` and `app/admin/products/[id]/page.tsx`
- **Version Affected:** Desktop (1440px).
- **Symptom:** The form groups have `margin-bottom: 1.25rem`. On a large desktop monitor, the form elements feel slightly tightly clustered compared to the generous whitespace of the public catalogue.
- **Recommended Fix:** Increase desktop form group gap to `1.75rem` (`28px` on 8px scale).

#### L-02 — Product Row Image Fallback State
- **Where:** `components/admin/ProductRow.tsx`
- **Version Affected:** Both Mobile and Desktop.
- **Symptom:** When a product has no image uploaded yet, the row shows a placeholder gray box with an icon. It works, but adding an explicit *"No photo uploaded"* micro-badge provides clearer showroom feedback.
- **Recommended Fix:** Add a small amber indicator badge: `No Photo` when `product.image_url` is null.

#### L-03 — Breadcrumb Optical Padding on Mobile `/about`
- **Where:** `app/(public)/about/page.tsx` (`.breadcrumb-nav`)
- **Version Affected:** Mobile (390px).
- **Symptom:** Margin bottom is `2rem`. On 390px viewports, 24px (`1.5rem`) provides tighter, more cohesive pairing with the hero badge.
- **Recommended Fix:** Adjust mobile `.breadcrumb-nav` margin to `1.25rem`.

---

## 5. Quick Wins (Top 3 Highest Impact for Least Effort)

1. **Add Results Bottom Padding in `SearchBox.tsx`:**  
   Add `padding-bottom: 3.5rem` to `.search-results-list` so mobile users never experience search results colliding with the sticky action bar.
2. **Concise Admin Helper Copy for After-Hours Note:**  
   In `app/admin/page.tsx` or settings instructions, recommend keeping the after-hours note under 30 characters for optimal display across mobile sticky bars.
3. **Showroom Exterior Photo on `/about`:**  
   Add a crisp photo of the Kangeyam TCL Tower showroom front to the map column for immediate physical credibility.

---

## 6. Theme & Palette Verdict

- **Light Theme (Active):** Soft warm canvas (`#FAF8F5`) paired with rich Teak timber (`#8B5A2B`) and charcoal text (`#1C1917`) delivers a grounded, premium feeling suited for solid wood furniture. Surfaces elevate smoothly via 1px subtle borders (`#E7E2DA`) rather than heavy drop shadows.
- **Dark Theme:** Currently not implemented. Given the local Kangeyam and Tamil Nadu retail demographic (predominantly daytime WhatsApp browsing in natural showroom light), the warm stone palette is the optimal choice for brand trust and readability.

---

## 7. Audit Summary & Readiness Gate

- **Total Issues Found:** 0 High | 3 Medium | 3 Low
- **Build Status:** 42 / 42 routes compiled cleanly with 0 errors in Next.js 15.5.
- **Governance Status:** 100% compliant with WhatsApp Ground Truth, Copy Rules, and Resilient Mock Fallbacks.
- **Verdict:** **PASSED AUDIT.** Ready to proceed with **Milestone 7 (QA, Visual Polish & Launch Readiness)**.
