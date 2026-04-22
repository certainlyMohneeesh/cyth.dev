"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import Accordion, { AccordionItemData } from "@/components/Accordion";

import projectsData from "@/data/projects.json";
import experienceData from "@/data/experience.json";

/* ─── Data ──────────────────────────────────────────────── */
const experience: AccordionItemData[] = experienceData.work.map((item) => ({
  id: item.id,
  trigger: (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.15rem",
            fontWeight: 400,
            color: "var(--text)",
          }}
        >
          {item.company}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: item.duration.includes("PRESENT") ? "var(--accent)" : "var(--text-muted)",
            letterSpacing: "0.12em",
          }}
        >
          {item.duration}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--text-muted)",
          marginTop: "0.2rem",
          letterSpacing: "0.06em",
        }}
      >
        {item.role}
      </div>
    </div>
  ),
  content: (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      {item.bullets.map((pt, i) => (
        <li
          key={i}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            paddingLeft: "1rem",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              color: item.duration.includes("PRESENT") ? "var(--accent)" : "var(--text-subtle)",
              fontSize: "0.5rem",
              top: "0.3rem",
            }}
          >
            ▶
          </span>
          {pt}
        </li>
      ))}
      {item.link && (
        <li style={{ marginTop: "0.5rem" }}>
          <a
            href={item.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-line"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--accent)",
              letterSpacing: "0.08em",
            }}
          >
            {item.link.label}
          </a>
        </li>
      )}
    </ul>
  ),
}));

const featuredProjects = projectsData.filter((p) => p.featured);


const recentPosts = [
  {
    slug: "how-a-simple-assignment-became-a-full-stack-automated-system",
    title:
      "How A Simple Assignment Became A Full-Stack Automated System",
    date: "Nov 4, 2025",
    readTime: "8 min",
  },
  {
    slug: "hypnotic-rings-crafting-a-mouse-following-concentric-circles-animation",
    title: "Hypnotic Rings: Mouse-Following Concentric Circles in React",
    date: "May 31, 2025",
    readTime: "5 min",
  },
  {
    slug: "building-a-movie-social-platform",
    title: "Building a Movie Social Platform",
    date: "Apr 26, 2025",
    readTime: "6 min",
  },
];

/* ─── Profile image with animated reveal ────────────────── */
function ProfileImage() {
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [egg, setEgg] = useState(false);

  const handleClick = () => {
    const next = clicked + 1;
    setClicked(next);
    if (next >= 5) {
      setEgg(true);
      setClicked(0);
      setTimeout(() => setEgg(false), 3000);
    }
  };

  return (
    <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}>
      {/* Architectural border frame — draws on load */}
      <svg
        viewBox="0 0 160 160"
        style={{
          position: "absolute",
          inset: -8,
          width: "calc(100% + 16px)",
          height: "calc(100% + 16px)",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <rect
          x="4" y="4"
          width="152" height="152"
          rx="4"
          fill="none"
          stroke="rgba(184,150,90,0.35)"
          strokeWidth="1"
          strokeDasharray="400"
          style={{
            animation: loaded
              ? "borderDraw 1.2s var(--ease-out-expo) 0.3s forwards"
              : "none",
            strokeDashoffset: 400,
          }}
        />
      </svg>

      {/* Loading placeholder */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--surface-2)",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              border: "1px solid var(--border-hover)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      )}

      {/* The actual image — clip-path reveal */}
      <Tooltip content={egg ? "✦ surprise!" : "click me 5x"} position="bottom">
        <div
          onClick={handleClick}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "4px",
            overflow: "hidden",
            cursor: "pointer",
            animation: loaded ? "imageReveal 0.9s var(--ease-out-expo) forwards" : "none",
            clipPath: loaded ? undefined : "inset(0 100% 0 0 round 4px)",
            position: "relative",
          }}
        >
          {/* Scan line effect on reveal */}
          {loaded && (
            <div
              style={{
                position: "absolute",
                inset: "0 auto 0 -2px",
                width: "3px",
                background:
                  "linear-gradient(transparent, rgba(184,150,90,0.6), transparent)",
                animation: "imageScan 0.9s var(--ease-out-expo) forwards",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          )}

          <Image
            src="https://res.cloudinary.com/dj3dp0ccy/image/upload/f_auto/q_auto/v1776790797/mohneeshphoto_x0qjek.png"
            alt="Mohneesh"
            width={160}
            height={160}
            style={{ objectFit: "cover", filter: egg ? "hue-rotate(180deg)" : "none", transition: "filter 0.4s ease" }}
            onLoad={() => setLoaded(true)}
            priority
          />
        </div>
      </Tooltip>

      {/* Egg toast */}
      {egg && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--surface)",
            border: "1px solid var(--accent)",
            borderRadius: "4px",
            padding: "4px 12px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--accent)",
            whiteSpace: "nowrap",
            animation: "fadeUp 0.3s var(--ease-out-expo)",
            zIndex: 10,
          }}
        >
          ✦ happy exploring!
        </div>
      )}
    </div>
  );
}

/* ─── Project card ──────────────────────────────────────── */
function ProjectCard({ project }: { project: (typeof featuredProjects)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: 180,
          background: "var(--surface-2)",
          overflow: "hidden",
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s var(--ease-out-expo)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        <div className="overlay" />

        {/* Links appear on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 2,
          }}
        >
          {[
            { href: project.live, label: "live ↗" },
            { href: project.source, label: "source ↗" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                color: "var(--text)",
                background: "rgba(8,8,10,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "4px",
                padding: "5px 12px",
                backdropFilter: "blur(8px)",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "var(--text)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: "1.1rem 1.2rem 1.25rem" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            color: "var(--accent)",
            marginBottom: "0.35rem",
            textTransform: "uppercase",
          }}
        >
          {project.subtitle}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            fontWeight: 400,
            marginBottom: "0.5rem",
            color: "var(--text)",
          }}
        >
          {project.title}
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: "0.9rem",
          }}
        >
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="grid-bg" style={{ minHeight: "100vh" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "6rem",
          paddingBottom: "6rem",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: "3rem",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* Profile image */}
            <div style={{ animation: "fadeIn 0.6s ease forwards" }}>
              <ProfileImage />
            </div>

            {/* Bio */}
            <div style={{ flex: 1, minWidth: 280 }}>
              {/* Location + pronouns */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  marginBottom: "1rem",
                  animation: "fadeUp 0.5s ease 0.1s both",
                }}
              >
                <Tooltip content="Mumbai, India 🇮🇳">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      cursor: "default",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem" }}>🇮🇳</span>
                    india
                  </span>
                </Tooltip>
                <span style={{ color: "var(--text-subtle)", fontSize: "0.6rem" }}>·</span>
                <Tooltip content="he/him">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      cursor: "default",
                    }}
                  >
                    he/him
                  </span>
                </Tooltip>
              </div>

              {/* Name */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.2rem",
                  animation: "fadeUp 0.6s ease 0.15s both",
                }}
              >
                Mohneesh
                <span
                  style={{ color: "var(--text-muted)", fontStyle: "italic", marginLeft: "0.4rem" }}
                >
                  Naidu
                </span>
              </h1>

              {/* Role */}
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  animation: "fadeUp 0.6s ease 0.2s both",
                  flexWrap: "wrap",
                }}
              >
                {["Full Stack Developer", "Founder @ Cythical Labs"].map((r, i) => (
                  <span
                    key={r}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: i === 0 ? "var(--accent)" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {i > 0 && (
                      <span style={{ color: "var(--text-subtle)", fontSize: "0.55rem" }}>·</span>
                    )}
                    {r}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.85,
                  maxWidth: "520px",
                  marginBottom: "2rem",
                  animation: "fadeUp 0.6s ease 0.25s both",
                }}
              >e
                23-year-old{" "}
                <Tooltip content="okay maybe a little bit 🍳">
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "var(--text-subtle)",
                      cursor: "default",
                    }}
                  >
                    wannabe cook
                  </span>
                </Tooltip>{" "}
                software developer. Building innovative web solutions to bring your ideas to life.
                Whether it's designing sleek interfaces or robust backend systems — I transform
                visions into reality{" "}
                <span style={{ color: "var(--text-subtle)", fontStyle: "italic" }}>
                  (some exaggeration may apply)
                </span>
                .
              </div>

              {/* CTA links */}
              <div
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                  animation: "fadeUp 0.6s ease 0.3s both",
                }}
              >
                {[
                  { href: "/Mohneesh_resume.pdf", label: "resume", external: false },
                  {
                    href: "https://linkedin.com/in/mohneesh-naidu",
                    label: "linkedin",
                    external: true,
                  },
                  {
                    href: "https://github.com/certainlyMohneeesh",
                    label: "github",
                    external: true,
                  },
                  {
                    href: "mailto:mohneesh@cyth.dev",
                    label: "email",
                    external: false,
                  },
                ].map((item, i) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: i === 0 ? "var(--bg)" : "var(--text-muted)",
                      background: i === 0 ? "var(--accent)" : "transparent",
                      border: `1px solid ${i === 0 ? "var(--accent)" : "var(--border)"}`,
                      borderRadius: "4px",
                      padding: "7px 16px",
                      transition:
                        "color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      if (i === 0) {
                        el.style.background = "#c9a96e";
                        el.style.transform = "translateY(-1px)";
                      } else {
                        el.style.color = "var(--text)";
                        el.style.borderColor = "var(--border-hover)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      if (i === 0) {
                        el.style.background = "var(--accent)";
                        el.style.transform = "translateY(0)";
                      } else {
                        el.style.color = "var(--text-muted)";
                        el.style.borderColor = "var(--border)";
                      }
                    }}
                  >
                    {item.label}
                    {item.external ? " ↗" : ""}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider line */}
      <div
        className="container"
        style={{ borderTop: "1px solid var(--border)", margin: "0 auto" }}
      />

      {/* ── Experience ───────────────────────────────────── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "2.5rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              experience
            </div>
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--border)" }}>
              {(["work", "education"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    color: activeTab === tab ? "var(--text)" : "var(--text-muted)",
                    background: "none",
                    border: "none",
                    borderBottom: `2px solid ${activeTab === tab ? "var(--accent)" : "transparent"}`,
                    padding: "0.6rem 1.2rem 0.6rem 0",
                    cursor: "pointer",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                    marginBottom: "-1px",
                    textTransform: "lowercase",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            {activeTab === "work" ? (
              <Accordion items={experience} defaultOpen="machastore" />
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {experienceData.education.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1.5rem 0",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        color: "var(--text)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {edu.degree}
                    </div>
                    <div style={{ color: "var(--text-muted)", marginBottom: "0.2rem" }}>
                      {edu.institution} · {edu.period}
                    </div>
                    <div style={{ color: "var(--text-subtle)", fontSize: "0.65rem" }}>
                      {edu.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="container"
        style={{ borderTop: "1px solid var(--border)", margin: "0 auto" }}
      />

      {/* ── Featured Projects ─────────────────────────────── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div className="section-label">featured projects</div>
            <Link
              href="/projects"
              className="hover-line"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
              }}
            >
              view all →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {featuredProjects.map((project, i) => (
              <div
                key={project.id}
                className={`reveal reveal-delay-${i + 1}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="container"
        style={{ borderTop: "1px solid var(--border)", margin: "0 auto" }}
      />

      {/* ── Recent Posts ─────────────────────────────────── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div className="section-label">recent posts</div>
            <a
              href="https://blog.cyth.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-line"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
              }}
            >
              all posts ↗
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {recentPosts.map((post, i) => (
              <a
                key={post.slug}
                href={`https://blog.cyth.dev/posts/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  padding: "1.1rem 0",
                  borderTop: "1px solid var(--border)",
                  gap: "1rem",
                  flexWrap: "wrap",
                  textDecoration: "none",
                  transition: "padding-left 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = "0.5rem";
                  (e.currentTarget.querySelector(".post-title") as HTMLElement).style.color =
                    "var(--text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = "0";
                  (e.currentTarget.querySelector(".post-title") as HTMLElement).style.color =
                    "var(--text-muted)";
                }}
              >
                <span
                  className="post-title"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "var(--text-muted)",
                    flex: 1,
                    minWidth: 200,
                    transition: "color 0.2s ease",
                  }}
                >
                  {post.title}
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      color: "var(--text-subtle)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {post.readTime}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      color: "var(--text-subtle)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {post.date}
                  </span>
                </div>
              </a>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2.5rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--text-subtle)",
              letterSpacing: "0.08em",
            }}
          >
            © 2026 cyth.dev
          </span>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { href: "https://linkedin.com/in/mohneesh-naidu", label: "li" },
              { href: "https://github.com/certainlyMohneeesh", label: "gh" },
              { href: "mailto:mohneesh@cyth.dev", label: "em" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-subtle)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Hidden easter egg hint */}
          <Tooltip content="↑ ↑ ↓ ↓ ← → ← → B A" position="top">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "var(--text-subtle)",
                cursor: "default",
                letterSpacing: "0.08em",
              }}
            >
              there&apos;s a surprise here...
            </span>
          </Tooltip>
        </div>
      </footer>
    </div>
  );
}
