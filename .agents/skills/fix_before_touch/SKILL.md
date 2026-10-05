---
name: fix_before_touch
description: Pre-flight checklist before fixing any bug or editing code. Maps blast radius across Next.js components and gates edits.
---

# `fix_before_touch` (INHOME FURNITURE)

> **HARD STOP ENFORCED**: You cannot write any code or execute modifying tools until you complete this checklist and output the results.

## Checklist (Before Editing)

1. **Read `docs/KNOWN_BUGS.md`**
   - Check if the symptom or file matches any known bug or previous fix.
   - If it does, follow the exact solution and avoid past failed attempts.

2. **Consult the Doc Map (`AGENTS.md`)**
   - Identify which rules govern the target area (e.g., Copy Governance, WhatsApp rules, Design tokens, Supabase RLS).

3. **Map the Blast Radius**
   - Use `grep_search` to find who imports the target file (upstream) and who consumes its exports (downstream).
   - Classify:
     - `ISOLATED` — Internal component logic; exported props/signatures unchanged.
     - `LOCAL` — Affects only 1–2 pages in the same route group (e.g., category card inside `app/(public)/[category]/page.tsx`).
     - `BROADCAST` — Shared UI atom (`components/ui/*`), layout shell (`Header`, `Footer`, `StickyBottomBar`), global tokens (`app/globals.css`), or shared data contracts (`types/database.ts`). Every consumer must remain fully functional.
     - `CRITICAL` — Core ground-truth contracts:
       - `lib/whatsapp.ts` (Phone sanitization & message template ground truth)
       - `lib/mock-data.ts` / `lib/supabase.ts` (Resilient seed data & fallback)
       - `supabase/schema.sql` (Database DDL & RLS policies)
       - `app/admin/layout.tsx` (Admin auth guard)
       *CRITICAL edits require explicit user confirmation before writing code.*

4. **Formulate Hypothesis**
   You must state:
   - **Issue / Goal:** What the issue or task is.
   - **Proof:** Exact file and line number proving the cause or insertion point.
   - **Verification:** How you will verify the change empirically (e.g., Next.js compile check, touch target check, or WhatsApp link unfurl validation).

5. **User Confirmation**
   - REQUIRED for `CRITICAL` and `BROADCAST`.

## After the Edit

6. **Verify**
   - Ensure zero TypeScript or lint errors.
   - Verify mobile responsiveness down to 360px and touch targets >= 44x44px.
   - Never claim a fix works without empirical verification.

7. **Log it (Append-Only)**
   - If fixing a bug: Append to `docs/KNOWN_BUGS.md` (never overwrite).
   - If concluding a work session: Append to `docs/SESSION_HANDOFF.md` (never overwrite).
