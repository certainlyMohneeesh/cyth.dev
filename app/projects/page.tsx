"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";

import allProjects from "@/data/projects.json";

const categories = [
  { id: "all", label: "all" },
  { id: "app", label: "apps" },
  { id: "dataviz", label: "data viz" },
  { id: "tool", label: "tools" },
  { id: "design", label: "design" },
];

export default function ProjectsPage() {
  const [active, setActive] = useState("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered =
    active === "all" ? allProjects : allProjects.filter((p) => p.category === active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "6rem" }}>
      {/* Header */}
      <section style={{ padding: "5rem 0 3.5rem" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "2rem" }}>
            <div className="section-label" style={{ marginBottom: "1.2rem" }}>
              selected work
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                maxWidth: "600px",
              }}
            >
              Things I&apos;ve
              <br />
              <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>built.</span>
            </h1>
          </div>

          {/* Category filter */}
          <div
            className="reveal reveal-delay-1"
            style={{
              display: "flex",
              gap: "0.4rem",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: active === cat.id ? "var(--bg)" : "var(--text-muted)",
                  background: active === cat.id ? "var(--accent)" : "transparent",
                  border: `1px solid ${active === cat.id ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "4px",
                  padding: "5px 14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "lowercase",
                }}
                onMouseEnter={(e) => {
                  if (active !== cat.id) {
                    e.currentTarget.style.borderColor = "var(--border-hover)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== cat.id) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="container">
        <div
          style={{
            display: "grid",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                background: hovered === project.id ? "var(--surface)" : "var(--bg)",
                transition: "background 0.25s ease",
              }}
            >
              {/* Image column */}
              <div
                style={{
                  position: "relative",
                  height: 200,
                  overflow: "hidden",
                  background: "var(--surface-2)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s var(--ease-out-expo), filter 0.3s ease",
                    transform: hovered === project.id ? "scale(1.05)" : "scale(1)",
                    filter: hovered === project.id ? "brightness(0.7)" : "brightness(0.5) saturate(0.8)",
                  }}
                />
              </div>

              {/* Content column */}
              <div
                style={{
                  padding: "2rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderLeft: "1px solid var(--border)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.5rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.18em",
                          color: "var(--accent)",
                          marginBottom: "0.3rem",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.subtitle}
                      </div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.6rem",
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                          color: "var(--text)",
                        }}
                      >
                        {project.title}
                      </h2>
                    </div>
                    <Tooltip content={`built in ${project.year}`} position="bottom">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.1em",
                          color: "var(--text-subtle)",
                          cursor: "default",
                        }}
                      >
                        {project.year}
                      </span>
                    </Tooltip>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                      marginTop: "0.75rem",
                      maxWidth: "480px",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        color: "var(--bg)",
                        background: "var(--accent)",
                        borderRadius: "4px",
                        padding: "5px 14px",
                        transition: "background 0.2s ease, transform 0.2s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#c9a96e";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--accent)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      live ↗
                    </a>
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        padding: "5px 14px",
                        transition: "color 0.2s ease, border-color 0.2s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--text)";
                        e.currentTarget.style.borderColor = "var(--border-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-muted)";
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                    >
                      source ↗
                    </a>
                    {"sourceBack" in project && (
                      <a
                        href={(project as { sourceBack?: string }).sourceBack}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                          borderRadius: "4px",
                          padding: "5px 14px",
                          transition: "color 0.2s ease, border-color 0.2s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--text)";
                          e.currentTarget.style.borderColor = "var(--border-hover)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--text-muted)";
                          e.currentTarget.style.borderColor = "var(--border)";
                        }}
                      >
                        backend ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--text-subtle)",
            }}
          >
            nothing here (yet).
          </div>
        )}
      </div>
    </div>
  );
}
