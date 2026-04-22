"use client";

import { useState, useRef, ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom";
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  position = "top",
  delay = 350,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  const isTop = position === "top";

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      style={{ position: "relative", display: "inline-flex" }}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: 200,
            left: "50%",
            ...(isTop ? { bottom: "calc(100% + 10px)" } : { top: "calc(100% + 10px)" }),
            animation: "tooltipIn 0.18s var(--ease-out-expo) forwards",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: 6,
              height: 6,
              background: "#141417",
              border: "1px solid #2a2a2d",
              ...(isTop
                ? {
                    bottom: -4,
                    borderTop: "none",
                    borderLeft: "none",
                  }
                : {
                    top: -4,
                    borderBottom: "none",
                    borderRight: "none",
                  }),
            }}
          />

          {/* Content */}
          <div
            style={{
              transform: "translateX(-50%)",
              background: "#141417",
              border: "1px solid #2a2a2d",
              borderRadius: "4px",
              padding: "4px 10px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
