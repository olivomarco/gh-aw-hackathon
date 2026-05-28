# 🚀 Agentic Workflows Hackathon

**Build AI-powered automation with nothing but Markdown.**

Write natural language workflows that compile to GitHub Actions — no YAML wrestling, no boilerplate. Just describe what your agent should do, and ship it. Triage issues, review PRs, generate reports, orchestrate multi-step pipelines — all with `gh-aw` and the AI engine of your choice.

---

## What You'll Build

Participants create **agentic workflows** — Markdown files that describe automation in plain English and compile to production-ready GitHub Actions. You'll work with:

- **Scheduled agents** — workflows that run on cron and report back
- **Event-driven responders** — react to issues, PRs, comments, and pushes
- **Slash commands** — custom `/commands` that trigger complex operations
- **Multi-workflow systems** — coordinated agents that talk to each other via outputs and triggers

**AI Engines available:** GitHub Copilot · Claude (Anthropic) · Codex (OpenAI) · Gemini (Google)

---

## Format

**What The Hack (WTH)** — challenge-based, squad-driven, coach-guided.

- **Squads:** 3–5 participants per team
- **Coaches:** Guide, don't solve. Ask questions, point to docs, unblock — never type code for a squad
- **Challenges:** Progressive difficulty. No step-by-step instructions. Success criteria are clear; the path is yours to find

### Timeline: Single Day (8 hours)

| Block | Duration | Activity |
|-------|----------|----------|
| Opening | 45 min | Welcome, format brief, squad formation, environment setup |
| Track 1 | 90 min | "Hello, Agent" — first workflows |
| Break | 15 min | |
| Track 2 | 120 min | "Repo Concierge" — event-driven automation |
| Lunch | 45 min | |
| Track 3 | 150 min | "Continuous Intelligence" — multi-workflow systems |
| Judging | 45 min | Squad demos + scoring |
| Closing | 30 min | Awards, retro, wrap |

> See [docs/program/timeline.md](docs/program/timeline.md) for the full run-of-show.

---

## Tracks & Challenges

### Track 1 — Hello, Agent 🟢

*First steps: scheduled workflows, safe outputs, basic triggers.*

| # | Challenge | What You'll Do |
|---|-----------|----------------|
| 1-01 | Morning Briefing | Create a scheduled workflow that posts a daily summary to an issue |
| 1-02 | Safe & Sound | Add safe-outputs validation to prevent unreviewed automated changes |
| 1-03 | The Watcher | Build a workflow triggered by push events that reports file changes |
| 1-04 | Label Maker | Auto-label issues based on title keywords using an AI engine |

### Track 2 — Repo Concierge 🟡

*Event-driven: issue triage, PR review, slash commands.*

| # | Challenge | What You'll Do |
|---|-----------|----------------|
| 2-01 | Triage Bot | Automatically categorize and prioritize incoming issues |
| 2-02 | Review Buddy | Generate a first-pass PR review with inline suggestions |
| 2-03 | Slash & Burn | Implement a custom `/deploy` slash command |
| 2-04 | Stale Patrol | Detect and close stale issues with a polite warning workflow |
| 2-05 | Welcome Wagon | Greet first-time contributors with setup instructions and context |

### Track 3 — Continuous Intelligence 🔴

*Multi-workflow coordination, MCP tools, custom engines, advanced patterns.*

| # | Challenge | What You'll Do |
|---|-----------|----------------|
| 3-01 | The Relay | Chain two workflows — one triages, one fixes |
| 3-02 | Context Engine | Use MCP tools to inject external context into workflow decisions |
| 3-03 | Engine Swap | Build the same workflow for two different AI engines and compare |
| 3-04 | The Overseer | Create a meta-workflow that monitors other workflows' health |
| 3-05 | Ship It | End-to-end: issue → triage → branch → fix PR → review → merge |

---

## Prerequisites

1. GitHub account with Copilot access (free tier works)
2. Familiarity with GitHub (issues, PRs, Actions concepts)
3. **Environment setup:** Follow the [Devcontainer Setup Guide](docs/getting-started/devcontainer-setup.md)

No prior experience with `gh-aw` or GitHub Actions YAML required.

---

## Resources

- [gh-aw Documentation](https://github.com/github/gh-aw)
- [Judging Rubric](docs/program/judging-rubric.md)
- [Timeline & Run-of-Show](docs/program/timeline.md)
- [Coach Handbook](coaches/README.md)

---

## Code of Conduct

All participants, coaches, and organizers are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Be excellent to each other.

## License

This project is licensed under the [MIT License](LICENSE).
