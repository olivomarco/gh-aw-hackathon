###### Challenge 4-08 — Malicious Code Scanner
###### Source: https://githubnext.com/agentics/blob/main/.github/workflows/daily-malicious-code-scan.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.08 (Copilot, per commit scan)

---
on:
  schedule:
    - cron: "0 3 * * *"
  workflow_dispatch:

permissions:
  contents: read
  issues: write

safe-outputs:
  create-issue:
    labels:
      - security-alert

engine: copilot
---

## Goal

Daily, review all commits pushed in the last 24 hours and flag suspicious code
patterns that may indicate malicious intent, supply-chain compromise, or
accidental introduction of dangerous constructs.

Key learning: this is a **defence-in-depth** workflow. It complements CodeQL and
Dependabot with a higher-level, semantic review of recent changes that automated
scanners might miss — things like obfuscated logic, unexpected network calls, or
credential-harvesting patterns.

## Steps

1. **Collect recent commits**
   List all commits pushed to any branch in the last 24 hours.
   For each commit, retrieve the diff (changed files and line-level changes).

2. **Scan each diff for suspicious patterns**

   **Obfuscation indicators:**
   - Base64-encoded strings decoded and executed at runtime
   - String concatenation used to construct command names or URLs (e.g., `"rm" + " -rf"`)
   - Hex or Unicode escape sequences in unexpected contexts
   - Deliberately misleading variable names (e.g., `notAPassword`, `totallyLegit`)

   **Network exfiltration indicators:**
   - New `fetch`, `curl`, `wget`, or `http.Get` calls to external URLs not present in config
   - POST requests containing environment variables, file contents, or credentials
   - DNS lookups or URL construction involving `$HOME`, `$PATH`, `$GITHUB_TOKEN`, or similar

   **Dangerous execution patterns:**
   - `eval(...)` on dynamic or user-controlled input
   - `exec`, `subprocess`, `os.system`, `child_process.exec` with non-literal arguments
   - Modifications to CI/CD workflow files (`.github/workflows/`) that add new secret access
   - Changes to `package.json` / `requirements.txt` / `go.mod` install hooks (`prepare`, `postinstall`)

   **Credential exposure:**
   - Hardcoded strings matching patterns for API keys, tokens, or passwords
   - New files in `.github/` or CI config that echo or print environment variables

3. **Classify findings by severity**
   - `critical` — active exfiltration attempt or backdoor introduction
   - `high` — obfuscated code or eval on dynamic input
   - `medium` — suspicious network call or install hook change
   - `low` — potential false positive worth human review

4. **If no suspicious patterns found**: call `noop` with reason
   `"No suspicious patterns detected in commits from the last 24 hours."`

5. **Create one issue per suspicious commit** (not per finding) for clarity.

## Output format

Issue title: `[SECURITY ALERT] Suspicious pattern in commit {short SHA}`

Issue body:

```markdown
## Suspicious Code Detected

**Commit:** {SHA} by @{author} on branch `{branch}`
**Committed:** {timestamp}
**Severity:** {critical / high / medium / low}

### Findings

| File | Line | Pattern | Concern |
|------|------|---------|---------|
| `{file}` | {N} | `{code snippet}` | {explanation of concern} |

### Assessment

{2-4 sentences explaining the overall risk and whether this looks like
malicious intent, accidental bad practice, or a likely false positive}

### Recommended action

{Specific step — e.g., "Revert commit {SHA} immediately and investigate" or
"Author should explain the purpose of this eval() call in a comment"}

**This is an automated alert.** False positives are possible. A security team
member should review and close this issue if the code is legitimate.

_Flagged automatically by the Malicious Code Scanner._
```

## Constraints

- Create **at most one issue per suspicious commit** — list all findings for that
  commit in a single issue, not one issue per finding
- Do **not** auto-revert, close, or comment on PRs — only create the issue
- Include a note in every issue that false positives are possible and human review is required
- Do **not** include full file contents in the issue — only the relevant snippet
  (10 lines maximum context around the flagged code)
- Do **not** scan commits from bot accounts (Dependabot, Renovate, github-actions)
  unless the commit modifies workflow files

{{#runtime-import shared/noop-reminder.md}}
