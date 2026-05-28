# Hudson — History

**Project:** gh-aw-hackathon | **Role:** DevRel | **Lead:** Ripley

## Historical Context

Archived in `history-archive.md`:
- Project kickoff and team structure
- Early decisions (Challenge 00 format, WTH principles)
- DevContainer setup guide

## Learnings — Wave A (2026-05-28)

Wave A authoring complete: 28 challenge docs (14 challenges × Student+Coach) across Tracks 1-3.

### Track 1 Content

Authored 8 docs (Student + Coach) for Track 1 challenges (1-01 through 1-04):
- **1-01 Morning Briefing:** schedule-triggered standup
- **1-02 Safe & Sound:** permissions + safe-outputs deep dive, noop mandatory pattern
- **1-03 The Watcher:** push event observability
- **1-04 Label Maker:** issues event + allowlisted labels

**Key patterns:**
- Safe-outputs model: declare intent, implement, provide noop escape
- Progressive trigger complexity: schedule → conditional → push → issues
- Dossier citations ground patterns in production examples
- workflow_dispatch enables fast iteration
- Socratic coaching (hint more, show less)

**Document structure:** Student 80-150 lines, Coach 150-300 lines. Matches Challenge 00 format. WTH strict (no step-by-step, challenge-based).

### Track 2 Content

Authored 10 docs (Student + Coach) for Track 2 challenges (2-01 through 2-05):
- **2-01 Triage Bot:** issues event classification via AI
- **2-02 Review Buddy:** pull_request event + metadata analysis
- **2-03 Slash & Burn:** issue_comment slash-command pattern (/summarize)
- **2-04 Stale Patrol:** schedule maintenance with warn-then-close
- **2-05 Welcome Wagon:** first-time contributor detection

**Patterns adapted:**
- Category A (Issue & PR Management): event-driven + allowlisted outputs
- Category C (Continuous Improvement): scheduled maintenance
- Category H (ChatOps): slash-command pattern with lock-for-agent
- Dossier pitfalls #1, #5, #6 incorporated

**Sample solutions:** Inline in coach guides (~20-30 lines), with "why this works" context. Production-ready refs in coaches/sample-solutions/.

### Track 3 Content

Authored 10 docs (Student + Coach) for Track 3 challenges (3-01 through 3-05 capstone):
- **3-01 The Relay:** producer-consumer via repo-memory persistence
- **3-02 Context Engine:** MCP toolsets for external data injection
- **3-03 Engine Swap:** multi-engine comparison (copilot, claude, codex)
- **3-04 The Overseer:** meta-workflows with agentic-workflows MCP
- **3-05 Ship It:** end-to-end orchestration factory (capstone)

**Design decisions:**
- Significantly harder than Track 2 (conceptual leap, not just more of same)
- All 5 are pathway; 3-05 is explicit capstone
- MCP tools introduced incrementally (repo-memory → toolsets → agentic-workflows)
- Engine diversity: 3 engines for comparison, 2 acceptable if time-pressed
- Sample solutions as inline code blocks in coach guides
- Challenges mostly independent; do in order recommended but skip-around allowed

**Key concepts:**
- Producer-consumer decoupling via data
- Context injection for specificity
- Engine tradeoffs (speed, reasoning, code)
- Observability layers (meta-thinking)
- Orchestration & composition (system thinking)

**Advanced coaching:**
- 7-9 pitfalls per challenge (more depth than Tracks 1-2)
- Repo-memory gotcha highlighted early (silent file filtering)
- Token budgets explained (5M+ for 3-04 meta-analysis)
- Incrementalism emphasized for capstone (build one piece, test, add next)

**Status:** All 10 files written. Quality matches Challenge 00. WTH format strict.

---

**2026-05-28 Wave A Complete:** All 28 challenge docs authored. Complementary sample solutions delivered by Vasquez (14 workflows). Site polished by Bishop (hero animation, timelines, sidebars, OG image). Ready for event coaching.

---

**2026-05-28 QA Pass Complete:** Full humanizer + fact-check pass across all 30 challenge docs (00-setup, track-1 through track-3, Student + Coach).

**Humanizer fixes:**
- 24 smarmy closers removed (rocket emojis, "Good luck!", "You've got this.")
- Superlative phrasing toned down in coach files ("huge motivational moment" → factual)
- 1 Celebration Script section removed from 3-05 Coach (wrong register for a reference doc)
- "Ask your coach! They know this pattern inside-out. 🎯" collapsed to "Ask your coach." throughout

**Fact-check fixes:**
- 4 broken Track 1 sample solution paths corrected (`01-*.md` → `1-01-*.md`)
- 1 invalid safe-output type removed: `merge-pr` (not in dossier) → `add-labels` in 3-05 Student

**TODOs surfaced (see hudson-qa-pass.md):**
- `engines:` vs `engine:` field name — needs Vasquez or docs confirmation
- `toolsets: [commits]` in 1-03 Coach — not in dossier, unverified
- `add-comment` on push events (1-03) — semantic validity unverified
- Blog post URLs in challenge docs — likely invented, review before event
- `add-labels: allowlist:` vs `labels:` inconsistency — Student docs may mislead, should standardize

**2026-05-28:** QA pass landed — 30 challenge docs humanized; 4 broken sample paths + 1 hallucinated safe-output fixed

**2026-05-28 Team Update (Audit Wave 2):** All agents completed curriculum + content + ops gap audits. 5 inbox decisions merged into `.squad/decisions.md`; gap report delivered to Marco. 26 items catalogued across 4 severity tiers (critical blockers, production patterns, catalog gaps, journey edge cases). Inbox now empty.

---

## Learnings — Sprint 3 (2026-05-28)

Created 2 new bonus challenges (6 files total) covering production-grade concepts absent from the existing curriculum.

### Challenge 2-06 "Mix & Match" (Track 2 / Repo Concierge)

- **Concepts taught:** `imports:` workflow composition, `create-discussion` safe-output
- **Pattern:** Weekly-scheduled workflow imports a shared helper snippet, posts a repo health digest as a GitHub Discussion
- **Key coaching surfaces:** import paths are relative to repo root (not workflow file); Discussion category must exist in repo settings before the workflow runs; `permissions: discussions: write` is separate from issues/PR permissions and easy to miss
- **Design decision:** Helper file is plain Markdown with no frontmatter — squads sometimes add `---` delimiters and cause parse errors; flagged in Coach guide

### Challenge 3-06 "Ground Truth" (Track 3 / Continuous Intelligence)

- **Concepts taught:** `pre-agent-steps:` deterministic pre-fetch, `create-pr` safe-output
- **Pattern:** Shell steps fetch real repo metrics before AI runs → agent grounds its output in those values → changes proposed via PR, not direct commit
- **Key coaching surfaces:** need both `contents: write` AND `pull-requests: write` for `create-pr`; `/tmp/` files are ephemeral (run-scoped only); agent body must explicitly reference `/tmp/` file paths — agents don't discover them
- **Design decision:** Framed `pre-agent-steps:` as "deterministic layer / reasoning layer" separation — clearer than just "steps before the agent"
- **"propose, don't impose"** coined as the `create-pr` mental model; useful for coaching squads who want to auto-merge

### Track counts updated
- `_tracks/safe-outputs.md`: `challenges_count` 5 → 6
- `_tracks/mcp-integration.md`: `challenges_count` 5 → 6

## 2026-05-28 Sprint 2–3 Housekeeping (Scribe)

**Session:** Merged 5 agent inbox decisions into decisions.md, archived old entries, created orchestration logs.

**Agents completed:**
- ripley-3 (Sprint 2): Time-budget reconciliation
- hicks-3 (Sprint 2): MC kickoff script, completion awards, submission evidence fields
- vasquez-4 (Sprint 2): validate-submission workflow, coaches demo section
- hudson-4 (Sprint 3): Challenges 2-06, 3-06 with Student/Coach READMEs
- vasquez-6 (Sprint 3): Sample solutions 2-06, 3-06, 3-05 multi-repo extension

**Action:** 5 commits staged for Sprint 2 + 3 curriculum + housekeeping.


## Wave B — Track 4: Production Patterns (2026-05-28)

Created Track 4 "Production Patterns" — 8 challenges based on battle-tested production workflows from `github/gh-aw` and `githubnext/agentics`.

### Files Created

**Track metadata:**
- `_tracks/production-patterns.md`

**Jekyll cards (8):**
- `_challenges/4-01-issue-triage-agent.md` (core)
- `_challenges/4-02-ci-doctor.md` (core)
- `_challenges/4-03-daily-doc-updater.md` (bonus)
- `_challenges/4-04-doc-unbloat.md` (bonus)
- `_challenges/4-05-daily-testify.md` (bonus)
- `_challenges/4-06-test-improver.md` (bonus)
- `_challenges/4-07-security-compliance.md` (bonus)
- `_challenges/4-08-malicious-code-scan.md` (bonus)

**Student + Coach guides (16 files):**
- All under `challenges/track-4-production-patterns/4-0X-<slug>/{Student,Coach}/README.md`

### Key Patterns Introduced in Track 4

- **`workflow_run` trigger** (4-02): reacting to another workflow's outcome — the most complex trigger in the set
- **`gh aw add-wizard <url>`** used consistently (not `gh aw add`) for pulling production workflows
- **Causal chain pattern** (4-05 + 4-06): one workflow creates issues, another acts on them — the 100% causal merge rate comes from the human-review gate between the two
- **Uber expert persona** (4-05): embedding deep domain knowledge directly in the prompt body
- **Install command**: `curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash` (not deprecated `gh extension install`)
- **Merge-rate stats** as social proof: 96% (Doc Updater), 85% (Unbloat), 69% (CI Doctor), 100% causal chain (Testify)
- **Security-as-code** framing (4-07, 4-08): policy encoded in workflow files alongside infrastructure

### Design Decisions

- Challenges are ALL `difficulty: Advanced` — this is the "Real-World" tier
- 4-01 and 4-02 are `tier: core`; the rest are `tier: bonus`
- Student guides follow the Background → What it does → What you'll do → Customize → Success criteria → Hints structure (~400 words)
- Coach guides are brief and tactical (~200-250 words): expected solution shape + common blocker table + verification steps
- Every challenge uses `gh aw add-wizard <url>` to pull the production workflow as starting point — no copy-paste, real workflow provenance

---

## Wave E Completion — 2026-05-28

**Delivered:** Track 4 "Production Patterns" challenge suite (25 files total)

**Integration:** Bishop-4/5 wired 8 challenges into Jekyll site as styled guide pages. Student/Coach links now route through site instead of raw GitHub markdown.

**Merge-rate stats captured:** 69% (CI Doctor), 96% (Doc Updater), 85% (Unbloat), 100% causal chain (Testify).

**Forward impact:** Participants now have battle-tested production workflows as starting point via `gh aw add-wizard`. Tracks 1-3 taught foundations; Track 4 is graduation to real patterns.

**Cross-team sync:** Vasquez unified install command. Hicks updated participant handbook with Track 4 stats. Bishop created Jekyll infrastructure for guide pages.

---
