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

## 2026-05-28 Sprint 3 — Install Fix + Track 4 Samples (vasquez-7)

**Task A: Install command sweep**
- Replaced all `gh extension install github/gh-aw` references with `curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash` across:
  - `.devcontainer/postCreate.sh` — also updated detection check from `gh extension list | grep -q "gh-aw"` to `command -v gh-aw || gh aw --version`; updated header comment
  - `.github/workflows/validate-submission.yml` — removed `|| true` fallback (curl script handles its own errors); removed `GH_TOKEN` env var (no longer needed for install)
  - `docs/getting-started/devcontainer-setup.md` — updated troubleshooting section + "What's Pre-Installed" table + intro sentence to say "CLI" not "extension"
  - `challenges/00-setup/Coach/README.md` — updated Pitfall 2 recovery steps

**Task B: Track 4 sample solutions**
- Created `/coaches/sample-solutions/track-4/` with 8 complete gh-aw workflows + README index
- Sample files: 4-01 through 4-08 covering triage, CI doctor, doc updater, unbloat, testify causal chain, test improver, security SLA, malicious code scan
- All samples follow the 2-05-welcome-wagon.md header comment format with source URL, compile cost, run cost
- Simplified from production originals: no `min-integrity`, no exotic flags, 30-min comprehension target

**Learnings:**
- `command -v gh-aw` is the right idiom for standalone CLI detection (not `gh extension list`)
- Causal chain pattern (4-05) is a key teaching moment: audit workflow creates issues only; a second workflow implements
- The `create-pr` vs `create-issue` safe-output choice encodes human-review expectations — make this explicit in samples
- `checkout: false` is always worth noting when a workflow only needs API data (no repo code)


---

## Wave E Completion — 2026-05-28

**Delivered:**
- Canonical install command fix (4 files updated: .devcontainer/postCreate.sh, validate-submission.yml, devcontainer-setup.md, Challenge 00 Coach README)
- Detection idiom updated: `gh extension list` → `command -v gh-aw`
- Track 4 sample solutions (9 files: 8 challenge walkthroughs + README)

**Install standardization:** All `gh aw` setup instructions now route through `curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash`. Single source of truth for entry point.

**Coach sample solutions:** Follow Track 2 pattern (header block + YAML + Markdown body). 30-minute comprehension target. No min-integrity fields or exotic flags — standard `engine: copilot` throughout.

**Cross-team sync:** Hudson built challenges; Bishop created Jekyll infrastructure; Hicks updated program docs.

---
