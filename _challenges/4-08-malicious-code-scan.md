---
title: "Malicious Code Scan"
description: "Supply-chain attacks hide in plain sight. Deploy a daily workflow that reviews recent code changes for suspicious patterns — your automated defence against code-injection campaigns."
number: 8
order: 408
difficulty: "Advanced"
time: "30 min"
tier: "bonus"
track: "production-patterns"
track_name: "Production Patterns"
tags:
  - "security"
  - "supply-chain"
  - "schedule"
  - "code-review"
  - "production"
---

## What you'll build

A daily scheduled workflow that reviews recently merged code for suspicious patterns — obfuscated logic, unexpected network calls, exfiltration vectors — and alerts on anything worth investigating. Sourced from `githubnext/agentics`.

## Concepts

- Scheduled review of recent code changes (last N commits / days)
- Suspicious-pattern detection via AI analysis
- Supply-chain attack defence encoded as a workflow
- Alert routing via `safe-outputs: create-issue`

## Open the challenge

<a href="{{ '/challenges/4-08-malicious-code-scan/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/4-08-malicious-code-scan/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 4-07 — Security Compliance]({{ '/challenges/4-07-security-compliance/' | relative_url }}) or equivalent
