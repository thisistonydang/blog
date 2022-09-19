import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://tonydang.blog",
  server: {
    port: 3000,
  },
  integrations: [mdx()],
});
