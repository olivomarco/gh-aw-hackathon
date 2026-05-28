---
title: "Challenge 00 — Environment Setup"
description: "Get your development environment ready for the hackathon. Install gh-aw, verify your setup, and run your first AI workflow."
number: 0
order: 0
difficulty: "Beginner"
time: "30 min"
track: "ai-workflows"
track_name: "AI Workflows"
tags:
  - "setup"
  - "gh-aw"
  - "devcontainer"
---

> **This is a placeholder.** Hudson (DevRel) is authoring the full challenge content. See `docs/getting-started/devcontainer-setup.md` for the current getting-started guide.

## Objectives

By the end of this challenge you will have:

- A working `gh-aw` CLI environment (Codespaces or local Dev Container)
- Authenticated `gh` CLI session
- Successfully run a `--dry-run` smoke test

## Getting started

Follow the [DevContainer Setup Guide]({{ '/docs/getting-started/devcontainer-setup' | relative_url }}) to spin up your environment.

## Success criteria

- [ ] `gh aw --version` returns a version string
- [ ] `gh aw run examples/hello-world.md --dry-run` completes without errors
- [ ] You can see the generated workflow YAML

## Resources

- [DevContainer Setup Guide]({{ '/docs/getting-started/devcontainer-setup' | relative_url }})
- [gh-aw on GitHub](https://github.com/github/gh-aw)
- [What The Hack format explained](https://microsoft.github.io/WhatTheHack/)
