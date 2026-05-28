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
