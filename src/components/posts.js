export default (posts, { text, pagination }) => {
  const {
    pageNumber,
    itemsPerPage
  } = pagination;
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  
  if (!text) return { posts: posts.slice(start, end), matching: null };

  const filteredPosts = posts && posts
    .filter((p) => p.title.includes(text));
  return { posts: filteredPosts.length < start ? filteredPosts : filteredPosts.slice(start, end), matching: filteredPosts };
};
