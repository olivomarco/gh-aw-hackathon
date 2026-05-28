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

### 2026-05-28 — Devcontainer Configuration

**What was built:**
- `.devcontainer/devcontainer.json` — full devcontainer config for gh-aw Hackathon
- `.devcontainer/postCreate.sh` — idempotent setup script: installs `gh aw` extension, checks auth, prints welcome banner
- `.devcontainer/README.md` — maintainer technical notes (not participant docs)

**Key decisions:**
- Base image: `mcr.microsoft.com/devcontainers/universal:2` (pinned major version). Chosen for pre-baked Node/Python/Go runtimes; faster first-run for participants. Fallback is `base:ubuntu-24.04` + features if size is a concern.
- Dev Container Features used for `gh`, node, python, go — cacheable layer, clean version overrides.
- `gh aw` extension installed in `postCreate.sh` (not image build) because it requires `gh` auth and releases frequently.
- `*.lock.yml` mapped to `github-actions` language ID so the GitHub Actions VS Code extension provides syntax support on compiled gh-aw workflows.
- `remoteUser: codespace` — matches universal image non-root convention.

**Artifacts filed:**
- Decision: `.squad/decisions/inbox/vasquez-devcontainer.md`
- Skill: `.squad/skills/devcontainer-gh-aw/SKILL.md`
