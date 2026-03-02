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

    let ticking = false;

    const evalVisibility = () => {
      const viewportH = window.innerHeight || 0;
      const bottomTrigger = 100; // reveal/re-reveal when within 100px of bottom
      const revealThreshold = Math.max(0, viewportH - bottomTrigger);
      const hideThreshold = viewportH + bottomTrigger;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const hasClipNone = el.classList.contains('clip-none');

        // Hero elements: keep revealed and skip state changes
        if (heroElements.includes(el)) {
          el.classList.add('is-revealed');
          if (hasClipNone) el.style.clipPath = 'none';
          return;
        }

        if (rect.bottom < 0) {
          // Above viewport: stay revealed
          el.classList.add('is-revealed');
          if (hasClipNone) el.style.clipPath = 'none';
          return;
        }

        if (rect.top > hideThreshold) {
          // Fully below past the buffer: hide until it approaches again
          el.classList.remove('is-revealed');
          if (hasClipNone) el.style.clipPath = '';
          return;
        }

        if (rect.top <= revealThreshold) {
          // At or near viewport (within 100px of bottom) or inside it: reveal
          el.classList.add('is-revealed');
          if (hasClipNone) el.style.clipPath = 'none';
          return;
        }
        // Otherwise (far below but within buffer), hide explicitly
        el.classList.remove('is-revealed');
        if (hasClipNone) el.style.clipPath = '';
      });
    };

    const requestEval = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        evalVisibility();
        ticking = false;
      });
    };

    // Initial evaluation
    evalVisibility();

    window.addEventListener('scroll', requestEval, { passive: true });
    window.addEventListener('resize', requestEval, { passive: true });
    window.addEventListener('orientationchange', requestEval, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestEval);
      window.removeEventListener('resize', requestEval);
      window.removeEventListener('orientationchange', requestEval);
    };
  }, []);

  return null;
}
