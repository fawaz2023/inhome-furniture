# Full Codebase Audit — Milestones 1 through 4.5

**Date:** 2026-10-05
**Scope:** Verify every component of Milestones 1–4.5 (per `docs/MILESTONES.md`) against actual source code, cross-referenced with `docs/KNOWN_BUGS.md`, and identify all problems by severity.
**Method:** Three parallel read-only audit passes (M1+M2, M3, M4+M4.5) + live `npm run build` verification.
**Build status:** ✅ `npm run build` compiles cleanly on Next.js 15.5.27 — 41 routes generated (home, 17 categories, 11 products, `/about`, `/gallery`, 6 admin routes, `/api/keep-alive`, `/api/search-index`, `/robots.txt`, `/sitemap.xml`).

> ⚠️ First build attempt failed in `next/font/google` loader (`TypeError: Cannot read properties of null (reading '1')` in `loader.js:122`). Retry succeeded. **Build fragility note:** `next/font/google` downloads fonts at build time — any build without network access to Google Fonts fails. Consider vendoring fonts locally before CI/CD or production builds.

---

## Severity Legend

| Level | Meaning |
| :--- | :--- |
| P0 | Crash / launch blocker / ground-truth spec violation |
| P1 | Wrong behavior in a shipped flow |
| P2 | Visual, latent, or resilience risk |
| P3 | Minor / advisory |

---

## P0 — Critical

### 1. Public catalogue never reads the database (serves mock data only)

**Files:**
- `app/(public)/page.tsx:1,11`
- `app/(public)/[category]/page.tsx:17,25,66,72`
- `app/(public)/[category]/[product]/page.tsx:38,42,56-57,109-110,123`
- `app/sitemap.ts:31,42`

**Symptom:** Every public page and the sitemap import `getMock*` helpers from `lib/mock-data.ts` directly instead of the resilient `getServer*` fetchers in `lib/supabase-server.ts`.

**Impact:** With Supabase connected and the owner adding real products via the admin panel, visitor-facing pages still render hard-coded mock data. `generateStaticParams()` enumerates only mock slugs, so any DB-only product/category URL returns **404**. The entire Supabase resilience layer (M4) exists but is never invoked on the public surface — invisible until content handoff after M5.

**Fix direction:** Replace direct `getMock*` imports with the async `getServer*` fetchers (which already implement env-guard + try/catch + mock fallback) in the three public pages and `app/sitemap.ts`. This single change also resolves P1 #3 (admin pages).

---

### 2. `lib/whatsapp.ts` default shop number deviates from P0 ground truth

**File:** `lib/whatsapp.ts:21` and `:34`
**Severity rationale:** AGENTS.md §4.2 is declared an immutable P0 ground truth. The spec mandates the default `shopNumber: string = '919876543210'`; the code uses `'919999999999'`.

**Everything else passes byte-for-byte:** sanitizer logic (lines 9–14), baseUrl fallback `process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in'` (line 23), both message templates verbatim (lines 27–28), final URL builder with `encodeURIComponent` (line 30).

**Propagation:** the non-spec number also appears in `components/layout/StickyBottomBar.tsx:11`, `lib/seo.ts:13` (`telephone`), `lib/mock-data.ts:544` (`whatsapp_number`).

**Fix direction:** CRITICAL blast radius per AGENTS.md §0.2 — requires explicit user confirmation, plus a single decision on the real shop number (currently listed in MILESTONES.md "Open Items"). Fix in one constant and propagate.

---

## P1 — Wrong behavior

### 3. Admin screens read exclusively from mock data

**Files:** `app/admin/page.tsx:31,53`; `app/admin/categories/page.tsx:25,35,39`; `app/admin/products/page.tsx:24,44`

**Symptom:** Admin dashboards read `MOCK_PRODUCTS` / `getMockCategories()` directly. Visibility toggles and CRUD operations act on in-memory mock rows, never Postgres.

**Impact:** Even with Supabase configured, the admin panel cannot persist changes. Same root cause as P0 #1.

---

### 4. Mock data under-filled; `product_count` badges lie

**File:** `lib/mock-data.ts` (throughout)

**Symptom:** Spec (MILESTONES.md M1): 2–3 sample products per category across 17 categories. Actual: only 6/17 categories have products (cat-1: 3, cat-2: 2, cat-4: 2, cat-7: 1, cat-14: 1, cat-16: 1, cat-17: 1); **11 categories have zero products**. Worse, every category hardcodes `product_count: 2`.

**Impact:** CategoryCard count badges show false numbers; 11 category pages render empty states on the public site.

**Fix direction:** Either add sample products to all 17 categories, or derive `product_count` from the actual products array at build time (preferred — self-maintaining).

---

### 5. `StickyBottomBar` bypasses phone sanitizer and runs on a placeholder number

**Files:** `components/layout/StickyBottomBar.tsx:10-15`; `app/layout.tsx:81`

**Symptoms:**
- The bar is rendered with no props; Call/WhatsApp/Directions targets use placeholder `919999999999`.
- `wa.me` URL (line 15) is constructed directly from the prop without `formatWhatsAppNumber()` — a caller passing `+91 99999 99999` produces a broken deep link.
- SESSION_HANDOFF documentation claims the layout passes `getServerShopSettings()` — that wiring does not exist in the code.

**Fix direction:** Run the number through `formatWhatsAppNumber()` in the bar; pass live settings in from the layout (needs `lib/supabase-server.ts` settings fetcher).

---

## P2 — Visual / latent risk

### 6. OG images unguarded; wrong source field and dimensions

**Files:** `app/(public)/[category]/[product]/page.tsx:65,86`; `app/(public)/[category]/page.tsx:46`

**Symptoms:**
- Product page `og:image` uses `product.images[0]` (uncapped `w=800` Unsplash JPEG) instead of `product.og_image_url` — the mandated 1200×630 WebP < 300 KB OG variant from the M5 dual-image uploader.
- Declared OG dimensions are 800×600, not the required 1200×630.
- No absolute-HTTPS guard or fallback. `metadataBase` (`app/layout.tsx:44`) currently rescues relative URLs, and all mock images are absolute HTTPS, so this is **latent**, not active — but a Supabase row with a relative path or HTTP URL would silently emit a broken/insecure OG card, defeating the WhatsApp unfurl flow that is the project's primary conversion mechanism.

**Fix direction:** Prefer `product.og_image_url || product.images[0]`; guard `og:image` to absolute HTTPS with a site-default fallback; correct declared dimensions to 1200×630. Full 300 KB enforcement arrives with the M5 dual-image uploader.

---

### 7. Header/Footer hardcode values provided by settings

**Files:** `components/layout/Footer.tsx:37`; `components/layout/Header.tsx:20-29`

**Symptom:** Phone, opening hours, address, and the Google ⭐ 4.8 rating badge are hardcoded despite `MOCK_SETTINGS` and the `settings` table providing these fields.

**Impact:** Admin edits to settings will never reach the public shell — contradicts the data-driven core requirement.

---

### 8. No `(public)/layout.tsx` — admin pages wrapped in customer chrome

**File:** `app/layout.tsx:88-91`

**Symptom:** Header, Footer, and the customer StickyBottomBar (Call/WhatsApp/Directions) mount in the root layout, so they also wrap all `/admin/*` routes.

**Impact:** The mobile admin panel (owner using it one-handed on the showroom floor, per spec) carries a customer-facing action bar that eats ~64px of viewport bottom space and offers Call/WhatsApp buttons on admin screens.

**Fix direction:** Move public chrome into `app/(public)/layout.tsx`; keep root layout minimal.

---

### 9. Misc consistency items

| File:Line | Issue |
| :--- | :--- |
| `app/admin/page.tsx:102`, `components/admin/ProductRow.tsx:32` | Raw `wa.me/?text=...` share-intent URLs bypass the centralized `lib/whatsapp.ts` helper |
| `components/catalogue/SearchBox.tsx:193-196` | Empty-state copy is *"No match found for …/ Browse our categories or ask us directly on WhatsApp for custom pieces."* — deviates from governance string *"No match. Browse categories or ask us on WhatsApp"* (WhatsApp button present; compliant in spirit) |

---

## P3 — Minor / advisory

| # | File:Line | Issue |
| :--- | :--- | :--- |
| 1 | `lib/seo.ts:72` | `Offer.price: '0'` placeholder risks Google rich-result degraded display; intentional (no-price catalogue model) — add a code comment |
| 2 | `components/catalogue/SearchBox.tsx:137-211` | No standalone `SearchResults.tsx`; results inlined — deviates from the one-component-per-file registry (AGENTS.md §5.1) |
| 3 | `types/database.ts:17` vs `supabase/schema.sql:16` | `Category.image_url` typed non-null `string`; column is nullable. Runtime-safe (usage sites use `\|\| ''`) but type is optimistic |
| 4 | `lib/mock-data.ts:291+` | Only first 3 mock products carry `keywords`/`image_url`/`og_image_url` fields; keywords are spec-optional, thumbnails fall back to `images[0]` |
| 5 | `components/layout/StickyBottomBar.tsx` | Spec'd `min-height: 56px` not codified; computed ≈64px via 48px buttons + padding. Functionally compliant; `env(safe-area-inset-bottom)` ✅ line 68 |
| 6 | `app/(public)/page.tsx:1` | Duplicate/unused import (`getMockCategories as getAllCats`) |
| 7 | `app/(public)/page.tsx:51,98` | Hardcoded "17 Categories" copy will drift from `categories.length` |
| 8 | `app/(public)/page.tsx` path | Public pages live directly under `app/`, not `app/(public)/` as the folder spec diagrams — cosmetic; route-group layout only becomes load-bearing with finding #8 |

---

## Verified Clean (no action required)

**Milestone 1 — Foundation & Design System**
- `types/database.ts`: Category, Product, GalleryItem, Settings fully typed, zero `any`
- `app/globals.css`: all 9 design tokens at exact hex values; `--min-touch-target: 44px` (line 53); `overflow-x: hidden` on html/body
- `lucide-react ^0.475.0` installed
- `app/layout.tsx`: Google Fonts + `metadataBase` + full OG/Twitter metadata + FurnitureStore JSON-LD (lines 82–85)

**Milestone 2 — Customer Catalogue Flow**
- All four catalogue components conform: `CategoryCard` (4:3, count badge), `ProductCard` (`aspect-ratio 4/3` + `object-fit: cover`, 2-line clamp + `min-height: 2.5rem`, status badge, 44px enquire button), `HowItWorksStrip`, `NewArrivalsCarousel`
- Touch targets ≥ 44px verified everywhere (nav 44, sticky buttons 48, dual CTAs 48–50, quick-enquire 44)
- **Zero forbidden copy**: no matches for "Made in our workshop", "our craftsmen", "Add to Cart", "Checkout", "Buy Now", "In Home" / "Inhome"; branding consistently `INHOME FURNITURE`
- Product page has gallery switcher, spec rows, customisation panel, dual WhatsApp CTAs (`standard`/`customise` variants, lines 115–116), related products

**Milestone 3 — WhatsApp & OG Engine**
- `lib/whatsapp.ts` sanitizer + message templates byte-exact to spec (only the default number deviates — P0 #2)
- `lib/seo.ts`: valid `FurnitureStore` and `Product` + `Offer` JSON-LD
- `app/sitemap.ts`: dynamic, absolute URLs, home + all category + all product routes
- `app/robots.ts`: `disallow: ['/admin/', '/api/']` + sitemap reference
- All product CTAs traced through `buildProductEnquiryUrl` with sanitized numbers

**Milestone 4 — Supabase Backend**
- `lib/supabase.ts` / `lib/supabase-server.ts`: env guards execute **before** every `.from(...)` call; try/catch + mock fallback throughout
- `supabase/schema.sql`: 4 tables, RLS enabled (public read, authenticated CRUD, lines 124–173), indexes including GIN on keywords (line 116), `products.keywords text[]`, `image_url`, `og_image_url`, `settings.opening_hours`, `after_hours_note`, soft-delete `deleted_at`, `updated_at` triggers
- `supabase/seed.sql`: exactly 17 categories + settings row with opening hours and after-hours note
- `app/api/keep-alive/route.ts`: CRON_SECRET (Bearer / `x-cron-secret` / query), category count, returns `{success, timestamp, count, latencyMs}` + mock-mode fallback
- `.github/workflows/keep-alive.yml`: cron `0 6 */3 * *` (every 3 days), manual dispatch, fails on non-200
- **Column-name consistency verified**: schema uses `visible BOOLEAN` (not `is_visible`); consistent across DDL, types, fetchers, RLS, search-index, and mock filters — no field-name drift

**Milestone 4.5 — Client-Side Search**
- `app/api/search-index/route.ts`: filters `visible = true` + `deleted_at IS NULL`; payload = name/category/slug/thumbnail/keywords; cached (`revalidate = 3600` + `s-maxage=3600, stale-while-revalidate=86400`); no per-keystroke queries
- `SearchBox.tsx`: lazy-loads index only on first focus (lines 111–114); multi-term case-insensitive contains across name + category + keywords (lines 77–83); WhatsApp button in empty state
- Mounted above category grid in `app/(public)/page.tsx:46`

**Bug registry cross-check:** `docs/KNOWN_BUGS.md` contains BUG-001 (P2, ProductCard 44px touch target) and BUG-002 (P1, search-index Supabase type cast) — both `✅ FIXED`; no open or investigating entries.

---

## Consolidated Findings Table

| # | Severity | File:Line | Issue | Fix effort |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **P0** | 3 public pages + `app/sitemap.ts` | Public catalogue reads mock data, never Supabase | Medium — swap to `getServer*` fetchers |
| 2 | **P0** | `lib/whatsapp.ts:21,34` | Default shop number deviates from ground truth | Trivial, but CRITICAL file — needs owner number + confirmation |
| 3 | **P1** | 3 admin pages | Admin CRUD operates on mock rows | Resolved by fix #1's pattern |
| 4 | **P1** | `lib/mock-data.ts` | 11/17 categories empty; `product_count: 2` hardcoded | Medium — add products or derive count |
| 5 | **P1** | `StickyBottomBar.tsx:10-15`, `layout.tsx:81` | Unsanitized number; placeholder value; no settings wiring | Small |
| 6 | **P2** | product/category `page.tsx` OG | `og:image` wrong field, dims 800×600, no absolute-HTTPS guard | Small |
| 7 | **P2** | `Footer.tsx:37`, `Header.tsx:20-29` | Phone/hours/address/rating hardcoded, ignoring settings | Small |
| 8 | **P2** | `app/layout.tsx:88-91` | Customer chrome wraps `/admin/*` | Small — add `(public)/layout.tsx` |
| 9 | **P2** | admin share URLs, SearchBox copy | Bypass whatsapp helper; empty-state copy deviates | Trivial |
| — | P3 | (8 items listed above) | Type optimism, registry deviation, unused import, etc. | Trivial each |

---

## Recommended Fix Order

1. **Wire `getServer*` fetchers into public pages + sitemap + admin** (resolves #1 and #3 — the resilience layer is built, just never connected).
2. **Decide the real shop WhatsApp number**, update the single default in `lib/whatsapp.ts` and propagate (requires explicit confirmation — CRITICAL file per AGENTS.md §0.2).
3. **Fix mock data**: products for the 11 empty categories + derive `product_count` from data.
4. **Settings-driven shell**: StickyBottomBar, Footer, Header read from settings; add `formatWhatsAppNumber` in the bar.
5. **Layout split**: move public chrome to `app/(public)/layout.tsx`.
6. **OG hardening**: prefer `og_image_url`, absolute-HTTPS guard, correct 1200×630 dims.

Items 1, 3, 4, 5, 6 are safe to implement immediately. Item 2 awaits the owner's real number and explicit confirmation to touch `lib/whatsapp.ts`.

---

## Launch Blockers (from MILESTONES.md "Open Items", unchanged by this audit)

| Item | Status |
| :--- | :--- |
| Real WhatsApp / phone number | ⏳ Owner TBD — blocks fix #2 |
| Confirmed opening hours | ⏳ Owner TBD |
| Logo file | ⏳ Owner TBD (text wordmark in place) |
| Domain name | ⏳ Needed before WhatsApp unfurl testing (localhost/mock cannot trigger WhatsApp crawlers) |
| Real product photos | ⏳ Owner uploads via admin panel after M5 |
| "Rocking and Easy Chair" spelling | ⏳ Confirm before slug locks |
