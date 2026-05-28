# Hicks — History

## Project Context
- **Project:** gh-aw-hackathon
- **Owner:** Marco Olivo
- **Format:** What The Hack (WTH) — challenge-based, squads of 3-5, coaches guide not solve
- **WTH Events model:**
  - Coaches: technical mentors assigned per squad, guide without giving answers
  - Participants: self-organize into squads, work through challenges progressively
  - Judging: based on success criteria completion, not speed alone
  - Format works in-person and virtually
- **Tech:** GitHub Agentic Workflows (gh-aw) — participants build markdown-based AI workflows
- **Site:** GitHub Pages — public-facing challenge showcase (Bishop owns the site)

## Participant Experience Touchpoints
- Registration / sign-up flow
- Pre-event: setup instructions, prerequisites, environment check
- Day-of: welcome deck, squad formation, coach assignments
- During: submissions via GitHub issues or PRs, coach check-ins
- Post-event: winners announcement, solution sharing (after event only), retrospective

## Quality Gates (Hicks owns)
- All participant-facing docs reviewed before publish
- Challenge success criteria are unambiguous and testable
- Submission process is clear end-to-end
- Judging rubric is fair and transparent

## Team
- Ripley — Lead
- Hudson — DevRel
- Vasquez — Workflow Engineer
- Hicks (me) — Events & QA
- Bishop — Web & Design
- Scribe — Session logger
- Ralph — Work monitor

## Learnings

### Participant Journey Documents (2026-05-28)
- **Participant Handbook Structure:** Warm, practical tone. Journey mapped from registration through submission. Key sections: squad formation (self-organize), coach role (guide not solve), daily flow (reference timeline.md), communication channels (Discord real-time + Discussions async + coaches), working in fork workflow, help escalation rule (15 min stuck → ask coach), inclusivity/accessibility, comprehensive FAQ (12 questions), squad etiquette.
- **Submission Template Design:** One submission per squad via PR or issue. Required fields: squad name, members (GitHub handles), tracks attempted, challenges completed, reflection (200 words max, must disclose AI tool usage), optional demo/recording. Submission format emphasizes judging by learning + completion, not speed alone. Deadline and withdrawal policy clearly stated.
- **Coach Handbook Approach:** Socratic method emphasized (ask questions, don't solve). Escalation paths defined (squad distress, CoC violations, environment failures, off-scope questions). Pre-event prep checklist: read track docs, run Challenge 00 yourself, test environment, review submission + judging process, learn CoC, test comms. Day-of checklist covers squad formation through submission deadline. Common scenarios detailed: non-technical squad members, dominant team members, buggy challenges, AI tool usage, incomplete submissions.
- **GitHub Issue Templates:** Submission template (form-based YAML with required fields matching submission-guide.md, auto-labeled `submission`). Help-request template (lightweight form, track selector, problem/tried/context sections, auto-labeled `help-wanted`). Config.yml disables blank issues, surfaces both templates plus Discussions link.
- **Documentation Cross-References:** All docs reference timeline.md (Ripley) and judging-rubric.md (Ripley) without creating them. CODE_OF_CONDUCT.md referenced; Ripley owns creation. Participant handbook links to submission-guide.md; submission-guide links to timeline.md and judging-rubric.md.
- **Tone & Accessibility:** Practical + warm throughout. Accessibility section covers screen readers, captions, quiet spaces, mixed experience levels valued. FAQ anticipates 12 common questions (from team formation to AI disclosure to submission details).

## 2026-05-28: Kickoff milestone commit — Participant handbook + submission guide + coach handbook + issue templates complete (merged into decisions.md)
