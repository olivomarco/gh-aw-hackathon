# Getting Started: Your DevContainer

Welcome! This guide walks you through setting up your development environment for the gh-aw hackathon.

## Why a DevContainer?

We've pre-configured a complete development environment for you—no installing tools locally, no "works on my machine" headaches. Your devcontainer comes with everything: the `gh` CLI, the `gh aw` extension, Node.js, Python, Go, VS Code extensions (including Copilot), and more. One click (or one command) and you're ready to code.

## Choose Your Path

### **Path A: GitHub Codespaces** (Recommended)

Easiest for hackathon day. You need: a GitHub account and access to Codespaces (most GitHub accounts have this).

1. Click the green **Code** button on this repository
2. Select **Codespaces** > **Create codespace on main**
3. Wait ~30 seconds for the container to build
4. That's it! Jump to [First Steps](#first-steps-after-container-starts)

### **Path B: VS Code + Docker (Local)**

For those who prefer working locally. You need: [Docker Desktop](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/) installed.

1. Clone this repository:
   ```bash
   git clone https://github.com/your-org/gh-aw-hackathon.git
   cd gh-aw-hackathon
   ```

2. In VS Code, install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

3. Open the command palette (`Cmd/Ctrl + Shift + P`) and run:
   ```
   Dev Containers: Reopen in Container
   ```

4. Wait for the build to complete (~2–3 minutes on first run)

5. Jump to [First Steps](#first-steps-after-container-starts)

## What's Pre-Installed?

| Tool | Why It Matters |
|------|---|
| `gh` CLI | Create issues, review PRs, manage repos—all from the command line |
| `gh aw` extension | Create and run gh-aw workflows (the core tool for this hackathon) |
| Node.js | JavaScript runtime for some gh-aw engines and examples |
| Python | Many gh-aw examples and tools use Python |
| Go | Go is supported by gh-aw; some advanced workflows may use it |
| VS Code Copilot extension | AI-powered code suggestions right in your editor |
| Git | Version control (you'll commit and push your work) |
| curl, jq | Useful CLI tools for API testing and JSON wrangling |

## First Steps After Container Starts

### 1. Authenticate with GitHub

Your container is isolated—it doesn't have your GitHub credentials yet.

```bash
gh auth login
```

Follow the prompts:
- Choose HTTPS or SSH (HTTPS is simpler if you're unsure)
- Paste the device code into your browser when prompted
- Grant the required permissions

Verify it worked:
```bash
gh auth status
```

### 2. Verify gh-aw is Ready

```bash
gh aw --version
```

You should see a version number (e.g., `gh-aw version 1.0.0`).

### 3. Clone or Fork the Challenge Repo

If you haven't already:
```bash
git clone https://github.com/your-org/gh-aw-challenges.git
cd gh-aw-challenges
```

Or if you prefer to fork first (recommended for keeping your work organized):
```bash
gh repo fork https://github.com/your-org/gh-aw-challenges --clone
cd gh-aw-challenges
```

### 4. Run the Smoke Test

Test that everything works end-to-end:

```bash
gh aw run examples/hello-world.md --dry-run
```

You should see output showing the compiled workflow (no errors). If you see a version or help message instead, let us know—we'll troubleshoot together.

## Troubleshooting

### "gh aw: command not found"

The extension didn't install properly.

**Fix:** Restart VS Code or your terminal. If it persists:
```bash
gh extension list
```

Should show `gh-aw` in the list. If not, reinstall:
```bash
gh extension install github/gh-aw
```

### "failed to authenticate" / "401 Unauthorized"

You skipped the `gh auth login` step or your token expired.

**Fix:** Run `gh auth login` again and follow the prompts.

### "permission denied" when running `gh aw run`

Your GitHub token doesn't have the right permissions for the workflow's safe outputs (creating issues, PRs, etc.).

**Fix:** During `gh auth login`, make sure you grant scopes for `repo` and `workflow`. If in doubt, log out and log back in:
```bash
gh auth logout
gh auth login
```

### Devcontainer builds but then closes/crashes

Rare, but can happen if Docker runs out of memory.

**Fix:** Give Docker more CPU and RAM in Docker Desktop settings (Preferences > Resources), then rebuild the container:
```bash
Remote-Containers: Rebuild Container
```

## Getting Help

Stuck? We're here for you.

- **Team Discord:** Post in `#hackathon-help` with your error message and what you were trying to do
- **GitHub Discussions:** Start a [new discussion](../../discussions) with the `getting-started` label
- **Ask your Coach:** During the hackathon, your coach can walk through setup live

---

**Ready?** Once your container is running and `gh aw --version` works, head to the challenges folder and pick your first one. Happy hacking! 🚀
