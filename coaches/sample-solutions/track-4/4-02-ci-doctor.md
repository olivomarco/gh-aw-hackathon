###### Challenge 4-02 — CI Doctor
###### Source: https://githubnext.com/agentics/blob/main/.github/workflows/ci-doctor.md
###### Estimated compile cost: ~3s  |  Estimated first-run cost: ~$0.05 (Copilot, per failure)

---
on:
  workflow_run:
    workflows:
      - CI
      - Build
      - Test Suite
    types: [completed]

permissions:
  actions: read
  contents: read
  issues: write

safe-outputs:
  create-issue:
    labels:
      - ci-failure
      - agent-investigation

engine: copilot

# Trigger only on failures — check conclusion in the agent body too.
# The workflow_run event fires for all conclusions; the if-condition below
# filters to failures only.
---

## Goal

When a CI workflow fails, automatically investigate the failure, identify
the root cause, search for similar past issues, and create a diagnostic
GitHub Issue with findings and recommended next steps.

This is the **CI Doctor pattern** from agentics: an agent that turns raw
CI failure noise into structured, actionable diagnostics.

## Precondition check

**First:** Verify `${{ github.event.workflow_run.conclusion }}` is `failure`.
If the conclusion is anything other than `failure` (e.g., `success`, `cancelled`),
call `noop` with reason `"Workflow run did not fail — no investigation needed."` and stop.

## Investigation steps

1. **Identify the failed workflow run**
   - Workflow name: `${{ github.event.workflow_run.name }}`
   - Run ID: `${{ github.event.workflow_run.id }}`
   - Branch: `${{ github.event.workflow_run.head_branch }}`
   - Commit SHA: `${{ github.event.workflow_run.head_sha }}`

2. **Fetch the failed jobs and logs**
   Use the GitHub Actions API to list jobs for the run and retrieve log output
   for each failed job. Focus on the last 100 lines of each failed job's log.

3. **Classify the failure** into one of:
   - `flaky-test` — test failure with no code change, or intermittent history
   - `build-error` — compilation or packaging failure
   - `dependency-issue` — network fetch, version resolution, or lockfile conflict
   - `infrastructure` — runner OOM, timeout, disk full, network outage
   - `real-regression` — code change directly caused the failure

4. **Search for similar past issues**
   Query open and recently-closed issues with labels `ci-failure` for patterns
   matching the error message. Note if this appears to be a known flake.

5. **Compose the diagnostic issue** — see Output format below.

## Output format

Create an issue with this structure:

```markdown
## CI Failure: {workflow name} — {branch} @ {short SHA}

**Run:** [{run ID}]({run URL})
**Classification:** {failure type}
**First seen:** {date if known flake, else "new failure"}

### Root Cause

{2-4 sentence analysis of what went wrong, citing specific log lines}

### Relevant Log Excerpt

```
{10-20 most relevant log lines}
```

### Similar Past Issues

{List matching issues, or "No similar issues found."}

### Recommended Next Steps

1. {Specific actionable recommendation}
2. {Second recommendation if applicable}

_Diagnosed automatically by CI Doctor._
```

## Constraints

- Create **at most one** issue per workflow run — check for an existing open
  `ci-failure` issue referencing the same run ID before creating
- Do **not** auto-close existing CI issues; only humans should close them
- If log retrieval fails (permissions, expired logs), create the issue with
  the metadata you have and note "Logs unavailable — manual inspection required"

{{#runtime-import shared/noop-reminder.md}}
