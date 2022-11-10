import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
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
    prefetch(),
    sitemap({
      filter: (page) =>
        page !== "https://tonydang.blog/list/unsubscribe/success/" &&
        page !== "https://tonydang.blog/list/verify/expired/" &&
        page !== "https://tonydang.blog/list/verify/success/" &&
        page !==
          "https://tonydang.blog/support/successful-one-time-donation/" &&
        page !== "https://tonydang.blog/whoops/",
    }),
    tailwind({ config: { applyBaseStyles: false } }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["postgres"],
    },
  },
});
