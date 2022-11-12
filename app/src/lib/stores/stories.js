import { writable, derived } from "svelte/store";



const { set, subscribe, update } = writable({
  story: [],
});

const createStory = () => {
  return {
    subscribe,
    addStory: (data) => set({ story: data }),
    addPost: (data) => update((p) => ({ story: [data, ...p.story] })),
    removePost: (postId) =>
      update((p) => {
        let filterPost = p.posts.filter((p) => p._id != postId);
        return {
          posts: filterPost,
        };
      }),
    updatePost: (post) =>
      update((p) => {
        let filteredPosts = p.posts.map((n) => {
          if (n._id == post._id) {
            return post;
          }
          return n;
        });
        return {
          posts: filteredPosts,
        };
      }),
  };
};



export const story = createStory();
