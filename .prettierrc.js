/** @type {import("prettier").Config} */
export default {
  astroAllowShorthand: true,
  // prettier-plugin-tailwindcss must be loaded last
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
