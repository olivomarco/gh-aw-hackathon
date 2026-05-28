---
title: "Issue Triage Agent"
description: "Deploy the 'hello world' of agentic workflows — the same issue-triage pattern used as the starter example in Claude Code. Label, categorise, and respond to new issues automatically."
number: 1
order: 401
difficulty: "Advanced"
time: "30 min"
tier: "core"
track: "production-patterns"
track_name: "Production Patterns"
tags:
  - "issues"
  - "triage"
  - "labels"
  - "production"
---

## What you'll build

An issue-triage workflow triggered by `on: issues: types: [opened, reopened]` that reads the issue body, applies appropriate labels from an allowlist, and posts a classification comment — pulled directly from the production workflow used in `github/gh-aw`.

## Concepts

- `on: issues: types: [opened, reopened]` event trigger
- `tools: github: toolsets: [issues, labels]` for label lookup
- `safe-outputs: add-labels` + `add-comment` combination
- Allowlisted labels to prevent hallucinated tag creation

## Open the challenge

<a href="{{ '/challenges/4-01-issue-triage-agent/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/4-01-issue-triage-agent/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete at least 2 challenges from [Track 1 — Hello, Agent]({{ '/tracks/ai-workflows/' | relative_url }})
