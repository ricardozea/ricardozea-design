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
    const heroElements = elements.filter((el) => el.closest('[class*="hero"]'));
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

    // Hero sections should reveal on load and never hide/replay
    // Use double rAF so first paint uses hidden state, then reveal next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroElements.forEach((el) => el.classList.add('is-revealed'));
      });
    });

    const nonHeroElements = elements.filter((el) => !heroElements.includes(el));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const hasClipNone = el.classList.contains('clip-none');

          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            if (hasClipNone) el.style.clipPath = 'none';
            return;
          }

          if (entry.boundingClientRect.bottom < 0) {
            el.classList.add('is-revealed');
            if (hasClipNone) el.style.clipPath = 'none';
            return;
          }

          if (entry.boundingClientRect.top > (window.innerHeight || 0) + 100) {
            el.classList.remove('is-revealed');
            if (hasClipNone) el.style.clipPath = '';
            return;
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 100px 0px',
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
