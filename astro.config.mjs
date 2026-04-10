import { defineConfig } from "astro/config";

// integrations
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://murtadha.dev",

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
        mdi: ["github", "linkedin", "email", "tailwind"],
        "devicon-plain": [
          "javascript",
          "typescript",
          "astro",
          "ansible",
          "figma",
          "jupyter-wordmark",
          "python",
          "githubactions",
          "terraform",
          "go",
          "nixos",
          "svelte",
          "kubernetes",
          "talos",
          "grafana",
        ],
        "simple-icons": [
          "nushell",
          "bluesky",
          "x",
          "helm",
          "flux",
          "caddy",
          "prometheus",
          "mysql",
          "proxmox",
          "linux",
        ],
      },
    }),
    sitemap(),
    react(),
  ],

  vite: { plugins: [tailwindcss()] },
});
