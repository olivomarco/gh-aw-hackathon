---
title: "Stale Patrol"
description: "Keep your backlog healthy with a daily scheduled workflow that warns maintainers about inactive issues and closes them automatically after a grace period."
number: 4
order: 240
difficulty: "Intermediate"
time: "30 min"
tier: "bonus"
track: "safe-outputs"
track_name: "Repo Concierge"
tags:
  - "schedule"
  - "stale-issues"
  - "conditional-logic"
  - "maintenance"
---

## What you'll build

A daily cron workflow that scans for issues open more than 60 days with no recent activity, posts a warning comment and adds a `stale` label, then closes issues that remain stale after a follow-up run — skipping any issue tagged `keep-alive`.

## Concepts

- `on: schedule:` for recurring maintenance tasks
- Multi-condition issue queries via `tools: github:`
- Warn-then-close logic with label-based exemptions

## Open the challenge

<a href="{{ '/challenges/2-04-stale-patrol/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/2-04-stale-patrol/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete at least 2 challenges from [Track 1 — Hello, Agent]({{ '/tracks/ai-workflows/' | relative_url }})
