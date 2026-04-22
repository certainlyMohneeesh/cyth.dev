"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

export interface AccordionItemData {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
}

function Item({
  data,
  isOpen,
  onToggle,
}: {
  data: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setHeight(isOpen ? el.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        transition: "border-color 0.2s ease",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text)",
          textAlign: "left",
          outline: "none",
        }}
      >
        <div style={{ flex: 1 }}>{data.trigger}</div>

        {/* Architectural cross indicator */}
        <div
          aria-hidden
          style={{
            position: "relative",
            width: 14,
            height: 14,
            flexShrink: 0,
            marginTop: "3px",
          }}
        >
          {/* Horizontal bar (always visible) */}
          <span
            style={{
              position: "absolute",
              inset: "auto 0",
              top: "50%",
              height: 1,
              background: isOpen ? "var(--accent)" : "var(--text-subtle)",
              transition: "background 0.25s ease, transform 0.35s var(--ease-out-expo)",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          />
          {/* Vertical bar (fades out on open) */}
          <span
            style={{
              position: "absolute",
              inset: "0 auto",
              left: "50%",
              width: 1,
              background: isOpen ? "var(--accent)" : "var(--text-subtle)",
              transition:
                "background 0.25s ease, transform 0.35s var(--ease-out-expo), opacity 0.25s ease",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              opacity: isOpen ? 0 : 1,
            }}
          />
        </div>
      </button>

      {/* Collapsible content */}
      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.45s var(--ease-out-expo)",
          willChange: "height",
        }}
      >
        <div ref={contentRef} style={{ paddingBottom: "1.5rem" }}>
          {data.content}
        </div>
      </div>
    </div>
  );
}

export default function Accordion({
  items,
  defaultOpen,
  allowMultiple = false,
}: {
  items: AccordionItemData[];
  defaultOpen?: string | string[];
  allowMultiple?: boolean;
}) {
  const init = defaultOpen
    ? Array.isArray(defaultOpen)
      ? defaultOpen
      : [defaultOpen]
    : [];

  const [openIds, setOpenIds] = useState<string[]>(init);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div>
      {items.map((item) => (
        <Item
          key={item.id}
          data={item}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
      <div style={{ borderTop: "1px solid var(--border)" }} />
    </div>
  );
}
