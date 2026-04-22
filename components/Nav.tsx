"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Tooltip from "@/components/Tooltip";

const links = [
  { href: "/", label: "index" },
  { href: "/blog", label: "blog" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
        background: scrolled || menuOpen ? "rgba(8, 8, 10, 0.88)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(18px) saturate(1.5)" : "none",
        borderBottom: `1px solid ${scrolled || menuOpen ? "rgba(255,255,255,0.05)" : "transparent"}`,
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
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
          >
            cyth<span style={{ color: "var(--accent)" }}>.</span>dev
          </Link>
        </Tooltip>

        {/* Center: live time — hidden on small screens */}
        <span className="nav-time">
          {time}
        </span>

        {/* Hamburger — visible only on small screens */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "none", // shown via CSS media query
          }}
        >
          <div
            style={{
              width: "18px",
              height: "12px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "1px",
                background: "var(--text-muted)",
                transition: "transform 0.25s ease, opacity 0.25s ease",
                top: menuOpen ? "5.5px" : 0,
                transform: menuOpen ? "rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "1px",
                background: "var(--text-muted)",
                top: "5.5px",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "1px",
                background: "var(--text-muted)",
                transition: "transform 0.25s ease, opacity 0.25s ease",
                top: menuOpen ? "5.5px" : "11px",
                transform: menuOpen ? "rotate(-45deg)" : "none",
              }}
            />
          </div>
        </button>

        {/* Nav links — desktop: inline, mobile: dropdown */}
        <nav className="nav-links" data-open={menuOpen ? "true" : "false"}>
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
