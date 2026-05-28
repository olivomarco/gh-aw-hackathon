#!/usr/bin/env bash
# .devcontainer/postCreate.sh
# Runs once after the devcontainer is created (not on restart).
# Installs the gh-aw CLI extension and validates the environment.
set -euo pipefail

BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
CYAN="\033[0;36m"
RESET="\033[0m"

echo ""
echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${CYAN}║        gh-aw Hackathon — Dev Environment     ║${RESET}"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════╝${RESET}"
echo ""

# ── 1. Install gh-aw extension ─────────────────────────────────────────────
echo -e "${BOLD}[1/3] Installing gh aw extension...${RESET}"
if gh extension list 2>/dev/null | grep -q "gh-aw"; then
  echo -e "      ${GREEN}✓ gh aw already installed — skipping${RESET}"
else
  gh extension install github/gh-aw
  echo -e "      ${GREEN}✓ gh aw installed${RESET}"
fi

# Print the installed version for traceability
echo -e "      Version: $(gh aw --version 2>/dev/null || echo 'unknown')"

# ── 2. Validate gh auth ────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}[2/3] Checking GitHub authentication...${RESET}"
if gh auth status 2>&1 | grep -q "Logged in to github.com"; then
  WHOAMI=$(gh api user --jq '.login' 2>/dev/null || echo "unknown")
  echo -e "      ${GREEN}✓ Authenticated as: ${WHOAMI}${RESET}"
else
  echo -e "      ${YELLOW}⚠ Not authenticated. Run: gh auth login${RESET}"
  echo -e "      ${YELLOW}  You need a GitHub account to run gh-aw workflows.${RESET}"
fi

# ── 3. Environment summary ──────────────────────────────────────────────────
echo ""
echo -e "${BOLD}[3/3] Environment summary${RESET}"
echo -e "      gh CLI  : $(gh --version | head -1)"
echo -e "      git     : $(git --version)"
echo -e "      node    : $(node --version 2>/dev/null || echo 'not found')"
echo -e "      python  : $(python3 --version 2>/dev/null || echo 'not found')"
echo -e "      go      : $(go version 2>/dev/null | awk '{print $3}' || echo 'not found')"

# ── Welcome banner ──────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}Ready! Next steps:${RESET}"
echo -e "  1. Authenticate if needed:  ${CYAN}gh auth login${RESET}"
echo -e "  2. Browse challenges:       ${CYAN}ls Student/${RESET}"
echo -e "  3. Run a workflow:          ${CYAN}gh aw run <workflow.md>${RESET}"
echo -e "  4. View logs:               ${CYAN}gh aw logs${RESET}"
echo -e "  5. Audit a workflow:        ${CYAN}gh aw audit <workflow.md>${RESET}"
echo ""
echo -e "  Docs: https://github.com/github/gh-aw"
echo ""
