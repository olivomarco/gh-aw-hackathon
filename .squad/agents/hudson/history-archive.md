# Hudson — History Archive (Pre-Wave A)

**Archived:** 2026-05-28  
**Reason:** Summary to keep active history <15KB

## Project Context (Kickoff)

**Project:** gh-aw-hackathon  
**Owner:** Marco Olivo  
**Format:** What The Hack (WTH) — challenge-based learning, squads of 3-5, no step-by-step

**WTH Structure:**
- `Student/` folder: challenge files with description, goals, success criteria, tips
- `Coach/` folder: solution guides with answers, hints to give
- `README.md`: hack overview, prerequisites, learning objectives
- Presentations/lectures per challenge group

**Tech:** gh-aw — markdown frontmatter + natural language body → compiled `.lock.yml` GitHub Action

**Key gh-aw concepts:**
- Frontmatter: `on` (triggers), `permissions`, `safe-outputs`, `engines`
- Safe output types: `create-issue`, `create-pr`, `create-comment`, `update-file`
- Triggers: `schedule`, `issue_comment`, `push`, `pull_request`, manual
- Supported engines: `copilot`, `claude`, `codex`, `gemini`

**Site:** GitHub Pages — challenge content becomes a navigable visual site (Bishop handles site, Hudson owns content)

## Team

- Ripley — Lead
- Hudson (me) — DevRel
- Vasquez — Workflow Engineer
- Hicks — Events & QA
- Bishop — Web & Design
- Scribe — Session logger
- Ralph — Work monitor

## Early Milestones

### DevContainer Setup Guide (2026-05-28)
- Created `docs/getting-started/devcontainer-setup.md`
- Two-path approach: GitHub Codespaces (recommended) + VS Code Docker local
- Tone: friendly, no condescension, targets beginners to intermediate users
- Included: rationale, step-by-step, pre-installed tools, troubleshooting (4 issues)

### Challenge 00: Setup & Hello, Agent (2026-05-28)
- Created Student + Coach README files (WTH entry-point)
- Student: warm, goal-oriented, emphasizes write → compile → run → observe
- Coach: confidence-building focus, 6 common pitfalls, sample solution (copilot)
- Key decisions: Essential frontmatter keys only, natural language body, verifiable success criteria
- Tone: encouraging, matter-of-fact, practical

**Kickoff milestone:** Challenge 00 complete, ready for Challenges 1-14 authoring

---

**Next active history:** See `history.md` for Wave A (2026-05-28+)
