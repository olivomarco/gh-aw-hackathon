---
title: "Ground Truth"
description: "Feed your agent real data before it runs. Use pre-agent-steps: to deterministically fetch context, and create-pr to safely propose code changes."
number: 6
order: 360
difficulty: "Advanced"
time: "30 min"
tier: "bonus"
track: "mcp-integration"
track_name: "Continuous Intelligence"
tags:
  - "pre-agent-steps"
  - "create-pr"
  - "deterministic"
  - "context-injection"
---

## What you'll build

A workflow that runs `gh` CLI commands in `pre-agent-steps:` to capture real repo metrics — open issues, open PRs, last commit date — before the AI model is invoked. The agent uses those numbers to update `CONTRIBUTING.md` with a live "Project Health" section, then opens a PR using `create-pr` so a human can review before merging.

## Concepts

- `pre-agent-steps:` — deterministic shell steps that run before the AI model call; output is available to the agent via files
- `create-pr` safe-output — have the agent propose changes as a pull request rather than committing directly

## Open the challenge

<a href="{{ '/challenges/3-06-ground-truth/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/3-06-ground-truth/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete Track 2 — [Repo Concierge]({{ '/tracks/safe-outputs/' | relative_url }}) (all challenges)
- Complete [3-01 The Relay]({{ '/challenges/3-01-the-relay/' | relative_url }}) and [3-02 Context Engine]({{ '/challenges/3-02-context-engine/' | relative_url }})
