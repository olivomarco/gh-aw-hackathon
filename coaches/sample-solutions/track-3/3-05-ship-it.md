###### Challenge 3-05 — Ship It (Capstone)
###### Adapted from: full agentic factory chain — producer + auditor + ChatOps
######   q.md (githubnext/agentics) — slash-command + assign-to-agent
######   audit-workflows.md (github/gh-aw) — meta-orchestrator
######   workflow-generator.md (github/gh-aw) — assign-to-agent pattern
###### Sources: https://github.com/githubnext/agentics/blob/main/workflows/q.md
######          https://github.com/github/gh-aw/blob/main/.github/workflows/audit-workflows.md
######          https://github.com/github/gh-aw/blob/main/.github/workflows/workflow-generator.md
###### Estimated compile cost: ~2s each  |  Estimated first-run cost: ~$0.05–$0.15 per chain activation

# =============================================================================
# CAPSTONE OVERVIEW
#
# Ship It is a three-workflow factory. Participants build all three and connect them.
#
# WORKFLOW 1: ship-it-watcher.md   (Event-driven — fires on issue labelling)
# WORKFLOW 2: ship-it-auditor.md   (Scheduled meta-auditor — reads repo-memory)
# WORKFLOW 3: ship-it-commander.md (ChatOps — /ship-it slash command)
#
# THE CHAIN:
#   Issue labelled [ship-it] → Watcher writes to repo-memory
#   → Auditor reads repo-memory → creates tracking issue
#   → Human posts /ship-it on tracking issue → Commander assigns to Copilot agent
#
# =============================================================================

---
---
---

# =============================================================================
# WORKFLOW 1: ship-it-watcher.md
# Role: Producer — fires when a PR or issue is labelled "ship-it"
# =============================================================================

---
on:
  issues:
    types: [labeled]
  pull_request:
    types: [labeled]

permissions:
  contents: read
  issues: read
  pull-requests: read

safe-outputs:
  noop:
    # Watcher only writes to repo-memory — never writes to GitHub UI.
    reason: "ship-it observation recorded to repo-memory."

engine: copilot

tools:
  github:
    toolsets:
      - issues
      - pull_requests
  repo-memory:
    file-glob: "ship-it-queue/**"
---

## Goal

You are the **Ship It Watcher** — the event-driven producer in the Ship It factory.
When any issue or pull request receives the `ship-it` label, record it in `repo-memory`
for the Auditor to process.

Do NOT take any visible action. This is a pure observation agent.

## Steps

1. **Check the event payload.** Read the label that was just applied.
   If the label is **not** `ship-it`, call `noop` immediately and stop.

2. **If the label IS `ship-it`**, read the full issue or PR:
   - Title, number, URL
   - Author (GitHub login)
   - Current state (open/closed)
   - For PRs: base branch, head branch, review status
   - Current labels (all of them)

3. **Write an observation record** to `repo-memory` at this path:
   ```
   ship-it-queue/{YYYY-MM-DD-HH-MM}-{type}-{number}.json
   ```
   Where `{type}` is `issue` or `pr`.

   Use this JSON structure:
   ```json
   {
     "observed_at": "ISO-8601 timestamp",
     "type": "issue | pr",
     "number": 0,
     "title": "string",
     "url": "string",
     "author": "github-login",
     "state": "open | closed",
     "labels": ["ship-it", "..."],
     "pr_review_status": "approved | changes_requested | pending | null",
     "processed_by_auditor": false
   }
   ```

4. **Call `noop`** with reason `"ship-it observation recorded to repo-memory."`

## Constraints

- Only write records for items labelled **exactly** `ship-it`. Do not process
  other labels even if they contain "ship" in the name.
- One JSON file per labelling event. Do not overwrite existing files.
- If the item is a PR, include `pr_review_status`; for issues, set it to `null`.

{{#runtime-import shared/noop-reminder.md}}


---
---
---

# =============================================================================
# WORKFLOW 2: ship-it-auditor.md
# Role: Meta-auditor — reads repo-memory, creates tracking issues
# =============================================================================

---
on:
  schedule:
    - cron: "0 */2 * * *"  # Every 2 hours
  workflow_dispatch:

permissions:
  contents: read
  issues: write

safe-outputs:
  create-issue:
    max: 3
    labels: [ship-it-tracking, automated, needs-action]
    title-prefix: "[ship-it] "
    expires: 7d
  noop:
    reason: "No unprocessed ship-it items in the queue."

engine: copilot

tools:
  repo-memory:
    file-glob: "ship-it-queue/**"
  github:
    toolsets:
      - issues
---

## Goal

You are the **Ship It Auditor** — the scheduled meta-auditor that reads the
Watcher's observations and creates actionable tracking issues for items that
are ready to ship.

## Steps

1. **Read all files** from `repo-memory` matching `ship-it-queue/*.json`
   where `processed_by_auditor` is `false`.

2. **If no unprocessed records exist**, call `noop` and stop.

3. **For each unprocessed record**, assess shipability:

   | Condition | Decision |
   |-----------|---------|
   | PR, approved, tests passing | ✅ Ready to merge — create tracking issue |
   | PR, changes requested | ⏳ Needs updates — skip, will re-check |
   | PR, pending review | ⏳ Waiting for review — skip |
   | Issue, open | 📋 Needs action assigned — create tracking issue |
   | Item already closed | ✅ Already shipped — mark processed, skip |

4. **For each item assessed as "ready" or "needs action"**, create a tracking issue.

5. **Mark each processed record** in repo-memory by writing an updated file
   with `"processed_by_auditor": true`.

## Output format

**Tracking issue title:** `[ship-it] {original item title} (#{number})`

**Tracking issue body:**

```markdown
## 🚢 Ship It — Tracking Issue

**Item:** {issue/PR title} — [#{number}]({url})
**Type:** {Issue / Pull Request}
**Author:** @{author}
**Observed:** {observed_at}

### Status assessment

{One of:}
- ✅ **Ready to merge** — PR is approved and tests are passing. Use `/ship-it` to trigger merge.
- 📋 **Needs action** — Issue labelled for shipping. Use `/ship-it` to assign to Copilot agent.

### Next step

Post `/ship-it` as a comment on this tracking issue to trigger the Ship It Commander.

---
_Created by the Ship It Auditor._
_Source record: repo-memory/ship-it-queue/{filename}_
```

## Constraints

- Create at most 3 tracking issues per run.
- Do not create duplicate tracking issues for the same PR/issue number.
  Before creating, check existing open issues for `[ship-it] #{number}`.

{{#runtime-import shared/noop-reminder.md}}


---
---
---

# =============================================================================
# WORKFLOW 3: ship-it-commander.md
# Role: ChatOps — /ship-it slash command assigns to Copilot agent
# =============================================================================

---
on:
  issue_comment:
    types: [created]

permissions:
  contents: read
  issues: write

safe-outputs:
  add-comment: {}
  assign-to-agent:
    # Bridges from this workflow to the Copilot coding agent.
    # The Copilot agent picks up the issue and executes the work.
    target: triggering
    allowed: [copilot]
  noop:
    reason: "Comment is not /ship-it or issue is not a ship-it tracking issue."

engine: copilot

# lock-for-agent prevents two /ship-it commands racing on the same issue.
lock-for-agent: true
min-integrity: collaborator
---

## Goal

You are the **Ship It Commander** — the ChatOps final stage of the factory.
When a collaborator posts `/ship-it` on a ship-it tracking issue, read the
linked PR or issue and assign it to the Copilot coding agent to execute.

This is the `assign-to-agent` pattern: the Commander is a *routing* agent —
it validates the request and hands off to Copilot to do the actual work.

## Steps

1. **Check the triggering comment.** If it does not start with `/ship-it`,
   call `noop` and stop.

2. **Check the issue title.** If it does not start with `[ship-it]`,
   call `noop` (this `/ship-it` was posted on the wrong issue) and stop.

3. **Read the tracking issue body** to extract:
   - The linked PR or issue number and URL
   - The status assessment (ready to merge / needs action)

4. **Post an acknowledgement comment:**
   ```
   ⚓ Ship It Commander activated by @{invoker}.
   Assigning to Copilot agent to execute the ship action on #{linked-number}...
   ```

5. **Assign to the Copilot coding agent** using `assign-to-agent` with this
   instruction context injected into the issue:

   For a **PR ready to merge:**
   ```
   SHIP IT COMMANDER INSTRUCTION:
   PR #{number} ({title}) is approved and ready to merge.
   Please: (1) verify CI is passing, (2) merge the PR, (3) report the result.
   ```

   For an **issue needing action:**
   ```
   SHIP IT COMMANDER INSTRUCTION:
   Issue #{number} ({title}) is labelled ship-it and needs execution.
   Please: (1) read the issue, (2) implement the requested change,
   (3) open a PR, (4) report the result.
   ```

6. **Call `noop` is NOT needed** after `assign-to-agent` — the assignment
   itself counts as a safe-output. (Teachable moment: `assign-to-agent`
   satisfies the safe-output requirement.)

## Constraints

- Only respond to `/ship-it` on issues with `[ship-it]` title prefix.
- Only allow `min-integrity: collaborator` — prevent unauthorized shipping.
- If `assign-to-agent` is not available in your environment, fall back to
  posting a comment instructing the invoker to manually trigger the Copilot agent.
- Do not process `/ship-it` from bots.

{{#runtime-import shared/noop-reminder.md}}
