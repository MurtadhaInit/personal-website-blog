// library imports
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// TODO: validate against the rssScheme
// import { rssSchema } from "@astrojs/rss";
// schema: rssSchema.extends({ extraProperty: z.string() }),

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      date: z.date(),
      author: z.string().default("Murtadha A."),
      cover: image(),
      coverAlt: z.string().default("Blog post cover image"),
      description: z
        .string()
        .max(
          160,
          "For best SEO results, keep description under 160 characters.",
        ),
      draft: z.boolean(),
      category: z.string(),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  blog,
};
