###### Challenge 4-05 — Uber Expert Testify Analyzer
###### Source: https://github.com/github/gh-aw/blob/main/.github/workflows/daily-testify-uber-super-expert.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.04 (Copilot, per analysis run)
###### Pattern: Causal chain — this workflow creates issues; a separate workflow turns them into PRs.

---
on:
  schedule:
    - cron: "0 5 * * *"
  workflow_dispatch:

permissions:
  contents: read
  issues: write

safe-outputs:
  create-issue:
    labels:
      - test-quality

engine: copilot
---

## Goal

Daily, scan Go test files for assertions that bypass the `testify` library and
recommend modernisation. This workflow **only creates issues** — it never opens PRs.
A separate workflow (triggered by the `test-quality` label) will turn approved
issues into pull requests.

**This teaches the "causal chain" pattern:** Agent A audits → creates issue →
Agent B (or human) reviews → Agent C implements. Each agent in the chain does one
thing well.

## Steps

1. **Find Go test files**
   Locate all `*_test.go` files in the repository.

2. **Scan for non-testify assertions**
   Look for these patterns that should use `testify` instead:
   - `if err != nil { t.Fatal(...) }` → `require.NoError(t, err)`
   - `if got != expected { t.Errorf(...) }` → `assert.Equal(t, expected, got)`
   - `if got == nil { t.Fatal(...) }` → `require.NotNil(t, got)`
   - `if len(slice) != n { t.Errorf(...) }` → `assert.Len(t, slice, n)`
   - Bare `t.Fatal(fmt.Sprintf(...))` without testify → `require.Fail(t, ...)`
   - `if !strings.Contains(s, sub) { t.Error(...) }` → `assert.Contains(t, s, sub)`

3. **Group findings by file**
   For each affected file, list the specific line numbers and the current vs
   recommended pattern.

4. **Assess priority**
   - `high` — 10 or more non-testify assertions in a single file
   - `medium` — 3–9 non-testify assertions in a single file
   - `low` — 1–2 non-testify assertions in a single file

5. **If no non-testify assertions found**: call `noop` with reason
   `"All Go test assertions already use testify — no modernisation needed."`

6. **Create one issue per file** (not one mega-issue), capped at 5 issues per run
   to avoid flooding.

## Output format

Issue title: `test: modernise assertions in {filename} (testify)`

Issue body:

```markdown
## Testify Modernisation: `{filepath}`

Priority: **{high / medium / low}**

The following assertions in `{filepath}` bypass `testify` and should be
modernised for consistency, better failure messages, and reduced boilerplate.

### Findings

| Line | Current Pattern | Recommended Replacement |
|------|----------------|------------------------|
| {N} | `{current code}` | `{testify equivalent}` |

### Why testify?

- Failure messages show actual vs expected values automatically
- `require.*` stops the test immediately on failure (no nil dereference cascade)
- Consistent style across the codebase is easier to read and review

### Next step

A reviewer should approve this issue, then the test-improver workflow will
open a PR with the changes applied.

_Identified automatically by the Testify Analyzer. Estimates based on static scan._
```

## Constraints

- Create **at most 5 issues per run** — daily cadence means gradual progress is fine
- Do **not** open PRs — this workflow is the audit stage only
- Check for existing open `test-quality` issues referencing the same file before
  creating duplicates
- Do **not** flag test helper functions that intentionally wrap `t.Fatal` — only
  flag direct test function bodies

{{#runtime-import shared/noop-reminder.md}}
