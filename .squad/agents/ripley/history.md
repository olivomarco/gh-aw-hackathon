# Ripley — History

## Project Context
- **Project:** gh-aw-hackathon
- **Owner:** Marco Olivo
- **Format:** What The Hack (WTH) — challenge-based, no step-by-step instructions, coaches guide not solve
- **Tech:** GitHub Agentic Workflows (gh-aw) — natural language markdown workflows compiled to GitHub Actions
- **AI Engines supported:** GitHub Copilot, Claude (Anthropic), Codex (OpenAI), Gemini (Google)
- **Key constraints:** Sandboxed execution, read-only tokens, safe-outputs gate, SHA-pinned deps
- **Site:** GitHub Pages — "very cool" visual site for challenge showcase
- **Universe:** Alien

## Team
- Ripley (me) — Lead
- Hudson — DevRel (challenge content, docs, examples)
- Vasquez — Workflow Engineer (gh-aw infra, repo setup)
- Hicks — Events & QA (participant experience, judging, quality)
- Bishop — Web & Design (GitHub Pages, visual design, site)
- Scribe — Session logger
- Ralph — Work monitor

## Learnings

### 2026-05-28 — Program Structure Design

**Format:** Single-day (8h). Rationale: lower barrier, higher energy, easier coach commitment.

**Tracks:** 3 tracks, escalating difficulty:
- Track 1: Hello, Agent (🟢) — 4 challenges, 90 min
- Track 2: Repo Concierge (🟡) — 5 challenges, 120 min
- Track 3: Continuous Intelligence (🔴) — 5 challenges, 150 min

**Challenge count:** 14 total (progressive, each builds on prior gh-aw concepts)

**Judging weights:** Completion 40%, Creativity 20%, Safety 20%, Code Quality 10%, Docs 10%

**AI engine policy:** All four engines allowed (Copilot, Claude, Codex, Gemini). @copilot IDE use also allowed.

**Key files created:**
- `README.md` — program brief
- `docs/program/judging-rubric.md` — scoring framework
- `docs/program/timeline.md` — run-of-show
- `CODE_OF_CONDUCT.md`
- `challenges/track-{1,2,3}-*/README.md` — track overviews
- `coaches/README.md` — coach handbook
- `.squad/decisions/inbox/ripley-program-design.md` — full decision record

**Key constraint discovered:** Challenge 00 and its Student/Coach READMEs already existed (Hudson's work). Respected existing content.

## 2026-05-28: Kickoff milestone commit — Program structure + site scaffold + Challenge 00 + participant docs (merged into decisions.md)

---

**2026-05-28 Wave A Content Landed:** 14 challenges authored + 14 sample solutions + polished site. Track leadership on schedule. Ready for event prep (legal, coaching, QA).

---

## 2026-05-28 QA Pass — Program Documentation

Completed PART A (humanizer) and PART B (fact-check) on all program-level docs.

**Issues resolved:**
- README.md: Removed marketing puffery from hero, em-dashes cleaned up, timing corrected (Track 3: 150 → 105 min, Closing: 30 → 15 min)
- Track 3 README: Updated time budget to match actual schedule (150 → 105 min)
- Verified judging rubric weights (100%), challenge counts, all cross-references, CODE_OF_CONDUCT version

**Result:** All docs clean, consistent with timeline.md, ready for distribution.


**2026-05-28:** QA pass landed — program-level docs humanized + timing corrected (Track 3: 150→105 min)
