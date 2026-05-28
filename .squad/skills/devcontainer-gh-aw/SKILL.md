# Skill: devcontainer for gh-aw Projects

**Category:** Infrastructure / Developer Experience  
**Author:** Vasquez  
**Reusable for:** Any project using the `gh aw` CLI extension

---

## Pattern Summary

A proven devcontainer configuration for projects built around GitHub Agentic Workflows (`gh aw`). Provides a consistent environment with all prerequisites: `gh` CLI, the `gh aw` extension, and language runtimes for workflow development.

---

## File Structure

```
.devcontainer/
  devcontainer.json   # Container definition
  postCreate.sh       # Extension install + welcome banner
  README.md           # Maintainer notes (not participant docs)
```

---

## devcontainer.json Template

```json
{
  "name": "<Project Name>",
  "image": "mcr.microsoft.com/devcontainers/universal:2",
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": { "version": "latest" },
    "ghcr.io/devcontainers/features/node:1": { "version": "lts" },
    "ghcr.io/devcontainers/features/python:1": { "version": "3.12" },
    "ghcr.io/devcontainers/features/go:1": { "version": "latest" }
  },
  "postCreateCommand": "bash .devcontainer/postCreate.sh",
  "remoteUser": "codespace",
  "customizations": {
    "vscode": {
      "extensions": [
        "GitHub.copilot",
        "GitHub.copilot-chat",
        "GitHub.vscode-github-actions",
        "yzhang.markdown-all-in-one",
        "redhat.vscode-yaml"
      ],
      "settings": {
        "files.associations": {
          "*.lock.yml": "github-actions",
          "*.lock.yaml": "github-actions"
        }
      }
    }
  }
}
```

---

## postCreate.sh — gh-aw Install Snippet

```bash
#!/usr/bin/env bash
set -euo pipefail

# Install gh-aw extension (idempotent)
if gh extension list 2>/dev/null | grep -q "gh-aw"; then
  echo "gh aw already installed"
else
  gh extension install github/gh-aw
fi

# Validate auth
if ! gh auth status 2>&1 | grep -q "Logged in to github.com"; then
  echo "⚠ Not authenticated. Run: gh auth login"
fi
```

---

## Key Design Rules

| Rule | Rationale |
|------|-----------|
| Use `universal:2` (pinned major, not `:latest`) | Reproducible builds; upgrade on your schedule |
| Install `gh aw` in `postCreate`, not image build | Requires `gh` auth; extension updates frequently |
| Use Dev Container Features for runtimes | Cacheable; no shell scripting; version-overridable |
| Map `*.lock.yml` → `github-actions` language ID | Enables Actions extension syntax support on compiled workflows |
| `remoteUser: codespace` | Non-root; matches universal image conventions |

---

## When to Use This Skill

- Setting up a new gh-aw project repository
- Onboarding contributors to an existing gh-aw project
- Hackathon or workshop environments where participants need instant gh-aw access
- CI/CD environments where you want parity with the dev container

---

## Tested Against

- `mcr.microsoft.com/devcontainers/universal:2` (May 2026)
- `gh aw` extension versions 0.71.x+
- GitHub Codespaces (standard 4-core machine)
