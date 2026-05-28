# Participant Handbook

Welcome to the gh-aw Hackathon! This handbook covers everything you need to know to make the most of your experience — from squad formation through submission.

---

## Welcome & What to Expect

You're joining a **What The Hack** (WTH) style hackathon focused on GitHub Agentic Workflows. Here's what that means:

- **Hands-on learning:** You'll work through challenges that teach you how to build AI-powered workflows using the `gh-aw` CLI tool.
- **Squad-based:** You'll join a team of 3–5 participants working toward shared solutions.
- **Coach-supported:** Each squad gets a dedicated coach who guides your thinking (not solving for you).
- **Progressive difficulty:** Challenges escalate in complexity; you choose how far to go.
- **Flexible pacing:** Finish when you've learned something meaningful — there's no "time limit" to submit.

This is not a race. This is not a test. This is a collaborative learning experience. Be kind to yourself and your teammates.

---

## How Squads Form

**Self-organize at the start.** We'll kick off the event with a "squad formation" session:

1. Everyone attends the opening ceremony and gets a brief overview of the challenge tracks.
2. You'll have ~30 minutes to find 2–4 teammates.
   - Look for people interested in the same track as you.
   - Mix skill levels — diversity of experience makes squads stronger.
   - Can't find people? Organisers will help.
3. Let a coach know your squad is formed.
4. Your coach assigns you a **squad name** and a **GitHub fork** where you'll collaborate.

**Squad size:** 3–5 people is ideal. Smaller squads move fast but carry more load per person. Larger squads can divide work but need better coordination. Pick what feels right for your group.

---

## Your Coach

Your coach is your guide, not your answer book.

**What coaches do:**
- Help you understand the problem, not solve it for you.
- Ask clarifying questions: "What does the error say?", "Have you checked the docs?", "What did you try?"
- Unblock you when stuck (e.g., environment issues, unclear challenge wording).
- Celebrate wins.

**When to ask your coach:**
- You're stuck on a challenge for more than 15 minutes → ask.
- Something in your environment isn't working → ask.
- You need clarification on the challenge wording → ask.
- You're feeling overwhelmed → ask. Coaches want to help you succeed.

**Rule of thumb:** If you've Googled it, checked the challenge docs, and talked it through with your squad, and you're still stuck, it's time to loop in your coach.

---

## Daily Flow & Schedule

See [docs/program/timeline.md](timeline.md) for the full schedule, including:
- Opening ceremony time
- Challenge release schedule
- Submission deadline
- Judging and winner announcement

The timeline page is your source of truth for all times and deadlines.

---

## Communication Channels

**During the hackathon, use these channels:**

### Q&A & Help: GitHub Discussions
- **Purpose:** Ask questions, share insights, help other squads.
- **Channel:** [Discussions in this repo](https://github.com/YOUR_ORG/gh-aw-hackathon/discussions)
- **Async-friendly:** Great for questions that don't need real-time answers.

### Real-Time Chat: Discord (or Teams)
- **Purpose:** Live conversations, quick troubleshooting, social energy.
- **Channel:** (TBD — link will be shared at registration)
- **Hint:** Coaches monitor this heavily during the event day.

### Your Coach: Direct Mention
- Need your coach? @ mention them in Discord or raise a GitHub issue with the `help-wanted` label.

### Bug Reports
- Found a bug in a challenge? Report it in Discord or file a GitHub issue with the `bug` label. Include what you tried, what you expected, and what happened instead. Thanks for helping us improve!

---

## Working in Your Fork

Your squad will work in a **fork of the main hackathon repository**. Here's how:

### Setting Up

1. Your coach shares a fork URL with your squad (already created for you).
2. Each teammate clones it:
   ```bash
   git clone <fork-url>
   cd gh-aw-hackathon
   ```
3. You're ready to work.

### During Development

- Create a **feature branch** for each challenge (e.g., `track-1-challenge-1`, `track-2-demo`).
- Commit regularly with clear messages.
- Push to your fork.
- Teammates pull the latest changes to stay in sync.

### Before Submitting

- Test your solutions in your fork.
- Make sure all challenges you completed are working.
- Double-check file paths and formatting.
- Read the [submission guide](submission-guide.md) before you submit.

---

## When to Ask for Help

Feeling stuck? Here's when and how to get support:

### Quick Check (do this first)
- Reread the challenge description.
- Check the challenge's `README.md` and example files.
- Look at the error message — what does it actually say?
- Search [GitHub Discussions](https://github.com/YOUR_ORG/gh-aw-hackathon/discussions) (someone else may have hit this).

### Stuck for 15+ minutes?
- **Discord:** @ mention your coach in the real-time chat.
- **GitHub:** File a `help-wanted` issue (use the [help request template](./../../.github/ISSUE_TEMPLATE/help-request.yml)).
- **In person:** Walk over to your coach's desk if you're co-located.

### Emergency (environment down, repo corrupted, etc.)
- Message a coach directly (Discord or in person).
- They'll escalate to the technical team.

---

## Code of Conduct

We're committed to creating a safe, inclusive, and respectful hackathon for everyone. Before you participate, please read [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).

**TL;DR:** Be kind, respect everyone's time and ideas, don't cheat, give credit where it's due (especially for AI-generated code).

---

## Inclusivity & Accessibility

We want everyone to participate fully.

### Accessibility
- All challenges are provided in text and markdown format (machine-readable).
- Discord and in-person venues have quiet areas if you need a break.
- If you need accommodations (screen reader, captions, alt text, quiet space), let us know **before the event** or ask a coach on the day.

### Inclusivity
- No prior knowledge of `gh-aw` is required — we teach it.
- Squads work better with mixed experience levels.
- Coaches are trained to support different learning styles.
- Your background, identity, and perspective are valued.

### Communication
- Use respectful language.
- Listen actively.
- Disagree on ideas, not people.
- If you see or experience something that doesn't feel right, talk to a coach or organiser.

---

## Frequently Asked Questions

### How do we submit our work?
See [submission-guide.md](submission-guide.md). TL;DR: One submission per squad, via GitHub PR or issue. Deadline: {TBD: see timeline.md}

### Can we submit multiple solutions?
One submission per squad. But you can list multiple completed challenges **within** that one submission.

### What if my teammate has to leave halfway through?
Tell your coach. Squads can adjust on the fly — you'll still get credit for what you completed.

### Do we have to complete all challenges?
No. Complete what you can. You'll be judged on what you submit, not on speed or completion percentage.

### Can we use AI to write our workflow code?
Yes, but you **must disclose it**. If you use ChatGPT, Copilot, or any other AI tool, mention it in your submission reflection. See [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md) for details on attribution.

### What if I have a question that's not here?
Great! Post it in [GitHub Discussions](https://github.com/YOUR_ORG/gh-aw-hackathon/discussions) (async) or ask in Discord (real-time). Coaches and other participants are usually happy to help.

### Can I use libraries or external tools?
It depends on the challenge. Check the challenge README for any constraints. When in doubt, ask your coach.

### What happens after submission?
Coaches review submissions for completeness. Then judges score based on the [rubric](judging-rubric.md). Winners are announced after judging.

### Will my code be public?
Your squad's fork is yours during the hackathon. After the event, solutions may be shared (with permission) to celebrate learning. We'll ask before publishing.

### What if I found a bug in a challenge?
Report it in Discord or GitHub with a `bug` label. Include what you tried, what you expected, and what happened instead. Thanks for helping us improve!

### Can I work alone?
WTH format is squad-based for collaboration and peer support. We'll do our best to place solo participants in a squad, but if that's not possible, we'll work with you.

---

## Squad Etiquette

You're in a team. Here's how to be a great teammate:

- **Show up:** Attend the kickoff and main sessions. Let your squad know if you need to step away.
- **Communicate:** Use your squad's Discord channel or shared doc to sync on progress.
- **Distribute work:** Divide challenges by interest or skill. Don't let one person do everything.
- **Support each other:** If a teammate is stuck, help (or loop in your coach together).
- **Celebrate wins:** When you solve something, acknowledge the whole team.
- **Respect boundaries:** Some teammates may have other commitments; be flexible.

---

## Tips for Success

1. **Read the challenge carefully.** Most questions are answered in the challenge README.
2. **Run the example first.** Understand what a working solution looks like before you build your own.
3. **Commit early and often.** If things break, you can roll back.
4. **Ask questions.** Coaches love helping; that's their job.
5. **Take breaks.** Hackathons are marathons, not sprints. Step outside, stretch, eat.
6. **Have fun.** You're learning something cool with cool people. Enjoy it.

---

## Need Help?

- **Stuck on a challenge?** GitHub Discussions or @ your coach in Discord.
- **Environment problem?** Discord or in-person chat with your coach.
- **Question about rules/submission?** This handbook, timeline.md, or ask a coach.
- **Code of conduct concern?** Talk to any organiser. We take this seriously.

We're looking forward to seeing what you build and what you learn along the way.
