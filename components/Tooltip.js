"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

export const Tooltip = React.forwardRef(({
  children,
  className = "",
  position = "top",
  onClick, // Destructure onClick to intercept it
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fixedPos, setFixedPos] = useState(null);
  const lastTouchTimeRef = useRef(0);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const tooltipId = useId();

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

  // Extract tooltip content robustly even when JSX whitespace/text nodes are present.
  const childrenArray = React.Children.toArray(children);
  const tooltipContentIndex = childrenArray.findIndex(
    (child) => React.isValidElement(child) && child.type === 'span'
  );
  const tooltipContent = tooltipContentIndex >= 0 ? childrenArray[tooltipContentIndex] : null;
  const triggerElement = childrenArray.filter((_, index) => index !== tooltipContentIndex);

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
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  const measurePosition = () => {
    const target = triggerRef.current;
    if (!target) return null;
    const rect = target.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  // Update fixed position when shown
  useEffect(() => {
    if (!isVisible) return;
    const next = measurePosition();
    if (next) setFixedPos(next);
  }, [isVisible]);

  const resolvedPos = fixedPos ?? measurePosition() ?? { x: 0, y: 0, width: 0, height: 0 };

  const baseTop =
    position === "top"
      ? resolvedPos.y - 12
      : position === "bottom"
        ? resolvedPos.y + resolvedPos.height + 12
        : resolvedPos.y + resolvedPos.height / 2;

  const tooltipStyle = {
    position: "fixed",
    left: resolvedPos.x,
    right: "auto",
    bottom: "auto",
    margin: 0,
    zIndex: 9999,
    pointerEvents: "none",
    transform:
      position === "top"
        ? "translate(-50%, -100%)"
        : position === "bottom"
          ? "translate(-50%, 0)"
          : position === "left"
            ? "translate(-100%, -50%)"
            : "translate(0, -50%)",
  };

  const SLIDE_OFFSET = 8;
  const initialState = { opacity: 0, top: baseTop + SLIDE_OFFSET };
  const animateState = { opacity: 1, top: baseTop };
  const exitState = { opacity: 0, top: baseTop + SLIDE_OFFSET };

  return (
    <span
      ref={(node) => {
        triggerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={`tooltip ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      aria-describedby={isVisible && tooltipContent ? tooltipId : undefined}
      {...props}
    >
      {triggerElement}

      {typeof window !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isVisible && tooltipContent && (
                <motion.span
                  ref={tooltipRef}
                  id={tooltipId}
                  initial={initialState}
                  animate={animateState}
                  exit={exitState}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`tooltip-content ${tooltipPositionClass} tooltip-fixed tooltip-fixed-${position}`}
                  style={tooltipStyle}
                >
                  {tooltipContent}
                  {/* Tiny arrow */}
                  <span className="tooltip-arrow" />
                </motion.span>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </span>
  );
});

Tooltip.displayName = "Tooltip";
