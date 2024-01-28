import { defineConfig } from "astro/config";

// integrations
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://murtadha.net",
  integrations: [
    sitemap(),
    tailwind({
      // disable injecting a basic `base.css` import on every page
      // use a single global CSS file instead (for configuration)
      applyBaseStyles: false,
    }),
    react(),
  ],
});
