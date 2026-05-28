# Coach Handbook

You're a coach for the gh-aw Hackathon. This handbook prepares you to guide your squad effectively.

---

## What We Expect of Coaches

### Your Core Job: Guide, Don't Solve

You are **not** a solution provider. You are a **guide**.

**Your role:**
- Help your squad understand the problem.
- Ask questions that lead them to answers.
- Unblock environment and technical issues.
- Keep morale up when things get tough.
- Make sure they're learning, not just copying.

**What this looks like:**
- ✅ "Have you read the challenge README? What does it say?"
- ✅ "Walk me through what the error message means."
- ✅ "What did you try? What happened?"
- ✅ "Let's break this into smaller steps. What's the first thing you need?"
- ❌ "Here's the code you need..."
- ❌ "Just run this command and it'll work."
- ❌ "I'll fix it for you."

---

## The Socratic Method: How to Coach Without Solving

Use **Socratic questions** to guide thinking:

### When they say: "I don't know where to start."
**Instead of:** Mapping out steps for them.
**Try:** "What does the challenge ask you to build? What's the first small step?"

### When they say: "This doesn't work."
**Instead of:** Fixing the code.
**Try:** "What does the error say? What does that tell you?"

### When they say: "Is this right?"
**Instead of:** Checking it for them.
**Try:** "How would you test if it's right? What would success look like?"

### When they say: "Everyone else is done already."
**Instead of:** Rushing them or reducing scope.
**Try:** "What have you learned so far? Do you want to try the next challenge?"

### When they say: "I hate this. I'm going to quit."
**Instead of:** Dismissing their feelings.
**Try:** "What part is frustrating? Let's talk through it. We've got time."

**Key principle:** If they struggle and figure it out, they'll remember it forever. If you solve it for them, they'll forget immediately.

---

## When to Escalate

Some situations need more than coaching. **Escalate to an organiser if:**

### Squad in Distress
- A squad member is visibly upset, angry, or considering leaving.
- A squad has completely stalled and can't move forward.
- There's interpersonal conflict within the squad.
- **What to do:** Listen, offer a 10-minute break, then reach out to an organiser for support.

### Code of Conduct Issues
- You see or hear behavior that violates [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).
- Examples: disrespectful language, someone taking credit for others' work, plagiarism, cheating.
- **What to do:** Document what you saw. Talk to the person (if safe). Report to an organiser immediately.

### Technical Environment Failure
- A participant's environment is completely broken and you can't fix it in 10 minutes.
- The challenge itself has a bug or is unclear.
- GitHub is down, Discord is down, etc.
- **What to do:** Have them swap to a different computer if possible. Escalate to the tech team (via Discord or organiser).

### Off-Scope Questions
- A participant asks you something completely outside gh-aw (e.g., "What's the best Python framework?").
- **What to do:** Acknowledge it's a great question, then redirect: "That's outside the hackathon scope, but happy to chat after the event!"

---

## Pre-Event Coach Prep (Do This Before the Hackathon)

### 1. Read All Track Docs
- Read the README in `Coach/` directory for your assigned track.
- Skim all challenge READMEs for your track.
- Understand the progression: what skills build on each other?

### 2. Run Through Challenge 00 Yourself
- **Challenge 00** is the warm-up/setup challenge.
- Run it in your environment exactly as a participant would.
- This helps you:
  - Understand the participant experience.
  - Catch setup issues before they surprise participants.
  - Know what a working solution looks like.

### 3. Set Up Your Environment
- Install `gh-aw` and all prerequisites.
- Clone the hackathon repo.
- Create a test fork (pretend you're a squad).
- Run a test workflow to make sure it works.

### 4. Review the Submission & Judging Process
- Read [submission-guide.md](submission-guide.md).
- Read [judging-rubric.md](judging-rubric.md).
- Know what you're guiding toward (a clear, complete submission + reflection).

### 5. Understand the Code of Conduct
- Read [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).
- Know what behaviors cross the line and when to escalate.

### 6. Get Familiar with Comms
- Join Discord (or Teams — link will be shared).
- Know how to @ mention organisers.
- Know where to file escalation issues.

---

## Day-of Coach Checklist

### Before Kickoff (30 minutes prior)
- [ ] Arrive early.
- [ ] Test your Discord/chat connection.
- [ ] Review your assigned squad names (if you know them).
- [ ] Have notes open: track docs, challenge READMEs, your own test run.

### During Squad Formation (First 30 minutes)
- [ ] Introduce yourself to your squad.
- [ ] Learn their names and GitHub handles.
- [ ] Ask what tracks they're interested in.
- [ ] Explain your role: "I'm here to guide, ask questions, and help you learn."
- [ ] Get contact info (Discord handle, phone if co-located).

### During Challenges (Every hour or so)
- [ ] Check in: "How's it going? Stuck anywhere?"
- [ ] Watch for squads that go quiet (usually means they're stuck but embarrassed to ask).
- [ ] Answer process questions ("Where do I push code?") quickly.
- [ ] Offer Socratic questions when they're stuck on logic.
- [ ] If someone finds a bug, help them report it.

### Monitor Morale
- [ ] Celebrate small wins: "That's awesome! You got past the tricky part."
- [ ] If energy is flagging, suggest a break (food, walk, coffee).
- [ ] Normalize struggles: "This is hard. That means you're learning."

### Before Submission Deadline
- [ ] Remind your squad when the deadline is approaching.
- [ ] Check they know how to submit (PR or issue).
- [ ] Review their submission draft if they ask.
- [ ] Make sure everyone on the squad agrees on what's being submitted.

---

## Judging Participation (If You Also Judge)

Some coaches also participate in judging. If that's you:

### Before Judging Starts
- [ ] Recuse yourself from scoring your own squad (conflict of interest).
- [ ] Review [judging-rubric.md](judging-rubric.md) carefully.
- [ ] Understand the scoring criteria so you're consistent.

### While Judging
- [ ] Score based on the rubric, not personal preference.
- [ ] If you know a squad personally, be extra careful to score fairly.
- [ ] If a squad is yours, let another judge handle it.
- [ ] Leave feedback that's constructive and encouraging.

### If You'd Rather Not Judge
- Talk to an organiser before the event.
- "Coaching only" is a totally valid choice. You're still valuable.
- Focusing purely on coaching helps your squad more anyway.

---

## Common Coaching Scenarios

### Scenario 1: Squad Member Is "Not Technical"
**Situation:** One person feels left behind because they don't code.

**Coaching moves:**
- "Everyone brings something different to the squad. What's your strength?"
- Suggest they focus on reflection, documentation, testing, or demo prep.
- Pair them with a more experienced person for pair programming.
- Normalize the learning curve: "Coding is learnable. Let's break it down."

### Scenario 2: One Person Dominates
**Situation:** One squad member solves everything; others check out.

**Coaching moves:**
- Pull the dominant person aside: "Your squad learns more if everyone codes. Let them try the next one."
- Ask quiet members directly: "What's the next challenge? Want to take it?"
- Suggest role rotation: "Next challenge, you're the navigator, not the driver."

### Scenario 3: Squad Gets Stuck on a Buggy Challenge
**Situation:** They've spent 30 minutes on a challenge that seems impossible.

**Coaching moves:**
- Ask: "Have you reported this as a bug? Let's file an issue."
- Suggest: "Try a different challenge while we fix this one."
- Escalate to the tech team if it's clearly broken.
- Frame it positively: "Good catch. Debugging skills matter."

### Scenario 4: Someone Wants to Use AI to Write Code
**Situation:** "Can I use ChatGPT to write this?" or "Copilot generated this for me."

**Coaching moves:**
- "Yes, but you need to disclose it in your submission reflection."
- "What did ChatGPT generate? Do you understand what it does?"
- "If you don't understand your own code, it might not be a learning win. Pair with someone or ask me."
- Make sure they're learning, not just copy-pasting.

### Scenario 5: Squad Isn't Going to Finish
**Situation:** It's 2 hours before the deadline, and they're on Challenge 1 of 5.

**Coaching moves:**
- "Finish what you have. Judges care about what you did learn, not what you didn't finish."
- "Pick one challenge to focus on. Do it really well."
- "Take a break. You've done great work."
- Help them craft a honest reflection about what they learned.

---

## Pro Tips for Coaches

1. **Be present.** Show up on time. Be in the chat or room. Squads feel supported when they see you.

2. **Celebrate wins.** When someone solves something, acknowledge it. "You figured that out! That's awesome."

3. **Normalize struggle.** "This is hard for everyone. That's how you know you're learning."

4. **Ask before helping.** "Do you want my input, or do you want to keep trying?" Respect their learning process.

5. **Know your limits.** If you don't know something, say so. "I'm not sure. Let's search the docs together."

6. **Take notes.** Jot down what your squad worked on and what they learned. Useful for feedback later.

7. **Be kind.** You're not just a technical mentor. You're a human supporter. Kindness goes a long way.

8. **Don't gatekeep.** If someone wants to try the advanced track, let them. Mistakes are learning.

9. **Check in with quiet people.** The person who hasn't spoken in an hour might need help.

10. **Step back sometimes.** Let your squad figure it out. Your job is to be available, not omnipresent.

---

## Resources

- **Challenge READMEs:** In `Coach/` directory for your track.
- **gh-aw docs:** [Link to gh-aw documentation].
- **Submission guide:** [submission-guide.md](submission-guide.md).
- **Judging rubric:** [judging-rubric.md](judging-rubric.md).
- **Code of conduct:** [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).
- **Timeline:** [timeline.md](timeline.md).
- **Escalation contact:** [Organiser contact info — shared at kickoff].

---

## Questions?

- **About your track?** Read the Coach README. Ask in Discord.
- **About coaching approach?** Chat with other coaches. We're all learning.
- **Need to escalate?** Reach out to an organiser (contact at kickoff).

You've got this. Your squad is lucky to have you. 🚀
