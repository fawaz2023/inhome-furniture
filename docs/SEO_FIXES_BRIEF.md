# SEO Fix-Pack — Implementation Prompt for Gemini
## INHOME FURNITURE — `inhomefurniture.in` (Next.js 15 App Router + Supabase)

**Purpose:** Paste this entire document into Gemini as the task brief. It contains the audit findings, exact file paths, root causes, and acceptance criteria for every required change. Do not invent scope beyond this list.

---

## 0. Context You Must Read First

Before writing any code, read these files (they are the source of truth):

1. `AGENTS.md` — project rules. Key constraints:
   - **P0 IMMUTABLE:** `lib/whatsapp.ts` must never be touched.
   - **Copy governance:** never say "Made in our workshop" / "our craftsmen". Always "custom-crafted to order", "made to your specifications".
   - Brand is always **INHOME FURNITURE** (one word, caps).
   - Append-only rule: `docs/KNOWN_BUGS.md` and `docs/SESSION_HANDOFF.md` are permanent journals — only append.
2. `docs/SEO_PLAN.md` — the SEO strategy this fix-pack implements.
3. `docs/SESSION_HANDOFF.md` — top entry describes the current live state.

**Current deployment:** Vercel — production alias `https://inhome-furniture-ebon.vercel.app`. Custom domain `inhomefurniture.in` is planned but not yet attached.

**Build gate:** after every change, run `npm run build` — it must compile all routes with 0 TypeScript/lint errors. Last known green: 69 static/ISR pages.

---

## 1. Task List (Ordered by Priority)

### TASK 1 — Make the Home page OG image absolute (P0)

**Goal:** `/` is the highest-traffic WhatsApp share URL. Its OG image must be an absolute HTTPS URL, never relative.

**Proof of problem:**
- `app/(public)/page.tsx` lines 24–31: `images: [{ url: '/og-default.jpg', ... }]`
- `app/layout.tsx` line 38: `url: '/og-default.jpg'` and line 49: `twitter.images: ['/og-default.jpg']`

**Change:**
- In `app/(public)/page.tsx`, compute `const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in';` and use `url: \`${baseUrl}/og-default.jpg\``.
- In `app/layout.tsx`, do the same for both `openGraph.images[0].url` and `twitter.images[0]`.
- Do not change dimensions (1200×630), alt text, or any other metadata.

**Verification:** `npm run build` clean; rendered HTML of `/` contains `<meta property="og:image" content="https://...">` (absolute).

---

### TASK 2 — Self-host the About & Gallery OG images (P1)

**Goal:** Remove all hotlinked Unsplash OG images. Slow third-party crawlers and broken previews are unacceptable.

**Proof of problem:**
- `app/(public)/about/page.tsx` line 35: `url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?...'`
- `app/(public)/gallery/page.tsx` lines 22 & 35: same Unsplash URL.

**Change:**
1. Download one suitable furniture showroom image (use an existing asset from `public/` if one exists, or generate/serve a branded 1200×630 banner as `public/og-about.jpg` and `public/og-gallery.jpg` — you may reuse `public/og-default.jpg` as the interim fallback for both).
2. Replace the Unsplash URLs with absolute `${baseUrl}/og-about.jpg` and `${baseUrl}/og-gallery.jpg`.
3. Every OG image must be: self-hosted, absolute HTTPS, 1200×630, **under 300 KB** (WhatsApp strict limit).
4. Also update the `twitter.images` in `gallery/page.tsx` (line 35) the same way.

**Verification:** `Get-Item public/og-*.jpg` shows each file < 307200 bytes; build clean; no `images.unsplash.com` string remains in any `app/**/page.tsx` metadata block (page body images are unaffected by this task).

---

### TASK 3 — De-hardcode the JSON-LD telephone (P1)

**Goal:** `FurnitureStore` schema must not ship the placeholder number `+919999999999` to Google once the real number arrives.

**Proof of problem:** `lib/seo.ts` line 13: `telephone: '+919999999999'` (hardcoded).

**Change:**
1. In `lib/seo.ts`, change `getFurnitureStoreSchema()` to accept an optional parameter: `getFurnitureStoreSchema(telephone?: string)`.
2. Phone resolution order: argument → `process.env.NEXT_PUBLIC_SHOP_PHONE` → omit the `telephone` key entirely (do NOT emit a placeholder).
3. In `app/layout.tsx` line 68 (`const storeSchema = getFurnitureStoreSchema();`), the layout is currently a sync Server Component. Make it `async`, fetch settings via `getServerShopSettings()` from `lib/supabase-server.ts`, and pass `settings.phone` into `getFurnitureStoreSchema(settings.phone)`. Wrap in try/catch so a settings failure never breaks the layout — on error, call with no argument.
4. Keep every other schema field byte-identical (address, geo, hours, rating).

**Verification:** build clean; view-source of `/` shows either the real phone or no `telephone` key — never `9999999999`.

---

### TASK 4 — Align category title templates with the SEO plan (P1)

**Goal:** Category `<title>` must match the plan's SERP-optimized template and stay under ~60 characters to avoid truncation.

**Proof of problem:** `app/(public)/[category]/page.tsx` line 45 produces `"Sofas | Custom Furniture Catalogue | INHOME FURNITURE Kangeyam"` (≈62+ chars, truncates).

**Change:**
- Replace with the plan's Section 4.2 template: \`${category.name} in Kangeyam | Custom Wooden Designs | INHOME\`.
- Keep `description`, `canonical`, OG, and Twitter blocks unchanged.
- If a category name is very long (> 25 chars), fall back to \`${category.name} | INHOME FURNITURE Kangeyam\`.

**Verification:** build clean; rendered `<title>` for `/sofa` (or first category) is ≤ 60 characters.

---

### TASK 5 — Verify sitemap `lastModified` is real (P2)

**Goal:** Google deprioritizes sitemaps with fake/stale dates.

**Change:** In `app/sitemap.ts`:
- Static routes: omit `lastModified` rather than hardcoding a date.
- Category routes: use `category.updated_at` if the field exists; otherwise omit.
- Product routes: use `product.updated_at` if available; otherwise omit.
- Keep `revalidate = 3600`.

**Verification:** `GET /sitemap.xml` on a local production build (`npm run build && npm start`) returns valid XML; `<lastmod>` values reflect DB timestamps or are absent — never a hardcoded past date.

---

### TASK 6 — Title-template consistency on root layout (P2)

**Goal:** The plan specifies a title `template: '%s | INHOME FURNITURE Kangeyam'` so child pages that set only a `title` string inherit branding.

**Change:** In `app/layout.tsx` convert `metadata.title` (line 14) from a string to:
```ts
title: {
  default: 'INHOME FURNITURE | Custom Furniture Showcase | Kangeyam, Tamil Nadu',
  template: '%s | INHOME FURNITURE Kangeyam',
},
```
No other metadata changes.

**Verification:** build clean; a page that sets `metadata.title` as a plain string renders with the template suffix.

---

## 2. Explicitly Out of Scope

- `lib/whatsapp.ts` — do not open it.
- Domain attachment (Vercel dashboard task — owner action, not code).
- Google Search Console verification token (owner action; code already supports `NEXT_PUBLIC_GSC_VERIFICATION`).
- Google Business Profile / reviews (off-site work).
- New landing pages for Tirupur/Erode (Phase 2 content work — separate brief).
- Any visual/layout/design changes. These are metadata-only edits.

---

## 3. Change Discipline

- **Minimal diffs.** Edit only the lines listed per task. No refactors, no reformatting, no dependency changes.
- **Blast radius:** Tasks 1, 3, 6 touch `app/layout.tsx` (BROADCAST — every page inherits it). Verify a full clean build after those tasks.
- **Append-only journals:** after completing all tasks, append a session entry to `docs/SESSION_HANDOFF.md` (most recent first, using the existing entry template) listing every file modified with `[MODIFY]` prefixes. If any bug is found, log it in `docs/KNOWN_BUGS.md` before fixing.
- Do not commit or push unless the user explicitly asks.

---

## 4. Final Acceptance Checklist

- [ ] `npm run build` — 0 errors, all routes compile.
- [ ] `/` HTML: `og:image` is absolute HTTPS.
- [ ] No `images.unsplash.com` in any metadata block.
- [ ] JSON-LD on `/`: no `+919999999999`.
- [ ] `/sofa`-style category title ≤ 60 chars.
- [ ] `/sitemap.xml`: no hardcoded `lastmod`.
- [ ] No visual regressions (spot-check `/`, `/about`, `/gallery` at 390px and 1440px).
- [ ] `docs/SESSION_HANDOFF.md` updated with the session entry.
