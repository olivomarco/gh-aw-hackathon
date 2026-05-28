---
title: "The Watcher"
description: "Build an event-driven workflow that fires on push, detects which files changed in a watched directory, and posts a commit comment summarising the modification."
number: 3
order: 130
difficulty: "Beginner"
time: "30 min"
track: "ai-workflows"
track_name: "Hello, Agent"
tags:
  - "push-events"
  - "path-filters"
  - "commit-comments"
  - "event-driven"
---

## What you'll build

A push-triggered workflow scoped to a specific directory (e.g., `docs/**`). When files in that path change, the agent reads the commit metadata — files touched, message, author — and posts a concise comment directly on the commit.

## Concepts

- `on: push: paths:` glob filters for selective triggering
- Accessing commit metadata (changed files, author, message)
- `safe-outputs: add-comment:` for inline commit feedback

## Open the challenge

<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-1-hello-agent/1-03-the-watcher/Student/README.md" class="btn btn--primary">📘 Student Guide</a>
<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-1-hello-agent/1-03-the-watcher/Coach/README.md" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete [Challenge 1-01 — Morning Briefing]({{ '/challenges/1-01-morning-briefing/' | relative_url }})
