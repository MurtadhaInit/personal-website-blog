import { defineConfig } from "astro/config";

// integrations
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://murtadha.net",
  // experimental status is set for the Assets API (optimised images): https://docs.astro.build/en/guides/assets/
  experimental: {
    assets: true,
  },
  integrations: [sitemap(), tailwind()],
});
