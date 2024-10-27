import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { filterPosts } from "@utils/utils.ts";
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const allPosts = await getCollection("blog");
  const filteredPosts = filterPosts(allPosts);

  return rss({
    // trailingSlash: false,
    title: "Murtadha's Blog",
    description: "A personal blog about software, tech, and other interests",
    site: context.site!, //could be improved if Astro detects that undefined is impossible if site is configured in Astro config
    items: filteredPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
      // author: post.data.author
    })),
    customData: `<language>en-us</language>`,
    stylesheet: "/rss/pretty-feed-v3.xsl"
  });
}