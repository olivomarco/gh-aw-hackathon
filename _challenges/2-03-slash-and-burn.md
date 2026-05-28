---
title: "Slash & Burn"
description: "Turn issue comments into a command interface — build a workflow that detects a /summarize slash command and posts a concise AI-generated summary of the entire issue thread."
number: 3
order: 230
difficulty: "Intermediate"
time: "30 min"
tier: "core"
track: "safe-outputs"
track_name: "Repo Concierge"
tags:
  - "slash-commands"
  - "issue-comments"
  - "ai-summarization"
  - "chatops"
---

## What you'll build

A workflow triggered by `on: issue_comment: types: [created]` that parses the comment body for `/summarize`, reads the full issue thread, and posts a structured summary (key decisions, blockers, action items, status recommendation). Uses `lock-for-agent: true` to prevent duplicate runs.

## Concepts

- `on: issue_comment:` triggers and comment body parsing
- `lock-for-agent: true` for idempotent slash commands
- AI extraction of structured info from unstructured discussion

## Open the challenge

<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-2-repo-concierge/2-03-slash-and-burn/Student/README.md" class="btn btn--primary">📘 Student Guide</a>
<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-2-repo-concierge/2-03-slash-and-burn/Coach/README.md" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
- Complete at least 2 challenges from [Track 1 — Hello, Agent]({{ '/tracks/ai-workflows/' | relative_url }})
