"use client";

import { useState, useRef, ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  rawCode: string;
}

export function CodeBlock({ children, rawCode }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      {/* Copy button — anchored to top-right of the wrapper */}
      <button
        onClick={handleCopy}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        type="button"
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        style={{
          position: "absolute",
          top: "0.65rem",
          right: "0.65rem",
          zIndex: 20,
          opacity: hovered || copied ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
          transition: "opacity 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.15s ease",
          background: "oklch(0.14 0.015 264 / 0.92)",
          backdropFilter: "blur(6px)",
          border: `1px solid ${copied ? "var(--accent)" : btnHovered ? "var(--border-hover)" : "var(--border)"}`,
          borderRadius: "3px",
          padding: "3px 9px",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.1em",
          color: copied ? "var(--accent)" : btnHovered ? "var(--text)" : "var(--text-muted)",
          transform: btnHovered && !copied ? "scale(1.04)" : "scale(1)",
          userSelect: "none",
          lineHeight: 1.8,
        }}
      >
        {copied ? "✓ copied" : "copy"}
      </button>
    </div>
  );
}
