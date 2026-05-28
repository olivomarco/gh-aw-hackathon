###### Challenge 1-01 — Morning Briefing
###### Adapted from: blog-auditor.md (github/gh-aw) + org-health-report.md (github/gh-aw)
###### Sources: https://github.com/github/gh-aw/blob/main/.github/workflows/blog-auditor.md
######          https://github.com/github/gh-aw/blob/main/.github/workflows/org-health-report.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.01 (Copilot, default model)

---
on:
  schedule:
    # Run every weekday morning at 08:00 UTC.
    # Named schedule syntax ("daily around 08:00 on weekdays") is also valid.
    - cron: "0 8 * * 1-5"
  workflow_dispatch:

permissions:
  # Read-only. safe-outputs: create-issue handles the write.
  contents: read
  issues: read

safe-outputs:
  create-issue:
    # One briefing issue per day; close any still-open briefing from yesterday.
    max: 1
    close-older-issues: true
    labels: [morning-briefing, automated]
    # 2-day TTL keeps the issue visible through the day, then auto-closes.
    expires: 2d
  noop:
    # Required exit if the repo has no activity to report.

engine: copilot
---

## Goal

Post a concise morning briefing issue every weekday at 08:00 UTC summarising the
repository's activity from the previous 24 hours. The briefing should help the team
start the day with a clear picture of outstanding work.

## Steps

1. **Collect yesterday's activity** using the GitHub MCP tools (`issues` and
   `pull_requests` toolsets):
   - Issues opened, closed, or updated in the past 24 hours
   - Pull requests opened, closed, merged, or receiving review comments
   - Any new labels applied

2. **Assess whether there is anything to report.** If zero issues were touched and
   zero PRs moved in the past 24 hours, call `noop` with the reason
   `"No activity since last briefing — nothing to report."` and stop. Do not create
   an empty issue.

3. **Draft a briefing** using the structure in the Output format section below.

4. **Create the briefing issue** via the `create-issue` safe-output.

## Output format

The issue title must follow exactly:

```
📋 Morning Briefing — {YYYY-MM-DD}
```

The issue body must use this template:

```markdown
## 📋 Morning Briefing — {date}

_Auto-generated at 08:00 UTC. Covers the past 24 hours._

### 🐛 Issues
- **Opened:** {N} — {list titles, linked, max 5; "none" if 0}
- **Closed:** {N} — {list titles, linked, max 5; "none" if 0}
- **Still open & unlabelled:** {N} — {list titles, linked, max 3}

### 🔀 Pull Requests
- **Opened:** {N} — {list titles, linked, max 5; "none" if 0}
- **Merged:** {N} — {list titles, linked, max 5; "none" if 0}
- **Awaiting review (>24 h):** {N} — {list titles, linked, max 3}

### ⚡ Quick actions needed
{If any issues are unlabelled or any PRs have been waiting >24 h for review,
list them here as a short bullet list with owner mentions if visible.
Otherwise write: "None — great shape! 🎉"}
```

## Constraints

- Titles may be truncated at 60 characters if necessary; always include the issue/PR number as a link.
- Do **not** include issues or PRs that were opened **and** closed in the same 24-hour window in the "still open" count.
- Keep the total issue body under 3 000 characters.
- Do **not** mention specific user names beyond their GitHub handles.

{{#runtime-import shared/noop-reminder.md}}
