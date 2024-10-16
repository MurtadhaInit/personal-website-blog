/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: {
          dark: {
            fill: "#18181B",
            "fill-muted": "#252529",
            text: "#F4F4F5",
            "text-muted": "#838389",
            accent: "#59AA9D",
          },
          light: {
            fill: "#FFFFFF",
            "fill-muted": "#E2E2E2",
            text: "#27262A",
            "text-muted": "#55545A",
            accent: "#5BB7A8",
          },
        },
      },
    },
  },
  plugins: [],
};
