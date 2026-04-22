export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  isPublished: boolean;
  readTime?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface BlogPostPreview {
  slug: string;
  frontmatter: BlogFrontmatter;
}
