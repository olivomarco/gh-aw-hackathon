# Site Assets — Contributor Guide

This directory contains the static assets for the gh-aw Hackathon GitHub Pages site.

## Theme Architecture

The site is built with **Jekyll** (no remote theme — fully custom layouts).

### Color Palette (CSS variables in `css/style.scss`)

| Variable | Dark | Light | Usage |
|---|---|---|---|
| `--bg` | `#0d1117` | `#ffffff` | Page background |
| `--bg-surface` | `#161b22` | `#f6f8fa` | Cards, header, footer |
| `--border` | `#30363d` | `#d0d7de` | Card/component borders |
| `--text` | `#e6edf3` | `#1f2328` | Primary text |
| `--text-muted` | `#8b949e` | `#636c76` | Secondary text |
| `--accent` | `#7c3aed` | `#7c3aed` | CTA buttons, active nav |
| `--accent-text` | `#a78bfa` | `#6d28d9` | Inline accent text, links |
| `--green` | `#2ea043` | `#1a7f37` | Track 2, success badges |
| `--blue` | `#1f8ec4` | `#0969da` | Track 3 |

**Track badge colors:**
- Track 1 (AI Workflows): `--track-1` = `#7c3aed` purple
- Track 2 (Safe Outputs): `--track-2` = `#2ea043` green
- Track 3 (MCP Integration): `--track-3` = `#1f8ec4` blue

### File Structure

```
assets/
├── css/
│   └── style.scss      ← Single SCSS file. CSS variables at top.
├── js/
│   └── main.js         ← Theme toggle, mobile nav, smooth scroll
├── favicon.svg         ← 32×32 SVG mark
├── og-image.svg        ← 1200×630 OG image for social sharing
└── README.md           ← This file
```

### Layouts (`_layouts/`)

| File | Usage |
|---|---|
| `default.html` | Base layout — all pages inherit from this |
| `challenge.html` | Individual challenge page with breadcrumb, badges, prev/next nav |
| `track.html` | Track landing page listing challenge cards |

### Includes (`_includes/`)

| File | Usage |
|---|---|
| `header.html` | Sticky header, nav, theme toggle |
| `footer.html` | Site footer with nav links |
| `challenge-card.html` | Reusable card component. Pass `challenge=` the challenge object |

### Adding a Challenge

1. Create `_challenges/NN-slug.md` with front matter:
   ```yaml
   ---
   title: "My Challenge"
   description: "One-sentence description"
   number: NN
   order: NN
   difficulty: "Beginner" | "Intermediate" | "Advanced"
   time: "45 min"
   track: "ai-workflows" | "safe-outputs" | "mcp-integration"
   track_name: "AI Workflows"
   tags:
     - tag-name
   ---
   ```
2. Write challenge content in Markdown below the front matter.
3. Jekyll renders it at `/challenges/NN-slug/`.

### Adding a Track

1. Create `_tracks/track-slug.md` with front matter:
   ```yaml
   ---
   title: "Track Name"
   description: "..."
   badge: "Track N"
   track_id: "track-slug"
   order: N
   difficulty_range: "🟢 Beginner → 🔴 Advanced"
   challenges_count: N
   learning_objectives:
     - "Objective 1"
   ---
   ```
2. Add a new track card to `index.md` matching the `track_id`.
3. Add a badge CSS rule in `style.scss` for `.badge--track-<track-slug>`.

### Modifying the Theme

- All color tokens are CSS custom properties in `:root` at the top of `style.scss`.
- Light mode overrides are in `[data-theme="light"]`.
- Theme preference is persisted in `localStorage` under key `gh-aw-theme`.
- Dark is the default (applied on `<html data-theme="dark">`).

### WCAG Compliance

Contrast ratios verified against WCAG AA (4.5:1 for normal text, 3:1 for large):
- `#e6edf3` on `#0d1117` → ~15:1 ✅
- `#8b949e` on `#0d1117` → ~5.5:1 ✅  
- `#a78bfa` on `#0d1117` → ~5.8:1 ✅
- `#56d364` on `#0d1117` → ~8.1:1 ✅
