import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

const posts = await getCollection("posts", ({ data }) => {
  return data.draft !== true;
});

posts.sort(
  (a, b) =>
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
);

export const get: APIRoute = () =>
  rss({
    title: "Tony Dang",
    description: "Tony Dang’s Blog",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: post.slug,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: "/rss/styles.xsl",
  });
