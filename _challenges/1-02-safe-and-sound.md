---
title: "Safe & Sound"
description: "Master the safe-outputs gate — write a workflow that conditionally creates an issue or explicitly declares noop, proving that every gh-aw write is intentional and auditable."
number: 2
order: 120
difficulty: "Beginner"
time: "30 min"
tier: "core"
track: "ai-workflows"
track_name: "Hello, Agent"
tags:
  - "safe-outputs"
  - "noop"
  - "permissions"
  - "conditional-logic"
---

## What you'll build

A workflow that scans the repo for a condition (e.g., TODO count) and takes one of two explicit paths: `create-issue` if the threshold is met, or `noop` if not. Every run must declare its intent — no silent failures, no accidental writes.

## Concepts

- `safe-outputs: create-issue:` and `safe-outputs: noop:` as explicit intent declarations
- Writing conditional natural-language logic in workflow bodies
- Minimal permission scoping (`contents: read`)

## Open the challenge

<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-1-hello-agent/1-02-safe-and-sound/Student/README.md" class="btn btn--primary">📘 Student Guide</a>
<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-1-hello-agent/1-02-safe-and-sound/Coach/README.md" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete [Challenge 1-01 — Morning Briefing]({{ '/challenges/1-01-morning-briefing/' | relative_url }})
