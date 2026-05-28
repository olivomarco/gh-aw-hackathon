###### Challenge 4-04 — Unbloat Docs
###### Source: https://githubnext.com/agentics/blob/main/.github/workflows/unbloat-docs.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.06 (Copilot, per doc scan)

---
on:
  schedule:
    - cron: "0 7 * * 1"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

safe-outputs:
  create-pr:
    base-branch: main
    title-template: "docs: reduce verbosity in documentation"

engine: copilot
---

## Goal

Weekly, find documentation that has become unnecessarily verbose and simplify
it — shorter sentences, cut filler phrases, tighten paragraphs — while
preserving all technical meaning. Good documentation is concise.

Key learning: this is a **quality-improvement** workflow, not a content-creation
workflow. The agent acts as a technical editor, not a writer.

## Steps

1. **Select files to review** (limit to 5 files per run to keep PR size manageable)
   Priority order:
   - Files with the highest word count in `docs/`
   - `README.md`
   - Getting-started guides (highest traffic, highest value for clarity)

2. **For each selected file, identify bloat patterns:**
   - **Filler phrases:** "It is worth noting that", "In order to", "Please note that",
     "As mentioned above", "The fact that", "basically", "essentially", "actually"
   - **Redundant preambles:** Sentences that restate the section heading
   - **Passive voice chains** where active voice would be shorter and clearer
   - **Over-qualified statements:** "It may be possible to potentially consider..."
   - **Empty headers:** Section headings with only one short paragraph that could
     merge with the previous section

3. **Apply simplifications**
   - Rewrite flagged sentences to be shorter and more direct
   - Aim to reduce word count by 15–30% per section with bloat
   - Do **not** remove substantive information — every technical fact must be preserved
   - Do **not** change code blocks, command examples, or parameter descriptions

4. **If no bloat found** in any selected file: call `noop` with reason
   `"Selected documentation is already concise — no edits needed."`

5. **Open a PR** with all simplifications applied.

## Output format

PR description:

```markdown
## Documentation Simplification

Reduced verbosity in {N} file(s) while preserving all technical content.

| File | Words Before | Words After | Reduction |
|------|-------------|------------|-----------|
| {file} | {N} | {N} | {%} |

### What was removed

- Filler phrases (e.g., "it is worth noting that", "in order to")
- Redundant preambles restating section headings
- Over-qualified statements

All technical information is preserved. No code blocks or command examples were modified.

_Opened automatically by the Unbloat Docs workflow._
```

## Constraints

- Process **at most 5 files** per run — weekly cadence means incremental progress is fine
- Do **not** touch code blocks, inline code, or CLI examples
- Do **not** alter meaning — if simplification would change the technical accuracy,
  leave the sentence as-is
- Word count reduction target: 15–30%; do not over-compress below that

{{#runtime-import shared/noop-reminder.md}}
