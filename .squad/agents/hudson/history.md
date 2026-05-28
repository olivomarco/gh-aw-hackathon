# Hudson — History

## Project Context
- **Project:** gh-aw-hackathon
- **Owner:** Marco Olivo
- **Format:** What The Hack (WTH) — challenge-based learning, squads of 3-5, no step-by-step
- **WTH Structure:**
  - `Student/` folder: challenge files (`ChallengeXX.md`) with description, goals, success criteria, tips
  - `Coach/` folder: solution guides (`SolutionXX.md`) with answers, hints to give (not full solutions)
  - `README.md`: hack overview, prerequisites, learning objectives, participant guide
  - Presentations/lectures per challenge group
- **Tech:** gh-aw — markdown frontmatter + natural language body → compiled `.lock.yml` GitHub Action
- **Key gh-aw concepts:**
  - Frontmatter: `on` (triggers), `permissions`, `safe-outputs`, `max-effective-tokens`, `engines`
  - Safe output types: `create-issue`, `create-pr`, `create-comment`, `update-file`
  - Triggers: `schedule`, `issue_comment` (slash commands), `push`, `pull_request`, manual
  - Supported engines: `copilot`, `claude`, `codex`, `gemini`
- **Site:** GitHub Pages — challenge content becomes a navigable visual site (Bishop handles the site, Hudson owns the content)

## Team
- Ripley — Lead
- Hudson (me) — DevRel
- Vasquez — Workflow Engineer
- Hicks — Events & QA
- Bishop — Web & Design
- Scribe — Session logger
- Ralph — Work monitor

## Learnings

### DevContainer Setup Guide (2026-05-28)
- Created `docs/getting-started/devcontainer-setup.md` — participant-facing guide for environment setup
- Two-path approach: GitHub Codespaces (recommended) and VS Code + Docker local
- Included: rationale, step-by-step paths, pre-installed tools table, first steps (gh auth, verify gh-aw, clone repo, smoke test), 4 common troubleshooting issues, help channels
- Tone: friendly, concise, no condescension. Code blocks for every command. Targets beginners to intermediate GitHub Actions users
- Scope decision: Kept troubleshooting minimal (4 issues) vs. exhaustive; focused on unblocking participants quickly rather than deep diagnostics

### Challenge 00: Setup & Hello, Agent (2026-05-28)
- Created `challenges/00-setup/Student/README.md` and `challenges/00-setup/Coach/README.md` — WTH format entry-point challenge
- Student file: warm, goal-oriented language; emphasizes the write → compile → run → observe loop; success criteria include compiled `.lock.yml` and verified issue creation
- Coach file: confidence-building focus; 6 common pitfalls with coaching responses; sample solution uses `engine: copilot` (free, default); time breakdown and extension ideas for fast squads
- Key format decisions: Frontmatter only includes essential keys (on, permissions, safe-outputs, engines); body is natural language instructions, no special syntax; success criteria are verifiable (issue exists, title has prefix, lock.yml generated)
- Tone: Student file is encouraging ("You've got this"); Coach file is matter-of-fact and practical ("Do not let squads get stuck >20 min")
- Sample solution: 20-line workflow demonstrating minimal viable frontmatter, read-only permissions + safe-outputs pattern, Copilot engine

## 2026-05-28: Kickoff milestone commit — Challenge 00 (WTH format, Student + Coach docs) complete (merged into decisions.md); next: Challenges 1-14 authoring
