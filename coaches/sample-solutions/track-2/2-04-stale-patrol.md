###### Challenge 2-04 — Stale Patrol
###### Adapted from: issue-arborist.md (githubnext/agentics) + daily-backlog-burner.md (githubnext/agentics)
###### Sources: https://github.com/githubnext/agentics/blob/main/workflows/issue-arborist.md
######          https://github.com/githubnext/agentics/blob/main/workflows/daily-backlog-burner.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.02 (Copilot, batch scan)

---
on:
  schedule:
    # Run once a day at 07:00 UTC, every day.
    - cron: "0 7 * * *"
  workflow_dispatch:
    inputs:
      dry_run:
        description: "Set 'true' to report without making changes"
        required: false
        default: "false"

permissions:
  contents: read
  issues: write

safe-outputs:
  add-comment: {}
  add-labels:
    allowed:
      - stale
      - stale-candidate
      - keep-open
  update-issue:
    # Allows the agent to close stale issues.
    allowed-state-change: closed
    max: 5   # Close at most 5 issues per run to avoid mass-closing accidents.
  noop:
    reason: "No stale issues found today."

engine: copilot

# Stale patrol processes batches, not single issues — no lock needed here.
# The 5-issue close limit is the safety valve.
---

## Goal

Run a daily stale issue patrol. Find issues that have been dormant for too long,
warn them with a `stale` label and comment, and close the ones that have been
stale for the full grace period without a response.

This implements the **scheduled + conditional write** pattern: the trigger is
cron, the logic has two phases (warn → close), and `noop` is the happy-path
exit when the backlog is clean.

## Definitions

| Term | Meaning |
|------|---------|
| **Stale candidate** | Open issue with no activity for ≥ 30 days |
| **Stale** | Open issue labelled `stale` with no activity for a further ≥ 14 days |
| **Activity** | New comment, label change, or assignee change (not just the patrol's own comment) |

## Steps

1. **Fetch all open issues** using the GitHub MCP `issues` toolset.
   Include label information and the timestamp of the last non-bot comment.

2. **Phase 1 — Identify and warn stale candidates:**
   - Find issues with no activity for ≥ 30 days that do NOT already have
     the `stale` label.
   - Apply `stale` label.
   - Post a stale warning comment (template below).
   - Skip issues that have the `keep-open` label — these are explicitly preserved.

3. **Phase 2 — Close confirmed stale issues:**
   - Find issues that already have the `stale` label AND have had no activity
     for ≥ 14 days since the stale label was applied.
   - If `dry_run` is `true`: report them in the console but do NOT close.
   - If `dry_run` is `false`: close up to 5 issues using `update-issue` with
     `state: closed`. Post a closing comment on each (template below).

4. **If no stale candidates and no stale closures**, call `noop` with reason
   `"No stale issues found today."`.

## Output format

**Stale warning comment:**

```markdown
## ⏰ Stale Issue Notice

This issue has been open for over **30 days** with no recent activity.

To keep our backlog healthy, it will be automatically closed in **14 days**
unless there is new activity.

**To prevent closing:**
- Add a comment with an update or question
- Apply the `keep-open` label if this issue should stay open indefinitely

_If this issue is still relevant, feel free to re-open it after it closes._

_Managed by the Stale Patrol workflow._
```

**Closing comment:**

```markdown
## 🗃️ Issue Closed — Stale

This issue has been closed automatically after **44+ days** with no activity
(30-day stale window + 14-day grace period).

**Not the right outcome?**
- Re-open this issue with a comment explaining why it's still relevant.
- Apply `keep-open` to prevent future auto-closure.

_Closed by the Stale Patrol workflow._
```

## Constraints

- **Never** close issues with the `keep-open` label, regardless of age.
- **Never** close issues assigned to a user — they are actively worked.
- **Never** close issues with `priority-critical` or `priority-high` labels.
- Close at most **5** issues per run (`update-issue: max: 5`). If more than 5
  need closing, close the 5 oldest and let the next daily run handle the rest.
- In `dry_run` mode, post a single summary comment instead of acting:
  `"Dry run: would have warned {N} issues and closed {M} issues."`

{{#runtime-import shared/noop-reminder.md}}
