import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPostSlugs, getRelatedPosts } from "@/lib/blog";
import { BlogArticle } from "@/components/blog/BlogArticle";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ─── Generate static paths for all blog posts ──────── */
export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ─── Generate metadata for each blog post ──────────── */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    return { title: "Post Not Found" };
  }

  const { title, description } = post.frontmatter;

  return {
    title: `${title} — Mohneesh`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://cyth.dev/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ─── Blog Post Page ────────────────────────────────── */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <div className="grid-bg" style={{ minHeight: "100vh" }}>
      <section style={{ padding: "4rem 0 5rem" }}>
        <div className="container">
          <BlogArticle frontmatter={post.frontmatter} content={post.content} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: "4rem" }}>
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "2rem",
                }}
              >
                <div
                  className="section-label"
                  style={{ marginBottom: "1.5rem" }}
                >
                  related posts
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {relatedPosts.map((rp) => {
                    const formattedDate = new Date(
                      rp.frontmatter.date
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="blog-row"
                      >
                        <span className="blog-row-title">
                          {rp.frontmatter.title}
                        </span>
                        <div className="blog-row-meta">
                          {rp.frontmatter.readTime && (
                            <span>{rp.frontmatter.readTime}</span>
                          )}
                          <span>{formattedDate}</span>
                        </div>
                      </Link>
                    );
                  })}
                  <div style={{ borderTop: "1px solid var(--border)" }} />
                </div>
              </div>
            </div>
          )}

          {/* Back to blog CTA */}
          <div
            style={{
              textAlign: "center",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <Link
              href="/blog"
              className="cta-button"
            >
              view all posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
