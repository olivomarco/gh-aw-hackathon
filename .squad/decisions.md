# Squad Decisions

## Active Decisions

### Decision: devcontainer configuration for gh-aw Hackathon

**Author:** Vasquez  
**Date:** 2026-05-28  
**Status:** Accepted

#### Context
Participants need a reproducible development environment to run and develop gh-aw workflow challenges without "works on my machine" friction. We are building a devcontainer that works with GitHub Codespaces and VS Code Dev Containers.

#### Decisions

**1. Base Image: `mcr.microsoft.com/devcontainers/universal:2`**
- Chosen over base:ubuntu-24.04 + features-only approach
- Universal image ships Node LTS, Python 3, Go, and standard CLI tooling pre-baked
- Pinned to major version `2` (not `:latest`) for reproducible rebuilds
- Trade-off accepted: ~6 GB image size (pre-cached on Codespaces)

**2. Dev Container Features for Language Tooling**
- `ghcr.io/devcontainers/features/github-cli:1` — gh CLI at known-recent version
- `ghcr.io/devcontainers/features/node:1` — Node LTS override capability
- `ghcr.io/devcontainers/features/python:1` — Python 3.12 explicit pin
- `ghcr.io/devcontainers/features/go:1` — Go latest
- Features execute during image build (cacheable); `apt-get` in postCreate would block on every environment creation

**3. gh-aw Extension Install Method: `postCreate.sh`**
- Requires authenticated `gh` session — not available at image build time
- Extension ships frequently; install at container-create time ensures recent release
- `postCreate.sh` checks `gh extension list` before installing (idempotent)

#### Files Created
- `.devcontainer/devcontainer.json`
- `.devcontainer/postCreate.sh`
- `.devcontainer/README.md`

---

### Scope & Content Decisions: DevContainer Setup Guide

**Date:** 2026-05-28  
**Author:** Hudson (DevRel)  
**Document:** `docs/getting-started/devcontainer-setup.md`

#### Scope Decisions Made

**1. Two-Path Approach (Not One)**
- Offer both GitHub Codespaces (recommended) and local Docker + VS Code paths
- Codespaces ideal for hackathon day but some participants prefer local or have corporate restrictions
- Codespaces marked as "recommended" to guide most participants there

**2. Troubleshooting: 4 Issues, Not Exhaustive**
- 4 most common blockers (gh aw not found, auth failures, permissions, Docker memory)
- Goal is to unblock quickly, not catalog every possible failure mode
- Keeps guide scannable (~800 words)

**3. Smoke Test Scope**
- `gh aw run examples/hello-world.md --dry-run` as validation test
- Confirms three things: gh CLI works, gh aw extension loads, markdown parsing works
- `--dry-run` avoids AI engine credentials requirement

**4. No Deep Dive into Safe Outputs / Frontmatter**
- Mention safe outputs in troubleshooting but don't explain gh-aw syntax
- Setup guide, not gh-aw primer
- Participants learn gh-aw through challenge walkthroughs

**5. Help Channels: Discord + Discussions + Coaches**
- Discord = real-time for hackathon day
- Discussions = async, searchable
- Coaches = human touch during live event

#### Not Included (Intentionally)
- Container customization
- Advanced GitHub CLI auth details
- Offline Docker image builds
- Resource requirements
- Multi-user Codespaces scenarios

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
