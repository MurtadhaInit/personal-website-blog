// library imports
import { defineCollection, z } from "astro:content";

// data imports
import tags from "@data/blogTags";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      date: z.date(),
      author: z.enum(["Murtadha Abdulhussein"]),
      image: z.object({
        src: image(),
        alt: z.string().default("Blog Post Image"),
      }),
      description: z
        .string()
        .max(
          160,
          "For best SEO results, keep description under 160 characters."
        ),
      draft: z.boolean(),
      category: z.string(),
      tags: z.array(z.enum(tags)),
    }),
});

export const collections = {
  blog: blog,
};
