# Squad Decisions

## Active Decisions

### Decision: devcontainer configuration for gh-aw Hackathon

**Author:** Vasquez  
**Date:** 2026-05-28  
**Status:** Accepted

#### Context
Participants need a reproducible development environment to run and develop gh-aw workflow challenges without "works on my machine" friction. We are building a devcontainer that works with GitHub Codespaces and VS Code Dev Containers.

#### Decisions

**1. Base Image: `mcr.microsoft.com/devcontainers/universal:2`**
- Chosen over base:ubuntu-24.04 + features-only approach
- Universal image ships Node LTS, Python 3, Go, and standard CLI tooling pre-baked
- Pinned to major version `2` (not `:latest`) for reproducible rebuilds
- Trade-off accepted: ~6 GB image size (pre-cached on Codespaces)

**2. Dev Container Features for Language Tooling**
- `ghcr.io/devcontainers/features/github-cli:1` — gh CLI at known-recent version
- `ghcr.io/devcontainers/features/node:1` — Node LTS override capability
- `ghcr.io/devcontainers/features/python:1` — Python 3.12 explicit pin
- `ghcr.io/devcontainers/features/go:1` — Go latest
- Features execute during image build (cacheable); `apt-get` in postCreate would block on every environment creation

**3. gh-aw Extension Install Method: `postCreate.sh`**
- Requires authenticated `gh` session — not available at image build time
- Extension ships frequently; install at container-create time ensures recent release
- `postCreate.sh` checks `gh extension list` before installing (idempotent)

#### Files Created
- `.devcontainer/devcontainer.json`
- `.devcontainer/postCreate.sh`
- `.devcontainer/README.md`

---

### Decision: Hackathon Program Design

**Author:** Ripley (Lead)  
**Date:** 2026-05-28  
**Status:** Accepted

## Context

We need a complete program structure for the gh-aw hackathon: format, tracks, challenges, judging, and timeline. This decision defines the scope that all other team members build against.

## Decisions

### 1. Format: Single Day (8 hours)

**Choice:** Single-day event, 09:00–17:00.

**Why:** 
- Lower commitment barrier for participants (especially internal/corporate audiences)
- Forces tight scope on challenges — no rabbit holes
- Coaches can commit to one day more easily than multi-day
- Energy stays high; no day-2 dropout problem
- Multi-day can be offered as a "stretch" variant later by simply splitting tracks across days

### 2. Three Tracks, Escalating Difficulty

| Track | Name | Difficulty | Time |
|-------|------|-----------|------|
| 1 | Hello, Agent | Beginner (🟢) | 90 min |
| 2 | Repo Concierge | Intermediate (🟡) | 120 min |
| 3 | Continuous Intelligence | Advanced (🔴) | 150 min |

**Progression logic:** Track 1 teaches the atoms (schedule, trigger, safe-outputs). Track 2 combines them into useful automation. Track 3 chains them into systems.

### 3. Challenge List (14 total)

**Track 1 — Hello, Agent (4 challenges):**
1. **1-01 Morning Briefing** — Scheduled workflow posts daily summary to issue
2. **1-02 Safe & Sound** — Add safe-outputs validation to prevent unreviewed changes
3. **1-03 The Watcher** — Push-triggered workflow reports file changes
4. **1-04 Label Maker** — AI-powered auto-labeling of issues by title

**Track 2 — Repo Concierge (5 challenges):**
5. **2-01 Triage Bot** — Auto-categorize and prioritize incoming issues
6. **2-02 Review Buddy** — AI first-pass PR review with inline suggestions
7. **2-03 Slash & Burn** — Custom `/deploy` slash command
8. **2-04 Stale Patrol** — Detect and close stale issues with warning
9. **2-05 Welcome Wagon** — Greet first-time contributors

**Track 3 — Continuous Intelligence (5 challenges):**
10. **3-01 The Relay** — Chain two workflows (triage → fix)
11. **3-02 Context Engine** — MCP tools for external context injection
12. **3-03 Engine Swap** — Same workflow, two AI engines, compare results
13. **3-04 The Overseer** — Meta-workflow monitoring other workflows' health
14. **3-05 Ship It** — End-to-end: issue → triage → branch → fix PR → review → merge

### 4. Judging Weights

| Category | Weight |
|----------|--------|
| Challenge Completion | 40% |
| Creativity & Design | 20% |
| Safety & Guardrails | 20% |
| Code Quality | 10% |
| Documentation | 10% |

**Rationale:** Completion is king (it's a hack — ship it). Safety gets equal weight to creativity because responsible automation is a core gh-aw value. Code quality and docs are important but shouldn't gate creative hacking.

### 5. AI Engine Policy

**Decision:** All four engines are allowed — GitHub Copilot, Claude, Codex, Gemini.

**Rationale:**
- Copilot is free with GitHub — lowest barrier, default recommendation
- Participants with API keys for Claude/Codex/Gemini should be free to use them
- Challenge 3-03 explicitly requires using multiple engines
- No engine gives an unfair advantage in this format (workflows are the output, not raw code)

### 6. @copilot as Participant Tool

**Decision:** Yes, @copilot (GitHub Copilot in the IDE) is allowed during the hackathon.

**Rationale:** It's free with GitHub, it's a natural part of the development flow, and disabling it would be both impractical and contrary to the spirit of building agentic workflows.

## Files Created

- `README.md` — Program brief and challenge overview
- `docs/program/judging-rubric.md` — Scoring framework
- `docs/program/timeline.md` — Run-of-show
- `CODE_OF_CONDUCT.md` — Contributor Covenant based
- `challenges/track-1-hello-agent/README.md` — Track 1 overview
- `challenges/track-2-repo-concierge/README.md` — Track 2 overview
- `challenges/track-3-continuous-intelligence/README.md` — Track 3 overview
- `coaches/README.md` — Coach handbook

## What This Unlocks

- Hudson can now write challenge content against this backlog (14 challenges)
- Hicks can plan judging logistics using the rubric and timeline
- Bishop can structure the GitHub Pages site around tracks and challenges
- Vasquez can create example workflow repos matching the challenge specs

---

### Decision: Bishop — Site Scaffold

**Author:** Bishop (Web & Design)  
**Date:** 2026-05-28  
**Status:** Accepted

## Context

Scaffold the GitHub Pages site for the gh-aw Hackathon. Goal: "very cool" — clean, developer-friendly, dark-mode-supporting site with a challenge showcase that motivates participants to build.

## Decisions

### 1. Jekyll — custom theme, no remote theme

**Decision:** Use Jekyll with fully custom layouts (`_layouts/`, `_includes/`). No remote theme dependency.

**Rationale:**
- Remote themes (e.g., `just-the-docs`, `minima`) impose structural constraints and require version pinning
- A custom theme gives full control over the "very cool" visual target
- GitHub Pages renders Jekyll natively; `actions/jekyll-build-pages` supports custom Gemfile
- Zero runtime JavaScript frameworks — vanilla JS only (theme toggle, mobile nav, smooth scroll)

**Trade-off accepted:** More upfront HTML/CSS to write, but no theme version-drift or dependency breakage risk.

### 2. Color Palette — GitHub Dark + Purple Accent

**Decision:** Dark-first color system based on GitHub's dark palette, with `#7c3aed` purple accent.

| Role | Dark | Light |
|---|---|---|
| Background | `#0d1117` | `#ffffff` |
| Surface | `#161b22` | `#f6f8fa` |
| Border | `#30363d` | `#d0d7de` |
| Text | `#e6edf3` | `#1f2328` |
| Text muted | `#8b949e` | `#636c76` |
| **Accent** | **`#7c3aed`** | **`#7c3aed`** |
| Accent text | `#a78bfa` | `#6d28d9` |

**Why purple:** Signals "AI/ML" without defaulting to the overused blue. Distinguishes the site from generic GitHub-green themes. High contrast on dark background (~5.8:1).

**Track badge colors:**
- Track 1 (AI Workflows): `#7c3aed` purple
- Track 2 (Safe Outputs): `#2ea043` green
- Track 3 (MCP Integration): `#1f8ec4` blue

### 3. Jekyll Collections for Challenges and Tracks

**Decision:** Use Jekyll collections `challenges` (source: `_challenges/`) and `tracks` (source: `_tracks/`).

**Rationale:**
- Collections render `.md` files as HTML pages automatically with assigned layouts
- `_challenges/` → renders at `/challenges/<slug>/` with `challenge` layout
- `_tracks/` → renders at `/tracks/<slug>/` with `track` layout
- Front matter (`difficulty`, `time`, `tags`, `track`, `order`) drives card rendering without template duplication

**Coordination note for Ripley:** Challenge content files go in `_challenges/`. The Jekyll convention requires the leading underscore; output URLs are `/challenges/` without it. This differs from the `challenges/` suggestion in the brief — document this clearly in `_config.yml` and `assets/README.md`.

### 4. GitHub Pages Deploy — Actions Workflow

**Decision:** Use `.github/workflows/pages.yml` with official actions:
- `actions/checkout@v4`
- `actions/configure-pages@v5`
- `actions/jekyll-build-pages@v1` (supports custom Gemfile)
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

**Rationale:** `jekyll-build-pages` runs Jekyll in a supported container with Bundler, allowing custom gems beyond the `github-pages` whitelist if needed. No separate build server or CI complexity required.

**Trigger:** Push to `main` or manual `workflow_dispatch`.

### 5. Theme Preference — Dark Default, Light Available

**Decision:** Default to `data-theme="dark"` on `<html>`. User can toggle; preference stored in `localStorage`. Respects `prefers-color-scheme` if no preference stored.

**Rationale:** Developer audience skews dark-mode. Dark-first ensures the "very cool" aesthetic is the default experience.

## Files Created

| File | Purpose |
|---|---|
| `_config.yml` | Jekyll configuration, collections, plugins |
| `Gemfile` | Ruby deps with `github-pages` gem |
| `.github/workflows/pages.yml` | Build + deploy workflow |
| `index.md` | Landing page with hero, track cards, how-it-works, CTA |
| `challenges.md` | All-challenges index page |
| `_layouts/default.html` | Base HTML layout with OG tags, favicon, scripts |
| `_layouts/challenge.html` | Challenge page with badges, breadcrumb, prev/next nav |
| `_layouts/track.html` | Track landing page listing challenge cards |
| `_includes/header.html` | Sticky header, mobile nav toggle, theme toggle |
| `_includes/footer.html` | Site footer |
| `_includes/challenge-card.html` | Reusable challenge card component |
| `assets/css/style.scss` | Full custom SCSS with CSS variables, responsive grid |
| `assets/js/main.js` | Theme toggle, mobile nav, smooth scroll |
| `assets/favicon.svg` | 32×32 SVG mark |
| `assets/og-image.svg` | 1200×630 OG/social image |
| `assets/README.md` | Contributor guide for theme maintainers |
| `_tracks/*.md` | Three placeholder track pages |
| `_challenges/00-setup.md` | Placeholder challenge 00 |

---

### Decision: Challenge 00 — Setup & Hello, Agent

**Date:** 2026-05-28  
**Author:** Hudson (DevRel)  
**Status:** Accepted  

## Context

Challenge 00 is the entry-point for every squad in the gh-aw Hackathon. It must:
- Verify the participant's environment works (devcontainer or local)
- Walk them through their first gh-aw workflow end-to-end
- Build confidence before harder challenges
- Serve as the smoke test for the entire event

The challenge is delivered in **What The Hack (WTH) format** with separate files for students (challenge) and coaches (solution + coaching guidance).

## Decisions

### 1. Entry Point: All Squads Complete Challenge 00 First
- No prerequisites beyond GitHub account + Codespaces/Docker access
- Prerequisite links to existing `docs/getting-started/devcontainer-setup.md`
- Success criteria are simple and verifiable (compiled `.lock.yml` exists, issue created)

### 2. Workflow Complexity: Minimal Viable Example
- Frontmatter includes only essential keys: `on`, `permissions`, `safe-outputs`, `engines`
- Sample solution uses `create-issue` safe-output (easiest first safe-output type)
- Body is plain natural language — no special syntax, no code blocks
- Suggested permissioning: `permissions: contents: read` (read-only, safe-outputs handles writes)

### 3. AI Engine: Copilot as Default Recommendation
- Sample solution and default guidance use `engine: copilot`
- Rationale: Copilot is free with GitHub account, no extra API keys required, most participants have access
- Challenge text is engine-agnostic ("any supported AI engine"), allowing squads to pick Claude, Codex, or Gemini if they prefer
- Coach guide mentions "if they can't use Copilot, escalate to Ripley" for credential debugging

### 4. Success Criteria: Verified Observable Results
- Must have: `.md` file exists with valid frontmatter
- Must have: `.lock.yml` generated by `gh aw compile`
- Must have: Workflow run completed (visible in Actions tab)
- Must have: GitHub issue created with correct title prefix
- Criterion avoids: Step-by-step process verification; focuses on outcomes instead

### 5. WTH Format Split
- **`challenges/00-setup/Student/README.md`** — Challenge as participant sees it
  - Goals, background, challenge description, success criteria, tips, references, help
  - No step-by-step solutions; hints only
  - Warm, encouraging tone ("You've got this")
- **`challenges/00-setup/Coach/README.md`** — Coach guide
  - Expected outcomes, common approaches, 6 common pitfalls + responses
  - Sample solution (only share if squad stuck >30 min)
  - Time breakdown, extension ideas, debugging checklist
  - Matter-of-fact tone; practical coaching prompts

### 6. Coaching Philosophy
- Emphasis: Build confidence, not test knowledge
- Rule: No squad gets stuck >20 minutes without a hint
- Coaches guide, not solve
- Celebrations: When issue appears, make a big deal of it — "You just had an AI execute code and create a real GitHub issue"

## Rationale

**Why Copilot as default:**
- Removes friction: No API key hunting, no account signup required
- Levels the playing field: All GitHub users have it
- Builds confidence: Fast, reliable results (vs. troubleshooting missing credentials)
- Flexibility: Guide mentions alternatives; squads can swap engines

**Why minimal frontmatter:**
- Reduces cognitive load for first workflow
- Allows squads to focus on the gh-aw loop (write → compile → run) instead of syntax memorization
- Safe-outputs pattern (read-only code, safe-outputs do writes) is core to gh-aw; Challenge 00 showcases it
- Easier to debug: fewer configuration knobs to turn

**Why observable results (issue creation):**
- Builds trust: "I wrote markdown, it compiled, and it created a real GitHub issue"
- Gives coaches a clear success marker (issue exists in repo)
- Sets up for later challenges: Squads will create comments, PRs, and files with similar safe-outputs patterns

**Why no step-by-step instructions in student file:**
- WTH format principle: Squads figure it out, coaches guide
- Builds problem-solving muscle: "Compile with `gh aw compile`" is better than "Run this exact command"
- Scalable coaching: Coaches ask "Have you compiled yet?" instead of repeating steps

## Files Created

- `challenges/00-setup/Student/README.md` (4,708 bytes)
- `challenges/00-setup/Coach/README.md` (10,914 bytes)

Both files include:
- Cross-references to existing docs (`docs/getting-started/devcontainer-setup.md`, gh-aw official docs)
- Markdown structure suitable for GitHub Pages rendering (Bishop will style)
- No hardcoded solutions in student file (coach file only)

---

### Decision: Participant Journey Documents & Submission Process

**Author:** Hicks (Events & QA)  
**Date:** 2026-05-28  
**Status:** Accepted  

## Context

The gh-aw Hackathon needs operational guides for participants from registration through submission and feedback. The participant journey spans:
1. Understanding what to expect (handbook)
2. Knowing how to submit work (submission guide)
3. Getting help along the way (issue templates)
4. Coaches understanding their role (coach handbook)

Decision needed on:
- Submission mechanism (PR vs. issue)
- Submission structure (required fields, one per squad?)
- Submission template delivery (GitHub issue form or manual?)
- Coach guidance (Socratic method, escalation paths)

## Decisions Made

### 1. Submission Mechanism: PR Recommended, Issue Accepted

**Decision:** Offer both GitHub PR and issue submission, with PR marked as recommended.

**Rationale:**
- **PR (recommended):** Code review flow, trackable changes, judges see work in context, easier for GitHub-native workflow.
- **Issue (acceptable):** Lower barrier for squads uncomfortable with PRs, simpler for linking to fork. Requires fork to be public.
- **Why both:** Some participants prefer simplicity; some prefer structured review flow. One method doesn't fit all.

**Implementation:**
- submission-guide.md explains both paths equally clearly.
- submission.yml issue template works for Option B squads.
- Coaches encourage PR but accept issues.

### 2. One Submission Per Squad (Not Per Individual)

**Decision:** Enforce one submission per squad, listing all members and all completed challenges within that submission.

**Rationale:**
- **WTH format is collaborative:** Submission should reflect squad work, not individual contributions.
- **Simpler for judging:** Judges score one solution per squad, not vote-tallies across individuals.
- **Clearer accountability:** Squad name + members prevent freeloading; all squad mates are named.
- **Supports partial completion:** Squad can submit partial work; judges score what's completed.

**Implementation:**
- submission-guide.md and template emphasize "one per squad."
- Submission form requires all members listed, all challenges claimed.
- Coaches help squads decide what to submit (even incomplete work).

### 3. Submission Template: GitHub Form (YAML) + Optional PR Body Variant

**Decision:** GitHub issue template (submission.yml) as primary form. Squads using PR option paste the same template into PR body.

**Rationale:**
- **Consistency:** All submissions follow the same schema, even if submitted via different channels.
- **Required field enforcement:** GitHub form validates required fields before submit (no typos, no blanks).
- **Auto-labeling:** Form auto-adds `submission` label, coaches don't need to manually tag.
- **Accessible:** Form is easier than free-text for participants unsure what to include.

**Required Fields:**
- Squad name
- Members (GitHub handles, one per line)
- Tracks attempted (checkboxes)
- Challenges completed (text, with brief descriptions)
- Reflection (200 words max, must disclose AI tool usage)
- Optional: demo/recording link
- Checklist (all items required: agreement, testing, CoC reviewed, AI disclosure)

**Why 200-word reflection limit:**
- Shows learning without asking for essays.
- Judges have time to read them.
- Encourages concise, focused reflection.
- Forces honesty about process (struggles, not just wins).

### 4. AI Tool Disclosure Requirement

**Decision:** Mandatory disclosure of AI tool usage in submission reflection. No ban on AI; transparency required.

**Rationale:**
- **Learning focus:** If squad used ChatGPT to debug, that's learning—if they understand the code.
- **Attribution:** Similar to citing sources; fair to disclose.
- **Fairness in judging:** Judges can contextualize how much of solution was AI-assisted.
- **Role modeling:** Normalize responsible AI use (not hiding it).

**Implementation:**
- submission-guide.md explains (use ChatGPT → disclose in reflection).
- coach-handbook.md scenario: coaches ask "Do you understand what your AI-generated code does?"
- Submission form placeholder shows example disclosure.

### 5. Submission Deadline: {TBD} Placeholder

**Decision:** Use `{TBD: see timeline.md}` in all participant docs instead of hardcoding deadline.

**Rationale:**
- **Ripley owns timeline.md:** Not our decision to make. Avoids conflicts.
- **Single source of truth:** All references point to timeline.md. One place to update.
- **Participant-friendly:** Handbook tells them "See timeline.md for all times."

**Implementation:**
- submission-guide.md uses `{TBD: see [timeline.md](timeline.md)}` for deadline.
- participant-handbook.md references timeline.md for daily flow, deadline, schedule.

### 6. Code of Conduct: Contributor Covenant 2.1 (Ripley Creates)

**Decision:** Acknowledge CODE_OF_CONDUCT.md will exist (Ripley creates it). Reference it from participant docs; don't create ourselves.

**Rationale:**
- **Ripley owns CoC:** Avoid duplication and conflicts.
- **Standard approach:** Contributor Covenant 2.1 is recognized, defensible, short.
- **Our role:** Reference it, ensure participants read it before submitting, escalate violations.

**Implementation:**
- participant-handbook.md links to CODE_OF_CONDUCT.md and summarizes TL;DR.
- coach-handbook.md references it in escalation guidance.
- submission template includes checklist item: "We have reviewed the Code of Conduct."

### 7. Communication Channels: Discord (Real-Time) + Discussions (Async) + Coaches

**Decision:** Three channels for participant support:
1. **GitHub Discussions** — async, searchable, broad audience.
2. **Discord** — real-time, high energy, social.
3. **Coaches** — direct 1:1 or small-group guidance.

**Rationale:**
- **Different use cases:** Quick Q&A (Discord), searchable knowledge base (Discussions), personalized help (coach).
- **Less bottleneck:** Coaches don't handle every question. Squad-mates and discussions help each other.
- **Reduces isolation:** Async discussion shows everyone is learning together.

**Implementation:**
- participant-handbook.md explains all three channels + when to use each.
- help-request.yml template guides to Discussions first (async), Discord second.
- Coaches monitor Discord during event day, monitor Discussions asynchronously.

### 8. Coach Handbook: Socratic Method + Escalation Paths

**Decision:** Coach handbook emphasizes Socratic questions (guide not solve) + clear escalation paths for crisis situations.

**Rationale:**
- **WTH format:** Coaches guide, participants learn. Giving answers defeats the purpose.
- **Scalable support:** Socratic questions scale; direct answers don't.
- **Escalation clarity:** Coaches know when to hand off (squad distress, CoC violation, tech failure, off-scope).

**Escalation Matrix:**
- **Squad distress (morale, conflict):** Organiser support.
- **CoC violation:** Immediate escalation to organiser.
- **Environment broken:** Tech team.
- **Challenge bug:** Tech team + alternate challenge offered.
- **Off-scope question:** Acknowledge, redirect, chat after event.

**Pre-Event Prep:**
- Read track README + challenge READMEs.
- Run Challenge 00 yourself (spot setup issues early).
- Test environment (gh-aw, fork, workflow execution).
- Review submission + judging process.
- Learn CoC + escalation paths.

---

### Directive: 2026-05-28T14:54:45+01:00 — Site Visual Quality Bar

**Author:** Marco Olivo (via Copilot)  
**Date:** 2026-05-28  
**Status:** Captured

**What:** "Create an awesome website for GitHub Pages that will guide users into the hackathon and the challenges." Emphasis on **awesome** — visually striking, polished, not just functional. This restates and elevates the earlier "very cool" directive from the kickoff. Bishop owns the polish bar. The site must visibly communicate that this is a hackathon about cutting-edge agentic workflows — dark-first, bold typography, interactive challenge cards, smooth navigation between tracks, hero animation if it can be done with vanilla CSS/JS (no heavy JS frameworks).

**Why:** Marco wants the site to be the marketing-grade entry point. First impression sets participant excitement.

**Status:** Directive captured. Bishop's scaffold pass is in flight from the previous batch; a follow-up polish pass will land this bar after the scaffold completes.

---

### Scope & Content Decisions: DevContainer Setup Guide

**Date:** 2026-05-28  
**Author:** Hudson (DevRel)  
**Document:** `docs/getting-started/devcontainer-setup.md`

#### Scope Decisions Made

**1. Two-Path Approach (Not One)**
- Offer both GitHub Codespaces (recommended) and local Docker + VS Code paths
- Codespaces ideal for hackathon day but some participants prefer local or have corporate restrictions
- Codespaces marked as "recommended" to guide most participants there

**2. Troubleshooting: 4 Issues, Not Exhaustive**
- 4 most common blockers (gh aw not found, auth failures, permissions, Docker memory)
- Goal is to unblock quickly, not catalog every possible failure mode
- Keeps guide scannable (~800 words)

**3. Smoke Test Scope**
- `gh aw run examples/hello-world.md --dry-run` as validation test
- Confirms three things: gh CLI works, gh aw extension loads, markdown parsing works
- `--dry-run` avoids AI engine credentials requirement

**4. No Deep Dive into Safe Outputs / Frontmatter**
- Mention safe outputs in troubleshooting but don't explain gh-aw syntax
- Setup guide, not gh-aw primer
- Participants learn gh-aw through challenge walkthroughs

**5. Help Channels: Discord + Discussions + Coaches**
- Discord = real-time for hackathon day
- Discussions = async, searchable
- Coaches = human touch during live event

#### Not Included (Intentionally)
- Container customization
- Advanced GitHub CLI auth details
- Offline Docker image builds
- Resource requirements
- Multi-user Codespaces scenarios

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
