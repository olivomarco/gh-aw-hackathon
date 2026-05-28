---
title: "The Relay"
description: "Unlock workflow chaining — build a producer that writes structured data to repo-memory and a consumer that reads it, demonstrating how independent agents pass state to each other."
number: 1
order: 310
difficulty: "Advanced"
time: "30 min"
tier: "core"
track: "mcp-integration"
track_name: "Continuous Intelligence"
tags:
  - "workflow-chaining"
  - "repo-memory"
  - "producer-consumer"
  - "state-persistence"
---

## What you'll build

Two coordinated workflows: a **daily producer** that collects issue metrics and writes a JSON snapshot to `repo-memory`, and a **weekly consumer** that reads those snapshots and generates a trend report issue. Workflows communicate without direct coupling.

## Concepts

- `tools: repo-memory` and `file-glob` patterns for persistent state
- Producer-consumer pattern across independent workflow runs
- `safe-outputs: noop` for data-collection-only workflows

## Open the challenge

<a href="{{ '/challenges/3-01-the-relay/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/3-01-the-relay/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete Track 2 — [Repo Concierge]({{ '/tracks/safe-outputs/' | relative_url }}) (≥3 challenges)
