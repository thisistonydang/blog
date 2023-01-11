import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import remarkToc from "remark-toc";

export default defineConfig({
  site: "https://tonydang.blog",
  server: { port: 3000 },
  integrations: [
    svelte(),
    image({ logLevel: "debug", serviceEntryPoint: "@astrojs/image/sharp" }),
    mdx({ remarkPlugins: [remarkToc] }),
    partytown(),
    prefetch(),
    sitemap({
      filter: (page) =>
        ![
          "/list/unsubscribe/success",
          "/list/verify/expired",
          "/list/verify/success",
          "/sandbox",
          "/support/successful-one-time-donation",
          "/whoops",
        ].includes(page.slice(21, -1)),
    }),
    tailwind({ config: { applyBaseStyles: false } }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["postgres"],
    },
  },
});
