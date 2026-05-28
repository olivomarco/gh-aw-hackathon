---
title: "Mix & Match"
description: "Stop copy-pasting. Use imports: to compose reusable workflow snippets and create-discussion to post async digests instead of noisy issues."
number: 6
order: 260
difficulty: "Intermediate"
time: "30 min"
tier: "bonus"
track: "safe-outputs"
track_name: "Repo Concierge"
tags:
  - "imports"
  - "workflow-composition"
  - "create-discussion"
  - "code-reuse"
---

## What you'll build

A weekly-scheduled workflow that pulls in a shared Markdown helper snippet via `imports:` and uses it to post a repository health digest as a GitHub Discussion — not an issue. This teaches you how to compose workflows from reusable parts and how to route agent output to Discussions for async, low-noise reporting.

## Concepts

- `imports:` — reference a shared `.md` snippet to inject reusable context into a workflow without copy-pasting
- `create-discussion` safe-output — post agent output as a GitHub Discussion instead of creating an issue

## Open the challenge

<a href="{{ '/challenges/2-06-mix-and-match/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/2-06-mix-and-match/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete at least 2 challenges from [Track 1 — Hello, Agent]({{ '/tracks/ai-workflows/' | relative_url }})
- Complete [Challenge 2-01 — Triage Bot]({{ '/challenges/2-01-triage-bot/' | relative_url }})
