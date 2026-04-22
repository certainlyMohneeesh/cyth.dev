"use client";

import { useEffect, useState, useRef } from "react";

const KONAMI: string[] = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

const CONSOLE_ART = `
 ██████╗██╗   ██╗████████╗██╗  ██╗
██╔════╝╚██╗ ██╔╝╚══██╔══╝██║  ██║
██║      ╚████╔╝    ██║   ███████║
██║       ╚██╔╝     ██║   ██╔══██║
╚██████╗   ██║      ██║   ██║  ██║
 ╚═════╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝

 mohneesh@cyth.dev  ·  Cythical Labs
 ↑ ↑ ↓ ↓ ← → ← → B A  for a surprise
`;

export default function EasterEgg() {
  const seqRef = useRef<string[]>([]);
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");

  // Console art on mount
  useEffect(() => {
    console.log(
      `%c${CONSOLE_ART}`,
      "color: #b8965a; font-family: monospace; font-size: 10px; line-height: 1.4;"
    );
    console.log(
      "%cHello, fellow developer 👀 — view-source is always welcome here.",
      "color: #6b6862; font-family: monospace; font-size: 11px;"
    );
  }, []);

  // Konami code listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length);
      if (seqRef.current.join(",") === KONAMI.join(",")) {
        seqRef.current = [];
        setPhase("in");
        setTimeout(() => setPhase("out"), 3500);
        setTimeout(() => setPhase("idle"), 4000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (phase === "idle") return null;

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        zIndex: 9999,
        animation:
          phase === "in"
            ? "toastIn 0.35s var(--ease-out-expo) forwards"
            : "toastOut 0.3s var(--ease-out-expo) forwards",
      }}
    >
      <div
        style={{
          transform: "translateX(-50%)",
          background: "var(--surface)",
          border: "1px solid var(--accent)",
          borderRadius: "6px",
          padding: "0.9rem 1.6rem",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.08em",
          textAlign: "center",
          boxShadow: "0 0 50px rgba(184,150,90,0.12)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            background: "var(--accent)",
            borderRadius: "0 0 6px 6px",
            animation: "progressBar 3.5s linear forwards",
          }}
        />
        <div style={{ fontSize: "0.8rem", color: "var(--accent)", marginBottom: "0.2rem" }}>
          ✦ unlocked
        </div>
        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
          you found the Konami code. have a great day.
        </div>
      </div>
    </div>
  );
}
