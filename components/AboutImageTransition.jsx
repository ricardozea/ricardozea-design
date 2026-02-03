"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";

const useMediaQuery = (query) => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const media = window.matchMedia(query);

		const update = () => setMatches(media.matches);
		update();

		if (media.addEventListener) {
			media.addEventListener("change", update);
			return () => media.removeEventListener("change", update);
		}

		media.addListener(update);
		return () => media.removeListener(update);
	}, [query]);

	return matches;
};

export default function AboutImageTransition({
	className = "",
	intervalMs = 5000,
	altIllustration = "Ricardo Zea",
	altReal = "Ricardo Zea",
}) {
	const containerRef = useRef(null);
	const progressAnimationRef = useRef(null);
	const [inView, setInView] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isUserPaused, setIsUserPaused] = useState(false);
	const progress = useMotionValue(0);
	const [progressNow, setProgressNow] = useState(0);

	const isDesktop = useMediaQuery("(min-width: 768px)");
	const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

	const images = useMemo(
		() => [
			{
				src: "/images/image-ricardo-zea-illustration.png",
				alt: altIllustration,
			},
			{
				src: "/images/image-ricardo-zea-real.png",
				alt: altReal,
			},
		],
		[altIllustration, altReal]
	);

	useEffect(() => {
		const node = containerRef.current;
		if (!node) return;

		if (typeof IntersectionObserver === "undefined") {
			setInView(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				setInView(entries.some((e) => e.isIntersecting));
			},
			{
				root: null,
				threshold: 0.2,
			}
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const isDesktopAnimationEnabled = isDesktop && !prefersReducedMotion;
	const isPlaying = isDesktopAnimationEnabled && inView && !isUserPaused;

	useEffect(() => {
		if (progressAnimationRef.current) {
			progressAnimationRef.current.stop();
			progressAnimationRef.current = null;
		}

		if (!isPlaying) return;

		const startOrResume = () => {
			const current = progress.get();
			const clamped = Math.min(Math.max(current, 0), 1);
			const remainingMs = Math.max(0, (1 - clamped) * intervalMs);
			const remainingSeconds = Math.max(0.05, remainingMs / 1000);

			progressAnimationRef.current = animate(progress, 1, {
				duration: remainingSeconds,
				ease: "linear",
				onComplete: () => {
					progress.set(0);
					setActiveIndex((prev) => (prev + 1) % images.length);
					if (isDesktopAnimationEnabled && inView && !isUserPaused) {
						startOrResume();
					}
				},
			});
		};

		startOrResume();

		return () => {
			if (progressAnimationRef.current) {
				progressAnimationRef.current.stop();
				progressAnimationRef.current = null;
			}
		};
	}, [images.length, inView, intervalMs, isDesktopAnimationEnabled, isUserPaused, isPlaying, progress]);

	const active = images[activeIndex];
	const ringRadius = 10;
	const ringStroke = 2.5;
	const ringCircumference = 2 * Math.PI * ringRadius;
	const ringDashOffset = useTransform(progress, (v) => ringCircumference * (1 - v));

	useMotionValueEvent(progress, "change", (latest) => {
		setProgressNow(Math.round(latest * 100));
	});

	return (
		<div
			ref={containerRef}
			className={className}
			style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}
		>
			{(!isDesktop || prefersReducedMotion) && (
				<Image
					src={images[0].src}
					alt={images[0].alt}
					fill
					sizes="(max-width: 767px) 100vw, 600px"
					style={{ objectFit: "cover" }}
					priority={false}
				/>
			)}

			{isDesktop && !prefersReducedMotion && (
				<AnimatePresence mode="wait">
					<motion.div
						key={active.src}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8, ease: "easeInOut" }}
						style={{ position: "absolute", inset: 0, willChange: "opacity" }}
					>
						<Image
							src={active.src}
							alt={active.alt}
							fill
							sizes="(max-width: 767px) 100vw, 600px"
							style={{ objectFit: "cover" }}
							priority={false}
						/>
					</motion.div>
				</AnimatePresence>
			)}

			{isDesktop && (
				<div className="about-slideshow-controls">
					<div
						aria-label="Slideshow progress"
						role="progressbar"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={progressNow}
						className="about-slideshow-progress"
					>
						<svg width="22" height="22" viewBox="0 0 24 24">
							<circle
								cx="12"
								cy="12"
								r={ringRadius}
								fill="none"
								stroke="rgba(255,255,255,0.22)"
								strokeWidth={ringStroke}
							/>
							<motion.circle
								cx="12"
								cy="12"
								r={ringRadius}
								fill="none"
								strokeLinecap="round"
								strokeWidth={ringStroke}
								className="about-slideshow-progress-ring"
								style={{
									rotate: -90,
									transformOrigin: "12px 12px",
									strokeDasharray: ringCircumference,
									strokeDashoffset: ringDashOffset,
								}}
							/>
						</svg>
					</div>

					<button
						type="button"
						onClick={() => setIsUserPaused((v) => !v)}
						aria-label={isUserPaused ? "Play slideshow" : "Pause slideshow"}
						title={isUserPaused ? "Play" : "Pause"}
						disabled={!isDesktopAnimationEnabled}
						className="image-controls-button"
					>
						{isUserPaused ? "Play" : "Pause"}
					</button>
				</div>
			)}
		</div>
	);
}
