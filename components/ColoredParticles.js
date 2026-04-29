'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// GLOBAL SETTINGS - Edit these to customize the effect
// ============================================
const SETTINGS = {
	// Particle count - More particles = denser effect (1000-5000 recommended)
	particleCount: 1000,

	// Spread radius - How far particles spread from center (200-800 recommended)
	spreadRadius: 300,

	// Particle size - Size of individual particles (1-10 recommended)
	particleSize: 3,

	// Particle shape - 'square', 'triangle', 'circle' (uses actual 3D geometry)
	particleShape: 'triangle',

	// Camera distance - How far the camera is from the particles (300-1000 recommended)
	cameraDistance: 300,

	// Camera field of view (50-100 recommended)
	cameraFov: 40,

	// Rotation speed - How fast the particles rotate (0-1 recommended)
	rotationSpeedX: 0.025,
	rotationSpeedY: 0.05,

	// Individual particle rotation speed (0-2 recommended)
	particleRotationSpeed: 1,

	// Mouse interaction radius - How far mouse affects particles (50-200 recommended)
	mouseRepelRadius: 400,

	// Mouse repel strength - How strongly particles push away (0.1-5 recommended)
	mouseRepelStrength: 2,

	// Mouse return speed - How fast particles return to original position (0.01-0.2 recommended)
	mouseReturnSpeed: 0.05,

	// Rotation transition timing - Time to stop/start rotation in seconds (0.1-1 recommended)
	rotationTransitionTime: 0.3,

	// Particle opacity - Transparency of particles (0.1-1 recommended)
	particleOpacity: .6,

	// Color palette - RGB values for particle colors (0-1 for each channel)
	colorPalette: [
		[1, 0, 0],    // red
		[1, 0.5, 0],  // orange
		[1, 1, 0],    // yellow
		[0, 1, 0],    // green
		[0, 1, 1],    // cyan
		[0, 0, 1],    // blue
		[0.5, 0, 1],  // purple
		[1, 0, 1],    // magenta
	],
};
// ============================================

function Lines({ mouseRef }) {
	const groupRef = useRef();
	const meshRef = useRef();
	const rotationSpeedRef = useRef(1); // 1 = full speed, 0 = stopped
	const targetRotationSpeedRef = useRef(1);

	// Create geometry based on shape
	const geometry = useMemo(() => {
		if (SETTINGS.particleShape === 'triangle') {
			const geo = new THREE.ConeGeometry(SETTINGS.particleSize / 2, SETTINGS.particleSize, 3);
			return geo;
		} else if (SETTINGS.particleShape === 'circle') {
			const geo = new THREE.SphereGeometry(SETTINGS.particleSize / 2, 8, 8);
			return geo;
		} else {
			const geo = new THREE.BoxGeometry(SETTINGS.particleSize, SETTINGS.particleSize, SETTINGS.particleSize);
			return geo;
		}
	}, []);

	// Create material
	const material = useMemo(() => {
		return new THREE.MeshBasicMaterial({
			transparent: true,
			opacity: SETTINGS.particleOpacity,
		});
	}, []);

	// Create instance data
	const { originalPositions, currentPositions, colors, rotations, rotationSpeeds } = useMemo(() => {
		const originalPositions = [];
		const currentPositions = [];
		const colors = [];
		const rotations = [];
		const rotationSpeeds = [];
		const n = SETTINGS.particleCount;
		const r = SETTINGS.spreadRadius;

		for (let i = 0; i < n; i++) {
			const x = (Math.random() - 0.5) * r;
			const y = (Math.random() - 0.5) * r;
			const z = (Math.random() - 0.5) * r;

			originalPositions.push(x, y, z);
			currentPositions.push(x, y, z);

			// Assign random color from palette
			const color = SETTINGS.colorPalette[Math.floor(Math.random() * SETTINGS.colorPalette.length)];
			colors.push(...color);

			// Random initial rotation
			rotations.push(
				Math.random() * Math.PI * 2,
				Math.random() * Math.PI * 2,
				Math.random() * Math.PI * 2
			);

			// Random rotation speed for each particle
			rotationSpeeds.push(
				(Math.random() - 0.5) * SETTINGS.particleRotationSpeed,
				(Math.random() - 0.5) * SETTINGS.particleRotationSpeed,
				(Math.random() - 0.5) * SETTINGS.particleRotationSpeed
			);
		}

		return { originalPositions, currentPositions, colors, rotations, rotationSpeeds };
	}, []);

	const dummy = useMemo(() => new THREE.Object3D(), []);

	useFrame((state) => {
		if (!meshRef.current) return;

		// Check if mouse is inside the container
		const isMouseInside = mouseRef.current.x < 9990;

		// Set target rotation speed based on mouse presence
		targetRotationSpeedRef.current = isMouseInside ? 0 : 1;

		// Smoothly interpolate rotation speed with 0.3s timing
		const lerpFactor = 1 / (SETTINGS.rotationTransitionTime * 60); // 60fps
		rotationSpeedRef.current += (targetRotationSpeedRef.current - rotationSpeedRef.current) * lerpFactor;

		// Rotate entire group with interpolated speed
		if (groupRef.current) {
			groupRef.current.rotation.y += SETTINGS.rotationSpeedY * rotationSpeedRef.current * 0.016;
			groupRef.current.rotation.x += SETTINGS.rotationSpeedX * rotationSpeedRef.current * 0.016;
		}

		// Update particle positions based on mouse interaction
		for (let i = 0; i < SETTINGS.particleCount; i++) {
			const idx = i * 3;

			// Calculate distance from mouse to particle (in 2D screen space approximated)
			const dx = currentPositions[idx] - mouseRef.current.x;
			const dy = currentPositions[idx + 1] - mouseRef.current.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Apply repulsion if mouse is close
			if (distance < SETTINGS.mouseRepelRadius) {
				const force = (SETTINGS.mouseRepelRadius - distance) / SETTINGS.mouseRepelRadius;
				const pushX = (dx / distance) * force * SETTINGS.mouseRepelStrength;
				const pushY = (dy / distance) * force * SETTINGS.mouseRepelStrength;

				currentPositions[idx] += pushX;
				currentPositions[idx + 1] += pushY;
			}

			// Smoothly return to original position
			const returnX = (originalPositions[idx] - currentPositions[idx]) * SETTINGS.mouseReturnSpeed;
			const returnY = (originalPositions[idx + 1] - currentPositions[idx + 1]) * SETTINGS.mouseReturnSpeed;
			const returnZ = (originalPositions[idx + 2] - currentPositions[idx + 2]) * SETTINGS.mouseReturnSpeed;

			currentPositions[idx] += returnX;
			currentPositions[idx + 1] += returnY;
			currentPositions[idx + 2] += returnZ;

			// Update rotation with interpolated speed
			rotations[idx] += rotationSpeeds[idx] * 0.01 * rotationSpeedRef.current;
			rotations[idx + 1] += rotationSpeeds[idx + 1] * 0.01 * rotationSpeedRef.current;
			rotations[idx + 2] += rotationSpeeds[idx + 2] * 0.01 * rotationSpeedRef.current;

			// Set position
			dummy.position.set(currentPositions[idx], currentPositions[idx + 1], currentPositions[idx + 2]);

			// Set rotation
			dummy.rotation.set(rotations[idx], rotations[idx + 1], rotations[idx + 2]);

			// Update matrix
			dummy.updateMatrix();

			// Set instance matrix
			meshRef.current.setMatrixAt(i, dummy.matrix);

			// Set color
			const color = new THREE.Color();
			color.setRGB(colors[idx], colors[idx + 1], colors[idx + 2]);
			meshRef.current.setColorAt(i, color);
		}

		meshRef.current.instanceMatrix.needsUpdate = true;
		if (meshRef.current.instanceColor) {
			meshRef.current.instanceColor.needsUpdate = true;
		}
	});

	return (
		<group ref={groupRef}>
			<instancedMesh
				ref={meshRef}
				args={[geometry, material, SETTINGS.particleCount]}
			/>
		</group>
	);
}

export default function ColoredLinesAnimation() {
	const containerRef = useRef(null);
	const mouseRef = useRef({ x: 9999, y: 9999 });

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleMouseMove = (e) => {
			const rect = container.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// Convert to normalized coordinates (-1 to 1)
			const normalizedX = (x / rect.width) * 2 - 1;
			const normalizedY = -(y / rect.height) * 2 + 1;

			// Scale to particle space
			mouseRef.current.x = normalizedX * SETTINGS.spreadRadius * 0.8;
			mouseRef.current.y = normalizedY * SETTINGS.spreadRadius * 0.8;
		};

		const handleMouseEnter = () => {
			// Mouse is inside - rotation will stop
		};

		const handleMouseLeave = () => {
			mouseRef.current.x = 9999;
			mouseRef.current.y = 9999;
		};

		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseenter', handleMouseEnter);
		container.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			container.removeEventListener('mousemove', handleMouseMove);
			container.removeEventListener('mouseenter', handleMouseEnter);
			container.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return (
		<div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
			<Canvas
				camera={{ position: [0, 0, SETTINGS.cameraDistance], fov: SETTINGS.cameraFov }}
				style={{ background: 'transparent', position: 'absolute', inset: 0, zIndex: -1 }}
			>
				<Lines mouseRef={mouseRef} />
			</Canvas>
		</div>
	);
}
