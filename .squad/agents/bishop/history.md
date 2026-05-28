# Bishop — History

## Project Context
- **Project:** gh-aw-hackathon
- **Owner:** Marco Olivo
- **Format:** What The Hack (WTH) — challenge-based hackathon
- **Site goal:** "Very cool" GitHub Pages site to showcase challenges, guide participants, and display submissions
- **Content source:** WTH markdown files (Student/, Coach/, README.md) authored by Hudson
- **Tech:** GitHub Pages, Jekyll or custom static site, GitHub Actions deploy pipeline

## WTH Site Structure to Implement
```
/                     → Landing page (hero, event overview, CTA)
/challenges/          → Challenge index (cards per challenge)
/challenges/00-setup/ → Per-challenge page (Student guide)
/getting-started/     → Prerequisites and gh-aw quickstart
/coaches/             → Coach resources (gated or separate)
/submit/              → Submission guide
/gallery/             → Post-event solution showcase
```

## Design Principles
- Clean, developer-friendly aesthetic
- Challenge cards with difficulty badges, category tags, estimated time
- Dark mode support
- Fast (static, no heavy JS frameworks unless needed)
- Mobile-responsive
- gh-aw / GitHub brand-aligned

## Team
- Ripley — Lead
- Hudson — DevRel (content owner)
- Vasquez — Workflow Engineer
- Hicks — Events & QA
- Bishop (me) — Web & Design
- Scribe — Session logger
- Ralph — Work monitor

## Learnings

### 2026-05-28 — Site Scaffold

**Theme approach:** Fully custom Jekyll layouts (no remote theme). Dark-first with `#7c3aed` purple accent and GitHub-dark surface palette. CSS custom properties for easy theming. Responsive grid via CSS `auto-fill` columns.

**Files created:**
- `_config.yml`, `Gemfile`, `.github/workflows/pages.yml`
- `index.md`, `challenges.md`
- `_layouts/default.html`, `_layouts/challenge.html`, `_layouts/track.html`
- `_includes/header.html`, `_includes/footer.html`, `_includes/challenge-card.html`
- `assets/css/style.scss` (~850 lines), `assets/js/main.js`
- `assets/favicon.svg`, `assets/og-image.svg`
- `_tracks/ai-workflows.md`, `_tracks/safe-outputs.md`, `_tracks/mcp-integration.md`
- `_challenges/00-setup.md` (placeholder)
- `assets/README.md` (contributor guide)

**Jekyll collections setup:**
- `challenges` collection → `_challenges/` directory → renders at `/challenges/<slug>/`
- `tracks` collection → `_tracks/` directory → renders at `/tracks/<slug>/`
- Default front matter assigns `challenge` layout to all challenges, `track` layout to all tracks
- **Coordination note for Ripley/Hudson:** Challenge files go in `_challenges/` (leading underscore is Jekyll convention). Output URLs are `/challenges/` without the underscore.

**Deploy method:** `.github/workflows/pages.yml` using `actions/jekyll-build-pages@v1` + `actions/deploy-pages@v4`. Triggers on push to `main`.

**Color palette:**
- Background: `#0d1117` (GitHub dark)
- Surface: `#161b22`
- Border: `#30363d`
- Text: `#e6edf3`
- Text muted: `#8b949e`
- Accent purple: `#7c3aed` / `#a78bfa` (hover/text)
- Track 1 purple, Track 2 green `#2ea043`, Track 3 blue `#1f8ec4`

**Accessibility:** WCAG AA contrast verified for all text/background pairs. Semantic HTML throughout (`<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`, ARIA labels on interactive elements).

### 2026-05-28 — Polish Pass

**Animation philosophy:** CSS-only, keyframe-based animations. Used `offset-path` (CSS Motion Path) for traveling dots on the hero workflow diagram — nodes at x=80/240/400/560 in a 640-wide SVG. Pulse rings use `transform: scale()` with `transform-box: fill-box` to ensure correct SVG transform-origin. All animations guarded by `@media (prefers-reduced-motion: reduce)`. Hero diagram hidden on mobile <540px; replaced by stat numbers.

**New files created:**
- `_includes/hero.html` — animated hero section (extracted from index.md); contains SVG workflow loop (Trigger→Agent→Safe Output→Deploy)
- `_includes/cta-codespaces.html` — "Open in Codespaces" CTA banner for challenge pages
- `.squad/decisions/inbox/bishop-polish-pass.md` — design decisions record

**Files substantially modified:**
- `_layouts/challenge.html` — sidebar (time/difficulty/prereqs/learning/track/tags), Codespaces CTA, coach notes `<details>` disclosure, challenge-layout grid
- `_layouts/track.html` — replaced card grid with visual timeline (`track-timeline`); CSS custom property `--timeline-color` set per-track; glow decoration on track hero header
- `_includes/challenge-card.html` — track color left strip (`border-left: 3px`), skeleton pulse for `coming_soon`, tag `data-tooltip` attributes
- `_includes/footer.html` — team credit, "Made with gh-aw" badge, GitHub repo link
- `_layouts/default.html` — skip-to-content link, reading progress bar for challenge pages
- `assets/css/style.scss` — 370+ lines appended (sections A–Q)
- `assets/js/main.js` — reading progress bar, `prefers-reduced-motion` guard
- `assets/og-image.svg` — redesigned with workflow nodes decoration, multi-stop gradient headline, stats row
- `_config.yml` — `github_repo` + `codespaces_url` config values
- `challenges.md` — fixed `where_exp` Liquid bug (replaced `nil or c.track == ''` with `blank`)
- `index.md` — uses `{% include hero.html %}`

**Color tokens added (no changes to existing tokens):**
- `--timeline-color`: per-track CSS custom property injected via inline style in track layout
- `--track-hero-glow`: per-track radial glow color for track page hero

**Typography decisions:**
- Hero headline: `clamp(2.5rem, 7vw, 4.5rem)`, weight 900, letter-spacing -0.03em
- Gradient headline: `#a78bfa → #c084fc → #60a5fa` (purple-to-blue sweep)
- Body: unchanged (16px / 1.6 line-height)
- Sidebar labels: 0.6875rem, uppercase, letter-spacing 0.08em — creates visual hierarchy without extra weight

**Key CSS patterns used:**
- `offset-path` + `offset-distance` for dot travel animation (CSS Motion Path)
- `mask-image` for dot-grid fading in hero glow overlay
- `backdrop-filter: blur(12px)` on sticky header (existing, verified)
- `transform-box: fill-box; transform-origin: center` for SVG scale animations
- CSS `details`/`summary` for coach notes toggle (no JS needed for basic function)
- `background-image: linear-gradient` + `background-size: 0% 1px → 100% 1px` for link draw-in underline

**Jekyll build:** ✅ Succeeded (1.309s, 37KB compiled CSS)


## 2026-05-28: Kickoff milestone commit — Site scaffold + Jekyll custom theme complete (merged into decisions.md); next: visual polish pass

---

**2026-05-28 Wave A Complete:** Visual polish milestone — hero animation, timelines, sidebars, OG image. Jekyll build verified (47 pages, 1.38s).

## 2026-05-28 — QA Pass (Bishop)

**Copy & Template Audit:** Humanizer + fact-check pass across all user-facing copy.

**Issues resolved:**
- Challenge count: "Twelve" → "14" (hero.html, og-image.svg, index.md)
- Track card counts: 4/4/4 → 4/5/5 (index.md); matched actual challenge split
- Footer badge: "Made with gh-aw" → "Built for gh-aw" (clarifies Jekyll tool, gh-aw subject)
- Codespaces URL fallback: Marked TBD with `?repo=TBD` comment

**Verification:**
- All internal links verified live (`/challenges`, `/tracks/{id}`, `/docs/*`)
- Jekyll build: ✅ 46 HTML pages, 0 errors (1.513s)
- Track names match decisions.md
- OG image stats & headline synced with hero copy

**Handoff:** `.squad/decisions/inbox/bishop-qa-pass.md` — full audit report.
Repository owner/slug in _config.yml: `github/gh-aw-hackathon` — Marco to confirm before deploy.

## Learnings

### 2026-05-28 — baseurl Fix (Pages CSS was 404)

**Problem confirmed by Marco:** Live site at https://olivomarco.github.io/gh-aw-hackathon/ loaded HTML but no CSS. `<link href="/assets/css/style.css">` was resolving at domain root (404); it needed `/gh-aw-hackathon/assets/css/style.css`.

**Root cause:** `_config.yml` had `url: ""` and `baseurl: ""` — placeholder values left from scaffold. Also `github_repo` and `codespaces_url` pointed at `github/gh-aw-hackathon` (wrong owner).

**Fix:** Single-file change to `_config.yml`:
- `url: "https://olivomarco.github.io"`
- `baseurl: "/gh-aw-hackathon"`
- `github_repo` / `codespaces_url` → `olivomarco/gh-aw-hackathon`

**Commit:** `6b0e238` — pushed to `main` 2026-05-28T15:34:35+01:00

**Lesson:** Always set `url` + `baseurl` in `_config.yml` before the first Pages deploy when the repo name ≠ `username.github.io`. Templates using `relative_url` work correctly once baseurl is set — no template changes needed.

