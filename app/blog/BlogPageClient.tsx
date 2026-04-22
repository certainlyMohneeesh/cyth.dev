"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogPostPreview } from "@/lib/types";

interface BlogPageClientProps {
  initialPosts: BlogPostPreview[];
  initialTags: string[];
}

export default function BlogPageClient({
  initialPosts,
  initialTags,
}: BlogPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  // Sync tag from URL
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setSelectedTag(tagParam);
      const filtered = initialPosts.filter((post) =>
        post.frontmatter.tags.some(
          (t) => t.toLowerCase() === tagParam.toLowerCase()
        )
      );
      setFilteredPosts(filtered);
    } else {
      setSelectedTag(null);
      setFilteredPosts(initialPosts);
    }
  }, [searchParams, initialPosts]);

  const handleTagClick = useCallback(
    (tag: string) => {
      if (selectedTag === tag) {
        setSelectedTag(null);
        setFilteredPosts(initialPosts);
        router.replace("/blog");
      } else {
        setSelectedTag(tag);
        const filtered = initialPosts.filter((post) =>
          post.frontmatter.tags.some(
            (t) => t.toLowerCase() === tag.toLowerCase()
          )
        );
        setFilteredPosts(filtered);
        router.replace(`/blog?tag=${encodeURIComponent(tag)}`);
      }
    },
    [selectedTag, initialPosts, router]
  );

  const getTagCount = (tag: string) =>
    initialPosts.filter((post) =>
      post.frontmatter.tags.some(
        (t) => t.toLowerCase() === tag.toLowerCase()
      )
    ).length;

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
  }, [filteredPosts]);

  return (
    <div className="grid-bg" style={{ minHeight: "100vh" }}>
      <section style={{ padding: "5rem 0 3rem" }}>
        <div className="container">
          {/* Header */}
          <div className="reveal" style={{ marginBottom: "2.5rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              journal
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "0.6rem",
              }}
            >
              Thoughts &amp; Writing
            </h1>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: "480px",
              }}
            >
              On engineering, creative coding, and building things that matter.
            </p>
          </div>

          {/* Tags */}
          {initialTags.length > 0 && (
            <div className="reveal reveal-delay-1" style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    color: "var(--text-subtle)",
                    textTransform: "uppercase",
                  }}
                >
                  filter by topic
                </span>
                {selectedTag && (
                  <button
                    onClick={() => handleTagClick(selectedTag)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.08em",
                      color: "var(--accent)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    clear ×
                  </button>
                )}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {initialTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`tag tag-clickable ${selectedTag === tag ? "tag-active" : ""}`}
                    style={{
                      background:
                        selectedTag === tag
                          ? "rgba(184, 150, 90, 0.08)"
                          : undefined,
                    }}
                  >
                    {tag}
                    <span
                      style={{
                        marginLeft: "0.3rem",
                        opacity: 0.5,
                        fontSize: "0.5rem",
                      }}
                    >
                      {getTagCount(tag)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div
            className="reveal reveal-delay-1"
            style={{ borderTop: "1px solid var(--border)", marginBottom: "0.5rem" }}
          />

          {/* Posts header */}
          <div
            className="reveal reveal-delay-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "0.25rem",
              marginTop: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                color: "var(--text-subtle)",
                textTransform: "uppercase",
              }}
            >
              {selectedTag ? `tagged "${selectedTag}"` : "all posts"}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "var(--text-subtle)",
                letterSpacing: "0.08em",
              }}
            >
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {/* Post list */}
          {filteredPosts.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filteredPosts.map((post, i) => {
                const formattedDate = new Date(
                  post.frontmatter.date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`blog-row reveal reveal-delay-${Math.min(i + 2, 5)}`}
                  >
                    <span className="blog-row-title">
                      {post.frontmatter.title}
                    </span>
                    <div className="blog-row-meta">
                      {post.frontmatter.readTime && (
                        <span>{post.frontmatter.readTime}</span>
                      )}
                      <span>{formattedDate}</span>
                    </div>
                  </Link>
                );
              })}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          ) : (
            <div
              className="reveal reveal-delay-2"
              style={{
                textAlign: "center",
                padding: "4rem 0",
                borderTop: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                No posts found
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-subtle)",
                }}
              >
                No posts tagged &ldquo;{selectedTag}&rdquo; yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
