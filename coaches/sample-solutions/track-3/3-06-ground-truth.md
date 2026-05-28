###### Challenge 3-06 — Ground Truth
###### Concepts: pre-agent-steps, create-pr safe-output
###### Engine: copilot
###### Trigger: weekly schedule + workflow_dispatch
###### Estimated compile cost: ~3s  |  Estimated first-run cost: ~$0.02–$0.05

---
on:
  schedule:
    - cron: "0 8 * * 1"
  workflow_dispatch: {}

permissions:
  contents: write
  issues: read
  pull-requests: write

safe-outputs:
  create-pr:
    base-branch: main
    title-template: "docs: weekly CONTRIBUTING.md health update ({{date}})"
  noop:
    # Called if metrics cannot be read or CONTRIBUTING.md is already up to date.

engine: copilot

pre-agent-steps:
  - name: Fetch repository health metrics
    run: |
      # Open issues count
      gh api "/repos/${{ github.repository }}/issues?state=open&per_page=100" \
        --jq 'length' > open-issues.txt

      # Open PRs count
      gh pr list --state open --json number \
        --jq 'length' > open-prs.txt

      # Last commit date on main
      git log -1 --format="%ci" HEAD > last-commit.txt 2>/dev/null \
        || echo "unknown" > last-commit.txt

      echo "Metrics collected:" && cat open-issues.txt && cat open-prs.txt

checkout: true
---

## Goal

Keep `CONTRIBUTING.md` honest. Every Monday, fetch live repository metrics from
the GitHub API, then **update a `## Project Health` section** inside
`CONTRIBUTING.md` with the current numbers. Propose the change as a pull request
so it's reviewed before merging.

The key learning: **`pre-agent-steps`** run *before* the agent, inside the
Actions runner. Use them to fetch data that requires shell tools (`gh`, `git`,
`jq`) and write it to files the agent can then read. The agent never calls
the API directly — it reads pre-collected facts.

## Steps

1. **Read the metric files** produced by `pre-agent-steps`:
   - `open-issues.txt` — integer: number of open issues
   - `open-prs.txt` — integer: number of open pull requests
   - `last-commit.txt` — datetime string: ISO 8601 date of last commit on HEAD

2. **Calculate the status badge** from `last-commit.txt`:
   - 🟢 **Active** — last commit was less than 7 days ago
   - 🟡 **Quiet** — last commit was 7–30 days ago
   - 🔴 **Stale** — last commit was more than 30 days ago
   - ❓ **Unknown** — `last-commit.txt` contains the string `"unknown"`

3. **Open `CONTRIBUTING.md`.**
   Look for an existing `## Project Health` section.
   - If it exists: replace only the content of that section (from the
     `## Project Health` heading to the next `##` heading).
   - If it does not exist: insert the new section immediately after the
     opening introduction paragraph, before any `## Getting Started` or
     equivalent section.

4. **Write the `## Project Health` section** with exactly this structure:

   ```markdown
   ## Project Health

   | Metric | Value |
   |--------|-------|
   | Open issues | [number from open-issues.txt] |
   | Open PRs | [number from open-prs.txt] |
   | Last commit | [date from last-commit.txt] |
   | Status | [badge emoji + label] |

   _Last updated: YYYY-MM-DD_
   ```

   Use today's date in ISO 8601 format for `Last updated`.

5. **Do not modify any other part of `CONTRIBUTING.md`.** Preserve all
   headings, paragraphs, code blocks, and links outside this section exactly
   as-is. If the file does not exist yet, create a minimal `CONTRIBUTING.md`
   with just a title line and the `## Project Health` section.

6. **Propose the change as a pull request.**
   The `create-pr` safe-output will open the PR against `main` with the
   title template configured in the frontmatter.
   In the PR body, briefly summarise what changed and why
   (e.g. "Updated Project Health section: 5 open issues (+2), 2 open PRs,
   last commit 2026-05-26, status 🟢 Active").

7. **If the metrics files are unreadable or empty**, or if the calculated
   section content is identical to what already exists in `CONTRIBUTING.md`,
   call `noop` with a clear reason. Do not open a PR with no real changes.

## Constraints

- Only the `## Project Health` section may change — no other edits.
- The PR title must follow the `title-template` from the frontmatter.
- The status badge must use exactly the emoji + label combinations above.
- Do not invent numbers. If a metric file is empty, report `"unknown"` for
  that field and note it in the PR description.

{{#runtime-import shared/noop-reminder.md}}
