import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

import compress from "astro-compress";
import remarkToc from "remark-toc";

const PROD = true;
const integrations = () => (PROD ? [compress()] : []);

// https://astro.build/config
export default defineConfig({
  site: "https://tonydang.blog",
  server: { port: 3000 },
  integrations: [
    svelte(),
    image({ logLevel: "debug", serviceEntryPoint: "@astrojs/image/sharp" }),
    mdx({ remarkPlugins: [remarkToc] }),
    tailwind({ config: { applyBaseStyles: false } }),
    ...integrations(),
  ],
});
