"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Tooltip from "@/components/Tooltip";

const links = [
  { href: "/", label: "index" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        }) + " IST"
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "60px",
        display: "flex",
        alignItems: "center",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(8, 8, 10, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.5)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.05)" : "transparent"}`,
      }}
    >
      <div
        className="container"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <Tooltip content="go home" position="bottom">
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.05rem",
              fontWeight: 300,
              letterSpacing: "0.12em",
              color: "var(--text)",
              opacity: 0.85,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
          >
            cyth<span style={{ color: "var(--accent)" }}>.</span>dev
          </Link>
        </Tooltip>

        {/* Center: live time */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: "var(--text-subtle)",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            userSelect: "none",
          }}
        >
          {time}
        </span>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  color: active ? "var(--accent)" : "var(--text-muted)",
                  textTransform: "lowercase",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {active && (
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
