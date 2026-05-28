###### Challenge 2-03 — Slash & Burn
###### Adapted from: q.md (githubnext/agentics) — slash-command + lock-for-agent pattern
###### Source: https://github.com/githubnext/agentics/blob/main/workflows/q.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.02 (Copilot, per invocation)

---
on:
  issue_comment:
    types: [created]

permissions:
  contents: read
  issues: write  # For add-comment and add-labels responses.

safe-outputs:
  add-comment: {}
  add-labels:
    allowed:
      - summarized
      - slash-processed
  noop:
    # Called when the comment is not a recognized slash command,
    # or when the command was already processed (idempotency guard).
    reason: "Comment is not a recognized slash command."

engine: copilot

# lock-for-agent is critical here: prevents two concurrent slash-command
# responses on the same issue if a user posts the command twice quickly.
lock-for-agent: true

# Rate-limit: each user may invoke a slash command at most once per 5 minutes.
# Prevents abuse on public repos.
user-rate-limit:
  per: 5m
  max: 1

# Only process comments from repo collaborators and above.
# Prevents external users from triggering expensive AI operations.
min-integrity: collaborator
---

## Goal

Respond to slash commands posted as issue comments. This workflow implements
the canonical **ChatOps** pattern: a human types a `/command` in an issue
comment, and the agent performs an action and replies.

Supported commands:

| Command | What it does |
|---------|-------------|
| `/summarize` | Summarises the full issue thread (title + all comments) |
| `/label {label-name}` | Applies the specified label (from the allowed list) |
| `/help` | Lists available slash commands |

This teaches the core slash-command pattern: check the comment body for a
command prefix, dispatch to the right handler, and always exit via a safe-output.

## Steps

1. **Read the triggering comment body** from the event payload.

2. **Check whether the comment starts with a `/` slash command.** If it does not,
   call `noop` with reason `"Comment is not a recognized slash command."` and stop.

3. **Parse the command:**
   - If the comment starts with `/summarize` → execute the Summarise handler.
   - If the comment starts with `/label ` → execute the Label handler.
   - If the comment starts with `/help` → execute the Help handler.
   - Otherwise → post an error comment and call `noop`.

---

### Handler: `/summarize`

1. Fetch the full issue thread (title, body, all comments in order) using the
   GitHub MCP `issues` toolset.
2. Produce a summary using the Summary output format below.
3. Post the summary as a comment using `add-comment`.
4. Apply the `summarized` label using `add-labels`.

**Summary output format:**

```markdown
## 📋 Issue Summary

**Requested by:** @{invoker}
**Thread length:** {N} comments

### What was asked / reported
{1–2 sentences describing the original issue.}

### Key discussion points
{3–5 bullets covering the main back-and-forth — decisions made, blockers raised,
solutions proposed. Each bullet max 1 sentence.}

### Current status
{One sentence: is this resolved, blocked, in-progress, or waiting for info?}

### Open questions
{List any unresolved questions from the thread, or write "None."}

_Summarised by the Slash & Burn workflow._
```

---

### Handler: `/label {label-name}`

1. Extract `{label-name}` from the comment (everything after `/label `).
2. Check whether `{label-name}` is in the allowed list:
   `bug, feature, enhancement, documentation, question, help-wanted,
   good-first-issue, duplicate, invalid, wontfix, needs-info, in-progress, resolved`
3. If it is allowed: apply the label and post a confirmation comment:
   `✅ Label \`{label-name}\` applied by @{invoker}.`
4. If it is NOT in the allowed list: post an error comment:
   `❌ Label \`{label-name}\` is not in the allowed list. Run \`/help\` for options.`
5. Apply `slash-processed` to the issue.
6. Call `noop` (the comment is the output — no separate safe-output needed beyond add-comment).

---

### Handler: `/help`

Post this comment:

```markdown
## 🤖 Slash & Burn — Available Commands

| Command | Description |
|---------|-------------|
| `/summarize` | Summarise the full issue thread |
| `/label {name}` | Apply a label (see allowed list below) |
| `/help` | Show this help message |

**Allowed labels:** `bug`, `feature`, `enhancement`, `documentation`,
`question`, `help-wanted`, `good-first-issue`, `duplicate`, `invalid`,
`wontfix`, `needs-info`, `in-progress`, `resolved`

_Rate limit: 1 command per user per 5 minutes._
```

---

## Constraints

- Process **only** the exact comment that triggered this workflow.
  Do not scan or process other comments on the same issue.
- If the rate limit has been hit for the invoking user, post a polite message:
  `⏱️ Rate limit reached. You can use slash commands once per 5 minutes.`
  Then call `noop`.
- The `/summarize` summary must stay under 400 words.
- Do **not** process slash commands from bots (check author type in event payload).

{{#runtime-import shared/noop-reminder.md}}
