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

_No entries yet._
