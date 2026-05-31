"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import projectsData from "@/data/projects.json";

const categories = [{ id: "all", label: "all" }];

const projects = projectsData.projects;

export default function ProjectsPage() {
  const [active, setActive] = useState("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = projects;

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
              key={project.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}
              onMouseEnter={() => setHovered(project.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                background: hovered === project.name ? "var(--surface)" : "var(--bg)",
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
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s var(--ease-out-expo), filter 0.3s ease",
                    transform: hovered === project.name ? "scale(1.05)" : "scale(1)",
                    filter: hovered === project.name ? "brightness(0.7)" : "brightness(0.5) saturate(0.8)",
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
                        {project.tags?.[0]}
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
                        {project.name}
                      </h2>
                    </div>
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
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          color: link.name.toLowerCase().includes("live") ? "var(--bg)" : "var(--text-muted)",
                          background: link.name.toLowerCase().includes("live") ? "var(--accent)" : "transparent",
                          border: link.name.toLowerCase().includes("live") ? "1px solid var(--accent)" : "1px solid var(--border)",
                          borderRadius: "4px",
                          padding: "5px 14px",
                          transition: "border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          if (link.name.toLowerCase().includes("live")) {
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.background = "#c9a96e";
                          } else {
                            e.currentTarget.style.color = "var(--text)";
                            e.currentTarget.style.borderColor = "var(--border-hover)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          if (link.name.toLowerCase().includes("live")) {
                            e.currentTarget.style.background = "var(--accent)";
                          } else {
                            e.currentTarget.style.color = "var(--text-muted)";
                            e.currentTarget.style.borderColor = "var(--border)";
                          }
                        }}
                      >
                        {link.name.toLowerCase()} ↗
                      </a>
                    ))}
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
