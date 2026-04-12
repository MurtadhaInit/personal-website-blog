import { filterPosts } from "@utils/utils";
import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const allPosts = await getCollection("blog");
const posts = filterPosts(allPosts);

const pages: Record<string, { title: string; description: string }> = {
  site: {
    title: "Murtadha",
    description: "My personal website and blog",
  },
  ...Object.fromEntries(posts.map((entry) => [entry.id, entry.data])),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages: pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: "./src/icons/logo-dark.png",
    },
    bgGradient: [[24, 24, 27]],
    border: {
      color: [89, 170, 157],
      width: 20,
      side: "inline-start",
    },
    font: {
      title: {
        size: 64,
        color: [244, 244, 245],
        weight: "Bold",
        families: ["Atkinson Hyperlegible Next"],
      },
      description: {
        size: 40,
        color: [131, 131, 137],
        families: ["Atkinson Hyperlegible Next"],
      },
    },
    fonts: [
      "https://cdn.jsdelivr.net/fontsource/fonts/atkinson-hyperlegible-next@latest/latin-700-normal.woff2",
      "https://cdn.jsdelivr.net/fontsource/fonts/atkinson-hyperlegible-next@latest/latin-400-normal.woff2",
    ],
  }),
});
