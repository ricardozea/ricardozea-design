"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Image from "next/image";

/**
 * 🛠️ CONFIGURATION SETTINGS
 */
const SETTINGS = {
  particleResolution: 800,
  particleSize: 0.12,
  transitionFrequency: 10.0,   // Total cycle time in seconds
  morphDuration: 3,         // Duration to disperse/converge
  explosionStrength: 50.0,    // How far particles fly
  dpr: [1, 1.5],
  stylesCount: 10,
};

const STYLE_NAMES = [
  "Horizontal Slide",
  "Vertical Cascade",
  "Radial Bloom",
  "Spiral Unwind",
  "Grid Shift",
  "Wave Ripple",
  "Diagonal Wipe",
  "Pinwheel Rotate",
  "Scale Zoom",
  "Row Shuffle"
];

// ─── Vertex Shader ───────────────────────────────────────────────────────────
const vertexShader = `
    uniform vec2 uResolution;
    uniform sampler2D uPictureTexture;
    uniform sampler2D uNextTexture;
    uniform float uMixFactor;
    uniform float uParticleSize;
    uniform float uTime;
    uniform float uProgress;
    uniform int uStyle;

    varying vec3 vColor;
    varying vec2 vUv;
    varying vec3 vPosition;

    vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

    float simplexNoise3d(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1. + 3.0 * C.xxx;

        i = mod(i, 289.0 );
        vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 1.0/7.0;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
        vUv = uv;

        float multiplier = ${SETTINGS.explosionStrength.toFixed(1)};
        vec3 positionTarget;

        if (uStyle == 0) { // Horizontal Slide — uniform left slide
            positionTarget = position + vec3(-multiplier, 0.0, 0.0);

        } else if (uStyle == 1) { // Vertical Cascade — columns fall with stagger
            float colStagger = position.x * 0.15;
            positionTarget = position + vec3(0.0, -multiplier + colStagger, 0.0);

        } else if (uStyle == 2) { // Radial Bloom — concentric ring expansion
            float dist = length(position.xy);
            vec2 dir = dist > 0.001 ? normalize(position.xy) : vec2(0.0);
            positionTarget = vec3(dir * multiplier, position.z);

        } else if (uStyle == 3) { // Spiral Unwind — clean spiral path
            float dist = length(position.xy);
            float angle = dist * 1.5;
            float c = cos(angle);
            float s = sin(angle);
            positionTarget = vec3(
                c * position.x - s * position.y,
                s * position.x + c * position.y,
                position.z
            ) * (1.0 + multiplier * 0.08);

        } else if (uStyle == 4) { // Grid Shift — odd cols up, even cols down
            float colIndex = floor((position.x + 5.0) * 80.0);
            float direction = mod(colIndex, 2.0) > 0.5 ? 1.0 : -1.0;
            positionTarget = position + vec3(0.0, direction * multiplier, 0.0);

        } else if (uStyle == 5) { // Wave Ripple — sine wave horizontal sweep
            float wave = sin(position.x * 1.5) * multiplier * 0.4;
            positionTarget = position + vec3(0.0, wave, 0.0);

        } else if (uStyle == 6) { // Diagonal Wipe — 45° sweep
            float diagonal = (position.x + position.y) * 0.5;
            positionTarget = position + vec3(diagonal, diagonal, 0.0) * (multiplier * 0.08);

        } else if (uStyle == 7) { // Pinwheel Rotate — flat 2D rotation + centrifugal
            float dist = length(position.xy);
            float angle = 3.14159 * 0.5;
            float c = cos(angle);
            float s = sin(angle);
            positionTarget = vec3(
                c * position.x - s * position.y,
                s * position.x + c * position.y,
                position.z
            ) * (1.0 + dist * 0.3);

        } else if (uStyle == 8) { // Scale Zoom — uniform expansion from center
            positionTarget = position * (1.0 + multiplier * 0.15);

        } else { // Row Shuffle — odd rows left, even rows right
            float rowIndex = floor((position.y + 5.0) * 80.0);
            float direction = mod(rowIndex, 2.0) > 0.5 ? 1.0 : -1.0;
            positionTarget = position + vec3(direction * multiplier, 0.0, 0.0);
        }

        // Smooth stagger based on position (not noise)
        float noiseOrigin = simplexNoise3d( positionTarget );
        float noiseTarget = simplexNoise3d( position );
        float noiseVal = mix(noiseOrigin, noiseTarget, uProgress);

        float duration = 0.6;
        float delay = (1.0 - duration) * noiseVal;
        float end = delay + duration;
        float progress = smoothstep(delay, end, uProgress);

        vec3 mixedPosition = mix(positionTarget, position, progress);
        vPosition = mixedPosition;

        vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        // Dual-texture crossfade: smoothly blend colors between images
        vec4 texA = texture(uPictureTexture, uv);
        vec4 texB = texture(uNextTexture, uv);
        vec4 texColor = mix(texA, texB, uMixFactor);
        float intensity = (texColor.r + texColor.g + texColor.b) / 3.0;

        gl_PointSize = uParticleSize * (intensity + 0.2) * uResolution.y;
        gl_PointSize *= (1.0 / - viewPosition.z);

        vColor = texColor.rgb;
    }
`;

// ─── Fragment Shader ─────────────────────────────────────────────────────────
const fragmentShader = `
    varying vec3 vColor;
    varying vec3 vPosition;

    void main() {
        vec2 uv = gl_PointCoord;
        if(distance(uv, vec2(0.5)) > 0.5) discard;

        float alphaX = 1.0 - smoothstep(0.0, 25., abs(vPosition.x));
        float alphaY = 1.0 - smoothstep(0.0, 15., abs(vPosition.y));
        float alpha = clamp(alphaX * alphaY, 0.0, 1.0);

        gl_FragColor = vec4(vColor, alpha);
        #include <colorspace_fragment>
    }
`;

// ─── Particles Component ─────────────────────────────────────────────────────
const Particles = ({ images, isPaused, onStyleChange }) => {
  const pointsRef = useRef();
  const materialRef = useRef();
  const { size, viewport } = useThree();
  const texturesRef = useRef([]);
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  // Geometry
  const geometry = useMemo(() => {
    const res = SETTINGS.particleResolution;
    const geo = new THREE.PlaneGeometry(10, 10, res, res);
    geo.deleteAttribute('normal');
    return geo;
  }, []);

  // Material — imperative creation so React reconciler never destroys it
  useEffect(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uPictureTexture: { value: null },
        uNextTexture: { value: null },
        uMixFactor: { value: 0.0 },
        uParticleSize: { value: SETTINGS.particleSize },
        uProgress: { value: 1.0 },
        uTime: { value: 0 },
        uStyle: { value: 0 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    materialRef.current = mat;

    if (pointsRef.current) {
      pointsRef.current.material = mat;
    }

    return () => mat.dispose();
  }, []);

  // Engine State
  const engineRef = useRef({
    currentIndex: 0,
    styleIndex: 0,
    lastCycleId: -1,
    accumulatedTime: 0,
  });

  // Texture loading
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let loadedItems = 0;
    const temp = [];
    images.forEach((img, i) => {
      loader.load(img.src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        temp[i] = tex;
        loadedItems++;
        if (loadedItems === images.length) {
          texturesRef.current = temp;
          // Initialize both texture slots
          if (materialRef.current) {
            materialRef.current.uniforms.uPictureTexture.value = temp[0];
            materialRef.current.uniforms.uNextTexture.value = temp[1 % temp.length];
          }
          setTexturesLoaded(true);
        }
      });
    });
    return () => temp.forEach(t => t.dispose());
  }, [images]);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat || !texturesLoaded) return;

    const absoluteTime = state.clock.getElapsedTime();
    mat.uniforms.uTime.value = absoluteTime;

    const dpr = viewport.initialDpr || 1;
    mat.uniforms.uResolution.value.set(size.width * dpr, size.height * dpr);

    // Advance transition clock
    engineRef.current.accumulatedTime += Math.min(delta, 0.1);
    const time = engineRef.current.accumulatedTime;

    const cycle = SETTINGS.transitionFrequency;
    const morph = SETTINGS.morphDuration;
    const wait = Math.max(0.1, cycle - (morph * 2));

    const localTime = time % cycle;
    const currentCycleId = Math.floor(time / cycle);

    // At cycle boundary: commit previous transition, then prepare next one
    if (engineRef.current.lastCycleId !== currentCycleId) {
      engineRef.current.lastCycleId = currentCycleId;

      // STEP 1: Commit the previous crossfade — "current" becomes what we were blending towards
      if (currentCycleId > 0) {
        const commitIdx = (engineRef.current.currentIndex + 1) % texturesRef.current.length;
        engineRef.current.currentIndex = commitIdx;
        mat.uniforms.uPictureTexture.value = texturesRef.current[commitIdx];
      }

      // STEP 2: Prepare the NEXT crossfade target
      const nextIdx = (engineRef.current.currentIndex + 1) % texturesRef.current.length;
      mat.uniforms.uNextTexture.value = texturesRef.current[nextIdx];

      // STEP 3: Advance style
      const nextStyle = (engineRef.current.styleIndex + 1) % SETTINGS.stylesCount;
      engineRef.current.styleIndex = nextStyle;
      mat.uniforms.uStyle.value = nextStyle;
      onStyleChange(nextStyle);
    }

    if (localTime < wait) {
      // STILL PHASE — showing current image only
      mat.uniforms.uProgress.value = 1.0;
      mat.uniforms.uMixFactor.value = 0.0;

    } else if (localTime < wait + morph) {
      // DISPERSING PHASE — particles scatter, colors crossfade 0→1
      const p = (localTime - wait) / morph;
      mat.uniforms.uProgress.value = 1.0 - p;
      mat.uniforms.uMixFactor.value = p;

    } else {
      // CONVERGING PHASE — particles reform showing next image
      const p = (localTime - (wait + morph)) / morph;
      mat.uniforms.uProgress.value = p;
      mat.uniforms.uMixFactor.value = 1.0;
    }

  });

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <points ref={pointsRef} geometry={geometry} />
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
function AboutImageTransitionTolexiaInner({ className = "" }) {
  const [inView, setInView] = useState(true);
  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const [contextLost, setContextLost] = useState(false);

  const images = useMemo(() => [
    { src: "/images/image-ricardo-zea-illustration.png", alt: "Ricardo Zea Illustration" },
    { src: "/images/image-ricardo-zea-real.png", alt: "Ricardo Zea Real" },
  ], []);

  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mqlDesktop = window.matchMedia("(min-width: 768px)");
    const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsDesktop(mqlDesktop.matches);
    setPrefersReducedMotion(mqlMotion.matches);
    const listenerDesktop = (e) => setIsDesktop(e.matches);
    const listenerMotion = (e) => setPrefersReducedMotion(e.matches);
    mqlDesktop.addEventListener("change", listenerDesktop);
    mqlMotion.addEventListener("change", listenerMotion);
    return () => {
      mqlDesktop.removeEventListener("change", listenerDesktop);
      mqlMotion.removeEventListener("change", listenerMotion);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, {
      threshold: 0,
      rootMargin: "600px"
    });

    if (containerRef.current) observer.observe(containerRef.current);

    const syncVisibility = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const visible = rect.bottom > -200 && rect.top < window.innerHeight + 200;
      setInView(visible);
    };

    window.addEventListener('scroll', syncVisibility, { passive: true });
    window.addEventListener('resize', syncVisibility);
    syncVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', syncVisibility);
      window.removeEventListener('resize', syncVisibility);
    };
  }, []);

  const handleStyleChange = useCallback((index) => {
    if (labelRef.current) {
      labelRef.current.innerText = STYLE_NAMES[index];
    }
  }, []);

  const handleContextLost = useCallback((e) => { e.preventDefault(); setContextLost(true); }, []);
  const handleContextRestored = useCallback(() => setContextLost(false), []);

  const shouldShowParticles = isDesktop && !prefersReducedMotion && !contextLost;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}
    >
      {/* Base Image (Fallback/Static) */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: (shouldShowParticles && inView) ? 0 : 1,
        transition: "opacity 1.0s ease-in-out",
        zIndex: 1,
        pointerEvents: "none"
      }}>
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          sizes="(max-width: 767px) 100vw, 600px"
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>

      {/* Canvas Layer */}
      {isDesktop && !prefersReducedMotion && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            opacity: !contextLost ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "auto"
          }}
        >
          <Canvas
            frameloop="always"
            dpr={SETTINGS.dpr}
            gl={{
              antialias: false,
              powerPreference: "high-performance",
              alpha: true
            }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener("webglcontextlost", handleContextLost, false);
              gl.domElement.addEventListener("webglcontextrestored", handleContextRestored, false);
            }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={35} />
            <Particles images={images} isPaused={false} onStyleChange={handleStyleChange} />
          </Canvas>
        </div>
      )}

      {/* Label Overlay */}
      <div style={{
        position: "absolute",
        bottom: "30px",
        right: "30px",
        backgroundColor: "rgba(0,0,0,0.85)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "40px",
        fontSize: "12px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        fontFamily: "var(--font-outfit), sans-serif",
        border: "2px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(16px)",
        zIndex: 100,
        pointerEvents: "none",
        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        display: shouldShowParticles ? "flex" : "none",
        alignItems: "center",
        gap: "10px"
      }}>
        <span style={{ opacity: 0.5 }}>Effect:</span>
        <span ref={labelRef}>Horizontal Slide</span>
      </div>
    </div>
  );
}

// React.memo prevents re-renders from ThemeProvider context changes.
const AboutImageTransitionTolexia = React.memo(AboutImageTransitionTolexiaInner);
export default AboutImageTransitionTolexia;
