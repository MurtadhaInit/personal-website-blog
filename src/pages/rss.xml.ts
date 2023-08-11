// library imports
import rss from "@astrojs/rss";

// utils imports
import { filterPosts } from "@js/utils";

// component imports
import { CollectionEntry, getCollection } from "astro:content";

export async function get(context) {
  const allPosts = await getCollection("blog");
  const filteredPosts: CollectionEntry<"blog">[] = filterPosts(allPosts);
  return rss({
    title: "Murtadha's Blog",
    description: "A blog about everything tech, programming, and beyond",
    site: context.site,
    stylesheet: "/rss/styles.xsl",
    items: filteredPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      customData: `
        <author>${post.data.author}</author>
        `,
    })),
  });
}
