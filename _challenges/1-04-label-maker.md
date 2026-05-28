---
title: "Label Maker"
description: "Wire up an issue-events trigger so the AI agent reads every new issue's title and body, classifies it automatically, and applies the right label from a defined allowlist."
number: 4
order: 140
difficulty: "Beginner"
time: "30 min"
tier: "bonus"
track: "ai-workflows"
track_name: "Hello, Agent"
tags:
  - "issue-events"
  - "ai-classification"
  - "labels"
  - "automation"
---

## What you'll build

A workflow triggered by `on: issues: types: [opened]` that reads the new issue, classifies it (bug, feature, documentation, question), and applies the appropriate label via `safe-outputs: add-labels:` — with an explicit allowlist so the agent can't invent random labels.

## Concepts

- `on: issues:` event triggers and issue metadata access
- AI classification with a constrained label allowlist
- `safe-outputs: add-labels:` with a defined label set

## Open the challenge

<a href="{{ '/challenges/1-04-label-maker/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/1-04-label-maker/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete [Challenge 1-01 — Morning Briefing]({{ '/challenges/1-01-morning-briefing/' | relative_url }})
