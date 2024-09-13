import type { CollectionEntry } from "astro:content";

/**
 * @param posts A list of blog posts to extract the tags from
 * @return A list of all unique tags extracted from posts
 */
export const getAllTags = (posts: CollectionEntry<"blog">[]) => {
  return [...new Set(posts.map((post) => post.data.tags).flat())];
};

/**
 * Map each tag to the number of posts it is associated with
 *
 * @param tags A list of tags to process
 * @param posts A list of blog posts to process
 * @param limit The number of mappings to return
 * @return A list of mappings from tag to number of posts it occurs in, sorted randomly
 */
export const tagsToNumberOfPosts = (
  tags: CollectionEntry<"blog">["data"]["tags"],
  posts: CollectionEntry<"blog">[],
  limit?: number,
) => {
  return tags
    .map((tag) => {
      // all posts associated with a tag
      const tagPosts = posts.filter((post) => post.data.tags.includes(tag));
      return {
        tag: tag,
        posts: tagPosts.length,
      };
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};
