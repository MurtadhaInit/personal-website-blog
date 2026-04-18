import { defineConfig, fontProviders } from "astro/config";

// Astro integrations
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// Vite plugins
import tailwindcss from "@tailwindcss/vite";

// Shiki syntax highlighting transformers
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://murtadha.dev",

  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      transformers: [
        // https://shiki.style/packages/transformers
        transformerNotationDiff({ matchAlgorithm: "v3" }),
        transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
        transformerNotationFocus({ matchAlgorithm: "v3" }),
        transformerNotationHighlight({ matchAlgorithm: "v3" }),
      ],
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
          "longhorn",
          "prometheus",
          "mysql",
          "proxmox",
          "linux",
          "cilium",
        ],
      },
    }),
    mdx(),
    sitemap(),
  ],

  vite: { plugins: [tailwindcss()] },
});
