# Judging Rubric

## Scoring Categories

| Category | Weight | What We're Looking For |
|----------|--------|----------------------|
| Challenge Completion | 40% | Does the workflow work? Does it meet all success criteria? |
| Creativity & Design | 20% | Inventive use of triggers, engines, or workflow composition |
| Safety & Guardrails | 20% | Proper use of safe-outputs, scoped permissions, error handling |
| Code Quality | 10% | Clean Markdown, clear intent, maintainable structure |
| Documentation | 10% | README explains what it does, how to run it, and why |

**Total: 100 points per challenge** (scaled by weight)

---

## Scoring Guidance

### Challenge Completion (40%)

| Score | Criteria |
|-------|----------|
| 5 | All success criteria met. Workflow runs end-to-end without manual intervention. Edge cases handled. |
| 3 | Core functionality works. Minor success criteria missed or occasional failures. |
| 1 | Attempted but does not produce the expected outcome. Partial implementation only. |

### Creativity & Design (20%)

| Score | Criteria |
|-------|----------|
| 5 | Novel approach. Combines features in unexpected ways. Goes meaningfully beyond requirements. |
| 3 | Solid implementation with some original thinking. Standard approach done well. |
| 1 | Minimal viable solution. No evidence of exploration beyond the obvious path. |

### Safety & Guardrails (20%)

| Score | Criteria |
|-------|----------|
| 5 | safe-outputs gate active. Minimal permissions. Graceful failure modes. Secrets handled properly. |
| 3 | safe-outputs present. Permissions mostly scoped. Some error handling. |
| 1 | No safe-outputs. Overly broad permissions. No error handling. |

### Code Quality (10%)

| Score | Criteria |
|-------|----------|
| 5 | Markdown is clean, well-structured, and readable. Intent is immediately clear. |
| 3 | Readable but some sections are confusing or poorly organized. |
| 1 | Hard to follow. Unclear structure. Mixed concerns. |

### Documentation (10%)

| Score | Criteria |
|-------|----------|
| 5 | README explains purpose, usage, configuration, and limitations. Someone else could run it cold. |
| 3 | Basic README present. Covers what it does but missing setup or context. |
| 1 | No documentation or a single unhelpful sentence. |

---

## Tie-Breakers

When squads have equal total scores:

1. **Higher Safety & Guardrails score wins** — we reward responsible automation
2. **Higher Creativity score wins** — we reward bold ideas
3. **Fastest completion time** — measured from challenge start to final passing commit

---

## Special Awards

| Award | Criteria |
|-------|----------|
| 🛡️ **Safest Agent** | Best use of safe-outputs, permission scoping, and defensive patterns |
| ⚡ **Most Creative Trigger** | Most inventive use of events, schedules, or slash commands |
| 🧹 **Cleanest Workflow** | Best-structured, most readable, most maintainable workflow |
| 🔗 **Best Coordination** | Most impressive multi-workflow system (Track 3) |
| 🌟 **People's Choice** | Voted by all participants at closing |

---

## Process

1. Squads present their best challenge from each completed track (3 min per demo)
2. Judges score independently using this rubric
3. Scores are averaged across judges
4. Track winners announced first, then overall winner
5. Special awards announced last

**Judges:** Minimum 3. Mix of organizers and external guests. No judge scores their own coached squad.
