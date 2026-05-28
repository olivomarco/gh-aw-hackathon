---
title: "Daily Doc Updater"
description: "Your docs rot silently while your code evolves. Fix that with a scheduled workflow that reviews docs against code and proposes PRs — achieving a 96% merge rate in production."
number: 3
order: 403
difficulty: "Advanced"
time: "30 min"
tier: "bonus"
track: "production-patterns"
track_name: "Production Patterns"
tags:
  - "documentation"
  - "schedule"
  - "create-pr"
  - "drift-detection"
  - "production"
---

## What you'll build

A scheduled cron workflow that scans your docs directory for content that drifts from the actual code, then opens targeted PRs with corrections. Sourced from `githubnext/agentics` where it achieved a **96% merge rate** (57 merged out of 59 proposed).

## Concepts

- `schedule: cron` trigger for daily automated review
- Doc-vs-code drift detection patterns
- `safe-outputs: create-pr` for automated doc fixes
- Scoping review to specific directories

## Open the challenge

<a href="{{ '/challenges/4-03-daily-doc-updater/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/4-03-daily-doc-updater/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 4-01 — Issue Triage Agent]({{ '/challenges/4-01-issue-triage-agent/' | relative_url }}) or equivalent
