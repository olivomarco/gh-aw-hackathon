###### Challenge 2-05 — Welcome Wagon
###### Adapted from: ai-moderator.md (github/gh-aw) — repurposed for welcoming, not moderating
###### Source: https://github.com/github/gh-aw/blob/main/.github/workflows/ai-moderator.md
###### Estimated compile cost: ~2s  |  Estimated first-run cost: ~$0.01 (Copilot, per new contributor)

---
on:
  issues:
    types: [opened]
  pull_request:
    types: [opened]

permissions:
  contents: read
  issues: write
  pull-requests: write

safe-outputs:
  add-comment: {}
  add-labels:
    allowed:
      - first-time-contributor
      - returning-contributor
      - good-first-issue
  noop:
    # Called for team members/maintainers who don't need a welcome message.
    reason: "Author is a maintainer or collaborator — welcome message not needed."

engine: copilot

# checkout: false — this workflow only needs GitHub API data, not repo code.
# ai-moderator.md uses the same pattern for performance.
checkout: false

# Skip bots entirely — Dependabot, Renovate, etc. don't need a welcome.
skip-bots: true

# Do NOT rate-limit first-time contributor welcome messages.
# Every new contributor should get exactly one welcome, no matter what.
---

## Goal

Detect when someone opens their **first** issue or pull request in this
repository and post a warm, personalised welcome message. Returning contributors
get a shorter but still friendly acknowledgement.

This is the **`ai-moderator` pattern repurposed for community building** rather
than spam detection. The key learning: `checkout: false`, `skip-bots`, and reading
author association from the event payload.

## Steps

1. **Read the author association** from the event payload.
   The `author_association` field will be one of:
   `OWNER`, `MEMBER`, `COLLABORATOR`, `CONTRIBUTOR`, `FIRST_TIMER`, `FIRST_TIME_CONTRIBUTOR`, `NONE`

2. **If the author is `OWNER`, `MEMBER`, or `COLLABORATOR`:**
   Call `noop` with reason `"Author is a maintainer or collaborator — welcome message not needed."`
   Do not post a welcome message.

3. **If the author is `FIRST_TIMER` or `FIRST_TIME_CONTRIBUTOR`:**
   - Apply label `first-time-contributor`.
   - If it is an issue and the issue looks approachable for a new contributor:
     also apply `good-first-issue`.
   - Post the **First-Time Welcome** comment (template below).

4. **If the author is `CONTRIBUTOR` or `NONE`** (returning external contributor):
   - Apply label `returning-contributor`.
   - Post the **Returning Contributor** comment (template below).

5. **Personalise** by reading the event title to reference the specific
   issue/PR topic in the welcome message. Do not use generic filler text.

## Output format

**First-Time Welcome comment:**

```markdown
## 👋 Welcome to the project, @{author}!

This is your first contribution here, and we're really glad you opened this
{issue / pull request} about **{topic from title}**.

### A few helpful links to get started

- 📖 [README](../../README.md) — overview of the project
- 🤝 [Contributing guide](../../CONTRIBUTING.md) — how we work together
- 💬 [Discussions](../../discussions) — questions welcome here

### What happens next

{For issues:}
A maintainer will review and label this issue within a few days. In the
meantime, feel free to add more context, screenshots, or steps to reproduce
if you have them.

{For PRs:}
A maintainer will review your pull request. You may see some automated
checks run first — don't worry if they take a few minutes.

We review all contributions carefully, and we really appreciate you taking
the time. Welcome to the community! 🎉

_Posted by the Welcome Wagon workflow._
```

**Returning Contributor comment:**

```markdown
👋 Welcome back, @{author}! Thanks for your continued contributions.
{One sentence referencing the specific topic of this issue/PR.}

_Posted by the Welcome Wagon workflow._
```

## Constraints

- Post **at most one** welcome comment per issue/PR — do not re-post if the
  workflow re-triggers on a synchronize event for a PR.
- Check whether a welcome comment from this workflow already exists before
  posting. If one exists, call `noop`.
- Keep the first-time welcome under 200 words.
- Keep the returning contributor message under 40 words.
- Do **not** post welcome messages on issues/PRs opened by bots (`skip-bots: true`
  handles this at the trigger level, but double-check author login if uncertain).
- Personalise with the actual issue/PR topic — never write a purely generic message.

{{#runtime-import shared/noop-reminder.md}}
