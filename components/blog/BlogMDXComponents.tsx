import Image from "next/image";
import React from "react";

import { CodeCopyButton } from "./CodeCopyButton";

/* ─── Helper: extract raw text from React nodes ─────── */
function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (
    React.isValidElement(node) &&
    node.props &&
    typeof node.props === "object"
  ) {
    return getTextContent(
      (node.props as { children?: React.ReactNode }).children
    );
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }
  return "";
}

/* ─── Helper: slugify a heading for anchor links ───── */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type PropsWithChildren = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const BlogMDXComponents = {
  img: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <Image
      src={src}
      alt={alt}
      width={680}
      height={380}
      style={{ borderRadius: "4px", maxWidth: "100%", height: "auto" }}
      {...props}
    />
  ),

  h1: ({ children, ...props }: PropsWithChildren) => (
    <h1 {...props}>{children}</h1>
  ),

  h2: ({ children, ...props }: PropsWithChildren) => {
    const text = getTextContent(children);
    const id = slugify(text);
    return (
      <h2 id={id} {...props}>
        {children}
        <a href={`#${id}`} className="heading-anchor" aria-hidden="true">
          #
        </a>
      </h2>
    );
  },

  h3: ({ children, ...props }: PropsWithChildren) => {
    const text = getTextContent(children);
    const id = slugify(text);
    return (
      <h3 id={id} {...props}>
        {children}
        <a href={`#${id}`} className="heading-anchor" aria-hidden="true">
          #
        </a>
      </h3>
    );
  },

  p: ({ children, ...props }: PropsWithChildren) => (
    <p {...props}>{children}</p>
  ),

  ul: ({ children, ...props }: PropsWithChildren) => (
    <ul {...props}>{children}</ul>
  ),

  ol: ({ children, ...props }: PropsWithChildren) => (
    <ol {...props}>{children}</ol>
  ),

  li: ({ children, ...props }: PropsWithChildren) => (
    <li {...props}>{children}</li>
  ),

  pre: ({ children, ...props }: PropsWithChildren) => {
    const codeText = getTextContent(children);
    return (
      <div className="code-block-wrapper">
        <pre {...props}>{children}</pre>
        <CodeCopyButton code={codeText} />
      </div>
    );
  },

  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code {...props}>
        {children}
      </code>
    );
  },

  blockquote: ({ children, ...props }: PropsWithChildren) => (
    <blockquote {...props}>{children}</blockquote>
  ),

  a: ({
    href,
    children,
    ...props
  }: {
    href?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
};
