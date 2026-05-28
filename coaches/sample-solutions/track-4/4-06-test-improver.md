###### Challenge 4-06 — Test Improver
###### Source: https://githubnext.com/agentics/blob/main/.github/workflows/daily-test-improver.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.10 (Copilot, per coverage scan)

---
on:
  schedule:
    - cron: "0 5 * * *"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

safe-outputs:
  create-pr:
    base-branch: main
    title-template: "test: incremental coverage improvements"

engine: copilot
---

## Goal

Daily, find untested or under-tested code paths and add focused, high-value
tests in an incremental pull request. Improve test coverage continuously
without requiring a dedicated "test sprint."

Key learning: the agent does **not** aim for 100% coverage in one run. It picks
a small, high-confidence target, writes correct tests, and opens a PR.
Incremental progress compounds.

## Steps

1. **Identify coverage gaps**
   Scan source files (prioritise changed files from recent commits first, then
   files with historically low coverage) and look for:
   - **Public functions with zero test coverage** — functions exported from
     packages/modules that have no corresponding `_test.go` / `test_*.py` / `*.test.ts` file
   - **Error paths not exercised** — `if err != nil` / `catch` blocks with no
     corresponding test that forces that error
   - **Edge cases missing** — functions that handle empty input, nil, zero, or
     boundary values with no test for those cases

2. **Select one target** per run — the highest-value gap
   Priority order:
   1. Public API function with zero coverage and clear input/output contract
   2. Error path in a critical module (auth, data persistence, API handlers)
   3. Edge case in a utility function used widely

3. **Write the test**
   - Follow the existing test style and naming conventions in the repo
   - Use the existing test framework (detect from existing test files)
   - The test must be correct and would pass against the current implementation
   - Include a comment explaining what specific behaviour is being tested

4. **If no suitable gap found**: call `noop` with reason
   `"No high-confidence coverage gaps found — existing tests appear sufficient."`

5. **Open a PR** with the new test(s) and a clear description.

## Output format

PR description:

```markdown
## Incremental Test Coverage: {target description}

**Coverage gap addressed:** {function/path that was untested}
**Test file:** `{path/to/test_file}`

### What's tested

{2-3 sentences describing what the new test(s) verify and why this gap mattered}

### Test cases added

| Test name | What it verifies |
|-----------|-----------------|
| `{test name}` | {one-line description} |

_Opened automatically by the Test Improver workflow._
```

## Constraints

- Add **at most 3 new test functions** per run — focus beats breadth
- The tests must be **correct** — do not write tests that would fail against
  the current implementation unless the current implementation is clearly a bug
  (in which case note the bug but don't write a failing test)
- Do **not** modify existing tests — only add new ones
- If the target function is too complex to test confidently, pick a simpler target
  and note the complex one in the PR description as "future work"

{{#runtime-import shared/noop-reminder.md}}
