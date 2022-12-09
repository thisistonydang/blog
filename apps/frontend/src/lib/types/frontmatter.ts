export interface Frontmatter {
  layout: string | null;
  path: string | null;
  title: string;
  description: string;
  image: boolean;
  alt: string;
  pubDate: string | null;
  tags: string[] | null;
  noindex: boolean;
  draft: boolean;
}

export interface BlogPostFrontmatter extends Frontmatter {
  layout: string;
  path: string;
  pubDate: string;
  tags: string[];
}
