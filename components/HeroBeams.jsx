"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Global controls: tweak via CSS variables (see styles file) without touching code.
const DEFAULT_CONTROLS = {
  offsetX: -5,
  durations: [14, 12, 16, 10, 18, 13, 20],
  delays: [0, 0.8, 1.6, 2.2, 1.1, 2.8, 3.4],
  speedMultiplier: 1,
  segmentFactor: 0.12,
  segmentMin: 140,
  segmentMax: 360,
  gapFactor: 1.6,
  opacityCore: 0.5,
  opacityGlow: 0.35,
  strokeCore: 1,
  strokeGlow: 10,
  blurGlow: 10,
};

const BASE_DURATIONS = DEFAULT_CONTROLS.durations;
const BASE_DELAYS = DEFAULT_CONTROLS.delays;

const VAR_MAP = {
  offsetX: "--hero-beams-offset-x",
  speedMultiplier: "--hero-beams-speed-multiplier",
  segmentFactor: "--hero-beams-segment-factor",
  segmentMin: "--hero-beams-segment-min",
  segmentMax: "--hero-beams-segment-max",
  gapFactor: "--hero-beams-gap-factor",
  opacityCore: "--hero-beams-opacity-core",
  opacityGlow: "--hero-beams-opacity-glow",
  strokeCore: "--hero-beams-stroke-core",
  strokeGlow: "--hero-beams-stroke-glow",
  blurGlow: "--hero-beams-blur-glow",
};

function readNumberVar(styles, name, fallback) {
  const raw = styles.getPropertyValue(name);
  if (!raw) return fallback;
  const val = parseFloat(raw);
  return Number.isFinite(val) ? val : fallback;
}

function readControlsFromCss() {
  if (typeof window === "undefined") return DEFAULT_CONTROLS;
  const styles = getComputedStyle(document.documentElement);
  return {
    ...DEFAULT_CONTROLS,
    offsetX: readNumberVar(styles, VAR_MAP.offsetX, DEFAULT_CONTROLS.offsetX),
    speedMultiplier: readNumberVar(styles, VAR_MAP.speedMultiplier, DEFAULT_CONTROLS.speedMultiplier),
    segmentFactor: readNumberVar(styles, VAR_MAP.segmentFactor, DEFAULT_CONTROLS.segmentFactor),
    segmentMin: readNumberVar(styles, VAR_MAP.segmentMin, DEFAULT_CONTROLS.segmentMin),
    segmentMax: readNumberVar(styles, VAR_MAP.segmentMax, DEFAULT_CONTROLS.segmentMax),
    gapFactor: readNumberVar(styles, VAR_MAP.gapFactor, DEFAULT_CONTROLS.gapFactor),
    opacityCore: readNumberVar(styles, VAR_MAP.opacityCore, DEFAULT_CONTROLS.opacityCore),
    opacityGlow: readNumberVar(styles, VAR_MAP.opacityGlow, DEFAULT_CONTROLS.opacityGlow),
    strokeCore: readNumberVar(styles, VAR_MAP.strokeCore, DEFAULT_CONTROLS.strokeCore),
    strokeGlow: readNumberVar(styles, VAR_MAP.strokeGlow, DEFAULT_CONTROLS.strokeGlow),
    blurGlow: readNumberVar(styles, VAR_MAP.blurGlow, DEFAULT_CONTROLS.blurGlow),
  };
}

function useControls() {
  const [controls, setControls] = useState(DEFAULT_CONTROLS);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const apply = () => {
      const next = readControlsFromCss();
      setControls((prev) => {
        const same = JSON.stringify(prev) === JSON.stringify(next);
        return same ? prev : next;
      });
    };

    apply();
    const id = setInterval(apply, 800);
    return () => clearInterval(id);
  }, []);

  return controls;
}

export default function HeroBeams() {
  const [paths, setPaths] = useState([]);
  const [pathLengths, setPathLengths] = useState([]);
  const [pathGradientPoints, setPathGradientPoints] = useState([]);
  const pathRefs = useRef([]);
  const controls = useControls();

  // Fetch SVG paths from the public file so we don't duplicate long path data in code.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(`/images/outline-pc.svg?ts=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const text = await res.text();
        if (cancelled) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const pathNodes = Array.from(doc.querySelectorAll("path"));
        const dValues = pathNodes.map((p) => p.getAttribute("d")).filter(Boolean);
        setPaths(dValues);
      } catch (err) {
        // Silent fail – beams are decorative only.
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Measure path lengths once rendered.
  useLayoutEffect(() => {
    if (!paths.length) return;
    const lengths = [];
    const gradientPoints = [];

    pathRefs.current.slice(0, paths.length).forEach((p) => {
      if (!p) {
        lengths.push(0);
        gradientPoints.push({ x1: 0, y1: 0, x2: 1, y2: 0 });
        return;
      }

      try {
        const length = p.getTotalLength();
        const box = p.getBBox();
        const isWider = box.width >= box.height;
        const paddingX = Math.max(box.width * 0.08, 1);
        const paddingY = Math.max(box.height * 0.08, 1);

        lengths.push(length);
        gradientPoints.push({
          x1: isWider ? box.x - paddingX : box.x + (box.width / 2),
          y1: isWider ? box.y + (box.height / 2) : box.y - paddingY,
          x2: isWider ? box.x + box.width + paddingX : box.x + (box.width / 2),
          y2: isWider ? box.y + (box.height / 2) : box.y + box.height + paddingY,
        });
      } catch (e) {
        lengths.push(0);
        gradientPoints.push({ x1: 0, y1: 0, x2: 1, y2: 0 });
      }
    });

    setPathLengths(lengths);
    setPathGradientPoints(gradientPoints);
  }, [paths]);

  // Respect reduced motion.
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;
  if (!paths.length) return null;

  return (
    <svg
      className="hero-beams"
      viewBox="0 0 2980 2000"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      style={{ transform: `translateX(${controls.offsetX}px)` }}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        {paths.map((_, idx) => {
          const points = pathGradientPoints[idx] || { x1: 0, y1: 0, x2: 1, y2: 0 };
          return (
            <linearGradient
              key={`beam-gradient-core-${idx}`}
              id={`beam-gradient-core-${idx}`}
              gradientUnits="userSpaceOnUse"
              x1={points.x1}
              y1={points.y1}
              x2={points.x2}
              y2={points.y2}
            >
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="22%" stopColor="white" stopOpacity="0.18" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="78%" stopColor="white" stopOpacity="0.18" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          );
        })}
        {paths.map((_, idx) => {
          const points = pathGradientPoints[idx] || { x1: 0, y1: 0, x2: 1, y2: 0 };
          return (
            <linearGradient
              key={`beam-gradient-glow-${idx}`}
              id={`beam-gradient-glow-${idx}`}
              gradientUnits="userSpaceOnUse"
              x1={points.x1}
              y1={points.y1}
              x2={points.x2}
              y2={points.y2}
            >
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="18%" stopColor="white" stopOpacity="0.08" />
              <stop offset="50%" stopColor="white" stopOpacity="0.5" />
              <stop offset="82%" stopColor="white" stopOpacity="0.08" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          );
        })}
      </defs>
      {paths.map((d, idx) => {
        const len = pathLengths[idx] || 1000;
        const duration = `${BASE_DURATIONS[idx % BASE_DURATIONS.length] * controls.speedMultiplier}s`;
        const delay = `${BASE_DELAYS[idx % BASE_DELAYS.length]}s`;
        const segment = Math.min(controls.segmentMax, Math.max(controls.segmentMin, len * controls.segmentFactor));
        const gap = len * controls.gapFactor; // keep dash period > path length so only one segment shows
        return (
          <g key={idx}>
            <path
              ref={(el) => {
                pathRefs.current[idx] = el;
              }}
              d={d}
              className="beam-path beam-glow"
              style={{
                "--path-len": `${len}px`,
                "--beam-duration": duration,
                "--beam-delay": delay,
                "--dash-array": `${segment}px ${gap}px`,
                "--beam-opacity": controls.opacityGlow,
                "--beam-stroke": controls.strokeGlow,
                "--beam-blur": controls.blurGlow,
                stroke: `url(#beam-gradient-glow-${idx})`,
              }}
            />
            <path
              d={d}
              className="beam-path"
              style={{
                "--path-len": `${len}px`,
                "--beam-duration": duration,
                "--beam-delay": delay,
                "--dash-array": `${segment}px ${gap}px`,
                "--beam-opacity": controls.opacityCore,
                "--beam-stroke": controls.strokeCore,
                stroke: `url(#beam-gradient-core-${idx})`,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
