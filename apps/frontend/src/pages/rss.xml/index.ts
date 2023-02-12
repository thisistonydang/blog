import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

const entries = await getCollection("posts", ({ data }) => {
  return data.draft === false;
});

entries.sort(
  (a, b) =>
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
);

export const get: APIRoute = () =>
  rss({
    title: "Tony Dang",
    description: "Tony Dang’s Blog",
    site: import.meta.env.SITE,
    items: entries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.pubDate,
      description: entry.data.description,
      link: entry.slug,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: "/rss/styles.xsl",
  });
