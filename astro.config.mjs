import { defineConfig } from "astro/config";

// integrations
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://murtadha.net",
  integrations: [sitemap(), tailwind()],
});
