###### Challenge 4-03 — Daily Doc Updater
###### Source: https://githubnext.com/agentics/blob/main/.github/workflows/daily-doc-updater.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.08 (Copilot, per doc scan)

---
on:
  schedule:
    - cron: "0 6 * * *"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

safe-outputs:
  create-pr:
    base-branch: main
    title-template: "docs: daily documentation refresh"

engine: copilot
---

## Goal

Every morning, scan the repository's documentation for drift — places where
the docs no longer match the code — and open a pull request with targeted
fixes. Keep docs in sync automatically without requiring a human to notice
the gap.

Key learning: `create-pr` as a safe output means the agent **proposes** changes
through a PR; a human reviews and merges. The agent never directly pushes to `main`.

## Steps

1. **Identify documentation files to review**
   - `README.md` (root)
   - All files under `docs/`
   - Any `*.md` files co-located with source code that describe public APIs

2. **For each file, check for drift**
   Look for these specific patterns:
   - **Stale command syntax** — code blocks showing CLI commands or API calls that
     don't match what's in the actual source files
   - **Broken relative links** — links to files that no longer exist at the referenced path
   - **Version numbers** — hardcoded version strings that appear outdated relative to
     `package.json`, `go.mod`, `pyproject.toml`, or similar manifest files
   - **Missing coverage** — public functions, classes, or CLI flags present in code
     but not mentioned anywhere in docs

3. **Propose targeted fixes**
   For each piece of drift found, prepare a specific edit: update the stale text,
   fix the broken link, or add the missing section. Do not rewrite sections that
   are still accurate — surgical edits only.

4. **If no drift is found**: call `noop` with reason `"Documentation is current — no changes needed."`

5. **If drift is found**: open a PR with:
   - All fixes applied across the affected files
   - PR description listing each change and why it was made (see Output format)

## Output format

PR description:

```markdown
## Daily Documentation Refresh

Automated scan found the following drift:

| File | Issue | Fix Applied |
|------|-------|-------------|
| {file} | {description of drift} | {description of fix} |

### Changes

{List of files changed with one-line summary per file}

_Opened automatically by the Daily Doc Updater workflow. Review and merge when ready._
```

## Constraints

- Open **at most one** PR per day — check for an open PR with title matching
  `"docs: daily documentation refresh"` before creating
- Do **not** rewrite prose for style — only fix factual drift
- Do **not** modify source code files — documentation only
- Limit the PR to **10 files** maximum; if more drift is found, prioritise
  `README.md` and the most-trafficked `docs/` pages

{{#runtime-import shared/noop-reminder.md}}
