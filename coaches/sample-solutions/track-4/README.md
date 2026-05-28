# Track 4 — Production Patterns: Sample Solutions

Each sample in this track is adapted from a real workflow running in production
in the [`github/gh-aw`](https://github.com/github/gh-aw) or
[`githubnext/agentics`](https://github.com/githubnext/agentics) repositories.
These are not toy examples — they are simplified versions of workflows that
run daily in real codebases.

## The 8 Samples

| # | File | Pattern | Original Source |
|---|------|---------|-----------------|
| 4-01 | [4-01-issue-triage-agent.md](./4-01-issue-triage-agent.md) | Event-driven labelling | [github/gh-aw — issue-triage-agent.md](https://github.com/github/gh-aw/blob/main/.github/workflows/issue-triage-agent.md) |
| 4-02 | [4-02-ci-doctor.md](./4-02-ci-doctor.md) | Failure investigation + issue creation | [githubnext/agentics — ci-doctor.md](https://githubnext.com/agentics/blob/main/.github/workflows/ci-doctor.md) |
| 4-03 | [4-03-daily-doc-updater.md](./4-03-daily-doc-updater.md) | Scheduled drift detection + PR | [githubnext/agentics — daily-doc-updater.md](https://githubnext.com/agentics/blob/main/.github/workflows/daily-doc-updater.md) |
| 4-04 | [4-04-unbloat-docs.md](./4-04-unbloat-docs.md) | Weekly editorial simplification | [githubnext/agentics — unbloat-docs.md](https://githubnext.com/agentics/blob/main/.github/workflows/unbloat-docs.md) |
| 4-05 | [4-05-uber-expert-testify.md](./4-05-uber-expert-testify.md) | Audit-only causal chain (issues, no PRs) | [github/gh-aw — daily-testify-uber-super-expert.md](https://github.com/github/gh-aw/blob/main/.github/workflows/daily-testify-uber-super-expert.md) |
| 4-06 | [4-06-test-improver.md](./4-06-test-improver.md) | Coverage gap detection + incremental PR | [githubnext/agentics — daily-test-improver.md](https://githubnext.com/agentics/blob/main/.github/workflows/daily-test-improver.md) |
| 4-07 | [4-07-security-compliance.md](./4-07-security-compliance.md) | SLA enforcement + escalation | [github/gh-aw — security-compliance.md](https://github.com/github/gh-aw/blob/main/.github/workflows/security-compliance.md) |
| 4-08 | [4-08-malicious-code-scan.md](./4-08-malicious-code-scan.md) | Recent-change semantic review | [githubnext/agentics — daily-malicious-code-scan.md](https://githubnext.com/agentics/blob/main/.github/workflows/daily-malicious-code-scan.md) |

## Key Patterns Covered

### Causal Chain (4-05)
The "Audit → Issue → PR" pattern separates concerns: one workflow flags problems,
a human (or another workflow) reviews, a third workflow implements the fix.
This keeps each agent small, auditable, and reversible.

### Scheduled Maintenance (4-03, 4-04, 4-06, 4-07, 4-08)
Five of the eight samples run on a schedule. This is the dominant production
pattern — continuous background improvement rather than one-shot fixes.

### Event-Driven (4-01, 4-02)
Two samples react to GitHub events (issue opened, workflow run completed).
These are the lowest-latency patterns: the agent runs within seconds of the trigger.

### Safe Output Choices
| Workflow | Safe Output | Rationale |
|----------|-------------|-----------|
| 4-01 | `add-labels` + `add-comment` | Read-only triage; no code change |
| 4-02 | `create-issue` | Diagnosis artifact; humans act on it |
| 4-03, 4-04, 4-06 | `create-pr` | Code/doc change requires human review before merge |
| 4-05, 4-07, 4-08 | `create-issue` | Audit trail; action taken separately |

## Stats from Production

These workflows (or their predecessors) have been running in `github/gh-aw`
and `githubnext/agentics`. Reported patterns from the agentics blog posts:

- Issue triage agents reduce time-to-first-label by ~80% on active repos
- CI Doctor reduces "who broke CI?" triage time from ~20 min to ~3 min
- Daily doc updater workflows have merged documentation fixes that went unnoticed for months
- Security compliance trackers have caught SLA breaches within 24 hours of the deadline

## How to Use These Samples

Each file is a complete, runnable gh-aw workflow. To try one:

```bash
# Copy to your repo's .github/workflows/
cp coaches/sample-solutions/track-4/4-01-issue-triage-agent.md .github/workflows/

# Compile it
gh aw compile .github/workflows/4-01-issue-triage-agent.md

# Run it
gh aw run .github/workflows/4-01-issue-triage-agent.md
```

Participants should read the sample, understand the pattern, then adapt it
to their own repository for the Track 4 challenges.
