---
title: "Welcome Wagon"
description: "Make first-time contributors feel at home — build a workflow that detects debut pull requests and posts a personalised welcome with links to contribution resources."
number: 5
order: 250
difficulty: "Intermediate"
time: "30 min"
tier: "bonus"
track: "safe-outputs"
track_name: "Repo Concierge"
tags:
  - "pull-requests"
  - "first-time-contributors"
  - "community"
  - "onboarding"
---

## What you'll build

A workflow triggered by `on: pull_request: types: [opened]` that checks the author's `author_association` field. If it's a first-time contributor (not COLLABORATOR, MEMBER, or OWNER), the agent posts a warm welcome comment with resource links and next steps.

## Concepts

- `author_association` as a first-contributor signal
- Conditional execution — only act when a specific audience is detected
- Community-building via automated, personalised messages

## Open the challenge

<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-2-repo-concierge/2-05-welcome-wagon/Student/README.md" class="btn btn--primary">📘 Student Guide</a>
<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-2-repo-concierge/2-05-welcome-wagon/Coach/README.md" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete at least 2 challenges from [Track 1 — Hello, Agent]({{ '/tracks/ai-workflows/' | relative_url }})
