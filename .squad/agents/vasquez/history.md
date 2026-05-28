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

### 2026-05-28 — Sample Solutions (all 14 challenges)

**What was built:**
- 14 gh-aw workflow `.md` reference solutions under `coaches/sample-solutions/`
- `coaches/sample-solutions/README.md` — coaches-only index with compile/run instructions
- `.squad/decisions/inbox/vasquez-sample-solutions.md` — architectural decisions

**Engine defaults adopted:**
- Track 1 + 2: `engine: copilot` — lowest cost, lowest latency, included in Copilot subscription
- Track 3 challenges with complex multi-step reasoning (3-04 Overseer): `engine: claude`
- 3-03 Engine Swap: all three engines (`copilot`, `claude`, `codex`) for direct comparison

**Key patterns used across all 14 solutions:**
- `{{#runtime-import shared/noop-reminder.md}}` at the bottom of every workflow body (dossier pitfall #1)
- `safe-outputs: noop:` always declared in frontmatter alongside every other safe-output
- `checkout: false` on all event-driven workflows that only read GitHub API data (2-02, 2-05)
- `lock-for-agent: true` on all event-triggered write workflows (1-04, 2-01, 2-03)
- `min-integrity: collaborator` on all slash-command workflows (2-03, 3-05)
- `file-glob` always specified in `tools: repo-memory` blocks (dossier pitfall #3)

**Multi-file challenges:**
- 3-01 The Relay: two workflows (producer + consumer) in one `.md` file, separated by dividers
- 3-03 Engine Swap: three engine variants (copilot/claude/codex) of the same workflow in one file
- 3-05 Ship It: three workflows (watcher + auditor + commander) in one `.md` file

**Compile validation status:**
- `gh aw` extension is NOT installed in this environment (only `gh` CLI is present)
- All frontmatter is syntactically valid YAML verified manually
- All `safe-outputs` keys use canonical names from the dossier
- Marco should run `gh aw compile` on each file to generate `.lock.yml`

**Reusable patterns for participants:**
- The "warn then close" two-phase stale pattern (2-04)
- The producer-consumer repo-memory chain (3-01)
- The slash-command dispatch table (2-03)
- The `assign-to-agent` bridge (3-05 Commander)

---

**2026-05-28 Wave A Complete:** 14 production-quality sample workflows delivered (Track 1-3). Pending: gh aw compile validation before event.

### 2026-05-28 — QA Pass (all 14 sample solutions)

**What was done:**
- Technical fact-check pass on all 14 workflow files + README against fetched real gh-aw source files
- Fetched 6 canonical real workflows from GitHub: `issue-triage-agent.md`, `breaking-change-checker.md`, `ai-moderator.md`, `metrics-collector.md`, `audit-workflows.md`, `workflow-generator.md`, and `q.md` (githubnext/agentics)
- All 14 files received at least one fix; README received light humaniser + structural improvements

**7 bug categories found and fixed:**

| Bug | Fixed syntax |
|-----|-------------|
| `tools: bash: allow: [list]` | `tools: bash: [list]` — list goes directly under bash, no `allow:` key |
| `user-rate-limit: per: / max:` | `max-runs-per-window: N` + `window: <seconds>` |
| `lock-for-agent: true` at top level | Must nest under the specific event in `on:` e.g. `on: issues: lock-for-agent: true` |
| `agentic-workflows: enabled: true` | `agentic-workflows:` (empty — no sub-keys) |
| `skip-bots: true` | `skip-bots: [github-actions, copilot, dependabot, renovate, github-copilot-enterprise]` |
| `min-integrity:` at top level | Must be under `tools: github: min-integrity:` |
| `noop: reason: "..."` sub-key | `noop:` only — the `reason:` sub-key is not a real field |

**Most surprising finding:** `lock-for-agent: true` silently does nothing at top level. It only takes effect when nested under the specific event trigger in the `on:` block. This was confirmed by `ai-moderator.md` which explicitly puts `lock-for-agent: true` under `on: issues:` and `on: issue_comment:` separately.

**Fields still unverified (kept with flag):**
- `safe-outputs: update-issue: allowed-state-change: closed` (2-04) — real workflows use `status:/body:` but not `allowed-state-change:`. May compile; may error. Marco to test.
- `tools: cache-memory: true` (3-02) — real `ai-moderator.md` uses a full object. Boolean shorthand not confirmed. Marco to test.

**Intentional teaching pattern confirmed:** `permissions: issues: read` combined with `create-issue` safe-outputs is correct. The safe-outputs mechanism uses a separate privileged path independent of the workflow token. Confirmed by `issue-triage-agent.md` which uses `issues: read` with `add-labels` safe-output.

**Multi-file structure note:** The triple `---` separator between workflow sections in a file is safe *between* workflows but creates an empty-frontmatter ambiguity when placed *before* the first workflow. Fixed in 3-05. Pattern: always open directly with frontmatter on the first workflow; use separators only between workflows.

**Artifacts filed:**
- Decision: `.squad/decisions/inbox/vasquez-qa-pass.md` — full per-workflow verdict, all verified fields, compile checklist

---

**2026-05-28 Wave B Complete:** QA pass done — all 14 workflows corrected, README updated, QA report filed.


**2026-05-28:** QA pass landed — 7 schema bug categories fixed across all 14 sample workflows; 2 fields flagged for Marco verification
