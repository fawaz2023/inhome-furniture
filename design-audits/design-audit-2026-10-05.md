# Design Audit — INHOME Mockup Preview (Option B)
**Skill:** `fz-uidesigner` (Antigravity global) · **Mode:** Audit (report only, no code changed)
**Target:** http://localhost:3005/mockup-preview · **Source:** `app/mockup-preview/page.tsx` (147 lines), `app/mockup-preview/mockup.css` (74 lines)
**Date:** 2026-10-05 · **Route status:** 200 OK · **Build:** 44/44 clean
**Screenshots:** No browser-automation tool in this workspace — breakpoints judged from code (per skill fallback).

## Step 1 — Breakpoint walkthrough (code-based)
- **390px mobile:** Trustbar wraps to 2–3 lines; hero stacks copy → 300px collage; CTAs full-width; cat grid 2-col; product mock stacks gallery → info; dual CTAs full-width 52px. Real fixed Header + StickyBottomBar frame the page (root layout) AND a static sticky-mock card renders inline — two sticky visuals.
- **360px glance:** Same stack; 130×100 collage thumb + left float chip get tight; pills wrap to 2 rows.
- **768px tablet:** Hero 2-col (copy/media) engages; prod-grid2 2-col; cat grid stays 2-col (large cards, sparse).
- **1440px desktop:** 1120px container; H1 `<br>` forces a narrow 2-line headline inside a wide column; cat grid still 2-col — very sparse; hero collage 380px vs copy balances okay.
- **1920px glance:** Container caps at 1120px, no edge stretch. Fine.

## Step 2 — "Something Feels Off" checklist
- **Rhythm:** Mostly 8px-grid, but hero padding is 22.4px (`1.4rem`), H1 margin 12.8px (`.8rem`) — off-beat vs 24/16 elsewhere. Chapter-label pills + topbar scaffolding bump the eye between chapters.
- **Optical balance:** Collage overlap (main inset right 20px + 170×130 thumb + two float chips) is busy at 360px; float-bottom sits 44px above media base, visually floating unanchored.
- **Contrast (3 types):** Text — muted `#78716C` on stone ≈ 4.1:1, under 4.5 for small text; white on WhatsApp `#25D366` ≈ 2.1:1, fails. Element — green CTA separates strongly; cards separate from canvas well. Section — catmock/prodmock white cards on stone read clearly; black strip + black custom card are two heavy dark blocks close together (strip → arrivals → cats → custom card) creating a zebra rhythm.
- **Accidental tension:** `mk-pill` black scaffolding vs live pill styles = two black-pill languages; eyebrow 11.5px vs float-sub 11.2px vs sec-cap 13.8px — three near-sizes.
- **Brand coherence:** Strong — teak/stone, Jakarta+Inter, Lucide-only icons, no emojis (✦/⌕/→/› are typographic glyphs, acceptable). Reads bespoke, not template.
- **Eye path:** Trustbar → eyebrow → H1 → green CTA is clean on mobile. Desktop: eye hits the forced `<br>` headline gap, then drifts across sparse 2-col grid (dead zone).
- **Gravity well:** Duplicate sticky bars (fixed real + static mock) pull attention at page bottom; chapter scaffolding pills compete with product content.

## Step 3 — Mobile checks (390px)
- Safe areas: mock sticky is static (no inset needed); real fixed bar handles insets. No notch clipping in mock content.
- Touch: all CTAs ≥48px; pills 44px; no <44 tappers. Gaps ≥8px.
- No horizontal overflow by construction (`overflow-x:hidden` on `.mk-wrap` + globals).
- Real flags: static search-mock looks focusable but isn't (keyboard dead end); pills look tappable but are spans; trustbar 3-line wrap pushes H1 below fold on short screens.


## Step 4 — Desktop checks (1440px)
- Container capped 1120px — no edge stretch. Good.
- Hover states: live cards lift; mock-only elements (search-mock, pills, sticky-mock spans) have zero hover — feel dead next to live atoms.
- H1 forced `<br>` leaves a ragged narrow column on wide screens; remove break, let clamp wrap.
- Cat grid 2-col at desktop wastes 1120px; should go 4-col per live system.
- Hover elevation consistent on live atoms; mock blocks flat — scaffolding inconsistency, must not ship.

## Step 5 — Design area checks
1. **Whitespace:** Hero inner 22px vs card paddings 22–35px vs gaps 16–32px — unify to 16/24/32.
2. **Hierarchy:** One H1 (`page.tsx:55`), six H2s — correct. But three chapter scaffolds shout equally; product name vs category H2 identical size flattens detail.
3. **Color:** Restrained teak/stone + WhatsApp green + amber tints — disciplined. Two near-black blocks (strip, custom card) sit close — zebra rhythm.
4. **Typography:** Jakarta + Inter, deliberate. Small sizes 11–14px cluster (eyebrow 11.5, float-sub 11.2, top-hint 12.5, sec-cap 13.8) — merge to 12/14/16.
5. **Buttons:** Primary green + secondary teak outline, 10px radius family — clean. Mock pills/search mimic controls without behavior.
6. **Cards:** White + 1px border + soft shadow consistently; black blocks break depth order (intentional contrast, keep only one).
7. **Alignment:** Left-aligned copy — good. Collage absolute offsets hand-tuned vs grid.
8. **Imagery/icons:** Lucide 13–19px consistent. Unsplash photos may read generic-stock (owner photos pending).
9. **Consistency:** Live atoms consistent; chapter labels/topbar/sticky-mock are a second scaffolding language — must not ship.
10. **Feel:** Current, calm, premium — not dated. No heavy shadows or decorative gradients.

## Step 6 — Catalogue checks (dashboard section N/A — adapted)
- WhatsApp enquire is the most prominent element in hero + product — correct.
- Badges use harmonious tints, no rainbow. No prices — correct per governance.
- Copy clean: custom-crafted to order, made to your specifications, zero workshop claims.
- Pills are inert lookalikes of real filters — label as mock or wire minimally.


## Step 8 — Scores, issues, fixes, wins, theme

### First Impression
Calm premium teak catalogue with a confident headline and dominant WhatsApp path — genuinely close to shippable. The scaffolding (chapter pills, static sticky twin, inert search/pills) is what keeps it feeling like a mockup rather than the product.

### Scores (Mobile / Desktop)
| Area | Mobile | Desktop |
| :--- | :--- | :--- |
| **Whitespace** | 7/10 | 6/10 |
| **Hierarchy** | 8/10 | 6/10 |
| **Color** | 8/10 | 8/10 |
| **Typography** | 7/10 | 7/10 |
| **Buttons & Controls** | 7/10 | 6/10 |
| **Element Placement** | 7/10 | 6/10 |
| **Consistency** | 6/10 | 6/10 |
| **Modernity** | 8/10 | 8/10 |

### Ranked issues
### High
- **High — Duplicate sticky action bars confuse the primary path.** Where: page bottom, `page.tsx:139-143` static mock + root-layout fixed `StickyBottomBar`. Both. Violates one-clear-action; thumb must choose between twins.
- **High — Static search + pills + sticky look interactive but do nothing.** Where: hero search `page.tsx:67`, pills `page.tsx:108`, sticky spans `page.tsx:139-143`. Both. Violates honest affordance; tap gives zero feedback.
- **High — Forced H1 line-break cripples desktop measure.** Where: `page.tsx:55` `<br />`. Desktop. Violates fluid hierarchy; narrow ragged column in 1120px container.

### Medium
- **Medium — Two heavy black blocks zebra the rhythm.** Where: strip `mockup.css:32` + custom card `mockup.css:40`. Both. Violates section contrast; dark-dark-light-dark reads accidental.
- **Medium — Desktop grids stay mobile-narrow.** Where: `.mk-cat-grid` + `.mk-prod-grid` 2-col at all widths. Desktop. Violates purposeful bento/asymmetric density; 1120px left half-empty.
- **Medium — Small-text contrast under 4.5:1.** Where: muted `#78716C` meta + white on `#25D366`. Both. Violates text-contrast readability on budget phones.
- **Medium — Trustbar 3-line wrap buries H1 on short phones.** Where: trustbar `page.tsx:45-51`. Mobile. Violates 3-second focal point.
- **Medium — Off-beat spacing (22px hero, 13px H1 gap).** Where: `mockup.css:7,14`. Both. Violates consistent-beat rhythm.
- **Medium — Collage overlap crowds 360px.** Where: `.mk-hero-media` floats. Mobile. Violates optical balance at smallest width.

### Low
- **Low — Three near-identical small sizes (11.2/11.5/12.5px).** Where: eyebrow, float-sub, top-hint. Both. Reads as error, not scale.
- **Low — Chapter scaffolding is a second visual language.** Where: topbar + chapter labels. Both. Fine for mockup, must not ship.
- **Low — No `aria-hidden` on decorative thumbs; crumb uses › glyph.** Where: `page.tsx:118-119,102`. Both. Minor screen-reader noise.

### Fixes (concrete values, recommendations only — no code changed)
- H1: delete `<br />` in `page.tsx:55`; set `.mk-h1{font-size:clamp(2.25rem,5vw,3.5rem);line-height:1.08;letter-spacing:-0.03em;max-width:12ch}`.
- Sticky twin: delete static `.mk-sticky-mock` block `page.tsx:139-143`; rely on fixed layout bar. Or label `aria-hidden="true"` + caption "sticky-bar preview".
- Inert controls: add `aria-disabled="true"` + `cursor:not-allowed` + caption "visual mock — not tappable" to search-mock, pills, sticky-mock; or wire pills to filter + search to real SearchBox.
- Black rhythm: keep ONE dark block — change strip to stone `#F3EFEA` bg + `#1C1917` text, keep custom card dark; gap dark blocks ≥64px apart.
- Desktop grids: `@media(min-width:1024px){.mk-cat-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}.mk-prod-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}`; tablet 3-col at 768px.
- Contrast: meta text `#78716C`→`#57534E` (12.5px+); white-on-green CTA add `text-shadow:0 1px 0 rgba(0,0,0,.18)` + 700 weight (already) — accept as brand action w/ bold 16px+, or darken hover `#1EBE5D` base.
- Trustbar: single line on mobile — keep rating + location, move hours into hero sub or hide `<360px` via `@media(max-width:480px){.mk-trustbar span:nth-child(n+5){display:none}}`.
- Spacing beat: hero padding `22.4px`→`24px`, H1 margin `12.8px`→`16px`, CTA gap `11.2px`→`12px`, strip margin `16px`→`24px`.
- Collage 360px: small thumb `130×100`→`112×84`, float-bottom `bottom:44px`→`bottom:16px`, main inset right `20px`→`12px`.
- Type scale: merge smalls to `12px/0.75rem` captions + `14px/0.875rem` meta; lift `.mk-top-hint,.mk-float-sub,.mk-sec-cap` to ≥12px.
- Thumbs: `alt=""` + `aria-hidden="true"` on decorative thumbs (already alt="" — add aria-hidden); breadcrumb `<nav aria-label="Breadcrumb">`.

### Quick Wins (biggest lift, least effort)
1. Delete the `<br />` in the H1 + cap at `max-width:12ch` — instant desktop confidence.
2. Delete or curtain-label the static sticky twin — removes the biggest confusion in one cut.
3. Darken muted meta to `#57534E` + mark inert controls `aria-disabled` — readability + honesty in two lines.

### Theme Note
Light-only warm stone is intentional and suits a furniture showroom (daylight, wood tones). No dark theme needed for v1 catalogue; a dark custom-card accent already gives contrast without a full theme. Revisit only for admin night use.

**Report saved:** `design-audits/design-audit-2026-10-05.md` (this file). **No code changed in audit mode** — fixes above are recommendations only, per skill Step 8.

- **Low — Missing focus-visible + cursor affordance on inert-look elements.** Where: mock pills/search. Both. Keyboard/tap honesty gap.

**Count: 3 High, 6 Medium, 4 Low.**

## Step 7 — Drawers/modals/overlays
None in mockup. Arrivals carousel is the only overflow container — padded, no edge-flush defect. No action needed.

