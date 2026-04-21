// library imports
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

// TODO: validate against the rssScheme
// import { rssSchema } from "@astrojs/rss";
// schema: rssSchema.extends({ extraProperty: z.string() }),

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/blog" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(60),
        date: z.date(),
        updatedDate: z.date().optional(),
        author: z.string().default("Murtadha A."),
        cover: image(),
        coverAlt: z.string(),
        description: z
          .string()
          .max(
            160,
            "for best SEO results, keep description under 160 characters",
          ),
        draft: z.boolean().default(false),
        category: z.string(),
        tags: z.array(z.string()),
      })
      .refine((data) => !data.updatedDate || data.updatedDate >= data.date, {
        message: "updatedDate must be on or after date",
        path: ["updatedDate"],
      }),
});

export const collections = {
  blog,
};
