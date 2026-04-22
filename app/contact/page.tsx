"use client";

import { useEffect, useRef, useState } from "react";
import Tooltip from "@/components/Tooltip";

const socials = [
  {
    label: "LinkedIn",
    handle: "mohneesh-naidu",
    href: "https://linkedin.com/in/mohneesh-naidu",
    note: "connect with me",
  },
  {
    label: "GitHub",
    handle: "certainlyMohneeesh",
    href: "https://github.com/certainlyMohneeesh",
    note: "see the code",
  },
  {
    label: "Email",
    handle: "mohneesh@cyth.dev",
    href: "mailto:mohneesh@cyth.dev",
    note: "fastest way to reach me",
  },
  {
    label: "Blog",
    handle: "blog.cyth.dev",
    href: "https://blog.cyth.dev",
    note: "occasional thoughts",
  },
];

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [copied, setCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("mohneesh@cyth.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const msg = msgRef.current?.value.trim();
    if (!name || !email || !msg) return;

    setFormState("sending");

    // Mailto fallback (replace with your actual form endpoint)
    const subject = encodeURIComponent(`Message from ${name} via cyth.dev`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.open(`mailto:mohneesh@cyth.dev?subject=${subject}&body=${body}`, "_blank");

    // Simulate sent state
    setTimeout(() => setFormState("sent"), 600);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    padding: "0.75rem 1rem",
    fontFamily: "var(--font-mono)",
    fontSize: "0.72rem",
    color: "var(--text)",
    outline: "none",
    transition: "border-color 0.2s ease",
    letterSpacing: "0.04em",
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "6rem" }}>
      {/* Header */}
      <section style={{ padding: "5rem 0 3.5rem" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "1.2rem" }}>
              get in touch
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
              Let&apos;s make
              <br />
              <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                something together.
              </span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
                maxWidth: "440px",
                marginTop: "1.25rem",
              }}
            >
              Whether it&apos;s a project, a collaboration, or just a hello — I&apos;m usually
              reachable within a day or two.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left: Socials + email copy */}
          <div>
            <div className="reveal" style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  color: "var(--text-subtle)",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                elsewhere
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`reveal reveal-delay-${i + 1}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem 0",
                      borderTop: "1px solid var(--border)",
                      gap: "1rem",
                      textDecoration: "none",
                      transition: "padding-left 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = "0.4rem";
                      (e.currentTarget.querySelector(".s-label") as HTMLElement).style.color =
                        "var(--text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = "0";
                      (e.currentTarget.querySelector(".s-label") as HTMLElement).style.color =
                        "var(--text-muted)";
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.16em",
                          color: "var(--accent)",
                          marginBottom: "0.15rem",
                          textTransform: "uppercase",
                        }}
                      >
                        {s.label}
                      </div>
                      <div
                        className="s-label"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                          fontWeight: 300,
                          color: "var(--text-muted)",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {s.handle}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "var(--text-subtle)",
                        letterSpacing: "0.06em",
                        maxWidth: "100px",
                        textAlign: "right",
                        lineHeight: 1.5,
                      }}
                    >
                      {s.note}
                    </span>
                  </a>
                ))}
                <div style={{ borderTop: "1px solid var(--border)" }} />
              </div>
            </div>

            {/* Email copy button */}
            <div className="reveal reveal-delay-2" style={{ marginTop: "1.5rem" }}>
              <Tooltip content={copied ? "copied!" : "click to copy"} position="top">
                <button
                  onClick={copyEmail}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: copied ? "var(--accent)" : "var(--text-muted)",
                    background: "var(--surface)",
                    border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "4px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.7rem" }}>{copied ? "✓" : "◻"}</span>
                  mohneesh@cyth.dev
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="reveal reveal-delay-1">
            {formState === "sent" ? (
              <div
                style={{
                  padding: "3rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  textAlign: "center",
                  animation: "fadeUp 0.4s var(--ease-out-expo)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 300,
                    marginBottom: "0.5rem",
                    color: "var(--accent)",
                  }}
                >
                  ✦
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    marginBottom: "0.5rem",
                  }}
                >
                  message sent
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                  }}
                >
                  I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "2rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    color: "var(--text-subtle)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  send a message
                </div>

                {/* Name */}
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      color: "var(--text-subtle)",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    name
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    required
                    placeholder="your name"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      color: "var(--text-subtle)",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    email
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      color: "var(--text-subtle)",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    message
                  </label>
                  <textarea
                    ref={msgRef}
                    required
                    placeholder="what's on your mind?"
                    rows={5}
                    style={{
                      ...inputStyle,
                      resize: "none",
                      lineHeight: 1.7,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "var(--bg)",
                    background: formState === "sending" ? "var(--accent-dim)" : "var(--accent)",
                    border: "none",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    cursor: formState === "sending" ? "not-allowed" : "pointer",
                    transition: "background 0.2s ease, transform 0.2s ease",
                    marginTop: "0.25rem",
                    alignSelf: "flex-end",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    if (formState !== "sending") {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.background = "#c9a96e";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background =
                      formState === "sending" ? "var(--accent-dim)" : "var(--accent)";
                  }}
                >
                  {formState === "sending" ? (
                    <>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          border: "1px solid rgba(0,0,0,0.3)",
                          borderTopColor: "rgba(0,0,0,0.8)",
                          borderRadius: "50%",
                          animation: "spin 0.7s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      sending...
                    </>
                  ) : (
                    "send →"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
