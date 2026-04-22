import { Metadata } from "next";
import { Suspense } from "react";
import { getPublishedBlogPosts, getAllTags } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Journal — Mohneesh",
  description:
    "Thoughts, tutorials, and insights on engineering, full-stack development, and creative coding.",
  openGraph: {
    title: "Journal — Mohneesh",
    description:
      "Thoughts, tutorials, and insights on engineering, full-stack development, and creative coding.",
    url: "https://cyth.dev/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const allPosts = getPublishedBlogPosts();
  const allTags = getAllTags();

  return (
    <Suspense>
      <BlogPageClient initialPosts={allPosts} initialTags={allTags} />
    </Suspense>
  );
}
