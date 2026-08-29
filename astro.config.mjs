// @ts-check

import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://atifchy.github.io",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});