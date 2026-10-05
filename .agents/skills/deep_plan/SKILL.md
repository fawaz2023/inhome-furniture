---
name: deep_plan
description: Triggers deep architectural planning and blast radius mapping before multi-file or structural changes.
---

# `deep_plan` (INHOME FURNITURE)

You have been invoked to perform a `DEEP_PLAN` before making structural, architectural, or multi-file changes.

## Protocol Steps

1. **Reset Assumptions**
   - Discard unverified assumptions. Re-verify the current code state directly from source files.

2. **Map the Blast Radius**
   - Analyze upstream callers and downstream consumers using `grep_search`.
   - List every affected file and route.
   - Check impact on:
     - WhatsApp link generation & OG card previews
     - Mobile viewport layout (360px–390px)
     - Supabase queries / Mock data fallback behavior
     - Admin authentication guards

3. **Step-by-Step Implementation Plan**
   - Output a numbered, step-by-step plan where every task is tagged `[NEW]`, `[MODIFY]`, or `[DELETE]` with exact filepaths.
   - Include before/after diff sketches for all modified files.

4. **Approval Gate**
   - **Do not write any code** until the user reviews and approves the plan.
