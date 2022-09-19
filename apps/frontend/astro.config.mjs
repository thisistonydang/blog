import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://tonydang.blog",
  server: {
    port: 3000,
  },
  integrations: [svelte(), mdx(), tailwind()],
});
