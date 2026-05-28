# Vasquez — History

## Project Context
- **Project:** gh-aw-hackathon
- **Owner:** Marco Olivo
- **Format:** What The Hack (WTH) challenge-based hackathon
- **Tech stack:** GitHub Agentic Workflows (gh-aw), GitHub Actions, GitHub Pages

## gh-aw Technical Reference
- **CLI:** `gh aw add`, `gh aw run`, `gh aw logs`, `gh aw audit`, `gh aw compile`
- **Workflow file:** Markdown with YAML frontmatter → compiled to `.lock.yml` (SHA-pinned, sandboxed)
- **Frontmatter keys:** `on`, `permissions`, `safe-outputs`, `max-effective-tokens`, `engines`, `agent`
- **Sandbox:** Agent Workflow Firewall (AWF) controls network egress; no secrets in agent process
- **Safe outputs:** Actions the agent can propose — validated before applied: `create-issue`, `create-pr`, `create-comment`, `update-file`, `add-label`, `request-review`
- **Triggers:** `schedule: daily/hourly`, `issue_comment: ["/command"]`, `push`, `pull_request`, `workflow_dispatch`
- **Companion projects:** `gh-aw-firewall` (AWF), `gh-aw-mcpg` (MCP Gateway), `gh-aw-actions` (shared Actions library)
- **Releases:** Versions 0.68.4–0.71.3 are retired (billing bug) — use latest

## Repo Structure to Build
```
.github/
  workflows/           # compiled .lock.yml workflows
  ISSUE_TEMPLATE/      # submission template, bug report, etc.
  labels.yml           # label definitions
docs/ or Student/      # WTH challenge content (served as GitHub Pages)
Coach/                 # Coach solution guides (not on Pages)
```

## Team
- Ripley — Lead
- Hudson — DevRel
- Vasquez (me) — Workflow Engineer
- Hicks — Events & QA
- Bishop — Web & Design
- Scribe — Session logger
- Ralph — Work monitor

## Learnings

**See `history-archive.md` for detailed Wave A (Devcontainer, 14 Sample Solutions, QA Pass) and Sprint 1–2 notes.**

## 2026-05-28 Sprint 2–3 Housekeeping (Scribe)

**Session:** Merged 5 agent inbox decisions into decisions.md, archived old entries, created orchestration logs.

**Agents completed:**
- ripley-3 (Sprint 2): Time-budget reconciliation
- hicks-3 (Sprint 2): MC kickoff script, completion awards, submission evidence fields
- vasquez-4 (Sprint 2): validate-submission workflow, coaches demo section
- hudson-4 (Sprint 3): Challenges 2-06, 3-06 with Student/Coach READMEs
- vasquez-6 (Sprint 3): Sample solutions 2-06, 3-06, 3-05 multi-repo extension

**Action:** 5 commits staged for Sprint 2 + 3 curriculum + housekeeping.

