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

## 2026-05-28: Kickoff milestone commit — Site scaffold + Jekyll custom theme complete (merged into decisions.md); next: visual polish pass
