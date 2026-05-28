---
title: "The Test Improver"
description: "The consumer half of the causal chain — a daily workflow that finds coverage gaps and writes the actual tests, turning Testify's issues into merged PRs automatically."
number: 6
order: 406
difficulty: "Advanced"
time: "30 min"
tier: "bonus"
track: "production-patterns"
track_name: "Production Patterns"
tags:
  - "testing"
  - "coverage"
  - "create-pr"
  - "causal-chain"
  - "production"
---

## What you'll build

A daily workflow that detects coverage gaps in your codebase and incrementally writes new tests, opening PRs for maintainer review. From `githubnext/agentics` — pairs with Daily Testify as the *consumer* in the causal chain pattern.

## Concepts

- Coverage-gap detection and incremental test creation
- `safe-outputs: create-pr` for test additions
- Daily scheduled improvement cadence
- Language/framework adaptation (jest, pytest, rspec, etc.)

## Open the challenge

<a href="{{ '/challenges/4-06-test-improver/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/4-06-test-improver/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 4-05 — The Uber Expert]({{ '/challenges/4-05-daily-testify/' | relative_url }}) for full causal chain effect
