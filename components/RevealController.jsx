'use client';

import { useLayoutEffect } from 'react';

/**
 * Class-based reveal controller. Adds html.reveal-init and toggles `.is-revealed`
 * on elements with `.reveal*` classes based on viewport visibility.
 */
export default function RevealController() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (!elements.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applyVars = (el) => {
      const delay = el.dataset.revealDelay ?? '0';
      const stagger = el.dataset.revealStagger ?? '0';
      const index = el.dataset.revealIndex ?? '0';
      el.style.setProperty('--reveal-delay', `${delay}s`);
      el.style.setProperty('--reveal-stagger', `${stagger}s`);
      el.style.setProperty('--reveal-index', index);
    };

    elements.forEach(applyVars);

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    root.classList.add('reveal-init');

    const heroElements = [];
    const nonHeroElements = [];

    elements.forEach((el) => {
      if (el.closest('[class*="hero"]')) {
        heroElements.push(el);
        return;
      }

      nonHeroElements.push(el);
    });

    // Hero sections should reveal on load and never hide/replay
    // Use double rAF so first paint uses hidden state, then reveal next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroElements.forEach((el) => el.classList.add('is-revealed'));
      });
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const el = entry.target;
          const hasClipNone = el.classList.contains('clip-none');

          el.classList.add('is-revealed');
          if (hasClipNone) el.style.clipPath = 'none';
          revealObserver.unobserve(el);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 120px 0px',
        threshold: 0,
      }
    );

    nonHeroElements.forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
