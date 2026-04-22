import { BlogFrontmatter } from "@/lib/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeShiki from "@shikijs/rehype";

import { BlogMDXComponents } from "./BlogMDXComponents";
import { ReadingProgress } from "./ReadingProgress";
import { BackToTop } from "./BackToTop";

interface BlogArticleProps {
  frontmatter: BlogFrontmatter;
  content: string;
}

export function BlogArticle({ frontmatter, content }: BlogArticleProps) {
  const { title, description, tags, date, readTime } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ReadingProgress />
      <article>
        {/* Header */}
        <header style={{ marginBottom: "3rem" }}>
          {/* Back link */}
          <a
            href="/blog"
            className="hover-line"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2.5rem",
            }}
          >
            ← journal
          </a>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "1rem",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            {description}
          </p>

          {/* Meta row: date + read time + tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            <time
              dateTime={date}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.08em",
                color: "var(--text-subtle)",
              }}
            >
              {formattedDate}
            </time>
            {readTime && (
              <>
                <span
                  style={{
                    color: "var(--text-subtle)",
                    fontSize: "0.5rem",
                  }}
                >
                  ·
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    color: "var(--text-subtle)",
                  }}
                >
                  {readTime}
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {tags.map((tag) => (
              <a
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                className="tag"
                style={{ textDecoration: "none" }}
              >
                {tag}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginTop: "2rem",
            }}
          />
        </header>

        {/* MDX Content */}
        <div className="prose-blog">
          <MDXRemote
            source={content}
            components={BlogMDXComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypeShiki,
                    {
                      theme: "github-dark",
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
      <BackToTop />
    </>
  );
}
