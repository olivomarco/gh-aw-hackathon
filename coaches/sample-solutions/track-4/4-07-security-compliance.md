###### Challenge 4-07 — Security & Compliance Campaign Tracker
###### Source: https://github.com/github/gh-aw/blob/main/.github/workflows/security-compliance.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.06 (Copilot, per daily scan)

---
on:
  schedule:
    - cron: "0 8 * * *"
  workflow_dispatch:

permissions:
  contents: read
  issues: write
  security-events: read

safe-outputs:
  create-issue:
    labels:
      - security
      - compliance

engine: copilot
---

## Goal

Daily, review open security and compliance issues for SLA breaches and
escalation needs. This workflow enforces accountability: security issues
that stall without progress get automatically escalated.

Key learning: this is a **campaign management** workflow — it doesn't find new
vulnerabilities (Dependabot and CodeQL do that). It ensures the ones already
found are actually being actioned.

## SLA policy

| Severity | First response | Resolution target |
|----------|---------------|------------------|
| Critical | 24 hours | 7 days |
| High | 48 hours | 14 days |
| Medium | 5 days | 30 days |
| Low | 14 days | 90 days |

## Steps

1. **Collect open security / compliance issues**
   Query open issues with any of these labels: `security`, `compliance`,
   `vulnerability`, `cve`, `dependabot`.

2. **For each issue, compute SLA status**
   - Determine severity from labels (`critical`, `high`, `medium`, `low`)
     or from the issue title/body (e.g., "CVSS 9.1" implies critical)
   - Calculate days since opening and days since last activity (comment, label change, assignee change)
   - Classify as:
     - `on-track` — within SLA, recent activity
     - `at-risk` — within SLA but no activity in the last (SLA / 2) days
     - `breached` — past the resolution target with no closure

3. **Escalate breached and at-risk issues**
   For issues classified `breached` or `at-risk`:
   - Post a comment on the existing issue (use `add-comment` if available, or note in new issue)
   - Create a new escalation issue that links back to the original

4. **Create a daily status summary issue** if any issues are `at-risk` or `breached`.
   If everything is `on-track`: call `noop` with reason `"All security/compliance issues are within SLA."`

## Output format

**Escalation issue title:** `[ESCALATION] Security issue #{N} — SLA {breached/at-risk}`

**Escalation issue body:**

```markdown
## Security SLA Escalation

**Original issue:** #{original issue number} — {title}
**Severity:** {critical / high / medium / low}
**Opened:** {date} ({N} days ago)
**Last activity:** {date} ({N} days ago)
**SLA status:** {BREACHED — {N} days overdue / AT-RISK — no activity for {N} days}

### Required action

{Specific next step — e.g., "Assign an owner and post a resolution ETA within 24 hours"}

This escalation was generated automatically. Please update the original issue
with current status. If this issue has been resolved, close it to clear the escalation.

_Escalated automatically by the Security Compliance workflow._
```

## Constraints

- Do **not** create duplicate escalation issues — check for existing open escalation
  issues referencing the same original issue number before creating
- Do **not** close any issues — escalation and closure are human decisions
- If `security-events: read` returns no Dependabot alerts, fall back to issue label scan only
- Cap escalation issue creation at **10 per run** to prevent flooding

{{#runtime-import shared/noop-reminder.md}}
