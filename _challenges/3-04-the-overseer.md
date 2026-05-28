---
title: "The Overseer"
description: "Build a meta-workflow that watches your other workflows — querying run history, calculating failure rates, and creating alert issues when something in your automation system goes wrong."
number: 4
order: 340
difficulty: "Advanced"
time: "30 min"
tier: "bonus"
track: "mcp-integration"
track_name: "Continuous Intelligence"
tags:
  - "meta-workflows"
  - "observability"
  - "workflow-monitoring"
  - "health-reporting"
---

## What you'll build

A weekly workflow that uses the `agentic-workflows` MCP tool to pull 7 days of run summaries, calculates failure rates and token efficiency per workflow, identifies unhealthy agents, and files an alert issue with a health report and recommended actions.

## Concepts

- `tools: agentic-workflows:` for self-introspection
- `max-effective-tokens` tuning for large-scale analysis
- Meta-layer observability as a production best practice

## Open the challenge

<a href="{{ '/challenges/3-04-the-overseer/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/3-04-the-overseer/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete Track 2 — [Repo Concierge]({{ '/tracks/safe-outputs/' | relative_url }}) (≥3 challenges)
