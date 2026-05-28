# Coach Guide: Challenge 00 — Setup & Hello, Agent

---

## Coaching Philosophy for This Challenge

This is the **foundation challenge**. Every single squad does it first. Your job is not to make them solve a hard problem—it's to build **confidence**.

By the end of 45 minutes, every squad should feel: *"I can write a gh-aw workflow. It actually works. I understand the loop. I'm ready for harder stuff."*

**Key rule:** Do not let any squad get stuck for more than 20 minutes without a hint. The goal is momentum, not suffering.

---

## Expected Outcomes

A finished solution looks like:

**Files:**
- `.github/workflows/hello-agent.md` — 20–30 lines (frontmatter + body)
- `.github/workflows/hello-agent.lock.yml` — auto-generated, ~50–100 lines

**Behavior:**
- Workflow runs successfully (visible in Actions tab)
- A GitHub issue appears in the repo's issue list
- Issue title starts with `[hello-agent]`
- Issue body includes a friendly greeting and a fun fact

**Example issue:**
```
Title: [hello-agent] Hello from Squad Bravo!
Body: 
We're the Squad Bravo team at the gh-aw Hackathon. 
Here's a fun fact: agentic workflows run entirely on the GitHub platform, 
so they're as secure as GitHub Actions themselves.
```

---

## Common Approaches

All of these are equally valid. Squads will likely pick one based on their comfort level.

### Approach 1: "Minimal and Direct" (most common)
Squad writes a simple 3-sentence prompt in the body, with minimal frontmatter. Frontmatter has only what's required: `on`, `permissions`, `safe-outputs`, `engines`.

**Pros:** Fast, easy to understand, focuses on the core loop  
**Cons:** Less showcasing of gh-aw capabilities (but that's fine for Challenge 00)

### Approach 2: "Narrative Instructions"
Squad writes a longer narrative in the body explaining exactly what they want. For example:
```markdown
Create a GitHub issue. The title should start with [hello-agent] 
and then include our squad name. The body should include 
a warm greeting and one fun fact about agentic workflows.
```

**Pros:** Clearer intent, easier for the AI to follow  
**Cons:** Slightly longer body, but still no more than 10 sentences

### Approach 3: "Structured Prompt"
Squad includes markdown structure (bullets, headers) in the body:
```markdown
# Create an Issue

## Title
Include the [hello-agent] prefix and our squad's name.

## Body
- Greeting from our squad
- Fun fact about agentic workflows
```

**Pros:** Very explicit structure, good practice for later  
**Cons:** Overkill for Challenge 00, but not wrong

---

## Common Pitfalls & How to Coach Through Them

### Pitfall 1: Forgot to compile
**Symptom:** Squad runs the workflow, but nothing happens or they get an error.  
**Root cause:** They edited `.md` but never ran `gh aw compile` to generate `.lock.yml`.

**Coach response:**
- "Have you run `gh aw compile` yet?"
- Walk them through: `cd .github/workflows && gh aw compile hello-agent.md`
- Show them the `.lock.yml` file appeared
- Explain: "That's the compiled GitHub Action. GitHub Actions runs the `.lock.yml`, not the `.md`"

### Pitfall 2: gh CLI not authenticated
**Symptom:** `gh aw` command doesn't exist or auth errors appear.

**Root cause:** They haven't run `gh auth login` or the extension didn't install.

**Coach response:**
- "Let's check: run `gh auth login`"
- Then: `gh extension list | grep aw`
- If not listed: `gh extension install github/gh-aw`
- Reference the [devcontainer setup guide](../../docs/getting-started/devcontainer-setup.md) section on auth

### Pitfall 3: Overpermissioning
**Symptom:** Workflow has `permissions: write-all` or `permissions: contents: write`

**Root cause:** Misunderstanding that safe-outputs handles writes separately.

**Coach response:**
- "I see `permissions: write-all` — why do you think we need that?"
- Guide them to the insight: "safe-outputs has its own permission model. Your workflow code itself just reads. Let safe-outputs do the writes."
- Simplify: change to `contents: read` or even just `{}` (default restrictions)

### Pitfall 4: Trying to call GitHub API directly
**Symptom:** They try to use curl or `gh api` to create the issue within the workflow body

**Root cause:** They don't realize safe-outputs is the *purpose* of gh-aw

**Coach response:**
- "I notice you're trying to call the GitHub API. That's normal in regular GitHub Actions, but gh-aw has a better way: safe-outputs. Let me show you..."
- Share the safe-outputs reference: https://github.github.com/gh-aw/reference/safe-outputs/
- Show them: `safe-outputs: create-issue:` in the frontmatter tells gh-aw "this workflow creates an issue"
- Then the body is just natural language instructions to the AI

### Pitfall 5: Indentation errors in YAML frontmatter
**Symptom:** Compilation fails with YAML parse errors

**Root cause:** YAML is whitespace-sensitive; they mixed tabs/spaces or didn't align keys properly

**Coach response:**
- "Let's look at the frontmatter. YAML is picky about indentation — spaces, not tabs."
- Show them a valid example (below)
- Have them re-indent using spaces (consistent 2 or 4 spaces per level)

### Pitfall 6: Empty or missing workflow body
**Symptom:** Compilation succeeds, but workflow does nothing or the AI doesn't know what to do

**Root cause:** The body has no instructions, just a blank section

**Coach response:**
- "The workflow body is your instructions to the AI. What do you want the issue to say? Write that here."
- Give example: "Create a GitHub issue with a friendly greeting from our squad and one fun fact about agentic workflows."

---

## Coaching Questions (Use These if a Squad is Stuck)

Ask these in order. They're designed to prompt self-discovery:

1. **"Have you run `gh aw compile` yet?"** (catches most blockers)
2. **"What does `gh aw logs hello-agent` show?"** (shows the actual error/output)
3. **"Look at your frontmatter — is everything indented correctly?"** (YAML issues)
4. **"Is the `safe-outputs` section indented under the top-level frontmatter?"** (common alignment mistake)
5. **"What does your workflow body say? Can you read it out loud to me?"** (often reveals vague instructions)
6. **"Have you authenticated with `gh auth login`?"** (gates the whole CLI)

---

## Sample Solution

Here's a complete, working `hello-agent.md`. Share this **only if a squad is truly stuck after 30+ minutes**, and even then, have them type it out (don't just copy-paste for them).

```markdown
---
on:
  workflow_dispatch:

permissions:
  contents: read

safe-outputs:
  create-issue:
    title-prefix: "[hello-agent] "

engines:
  - copilot
---

# Hello, Agent

Create a friendly GitHub issue from our squad to introduce ourselves to the gh-aw Hackathon.

The issue should:
1. Have a title that starts with the configured prefix and includes our squad's name (pick a fun name if you like)
2. Include a warm, upbeat greeting in the body
3. Share one fun fact about agentic workflows (e.g., they run on GitHub's platform, they're secure, they use AI to understand natural language, etc.)

Keep it brief — three sentences total in the body.
```

**Why this works:**
- `on: workflow_dispatch:` — triggers manually from the Actions UI
- `permissions: contents: read` — minimal permissions, safe-outputs handles writes
- `safe-outputs: create-issue:` — declares intent; gh-aw validates and ensures safe execution
- `title-prefix: "[hello-agent] "` — gh-aw will prefix all created issues
- `engines: [copilot]` — uses Copilot (free, default)
- Body: natural language, clear intent, 3 sentences max — enough for the AI to understand but not so verbose it's confusing

---

## Time Management

Suggest this breakdown for your squad:

| Phase | Time | What to Do |
|-------|------|-----------|
| Read & orient | 5 min | Read the challenge, ask any q's |
| Write the .md file | 10 min | Create `.github/workflows/hello-agent.md` |
| Compile & debug | 8 min | Run `gh aw compile`, fix any errors |
| Run & verify | 12 min | Trigger workflow, watch it run, see the issue appear |
| Celebrate & extend | 10 min | Chat about what you learned; try extensions if time |

**Total: ~45 minutes.**

If a squad finishes early (20–25 min), they're either very fast or made an assumption error. Check their work, then offer extensions.

---

## Extension Ideas (for Fast Squads)

If a squad finishes in <30 minutes, offer one of these:

1. **Schedule-based trigger:** Change `on: workflow_dispatch:` to `on: schedule: - cron: '0 9 * * 1'` (runs every Monday at 9 AM)
   - Requires updating the permissions (may need `issues: write` now)
   - Concept: triggers, event types

2. **Add a label to the issue:** Use `safe-outputs: create-issue: labels: [squad, hackathon]`
   - Concept: structured safe-outputs configuration

3. **Create a comment instead:** Use `safe-outputs: create-comment:` on an existing issue
   - Concept: different safe-output types, targeting

4. **Include a haiku:** Have the AI generate a haiku about gh-aw in the issue body
   - Concept: more complex natural language instructions

5. **Run on PR comments:** Change trigger to `on: issue_comment: ... if: contains(github.event.comment.body, '/hello-agent')`
   - Concept: slash commands, conditional triggers
   - Requires finding or creating an issue to comment on

---

## Debugging Checklist (For You, The Coach)

If a squad is **really stuck**, use this checklist:

- [ ] Is `gh auth login` done? (`gh auth status`)
- [ ] Is `gh aw` installed? (`gh extension list`)
- [ ] Does `.github/workflows/hello-agent.md` exist? (`ls -la .github/workflows/`)
- [ ] Does `.github/workflows/hello-agent.lock.yml` exist after `gh aw compile`?
- [ ] Is the frontmatter valid YAML? (spaces, not tabs; proper indentation)
- [ ] Is `safe-outputs` indented under the root of the frontmatter?
- [ ] Are permissions set to something restrictive (not `write-all`)?
- [ ] Did they actually trigger the workflow? (Actions tab, "Run workflow" button)
- [ ] Are there logs in the workflow run? (click the run, scroll down)
- [ ] Does the issue exist in the repo's Issues tab?

If all these check out and it still doesn't work, escalate to Ripley or check the gh-aw documentation for your engine of choice (Copilot, Claude, etc.) — there may be a missing API key or credential issue.

---

## Key Takeaways for Coaches

- **Your job:** Remove blockers, not solve the problem
- **Trust the loop:** Write → Compile → Run → Observe. It works.
- **Celebrate early wins:** When the issue appears, make a big deal of it. "You just wrote code that an AI executed and created a real GitHub issue. That's huge."
- **Keep momentum:** No squad should spend >20 minutes stuck. Better to give a hint early than watch frustration build.
- **Set them up for success:** This challenge is meant to make Challenge 01+ feel achievable. You're building confidence, not testing knowledge.

Good luck, and enjoy watching the lightbulbs go on! 💡
