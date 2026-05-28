###### Challenge 3-02 — Context Engine
###### Adapted from: discussion-task-miner.md (githubnext/agentics)
###### Source: https://github.com/githubnext/agentics/blob/main/workflows/discussion-task-miner.md
###### Also draws on: audit-workflows.md (github/gh-aw) for agentic-workflows MCP usage
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.04 (Copilot, MCP enrichment)

---
on:
  schedule:
    # Run twice daily: morning to catch overnight discussions, afternoon for AM activity.
    - cron: "0 7 * * *"
    - cron: "0 14 * * 1-5"
  workflow_dispatch:

permissions:
  contents: read
  discussions: read
  issues: write

safe-outputs:
  create-issue:
    max: 5
    # Each mined task becomes its own issue — capped at 5 per run.
    labels: [mined-from-discussion, needs-triage, automated]
    expires: 14d
  noop:

engine: copilot

# MCP tool configuration — this is what makes this challenge about "MCP tools".
tools:
  github:
    toolsets:
      # discussions toolset gives the agent read access to all Discussion content.
      - discussions
      - issues
    # gh-proxy mode is not needed here (single-repo), but shown for reference.
    # mode: gh-proxy  # Uncomment only for org-wide multi-repo workflows.

  # cache-memory lets the agent remember which discussions it already processed
  # across runs — prevents creating duplicate issues for old discussions.
  cache-memory: true
---

## Goal

Mine GitHub Discussions for **actionable tasks** and automatically convert them
into GitHub Issues. This is the **Context Engine** pattern: using an MCP tool
(the GitHub Discussions API) as a structured external data source to enrich
the agent's decision-making beyond what the code repo alone provides.

Teams often make decisions and identify action items in Discussions but never
turn them into trackable issues. This workflow bridges that gap.

## Steps

1. **Fetch recent discussions** using the GitHub MCP `discussions` toolset.
   Retrieve all discussions updated in the last 24 hours (or 48 hours on Monday
   to cover the weekend).

2. **Check cache-memory** for a list of discussion IDs already processed.
   Skip any discussion whose ID appears in the cache. This prevents duplicates
   across runs.

3. **For each unprocessed discussion**, read the title, body, and all comments.
   Apply the Task Identification criteria below.

4. **Identify actionable tasks.** A task is actionable if the discussion contains:
   - An explicit action item (e.g., "we should fix", "someone needs to",
     "TODO:", "next step:", "let's create an issue for")
   - A decision that implies follow-up work (e.g., "we agreed to refactor X",
     "we decided to add Y")
   - An unanswered question that requires an engineering decision
     (not just a usage question)

   **Not** actionable: general conversation, announcements, status updates,
   already-resolved questions.

5. **For each actionable task found** (max 5 per run), create a GitHub issue
   using the `create-issue` safe-output.

6. **Update cache-memory** with the discussion IDs processed in this run.

7. **If no actionable tasks are found** in any discussion, call `noop`.

## Output format

**Issue title:** `[Discussion] {one-sentence task description}`

**Issue body:**

```markdown
## 📌 Task Mined from Discussion

**Source discussion:** {discussion title} (#{discussion number})
**Discussion category:** {category}
**Identified by:** Context Engine workflow
**Run date:** {YYYY-MM-DD}

### Task description

{2–4 sentences clearly describing the actionable task. Be specific — use the
language from the discussion where possible.}

### Context

> {Direct quote of the most relevant passage from the discussion that supports
> this being a task — max 3 sentences, block-quoted.}

### Suggested next steps

- [ ] {First concrete action to progress this task}
- [ ] {Second concrete action, if applicable}
- [ ] Assign this issue to the right team/person
- [ ] Link back to the source discussion

---
_Automatically extracted from GitHub Discussions by the Context Engine workflow._
_[View source discussion](../../discussions/{number})_
```

## Constraints

- Create issues only for **genuinely actionable** tasks. When in doubt, do not
  create an issue — avoid noise in the issue tracker.
- Each issue must include a direct quote from the discussion as evidence.
- Do **not** create duplicate issues. If a discussion with the same ID was
  already processed (cache-memory check), skip it.
- Maximum 5 issues per run. If more than 5 tasks are found, create the 5 most
  clearly actionable and leave the rest for the next run (do not process them
  into the cache until they've been issued).
- The issue body must stay under 500 words.

{{#runtime-import shared/noop-reminder.md}}
