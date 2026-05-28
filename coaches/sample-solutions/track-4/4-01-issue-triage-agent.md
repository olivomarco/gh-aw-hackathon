###### Challenge 4-01 — Issue Triage Agent
###### Source: https://github.com/github/gh-aw/blob/main/.github/workflows/issue-triage-agent.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.02 (Copilot, per issue)

---
on:
  issues:
    types: [opened, reopened]

permissions:
  contents: read
  issues: write

safe-outputs:
  add-labels:
    allowed:
      - bug
      - enhancement
      - question
      - documentation
      - good-first-issue
      - duplicate
      - wontfix
      - needs-triage
      - needs-reproduction
  add-comment: {}

engine: copilot

checkout: false
---

## Goal

Automatically triage every new or reopened issue: pick the right labels, and
post a brief comment explaining the triage decision so the author understands
what happens next.

This is the **canonical production triage pattern** from the `gh-aw` repo itself.
Key learning: `checkout: false` is sufficient here because all context comes
from the issue payload, not the codebase.

## Steps

1. **Read the issue** — title, body, and any existing labels from the event payload.

2. **Classify the issue** into one primary category:
   - `bug` — reporter describes something that stopped working or produces wrong output
   - `enhancement` — request for new functionality or improvement
   - `question` — seeking guidance, not reporting a defect
   - `documentation` — README, docs, comments, or examples need updating
   - `duplicate` — clearly the same as an existing open issue (check visible context)

3. **Apply secondary labels** when appropriate:
   - `good-first-issue` — clearly scoped, no deep codebase knowledge required
   - `needs-reproduction` — bug report lacks steps to reproduce
   - `needs-triage` — insufficient information to classify confidently

4. **Post a comment** that:
   - Confirms which labels were applied and **why** (one sentence each)
   - States the next expected action (e.g., "A maintainer will review," "Please add reproduction steps")
   - Is professional but concise — under 120 words

5. **If the issue is completely unintelligible** (e.g., empty body, test submission):
   - Apply `needs-triage`
   - Ask politely for more detail in the comment

## Output format

```markdown
Thanks for opening this issue, @{author}!

I've triaged it as **{primary label}** because {one-sentence reason}.
{If secondary labels were applied: "I've also added {label} because {reason}."}

**Next step:** {what happens next — maintainer review / reproduction steps needed / etc.}

_Triaged automatically by the Issue Triage Agent._
```

## Constraints

- Apply **at most one** primary label (`bug`, `enhancement`, `question`, `documentation`, `duplicate`)
- Do **not** guess — if uncertain between two categories, use `needs-triage` and ask
- Do **not** close the issue, even if it looks like a duplicate; only a human should close
- Never expose internal reasoning; the comment must be user-facing and friendly

{{#runtime-import shared/noop-reminder.md}}
