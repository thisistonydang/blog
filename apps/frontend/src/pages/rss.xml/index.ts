import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import type { BlogPostFrontmatter, Frontmatter } from "@lib/types/frontmatter";

// Get array of all mdx pages.
const pages = Object.values(
  import.meta.glob<{ frontmatter: Frontmatter }>("../../**/*.mdx", {
    eager: true,
  })
);

// Get only pages that are blog posts and aren't in draft mode.
const non_draft_posts = pages.filter(
  (page) =>
    page.frontmatter.layout === "@layouts/blog-post/BlogPostLayout.astro" &&
    page.frontmatter.draft === false &&
    page.frontmatter.path !== "/sandbox"
);

// Get blog post rss data sorted in reverse chronlogical order.
const posts = (non_draft_posts as { frontmatter: BlogPostFrontmatter }[])
  .map((post) => ({
    link: post.frontmatter.path,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    pubDate: new Date(post.frontmatter.pubDate),
  }))
  .sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

export const get: APIRoute = () =>
  rss({
    title: "Tony Dang",
    description: "Tony Dang’s Blog",
    site: import.meta.env.SITE,
    items: posts,
    customData: `<language>en-us</language>`,
    stylesheet: "/rss/styles.xsl",
  });
