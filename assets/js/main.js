/**
 * gh-aw Hackathon — main.js
 * Minimal vanilla JS: theme toggle, mobile nav toggle, smooth scroll anchor offset.
 */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     Theme Toggle
     Persists preference in localStorage. Respects OS preference if no pref saved.
     ----------------------------------------------------------------------- */
  const THEME_KEY = 'gh-aw-theme';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      const moonIcon = themeToggle.querySelector('.theme-toggle__icon--moon');
      const sunIcon  = themeToggle.querySelector('.theme-toggle__icon--sun');
      if (moonIcon) moonIcon.style.display = theme === 'dark'  ? '' : 'none';
      if (sunIcon)  sunIcon.style.display  = theme === 'light' ? '' : 'none';
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  }

  // Apply on load (before paint to avoid flash)
  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  // Follow OS changes only if user hasn't set a preference
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  /* -----------------------------------------------------------------------
     Mobile Nav Toggle
     ----------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const siteNav   = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      const openIcon  = navToggle.querySelector('.nav-toggle__icon--open');
      const closeIcon = navToggle.querySelector('.nav-toggle__icon--close');
      if (openIcon)  openIcon.style.display  = isOpen ? 'none' : '';
      if (closeIcon) closeIcon.style.display = isOpen ? '' : 'none';
    });

    // Close nav when a link is clicked
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        const openIcon  = navToggle.querySelector('.nav-toggle__icon--open');
        const closeIcon = navToggle.querySelector('.nav-toggle__icon--close');
        if (openIcon)  openIcon.style.display = '';
        if (closeIcon) closeIcon.style.display = 'none';
      });
    });

    // Close nav on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* -----------------------------------------------------------------------
     Smooth Scroll with Header Offset
     Ensures anchor links account for the sticky header height.
     ----------------------------------------------------------------------- */
  const HEADER_HEIGHT = 64;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 16;
      window.scrollTo({ top, behavior: 'smooth' });

      // Update URL without jump
      history.pushState(null, '', '#' + targetId);
    });
  });

})();
