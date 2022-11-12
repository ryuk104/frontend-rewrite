import { writable, derived } from "svelte/store";



const { set, subscribe, update } = writable({
  posts: [],
});

   /*
export const postsApi = baseApi.injectEndpoints({
  
	endpoints: (builder) => ({
		postList: builder.query<Post[], void>({
			query: () => ({
				url: '/posts',
				method: 'GET'
			}),
			providesTags: ['PostList']
		}),
 
		postDetails: builder.query<Post, string>({
			query: (postId) => ({
				url: `/posts/${postId}`,
				method: 'GET'
			}),
			providesTags: ['PostDetails']
		}),
		postLikeList: builder.query<Like[], string>({
			query: (postId) => ({
				url: `/posts/${postId}/likes`,
				method: 'GET'
			}),
			providesTags: ['PostLikeList']
		}),
		hasLikedPost: builder.query<boolean, string>({
			query: (postId) => ({
				url: `/posts/${postId}/hasLiked`,
				method: 'GET'
			}),
			providesTags: ['PostLikeList']
		}),
		postLike: builder.mutation<unknown, string>({
			query: (postId) => ({
				url: `/posts/${postId}/likes`,
				method: 'POST'
			}),
			invalidatesTags: ['PostDetails', 'PostLikeList', 'PostList', 'PostsByProfile']
		}),
		postCreate: builder.mutation<Post, CreatePost>({
			query: (body) => ({
				url: `/posts`,
				method: 'POST',
				body
			}),
			invalidatesTags: (res) => ['PostList', { type: 'PostsByProfile', id: res.userId }]
		}),
		postDelete: builder.mutation<Post, string>({
			query: (postId) => ({
				url: `/posts/${postId}`,
				method: 'DELETE'
			}),
			invalidatesTags: (res) => ['PostList', { type: 'PostsByProfile', id: res.userId }]
		}),
		uploadPhoto: builder.mutation<Post, Blob>({
			query: (imageBlob) => {
				const formData = new FormData();

				formData.append('file', imageBlob);

				return {
					url: `/posts/upload`,
					method: 'POST',
					body: formData
				};
			}
		})
	}),
	overrideExisting: false

});
  */

const createPost = () => {
  return {
    subscribe,
    addPosts: (data) => set({ posts: data }),
    addPost: (data) => update((p) => ({ posts: [data, ...p.posts] })),
    addMorePosts: (data) => update((p) => ({ posts: [...p.posts, ...data] })),
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



export const post = createPost();
/*
export const {
	postList,
	hasLikedPost,
	postLike,
	postDetails,
	postLikeList,
	postCreate,
	postDelete,
	uploadPhoto
} = postsApi.endpoints;
*/