---
title: "Triage Bot"
description: "Build an event-driven workflow that categorises every new issue with an AI label and posts a friendly comment explaining the classification and next steps."
number: 1
order: 210
difficulty: "Intermediate"
time: "30 min"
tier: "core"
track: "safe-outputs"
track_name: "Repo Concierge"
tags:
  - "issue-triage"
  - "event-triggers"
  - "ai-classification"
  - "labels"
---

## What you'll build

A workflow triggered by `on: issues: types: [opened]` that analyzes the issue title and body with AI, assigns one of five categories (bug, feature-request, documentation, question, duplicate), applies a label, and posts a structured comment with reasoning and next steps.

## Concepts

- Event-driven triggers for real-time issue intake
- AI classification with no hardcoded rules
- `safe-outputs: add-labels` + `add-comment` in combination

## Open the challenge

<a href="{{ '/challenges/2-01-triage-bot/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/2-01-triage-bot/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete at least 2 challenges from [Track 1 — Hello, Agent]({{ '/tracks/ai-workflows/' | relative_url }})
