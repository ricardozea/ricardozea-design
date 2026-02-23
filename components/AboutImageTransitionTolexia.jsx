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
  transitionFrequency: 5.0,   // Total cycle time in seconds
  morphDuration: 1,         // Duration to disperse/converge
  explosionStrength: 50.0,    // How far particles fly
  dpr: [1, 1.5],
  stylesCount: 5,
};

const STYLE_NAMES = [
  "Linked Swarm Pull",
  "Elastic Web Drift",
  "Spark Constellation",
  "Ripple Bloom",
  "Grid Jitter"
];

const lineVertexShader = `
    uniform vec2 uResolution;
    uniform sampler2D uPictureTexture;
    uniform sampler2D uNextTexture;
    uniform float uMixFactor;
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

        if (uStyle == 0) {
            float seed = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
            vec2 dir2 = normalize(vec2(
                cos(uTime * 0.6 + seed * 6.28318),
                sin(uTime * 0.6 + seed * 6.28318)
            ));

            float sweepKey = clamp(vUv.x, 0.0, 1.0);
            float pull = multiplier * (0.22 + sweepKey * 0.95);
            float zKick = (seed - 0.5) * multiplier * 0.44;

            vec3 p = position;
            float swirl = 0.8 + 0.2 * sin(uTime + seed * 6.28318);
            positionTarget = p + vec3(dir2 * pull * swirl, zKick);

        } else if (uStyle == 1) {
            float seed = fract(sin(dot(vUv, vec2(21.9898, 18.233))) * 43758.5453);
            float sweepKey = clamp(vUv.y, 0.0, 1.0);

            vec3 p = position;
            float w = sin(uTime * 0.9 + seed * 6.28318);
            float c = cos(uTime * 0.7 + seed * 6.28318);

            vec3 spring = vec3(
                c * (0.6 + seed),
                w * (0.6 + (1.0 - seed)),
                (seed - 0.5) * 1.6
            );

            float push = multiplier * (0.16 + sweepKey * 0.95);
            positionTarget = p + spring * push;

        } else if (uStyle == 2) {
            float seed = fract(sin(dot(vUv, vec2(19.19, 91.7))) * 43758.5453);
            float r = clamp(length(position.xy) / 5.0, 0.0, 1.0);
            float t = uTime * 0.6 + seed * 6.28318;

            vec2 dir2 = normalize(vec2(cos(t), sin(t)));
            float push = multiplier * (0.14 + r * 0.95);
            float zKick = (seed - 0.5) * multiplier * 0.50;
            positionTarget = position + vec3(dir2 * push, zKick);

        } else if (uStyle == 3) {
            float seed = fract(sin(dot(vUv, vec2(9.91, 83.17))) * 43758.5453);
            float r = clamp(length(position.xy) / 5.0, 0.0, 1.0);

            vec3 p = position;
            vec2 dir2 = normalize(position.xy + vec2(0.001));

            float t = uTime * 0.9 + seed * 6.28318;
            float ripple = sin(t + r * 10.0);
            float push = multiplier * (0.10 + r * 0.95) * (0.5 + 0.5 * ripple);
            float zKick = (seed - 0.5) * multiplier * 0.44;
            positionTarget = p + vec3(dir2 * push, zKick);

        } else if (uStyle == 4) {
            float seed = fract(sin(dot(vUv, vec2(77.77, 22.22))) * 43758.5453);
            float sweepKey = clamp(vUv.x, 0.0, 1.0);

            vec3 p = position;
            vec2 cell = floor((p.xy + 5.0) * 0.9);
            float cellSeed = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
            float a = cellSeed * 6.28318 + uTime * 0.35;
            vec2 dir2 = normalize(vec2(cos(a), sin(a)));

            float jitter = 0.65 + 0.35 * sin(uTime * 1.4 + seed * 6.28318);
            float push = multiplier * (0.10 + sweepKey * 0.95) * jitter;
            float zKick = (seed - 0.5) * multiplier * 0.44;
            positionTarget = p + vec3(dir2 * push, zKick);
        } else {
            positionTarget = position;
        }

        float noiseOrigin = simplexNoise3d( positionTarget );
        float noiseTarget = simplexNoise3d( position );
        float noiseVal = mix(noiseOrigin, noiseTarget, uProgress);

        if (uStyle == 0) noiseVal = vUv.x;
        if (uStyle == 1) noiseVal = vUv.y;
        if (uStyle == 2) noiseVal = clamp(length(position.xy) / 5.0, 0.0, 1.0);
        if (uStyle == 3) noiseVal = clamp(length(position.xy) / 5.0, 0.0, 1.0);
        if (uStyle == 4) noiseVal = vUv.x;

        float duration = 0.55;
        float delay = (1.0 - duration) * noiseVal;
        float end = delay + duration;
        float progress = smoothstep(delay, end, uProgress);

        vec3 mixedPosition = mix(positionTarget, position, progress);
        vPosition = mixedPosition;

        vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        vec4 texA = texture(uPictureTexture, vUv);
        vec4 texB = texture(uNextTexture, vUv);
        vec4 texColor = mix(texA, texB, uMixFactor);
        vColor = texColor.rgb;
    }
`;

const lineFragmentShader = `
    varying vec3 vColor;
    varying vec3 vPosition;

    void main() {
        float alphaX = 1.0 - smoothstep(0.0, 25., abs(vPosition.x));
        float alphaY = 1.0 - smoothstep(0.0, 15., abs(vPosition.y));
        float alpha = clamp(alphaX * alphaY, 0.0, 1.0);
        gl_FragColor = vec4(vColor, alpha * 0.38);
        #include <colorspace_fragment>
    }
`;

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

        if (uStyle == 0) {
            float seed = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
            vec2 dir2 = normalize(vec2(
                cos(uTime * 0.6 + seed * 6.28318),
                sin(uTime * 0.6 + seed * 6.28318)
            ));

            float sweepKey = clamp(vUv.x, 0.0, 1.0);
            float pull = multiplier * (0.22 + sweepKey * 0.95);
            float zKick = (seed - 0.5) * multiplier * 0.44;

            vec3 p = position;
            float swirl = 0.8 + 0.2 * sin(uTime + seed * 6.28318);
            positionTarget = p + vec3(dir2 * pull * swirl, zKick);

        } else if (uStyle == 1) {
            float seed = fract(sin(dot(vUv, vec2(21.9898, 18.233))) * 43758.5453);
            float sweepKey = clamp(vUv.y, 0.0, 1.0);

            vec3 p = position;
            float w = sin(uTime * 0.9 + seed * 6.28318);
            float c = cos(uTime * 0.7 + seed * 6.28318);

            vec3 spring = vec3(
                c * (0.6 + seed),
                w * (0.6 + (1.0 - seed)),
                (seed - 0.5) * 1.6
            );

            float push = multiplier * (0.16 + sweepKey * 0.95);
            positionTarget = p + spring * push;

        } else if (uStyle == 2) {
            float seed = fract(sin(dot(vUv, vec2(19.19, 91.7))) * 43758.5453);
            float r = clamp(length(position.xy) / 5.0, 0.0, 1.0);
            float t = uTime * 0.6 + seed * 6.28318;

            vec2 dir2 = normalize(vec2(cos(t), sin(t)));
            float push = multiplier * (0.14 + r * 0.95);
            float zKick = (seed - 0.5) * multiplier * 0.50;
            positionTarget = position + vec3(dir2 * push, zKick);

        } else if (uStyle == 3) {
            float seed = fract(sin(dot(vUv, vec2(9.91, 83.17))) * 43758.5453);
            float r = clamp(length(position.xy) / 5.0, 0.0, 1.0);

            vec3 p = position;
            vec2 dir2 = normalize(position.xy + vec2(0.001));

            float t = uTime * 0.9 + seed * 6.28318;
            float ripple = sin(t + r * 10.0);
            float push = multiplier * (0.10 + r * 0.95) * (0.5 + 0.5 * ripple);
            float zKick = (seed - 0.5) * multiplier * 0.44;
            positionTarget = p + vec3(dir2 * push, zKick);

        } else if (uStyle == 4) {
            float seed = fract(sin(dot(vUv, vec2(77.77, 22.22))) * 43758.5453);
            float sweepKey = clamp(vUv.x, 0.0, 1.0);

            vec3 p = position;
            vec2 cell = floor((p.xy + 5.0) * 0.9);
            float cellSeed = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
            float a = cellSeed * 6.28318 + uTime * 0.35;
            vec2 dir2 = normalize(vec2(cos(a), sin(a)));

            float jitter = 0.65 + 0.35 * sin(uTime * 1.4 + seed * 6.28318);
            float push = multiplier * (0.10 + sweepKey * 0.95) * jitter;
            float zKick = (seed - 0.5) * multiplier * 0.44;
            positionTarget = p + vec3(dir2 * push, zKick);
        } else {
            positionTarget = position;
        }

        // Smooth stagger based on position (not noise)
        float noiseOrigin = simplexNoise3d( positionTarget );
        float noiseTarget = simplexNoise3d( position );
        float noiseVal = mix(noiseOrigin, noiseTarget, uProgress);

        if (uStyle == 0) noiseVal = vUv.x;
        if (uStyle == 1) noiseVal = vUv.y;
        if (uStyle == 2) noiseVal = clamp(length(position.xy) / 5.0, 0.0, 1.0);
        if (uStyle == 3) noiseVal = clamp(length(position.xy) / 5.0, 0.0, 1.0);

        float duration = 0.55;
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

        gl_FragColor = vec4(vColor, 1.0);
        #include <colorspace_fragment>
    }
`;

// ─── Particles Component ─────────────────────────────────────────────────────
const Particles = ({ images, isPaused, onStyleChange, styleIndex }) => {
  const pointsRef = useRef();
  const linesRef = useRef();
  const materialRef = useRef();
  const lineMaterialRef = useRef();
  const { size, viewport } = useThree();
  const texturesRef = useRef([]);
  const uniformsRef = useRef(null);
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  // Geometry
  const geometry = useMemo(() => {
    const res = SETTINGS.particleResolution;
    const geo = new THREE.PlaneGeometry(10, 10, res, res);
    geo.deleteAttribute('normal');
    return geo;
  }, []);

  const lineGeometry = useMemo(() => {
    const res = Math.min(180, Math.max(60, Math.floor(SETTINGS.particleResolution / 6)));
    const base = new THREE.PlaneGeometry(10, 10, res, res);
    base.deleteAttribute('normal');

    const { position, uv } = base.attributes;
    const idx = [];
    const w = res + 1;
    const h = res + 1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (x < w - 1) {
          idx.push(i, i + 1);
        }
        if (y < h - 1) {
          idx.push(i, i + w);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', position);
    geo.setAttribute('uv', uv);
    geo.setIndex(idx);
    return geo;
  }, []);

  // Material — imperative creation so React reconciler never destroys it
  useEffect(() => {
    const sharedUniforms = {
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uPictureTexture: { value: null },
      uNextTexture: { value: null },
      uMixFactor: { value: 0.0 },
      uParticleSize: { value: SETTINGS.particleSize },
      uProgress: { value: 1.0 },
      uTime: { value: 0 },
      uStyle: { value: 0 },
    };
    uniformsRef.current = sharedUniforms;

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: sharedUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const lineMat = new THREE.ShaderMaterial({
      vertexShader: lineVertexShader,
      fragmentShader: lineFragmentShader,
      uniforms: sharedUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = mat;
    lineMaterialRef.current = lineMat;

    if (pointsRef.current) {
      pointsRef.current.material = mat;
    }

    if (linesRef.current) {
      linesRef.current.material = lineMat;
    }

    return () => {
      mat.dispose();
      lineMat.dispose();
    };
  }, []);

  // Engine State
  const engineRef = useRef({
    currentIndex: 0,
    styleIndex: 0,
    lastCycleId: -1,
    accumulatedTime: 0,
  });

  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    const next = Math.max(0, Math.min(STYLE_NAMES.length - 1, styleIndex ?? 0));
    engineRef.current.styleIndex = next;
    mat.uniforms.uStyle.value = next;
    onStyleChange(next);
  }, [styleIndex, onStyleChange]);

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
    const sharedUniforms = uniformsRef.current;
    if (!mat || !sharedUniforms || !texturesLoaded || isPaused) return;

    const absoluteTime = state.clock.getElapsedTime();
    sharedUniforms.uTime.value = absoluteTime;

    const dpr = viewport.initialDpr || 1;
    sharedUniforms.uResolution.value.set(size.width * dpr, size.height * dpr);

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
        sharedUniforms.uPictureTexture.value = texturesRef.current[commitIdx];
      }

      // STEP 2: Prepare the NEXT crossfade target
      const nextIdx = (engineRef.current.currentIndex + 1) % texturesRef.current.length;
      sharedUniforms.uNextTexture.value = texturesRef.current[nextIdx];

      // STEP 3: Style is controlled externally for review
    }

    if (localTime < wait) {
      // STILL PHASE — showing current image only
      sharedUniforms.uProgress.value = 1.0;
      sharedUniforms.uMixFactor.value = 0.0;

    } else if (localTime < wait + morph) {
      // DISPERSING PHASE — particles scatter, colors crossfade 0→1
      const p = (localTime - wait) / morph;
      sharedUniforms.uProgress.value = 1.0 - p;
      sharedUniforms.uMixFactor.value = p;

    } else {
      // CONVERGING PHASE — particles reform showing next image
      const p = (localTime - (wait + morph)) / morph;
      sharedUniforms.uProgress.value = p;
      sharedUniforms.uMixFactor.value = 1.0;
    }

  });

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useEffect(() => {
    return () => lineGeometry.dispose();
  }, [lineGeometry]);

  return (
    <group scale={[viewport.width / 10, viewport.height / 10, 1]}>
      <lineSegments ref={linesRef} geometry={lineGeometry} />
      <points ref={pointsRef} geometry={geometry} />
    </group>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
function AboutImageTransitionTolexiaInner({ className = "" }) {
  const [inView, setInView] = useState(true);
  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const [contextLost, setContextLost] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);
  const [styleDecisions, setStyleDecisions] = useState({});
  const storagePrefix = "aboutImageTransitionTolexia.batch9";

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

  useEffect(() => {
    try {
      const storedIndexRaw = window.localStorage.getItem(`${storagePrefix}.styleIndex`);
      const storedIndex = storedIndexRaw == null ? 0 : Number(storedIndexRaw);
      if (Number.isFinite(storedIndex)) {
        setStyleIndex(((storedIndex % SETTINGS.stylesCount) + SETTINGS.stylesCount) % SETTINGS.stylesCount);
      }

      const storedDecisionsRaw = window.localStorage.getItem(`${storagePrefix}.styleDecisions`);
      if (storedDecisionsRaw) {
        const parsed = JSON.parse(storedDecisionsRaw);
        if (parsed && typeof parsed === "object") setStyleDecisions(parsed);
      } else {
        setStyleDecisions({ 0: "Approved", 1: "Approved", 2: "Approved", 3: "Approved", 4: "Approved" });
      }
    } catch {
      setStyleDecisions({ 0: "Approved", 1: "Approved", 2: "Approved", 3: "Approved", 4: "Approved" });
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(`${storagePrefix}.styleIndex`, String(styleIndex));
    } catch {
    }
  }, [styleIndex]);

  useEffect(() => {
    try {
      window.localStorage.setItem(`${storagePrefix}.styleDecisions`, JSON.stringify(styleDecisions));
    } catch {
    }
  }, [styleDecisions]);

  const handleStyleChange = useCallback((index) => {
    if (labelRef.current) {
      labelRef.current.innerText = `${index + 1} / ${SETTINGS.stylesCount} ${STYLE_NAMES[index]}`;
    }
  }, []);

  const handleNextStyle = useCallback(() => {
    setStyleIndex((s) => (s + 1) % SETTINGS.stylesCount);
  }, []);

  const handleDecision = useCallback((decision) => {
    setStyleDecisions((prev) => ({
      ...prev,
      [styleIndex]: decision,
    }));
  }, [styleIndex]);

  const handleContextLost = useCallback((e) => { e.preventDefault(); setContextLost(true); }, []);
  const handleContextRestored = useCallback(() => setContextLost(false), []);

  const shouldShowParticles = isDesktop && !prefersReducedMotion && !contextLost;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}
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
            <Particles images={images} isPaused={!inView} onStyleChange={handleStyleChange} styleIndex={styleIndex} />
          </Canvas>
        </div>
      )}

      <div style={{
        position: "absolute",
        bottom: "30px",
        left: "30px",
        zIndex: 101,
        display: "none",
        alignItems: "center",
        gap: "8px",
        pointerEvents: "auto"
      }}>
        <button type="button" onClick={handleNextStyle} style={{
          backgroundColor: "rgba(0,0,0,0.85)",
          color: "white",
          padding: "6px 10px",
          borderRadius: "40px",
          fontSize: "10px",
          fontWeight: "400",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontFamily: "var(--font-outfit), sans-serif",
          border: "2px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          cursor: "pointer"
        }}>Next</button>

        <button type="button" onClick={() => handleDecision("Approved")} style={{
          backgroundColor: "green",
          color: "white",
          padding: "6px 10px",
          borderRadius: "40px",
          fontSize: "10px",
          fontWeight: "400",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontFamily: "var(--font-outfit), sans-serif",
          border: "2px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          cursor: "pointer"
        }}>Approve</button>

        <button type="button" onClick={() => handleDecision("Rejected")} style={{
          backgroundColor: "red",
          color: "white",
          padding: "6px 10px",
          borderRadius: "40px",
          fontSize: "10px",
          fontWeight: "400",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontFamily: "var(--font-outfit), sans-serif",
          border: "2px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          cursor: "pointer"
        }}>Reject</button>

        <div style={{
          backgroundColor:
            (styleDecisions[styleIndex] === "Rejected")
              ? "rgba(255,0,0,0.65)"
              : (styleDecisions[styleIndex] === "Approved")
                ? "rgba(0,128,0,0.65)"
                : "rgba(0,0,0,0.65)",
          color: "white",
          padding: "6px 10px",
          borderRadius: "40px",
          fontSize: "10px",
          fontWeight: "400",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontFamily: "var(--font-outfit), sans-serif",
          border:
            (styleDecisions[styleIndex] === "Rejected")
              ? "2px solid rgba(255,0,0,0.35)"
              : (styleDecisions[styleIndex] === "Approved")
                ? "2px solid rgba(0,128,0,0.35)"
                : "2px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          pointerEvents: "none"
        }}>{styleDecisions[styleIndex] || "Pending"}</div>
      </div>

      {/* Label Overlay */}
      <div style={{
        position: "absolute",
        bottom: "30px",
        right: "30px",
        backgroundColor: "rgba(0,0,0,0.85)",
        color: "white",
        padding: "5px 10px",
        borderRadius: "40px",
        fontSize: "10px",
        fontWeight: "400",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        fontFamily: "var(--font-outfit), sans-serif",
        border: "2px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(16px)",
        zIndex: 100,
        pointerEvents: "none",
        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        display: "none",
        alignItems: "center",
        gap: "10px"
      }}>
        <span style={{ opacity: 0.5 }}>Effect:</span>
        <span ref={labelRef}>1 / {SETTINGS.stylesCount} Grid Door Slide</span>
      </div>
    </div>
  );
}

// React.memo prevents re-renders from ThemeProvider context changes.
const AboutImageTransitionTolexia = React.memo(AboutImageTransitionTolexiaInner);
export default AboutImageTransitionTolexia;
