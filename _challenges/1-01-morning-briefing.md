---
title: "Morning Briefing"
description: "Build a scheduled workflow that runs every weekday morning and creates a GitHub issue summarizing your repo's last 24 hours of activity."
number: 1
order: 110
difficulty: "Beginner"
time: "30 min"
track: "ai-workflows"
track_name: "Hello, Agent"
tags:
  - "cron"
  - "schedule"
  - "issue-creation"
  - "ai-summarization"
---

## What you'll build

A cron-triggered workflow that fires at 9 AM every weekday, reads recent issues and pull requests via the GitHub MCP tool, and asks the AI agent to write a natural-language digest — posting it as an issue titled "📋 Morning Briefing". No manual check-ins needed; the agent keeps your team aligned automatically.

## Concepts

- `on: schedule:` cron syntax and time-based triggers
- Querying repo data with `tools: github: toolsets: [issues, pull_requests]`
- Using `safe-outputs: create-issue:` to declare write intent

## Open the challenge

<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-1-hello-agent/1-01-morning-briefing/Student/README.md" class="btn btn--primary">📘 Student Guide</a>
<a href="https://github.com/olivomarco/gh-aw-hackathon/blob/main/challenges/track-1-hello-agent/1-01-morning-briefing/Coach/README.md" class="btn btn--ghost">🎓 Coach Guide</a>

## Prerequisites

- Complete [Challenge 00 — Environment Setup]({{ '/challenges/00-setup/' | relative_url }})
