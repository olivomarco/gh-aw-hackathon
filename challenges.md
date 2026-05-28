---
layout: default
title: Challenges
description: "All hackathon challenges across three tracks — AI Workflows, Safe Outputs, and MCP Integration."
permalink: /challenges/
---

<div class="container challenges-index">
  <header class="challenges-index__header">
    <h1 class="challenges-index__title">Challenges</h1>
    <p class="challenges-index__subtitle">
      Three tracks, progressive difficulty. Start with Challenge 00 to set up your environment, 
      then pick the track that interests you most.
    </p>
  </header>

  {% assign tracks = site.tracks | sort: 'order' %}
  {% for track in tracks %}
  <section class="track-section" id="{{ track.track_id }}">
    <div class="track-section__header">
      <a href="{{ track.url | relative_url }}" class="track-section__title-link">
        <h2 class="track-section__title">{{ track.title }}</h2>
      </a>
      <span class="badge badge--track badge--track-{{ track.track_id }}">{{ track.badge }}</span>
    </div>
    {% if track.description %}
    <p class="track-section__desc">{{ track.description }}</p>
    {% endif %}

    {% assign track_challenges = site.challenges | where: "track", track.track_id | sort: "order" %}
    {% if track_challenges.size > 0 %}
    <div class="challenge-grid">
      {% for challenge in track_challenges %}
        {% include challenge-card.html challenge=challenge %}
      {% endfor %}
    </div>
    {% else %}
    <div class="empty-state">
      <p class="empty-state__icon">🚧</p>
      <p class="empty-state__text">Challenges for this track are being authored — check back soon.</p>
    </div>
    {% endif %}
  </section>
  {% endfor %}

  {% comment %}Show challenges not assigned to a track{% endcomment %}
  {% assign untracked = site.challenges | where_exp: "c", "c.track == blank" | sort: "order" %}
  {% if untracked.size > 0 %}
  <section class="track-section" id="getting-started">
    <div class="track-section__header">
      <h2 class="track-section__title">Getting Started</h2>
    </div>
    <div class="challenge-grid">
      {% for challenge in untracked %}
        {% include challenge-card.html challenge=challenge %}
      {% endfor %}
    </div>
  </section>
  {% endif %}

</div>

<style>
.track-section { margin-bottom: 4rem; }
.track-section__header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
.track-section__title-link { text-decoration: none; }
.track-section__title-link:hover { text-decoration: none; }
.track-section__title { font-size: 1.375rem; font-weight: 700; color: var(--text); }
.track-section__title-link:hover .track-section__title { color: var(--accent-text); }
.track-section__desc { color: var(--text-muted); font-size: 0.9375rem; max-width: 680px; margin-bottom: 1.5rem; line-height: 1.6; }
</style>
