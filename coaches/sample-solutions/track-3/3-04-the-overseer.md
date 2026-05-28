###### Challenge 3-04 — The Overseer
###### Adapted from: aw-failure-investigator.md (github/gh-aw) + agent-performance-analyzer.md (github/gh-aw)
###### Sources: https://github.com/github/gh-aw/blob/main/.github/workflows/aw-failure-investigator.md
######          https://github.com/github/gh-aw/blob/main/.github/workflows/agent-performance-analyzer.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.06 (Claude, MCP + sub-agents)

---
on:
  schedule:
    # Runs every 6 hours — catches failures quickly without burning budget.
    - cron: "0 */6 * * *"
  workflow_dispatch:

permissions:
  contents: read
  actions: read   # Required to read workflow run data via agentic-workflows MCP.
  issues: write

safe-outputs:
  create-issue:
    max: 3
    labels: [overseer-alert, workflow-health, automated]
    title-prefix: "[overseer] "
    expires: 5d
  update-issue:
    # Update existing overseer alerts rather than creating duplicates.
    max: 5
  noop:
    reason: "All monitored workflows are healthy."

# Claude for The Overseer — its reasoning capability handles the multi-workflow
# correlation task better than Copilot for this complexity level.
engine: claude

tools:
  # agentic-workflows MCP is the key tool for this challenge —
  # it gives the agent programmatic access to all workflow run history.
  agentic-workflows:
    enabled: true

  # repo-memory lets The Overseer store health baselines across runs.
  repo-memory:
    file-glob: "overseer/**"

  github:
    toolsets:
      - issues

# tracker-id lets other workflows and humans correlate issues back to The Overseer.
tracker-id: overseer-health-monitor
---

## Goal

Act as a **meta-workflow** — a workflow that monitors all other workflows.
Every 6 hours, inspect the health of your repository's agentic workflows,
detect failures and regressions, and create or update alert issues.

This is the **Overseer pattern** from `aw-failure-investigator.md`, simplified
for teaching. The core concept: one agent using the `agentic-workflows` MCP tool
to read the run logs of all other agents — turning observability into automation.

## Steps

1. **Fetch recent workflow run data** using the `agentic-workflows` MCP tool.
   Query all workflow runs from the past 6 hours:
   - Run name, status (success/failure/cancelled), duration, conclusion
   - Any error messages from failed runs
   - Which workflow file triggered each run

2. **Load baseline from repo-memory** (`overseer/baseline.json`) if it exists.
   The baseline stores the "last known good" state per workflow:
   - Last successful run timestamp
   - Average run duration (rolling 7-day)
   - Recent failure rate (failures / total runs, last 7 days)

3. **Analyse health for each workflow:**

   | Signal | Severity | Action |
   |--------|----------|--------|
   | Workflow failed in this window | Warning | Create or update alert issue |
   | Workflow failed 3+ times in 24h | Critical | Create alert issue with `priority-high` |
   | Workflow hasn't run in 2× its expected cadence | Warning | Create alert issue |
   | Run duration 3× longer than 7-day average | Warning | Note in existing issue |
   | All workflows healthy | Healthy | Call `noop` |

4. **For each warning/critical finding**, check whether an open overseer alert
   already exists for that workflow (search by title prefix + workflow name).
   - If an alert exists: update it with `update-issue` (add a comment with
     the new failure data).
   - If no alert exists: create a new one with `create-issue`.

5. **Update repo-memory baseline** (`overseer/baseline.json`) with the latest
   run data so the next run has an accurate comparison point.

6. **If all workflows are healthy**, call `noop`.

## Output format

**Alert issue title:**
`[overseer] Health alert — {workflow-name}`

**Alert issue body:**

```markdown
## 🔭 Overseer Alert — {workflow-name}

**Severity:** {Warning / Critical}
**Detected at:** {ISO-8601 timestamp}
**Monitored window:** Last 6 hours

### Failure summary

| Run | Status | Conclusion | Duration | Error |
|-----|--------|-----------|----------|-------|
{one row per failed run in the window}

### Health context (7-day baseline)

| Metric | Baseline | Current |
|--------|---------|---------|
| Success rate | {X}% | {Y}% |
| Avg duration | {N} min | {M} min |
| Last success | {timestamp} | — |

### Possible causes

{2–3 bullets suggesting likely causes based on the error messages and
run pattern. Be specific — reference the actual error text.}

### Suggested actions

- [ ] Check the workflow run logs: `gh aw logs {workflow-name}`
- [ ] Review recent commits that may have changed the workflow
- [ ] If the failure is systematic, consider temporarily disabling the workflow
- [ ] Close this issue once the workflow is healthy again

---
_Monitored by The Overseer (tracker: overseer-health-monitor)._
_Do NOT infer engine type from .lock.yml files — see dossier pitfall #2._
```

**Update comment (when adding to existing issue):**

```markdown
### 🔄 Update — {timestamp}

New failure detected in the monitoring window.

| Run | Status | Error |
|-----|--------|-------|
{one row per new failure}

Failure count since alert opened: **{N}**
```

## Constraints

- Do **not** infer engine type by scanning `.lock.yml` files — use the
  `agentic-workflows` MCP `logs` tool's `summary.engine_counts` field.
  (dossier pitfall #2)
- Create at most **3** new issues per run. If more than 3 workflows are failing,
  create alerts for the 3 with the highest failure count and note the others
  in each issue's body.
- Update existing issues with `update-issue: max: 5` rather than creating
  duplicate alerts for the same failing workflow.
- Do not alert on workflows that were manually cancelled — `conclusion: cancelled`
  is not a failure.
- The baseline file must be at `overseer/baseline.json` (matches `file-glob: "overseer/**"`).

{{#runtime-import shared/noop-reminder.md}}
