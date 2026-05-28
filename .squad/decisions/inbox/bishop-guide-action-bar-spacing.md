# Decision: Guide Page Action Bar Spacing

**Date:** 2026-05-28  
**Author:** Bishop (Web & Design)  
**Status:** Shipped

## Problem

The `.guide-footer-actions` button bar (containing "Back to challenge" + "Student/Coach Guide" buttons) at the bottom of all guide pages was visually cramped:

1. **Above:** The prose content above had only 3rem of top margin separation — visually tight against the last "Reference" heading/list
2. **Below:** No `margin-bottom` at all — the site footer strip started immediately under the buttons

Reported by Marco via screenshot of `/coach/2-06-mix-and-match/`.

## Investigation

File: `assets/css/style.scss` lines ~2130–2138

Pre-fix `.guide-footer-actions` had:
- `margin-top: var(--space-12)` = 3rem ✅ (adequate top separation from prose)
- `padding-top: var(--space-6)` = 1.5rem ✅
- `border-top: 1px solid var(--border)` ✅
- **No `margin-bottom`** ❌ — root cause of footer flush issue

The `_layouts/guide.html` markup was clean — no class changes needed.

## Decision

Add `margin-bottom: var(--space-12)` (3rem) to `.guide-footer-actions` only. The existing `margin-top`, `border-top`, and `padding-top` were already providing correct visual separation above.

**Scope:** CSS-only change. Affects all guide pages (student + coach) since both use `_layouts/guide.html`. Does not affect any other button usage.

## CSS Diff

```css
/* Before */
.guide-footer-actions {
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border);
}

/* After */
.guide-footer-actions {
  margin-top: var(--space-12);
  margin-bottom: var(--space-12);   /* ← added */
  padding-top: var(--space-6);
  border-top: 1px solid var(--border);
}
```

## Verification

- `bundle exec jekyll build` — 0 errors, 2.638s, pre-existing Liquid warnings only
- Change is scoped to `.guide-footer-actions` selector — no other button contexts affected
- Applies equally to student guides (`/challenges/<slug>/student/`) and coach guides (`/challenges/<slug>/coach/`)
