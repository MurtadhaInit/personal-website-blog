import { defineConfig } from "astro/config";

// integrations
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://murtadha.site",

  integrations: [
    icon({
      include: {
        "line-md": [
          "sunny-outline-to-moon-loop-transition",
          "moon-filled-to-sunny-filled-loop-transition",
          "close-to-menu-alt-transition",
          "menu-to-close-alt-transition",
          "home",
          "chevron-small-double-right",
          "chevron-small-double-left",
          "rss",
        ],
        mdi: ["twitter", "github", "linkedin", "email", "tailwind"],
        "devicon-plain": [
          "javascript",
          "typescript",
          "astro",
          "java",
          "ansible",
          "bash",
          "docker",
          "fastapi",
          "figma",
          "jupyter-wordmark",
          "python",
          "githubactions",
          "linux",
          "terraform",
          "notion",
          "go",
        ],
        "simple-icons": ["nushell"],
      },
    }),
    sitemap(),
    react(),
  ],

  vite: { plugins: [tailwindcss()] },
});
