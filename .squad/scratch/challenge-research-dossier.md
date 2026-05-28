# gh-aw Challenge Research Dossier

> Compiled for Hudson (DevRel) to design 6-8 hours of WTH challenge content.
> Research date: 2026-05-28. Sources: Peli's Agent Factory blog (19-part series),
> GitHub Next agentic-workflows project page, gh-aw multi-repo examples,
> and 14 workflow `.md` files read directly from `github/gh-aw`.

---

## 1. The Vision (from Peli's Agent Factory and GitHub Next)

GitHub Agentic Workflows (gh-aw) is a research demonstrator from GitHub Next that treats
*natural language as code*. Instead of writing YAML steps or bespoke scripts that call the
GitHub API, a developer writes a Markdown file describing what they want an AI agent to do.
A short compile step (`gh aw compile`) turns that Markdown into a standard GitHub Actions
YAML workflow, with an AI "engine" (Claude Code, OpenAI Codex, or GitHub Copilot) doing the
agentic work at runtime. The key design principle is **Actions-first**: repo-centric, team-visible,
auditable. Every run produces logs, every write goes through explicit `safe-outputs` guardrails,
and the compiled YAML is fully inspectable. As the GitHub Next project page puts it: "There are
no hidden prompts or secret sauce."

The vision behind Peli's Agent Factory is radical in scope: what happens when you *max out*
on automation? The GitHub Next team built **over 100 working agentic workflows** in a single
repository and ran them in production. The factory spans everything from simple "hello world"
issue triage bots to multi-day project coordinators that break complex initiatives into
trackable sub-tasks. By going to the extreme, they surfaced which patterns scale and which
fail: specialization reveals possibilities, meta-agents are invaluable, and cost-quality
tradeoffs are very real. The lessons: *guardrails enable innovation* (strict `safe-outputs`
actually makes it easier to experiment), and *observability is non-negotiable* (once you have
dozens of AI agents running, you need AI agents watching the other AI agents).

The philosophical core of gh-aw is that **natural language shines where productive ambiguity
helps**. A human teammate understands "read the coverage report and write tests to improve
coverage" — that's not a line-by-line spec, but it's a useful direction. gh-aw is designed to
express those intentions cleanly and run them safely in a team context with logs, guardrails,
and code review. The format is engine-neutral: keep your workflow, swap Claude for Codex,
compare results. This portability, combined with the `safe-outputs` mechanism that keeps
write access explicit and bounded, is what makes the technology suitable for teams to trust.

---

## 2. Workflow Categories Observed

### Category A: Issue & PR Management

Core "hello world" territory for gh-aw. Workflows here fire on GitHub events (`issues`, `pull_request`,
`issue_comment`) and use safe-outputs like `add-labels`, `add-comment`, `update-issue`, and
`assign-to-agent`.

**Patterns seen:**
- **Event-driven triage** (`issue-triage-agent.md`): fires on `issues: [opened, reopened]`, reads
  codebase context, labels and comments on each new issue
- **Batch triage** (`auto-triage-issues.md`): scheduled daily, scans for all unlabeled issues in bulk
  instead of reacting per-event
- **Moderation** (`ai-moderator.md`): fires on every comment/issue/PR open, detects spam and AI-generated
  content, uses `cache-memory` for burst detection, hides comments with `hide-comment`
- **Sub-issue linking** (`issue-arborist`, from agentics repo): builds parent/child issue trees,
  creates organizational reports
- **Task dispatcher** (`issue-monster.md`): assigns issues to the Copilot coding agent one at a time
  (prevents parallel-work chaos)
- **PR branch maintenance** (`mergefest.md`): auto-merges main into open PR branches
- **Workflow generator** (`workflow-generator.md`): fires when an issue is opened with title starting
  `[Workflow]`, updates issue body with instructions, and `assign-to-agent` kicks off Copilot to
  actually scaffold the new workflow

**What makes them interesting:** The `lock-for-agent` pattern (prevents concurrent agent runs
on the same issue), `user-rate-limit` to throttle per-actor, and the `assign-to-agent` safe-output
that bridges from one workflow to the Copilot coding agent.

---

### Category B: Continuous Documentation

These workflows fight documentation rot: they fire daily or on push and propose PRs to keep
docs, glossaries, slide decks, and blog posts accurate.

**Patterns seen:**
- **Daily doc updater** (agentics): reads recent diffs, identifies changed APIs, proposes doc PRs — 57 merged PRs, 96% merge rate
- **Glossary maintainer** (agentics): keeps a single glossary file synchronized with codebase terminology — 100% merge rate on 10 PRs
- **Doc unbloater** (agentics): reduces verbosity in existing docs — 85% merge rate on 103 PRs
- **Documentation noob tester** (`docs-noob-tester.md`): spins up the docs site locally with Playwright,
  simulates a first-time user, takes screenshots of confusing steps, creates discussion reports
- **Slide deck maintainer** (`slide-deck-maintainer.md`): keeps presentation decks current
- **Multi-device docs tester** (agentics): Playwright across mobile/tablet/desktop breakpoints
- **Blog auditor** (`blog-auditor.md`): validates that the live blog URL is accessible, keywords present,
  code snippets pass `gh aw compile --validate` — includes A/B experiment on prompt verbosity

**What makes them interesting:** The noob-tester is genuinely novel — it instructs the agent to
"act as a complete beginner." The blog auditor shows how to combine Playwright + `gh aw compile`
for end-to-end validation. The A/B `experiments:` frontmatter block in `blog-auditor.md` is the
most technically sophisticated pattern for prompt engineering research.

---

### Category C: Continuous Improvement / Code Hygiene

Autonomous code-quality agents that run daily and propose PRs. This is the "Continuous AI" vision
made concrete.

**Patterns seen:**
- **Code simplifier** (agentics): analyzes recently modified code, proposes simplifications — 83% merge rate
- **Duplicate code detector** (agentics): uses Serena semantic analysis to find duplicate patterns
  across files — 79% merge rate on 96 PRs
- **Go Module Usage Expert / "Go Fan"** (`go-fan.md`): reviews Go dependency usage quality, not just
  vulnerabilities — asks "are we using this module's best features?"
- **Typist** (`typist.md`): type-safety analysis, suggests stronger typing patterns
- **Functional Pragmatist** (`functional-programming-enhancer.md`): applies functional techniques
- **Avenger** (`avenger.md`): hourly CI fixer — checks CI status, merges main, runs fmt/lint/test,
  creates a PR if fixes were needed; skips entirely if CI is passing (conditional `if:` job)
- **CLI Consistency Checker** (`cli-consistency-checker.md`): maintains CLI interface consistency — 78% merge rate on 102 PRs
- **Breaking Change Checker** (`breaking-change-checker.md`): daily, reads recent commits, applies
  decision tree for CLI breaking changes, creates issues with action checklists
- **Schema Consistency Checker** (`schema-consistency-checker.md`): daily, uses bash pre-steps to
  compute field-gap diffs, then agent interprets; uses `max-effective-tokens: 20000000`; stores
  analysis strategies in `cache-memory`

**What makes them interesting:** Avenger shows conditional multi-job workflows and the `protected-files`
safe-output pattern. Schema Consistency Checker is the richest example of `pre-agent-steps` (a full
Python script runs before the agent), `cache-memory` strategy evolution, and `max-effective-tokens`.

---

### Category D: Metrics, Analytics & Reporting

These are the "observability layer" — agents that watch all the other agents.

**Patterns seen:**
- **Metrics Collector** (`metrics-collector.md`): daily, uses `agentic-workflows` MCP tool to
  collect run data, stores structured JSON to `repo-memory`, calls `noop` as its only safe-output —
  a pure data-collection agent that feeds other meta-orchestrators
- **Agentic Token Audit** (`agentic-token-audit.md`): downloads 24h of workflow logs, runs Python to
  compute per-workflow token/cost aggregates, generates matplotlib charts, uploads them via
  `upload-asset`, creates issue with embedded images
- **Agentic Token Optimizer** (`agentic-token-optimizer.md`): reads the snapshots that Token Audit
  writes to `repo-memory`, suggests specific optimizations
- **Audit Workflows** (`audit-workflows.md`): uses `agentic-workflows` MCP + repo-memory, generates
  trend charts, creates discussion reports — 93 audit discussions and 9 issues created
- **Portfolio Analyst** (`portfolio-analyst.md`): weekly cost-reduction analysis — 7 discussions identifying
  "chatty" agents
- **Agent Performance Analyzer** (`agent-performance-analyzer.md`): daily meta-orchestrator,
  engine: copilot, reads from `repo-memory/meta-orchestrators`
- **Workflow Health Manager** (`workflow-health-manager.md`): meta-orchestrator monitoring health
  of all other workflows — 40 issues, 5 direct PRs + 14 causal-chain PRs merged

**What makes them interesting:** This category introduces the `agentic-workflows` MCP tool
(unique to gh-aw, gives the agent programmatic access to all workflow run data), `repo-memory`
for cross-run persistence, and the concept of "causal chain attribution" — when a monitoring
workflow creates an issue and Copilot later fixes it, the PR is attributed to the monitoring agent.

---

### Category E: Quality & Testing

**Patterns seen:**
- **CI Doctor** (agentics): fires on workflow failure, analyzes logs, identifies root cause, proposes fixes — 69% merge rate on 13 PRs
- **AW Failure Investigator** (`aw-failure-investigator.md`): scheduled every 6h, has a Python pre-step that
  pre-fetches all failed run data, then uses three sub-agents (issue-context-fetcher, failure-dataset-builder,
  cluster-evidence-extractor), correlates with open issues, creates or updates sub-issues — **most
  architecturally complex workflow in the catalog**
- **Daily Testify Expert** (`daily-testify-uber-super-expert.md`): analyzes test files daily, suggests testify assertions — 100% causal-chain merge rate on 13 PRs from 19 issues
- **Daily Test Improver** (agentics): identifies coverage gaps, implements incremental tests
- **Daily Compiler Quality Check** (`daily-compiler-quality.md`): analyzes compiler code quality
- **CI Coach** (agentics): optimizes CI pipelines — 100% merge rate on 9 PRs
- **Blog Auditor** (`blog-auditor.md`): validates live blog with Playwright + code snippet compilation
  (also listed under Docs; it straddles both categories)
- **Multi-Device Docs Tester** (agentics): Playwright responsive testing

**What makes them interesting:** AW Failure Investigator shows the **sub-agent pattern** (multiple
`## agent:` blocks within a single workflow file, each with a `model: small` override). The `cache:`
block for pre-fetching and the Python pre-step for deterministic data collection before the AI starts
are advanced patterns. CI Doctor is the simpler, more teachable version of the same concept.

---

### Category F: Security & Compliance

**Patterns seen:**
- **AI Moderator** (`ai-moderator.md`): fires on issues/comments/PRs, detects spam/AI-content,
  uses `skip-author-associations` and `skip-bots`, engine: codex, `user-rate-limit`, `threat-detection: false`,
  `hide-comment` safe-output
- **Security Compliance** (`security-compliance.md`): manages vulnerability campaigns with deadline tracking
- **Firewall** (`firewall.md`): validates network security rules — 59 daily discussions, 5 smoke test issues
- **Daily Secrets Analysis** (`daily-secrets-analysis.md`): scans commits for exposed credentials
- **Daily Malicious Code Scan** (agentics): reviews recent code changes for suspicious patterns
- **Static Analysis Report** (`static-analysis-report.md`): runs zizmor, poutine, actionlint — 57 analysis discussions

**What makes them interesting:** The AI Moderator uses `checkout: false` (agent never checks out the repo),
`roles: all` trigger, `skip-bots` allowlist, and cache-memory for cross-run spam burst detection.
The Firewall workflow is fascinating because it tests whether the agentic workflow's *own* network
restrictions are correctly enforced — an agent testing itself.

---

### Category G: Multi-Repository Coordination

**Patterns seen (from the multi-repo examples page and blog):**
- **Isolated side-repo triage**: runs issue triage agent in a separate repo with a `/triage` slash-command bridge
- **Cross-repo code quality analysis**: side-repo checks out target codebase locally, runs linters, creates issues
- **Automated sync**: code synchronization from main→sub repos via PRs, with path filters and bidirectional sync support
- **Centralized issue tracking**: creates tracking issues in a central repo with status synchronization
- **Org-wide Dependabot rollout**: orchestrator + worker pair — orchestrator dispatches workers that analyze each target repo
- **Org Health Report** (`org-health-report.md`): weekly, searches all public repos in the GitHub org,
  collects issues/PRs, Python pandas analysis, creates discussion with tables; rate-limit delays baked in
- **Stale Repo Identifier** (`stale-repo-identifier.md`): org-wide scan for inactive/abandoned repos
- **Ubuntu Image Analyzer** (`ubuntu-image-analyzer.md`): documents runner environments — 50% merge rate on 8 PRs

**What makes them interesting:** Multi-repo workflows require organization-level tokens, careful rate
limiting, and `gh-proxy` mode for the GitHub MCP tool. The orchestrator+worker pattern (one workflow
dispatches `workflow_dispatch` events to workers in other repos) is the key architectural concept.

---

### Category H: Interactive / ChatOps

**Patterns seen:**
- **Q optimizer** (agentics): responds to `/q` slash commands on issues, investigates workflow performance,
  creates PRs — **69 merged PRs, 78% merge rate**, highest-volume slash-command workflow
- **Grumpy Reviewer** (agentics): triggered by reaction emoji, performs critical code review with personality
- **Workflow Generator** (`workflow-generator.md`): triggered by issue open with `[Workflow]` title prefix,
  uses `assign-to-agent` to delegate to Copilot — simplest chatops example
- **PR Fix** (agentics): `/pr-fix` slash command to fix failing CI checks
- **Plan Command** (agentics): `/plan` command on any issue, breaks it into actionable sub-issues —
  **514 merged PRs out of 761 proposed (67% merge rate), highest-volume workflow in the entire factory**

**What makes them interesting:** The slash-command pattern (`on: issue_comment: types: [created]`
with the body checked for `/command`) is immediately practical. Plan Command's impact numbers
are remarkable — it became the most productive single workflow in the factory by unlocking
Copilot-driven sub-task completion at scale.

---

### Category I: Meta-Workflows (Workflows About Workflows)

The most advanced category — agents that monitor, audit, improve, and generate other agents.

**Patterns seen:**
- **Audit Workflows** (`audit-workflows.md`): daily meta-agent analyzing all workflow runs
- **Agent Performance Analyzer** (`agent-performance-analyzer.md`): daily meta-orchestrator reading
  from shared repo-memory
- **Workflow Health Manager** (`workflow-health-manager.md`): monitors health of all other workflows
- **Agentic Token Audit + Optimizer** (`agentic-token-audit.md`, `agentic-token-optimizer.md`):
  producer-consumer pair — audit collects, optimizer suggests; linked via `repo-memory`
- **Workflow Generator** (`workflow-generator.md`): creates new workflow .md files from issue requests
- **AW Failure Investigator** (`aw-failure-investigator.md`): uses the `agentic-workflows` MCP tool
  to query the very system it's part of
- **Blog Auditor** (`blog-auditor.md`): validates that blog posts about agentic workflows still compile
  correctly against the current schema
- **Copilot Agent Analysis** / **Copilot PR NLP Analysis** / **Prompt Clustering Analysis** (all in gh-aw
  repo): ML-powered analysis of how the agents themselves are being used — clustering prompt patterns,
  sentiment analysis of PR conversations

**What makes them interesting:** The `agentic-workflows` MCP tool gives an agent read access to all
other agents' run logs, costs, and safe-output counts. The repo-memory producer-consumer pattern
(one agent writes, another reads) is a powerful architectural primitive. This category requires
participants to have internalized everything from categories A–H first.

---

## 3. Catalog of Concrete Workflow Examples

### A: Issue & PR Management

---

#### `issue-triage-agent.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/issue-triage-agent.md
- **Purpose:** Labels newly opened issues and posts a comment explaining the chosen label.
- **Trigger:** `on: issues: types: [opened, reopened]` plus `schedule: daily` (for batch catch-up)
- **Engine:** (not specified in frontmatter — defaults to repository default)
- **Safe outputs used:** `add-labels` (allowlist: bug, feature, enhancement, documentation, question, help-wanted, good-first-issue, community), `add-comment`
- **Difficulty to recreate:** 🟢
- **Why it's teachable:** Canonical "hello world" of agentic workflows. Shows event trigger, toolsets scoping (`issues, labels`), allowlisted labels, `imports` for shared policies, and the `{{#runtime-import shared/noop-reminder.md}}` pattern. Also shows how to template a structured comment with `<details>` tags.
- **Adaptable challenge idea:** Participants build a triage agent for their own repo with a custom label taxonomy and a comment template that matches their team's voice.

---

#### `auto-triage-issues.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/auto-triage-issues.md
- **Purpose:** Scheduled daily batch triage of all unlabeled issues (complements the event-based triage agent).
- **Trigger:** `on: schedule: daily`
- **Engine:** (uses default)
- **Safe outputs used:** `add-labels`, `add-comment`
- **Difficulty to recreate:** 🟢
- **Why it's teachable:** Contrasts with event-driven triage — shows why you need *both* patterns (events miss issues created while the agent was down; the batch catches them). Good trigger discussion: cron vs named schedule syntax.
- **Adaptable challenge idea:** Build a "stale issue checker" that scans for issues open >30 days with no label and applies a `needs-triage` label.

---

#### `ai-moderator.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/ai-moderator.md
- **Purpose:** Detects spam, link-spam, and AI-generated content in issues and comments; hides spam comments and applies labels.
- **Trigger:** `on: roles: all`, `issues: [opened]`, `issue_comment: [created]`, `pull_request: [opened, forks: "*"]`; with `skip-author-associations` and `skip-bots`
- **Engine:** `codex`
- **Safe outputs used:** `add-labels` (spam, ai-generated, link-spam, ai-inspected), `hide-comment`, `threat-detection: false`
- **Difficulty to recreate:** 🟡
- **Why it's teachable:** Shows `checkout: false` (agent needs no code), `user-rate-limit`, `concurrency` group to prevent race conditions, `cache-memory` for stateful burst detection across runs, and how to write a nuanced multi-category classifier prompt.
- **Adaptable challenge idea:** Squads build a "first-response bot" that checks new issues for completeness (does it have a reproduction step? version info?) and applies labels accordingly.

---

#### `workflow-generator.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/workflow-generator.md
- **Purpose:** When an issue is opened with title starting `[Workflow]`, updates the issue body with agent instructions and assigns it to the Copilot coding agent to scaffold the workflow file.
- **Trigger:** `on: issues: types: [opened], lock-for-agent: true`, `on: reaction: "eyes"`; `if: startsWith(github.event.issue.title, '[Workflow]')`
- **Engine:** `copilot` (agent: `agentic-workflows`)
- **Safe outputs used:** `update-issue` (status + body), `assign-to-agent` (target: triggering, allowed: copilot)
- **Difficulty to recreate:** 🟡
- **Why it's teachable:** The simplest example of `assign-to-agent` and the `lock-for-agent` pattern. Also shows how `if:` expressions filter which issues get processed (critical for avoiding false triggers).
- **Adaptable challenge idea:** Build a "PR auto-labeler" that reads the diff when a PR opens, classifies it (frontend/backend/docs/infra), and applies a label — using `if:` to skip bot-authored PRs.

---

### B: Continuous Documentation

---

#### `blog-auditor.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/blog-auditor.md
- **Purpose:** Weekly validation that the GitHub Next Agentic Workflows blog page is accessible and code snippets pass `gh aw compile --validate`.
- **Trigger:** `on: workflow_dispatch`, `schedule: weekly on wednesday around 12:00`
- **Engine:** `claude`
- **Safe outputs used:** via `shared/daily-audit-base.md` import → `create-discussion` (audit reports)
- **Difficulty to recreate:** 🟡
- **Why it's teachable:** Shows Playwright integration (`tools: playwright: mode: cli`), restricted `network.allowed` list, `bash` tool with an explicit allow-list, and the `experiments:` block for A/B prompt testing. The prompt itself has `{{#if experiments.prompt_style == 'concise'}}` branching — advanced prompt engineering.
- **Adaptable challenge idea:** Build a "README freshness checker" that navigates to the repo's README on GitHub.com with Playwright, validates that all links return 200, and creates an issue for any broken link.

---

#### `docs-noob-tester.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/docs-noob-tester.md
- **Purpose:** Spins up the docs site locally with `make dev-docs`, then acts as a first-time user navigating 3 key pages with Playwright, takes screenshots, uploads them, and creates a discussion with findings.
- **Trigger:** `on: schedule: daily`, `workflow_dispatch`
- **Engine:** `copilot`
- **Safe outputs used:** `upload-asset` (up to 10 PNG screenshots), via `shared/daily-audit-base.md` → `create-discussion`
- **Difficulty to recreate:** 🔴
- **Why it's teachable:** Shows `pre-agent-steps` for starting a background server, `runtimes.node.version` override, the full `playwright: mode: cli` integration, `upload-asset` with image screenshots, and the "persona prompt" pattern — instructing the agent to *be* a specific kind of user.
- **Adaptable challenge idea:** Squads build a "documentation screenshot reporter" that navigates a public docs site, takes screenshots of 3 key pages, and posts them to an issue weekly.

---

### C: Continuous Improvement / Code Hygiene

---

#### `avenger.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/avenger.md
- **Purpose:** Hourly CI fixer — checks if CI is failing on main, and if so: merges main, runs recompile/fmt/lint/test, creates a PR with fixes. Skips entirely if CI is already passing.
- **Trigger:** `on: schedule: cron: "23 * * * *"` (every hour, offset), `workflow_dispatch`
- **Engine:** `claude` (agent: `ci-cleaner`, max-turns: 25)
- **Safe outputs used:** `create-pull-request` (expires: 2d, labels: automated/ci-fix, protected-files, excluded-files), `missing-tool`
- **Difficulty to recreate:** 🔴
- **Why it's teachable:** Shows multi-job workflow with a pre-check job (`check_ci_status`) and conditional `if: needs.check_ci_status.outputs.ci_needs_fix == 'true'` on the agent job. Shows `sandbox.agent.mounts`, `protected-files: fallback-to-issue`, `excluded-files` patterns. The "file-count guard" (>80 changed files → call noop) is a real-world safety valve.
- **Adaptable challenge idea:** Build a "Friday cleanup bot" that runs weekly, checks for any `TODO:` comments added in the past 7 days, and opens a PR converting them to GitHub issues.

---

#### `breaking-change-checker.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/breaking-change-checker.md
- **Purpose:** Daily analysis of recent commits for CLI breaking changes (removed commands, output format changes, schema changes); creates an issue with an action checklist if found.
- **Trigger:** `on: schedule: "daily around 14:00 on weekdays"`
- **Engine:** `copilot`
- **Safe outputs used:** `create-issue` (expires: 2d, labels: [breaking-change, automated-analysis, cookie]), `noop`; via `shared/skip-if-issue-open.md` import (idempotency)
- **Difficulty to recreate:** 🟡
- **Why it's teachable:** Shows the `skip-if-issue-open` pattern (don't create duplicate issues), `bash` tool with restricted allow-list (`git diff:*`, `git log:*`, `cat:*`, `grep:*`), and a multi-step decision-tree prompt that produces a structured issue with checkboxes.
- **Adaptable challenge idea:** Build a "dependency drift checker" that runs weekly, compares current vs last month's `package.json` (or `go.mod`), and creates an issue listing newly added/removed/updated packages with security notes.

---

#### `schema-consistency-checker.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/schema-consistency-checker.md
- **Purpose:** Daily cross-reference of JSON schema, Go parser structs, docs, and actual workflow files to detect field inconsistencies.
- **Trigger:** `on: schedule: daily`, `workflow_dispatch`
- **Engine:** `claude`
- **Safe outputs used:** `create-discussion` (via audit-base import)
- **Key settings:** `max-effective-tokens: 20000000`, `cache-memory` for strategy evolution
- **Difficulty to recreate:** 🔴
- **Why it's teachable:** The most comprehensive example of `pre-agent-steps` (a full 80-line bash script runs before the agent, computing field-gap diffs and writing JSON), `max-effective-tokens` for large codebase analysis, and `cache-memory` strategy evolution (agent updates its own detection strategies across runs). Shows the "70/30 strategy sampling" pattern.
- **Adaptable challenge idea:** Build a "config drift checker" that compares a project's `.env.example` with any actual `.env`-style references in the codebase and reports gaps.

---

### D: Metrics, Analytics & Reporting

---

#### `metrics-collector.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/metrics-collector.md
- **Purpose:** Pure data-collection agent — gathers daily performance metrics for all workflows and writes structured JSON to `repo-memory`; calls `noop` as its only output.
- **Trigger:** `on: daily`
- **Engine:** `copilot`
- **Safe outputs used:** `noop` (always — this is a data-collection only agent)
- **Difficulty to recreate:** 🟡
- **Why it's teachable:** The "infrastructure agent" pattern — a workflow with no user-visible output, only writing to `repo-memory` so other agents can read it. Shows `agentic-workflows` MCP tool usage (status + logs), `repo-memory` with file-glob filter (`metrics/**`), and that `noop` must be called even on success.
- **Adaptable challenge idea:** Build a "PR throughput collector" that writes daily PR open/close/merge counts to a JSON file in `repo-memory`, feeding a downstream reporter.

---

#### `agentic-token-audit.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/agentic-token-audit.md
- **Purpose:** Downloads 24h of workflow logs, runs Python to compute per-workflow token/cost aggregates, generates matplotlib bar/trend charts, uploads them, and creates an issue with embedded images.
- **Trigger:** `on: schedule: "daily around 12:00 on weekdays"`, `workflow_dispatch`
- **Engine:** (default — uses bash + MCP)
- **Safe outputs used:** `create-issue` (expires: 3d, max: 1, close-older-issues: true), `upload-asset` (max: 5, PNG/JPG/SVG)
- **Difficulty to recreate:** 🔴
- **Why it's teachable:** Shows multi-step bash pre-steps (setup-python, install pip packages, download logs), Python data analysis + chart generation, `upload-asset` with returned URL embedding, `repo-memory` producer role (writes daily snapshots), and `close-older-issues` to prevent issue accumulation.
- **Adaptable challenge idea:** Build a "weekly CI cost report" that uses `gh run list --json` to collect build times and costs, generates a chart with Python, and posts it as a comment on a pinned tracking issue.

---

#### `audit-workflows.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/audit-workflows.md
- **Purpose:** Daily meta-audit of all agentic workflow runs from the last 24h; analyzes errors, costs, missing tools; generates trend charts; stores history in repo-memory; creates discussion report.
- **Trigger:** `on: schedule: daily`, `workflow_dispatch`
- **Engine:** `claude`
- **Safe outputs used:** `upload-asset` (charts), via `shared/daily-audit-charts.md` + `shared/repo-memory-standard.md` imports → discussion
- **Key settings:** `tracker-id: audit-workflows-daily`, `agentic-workflows` MCP tool, `timeout: 300`
- **Difficulty to recreate:** 🔴
- **Why it's teachable:** Shows the full meta-workflow pattern — an agent using the `agentic-workflows` MCP server to read other agents' run logs. `tracker-id` is key: it lets other workflows correlate issues/discussions back to this specific auditor. The `shared/repo-memory-standard.md` import with `branch-name` and `max-patch-size` shows production-grade memory management.
- **Adaptable challenge idea:** Build a "workflow success rate tracker" that queries the last 7 days of runs for a specific workflow, generates a pass/fail chart, and posts it to Discussions weekly.

---

### E: Quality & Testing

---

#### `aw-failure-investigator.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/aw-failure-investigator.md
- **Purpose:** Every 6h, pre-fetches failed workflow run data via Python, then uses three sub-agents to cluster failures, extract evidence, and produce create/update/close issue operations.
- **Trigger:** `on: schedule: cron: "every 6h"`, `workflow_dispatch`
- **Engine:** `claude`
- **Safe outputs used:** `create-issue` (max: 2, group: true, labels: [agentic-workflows, automation]), `update-issue` (max: 10), `link-sub-issue` (max: 10), `noop`
- **Key features:** Python `steps:` pre-step (pre-fetches all failure data before agent starts), `cache:` block for pre-fetched data, three `## agent:` sub-agent blocks with `model: small`
- **Difficulty to recreate:** 🔴
- **Why it's teachable:** The most architecturally complex workflow in the catalog. Shows `steps:` (deterministic pre-steps), `cache:` for pre-fetched data, the sub-agent pattern (`## agent:` blocks within a single workflow with `model: small`), `link-sub-issue`, and `update-issue`. The "noop if nothing actionable" decision logic is production-grade.
- **Adaptable challenge idea:** Build a "PR review requester" that fires every 4h, finds PRs open >24h with no reviewer assigned, and creates a focused issue listing them — using pre-fetched PR data to stay within token budget.

---

#### `breaking-change-checker.md`
*(Listed above under Category C — it straddles both quality and hygiene.)*

---

### F: Security & Compliance

---

#### `ai-moderator.md`
*(Listed above under Category A — the primary security guard for community content.)*

---

### G: Multi-Repository Coordination

---

#### `org-health-report.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/org-health-report.md
- **Purpose:** Weekly org-wide health report — discovers all public repos in the GitHub org, collects issues/PRs with pagination, runs Python pandas analysis, creates a discussion with tables.
- **Trigger:** `on: schedule: weekly on monday around 09:00`, `workflow_dispatch`
- **Engine:** `copilot`
- **Safe outputs used:** `create-discussion` (max: 1, close-older-discussions: true, category: reports), `upload-artifact` (max: 3, retention: 30d)
- **Key settings:** `tools: github: mode: gh-proxy`, `tools: cache-memory: true`, `strict: true`, `network: allowed: [defaults, python]`, `timeout-minutes: 60`
- **Difficulty to recreate:** 🔴
- **Why it's teachable:** The premier multi-repo example. Shows `gh-proxy` mode for org-level API access, Python pandas analysis with rate-limiting delays built into the prompt, `upload-artifact` (vs `upload-asset`), `cache-memory: true` for retry capability, and 60-minute timeout for long-running org scans.
- **Adaptable challenge idea:** Build a "cross-repo stale issue finder" that scans 3-5 specified repos, finds issues open >60 days with no activity, and posts a weekly summary discussion.

---

### H: Interactive / ChatOps

*(No single workflow file was fetched for this category, but patterns are well-documented from the blog.)*

#### `workflow-generator.md`
*(Listed above under Category A — the chatops/slash-command entry point to meta-workflows.)*

---

### I: Meta-Workflows

---

#### `agent-performance-analyzer.md`
- **Source URL:** https://github.com/github/gh-aw/blob/main/.github/workflows/agent-performance-analyzer.md
- **Purpose:** Daily meta-orchestrator that analyzes AI agent performance, quality, and effectiveness across the repository.
- **Trigger:** `on: daily`
- **Engine:** `copilot`
- **Safe outputs used:** via imports → discussion/issue creation
- **Key settings:** `repo-memory: branch-name: memory/meta-orchestrators`, reads from metrics written by Metrics Collector
- **Difficulty to recreate:** 🔴
- **Why it's teachable:** Shows the repo-memory *consumer* role (reads what Metrics Collector writes), and the meta-orchestrator pattern where one agent synthesizes the outputs of many others into recommendations.
- **Adaptable challenge idea:** Build a "workflow effectiveness report" that reads repo-memory metrics from a previous exercise's data-collector and generates a weekly discussion summarizing which workflows had the highest merge rates.

---

## Additional Workflows Referenced (Not Full Files Read)

The following were documented from blog posts and are real workflows in the factory:

| Workflow | Repo | Category | Notable Pattern |
|----------|------|----------|-----------------|
| `code-simplifier.md` | githubnext/agentics | C | Daily PR creation, 83% merge rate |
| `duplicate-code-detector.md` | githubnext/agentics | C | Serena semantic analysis, 79% merge rate |
| `ci-doctor.md` | githubnext/agentics | E | CI failure diagnosis, 69% merge rate |
| `plan.md` | githubnext/agentics | H+I | `/plan` slash command, **514 merged PRs, 67% rate** |
| `discussion-task-miner.md` | githubnext/agentics | H+I | Extracts tasks from discussions, 57% merge rate |
| `workflow-health-manager.md` | github/gh-aw | I | 40 issues → 34 PRs, meta health monitoring |
| `daily-backlog-burner.md` | githubnext/agentics | F | Multi-phase, repo-memory state, one issue/day |
| `daily-perf-improver.md` | githubnext/agentics | F | Three-phase: research→setup→implement |
| `grumpy-reviewer.md` | githubnext/agentics | H | Reaction-triggered, personality prompt |
| `q.md` | githubnext/agentics | H | Slash-command `/q`, 78% merge rate |
| `prompt-clustering-analysis.md` | github/gh-aw | D+I | ML clustering on agent prompts |
| `firewall.md` | github/gh-aw | F | Tests own network restrictions |
| `static-analysis-report.md` | github/gh-aw | F | Runs zizmor/poutine/actionlint daily |
| `daily-accessibility-review.md` | githubnext/agentics | E | WCAG + Playwright, daily |
| `pr-fix.md` | githubnext/agentics | H | `/pr-fix` slash command, CI repair on demand |

---

## 4. Concept Coverage Map

| Concept | Issue Mgmt | Docs | Improvement | Metrics | Quality | Multi-Repo | Meta | Security |
|---------|:----------:|:----:|:-----------:|:-------:|:-------:|:----------:|:----:|:--------:|
| `on: schedule` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `on: issues` | ✓ | | | | | | ✓ | ✓ |
| `on: issue_comment` (slash cmds) | ✓ | | | | | | ✓ | |
| `on: pull_request` | ✓ | | ✓ | | ✓ | | | ✓ |
| `on: reaction` | | | | | | | ✓ | |
| `on: workflow_dispatch` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `safe-outputs: create-issue` | ✓ | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `safe-outputs: create-pr` | | ✓ | ✓ | | | | | |
| `safe-outputs: update-file` | | ✓ | ✓ | | | | | |
| `safe-outputs: add-comment` | ✓ | | | | | | | |
| `safe-outputs: add-labels` | ✓ | | | | | | | ✓ |
| `safe-outputs: update-issue` | ✓ | | | | ✓ | | ✓ | |
| `safe-outputs: create-discussion` | | ✓ | | ✓ | ✓ | ✓ | ✓ | |
| `safe-outputs: upload-asset` | | ✓ | | ✓ | ✓ | | ✓ | |
| `safe-outputs: assign-to-agent` | ✓ | | | | | | ✓ | |
| `safe-outputs: noop` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `safe-outputs: hide-comment` | | | | | | | | ✓ |
| `max-effective-tokens` | | | | ✓ | ✓ | | ✓ | |
| `engine: claude` | | ✓ | ✓ | ✓ | ✓ | | ✓ | |
| `engine: copilot` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |
| `engine: codex` | | | | | | | | ✓ |
| `tools: github` (MCP toolsets) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `tools: bash` | | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `tools: playwright` | | ✓ | | | ✓ | | | |
| `tools: agentic-workflows` (MCP) | | | | ✓ | ✓ | | ✓ | |
| `tools: repo-memory` | | | ✓ | ✓ | ✓ | | ✓ | |
| `tools: cache-memory` | ✓ | | ✓ | | ✓ | ✓ | | ✓ |
| `imports:` (shared components) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `pre-agent-steps:` / `steps:` | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Sub-agent blocks (`## agent:`) | | | | | ✓ | | ✓ | |
| Multi-repo coordination | | | | | | ✓ | | |
| `experiments:` (A/B testing) | | ✓ | | | | | ✓ | |
| `if:` conditional jobs | | | ✓ | | | | | |
| `lock-for-agent` | ✓ | | | | | | ✓ | |
| `user-rate-limit` | ✓ | | | | | | | ✓ |
| `skip-bots` / `skip-author-associations` | | | | | | | | ✓ |
| `checkout: false` | ✓ | | | | | | | ✓ |
| Custom `tracker-id` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## 5. Suggested Challenge Track Mapping (6-8 hours total)

> Note: Challenge 00 (Setup & Hello, Agent, ~30-45 min) and Track 1 challenges 1-01 through 1-04
> are already drafted. The mapping below shows where the remaining challenges fit, picking up
> from where Track 1 ends.

### Context: What Track 1 (Already In Progress) Covers

Track 1 covers: `workflow_dispatch`, `on: schedule` (cron), `on: push`, `on: issues`,
`safe-outputs: create-issue`, `safe-outputs: add-labels`, `add-comment`, `permissions` scoping.
Engine basics. Compile loop.

---

### Track 2 — Intermediate 🟡 (~2.5 hours total)

*Theme: "Your repo has a brain."*

Squads build workflows that respond to real events, maintain state, and generate
read-only reports. They encounter safe-output variety, `imports`, `tracker-id`, and `engine` selection.

**Challenge 2-01: The PR Gatekeeper** (~30 min)
Build a workflow triggered by `pull_request: [opened]` that analyzes the PR diff for
size/complexity, posts a structured comment using a template, and applies a size label
(`xs/s/m/l/xl`). Introduces `on: pull_request`, `add-comment`, `add-labels`, `tools: github:
toolsets: [pull_requests]`, and `checkout: false`.

**Challenge 2-02: The Weekly Reporter** (~30 min)
Build a weekly `on: schedule` workflow that collects the last 7 days of issues/PRs using
the GitHub MCP tool, generates a markdown summary, and posts it to Discussions via
`create-discussion`. Introduces `tools: github: toolsets: [discussions]`, `create-discussion`
safe-output, `expires:` and `close-older-discussions:` options.

**Challenge 2-03: CI Watchdog** (~45 min)
Build a workflow that fires on a schedule (every 4h or daily), checks for failed CI runs in
the past window using `gh run list` (via `tools: bash`), and creates a `create-issue` with
failure details. Must include the `noop` path when CI is healthy. Introduces `tools: bash`,
`safe-outputs: noop` (mandatory exit protocol), `tracker-id`, and `shared/skip-if-issue-open.md`
import pattern.

**Challenge 2-04: The Slash Commander** (~45 min)
Build a workflow triggered by `/summarize` slash command on issues. When a team member
comments `/summarize` on any issue, the agent reads the full issue + comments and posts a
structured summary comment. Introduces `on: issue_comment: types: [created]`, the slash-command
body-check pattern, `lock-for-agent`, `user-rate-limit`, and `min-integrity`.

---

### Track 3 — Advanced 🔴 (~2.5 hours total)

*Theme: "Agents watching agents."*

Squads build multi-step workflows with pre-steps, repo-memory state, sub-agents, and
cross-repo coordination. The capstone connects two workflows in a producer-consumer chain.

**Challenge 3-01: The Memory Machine** (~45 min)
Build a producer-consumer pair. The *producer* runs daily, collects issue metrics (open count,
close rate, label distribution), and writes a JSON snapshot to `repo-memory`. The *consumer*
runs weekly, reads those snapshots, computes a 7-day trend, and creates a discussion report
with a Python-generated chart uploaded via `upload-asset`. Introduces `tools: repo-memory`,
`pre-agent-steps:` (for Python/matplotlib), `upload-asset`, and the producer-consumer architecture.

**Challenge 3-02: The Auditor** (~45 min)
Build a meta-workflow using the `agentic-workflows` MCP tool. The workflow reads the last
24h of workflow run summaries, identifies the 3 most expensive and 3 most failure-prone
workflows, and creates a weekly issue with a structured report. Must use `max-effective-tokens`
and demonstrate reasoning about tradeoffs. Introduces `tools: agentic-workflows`, `max-effective-tokens`,
and the "agent analyzing its own ecosystem" concept.

**Challenge 3-03: The Multi-Repo Scout** (~45 min)
Build a workflow that uses `tools: github: mode: gh-proxy` with the `repos` and `issues`
toolsets to query 2-3 specified repos, collects open issue counts and staleness, and posts
a cross-repo health summary to Discussions. Must handle rate limiting in the prompt (add
delays, batch queries). Introduces multi-repo access, `gh-proxy` mode, `strict: true`,
and rate-limit-aware prompt writing.

**Challenge 3-04: The Factory Capstone** (~30 min)
Connect three workflows into a factory: (1) an event-driven workflow (triage or PR analysis)
writes an observation to `repo-memory`, (2) a meta-auditor reads repo-memory and creates
a tracking issue, (3) a ChatOps workflow (`/fix` slash command) on that issue assigns it
to the Copilot coding agent. Squads demonstrate a full agentic chain: event → persist →
triage → act. Tests `assign-to-agent`, `lock-for-agent`, and `repo-memory` in one connected system.

---

## 6. Pitfalls and Gotchas Observed

### 1. `noop` is mandatory, not optional
Every gh-aw workflow **must** call a safe-output tool before ending its session. If the agent
produces no output and calls no safe-output, the workflow is considered failed. Many workflows
import `shared/noop-reminder.md` at the bottom of the file specifically because agents forget.
**Mitigation:** Always include `safe-outputs: noop:` in frontmatter and add `{{#runtime-import shared/noop-reminder.md}}` at the end of the workflow body.

### 2. Engine-type inference from `.lock.yml` is wrong
`audit-workflows.md` has an explicit warning: "Do NOT infer engine type by scanning `.lock.yml` files.
Lock files contain the word `copilot` in allowed-domains lists and workflow source paths regardless
of which engine the workflow uses, causing false positives." Always read `aw_info.json`'s `engine_id` field
or the `summary.engine_counts` from the MCP `logs` tool.

### 3. `repo-memory` glob filter silently drops files
`metrics-collector.md` warns with `⚠️ CRITICAL`: the `repo-memory` tool only persists files matching
its `file-glob` pattern. Files written outside that path are silently discarded — no error, no warning.
**Mitigation:** Always check the `file-glob` in the `tools: repo-memory` block and prefix all writes accordingly.

### 4. `min-integrity: approved` blocks public contributors
The default `min-integrity: approved` restricts the agent to seeing only content from repo owners,
members, and collaborators. In a public repository, this means the triage agent cannot see issues
filed by external contributors. **Mitigation:** Use `min-integrity: none` when you want the agent to
process contributions from the public, and add appropriate spam/moderation workflows.

### 5. `lock-for-agent` prevents collision on high-volume triggers
Without `lock-for-agent: true` on `issues` or `issue_comment` triggers, multiple concurrent agents
can run simultaneously on the same issue, posting duplicate comments or conflicting labels.
**Mitigation:** Always add `lock-for-agent: true` to event triggers where the agent makes writes.

### 6. `max-effective-tokens` ≠ `max-tokens`
`max-effective-tokens` controls the *cost-normalized* token budget, not raw token count. A model with
2× the cost per token uses 2× the effective tokens. Setting a value here is required for workflows
that analyze large codebases — without it, the default budget may terminate the run mid-analysis.

### 7. Rate limiting on org-wide queries
`org-health-report.md` explicitly adds delays between API calls: "2-3 seconds between pages, 5 seconds
between repository queries." Without delays, org-wide searches hit GitHub's secondary rate limit (which
returns 403, not 429) and the agent may silently get partial results. **Mitigation:** Always add `sleep 3`
or `sleep 5` in bash loops that iterate over repositories.

### 8. `pre-agent-steps:` data must be written to known paths
Pre-agent steps run before the AI agent starts. Data they produce is only available to the agent
if written to predictable filesystem paths (e.g., `/tmp/gh-aw/agent/*.json`). The agent's instructions
must explicitly reference these paths. If the pre-step fails, the agent receives no data and may
hallucinate. **Mitigation:** Add `set -euo pipefail` to all pre-step shell scripts and check for file
existence in the agent prompt before proceeding.

### 9. `checkout: false` saves significant startup time
When an agent only needs to call GitHub APIs (triage, moderation, metrics), skipping the git checkout
(`checkout: false`) saves 30-60 seconds of setup time per run. Participants often forget this is an
option and pay the cost unnecessarily. **Mitigation:** Default to `checkout: false` for event-driven
workflows; add checkout only when the agent needs to read or modify code files.

### 10. Avenger's recompile guard (>50 changed files → noop)
`avenger.md` explicitly checks if `make recompile` changes >50 files: "If more than 50 files changed
→ call `noop` with 'Recompile produced {count} files — possible binary version mismatch'." Without
this guard, the workflow would try to create a PR with 40-100 changed `.lock.yml` files, which would
be unreviewed and merge-blocking. **Mitigation:** Any workflow that modifies generated/compiled files
should count changed files and abort if the count is unexpectedly large.

### 11. `experiments:` A/B block requires `start_date` and `min_samples`
The `experiments:` frontmatter block (shown in `blog-auditor.md`) runs a controlled A/B experiment
across workflow runs. But it only kicks in after `start_date` and requires `min_samples` runs before
any analysis is valid. Participants who add this block and immediately look for results will see nothing.
**Mitigation:** Set `start_date` in the past when testing; expect weeks of data collection before
statistical significance.

### 12. Sub-agent blocks need `model: small` to avoid cost explosion
The `aw-failure-investigator.md` uses three sub-agent blocks with `model: small`. Without this
override, each sub-agent defaults to the full model and the total cost for one failure investigation
run is 3× the token budget. **Mitigation:** Always specify `model: small` on sub-agents used for
routing, classification, or structured JSON extraction — reserve the full model for the primary agent.

---

## 7. Citations

### Primary Sources

| Source | URL |
|--------|-----|
| Peli's Agent Factory (welcome post) | https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/ |
| GitHub Next Agentic Workflows project | https://githubnext.com/projects/agentic-workflows/ |
| gh-aw multi-repo examples | https://github.github.com/gh-aw/examples/multi-repo/ |
| gh-aw blog series (llms.txt) | https://github.github.com/gh-aw/_llms-txt/agentic-workflows.txt |

### Blog Series (19 parts)

| Post | URL |
|------|-----|
| Part 1: Meet a Simple Triage Workflow | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows/ |
| Part 2: Continuous Simplicity | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-continuous-simplicity/ |
| Part 6: Continuous Documentation | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-documentation/ |
| Part 7: Issue & PR Management | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-issue-management/ |
| Part 8: Fault Investigation | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-quality-hygiene/ |
| Part 9: Metrics & Analytics | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-metrics-analytics/ |
| Part 11: Security & Compliance | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-security-compliance/ |
| Part 13: Interactive & ChatOps | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-interactive-chatops/ |
| Part 14: Testing & Validation | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-testing-validation/ |
| Part 16: Multi-Phase Improvers | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-multi-phase/ |
| Part 17: Organization & Cross-Repo | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-organization/ |
| Part 18: Advanced Analytics & ML | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-advanced-analytics/ |
| Part 19: Project Coordination | https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-campaigns/ |

### Workflow Source Files (github/gh-aw)

| Workflow | GitHub URL |
|----------|-----------|
| issue-triage-agent.md | https://github.com/github/gh-aw/blob/main/.github/workflows/issue-triage-agent.md |
| auto-triage-issues.md | https://github.com/github/gh-aw/blob/main/.github/workflows/auto-triage-issues.md |
| ai-moderator.md | https://github.com/github/gh-aw/blob/main/.github/workflows/ai-moderator.md |
| workflow-generator.md | https://github.com/github/gh-aw/blob/main/.github/workflows/workflow-generator.md |
| blog-auditor.md | https://github.com/github/gh-aw/blob/main/.github/workflows/blog-auditor.md |
| docs-noob-tester.md | https://github.com/github/gh-aw/blob/main/.github/workflows/docs-noob-tester.md |
| avenger.md | https://github.com/github/gh-aw/blob/main/.github/workflows/avenger.md |
| breaking-change-checker.md | https://github.com/github/gh-aw/blob/main/.github/workflows/breaking-change-checker.md |
| schema-consistency-checker.md | https://github.com/github/gh-aw/blob/main/.github/workflows/schema-consistency-checker.md |
| metrics-collector.md | https://github.com/github/gh-aw/blob/main/.github/workflows/metrics-collector.md |
| agentic-token-audit.md | https://github.com/github/gh-aw/blob/main/.github/workflows/agentic-token-audit.md |
| audit-workflows.md | https://github.com/github/gh-aw/blob/main/.github/workflows/audit-workflows.md |
| aw-failure-investigator.md | https://github.com/github/gh-aw/blob/main/.github/workflows/aw-failure-investigator.md |
| agent-performance-analyzer.md | https://github.com/github/gh-aw/blob/main/.github/workflows/agent-performance-analyzer.md |
| org-health-report.md | https://github.com/github/gh-aw/blob/main/.github/workflows/org-health-report.md |

### Workflow Source Files (githubnext/agentics)

| Workflow | GitHub URL |
|----------|-----------|
| code-simplifier.md | https://github.com/githubnext/agentics/blob/main/workflows/code-simplifier.md |
| duplicate-code-detector.md | https://github.com/githubnext/agentics/blob/main/workflows/duplicate-code-detector.md |
| ci-doctor.md | https://github.com/githubnext/agentics/blob/main/workflows/ci-doctor.md |
| plan.md | https://github.com/githubnext/agentics/blob/main/workflows/plan.md |
| discussion-task-miner.md | https://github.com/githubnext/agentics/blob/main/workflows/discussion-task-miner.md |
| grumpy-reviewer.md | https://github.com/githubnext/agentics/blob/main/workflows/grumpy-reviewer.md |
| q.md | https://github.com/githubnext/agentics/blob/main/workflows/q.md |
| daily-backlog-burner.md | https://github.com/githubnext/agentics/blob/main/workflows/daily-backlog-burner.md |
| daily-perf-improver.md | https://github.com/githubnext/agentics/blob/main/workflows/daily-perf-improver.md |
| issue-arborist.md | https://github.com/githubnext/agentics/blob/main/workflows/issue-arborist.md |
| daily-accessibility-review.md | https://github.com/githubnext/agentics/blob/main/workflows/daily-accessibility-review.md |
| pr-fix.md | https://github.com/githubnext/agentics/blob/main/workflows/pr-fix.md |
