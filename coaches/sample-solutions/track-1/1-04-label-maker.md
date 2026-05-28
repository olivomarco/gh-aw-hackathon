###### Challenge 1-04 — Label Maker
###### Adapted from: issue-triage-agent.md (github/gh-aw) + auto-triage-issues.md (github/gh-aw)
###### Sources: https://github.com/github/gh-aw/blob/main/.github/workflows/issue-triage-agent.md
######          https://github.com/github/gh-aw/blob/main/.github/workflows/auto-triage-issues.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.01 (Copilot, per-issue classification)

---
on:
  issues:
    # Fire immediately when an issue is opened.
    types: [opened, reopened]
    # lock-for-agent prevents two concurrent runs from labelling the same issue twice
    # on high-traffic repos. Essential best practice for event-driven write workflows.
    lock-for-agent: true
  schedule:
    # Also run daily to catch any issues that slipped through the event trigger
    # (e.g., created while the workflow was paused or during an outage).
    - cron: "0 6 * * *"
  workflow_dispatch:

permissions:
  contents: read
  issues: write   # Required for add-labels and add-comment safe-outputs.

safe-outputs:
  add-labels:
    # Allowlist keeps the agent from inventing new labels.
    allowed:
      - bug
      - feature
      - enhancement
      - documentation
      - question
      - help-wanted
      - good-first-issue
      - duplicate
      - invalid
      - wontfix
  add-comment: {}
  noop:

engine: copilot

---

## Goal

Classify every newly opened GitHub issue and apply the single most appropriate
label from the allowed list. Post a brief, friendly comment explaining the
classification so the reporter understands why the label was chosen.

This is the **canonical event-driven triage pattern**: the `on: issues: opened`
trigger handles new issues in real time, and the daily schedule batch-processes
any that were missed.

## Steps

1. **Identify unprocessed issues.**
   - On an `issues: opened` trigger: process the single issue that triggered
     the workflow.
   - On a `schedule` or `workflow_dispatch` trigger: use the GitHub MCP
     `issues` toolset to list all open issues with **no labels**, then
     process each one.

2. **For each issue**, classify it by reading the title and body:

   | Label | Apply when |
   |-------|-----------|
   | `bug` | Reporter describes unexpected behaviour, crash, or error |
   | `feature` | Request for new functionality not currently present |
   | `enhancement` | Improvement to existing functionality |
   | `documentation` | About docs, README, wiki, or code comments |
   | `question` | Asking how to do something; seeking clarification |
   | `help-wanted` | Contributor is asking for community assistance |
   | `good-first-issue` | Small, well-scoped, approachable for a new contributor |
   | `duplicate` | Issue body or title closely matches an already-open issue |
   | `invalid` | Not a valid issue (test submission, gibberish, off-topic) |
   | `wontfix` | Clearly out of scope or intentionally not addressed |

3. **Apply the best-fit label** using `add-labels`.

4. **Post a comment** using `add-comment` to explain the classification.
   Use the comment template in the Output format section.

5. **If all open issues already have labels** (batch run with no unlabelled
   issues), call `noop` with reason `"All open issues already have labels — nothing to do."`

## Output format

**Comment template:**

```markdown
👋 Thanks for opening this issue!

I've classified it as **`{label}`** because: {one sentence rationale, specific to
this issue's content — not a generic explanation of the label}.

{If label is `bug`:}
> To help us investigate faster, please make sure the issue includes:
> - Steps to reproduce
> - Expected vs actual behaviour
> - Environment details (OS, version, etc.)

{If label is `question`:}
> You might also find an answer in the [documentation](../../README.md) or by
> searching [existing issues](../../issues).

{If label is `good-first-issue`:}
> This looks approachable for a first contribution! Feel free to comment here
> if you'd like to be assigned.

_Labelled automatically by the Label Maker workflow._
```

## Constraints

- Apply **exactly one** label per issue — pick the single best fit.
- Do **not** apply `wontfix` or `invalid` to issues from repo owners or
  maintainers — check author association first.
- Do **not** process issues that already have at least one label; they have been
  handled previously.
- Keep comment responses under 200 words.
- On the scheduled batch run, process a maximum of 20 unlabelled issues per
  execution to stay within the token budget.

{{#runtime-import shared/noop-reminder.md}}
