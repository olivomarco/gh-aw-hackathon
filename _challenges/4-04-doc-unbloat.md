---
title: "Documentation Unbloat"
description: "Bloated docs scare contributors away. Deploy a workflow that identifies verbose, redundant, or outdated documentation and trims it — 85% of its PRs merge straight to main."
number: 4
order: 404
difficulty: "Advanced"
time: "30 min"
tier: "bonus"
track: "production-patterns"
track_name: "Production Patterns"
tags:
  - "documentation"
  - "simplification"
  - "create-pr"
  - "production"
---

## What you'll build

A workflow that targets specific documentation files, identifies verbosity and redundancy, and opens focused PRs that simplify the content. Sourced from `githubnext/agentics` with an **85% merge rate** (88 merged out of 103 proposed).

## Concepts

- Targeted doc selection and simplification prompts
- Focused diff discipline (small, reviewable PRs)
- `safe-outputs: create-pr` with well-scoped changes
- Defining "simplify" in a way your project can validate

## Open the challenge

<a href="{{ '/challenges/4-04-doc-unbloat/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/4-04-doc-unbloat/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 4-03 — Daily Doc Updater]({{ '/challenges/4-03-daily-doc-updater/' | relative_url }}) or equivalent
