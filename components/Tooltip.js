"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Tooltip = React.forwardRef(({
  children,
  className = "",
  position = "top",
  onClick, // Destructure onClick to intercept it
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const lastTouchTimeRef = useRef(0);
  const tooltipRef = useRef(null);

  // Handle outside clicks for mobile
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event) => {
      // Only handle on mobile/touch devices
      if (isDesktop()) return;

      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isVisible]);

  // Helper to detect if device supports hover (Desktop)
  const isDesktop = () => {
    if (typeof window === 'undefined') return true; // Default to desktop for SSR
    return window.matchMedia && window.matchMedia('(hover: hover)').matches;
  };

  // Positioning classes for motion animation
  const initialAnimation = {
    top: { opacity: 0, y: 10, x: "-50%" },
    bottom: { opacity: 0, y: -10, x: "-50%" },
    left: { opacity: 0, x: 10, y: "-50%" },
    right: { opacity: 0, x: -10, y: "-50%" },
  };

  const animateState = {
    top: { opacity: 1, y: 0, x: "-50%" },
    bottom: { opacity: 1, y: 0, x: "-50%" },
    left: { opacity: 1, x: 0, y: "-50%" },
    right: { opacity: 1, x: 0, y: "-50%" },
  };

  // Extract tooltip content from first child if it's a text element
  const getTooltipContent = () => {
    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];

    // If first child is a span with text content, use it as tooltip content
    if (React.isValidElement(firstChild) && firstChild.type === 'span') {
      return firstChild;
    }

    // Otherwise, return null (no tooltip content)
    return null;
  };

  const tooltipContent = getTooltipContent();
  const triggerElement = React.Children.toArray(children).slice(1);

  const tooltipPositionClass = `tooltip-${position}`;

  const handleTouchStart = (e) => {
    // Record the timestamp of this touch
    lastTouchTimeRef.current = Date.now();
  };

  const handleClick = (e) => {
    // Check if this click was triggered by a touch event (within 300ms)
    const isTouchClick = Date.now() - lastTouchTimeRef.current < 300;

    if (!isDesktop() && isTouchClick) {
      // Mobile / Touch behavior
      if (!isVisible) {
        // First tap: show tooltip, prevent burst
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(true);
      } else {
        // Second tap: hide tooltip and trigger burst
        setIsVisible(false);
        if (onClick) onClick(e);
      }
    } else {
      // Desktop / Mouse behavior: always trigger burst
      // Visibility is handled by hover events
      if (onClick) onClick(e);
    }
  };

  const handleMouseEnter = () => {
    // Only allow hover to show tooltip on desktop
    // This prevents 'mouseenter' from firing on mobile tap before 'click'
    if (isDesktop()) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop()) {
      setIsVisible(false);
    }
  };

  return (
    <span
      ref={ref}
      className={`tooltip ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      {...props}
    >
      {triggerElement}

      <AnimatePresence>
        {isVisible && tooltipContent && (
          <motion.span
            ref={tooltipRef}
            initial={initialAnimation[position]}
            animate={animateState[position]}
            exit={initialAnimation[position]}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`tooltip-content ${tooltipPositionClass}`}
          >
            {tooltipContent}
            {/* Tiny arrow */}
            <span className="tooltip-arrow" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
});

Tooltip.displayName = "Tooltip";
