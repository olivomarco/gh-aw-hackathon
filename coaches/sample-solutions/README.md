# Sample Solutions — Coaches Only

> ⚠️ **DO NOT share these with squads until they have been stuck for 15+ minutes and
> have explicitly asked for a hint.** Even then, guide them through the *reasoning*,
> not the answer. These files exist to keep coaches aligned and to validate that
> every challenge has a working solution — not to be copy-pasted.

---

## What these are

These files are production-quality reference implementations for all 14 hackathon challenges.
Each file is a valid gh-aw workflow `.md` source that compiles cleanly via
`gh aw compile` and demonstrates the canonical pattern for its challenge.

Every workflow is adapted from real workflows in `github/gh-aw` or
`githubnext/agentics` (source URLs are in the comment block at the top of each file).

---

## All 14 solutions at a glance

### Track 1 — Hello, Agent 🟢

| File | Challenge | One-line description |
|------|-----------|---------------------|
| `track-1/1-01-morning-briefing.md` | Morning Briefing | Cron schedule → GitHub MCP → daily issue with yesterday's activity summary |
| `track-1/1-02-safe-and-sound.md` | Safe & Sound | `workflow_dispatch` → demonstrates permission scoping + the `noop` exit protocol |
| `track-1/1-03-the-watcher.md` | The Watcher | Push trigger → bash `git diff` → conditional `create-issue` on breaking-change signals |
| `track-1/1-04-label-maker.md` | Label Maker | `issues: opened` + daily schedule → AI classification → `add-labels` + `add-comment` |

### Track 2 — Repo Concierge 🟡

| File | Challenge | One-line description |
|------|-----------|---------------------|
| `track-2/2-01-triage-bot.md` | Triage Bot | Full two-dimensional triage: type + priority labels, `needs-info` detection, SLA comment |
| `track-2/2-02-review-buddy.md` | Review Buddy | PR event → diff analysis → size label + structured review pre-comment, no checkout |
| `track-2/2-03-slash-and-burn.md` | Slash & Burn | `/summarize`, `/label`, `/help` slash commands with rate-limiting and lock-for-agent |
| `track-2/2-04-stale-patrol.md` | Stale Patrol | Daily cron → warn stale issues → close after grace period, with `keep-open` escape hatch |
| `track-2/2-05-welcome-wagon.md` | Welcome Wagon | `FIRST_TIME_CONTRIBUTOR` detection → personalised welcome comment, `checkout: false` |

### Track 3 — Continuous Intelligence 🔴

| File | Challenge | One-line description |
|------|-----------|---------------------|
| `track-3/3-01-the-relay.md` | The Relay | Producer-consumer pair: daily JSON → repo-memory → weekly discussion trend report |
| `track-3/3-02-context-engine.md` | Context Engine | Discussions MCP → task extraction → `create-issue` with cache-memory deduplication |
| `track-3/3-03-engine-swap.md` | Engine Swap | Same dependency-drift workflow written 3×: `copilot`, `claude`, `codex` — compare outputs |
| `track-3/3-04-the-overseer.md` | The Overseer | `agentic-workflows` MCP → failure detection → create/update health alert issues (Claude) |
| `track-3/3-05-ship-it.md` | Ship It | Three-workflow factory: Watcher → Auditor → Commander (`assign-to-agent` capstone) |

---

## Compile & test instructions

Each `.md` file compiles independently. To generate the `.lock.yml`:

```bash
# Compile a single workflow
cd coaches/sample-solutions/track-1
gh aw compile 1-01-morning-briefing.md

# Compile all workflows in a track
cd coaches/sample-solutions/track-2
for f in *.md; do gh aw compile "$f"; done

# Validate without writing output
gh aw compile --validate 1-03-the-watcher.md
```

**Multi-file challenges** (3-01 The Relay, 3-03 Engine Swap, 3-05 Ship It) contain multiple workflow
definitions in one file, separated by dividers. Participants must copy each section
into its own `.md` file before compiling.

To run a compiled workflow manually:

```bash
gh aw run 1-01-morning-briefing.md --dry-run   # no AI engine needed
gh aw run 1-01-morning-briefing.md             # live run, uses configured engine
gh aw logs 1-01-morning-briefing               # view run output
```

---

## Coaching protocol — when to reveal a solution

| Time stuck | Coach action |
|-----------|-------------|
| < 15 min | Ask Socratic questions (see each challenge's Coach README) |
| 15–30 min | Share the relevant **section** of the solution (frontmatter only, or body only) |
| > 30 min | Share the full file and have the squad **type it out** — no copy-paste |

> **No copy-paste.** Typing forces engagement with every line.
> A squad that types without understanding will fail the next challenge anyway.

---

## Design decisions in these solutions

- **`engine: copilot` is the default** for all Track 1 and 2 challenges. Copilot is
  included in most GitHub subscriptions and has the lowest latency. Coaches may suggest
  squads try `claude` for any challenge that involves multi-step reasoning.

- **`claude` is used for 3-04 The Overseer** where multi-workflow correlation
  reasoning benefits from Claude's stronger analysis.

- **`noop` is always in `safe-outputs`** and `{{#runtime-import shared/noop-reminder.md}}`
  appears at the bottom of every workflow body. Both are required — see dossier pitfall #1.

- **Minimal permissions** throughout. `contents: read` is the default;
  write permissions are added only where a specific safe-output requires them.

- **`checkout: false`** is used on event-driven workflows that read only GitHub
  API data (triage, moderation, welcome). Saves 30–60 s per run.

- **`lock-for-agent: true` is nested under its event trigger** (`on: issues: lock-for-agent: true`),
  not at the top level. Top-level placement is silently ignored by the gh-aw compiler.

---

*Updated by Vasquez (Workflow Engineer) — QA pass 2026-05-28*
