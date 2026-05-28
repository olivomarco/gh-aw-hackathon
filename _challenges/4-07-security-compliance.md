---
title: "Security Compliance"
description: "Run vulnerability campaigns on a schedule — tracking CVEs by severity, enforcing SLA windows, and opening deadline-aware issues before vulnerabilities slip through the cracks."
number: 7
order: 407
difficulty: "Advanced"
time: "30 min"
tier: "bonus"
track: "production-patterns"
track_name: "Production Patterns"
tags:
  - "security"
  - "compliance"
  - "schedule"
  - "sla"
  - "production"
---

## What you'll build

A scheduled security-compliance workflow that scans for open vulnerabilities, tracks SLA deadlines by severity, and opens structured issues for any that are overdue or approaching deadline. Sourced from `github/gh-aw`.

## Concepts

- Scheduled vulnerability campaign management
- SLA enforcement with deadline tracking
- Severity-tiered issue creation
- Security-as-code: policy encoded in workflow frontmatter

## Open the challenge

<a href="{{ '/challenges/4-07-security-compliance/student/' | relative_url }}" class="btn btn--primary">📘 Student Guide</a>
<a href="{{ '/challenges/4-07-security-compliance/coach/' | relative_url }}" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 4-01 — Issue Triage Agent]({{ '/challenges/4-01-issue-triage-agent/' | relative_url }}) or equivalent
