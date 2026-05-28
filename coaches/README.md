# Coach Handbook

## Your Role

You are a **guide**, not a solver. Your job is to ask the right questions, point squads toward the right docs, and unblock — never to write code or workflows for them.

## Core Principles

1. **Ask before telling** — "What have you tried?" "What error did you see?" "What do you think should happen?"
2. **Point, don't push** — direct them to docs, examples, or concepts. Let them connect the dots.
3. **Unblock, don't solve** — if a squad is truly stuck (10+ min, no progress), give a focused hint — one sentence max.
4. **Celebrate attempts** — wrong approaches are learning. Acknowledge effort before redirecting.

## Touchpoint Schedule

| Time | Action |
|------|--------|
| 09:50 | Check all squads are unblocked after Track 1 start |
| 11:40 | New concepts in Track 2 — expect questions |
| 12:40 | Mid-Track 2 — slash commands are the common blocker |
| 14:25 | Track 3 start — hardest content, most support needed |
| 15:30 | 30 min before deadline — help squads scope what they can finish |

## Common Blockers & Hints

| Problem | Hint (give only if stuck 10+ min) |
|---------|-----------------------------------|
| Workflow won't compile | Check frontmatter YAML — triggers and engine must be declared |
| safe-outputs failing | The gate needs explicit `safe-outputs: true` in frontmatter |
| Slash command not firing | Comment must start with `/` and workflow must listen to `issue_comment` |
| Workflow chain not triggering | Check that workflow A's output matches workflow B's trigger event |
| Engine returning errors | Verify API key is set in repo secrets; check engine name spelling |

## Judging

- You may **not** judge squads you coached
- You **may** nominate squads for special awards
- See [Judging Rubric](../docs/program/judging-rubric.md) for full criteria

## Demonstrating Workflows to Squads

Use this sequence to unblock squads that have never used `gh aw` before. Takes ~3 min.

**Adding a remote workflow:**
```bash
# Add a workflow from GitHub directly
gh aw add https://github.com/github/gh-aw/blob/main/examples/issue-summary.md

# Or from the examples in this repo
gh aw add examples/hello-world.md
```

**Running a workflow:**
```bash
gh aw run examples/hello-world.md
gh aw run examples/hello-world.md --dry-run  # safe to demo, no side effects
```

**Checking workflow status:**
```bash
gh aw logs            # show recent runs
gh aw audit workflow.md  # show compiled + sandboxed version
```

**Typical coach demo sequence** (3 min):
1. `gh aw add examples/hello-world.md` — adds the workflow
2. `gh aw audit examples/hello-world.md` — shows what it will do before running
3. `gh aw run examples/hello-world.md --dry-run` — demonstrates execution
4. Show the created issue in the GitHub web UI

## Resources

- [Challenge Overview (README)](../README.md)
- [Timeline](../docs/program/timeline.md)
- [Devcontainer Setup](../docs/getting-started/devcontainer-setup.md)
