"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import Image from "next/image";

/**
 * 🛠️ CONFIGURATION SETTINGS
 * You can edit these values to change the behavior of the particle system.
 */
const SETTINGS = {
  particleResolution: 850,    // 128x128 = 16k particles. Higher = more detail, lower = more performance.
  particleSize: 0.1,         // Base size of each particle.
  waitDuration: 1.0,          // Seconds the image stays fully formed and static.
  morphDuration: 3.5,         // Seconds for the dispersion/convergence animation (per phase).
  explosionStrength: 50.0,    // How far particles fly out during dispersion.
  glitchStrength: 0,       // Intensity of the subtle glitch effect.
  dpr: [1, 1.5],              // Device Pixel Ratio range for rendering quality.
};

// Total cycle for one image transition = waitDuration + (morphDuration * 2)
// With wait: 2.0 and morph: 1.5, the frequency is exactly 5 seconds.

// Vertex Shader
const vertexShader = `
    uniform vec2 uResolution;
    uniform sampler2D uPictureTexture;
    uniform float uParticleSize;
    uniform float uTime;
    uniform float uProgress;

    varying vec3 vColor;
    varying vec2 vUv;
    varying vec3 vPosition;

    float random2D(vec2 value) {
        return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

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

    float rand(float n){return fract(sin(n) * 43758.5453123);}

    float noise(float p){
        float fl = floor(p);
        float fc = fract(p);
        return mix(rand(fl), rand(fl + 1.0), fc);
    }

    void main() {
        vUv = uv;

        float multiplier = ${SETTINGS.explosionStrength.toFixed(1)};
        float modX = mod(position.x, 2.0) > 1.0 ? 1.0 : -1.0;
        float modY = mod(position.y, 2.0) > 1.0 ? 1.0 : -1.0;
        float modZ = mod(position.z, 2.0) > 1.0 ? 1.0 : -1.0;

        vec3 positionTarget = vec3(
            noise(position.x) * multiplier * modX,
            noise(position.y) * multiplier * modY,
            noise(position.z) * multiplier * modZ
        );

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

        float glitchTime = uTime * 0.5 - sin(modelPosition.y / 5.) - sin(modelPosition.x / 5.);
        float glitchStrength = sin(glitchTime) + abs(sin(glitchTime * 3.45)) +  abs(sin(glitchTime * 8.76));
        glitchStrength = smoothstep(0.4, 1.0, glitchStrength / 4.0) * ${SETTINGS.glitchStrength.toFixed(2)};

        modelPosition.x += (random2D(modelPosition.xz + uTime) - .5) * glitchStrength;
        modelPosition.y += (random2D(modelPosition.zx + uTime) - .5) * glitchStrength;

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        vec4 texColor = texture(uPictureTexture, uv);
        float intensity = (texColor.r + texColor.g + texColor.b) / 3.0;

        gl_PointSize = uParticleSize * (intensity + 0.15) * uResolution.y;
        gl_PointSize *= (1.0 / - viewPosition.z);

        vColor = texColor.rgb;
    }
`;

// Fragment Shader
const fragmentShader = `
    varying vec3 vColor;
    varying vec3 vPosition;

    void main() {
        vec2 uv = gl_PointCoord;
        if(distance(uv, vec2(0.5)) > 0.5) discard;

        float alphaX = 1.0 - smoothstep(0.0, 20., abs(vPosition.x));
        float alphaY = 1.0 - smoothstep(0.0, 10., abs(vPosition.y));
        float alpha = clamp(alphaX * alphaY, 0.0, 1.0);

        gl_FragColor = vec4(vColor, alpha);
        #include <colorspace_fragment>
    }
`;

const Particles = ({ images, isPaused }) => {
  const geometry = useMemo(() => {
    const res = SETTINGS.particleResolution;
    const geo = new THREE.PlaneGeometry(10, 10, res, res);
    geo.deleteAttribute('normal');
    return geo;
  }, []);

  const materialRef = useRef();
  const { size, viewport } = useThree();
  const [textures, setTextures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let loaded = 0;
    const tempTextures = [];

    images.forEach((img, i) => {
      loader.load(img.src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tempTextures[i] = tex;
        loaded++;
        if (loaded === images.length) {
          setTextures(tempTextures);
        }
      });
    });

    return () => {
      tempTextures.forEach(t => t.dispose());
    };
  }, [images]);

  const uniforms = useMemo(() => ({
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uPictureTexture: { value: null },
    uParticleSize: { value: SETTINGS.particleSize },
    uProgress: { value: 0 },
    uTime: { value: 0 },
  }), [size]);

  useEffect(() => {
    if (textures.length > 0 && materialRef.current) {
      materialRef.current.uniforms.uPictureTexture.value = textures[currentIndex];
      gsap.to(materialRef.current.uniforms.uProgress, {
        value: 1,
        duration: SETTINGS.morphDuration,
        ease: "power2.inOut"
      });
    }
  }, [textures]);

  useFrame((state) => {
    if (materialRef.current && !isPaused) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(
        size.width * viewport.initialDpr,
        size.height * viewport.initialDpr
      );
    }
  });

  useEffect(() => {
    if (isPaused || textures.length < 2 || !materialRef.current) return;

    let isCancelled = false;

    const startCycle = () => {
      if (isCancelled || !materialRef.current) return;

      timelineRef.current = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut", duration: SETTINGS.morphDuration }
      });

      // Cycle defined by waitDuration + (morphDuration * 2) = Total Frequency
      timelineRef.current
        .to({}, { duration: SETTINGS.waitDuration })
        .to(materialRef.current.uniforms.uProgress, { value: 0 })
        .call(() => {
          if (isCancelled || !materialRef.current) return;
          setCurrentIndex(prev => {
            const next = (prev + 1) % textures.length;
            materialRef.current.uniforms.uPictureTexture.value = textures[next];
            return next;
          });
        })
        .to(materialRef.current.uniforms.uProgress, { value: 1 })
        .to({}, { duration: SETTINGS.waitDuration });
    };

    // Align the start cycle with the initial convergence
    const initialDelay = (SETTINGS.waitDuration + SETTINGS.morphDuration) * 1000;
    const timeout = setTimeout(startCycle, initialDelay);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [textures, isPaused]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      if (materialRef.current) materialRef.current.dispose();
    };
  }, [geometry]);

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthTest={false}
        depthWrite={false}
      />
    </points>
  );
};

export default function AboutImageTransitionTolexia({ className = "" }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleContextLost = (e) => {
    e.preventDefault();
    setContextLost(true);
  };

  const handleContextRestored = () => {
    setContextLost(false);
  };

  const shouldShowParticles = isDesktop && !prefersReducedMotion && !contextLost;

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
      {/* Fallback Image */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: (shouldShowParticles && inView) ? 0 : 1,
        transition: "opacity 1.5s ease-in-out",
        zIndex: 1,
        pointerEvents: (shouldShowParticles && inView) ? "none" : "auto"
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

      {/* Canvas */}
      {isDesktop && !prefersReducedMotion && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: inView && !contextLost ? 1 : 0,
          transition: "opacity 0.8s ease"
        }}>
          <Canvas
            dpr={SETTINGS.dpr}
            gl={{
              antialias: false,
              powerPreference: "high-performance"
            }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener("webglcontextlost", handleContextLost, false);
              gl.domElement.addEventListener("webglcontextrestored", handleContextRestored, false);
            }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={35} />
            <Particles images={images} isPaused={!inView || contextLost} />
          </Canvas>
        </div>
      )}
    </div>
  );
}
