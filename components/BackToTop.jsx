'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { Tooltip } from './Tooltip';

const SCROLL_OFFSET = 240; // distance before showing the button

export default function BackToTop() {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const updateRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    const style = getComputedStyle(document.documentElement);
    const colorSubtle = style.getPropertyValue('--border-bold').trim();
    const colorBlue = style.getPropertyValue('--border-accent-blue').trim();
    const colorGreen = style.getPropertyValue('--border-accent-green').trim();

    const hexToRgb = (hex) => {
      const sanitized = hex.replace('#', '');
      if (sanitized.length !== 6) return { r: 255, g: 255, b: 255 };
      const intVal = parseInt(sanitized, 16);
      return {
        r: (intVal >> 16) & 255,
        g: (intVal >> 8) & 255,
        b: intVal & 255,
      };
    };

    const mix = (a, b, t) => Math.round(a + (b - a) * t);

    const lerpColor = (fromHex, toHex, t) => {
      const from = hexToRgb(fromHex);
      const to = hexToRgb(toHex);
      return `rgb(${mix(from.r, to.r, t)}, ${mix(from.g, to.g, t)}, ${mix(from.b, to.b, t)})`;
    };

    const pathLength = path.getTotalLength();
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength;
    requestAnimationFrame(() => {
      path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    });

    let cachedHeight = 0;
    let lastActive = false;
    let ticking = false;
    let frameId = null;

    const updateHeight = () => {
      cachedHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    const update = () => {
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const progress = cachedHeight > 0 ? pathLength - (scroll * pathLength) / cachedHeight : pathLength;
      const pct = cachedHeight > 0 ? Math.min(Math.max(scroll / cachedHeight, 0), 1) : 0;

      if (pct <= 0.5) {
        const t = pct / 0.5;
        path.style.stroke = lerpColor(colorSubtle, colorBlue, t);
      } else {
        const t = (pct - 0.5) / 0.5;
        path.style.stroke = lerpColor(colorBlue, colorGreen, t);
      }
      path.style.strokeDashoffset = progress;
      const isActive = scroll > SCROLL_OFFSET;
      if (isActive !== lastActive) {
        lastActive = isActive;
        if (isActive) {
          wrap.classList.add('active-progress');
          setIsActive(true);
        } else {
          wrap.classList.remove('active-progress');
          setIsActive(false);
        }
      }
    };

    const scheduleUpdate = () => {
      if (ticking) return;
      ticking = true;
      frameId = window.requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    updateHeight();
    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', updateHeight, { passive: true });
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', updateHeight);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    window.__scrollingToTop = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.__scrollingToTop = false;
    }, 1000);
  };

  return (
    <div className="backtotop-tooltip">
      <Tooltip position="top">
        <span>Back to top yo!</span>
        <a
          href="#"
          id="progress-wrap"
          ref={wrapRef}
          aria-label="Back to top"
          onClick={handleClick}
          tabIndex={isActive ? 0 : -1}
          aria-hidden={isActive ? "false" : "true"}
        >
          <svg className="progress-circle" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path className="progress-bg" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
            <path ref={pathRef} className="progress-fg" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
          </svg>
          <ArrowUp size={22} weight="bold" className="progress-arrow" aria-hidden="true" />
        </a>
      </Tooltip>
    </div>
  );
}
