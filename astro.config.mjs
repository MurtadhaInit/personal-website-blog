import { defineConfig, fontProviders } from "astro/config";

// integrations
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://murtadha.dev",

  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
    },
  },

  fonts: [
    // TODO: consider changing to fontProviders.fontsource() - community-maintained mirror of Google Fonts
    {
      provider: fontProviders.google(),
      name: "Atkinson Hyperlegible Next",
      cssVariable: "--font-atkinson",
      fallbacks: ["sans-serif"],
      weights: ["200 800"],
    },
    {
      provider: fontProviders.google(),
      name: "Atkinson Hyperlegible Mono",
      cssVariable: "--font-atkinson-mono",
      fallbacks: ["ui-monospace", "monospace"],
      weights: ["200 800"], // TODO: consider selecting a single weight - reduce size
      styles: ["normal"], // we don't need italic for code sections
    },
  ],

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
          "cilium",
        ],
      },
    }),
    sitemap(),
  ],

  vite: { plugins: [tailwindcss()] },
});
