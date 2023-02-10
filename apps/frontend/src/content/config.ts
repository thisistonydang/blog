import { z, defineCollection } from "astro:content";

export const collections = {
  posts: defineCollection({
    schema: z.object({
      layout: z.string(),
      path: z.string(),
      title: z.string(),
      description: z.string(),
      image: z.boolean(),
      alt: z.string(),
      pubDate: z.date(),
      tags: z.array(z.string()),
      noindex: z.boolean(),
      draft: z.boolean(),
    }),
  }),
};
