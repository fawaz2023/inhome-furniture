# AGENTS.md — Development Guidelines & Workspace Rules
## INHOME FURNITURE — Next.js Catalogue & WhatsApp Enquiry System

This document is the **Single Source of Truth** for any AI agent or developer building, modifying, or auditing code in this repository. Follow all rules strictly.

---

## 0. Mandatory Pre-Flight & Context Engineering Protocols

Every agent session MUST execute these protocols before modifying any code:

### 0.1 Pre-Flight Sequence (Every Session)
1. **Read `docs/KNOWN_BUGS.md`**: Check for active bugs, known regression hazards, or previous fixes in the target module. NEVER repeat a known mistake.
2. **Read `docs/SESSION_HANDOFF.md`**: Pick up the exact current state, active milestone task, and notes from the prior agent session.
3. **Bug & Handoff Logging Duty (STRICT APPEND-ONLY RULE)**:
   - ⚠️ **NEVER OVERWRITE OR WIPE**: `docs/KNOWN_BUGS.md` and `docs/SESSION_HANDOFF.md` are permanent journals. Never overwrite, truncate, or delete historical records.
   - **When fixing any bug**: Append the new bug record to `docs/KNOWN_BUGS.md` with Root Cause, Solution, and Prevention rule.
   - **At the end of every work session**: Append/prepend the new session log to `docs/SESSION_HANDOFF.md` while strictly preserving all prior session entries.

### 0.2 `fix_before_touch` Blast Radius Protocol
Before editing any file, classify the change's blast radius:
- `ISOLATED`: Component-internal logic; exported signatures unchanged.
- `LOCAL`: 1–2 pages in the same route group.
- `BROADCAST`: Shared UI atom (`components/ui/*`), layout shell (`Header`, `Footer`, `StickyBottomBar`), global tokens (`app/globals.css`), or database models (`types/database.ts`). All consumers must remain functional.
- `CRITICAL`: `lib/whatsapp.ts` (Ground Truth link builder), `lib/mock-data.ts` (Resilient seed data), `supabase/schema.sql` (Database DDL & RLS), and `app/admin/layout.tsx` (Admin auth guard). **Requires explicit user confirmation before writing code.**

### 0.3 Hypothesis Rule
Before writing or modifying code, formulate:
1. **Goal / Symptom**: What is being changed or fixed.
2. **Proof**: Exact file and line number proving the cause or insertion point.
3. **Verification**: How it will be tested empirically (Next.js build, viewport check, or WhatsApp unfurl validation).

### 0.4 Doc Map (Retrieval Pointers)
Consult these governing documents BEFORE touching specific areas:
- **WhatsApp Link Generation / Messages** $\to$ Read Section 4 & `lib/whatsapp.ts`
- **UI Copy & Branding** $\to$ Read Section 1.1 Copy Governance Table
- **Layout Shell & Global Components** $\to$ Read Section 3, Section 5.1 & `app/globals.css`
- **Database Schema, RLS & Storage** $\to$ Read `docs/DATA_MODEL.md` & `types/database.ts`
- **Milestone Tasks & Phasing** $\to$ Read `docs/MILESTONES.md`

---

## 1. Project Overview & Non-Negotiables

- **Brand:** INHOME FURNITURE (One word, Kangeyam, Tamil Nadu)
- **Primary Goal:** Mobile-first design showcase where customers browse categories/products and tap a WhatsApp button to send a message containing the product link.
- **Critical Flow:** The product link in the WhatsApp message triggers an **Open Graph link preview card** (with the product's image and name) in the shop owner's chat.
- **Catalogue Only:** No shopping cart, no checkout, no user accounts for customers, no payment gateways.
- **Data-Driven:** **NEVER hardcode category or product names in UI components.** All items must be fetched from the database (or the mock seed fallback during development). Adding a category or product must never require code changes.
- **Admin Panel:** Must be fully responsive and optimized for one-handed smartphone use by the shop owner on the showroom floor. **Single admin login — owner only.** No staff accounts.
- **Primary Traffic Sources:** (1) Owner shares catalogue link directly to customers on WhatsApp. (2) Instagram bio link for new visitors. SEO is a secondary goal, not the primary acquisition channel.
- **No Workshop Claims:** INHOME FURNITURE is a custom-furniture retailer and design consultant. Production is managed via a separate partner entity. **Never use "Made in our workshop", "Kangeyam Workshop Made", or "our craftsmen".** Use: *"custom-crafted to order"*, *"made to your specifications"*, *"custom-made furniture"*.
- **Gallery is Not v1:** The Gallery page (`/gallery`) is planned but not required for the initial public launch. Categories + Products + About + Admin are the v1 scope.

### 1.1 Copy & Terminology Governance

Agents MUST strictly adhere to approved terminology in all UI copy, metadata, and labels:

| Forbidden Term / Phrasing | Mandatory Approved Replacement | Rationale |
| :--- | :--- | :--- |
| ❌ "Made in our workshop" / "Kangeyam Workshop Made" | ✅ *"custom-crafted to order"* / *"made to your specifications"* | Manufacturing is via separate partner entity |
| ❌ "Our craftsmen" / "Our factory" | ✅ *"expert artisans"* / *"custom furniture specialists"* | Accurate representation of retail & design consultancy |
| ❌ "Add to Cart" / "Checkout" / "Buy Now" | ✅ *"Enquire on WhatsApp"* / *"Customise Size or Wood"* | Pure catalogue enquiry model |
| ❌ "In Home" / "Inhome" / "In-Home" | ✅ *"INHOME FURNITURE"* (one word, capital letters) | Official registered branding |
| ❌ Prices in headers or cart icons | ✅ Omit / *"Quote on WhatsApp"* | Custom pricing depends on wood and dimensions |

---

## 2. Technology Stack & Core Tools

| Layer | Technology | Rules & Standards |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15+ (App Router)** | Use Server Components for public catalogue pages; Client Components (`'use client'`) only for interactive elements (search, filters, modals, admin forms). |
| **Language** | **TypeScript** | Strict mode enabled. No `any` types; all database models typed in `types/database.ts`. |
| **Database & Auth** | **Supabase** | PostgreSQL with Row-Level Security (RLS) enabled. Public read for visible products, authenticated write for admin. |
| **Media Storage** | **Supabase Storage** | Bucket: `catalogue-images` (public read, auth write). Images compressed client-side before upload. |
| **Styling** | **Modern Vanilla CSS / CSS Modules** | Curated CSS custom properties (design tokens in `app/globals.css`). Zero generic defaults. Responsive down to 360px. |
| **Icons** | **Lucide Icons** (`lucide-react`) | Consistent stroke width (1.75px or 2px). Consistent icon family throughout. |

---

## 3. Design System & Aesthetics (2026 Standards)

Following the `fz-uidesigner` guidelines:

### 3.1 Color Palette
- **Background Main:** `#FAF8F5` (Soft warm stone/sand)
- **Surface / Card:** `#FFFFFF` (Crisp elevated white with subtle border)
- **Surface Secondary:** `#F3EFEA` (Warm tinted stone)
- **Text Primary:** `#1C1917` (Deep warm charcoal / stone-900)
- **Text Muted:** `#78716C` (Warm stone-500)
- **Accent Primary (Teak Timber):** `#8B5A2B` (Refined rich teak wood tone)
- **Accent Hover:** `#6E4520` (Deep timber)
- **WhatsApp Green:** `#25D366` (Universal WhatsApp action color)
- **Ready Stock Badge:** Background `#ECFDF5`, Text `#047857`, Border `#A7F3D0`
- **Made to Order Badge:** Background `#FEF3C7`, Text `#92400E`, Border `#FDE68A`
- **Border Subtle:** `#E7E2DA`

### 3.2 Spacing & Typography
- **Scale:** 8px rhythm (`4px`, `8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- **Typography:** Modern Google Font (e.g., `Plus Jakarta Sans` or `Outfit` for confident headlines; `Inter` for clean body readability).
- **Headlines:** Confident, tight line-height (`1.15` to `1.25`).
- **Body Copy:** Relaxed, readable line-height (`1.5` to `1.6`).

### 3.3 Mobile & Ergonomic Rules
- **Minimum Touch Target:** Strictly **44×44px** (preferably 48px) for all buttons, pills, category cards, and navigation links.
- **Safe Area Insets:** Always support `env(safe-area-inset-bottom)` and `env(safe-area-inset-top)` for sticky bars, drawers, and modal sheets.
- **Sticky Bottom Action Bar:** Persistent on all customer-facing pages:
  - **Call:** `tel:+91...`
  - **WhatsApp:** `https://wa.me/...`
  - **Directions:** Google Maps deep link
- **Grid Layout:** 2 columns on mobile (`minmax(0, 1fr)`), fixed aspect ratio images (`4:3` or `1:1`), titles clamped to 2 lines max with optical height balance (`min-height: 2.75rem`).
- **Zero Horizontal Overflow:** Never allow accidental horizontal scrolling (`overflow-x: hidden` on viewport roots).

---

## 4. WhatsApp Product Link Generation Rules

Located in `lib/whatsapp.ts`.

> ⚠️ **P0 IMMUTABLE GROUND TRUTH:** Any implementation or modification that deviates from these exact sanitization rules or message templates is considered a **P0 parity bug**. Do not "refactor", "improve", or modify these templates unless explicitly instructed with an updated specification.

### 4.1 Number Formatting
Always sanitize shop phone numbers to international format with country code 91, digits only, no spaces, dashes, or plus signs:
```typescript
export function formatWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}
```

### 4.2 Link Construction
```typescript
export function buildProductEnquiryUrl(
  productName: string,
  categorySlug: string,
  productSlug: string,
  variant: 'standard' | 'customise' = 'standard',
  shopNumber: string = '919876543210'
): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in';
  const productUrl = `${baseUrl}/${categorySlug}/${productSlug}`;
  
  const message = variant === 'customise'
    ? `Hi INHOME Furniture, I'd like to customise this ${productName} (size/wood): ${productUrl}. Please share details.`
    : `Hi INHOME Furniture, I like this ${productName}: ${productUrl}. Please share details.`;

  return `https://wa.me/${formatWhatsAppNumber(shopNumber)}?text=${encodeURIComponent(message)}`;
}
```

### 4.3 Open Graph Requirements
Every category and product page must define complete Open Graph tags in `generateMetadata()`. The `og:image` must be an **absolute HTTPS URL** and under **300 KB** to guarantee WhatsApp crawlers cache and unfurl the preview card.

---

## 5. Folder & Architecture Structure

```text
├── app/
│   ├── (public)/
│   │   ├── layout.tsx                # Public layout with Header, Footer & Sticky Bottom Bar
│   │   ├── page.tsx                  # Home: Hero, How It Works, Category Grid, New Arrivals
│   │   ├── gallery/
│   │   │   └── page.tsx              # Gallery: Showroom, Workshop, Custom Work
│   │   ├── about/
│   │   │   └── page.tsx              # About, Workshop, Google 4.8 Rating, Map Directions
│   │   ├── [category]/
│   │   │   ├── page.tsx              # Category detail & product grid
│   │   │   └── [product]/
│   │   │       └── page.tsx          # Product detail with dual WhatsApp CTAs & OG tags
│   ├── admin/
│   │   ├── layout.tsx                # Admin layout with auth guard & mobile navbar
│   │   ├── page.tsx                  # Dashboard overview & quick actions
│   │   ├── login/
│   │   │   └── page.tsx              # Supabase Auth login
│   │   ├── products/
│   │   │   ├── page.tsx              # List products with WhatsApp Share & toggle switches
│   │   │   ├── new/page.tsx          # Add product form (camera capture + upload)
│   │   │   └── [id]/page.tsx         # Edit product form
│   │   ├── categories/
│   │   │   └── page.tsx              # Reorder, add, or toggle categories
│   │   └── gallery/
│   │       └── page.tsx              # Upload & tag showroom photos
│   ├── api/
│   │   └── keep-alive/
│   │       └── route.ts              # Keep-alive database ping endpoint
│   ├── globals.css                   # Global design tokens and resets
│   ├── layout.tsx                    # Root HTML layout with Google Fonts & MetaBase
│   ├── robots.ts                     # Search engine crawler directives
│   └── sitemap.ts                    # Dynamic XML sitemap generator
├── components/
│   ├── ui/                           # Button, Badge, Card, Modal, Input, Spinner
│   ├── layout/                       # Header, Footer, StickyBottomBar, Breadcrumb
│   ├── catalogue/                    # CategoryCard, ProductCard, WhatsAppCTA, HowItWorksStrip
│   └── admin/                        # ImageUploader, ProductRow, ShareModal
├── lib/
│   ├── supabase.ts                   # Client-side Supabase instance
│   ├── supabase-server.ts            # Server-side Supabase instance (SSR / Server Actions)
│   ├── whatsapp.ts                   # Link generation & phone sanitization
│   ├── mock-data.ts                  # Resilient fallback seed data (17 categories + sample products)
│   └── seo.ts                        # Metadata & JSON-LD helpers
├── types/
│   └── database.ts                   # TypeScript interfaces for Supabase tables
└── docs/                             # PRD, Data Model, SEO Plan, Milestones
```

### 5.1 Component Registry & Anti-Duplication Rule

To prevent codebase bloat, parallel versions, or orphaned components (the exact failure mode of the trading dashboard):
- **Layout Shell:** Exactly ONE `Header.tsx`, ONE `Footer.tsx`, ONE `StickyBottomBar.tsx` in `components/layout/`.
- **Catalogue Elements:** Exactly ONE `CategoryCard.tsx`, ONE `ProductCard.tsx`, ONE `HowItWorksStrip.tsx`, ONE `NewArrivalsCarousel.tsx` in `components/catalogue/`.
- **Admin Elements:** Exactly ONE `ImageUploader.tsx`, ONE `ProductRow.tsx` in `components/admin/`.
- **UI Atoms:** Exactly ONE `Button.tsx`, ONE `Badge.tsx`, ONE `Card.tsx` in `components/ui/`.

> 🚫 **STRICT RULE:** Never duplicate an app shell or create versioned files (`Header2.tsx`, `PageV2.tsx`, `AppShellOld.tsx`). Always modify the existing component in place.

---

## 6. Resilience & Graceful Fallback Rule

If Supabase credentials are not yet configured in `.env.local` or if the remote Supabase project is paused:
1. `lib/supabase.ts` and `lib/supabase-server.ts` must detect the missing or failing connection.
2. They must **automatically fall back to `lib/mock-data.ts`** without crashing the application.
3. The public catalogue must still render smoothly with mock categories and products so that developers, stakeholders, and visitors can browse and preview the full UX immediately.
4. The Admin panel will show a gentle banner: *"Running in Local Mock Mode. Connect Supabase credentials to enable persistent database storage."*

---

## 7. Supabase Free Tier Keep-Alive Endpoint

In `app/api/keep-alive/route.ts`:
- Accepts `GET` request.
- Verifies `CRON_SECRET` header or query parameter if configured.
- Executes `SELECT COUNT(*) FROM categories`.
- Returns `{ success: true, timestamp: string, count: number, latencyMs: number }`.
- Scheduled via GitHub Actions (`.github/workflows/keep-alive.yml`) to ping every 3 days.

---

## 8. Anti-Patterns to Avoid

- ❌ Never add shopping cart buttons, prices in headers, or checkout forms.
- ❌ Never place interactive tap targets closer than 8px together.
- ❌ Never allow images to stretch or distort; always use `aspect-ratio` with `object-fit: cover`.
- ❌ Never use raw un-optimized images over 500 KB for WhatsApp Open Graph tags.
- ❌ Never make the admin panel require a desktop monitor; test every admin form at 390px mobile width.
- ❌ Never store or serve original phone camera photos to customers. Every image upload MUST produce two separate compressed outputs: **display version** (long edge ≤ 1600px, WebP, stored as `image_url`) and **OG preview version** (1200×630, WebP, strictly < 300 KB, stored as `og_image_url`).
- ❌ Never allow an admin image upload to complete without showing the resulting file size for both outputs in the UI. If the compressed OG output still exceeds 300 KB, reject the upload with a clear error message.

---

## 9. "Do Not Touch" Core Architecture Rules

1. **WhatsApp Link Sanitation Ground Truth (`lib/whatsapp.ts`)**:
   - Phone sanitization MUST enforce `91` country code + 10 digits with zero spaces or `+`.
   - Dynamic message building MUST generate absolute HTTPS product URLs for OG card unfurls.
2. **Resilient Seed Data Fallback (`lib/mock-data.ts`)**:
   - The app shell MUST render gracefully using `lib/mock-data.ts` if Supabase environment variables are absent or connection fails.
3. **Copy & Terminology Governance**:
   - NEVER use workshop ownership claims (*"Made in our Kangeyam workshop"* or *"our craftsmen"*). ALWAYS use *"custom-crafted to order"*, *"made to your specifications"*, or *"custom-made furniture"*.

---

## 10. Search & After-Hours Note Governance

### 10.1 Client-Side Search Rules
- The search index endpoint (`app/api/search-index/route.ts`) must **never** include hidden or soft-deleted products. Filter by `is_visible = true` and `deleted_at IS NULL`.
- The index is cached at build time / on-demand revalidation. Never make a real-time Supabase query on every keystroke.
- The search box must **lazy-load** the index (fetch only when the input is first focused). Keep initial page payload lean for slow phones.
- Empty-state message: *"No match. Browse categories or ask us on WhatsApp"* — always include a WhatsApp button.
- The `keywords` field on products is optional and admin-editable. Matching is case-insensitive "contains" on name, category, and keywords.

### 10.2 After-Hours Note Rules
- The after-hours note near WhatsApp buttons is **UI-only** — it is a plain text label rendered beside the button, never embedded in the WhatsApp URL or pre-filled message.
- The note text is always read from `settings.after_hours_note` in the database (or mock settings). **Never hardcode** the note or the hours in a component.
- **Do NOT modify `lib/whatsapp.ts`** for this feature. The P0 ground truth WhatsApp message is immutable.
- If `settings.after_hours_note` is null or empty, the note label is simply not rendered — no fallback hardcoded string.

