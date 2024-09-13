import type { CollectionEntry } from "astro:content";

/**
 * Turn a string into a slug.
 *
 * @param text Text to be turned into a slug.
 * @return A slug
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

/** Return a filtered list of posts according to specified criteria.
 *
 * @param posts The input list of posts
 * @param criteria Options to filter blog posts by
 * @returns Filtered list of posts
 */
export const filterPosts = (
  posts: CollectionEntry<"blog">[],
  {
    noDrafts = true,
    noFuturePosts = true,
    sortByDate = true,
    limit = null,
  }: {
    noDrafts?: boolean;
    noFuturePosts?: boolean;
    sortByDate?: boolean;
    limit?: number | null;
  } = {},
): CollectionEntry<"blog">[] => {
  const filteredPosts = posts
    // filter out drafts
    .filter((post) => {
      if (noDrafts) {
        return !post.data.draft;
      } else {
        return true;
      }
    })
    // filter out future posts
    .filter((post) => {
      if (noFuturePosts) {
        return post.data.date <= new Date();
      } else {
        return true;
      }
    });

  // sort by date or randomise
  if (sortByDate) {
    filteredPosts.sort((a, b) => {
      return +b.data.date - +a.data.date;
    });
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit by number if applicable (including 0)
  if (limit !== null) {
    return filteredPosts.slice(0, limit);
  } else {
    return filteredPosts;
  }
};

/**
 * Return a list of related posts according to their relevancy
 * (i.e. number of common tags with the original post)
 *
 * @param originalPost The post to generate a related posts list for
 * @param allPosts The collection of all posts
 * @returns A list of mappings representing each post and its associated relevancy
 */
export const getRelatedPosts = (
  originalPost: CollectionEntry<"blog">,
  allPosts: CollectionEntry<"blog">[],
): {
  score: number;
  post: CollectionEntry<"blog">;
}[] => {
  return allPosts.reduce(
    (
      relatedPosts: { score: number; post: CollectionEntry<"blog"> }[],
      post,
    ) => {
      // exclude the original post from the list
      if (post.id === originalPost.id) return relatedPosts;

      // calculate the relevancy of the post compared to the original
      const score = originalPost.data.tags.reduce((score, tag) => {
        if (post.data.tags.includes(tag)) {
          score += 1;
          return score;
        }
        return score;
      }, 0);

      // exclude posts with zero score (no common tags)
      if (score === 0) return relatedPosts;

      // add the related post to the list
      relatedPosts.push({ score: score, post: post });
      return relatedPosts;
    },
    [],
  );
};

/**
 * @param posts A list of blog posts to extract the categories from
 * @return A list of all unique categories extracted from posts
 */
export const getAllCategories = (
  posts: CollectionEntry<"blog">[],
): string[] => {
  return [...new Set(posts.map((post) => post.data.category))];
};
