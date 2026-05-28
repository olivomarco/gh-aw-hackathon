---
title: "Ship It — Capstone"
description: "Connect everything you've built into a working factory: an end-to-end agentic pipeline that takes an issue from discovery through triage, automated fix, PR creation, and merge."
number: 5
order: 350
difficulty: "Advanced"
time: "45+ min"
track: "mcp-integration"
track_name: "Continuous Intelligence"
tags:
  - "capstone"
  - "end-to-end"
  - "orchestration"
  - "multi-agent"
---

## What you'll build

**This is the capstone.** A 3–5 workflow chain that runs end-to-end: an **Event Observer** writes to `repo-memory`, a **Meta-Workflow** reads it and creates a tracking issue, a **ChatOps workflow** responds to `/fix` and delegates to the Copilot coding agent, and a **Review workflow** merges or flags the resulting PR for human approval.

## Concepts

- Full orchestration: events → repo-memory → meta-layer → ChatOps → PR → merge
- Composing all four techniques from Track 3-01 through 3-04
- Designing a coherent multi-agent system vs. isolated individual workflows

## Open the challenge

<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-3-continuous-intelligence/3-05-ship-it/Student/README.md" class="btn btn--primary">📘 Student Guide</a>
<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-3-continuous-intelligence/3-05-ship-it/Coach/README.md" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete Track 2 — [Repo Concierge]({{ '/tracks/safe-outputs/' | relative_url }}) (≥3 challenges)
- Complete [3-01 The Relay]({{ '/challenges/3-01-the-relay/' | relative_url }}), [3-02 Context Engine]({{ '/challenges/3-02-context-engine/' | relative_url }}), [3-03 Engine Swap]({{ '/challenges/3-03-engine-swap/' | relative_url }}), [3-04 The Overseer]({{ '/challenges/3-04-the-overseer/' | relative_url }})
