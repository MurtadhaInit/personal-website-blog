import { CollectionEntry } from "astro:content";

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function filterPosts(
  posts,
  {
    noDrafts = true,
    noFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) {
  // filter out drafts and/or future posts
  const filteredPosts = posts.reduce((filteredPosts, post) => {
    const { draft, date } = post.data;

    // don't include post based on filters
    if (noDrafts && draft) return filteredPosts;
    if (noFuturePosts && date > new Date()) return filteredPosts;

    // include the post
    filteredPosts.push(post);

    return filteredPosts;
  }, []);

  // sort by date or randomise
  if (sortByDate) {
    filteredPosts.sort((a, b) => b.data.date - a.data.date);
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit by number if applicable
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  } else {
    return filteredPosts;
  }
}

/**
 * Return a list of related posts according to their relevancy (number of common tags with the original post)
 * @param {CollectionEntry<"blog">} originalPost The post to generate related posts list for
 * @param {CollectionEntry<"blog">[]} allPosts The collection of all posts
 * @returns {{score: number, post: CollectionEntry<"blog">}[]} A list of mappings representing each post and its associated relevancy
 */
export const getRelatedPosts = function (originalPost, allPosts) {
  const relatedPosts = allPosts.reduce((relatedPosts, post) => {
    // exclude the original post from the list
    if (post.id === originalPost.id) return relatedPosts;

    // calculate the relevancy of the post compared to the original
    const score = originalPost.data.tags.reduce((score, tag) => {
      if (post.data.tags.includes(tag)) return (score += 1);
      return score;
    }, 0);

    // exclude posts with zero score (no common tags)
    if (score === 0) return relatedPosts;

    // add the related post to the list
    relatedPosts.push({ score: score, post: post });
    return relatedPosts;
  }, []);

  return relatedPosts;
};
