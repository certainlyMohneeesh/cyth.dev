"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface CipherRevealProps {
  text: string;
  triggerOnMount?: boolean;
  triggerOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  speed?: number;
  scrambleDuration?: number;
  revealDuration?: number;
  glitchFont?: boolean; // Whether to switch to monospace font during animation
  wrap?: boolean; // Whether to allow text to wrap to the next line (useful for long titles, disable for nav links)
}

const CHARACTERS = "!<>-_\\\\/[]{}—=+*^?#_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function CipherReveal({
  text,
  triggerOnMount = false,
  triggerOnHover = true,
  className = "",
  style = {},
  as: Component = "span",
  speed = 30,
  scrambleDuration = 200,
  revealDuration = 400,
  glitchFont = true,
  wrap = false,
}: CipherRevealProps) {
  const [displayText, setDisplayText] = useState(triggerOnMount ? "" : text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fixedWidth, setFixedWidth] = useState<number | undefined>(undefined);
  const [fixedHeight, setFixedHeight] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLElement>(null);
  const isAnimatingRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    setIsAnimating(true);
    isAnimatingRef.current = true;
    startTimeRef.current = performance.now();

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;

      let nextText = "";

      if (elapsed < scrambleDuration) {
        // Full scramble
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            nextText += " ";
          } else {
            nextText += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          }
        }
        setDisplayText(nextText);
        animationRef.current = setTimeout(() => requestAnimationFrame(animate), speed) as unknown as number;
      } else if (elapsed < scrambleDuration + revealDuration) {
        // Progressive reveal from left to right
        const progress = (elapsed - scrambleDuration) / revealDuration;
        const revealCount = Math.floor(progress * text.length);

        for (let i = 0; i < text.length; i++) {
          if (i < revealCount || text[i] === " ") {
            nextText += text[i];
          } else {
            nextText += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          }
        }
        setDisplayText(nextText);
        animationRef.current = setTimeout(() => requestAnimationFrame(animate), speed) as unknown as number;
      } else {
        // Finish
        setDisplayText(text);
        setIsAnimating(false);
        isAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(animate);
  }, [text, speed, scrambleDuration, revealDuration]);

  useEffect(() => {
    if (triggerOnMount) {
      // Small delay for initial page load
      const timeout = setTimeout(() => {
        startAnimation();
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      setDisplayText(text);
    }
  }, [triggerOnMount, text, startAnimation]);

  // Lock the width and height of the container to the original text dimensions to prevent layout twitching
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width > 0 && !isAnimating) {
        setFixedWidth(rect.width);
        setFixedHeight(rect.height);
      }
    }
  }, [text, isAnimating]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startAnimation();
    }
  };

  return (
    <Component
      ref={containerRef}
      className={className}
      style={{
        ...style,
        fontFamily: (isAnimating && glitchFont) ? "var(--font-mono)" : style.fontFamily,
        color: isAnimating ? "var(--accent)" : style.color,
        transition: "color 0.2s ease",
        display: "inline-block",
        whiteSpace: wrap ? "pre-wrap" : "nowrap",
        wordBreak: wrap ? "break-word" : "normal",
        width: isAnimating && fixedWidth ? `${fixedWidth}px` : undefined,
        height: isAnimating && fixedHeight ? `${fixedHeight}px` : undefined,
        verticalAlign: "top",
      }}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
}
