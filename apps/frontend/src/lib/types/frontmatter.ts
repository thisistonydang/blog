export interface Frontmatter {
  layout: string | null;
  path: string | null;
  title: string | null;
  description: string | null;
  pubDate: string | null;
  tags: string[] | null;
  noindex: boolean;
  draft: boolean;
}

export interface BlogPostFrontmatter extends Frontmatter {
  layout: string;
  path: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
}
