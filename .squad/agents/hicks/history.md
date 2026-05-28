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

### 2026-05-28 — Sprint 1 Blocker Fixes (hicks-2)

**Status:** ✅ RESOLVED

**Blockers fixed:**
1. `YOUR_ORG` placeholders across 5 participant-facing files — replaced with `olivomarco`
   - `docs/program/participant-handbook.md`: 3 instances (lines 75, 129, 191 — GitHub Discussions links)
   - `docs/program/submission-guide.md`: 2 instances (Discussions link + deadline section)
   - `.github/ISSUE_TEMPLATE/submission.yml`: 1 instance (Questions section)
   - `.github/ISSUE_TEMPLATE/config.yml`: 3 instances (All contact links)
   - `.github/ISSUE_TEMPLATE/help-request.yml`: 1 instance (Discussions reference)
   - **Note:** Intentionally preserved `YOUR_ORG/YOUR_REPO` in `challenges/track-2-repo-concierge/2-05-welcome-wagon/Student/README.md` — this is a template placeholder for participants to fill in during hackathon
2. Discord channel timing unclear (Line 80)
   - Before: "(TBD — link will be shared at registration)"
   - After: "(share the link on the day — Discord invite posted in #announcements)"
3. Submission deadline marked TBD (Lines 176, 160)
   - Before: "Deadline: {TBD: see timeline.md}"
   - After: "Deadline: **16:00** on hackathon day (see timeline.md)"
   - Sourced from timeline.md "Pencils down. Push final commits." at 16:00 in Track 3 block

**Impact:** All GitHub org references point to correct repo. Discord and deadline messaging clear to participants. Participant-facing docs ready for launch.

**Verification:** No remaining `YOUR_ORG` placeholders. All deadlines explicit (16:00).

---

**2026-05-28 Wave A Content Landed:** 28 challenge docs + polished site ready for QA. Next: verify sample solution compilation, challenge sidebar frontmatter parsing, coach portal access.

---

## 2026-05-28 QA Pass Complete

**Final audit of participant operational docs + GitHub issue templates:**

- **Track naming critical fix:** Submission guide & issue templates were using "Foundations/Intermediate/Advanced" — corrected to match timeline.md: "Hello, Agent/Repo Concierge/Continuous Intelligence"
- **Broken reference fixed:** Bug reporting link in handbook was pointing to non-existent section
- **Tone humanized:** Removed smarmy closings from handbook, submission guide, coach handbook. Adjusted help-request template tone.
- **All fact-checks passed:** Cross-references verified, consistency checked, no fabricated dates

**Status:** All docs cleared for participant launch. Report in `.squad/decisions/inbox/hicks-qa-pass.md`.


**2026-05-28:** QA pass landed — track names corrected; smarmy closings removed; broken bug-report reference fixed

**2026-05-28 Team Update (Audit Wave 2):** All agents completed curriculum + content + ops gap audits. 5 inbox decisions merged into `.squad/decisions.md`; gap report delivered to Marco. 26 items catalogued across 4 severity tiers (critical blockers, production patterns, catalog gaps, journey edge cases). Inbox now empty.

## 2026-05-28 Sprint-1 Blockers Fixed

**Blocker 1 - Org placeholder replacement:**
- Replaced ALL `YOUR_ORG` → `olivomarco` across:
  - `docs/program/participant-handbook.md` (3 instances: Discord Discussions links on lines 75, 129, 191)
  - `docs/program/submission-guide.md` (1 instance in Discussions link + 1 in deadline section)
  - `.github/ISSUE_TEMPLATE/submission.yml` (1 instance)
  - `.github/ISSUE_TEMPLATE/config.yml` (3 instances across contact links)
  - `.github/ISSUE_TEMPLATE/help-request.yml` (1 instance)
- Intentionally preserved `YOUR_ORG/YOUR_REPO` in `challenges/track-2-repo-concierge/2-05-welcome-wagon/Student/README.md` — this is a template placeholder for participants to fill in.

**Blocker 2 - Discord channel clarity:**
- Line 80 (participant-handbook.md): Changed `(TBD — link will be shared at registration)` → `(share the link on the day — Discord invite posted in #announcements)` for clearer communication.

**Blocker 3 - Submission deadline:**
- Line 176 (participant-handbook.md): Replaced `{TBD: see timeline.md}` with `**16:00** on hackathon day (see [timeline.md](timeline.md) for the full schedule)` based on timeline.md "Pencils down. Push final commits." at 16:00.
- Line 160 (submission-guide.md): Replaced `{TBD: see [timeline.md](timeline.md) for the exact deadline and time zone.` with `**16:00 on hackathon day** (see [timeline.md](timeline.md) for the full schedule)` for consistency.

**Status:** All placeholders replaced, participant docs now ready for launch.


## 2026-05-28 Sprint-2: MC Kickoff, Completion Awards, Workflow Evidence

**Fix 1 - MC Kickoff Script:**
- Created `/docs/program/mc-kickoff-script.md` — 400+ word spoken script in "cue card" format for MC during opening block (09:00–09:30).
- Covers Welcome & Format Briefing (09:00–09:15): welcome, hackathon theme intro (gh-aw workflows + natural language Markdown), WTH format explanation (3 tracks, squads, challenge progression), judging criteria brief, coach introductions (placeholder for names), help channels (Discord, Discussions, raise hand).
- Includes 2-minute "What are gh-aw workflows?" plain English explanation for MC to read aloud — uses clear metaphors (job description vs. low-level instructions).
- Covers Squad Formation (09:15–09:30): self-selection guidance, squad naming, immediate Codespace open (critical timing cue).
- Includes timing cues [PAUSE], [APPLAUSE CUE], [SHOW SLIDE] for MC flow control.
- Energetic, participant-first tone; practical and actionable throughout.

**Fix 2 - Completion Awards Section:**
- Added new `## Completion Awards` section to `docs/program/judging-rubric.md` before Questions section.
- Recognizes squads that complete ≥1 core challenge per attempted track.
- Frames completion awards as equally prestigious as competitive awards — removes stigma of "not winning."
- Suggests Certificate of Completion or badge system (design TBD).
- Emphasizes "Finishing one challenge > starting three and shipping nothing."
- Makes clear: NOT competing for winners ≠ going home empty-handed.

**Fix 3 - Workflow Evidence Fields in Submission Template:**
- Added two new textarea fields to `.github/ISSUE_TEMPLATE/submission.yml` after `challenges` field and before `reflection` field.
- **Field A: Workflow File(s)** — required, accepts space-separated or line-separated paths to solution.md files (e.g., `challenges/track-1-hello-agent/1-01-morning-briefing/solution.md`).
- **Field B: Actions Run Link(s)** — optional but encouraged, accepts GitHub Actions run URLs for evidence of workflow execution.
- Both fields positioned to make judging verification instant — judges can click links and see working workflows.

**Status:** All three Sprint-2 HIGH items fixed and ready for launch. Participant submission and judging process now has full evidence trail.

## 2026-05-28 Sprint 2–3 Housekeeping (Scribe)

**Session:** Merged 5 agent inbox decisions into decisions.md, archived old entries, created orchestration logs.

**Agents completed:**
- ripley-3 (Sprint 2): Time-budget reconciliation
- hicks-3 (Sprint 2): MC kickoff script, completion awards, submission evidence fields
- vasquez-4 (Sprint 2): validate-submission workflow, coaches demo section
- hudson-4 (Sprint 3): Challenges 2-06, 3-06 with Student/Coach READMEs
- vasquez-6 (Sprint 3): Sample solutions 2-06, 3-06, 3-05 multi-repo extension

**Action:** 5 commits staged for Sprint 2 + 3 curriculum + housekeeping.

### 2026-05-28 — Install Command Directive & Track 4 Documentation (hicks-4)

**Captured canonical install directive:**
- Created `.squad/decisions/inbox/hicks-install-command-directive.md` to document the canonical gh-aw install command: `curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash`
- Rationale: Install script is the supported entry point (NOT `gh extension install github/gh-aw`).
- Scope: All install instructions everywhere in repo (excluding `_site/` build output and `.squad/`).
- Vasquez updating .devcontainer, validate-submission.yml, devcontainer-setup.md, and Challenge 00 Coach README in parallel.

**Updated participant-facing documentation:**
1. **Participant Handbook** (`docs/program/participant-handbook.md`):
   - Added "## Tracks" section with brief descriptions of Tracks 1–3.
   - Added Track 4 description: "Production Patterns (Stretch / Real-World)" — real workflows from github/gh-aw and githubnext/agentics with documented 96% merge rate example.
   - Positioned before FAQ section for natural flow.

2. **Timeline** (`docs/program/timeline.md`):
   - Added italicized note after Track 3 deadline warning: "Squads who finish Track 3 core early may explore Track 4 'Production Patterns'... Time-permitting only; not required for judging."
   - Positioned between deadline warning and Judging block.

3. **Challenge 00 (Setup)**:
   - Verified: No explicit `gh aw` install commands in `_challenges/00-setup.md` or `challenges/00-setup/Student/README.md`.
   - Both files reference DevContainer setup (pre-installed) or verification steps only. No changes required.

**Quality notes:**
- Participant handbook now clearly signals that Track 4 is optional stretch work, not required for core participation.
- Tone consistent with existing participant-first messaging (practical, warm, inclusive).
- Install directive decision logged for cross-team coordination (Vasquez updating supporting infrastructure).

**Status:** All tasks complete. Three docs updated; one decision captured; Challenge 00 verified as no-change.
