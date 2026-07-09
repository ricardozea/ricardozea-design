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

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applyVars = (el) => {
      const delay = el.dataset.revealDelay ?? '0';
      const stagger = el.dataset.revealStagger ?? '0';
      const index = el.dataset.revealIndex ?? '0';
      el.style.setProperty('--reveal-delay', `${delay}s`);
      el.style.setProperty('--reveal-stagger', `${stagger}s`);
      el.style.setProperty('--reveal-index', index);
    };

    if (elements.length > 0) {
      if (prefersReduced) {
        elements.forEach(applyVars);
        elements.forEach((el) => el.classList.add('is-revealed'));
      } else {
        root.classList.add('reveal-init');
        elements.forEach(applyVars);

        // Hero sections should reveal on load and never hide/replay
        // Use double rAF so first paint uses hidden state, then reveal next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            heroElements.forEach((el) => el.classList.add('is-revealed'));
          });
        });
      }
    }

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

    // Observe dynamically added elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const newRevealElements = Array.from(node.querySelectorAll('.reveal'));
              if (node.classList && node.classList.contains('reveal')) {
                newRevealElements.push(node);
              }

              newRevealElements.forEach((el) => {
                if (!el.classList.contains('is-revealed')) {
                  applyVars(el);

                  if (prefersReduced) {
                    el.classList.add('is-revealed');
                  } else {
                    const isHero = el.closest('[class*="hero"]');
                    if (isHero) {
                      el.classList.add('is-revealed');
                    } else {
                      revealObserver.observe(el);
                    }
                  }
                }
              });
            }
          });
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
