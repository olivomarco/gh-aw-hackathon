---
title: "Context Engine"
description: "Supercharge your agent with external context — wire multiple MCP toolsets so it can read live PR diffs, contribution guidelines, and architecture docs before making decisions."
number: 2
order: 320
difficulty: "Advanced"
time: "30 min"
tier: "core"
track: "mcp-integration"
track_name: "Continuous Intelligence"
tags:
  - "mcp-tools"
  - "external-context"
  - "pr-analysis"
  - "context-aware"
---

## What you'll build

A workflow triggered on PR open and synchronize that grants the agent access to three data sources: PR metadata, the repo's contribution guide, and an architecture reference. The agent uses this enriched context to produce a review comment that's genuinely informed rather than generic.

## Concepts

- Composing `tools: github: toolsets:` with multiple tool scopes
- Difference between GitHub API toolsets and MCP extensions
- Context-aware decision-making vs. generic AI responses

## Open the challenge

<a href="{{ '/challenges/3-02-context-engine/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/3-02-context-engine/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete Track 2 — [Repo Concierge]({{ '/tracks/safe-outputs/' | relative_url }}) (≥3 challenges)
