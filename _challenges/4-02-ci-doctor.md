---
title: "CI Doctor"
description: "When CI breaks, this agent investigates automatically. Pull logs, analyse root causes, and open a diagnostic issue — the workflow with a 69% merge rate in github/gh-aw."
number: 2
order: 402
difficulty: "Advanced"
time: "30 min"
tier: "core"
track: "production-patterns"
track_name: "Production Patterns"
tags:
  - "ci"
  - "workflow-run"
  - "logs"
  - "diagnostics"
  - "production"
---

## What you'll build

A workflow triggered by `on: workflow_run` (on failed CI runs) that fetches logs, identifies the root cause, and opens a diagnostic issue — the same CI Doctor used in `github/gh-aw` with a **69% merge rate** (9 merged PRs out of 13 proposed).

## Concepts

- `workflow_run` trigger on CI failures
- Log analysis and root-cause surfacing
- `safe-outputs: create-issue` for structured diagnostic output
- Targeting specific workflows to watch

## Open the challenge

<a href="{{ '/challenges/4-02-ci-doctor/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/4-02-ci-doctor/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete at least 2 challenges from [Track 1 — Hello, Agent]({{ '/tracks/ai-workflows/' | relative_url }})
