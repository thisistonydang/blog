import { z, defineCollection } from "astro:content";

const page_schema = {
  title: z.string().max(60),
  description: z.string().max(160),
  image: z.boolean().default(false),
  alt: z.string().default(""),
  noindex: z.boolean().default(false),
  draft: z.boolean().default(true),
};

const post_schema = {
  ...page_schema,
  pubDate: z.date(),
  tags: z.array(z.string()),
};

export const collections = {
  pages: defineCollection({ schema: z.object(page_schema) }),
  posts: defineCollection({ schema: z.object(post_schema) }),
  projects: defineCollection({ schema: z.object(page_schema) }),
};
