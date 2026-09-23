import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import a11yEmoji from "@fec/remark-a11y-emoji";
import remarkToc from "remark-toc";

import glsl from "vite-plugin-glsl";

export default defineConfig({
  site: "https://tonydang.com",
  server: { port: 3000 },
  integrations: [
    react(),
    svelte(),
    mdx({ remarkPlugins: [a11yEmoji, remarkToc] }),
    prefetch(),
    sitemap({
      filter: (page) =>
        ![
          "/auth/callback",
          "/list/unsubscribe/success",
          "/list/verify/expired",
          "/list/verify/success",
          "/sandbox",
          "/support/successful-one-time-donation",
          "/whoops",
        ].includes(new URL(page).pathname.replace(/\/$/, "")),
    }),
    tailwind({ config: { applyBaseStyles: false } }),
  ],
  vite: {
    envDir: "../..",
    optimizeDeps: {
      exclude: ["postgres"],
    },
    plugins: [glsl()],
  },
  compressHTML: true,
});
