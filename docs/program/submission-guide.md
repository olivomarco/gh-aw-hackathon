# Submission Guide

Your squad has completed challenges. Here's how to submit your work for judging.

---

## One Submission Per Squad

Each squad submits **once**. Your submission represents the squad's collective work.

- You can submit solutions for multiple challenges within that one submission.
- All squad members should be listed in the submission.
- Only one person from your squad needs to submit (but make sure everyone agrees on what's being submitted).

---

## How to Submit

You have two options. Pick the one that feels right for your squad:

### Option A: GitHub Pull Request (Recommended)

1. **From your squad's fork**, create a PR to the main hackathon repository (`main` branch).
2. **PR title:** Squad name + track(s) (e.g., `Track 1: Acme Squad`)
3. **PR description:** Use the [submission template](#submission-template) (pasted in the PR body).
4. **Files to include:** Your squad's completed challenge files in the fork.
5. **Submit:** Click "Create Pull Request".
6. Coaches will review and label with `submission` + status.

**Advantage:** Built-in code review, trackable changes, judges can see your work in context.

### Option B: GitHub Issue

1. **In the hackathon repository**, create a new issue.
2. **Title:** Squad name + track(s) (e.g., `Track 1: Acme Squad`)
3. **Body:** Use the [submission template](#submission-template) (pasted in the issue body).
4. **Include:** A link to your squad's **public fork** (and make sure it's public).
5. **Label:** Select `submission`.
6. **Submit:** Click "Create issue".

**Advantage:** Simpler for squads that want to submit without a PR; easier Q&A before judging.

**Important:** If you use Option B, make sure your fork is public so judges can review your work.

---

## Submission Template

Whether you use a PR or issue, include these fields in your submission:

```yaml
Squad Name: [Your squad name here]

Members: [List GitHub handles: @handle1, @handle2, @handle3]

Track(s) Attempted:
- [ ] Track 1: Hello, Agent
- [ ] Track 2: Repo Concierge
- [ ] Track 3: Continuous Intelligence

Challenges Completed:
- [ ] Challenge 1: [Brief description of what you built]
- [ ] Challenge 2: [Brief description of what you built]
- [ ] Challenge 3: [Brief description of what you built]

Reflection (max 200 words):
[What did you learn? What was challenging? What would you do differently?]

Demo/Recording (optional):
[Link to a demo video, screenshot, or recording showing your work in action]

Submission Checklist:
- [ ] All team members agree this submission represents our best work
- [ ] Code is in our public fork (if using GitHub Issue submission)
- [ ] We have tested all submitted challenges
- [ ] We have reviewed the Code of Conduct
- [ ] We are disclosing any AI tool usage in the reflection section
```

---

## Submission Fields Explained

### Squad Name
Your team's name (can be playful, creative, or straightforward).

### Members
List everyone on your squad using GitHub handles. This is how judges know who to credit.
- Format: `@alice`, `@bob`, `@charlie`
- Make sure handles match your GitHub accounts.

### Track(s) Attempted
Which track(s) did you work on?
- **Track 1: Hello, Agent** — Learn the basics of gh-aw syntax and simple workflows.
- **Track 2: Repo Concierge** — Build multi-step workflows for repository automation.
- **Track 3: Continuous Intelligence** — Design complex workflows with error handling and system coordination.

You can work on multiple tracks if you want. Just note which ones.

### Challenges Completed
List each challenge your squad completed. Include a 1-line summary of what you built (e.g., "Created a workflow to summarize GitHub issues" or "Built an automated PR reviewer").

### Reflection (200 words max)
This is your chance to tell judges what you learned and how you approached the problem:
- **What did you build and why?** (1–2 sentences)
- **What was most challenging?** (What problem did you get stuck on? How did you solve it?)
- **What would you do differently next time?** (Any insights for the next hackathon?)
- **AI tool usage:** If you used ChatGPT, Copilot, or any AI to help, mention it here (e.g., "Used ChatGPT to debug regex" or "Used Copilot Workspace to scaffold the workflow structure").

Reflections show judges your learning process, not just the final code. Be honest.

### Demo/Recording (Optional but Encouraged)
A 30-second video, screenshot, or screen recording showing your solution in action:
- How to create one:
  - Screen recording tools: Loom, OBS, or your OS native tool (Windows Game Bar, Mac QuickTime).
  - Keep it short (~30 seconds). Show one full run-through.
  - Narrate if you like ("This workflow fetches PRs and summarizes them").
- Why submit it:
  - Judges get a quick sense of what you built.
  - It's fun for the post-event showcase.
- Where to host:
  - YouTube (unlisted is fine).
  - Loom (auto-shareable).
  - Imgur or any public image host (for screenshots).

---

## What CANNOT Be in Submissions

For safety and respect, do **not** include:

- **Secrets or credentials** — API keys, tokens, passwords, etc. (Remove `.env` files before committing.)
- **Copyrighted code** — Code copied from tutorials or Stack Overflow without attribution.
- **Personal data** — Real names, emails, or private information not yours to share.
- **Offensive content** — Code or comments that violate [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).

If you've accidentally committed secrets, reach out to a coach **immediately**. We can help you clean it up.

---

## How We Know Your Submission Was Received

After you submit:

1. **GitHub Actions** runs a quick check on your submission to confirm:
   - PR/issue is properly formatted.
   - Required fields are filled in.
   - Repo access is correct.

2. **Auto-label:** If all checks pass, we add a `submission` label to your PR/issue.

3. **Notification:** You'll get a GitHub comment confirming receipt (usually within a few minutes).

4. **If something's wrong:** We'll add a comment with feedback so you can resubmit.

---

## Submission Deadline

**16:00 on hackathon day** (see [timeline.md](timeline.md) for the full schedule)

- Submissions received **before** the deadline are eligible for judging.
- Submissions received **after** the deadline may be reviewed but not scored (at judges' discretion).
- No exceptions for time zones — deadline is the same for everyone.

---

## Withdrawal & Late Submission

### Want to withdraw your submission?
- Comment on your PR/issue with `[WITHDRAWN]` in the title.
- You can resubmit a new PR/issue before the deadline.

### Missed the deadline?
- You can still submit a PR/issue after the deadline.
- Add a comment explaining why (e.g., "Late due to environment issues").
- Judges will review on a case-by-case basis. No guarantees, but we understand that hackathons are chaotic.

---

## After Submission

### What happens next?
1. **Coaches review** for completeness and quality (you might get feedback).
2. **Judges score** based on the [judging rubric](judging-rubric.md).
3. **Winners announced** at the closing ceremony.
4. **Solutions shared** (with your permission) in a post-event showcase.

### Can we update our submission after posting?
- **Before judges start reviewing:** Yes, push new commits to your PR or update your issue.
- **After judges start reviewing:** Talk to a coach if you find a bug or want to make a small fix. They'll let you know if it's possible.

### What if we didn't finish everything we wanted?
Submit what you have. Judges care about what you completed and what you learned — not what you didn't finish. Partial solutions are totally fine.

---

## Questions?

- **About submission format?** Check this guide or ask in [GitHub Discussions](https://github.com/olivomarco/gh-aw-hackathon/discussions).
- **About your specific submission?** Ask your coach.
- **Found a bug in a challenge?** Report it with details so we can help other squads.

Submit with confidence. We're here to help.
