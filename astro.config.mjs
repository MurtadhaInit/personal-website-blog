import { defineConfig } from "astro/config";

// integrations
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://murtadha.net",
  integrations: [
    icon({
      include: {
        tabler: ["rss", "arrow-big-left-line", "arrow-big-right-line"],
        "line-md": [
          "sunny-outline-to-moon-loop-transition",
          "moon-filled-to-sunny-filled-loop-transition",
          "close-to-menu-alt-transition",
          "menu-to-close-alt-transition",
        ],
        mdi: ["twitter", "github", "linkedin", "email"],
      },
    }),
    sitemap(),
    tailwind({
      // disable injecting a basic `base.css` import on every page
      // use a single global CSS file instead (for configuration)
      applyBaseStyles: false,
    }),
    react(),
  ],
});
