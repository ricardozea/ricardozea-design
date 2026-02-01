"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

export function MotionBurst({
  children,
  onBurst,
  animationOptions = {},
  hideAfterBurst = false,
  removeFromDOM = false,
  className = "",
  ...props
}) {
  const [isBursting, setIsBursting] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const elementRef = useRef(null);

  // Use state to track mount status for portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Default animation options
  const defaultOptions = {
    count: 20,
    colors: ['#F3C536', '#F3C536', '#F3C536', '#F3C536', '#F3C536', '#F3C536'],
    particleSize: 8,
    explosionRadius: 50,
    duration: 0.7,
    spread: 360
  };

  const finalOptions = { ...defaultOptions, ...animationOptions };

  const handleClick = (e) => {
    if (!elementRef.current) return;

    // 1. Get exact position
    const rect = elementRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setCoords({ x, y });
    setIsBursting(true);
    setBurstId(prev => prev + 1); // Trigger new burst

    if (onBurst) onBurst(e);

    // Reset burst state after animation (give it time to complete)
    const cleanupDuration = finalOptions.duration * 1000 + 100;
    console.log(`Burst triggered! Duration: ${finalOptions.duration}s, Cleanup: ${cleanupDuration}ms`);

    setTimeout(() => {
      setIsBursting(false);
      // Remove from DOM completely if requested
      if (removeFromDOM) {
        setShouldUnmount(true);
      }
    }, cleanupDuration);

    if (hideAfterBurst) {
      setTimeout(() => setIsVisible(false), 50); // Faster hide
    }
  };

  if (shouldUnmount) return null; // Completely remove from DOM

  // Clone the child without passing animationOptions
  // We explicitly pull out props that shouldn't be passed to the DOM
  const { style, onClick, className: childClassName, ...childProps } = children.props;

  // If hidden, hide visually but keep mounted so Portal survives
  const computedStyle = {
    ...style,
    cursor: 'pointer',
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'auto' : 'none',
    ...(isVisible ? {} : { width: 0, height: 0, overflow: 'hidden' })
  };

  return (
    <>
      {/* The Trigger Element */}
      {React.cloneElement(React.Children.only(children), {
        ref: elementRef,
        className: `${childClassName || ''} ${className}`.trim(),
        onClick: (e) => {
          if (onClick) onClick(e);
          handleClick(e);
        },
        style: computedStyle,
        ...props // Spread remaining props from MotionBurst to child
      })}

      {/* The Burst Animation (Portal to Body) */}
      {mounted && isBursting && createPortal(
        <Particles key={burstId} x={coords.x} y={coords.y} options={finalOptions} />,
        document.body
      )}
    </>
  );
}

// Separate component for performance and cleanliness
function Particles({ x, y, options }) {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'visible'
      }}
    >
      {Array.from({ length: options.count }).map((_, i) => {
        const angle = (i / options.count) * 360;
        const rotate = angle + Math.random() * 30;

        // Calculate variable distance based on explosionRadius
        const distance = options.explosionRadius + Math.random() * (options.explosionRadius * 0.5);
        const size = options.particleSize + Math.random() * (options.particleSize * 0.5); // Add variation relative to size

        // Adjust starting position to center the particle on the element
        const startX = x - size / 2;
        const startY = y - size / 2;

        return (
          <motion.div
            key={i}
            initial={{
              x: startX,
              y: startY,
              scale: 1, // Start visible immediately
              opacity: 1
            }}
            animate={{
              x: startX + Math.cos((rotate * Math.PI) / 180) * distance,
              y: startY + Math.sin((rotate * Math.PI) / 180) * distance,
              scale: [1, 1, 0], // Stay visible then shrink at end
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: options.duration,
              ease: "easeOut"
            }}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              backgroundColor: options.colors[i % options.colors.length],
              borderRadius: '50%',
            }}
          />
        );
      })}
    </div>
  );
}
