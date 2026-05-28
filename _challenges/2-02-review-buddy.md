---
title: "Review Buddy"
description: "Create an automated first-pass PR reviewer that analyses diffs, spots common issues, and posts a structured comment with observations and suggestions the moment a pull request opens."
number: 2
order: 220
difficulty: "Intermediate"
time: "30 min"
tier: "core"
track: "safe-outputs"
track_name: "Repo Concierge"
tags:
  - "pull-requests"
  - "code-review"
  - "ai-analysis"
  - "comments"
---

## What you'll build

A workflow triggered by `on: pull_request: types: [opened]` that reads PR metadata (files changed, lines added/deleted, file types, description quality) and posts a friendly, structured review comment — summary, observations, and optional suggestions.

## Concepts

- `on: pull_request:` triggers and PR metadata access
- AI-powered analysis of diff scope and quality signals
- Structured comment templates in natural-language instructions

## Open the challenge

<a href="{{ '/challenges/2-02-review-buddy/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/2-02-review-buddy/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete at least 2 challenges from [Track 1 — Hello, Agent]({{ '/tracks/ai-workflows/' | relative_url }})
