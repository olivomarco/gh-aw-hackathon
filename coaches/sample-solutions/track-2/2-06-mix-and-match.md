###### Challenge 2-06 — Mix & Match
###### Concepts: imports, create-discussion safe-output
###### Engine: copilot
###### Trigger: weekly schedule
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.01

---
on:
  schedule:
    - cron: "0 9 * * 1"

permissions:
  discussions: write
  issues: read
  pull-requests: read

safe-outputs:
  create-discussion:
    category: "General"
  noop:
    # Called if the digest cannot be assembled (no data available yet).

engine: copilot

imports:
  - ./lib/repo-stats-helper.md

checkout: false
---

## Goal

Write a **weekly repository health digest** for this project and post it as a
GitHub Discussion. This workflow fires every Monday at 09:00 UTC.

The key learning in this challenge: **`imports`** let you pull shared instructions
into a workflow at compile time, keeping individual workflow files focused and
reusable conventions DRY.

## Steps

1. **Gather open issue data.**
   - Fetch the list of all open issues.
   - Count the total.
   - Identify the top 3 labels by frequency (skip issues with no labels).
   - Identify any issues that have had **no activity** (no comments, no label
     changes) for more than 30 days — these are stale.

2. **Gather open pull request data.**
   - Fetch all open pull requests.
   - Count the total.
   - Find the oldest open PR. Calculate how long it has been open (in days)
     from its creation date to today.

3. **Write the digest** — 200–300 words, in plain English.
   Follow the conventions in the imported `repo-stats-helper.md` for
   date formatting, label reporting, PR age flags, and staleness thresholds.

   Structure:
   ```markdown
   ## 📊 Weekly Repo Health — YYYY-MM-DD

   ### Issues
   - X open issues
   - Top labels: [label A (N), label B (N), label C (N)]
   - Stale issues (no activity 30+ days): N

   ### Pull Requests
   - X open PRs
   - Oldest PR: #NNN — "[title]" — open for N days [⚠️ needs attention if >7]

   ### Recommendation
   [One actionable recommendation for the maintainers — specific, not generic.]
   ```

4. **End with one recommendation** — make it specific to what you found.
   Examples:
   - "Three PRs have been open more than 7 days without review. Consider a
     dedicated review session this week."
   - "Nine stale issues are cluttering the backlog. Label them `needs-triage`
     and ask contributors to confirm they're still relevant."

5. **Post the digest** as a GitHub Discussion titled exactly:
   `📊 Weekly Repo Health — {{date}}`
   where `{{date}}` is today's date in ISO 8601 format (YYYY-MM-DD).

## Constraints

- If no issues or PRs exist, report "0 open issues" / "0 open PRs" — do NOT
  skip the section. A healthy zero is worth reporting.
- If the Discussion cannot be created (category doesn't exist, permissions
  error), call `noop` with a reason explaining what was missing.
- Keep the digest under 350 words total. Scannable beats comprehensive.
- Do not include raw JSON or API responses in the Discussion body.

{{#runtime-import shared/noop-reminder.md}}
