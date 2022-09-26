import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3001,
  },
  output: "server",
  adapter: cloudflare(),
});
