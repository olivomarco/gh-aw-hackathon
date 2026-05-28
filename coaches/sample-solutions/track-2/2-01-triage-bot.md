###### Challenge 2-01 — Triage Bot
###### Adapted from: issue-triage-agent.md (github/gh-aw) — full production version
###### Source: https://github.com/github/gh-aw/blob/main/.github/workflows/issue-triage-agent.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.015 (Copilot, structured reasoning)

---
on:
  issues:
    types: [opened, reopened]
    # lock-for-agent prevents two triage runs from racing on the same issue.
    lock-for-agent: true
  workflow_dispatch:

permissions:
  contents: read
  issues: write

safe-outputs:
  add-labels:
    allowed:
      # Priority labels
      - priority-critical
      - priority-high
      - priority-medium
      - priority-low
      # Type labels
      - bug
      - feature
      - enhancement
      - documentation
      - question
      - help-wanted
      - good-first-issue
      # Status labels
      - needs-info
      - needs-triage
      - duplicate
      - invalid
      - wontfix
  add-comment: {}
  noop:

engine: copilot

tools:
  github:
    # Only process issues from verified contributors (not anonymous spammers).
    # Set to 'none' if this is a public repo that needs to triage external contributors.
    min-integrity: collaborator
    toolsets:
      - issues
      - labels
---

## Goal

Perform a thorough, two-dimensional triage of every newly opened issue:
1. **Type classification** — what kind of issue is this?
2. **Priority assessment** — how urgently does it need attention?

Apply both a type label and a priority label, then post a structured triage
comment that explains the reasoning and tells the reporter what to expect next.

This is the **full Triage Bot** — the production-grade version of Challenge 1-04.
The key additions over Label Maker: dual-label taxonomy, priority reasoning, and
a richer structured comment that includes an SLA estimate.

## Steps

1. **Read the issue** — title, body, and any linked issues or PRs.

2. **Classify the type** using the same type label taxonomy as Challenge 1-04.

3. **Assess the priority** using this decision tree:

   | Priority | Criteria |
   |----------|---------|
   | `priority-critical` | Production broken; data loss; security vulnerability; blocks all users |
   | `priority-high` | Major feature broken; many users affected; blocks common workflows |
   | `priority-medium` | Moderate impact; has a workaround; affects subset of users |
   | `priority-low` | Minor inconvenience; cosmetic; nice-to-have; affects few users |

   Use the issue body's severity language as signal:
   - Words like "crash", "data loss", "all users", "production" → lean critical/high
   - Words like "sometimes", "workaround", "minor" → lean medium/low
   - Feature requests → default to `priority-medium` unless scoped as tiny (→ low)

4. **Check for missing information.** If the issue is a `bug` and the body lacks
   *any* of (steps-to-reproduce, expected behaviour, actual behaviour, version),
   apply `needs-info` as a third label.

5. **Apply the labels** — type + priority + optional `needs-info`.

6. **Post a triage comment** using the template in the Output format section.

7. **If the issue is clearly `invalid`** (test submission, off-topic, spam),
   apply `invalid` and call `noop` instead of posting the full triage comment.

## Output format

**Triage comment template:**

```markdown
## 🔍 Triage Report

| Field | Value |
|-------|-------|
| Type | `{type-label}` |
| Priority | `{priority-label}` |
| Needs info | {Yes — see below / No} |

### Reasoning

{2–3 sentences explaining why this type and priority were chosen, referencing
specific language from the issue body.}

{If needs-info:}
### 📋 Information needed

To investigate this bug we need:
- [ ] Steps to reproduce (numbered list, starting from a clean state)
- [ ] Expected behaviour (what should happen)
- [ ] Actual behaviour (what actually happens, including any error messages)
- [ ] Environment: OS, version, relevant config

Please add these details and the `needs-triage` label will be removed.

### ⏱️ What to expect

{Based on priority:}
- `priority-critical`: A maintainer will respond within 24 hours.
- `priority-high`: Expected response within 3 business days.
- `priority-medium`: Expected response within 2 weeks.
- `priority-low`: Addressed when bandwidth allows; community PRs welcome.

_Triaged automatically by the Triage Bot._
```

## Constraints

- Apply **at most 3** labels: one type, one priority, optionally `needs-info`.
- Do **not** apply `priority-critical` unless the issue body contains explicit
  evidence of production impact or data loss. Default to `priority-high` when
  uncertain between critical and high.
- Keep the triage comment under 400 words.
- Do **not** post a triage comment for `invalid` or `wontfix` issues — just apply
  the label and call `noop`.

{{#runtime-import shared/noop-reminder.md}}
