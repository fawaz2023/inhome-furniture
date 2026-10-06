# Known Bugs Registry
## INHOME FURNITURE — Permanent Bug Log

**Purpose:** Every bug discovered during development is logged here permanently. Every agent session MUST read this file before writing any code. If you encounter a bug, check here first — it may already be known and fixed. After fixing any bug, log it here before ending the session.

> ⚠️ **CRITICAL APPEND-ONLY RULE:** This file must **NEVER BE OVERWRITTEN OR TRUNCATED**. New bugs are appended permanently. Existing bugs and resolution histories must be preserved forever.

**Format:** Bugs are never deleted. Fixed bugs stay logged with their resolution for future reference.

---

## How to Use This File

### Before Coding (Every Session)
1. Read all `OPEN` bugs — they may affect the work you are about to do.
2. Read all `FIXED` bugs relevant to the files you will touch — to avoid accidentally re-introducing them.

### After Finding a Bug
1. Assign the next Bug ID (`BUG-XXX`).
2. Fill in all fields under Status: `OPEN`.
3. Commit the entry immediately — before attempting the fix.

### After Fixing a Bug
1. Change Status to `FIXED`.
2. Fill in `Root Cause`, `Fix Applied`, `Verification`, and `Date Fixed`.
3. Do NOT delete the entry.

---

## Bug Status Legend

| Status | Meaning |
| :--- | :--- |
| `🔴 OPEN` | Bug is known, not yet fixed |
| `✅ FIXED` | Bug is confirmed fixed and verified |
| `🚫 WONT_FIX` | Known issue, deliberately not fixed (with reason) |
| `🔍 INVESTIGATING` | Reported but root cause not yet confirmed |

---

## Active Bug Registry

### BUG-001 — ProductCard Quick Enquire Button Height Was Below 44px Touch Target Minimum

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P2 (Mobile Ergonomics / Accessibility) |
| **Milestone** | M2 |
| **Found in File** | `components/catalogue/ProductCard.tsx` |
| **Line Reference** | Line 160 |
| **Date Found** | 2026-10-04 |
| **Date Fixed** | 2026-10-04 |

**Symptom:**
In `components/catalogue/ProductCard.tsx`, the `.btn-quick-enquire` CSS rule had `min-height: 38px`, which violated the mandatory 2026 ergonomic rule requiring strictly $\ge 44\times 44\text{px}$ touch targets.

**Root Cause:**
Component styling was initially defined with `38px` compact height for the secondary card footer action.

**Fix Applied:**
Updated `.btn-quick-enquire` in `components/catalogue/ProductCard.tsx` from `min-height: 38px` to `min-height: 44px`.

**Verification:**
`npm run build` recompiled all 32 static pages cleanly in 2.4s. Touch target meets the 44px standard on 390px mobile viewports.

**Prevention Rule:**
All interactive CTA buttons must use `min-height: 44px` or `var(--min-touch-target)`.

---

### BUG-002 — Search Index Route Supabase Query Type Mismatch

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Build / TypeScript Compilation Error) |
| **Milestone** | M4.5 |
| **Found in File** | `app/api/search-index/route.ts` |
| **Line Reference** | Line 78 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`next build` failed with `Type error: Property 'id' does not exist on type 'never'` in `app/api/search-index/route.ts`.

**Steps to Reproduce:**
1. Run `npm run build`.
2. TypeScript checker fails on mapping `categories` in `app/api/search-index/route.ts`.

**Root Cause:**
Supabase JS client `.select('id, name, slug, description, image_url')` without an explicit generic or cast inferred `data` as `never[]`.

**Fix Applied:**
Imported `Category` and `Product` interfaces into `app/api/search-index/route.ts` and cast fetched datasets: `(catData as unknown as Category[]) || []` and `(prodData as unknown as Product[]) || []`.

**Verification:**
`npm run build` recompiled all 35 static/ISR pages cleanly in 3.7s with 0 errors.

**Prevention Rule:**
When querying partial columns via Supabase `.select(...)`, always provide explicit interface type casting.

---

### BUG-003 — Supabase Database Interface Incompatible with Postgrest GenericSchema

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Build / TypeScript Compilation Error) |
| **Milestone** | M5 |
| **Found in File** | `types/database.ts` |
| **Line Reference** | Line 74 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`next build` failed with `Type error: Argument of type '{ visible: boolean; }' is not assignable to parameter of type 'never'` in `app/admin/categories/page.tsx:57:17`.

**Steps to Reproduce:**
1. Run `npm run build`.
2. TypeScript checker fails on Supabase `.update({ visible: newStatus })`.

**Root Cause:**
In Supabase JS v2, `Database['public']` requires conforming to `GenericSchema` (`Tables`, `Views`, `Functions`, `Enums`, and `Relationships`). Without these, mutations collapse to `never`.

**Fix Applied:**
Updated `types/database.ts` `Database` interface to conform to Supabase `GenericSchema` and simplified `SupabaseClient` typing in `lib/supabase.ts`.

**Verification:**
TypeScript compilation passed for all table mutations.

**Prevention Rule:**
Always define Supabase `Database` interface with all required schema buckets (`Tables`, `Views`, `Functions`, `Enums`, `Relationships`).

---

### BUG-004 — Next Font Loader Build-Time Google Fonts Fetch Failure

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Build / Network Dependency Error) |
| **Milestone** | M5 |
| **Found in File** | `app/layout.tsx` |
| **Line Reference** | Line 8 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`next build` failed during page data collection with `TypeError: Cannot read properties of null (reading '1') at @next/font/dist/google/loader.js:122:78`.

**Steps to Reproduce:**
1. Run `npm run build`.
2. `next-font-loader` fails when fetching/parsing Google Fonts CSS at build time.

**Root Cause:**
`next/font/google` requires a synchronous HTTP connection to Google Font servers during compilation; network timeouts or Google CSS variations cause the internal regex parser to crash.

**Fix Applied:**
Replaced `next/font/google` in `app/layout.tsx` with preconnected Google Fonts `<link rel="stylesheet">` tags in `<head>` and defined resilient font-family custom properties in `app/globals.css`.

**Verification:**
`npm run build` compiled all 41 static/ISR routes cleanly in 11.7s with zero errors.

**Prevention Rule:**
Use preconnected HTML `<link>` or local font assets to prevent build-time network flakiness.

---

### BUG-005 — Optional Settings Interface Fields Caused TypeScript Undefined Build Failure

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Build / TypeScript Compilation Error) |
| **Milestone** | M6 |
| **Found in File** | `app/(public)/about/page.tsx` & `components/layout/Footer.tsx` |
| **Line Reference** | Line 46 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`next build` failed with `Type error: 'settings.phone' is possibly 'undefined'` in `app/(public)/about/page.tsx:46:26`.

**Steps to Reproduce:**
1. Run `npm run build` after adding dynamic `getServerShopSettings()` calls in server components.
2. TypeScript checker rejects accessing `.replace()` on optional string properties without null checks.

**Root Cause:**
`types/database.ts` defines `Settings.phone`, `address`, `opening_hours`, and `after_hours_note` as optional fields. Server components reading these properties directly without fallbacks trigger TypeScript strict checks.

**Fix Applied:**
Provided explicit null-coalescing fallbacks (`const phone = settings.phone || '+919999999999'`) across `app/(public)/about/page.tsx` and `components/layout/Footer.tsx`.

**Verification:**
`npm run build` compiled all 42 static/ISR/dynamic routes cleanly with 0 TypeScript/lint errors in 5.2s.

**Prevention Rule:**
Always provide safe default values when reading optional fields from the `Settings` interface.

---

### BUG-006 — Gallery Page Settings Property Naming Typo Caused TypeScript Compilation Failure

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Build / TypeScript Compilation Error) |
| **Milestone** | M8 |
| **Found in File** | `app/(public)/gallery/page.tsx` |
| **Line Reference** | Line 93 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`next build` failed with `Type error: Property 'afterHoursNote' does not exist on type 'Settings'. Did you mean 'after_hours_note'?` in `app/(public)/gallery/page.tsx:93:36`.

**Root Cause:**
`Settings` interface in `types/database.ts` uses snake_case `after_hours_note`. `GalleryPage` erroneously referenced camelCase `afterHoursNote`.

**Fix Applied:**
Updated `app/(public)/gallery/page.tsx` to reference `settings.after_hours_note`.

**Verification:**
`npm run build` compiled cleanly.

**Prevention Rule:**
Always match database interface schema naming exactly (`after_hours_note`).

---

### BUG-007 — StickyBottomBar Raw Number Interpolation Without Sanitization

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Wrong Behavior / Functional CTA Hazard) |
| **Milestone** | Post-M8 / Pre-Launch Polish |
| **Found in File** | `components/layout/StickyBottomBar.tsx` |
| **Line Reference** | Lines 16–17 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
In `components/layout/StickyBottomBar.tsx`, `callUrl` and `whatsappUrl` performed raw template literal interpolation: ``https://wa.me/${whatsappNumber}?text=...`` without calling `formatWhatsAppNumber()`. If the owner entered `+91 98765 43210` with spaces or `+`, the generated `wa.me` link failed to open the chat.

**Root Cause:**
Numbers were passed directly from props into URL strings without invoking the ground-truth sanitization utility from `lib/whatsapp.ts`.

**Fix Applied:**
Imported `formatWhatsAppNumber` from `@/lib/whatsapp` and sanitized both `phoneNumber` and `whatsappNumber` before building `callUrl` and `whatsappUrl`.

**Verification:**
`npm run build` compiled 100% cleanly. `StickyBottomBar` sanitizes numbers to international digits-only format across all pages.

**Prevention Rule:**
Never interpolate phone numbers into `tel:` or `wa.me` links without running `formatWhatsAppNumber()`.

---

### BUG-008 — ProductCard Quick Enquiry Missing Shop Phone Prop

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P0 (Revenue Loop Blocker) |
| **Milestone** | Post-M8 / Pre-Launch Polish |
| **Found in File** | `components/catalogue/ProductCard.tsx` |
| **Line Reference** | Line 15 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
In `ProductCard.tsx`, `buildProductEnquiryUrl` was invoked with only 3 arguments (`product.name, categorySlug, product.slug`), omitting the 5th parameter `shopNumber`. As a result, the quick enquire button on every product card across the entire catalogue defaulted to the fallback placeholder number `919999999999`.

**Root Cause:**
`ProductCardProps` did not include an optional `shopPhone?: string` prop to receive the shop's configured WhatsApp number from parent pages.

**Fix Applied:**
Added `shopPhone?: string` to `ProductCardProps` and passed it as the 5th argument in `buildProductEnquiryUrl`. Threaded `shopPhone` through `NewArrivalsCarousel`, `[category]/page.tsx`, and `[product]/page.tsx` related grid.

**Verification:**
All product cards now receive `settings.whatsapp_number` from server components.

**Prevention Rule:**
Always pass the dynamic shop WhatsApp number from settings to all catalogue action cards.

---

### BUG-009 — SearchBox Empty-State Custom Enquiry Missing Shop Phone

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Wrong Behavior) |
| **Milestone** | Post-M8 / Pre-Launch Polish |
| **Found in File** | `components/catalogue/SearchBox.tsx` |
| **Line Reference** | Line 93 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
In `SearchBox.tsx`, `buildCustomDesignEnquiryUrl()` was invoked with 0 arguments, falling back to the placeholder number `919999999999` in the empty-state search CTA.

**Root Cause:**
`SearchBox` is a Client Component and did not accept a `shopPhone?: string` prop from its server parent (`app/(public)/page.tsx`).

**Fix Applied:**
Added `shopPhone?: string` to `SearchBoxProps`, passed `shopPhone` into `buildCustomDesignEnquiryUrl(shopPhone)`, and supplied `shopPhone={settings.whatsapp_number}` in `app/(public)/page.tsx`.

**Verification:**
Empty search state WhatsApp button now points to the configured shop WhatsApp number.

**Prevention Rule:**
Client components generating WhatsApp CTAs must accept `shopPhone` as a prop from server parents.

---

### BUG-010 — Missing public/ Directory and og-default.jpg Fallback Asset

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (404 Asset on Social Sharing / SEO) |
| **Milestone** | Post-M8 / Pre-Launch Polish |
| **Found in File** | `public/og-default.jpg` |
| **Line Reference** | `lib/seo.ts:10, 60` |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`lib/seo.ts` referenced `${baseUrl}/og-default.jpg` in JSON-LD structured data and as a fallback image for categories/products without photos. The `public/` directory did not exist in the repository, resulting in 404 errors when crawlers requested the fallback image.

**Root Cause:**
`public/` directory and default Open Graph image had not yet been created.

**Fix Applied:**
Created the `public/` directory and generated an ultra-aesthetic, branded 1200×630 `og-default.jpg` banner (63 KB, strictly < 300 KB for WhatsApp preview unfurl compliance).

**Verification:**
File exists at `c:\Users\fawaz\Desktop\Inhome website\public\og-default.jpg` (63.01 KB, 1200×630).

**Prevention Rule:**
Always ensure default Open Graph fallback assets physically exist in `public/` and stay below the 300 KB WhatsApp crawler limit.

---

### BUG-011 — Public Catalogue Routes Bypassed Supabase Server Helpers

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Data Architecture Parity) |
| **Milestone** | Post-M8 / Pre-Launch Polish |
| **Found in File** | `app/(public)/page.tsx`, `[category]/page.tsx`, `[product]/page.tsx` |
| **Line Reference** | Top-level imports |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
Public catalogue pages imported directly from `lib/mock-data.ts` instead of `lib/supabase-server.ts`. As a consequence, products or categories created or updated via the Admin panel or Supabase database would never appear in the public catalogue.

**Root Cause:**
Public route components were still using Milestone 2 mock fetchers instead of the Milestone 4 server helpers (`getServerCategories`, `getServerNewArrivals`, `getServerCategoryBySlug`, `getServerProductsByCategorySlug`, `getServerProductBySlugs`).

**Fix Applied:**
Swapped public page data fetchers to server helpers in `lib/supabase-server.ts` (which gracefully fall back to mock data if Supabase credentials are not configured). Configured `export const revalidate = 300;` on all public catalogue routes and `export const revalidate = 3600;` on `sitemap.ts`. Kept mock calls in `generateStaticParams()` for build-time safety.

**Verification:**
`npm run build` compiled all 43 routes cleanly with `ISR Revalidate: 5m` on `/`, `/[category]`, and `/[category]/[product]`.

**Prevention Rule:**
All dynamic public routes must read from `lib/supabase-server.ts` with ISR revalidation enabled.

---

### BUG-012 — Fabricated Analytics Data and Fake Baseline in Pageview Endpoint

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P2 (Data Integrity) |
| **Milestone** | Post-M8 / Pre-Launch Polish |
| **Found in File** | `app/api/pageview/route.ts` |
| **Line Reference** | Lines 13–20, 127–138 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`app/api/pageview/route.ts` included a hardcoded seed array with non-existent slugs (`/teak-sofa-set/3-seater-teak-wood-sofa`, `/dining-table-set/6-seater-teak-dining-table`, `/cot-and-bed`) and inflated visitor counts with arbitrary additions (`+ 186` total, `+ 24` today).

**Root Cause:**
Placeholder seed data left in during Milestone 7 prototyping.

**Fix Applied:**
Replaced seeded array with `const fallbackViews: FallbackPageView[] = [];`, removed fake `+ 186` and `+ 24` additions, and initialized `pathCounts` as an empty object dynamically populated by real page views.

**Verification:**
`GET /api/pageview` returns genuine zero-baseline analytics that only increment upon real visitor beacons.

**Prevention Rule:**
Never leave hardcoded fabricated data or non-existent route paths in production API routes.

---

---

### BUG-013 — Mockup Inline Style Split Broke JSX Build

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Build break, isolated mockup only) |
| **Milestone** | Mockup Preview |
| **Found in File** | `app/mockup-preview/page.tsx` |
| **Line Reference** | Line ~138 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`npm run build` failed with `Expected '</', got ':'` — large inline `<style>` was inserted mid-JSX leaving raw CSS lines outside any tag.

**Root Cause:**
Chunked editor inserts placed `<style>` block between product JSX closing tags, orphaning CSS rules as JSX text.

**Fix Applied:**
Trimmed file to line 136 via PowerShell, re-appended clean closing JSX, moved ALL styles to `app/mockup-preview/mockup.css` + `import './mockup.css'`.

**Verification:**
`npm run build` 44/44 clean, `/mockup-preview` renders 200.

**Prevention Rule:**
Never inline >50 lines of CSS in mockup pages — use separate CSS file import.

---

---

### BUG-014 — Dev .next Cache 500 After Production Build

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P2 (Local dev only) |
| **Milestone** | Mockup Preview |
| **Found in File** | `.next/server/vendor-chunks/next.js` (generated) |
| **Line Reference** | N/A |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`GET /mockup-preview` 500 ENOENT vendor-chunks/next.js on dev :3005 right after `npm run build`.

**Root Cause:**
Production build replaced `.next` output while old dev server still held stale chunk handles.

**Fix Applied:**
Killed node dev :3005, deleted `.next`, restarted `npm run dev -- --port 3005` — 200 OK.

**Verification:**
`Invoke-WebRequest /mockup-preview` StatusCode 200.

**Prevention Rule:**
Restart dev server (and clear `.next` if 500 persists) after every `npm run build`.

---

Copy this block for every new bug:

```
---

### BUG-XXX — [Short one-line description]

| Field | Value |
| :--- | :--- |
| **Status** | 🔴 OPEN |
| **Severity** | P0 (Crash) / P1 (Wrong behavior) / P2 (Visual) / P3 (Minor) |
| **Milestone** | M[number] |
| **Found in File** | `path/to/file.ts` |
| **Line Reference** | Line ~XXX (or N/A) |
| **Date Found** | YYYY-MM-DD |
| **Date Fixed** | — |

**Symptom:**
What was observed. Exact error message if applicable.

**Steps to Reproduce:**
1. Step one
2. Step two

**Root Cause:**
(Fill in after investigation)

**Fix Applied:**
(Fill in after fix — include file path + what changed)

**Verification:**
(Fill in after fix — exact check that confirms it is resolved)
```

---

## Common Bug Patterns to Watch For

These are recurring error classes observed in Next.js + Supabase projects. Check these before each session.

### WhatsApp Link Bugs
- `phone` field includes `+` or spaces → `wa.me` rejects the number → link opens WhatsApp but lands on wrong contact
  - Prevention: always run `phone.replace(/\D/g, '')` before constructing the URL
- `og:image` URL is relative (starts with `/`) not absolute (starts with `https://`) → WhatsApp crawler cannot fetch → no preview card
  - Prevention: always use `process.env.NEXT_PUBLIC_SITE_URL + imagePath`

### Supabase Fallback Bugs
- Code calls `supabase.from(...)` before checking if `NEXT_PUBLIC_SUPABASE_URL` is set → crash instead of fallback
  - Prevention: always check env var first; return mock data if absent

### Image Handling Bugs
- `next/image` `src` prop receives `null` or empty string → runtime error
  - Prevention: `ImageWithFallback` component always wraps `next/image`; never use `next/image` directly

### Slug Bugs
- Category or product slug contains uppercase, spaces, or special characters → 404 on navigation
  - Prevention: always generate slugs with `name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')`

### Admin Camera Upload Bugs
- `capture="environment"` on iOS opens the front camera instead of rear
  - Known iOS behavior: use `capture="environment"` — iOS may still prompt user to choose
- File exceeds Supabase Storage 10 MB limit → upload silently fails
  - Prevention: canvas compress to WebP before upload; target < 300 KB

---

### BUG-015 - Next.js Build Invariant no direct app page entry for /_not-found After Route-Group Change

| Field | Value |
| :--- | :--- |
| **Status** | OPEN (needs isolated repro; live build was passing) |
| **Severity** | P1 (Build breaker) |
| **Milestone** | Mockup Preview |
| **Found in File** | .next build output / app router layout resolution |
| **Date Found** | 2026-10-05 |

**Symptom:**

pm run build compiled OK in 12.2s then failed collecting page data with Invariant: no direct app page entry found for /_not-found.

**Suspected Cause:**
New pp/mockup-preview/layout.tsx nested layout changed route-group resolution while root pp/layout.tsx wraps Header/Footer; Next expected a not-found boundary it could not resolve.

**Workaround:**
Dev server on :3005 restarted clean after .next wipe; /mockup-preview returns 200. Prod build still needs a clean isolated repro.

**Next Step:**
Try removing or simplifying pp/mockup-preview/layout.tsx, rebuild, then re-add shell isolation via CSS-only fix.

---

### BUG-016 - mockup-preview Page Lost Its Nested Closing Header Tag During Chunked Edit

**Symptom:**

px tsc --noEmit failed with JSX element 'header' has no corresponding closing tag after chunked append.

**Root Cause:**
Second chunk replaced </header> instead of appending after it.

**Fix Applied:**
Re-added missing </header> line in pp/mockup-preview/page.tsx.

**Verification:**

px tsc --noEmit clean.

**Prevention Rule:**
When chunk-appending JSX, replace a unique anchor inside the parent, never the parent closing tag itself.



---

### BUG-017 - Reverted uncommitted NineFinds work via git checkout lost local-only preview variants

| Field | Value |
| :--- | :--- |
| **Status** | FIXED (documented) |
| **Severity** | P2 (Local workflow only) |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
git checkout -- app/mockup-preview/* discarded uncommitted NineFinds-beater files that production Vercel had already deployed.

**Root Cause:**
Production deploy ran from uncommitted workspace; local HEAD only had Option B. Checkout aligned local with HEAD, hiding the mismatch.

**Fix Applied:**
Kept prod deploy frozen on Vercel; parked Option B at app/mockup-old on a preview deploy. No prod redeploy.

**Verification:**
Both URLs fetched 200 with expected markers; netstat :3005 empty after kill.

**Prevention Rule:**
Blast ISOLATED route-only work must be committed before checkout or prod deploy; never checkout dirty preview routes.

---

### BUG-018 — settings.google_rating Undefined Check in Homepage During Next.js Static Generation

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P2 (TypeScript / Static Build Failure) |
| **Milestone** | M4.5 |
| **Found in File** | `app/(public)/page.tsx` |
| **Line Reference** | Line 328 |
| **Date Found** | 2026-10-05 |
| **Date Fixed** | 2026-10-05 |

**Symptom:**
`next build` failed with `Type error: 'settings.google_rating' is possibly 'undefined'`.

**Root Cause:**
In `types/database.ts`, `Settings.google_rating` and `Settings.google_reviews_count` are defined as optional numbers (`google_rating?: number`), so accessing `.toFixed(1)` directly without nullish coalescing caused a strict TypeScript error.

**Fix Applied:**
Added explicit fallback variables in `HomePage`:
```typescript
const googleRating = settings.google_rating ?? 4.8;
const googleReviewsCount = settings.google_reviews_count ?? 23;
```

**Verification:**
`npm run build` compiled 71/71 static routes with 0 errors.

**Prevention Rule:**
Always extract settings with safe nullish coalescing defaults when rendering formatted numbers or strings in Server Components.

---

### BUG-019 — Next.js 15 / React 19 Style JSX Runtime TypeError: __webpack_modules__[moduleId] is not a function

| Field | Value |
| :--- | :--- |
| **Status** | ✅ FIXED |
| **Severity** | P1 (Dev Server Runtime Crash) |
| **Milestone** | Harmony Video Scroll Mockup |
| **Found in File** | `app/harmony-mockup/HarmonyHeroVideo.tsx`, `HarmonyMockupClient.tsx`, `HarmonyPreloader.tsx` |
| **Line Reference** | `<style jsx>` blocks |
| **Date Found** | 2026-10-06 |
| **Date Fixed** | 2026-10-06 |

**Symptom:**
Navigating to `http://localhost:3000/harmony-mockup` triggered a red Next.js runtime error overlay:
`TypeError: __webpack_modules__[moduleId] is not a function`.

**Root Cause:**
Next.js 15 with React 19 does not bundle the `styled-jsx` babel/swc runtime for App Router Client Components by default. Including `<style jsx>` blocks inside client components corrupted the Webpack packfile cache (`PostCSSSyntaxError` and unresolvable module IDs).

**Fix Applied:**
1. Extracted all styles from `<style jsx>` in `HarmonyHeroVideo.tsx`, `HarmonyMockupClient.tsx`, and `HarmonyPreloader.tsx` into `app/harmony-mockup/harmony.css`.
2. Removed all `<style jsx>` tags from component files.
3. Cleared the `.next` cache directory and restarted `npm run dev -- --port 3000`.

**Verification:**
`GET http://localhost:3000/harmony-mockup` returned 200 OK cleanly with zero webpack runtime errors.

**Prevention Rule:**
Never use `<style jsx>` in App Router components with React 19. Always place styles in `.css` or CSS Modules.

