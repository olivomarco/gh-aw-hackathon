---
layout: default
title: Home
---

{% include hero.html %}

<section class="section" id="tracks">
  <div class="container">
    <h2 class="section__title">What you'll build</h2>
    <p class="section__subtitle">Three tracks take you from zero to production-grade AI workflow patterns.</p>

    <div class="tracks-grid">
      <a href="{{ '/tracks/ai-workflows' | relative_url }}" class="track-card track-card--purple">
        <div class="track-card__number">01</div>
        <div class="track-card__badge">Track 1</div>
        <h3 class="track-card__title">Hello, Agent</h3>
        <p class="track-card__desc">
          First steps with agentic workflows: cron schedules, safe outputs, and basic triggers.
          Write your first AI-powered workflow and feel the build-run-iterate loop.
        </p>
        <div class="track-card__challenges">
          <span class="track-card__count">4 challenges</span>
          <span class="track-card__difficulty">🟢 Beginner</span>
        </div>
        <span class="track-card__cta">Explore track →</span>
      </a>

      <a href="{{ '/tracks/safe-outputs' | relative_url }}" class="track-card track-card--green">
        <div class="track-card__number">02</div>
        <div class="track-card__badge">Track 2</div>
        <h3 class="track-card__title">Repo Concierge</h3>
        <p class="track-card__desc">
          Event-driven automation: issue triage, PR review, and slash commands.
          Build workflows that respond intelligently to repository activity.
        </p>
        <div class="track-card__challenges">
          <span class="track-card__count">5 challenges</span>
          <span class="track-card__difficulty">🟡 Intermediate</span>
        </div>
        <span class="track-card__cta">Explore track →</span>
      </a>

      <a href="{{ '/tracks/mcp-integration' | relative_url }}" class="track-card track-card--blue">
        <div class="track-card__number">03</div>
        <div class="track-card__badge">Track 3</div>
        <h3 class="track-card__title">Continuous Intelligence</h3>
        <p class="track-card__desc">
          Multi-workflow coordination, MCP tools, and custom engines.
          The hardest challenges — for participants who want to push the limits.
        </p>
        <div class="track-card__challenges">
          <span class="track-card__count">5 challenges</span>
          <span class="track-card__difficulty">🔴 Advanced</span>
        </div>
        <span class="track-card__cta">Explore track →</span>
      </a>
    </div>
  </div>
</section>

<section class="section section--alt" id="how-it-works">
  <div class="container">
    <h2 class="section__title">How it works</h2>
    <p class="section__subtitle">The What The Hack format — coach-guided, challenge-based, hands-on from minute one.</p>

    <div class="steps-grid">
      <div class="step">
        <div class="step__number">01</div>
        <h3 class="step__title">Set up your environment</h3>
        <p class="step__desc">
          Open in GitHub Codespaces or VS Code Dev Container. Everything you need — 
          <code>gh-aw</code>, Node, Python, Go — is pre-installed.
        </p>
      </div>
      <div class="step">
        <div class="step__number">02</div>
        <h3 class="step__title">Pick a challenge</h3>
        <p class="step__desc">
          Each challenge has a student guide with objectives, hints, and success criteria. 
          No step-by-step walkthroughs — you'll figure it out.
        </p>
      </div>
      <div class="step">
        <div class="step__number">03</div>
        <h3 class="step__title">Build & iterate</h3>
        <p class="step__desc">
          Write workflows, run them, break them, fix them. Coaches are here to 
          unblock — not to hand you the answer.
        </p>
      </div>
      <div class="step">
        <div class="step__number">04</div>
        <h3 class="step__title">Share what you built</h3>
        <p class="step__desc">
          Submit your solution, share learnings with the group, and see what others 
          built across all three tracks.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="start">
  <div class="container">
    <div class="cta-block">
      <h2 class="cta-block__title">Ready to build?</h2>
      <p class="cta-block__desc">
        Start with Challenge 00 to set up your environment, then dive into any track that interests you.
      </p>
      <div class="cta-block__actions">
        <a href="{{ '/docs/getting-started/devcontainer-setup' | relative_url }}" class="btn btn--primary btn--lg">
          Challenge 00 — Setup
        </a>
        <a href="{{ '/challenges' | relative_url }}" class="btn btn--ghost btn--lg">
          All challenges
        </a>
      </div>
    </div>
  </div>
</section>
