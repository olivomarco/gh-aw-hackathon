# .devcontainer — Technical Notes

Maintainer reference for the gh-aw Hackathon devcontainer.  
For the participant guide, see `Student/` docs (Hudson's territory).

---

## Base Image

**`mcr.microsoft.com/devcontainers/universal:2`**

Chosen over `base:ubuntu` + individual features because:

- Ships Node LTS, Python 3, Go, and standard CLI tooling pre-baked — faster first-run for participants who just want to start hacking.
- Maintained by Microsoft/GitHub with regular security patches.
- Pinned to major version `2` (not `:latest`) so builds are reproducible; we control when to upgrade.
- Trade-off: image is ~6 GB compressed. Acceptable for a Codespaces-first hackathon where the image is cached on GitHub's infrastructure.

If disk or pull-time becomes a concern, swap to `mcr.microsoft.com/devcontainers/base:ubuntu-24.04` and rely purely on features — all four features (gh, node, python, go) work cleanly on that base.

---

## Dev Container Features

Features are used on top of the universal image to:

1. **Pin the `gh` CLI version independently** of the base image cadence — `ghcr.io/devcontainers/features/github-cli:1`.
2. **Allow language version overrides** without rebuilding the base image. Set `"version": "lts"` / `"3.12"` / `"latest"` in `devcontainer.json` to change them.

Why features over `apt` in `postCreateCommand`?  
Features run during image build (or in a separate layer), so the result is cacheable. Manual `apt install` in postCreate runs on every environment creation and blocks the participant until it finishes.

---

## gh-aw Extension Install

The `gh aw` extension (`github/gh-aw`) cannot be bundled in the image because:
- It requires an authenticated `gh` session to install from GitHub Marketplace.
- It is updated frequently; baking a version into the image would drift quickly.

Install happens in `postCreate.sh`, which runs after the container is ready and the user's `gh` credentials are mounted (Codespaces secret injection).

`postCreate.sh` is idempotent — safe to re-run manually (`bash .devcontainer/postCreate.sh`).

---

## VS Code Extensions

| Extension | Reason |
|-----------|--------|
| `GitHub.copilot` | Primary gh-aw engine; participants need it active |
| `GitHub.copilot-chat` | Chat interface to Copilot in-editor |
| `GitHub.vscode-github-actions` | Syntax + linting for `.yml` / `.lock.yml` |
| `yzhang.markdown-all-in-one` | Challenge files are Markdown + YAML frontmatter |
| `ms-vsliveshare.vsliveshare` | Optional squad collaboration |
| `redhat.vscode-yaml` | YAML schema validation for lock files |

---

## File Associations

`*.lock.yml` files (compiled gh-aw workflows) are mapped to the `github-actions` language ID so the GitHub Actions extension provides syntax highlighting and hover documentation.

---

## Updating This Config

1. Change `devcontainer.json` → open command palette → **Dev Containers: Rebuild Container**.
2. For base image version bumps, update the tag in `"image"` and test with a fresh Codespace.
3. Avoid adding `apt-get` installs to `postCreate.sh` — use features instead.

---

## Known Issues

- `gh aw --version` output format may vary between extension releases; the `postCreate.sh` version check is best-effort.
- If `gh auth status` fails inside Codespaces, ensure the `GITHUB_TOKEN` Codespace secret is present and the `gh` CLI scope includes `repo`.
