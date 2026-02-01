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
	const [styleIndex, setStyleIndex] = useState(0);
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
					setStyleIndex((prev) => prev + 1);
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

	const transitionStyle = styleIndex % 3;

	const animation = useMemo(() => {
		if (transitionStyle === 1) {
			return {
				initial: { clipPath: "inset(0 100% 0 0)", opacity: 1, filter: "blur(4px)" },
				animate: { clipPath: "inset(0 0% 0 0)", opacity: 1, filter: "blur(0px)" },
				exit: { clipPath: "inset(0 0 0 100%)", opacity: 1, filter: "blur(6px)" },
				transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
			};
		}

		if (transitionStyle === 2) {
			return {
				initial: {
					opacity: 0,
					scale: 1.06,
					y: 14,
					rotate: 0.6,
					filter: "blur(10px) saturate(1.25) contrast(1.15)",
				},
				animate: {
					opacity: 1,
					scale: 1,
					y: 0,
					rotate: 0,
					filter: "blur(0px) saturate(1) contrast(1)",
				},
				exit: {
					opacity: 0,
					scale: 1.04,
					y: -10,
					rotate: -0.4,
					filter: "blur(12px) saturate(0.9) contrast(1.05)",
				},
				transition: { duration: 1.25, ease: [0.22, 1, 0.36, 1] },
			};
		}

		return {
			initial: { opacity: 0, scale: 1.02, filter: "blur(6px)" },
			animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
			exit: { opacity: 0, scale: 1.04, filter: "blur(8px)" },
			transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
		};
	}, [transitionStyle]);

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
						key={`${active.src}-${transitionStyle}`}
						initial={animation.initial}
						animate={animation.animate}
						exit={animation.exit}
						transition={animation.transition}
						style={{ position: "absolute", inset: 0, willChange: "transform, opacity, filter, clip-path" }}
					>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: transitionStyle === 0 ? 0.22 : transitionStyle === 1 ? 0.18 : 0.28 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
							style={{
								position: "absolute",
								inset: 0,
								background:
									"radial-gradient(60% 45% at 30% 25%, rgba(255,255,255,0.22), rgba(255,255,255,0) 60%), radial-gradient(55% 45% at 70% 70%, rgba(255,255,255,0.12), rgba(255,255,255,0) 65%)",
								mixBlendMode: "screen",
								pointerEvents: "none",
							}}
						/>
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
				<div
				style={{
					position: "absolute",
					right: "0.75rem",
					bottom: "0.75rem",
					display: "flex",
					alignItems: "center",
					gap: "0.5rem",
					zIndex: 5,
				}}
				>
				<div
					aria-label="Slideshow progress"
					role="progressbar"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={progressNow}
					style={{
						width: "28px",
						height: "28px",
						display: "grid",
						placeItems: "center",
						borderRadius: "999px",
						background: "rgba(0,0,0,0.45)",
						backdropFilter: "blur(10px)",
						border: "1px solid rgba(255,255,255,0.18)",
					}}
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
							stroke="rgba(255,255,255,0.92)"
							strokeLinecap="round"
							strokeWidth={ringStroke}
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
