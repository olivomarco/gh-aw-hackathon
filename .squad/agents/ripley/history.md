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

### 2026-05-28 — Sprint 1 Blocker Fixes (ripley-2)

**Status:** ✅ RESOLVED

**Blockers fixed:**
1. Challenge counts: Track 2 & 3 declared 4 but have 5 challenges each
   - `_tracks/safe-outputs.md`: `challenges_count: 4` → `5`
   - `_tracks/mcp-integration.md`: `challenges_count: 4` → `5`
2. Repo URLs: `your-org/gh-aw-challenges` placeholder in devcontainer guide
   - `docs/getting-started/devcontainer-setup.md`: Fixed 3 instances → `olivomarco/gh-aw-hackathon`
3. Challenge 00 placeholder: Setup challenge had "This is a placeholder" text
   - `_challenges/00-setup.md`: Replaced with real setup instructions (objectives, 4 steps, success criteria)

**Impact:** Track metadata accurate for Jekyll site. Participants get correct repo URLs. Challenge 00 launch-ready.

**Verification:** All fixes verified. Ready for coach distribution and live launch.

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

**2026-05-28 Team Update (Audit Wave 2):** All agents completed curriculum + content + ops gap audits. 5 inbox decisions merged into `.squad/decisions.md`; gap report delivered to Marco. 26 items catalogued across 4 severity tiers (critical blockers, production patterns, catalog gaps, journey edge cases). Inbox now empty.

## 2026-05-28 — Sprint 1 Blocker Fixes

**Fix 1: Challenge Counts**
- Updated `challenges_count: 4` → `5` in `_tracks/safe-outputs.md` (Track 2 has challenges 2-01 through 2-05)
- Updated `challenges_count: 4` → `5` in `_tracks/mcp-integration.md` (Track 3 has challenges 3-01 through 3-05)
- Verified Track 1 unchanged: still 4 challenges (1-01 through 1-04) ✓

**Fix 2: Repo URLs**
- Updated all `your-org/gh-aw-challenges` references to `olivomarco/gh-aw-hackathon` in `docs/getting-started/devcontainer-setup.md`
- Updated Path B (local) clone URL: `https://github.com/your-org/gh-aw-hackathon.git` → `https://github.com/olivomarco/gh-aw-hackathon.git`
- All three clone/fork code blocks now point to correct repo ✓

**Fix 3: Challenge 00 Placeholder**
- Replaced placeholder content in `_challenges/00-setup.md` with real setup instructions
- Added Step 1–4 walkthrough: environment setup, gh auth, gh-aw verification, repo cloning
- Expanded objectives and success criteria to match actual participant workflow
- Condensed ~200 words inline, kept Jekyll frontmatter intact ✓

**Status:** All 3 blockers resolved. No pre-existing issues encountered.

## 2026-05-28 — Time-Budget Reconciliation (Sprint 2)

**Problem:** Challenge frontmatter declared 435 min total, but timeline allocated only 265 min working time. This was a structural mismatch, not a content problem.

**Fix (WTH-aligned):** Marked challenges as "core" vs "bonus/extension" within each track rather than shortening individual challenge times. Rationale: WTH teams select challenges to work on, they don't complete all of them. Core challenges are completable within track time; bonus are stretch goals.

**Tier assignments:**
- Track 1 (80 min working): 2 core (1-01, 1-02), 2 bonus (1-03, 1-04)
- Track 2 (100 min working): 3 core (2-01, 2-02, 2-03), 2 bonus (2-04, 2-05)
- Track 3 (85 min working): 2 core (3-01, 3-02), 2 bonus (3-03, 3-04), 1 extension (3-05)

**Changes:**
- Added `tier: "core"`, `tier: "bonus"`, or `tier: "extension"` to all 14 challenge frontmatters
- Added `core_challenges: N` to each `_tracks/*.md` file
- Updated `docs/program/timeline.md` with parenthetical on each track: "(core challenges only; bonus challenges are stretch goals for fast-moving squads)"

**Result:** Program now accurately reflects WTH format constraints. Coaches can confidently guide squads to complete core challenges within budget and celebrate early finishers who tackle bonuses.

## 2026-05-28 Sprint 2–3 Housekeeping (Scribe)

**Session:** Merged 5 agent inbox decisions into decisions.md, archived old entries, created orchestration logs.

**Agents completed:**
- ripley-3 (Sprint 2): Time-budget reconciliation
- hicks-3 (Sprint 2): MC kickoff script, completion awards, submission evidence fields
- vasquez-4 (Sprint 2): validate-submission workflow, coaches demo section
- hudson-4 (Sprint 3): Challenges 2-06, 3-06 with Student/Coach READMEs
- vasquez-6 (Sprint 3): Sample solutions 2-06, 3-06, 3-05 multi-repo extension

**Action:** 5 commits staged for Sprint 2 + 3 curriculum + housekeeping.