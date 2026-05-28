# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Program design, scope, decisions | Ripley | Hackathon structure, timeline, judging rubric, trade-offs |
| Code review, work approval | Ripley | Review any deliverable before it ships |
| Challenge content, WTH Student guides | Hudson | Challenge prompts, success criteria, tips & tricks |
| Coach guides, solution docs | Hudson | WTH Coach folder content, hint strategy |
| Getting-started guides, FAQs | Hudson | Participant quickstart, gh-aw explainers, announcement copy |
| Example gh-aw workflows | Hudson + Vasquez | Hudson writes content, Vasquez validates they compile |
| gh-aw infra, repo setup | Vasquez | Labels, issue templates, Actions workflows, compiled .lock.yml |
| Workflow validation, technical QA | Vasquez | Verify participant submissions are valid gh-aw workflows |
| Hackathon automation workflows | Vasquez | Triage bot, status reports, submission checker via gh-aw |
| GitHub Pages build & config | Bishop | Jekyll/_config.yml, deploy Actions, site structure |
| Visual design, assets | Bishop | Theme, challenge cards, logos, banners, social cards, badges |
| Site UX & navigation | Bishop | Challenge index page, per-challenge layout, mobile responsiveness |
| Participant experience, comms | Hicks | Registration, welcome materials, Discord/Discussions, CoC |
| Submission process | Hicks | Submission templates, checklist, deadline management |
| Judging coordination | Hicks | Judge recruiting, scoring sheets, judging session facilitation |
| QA of participant-facing content | Hicks | Review docs/challenges before publish; flag to responsible agent |
| Session logging | Scribe | Automatic — never needs routing |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Lead |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, the **Lead** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.
