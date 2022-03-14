import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => [
        'Post',
        ...result.map(({ id }) => ({ type: 'Post', id }))
      ]
    }),
    getPost: builder.query({
      query: postId => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }]
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: initialPost
      }),
      invalidatesTags: ['Post']
    }),
    editPost: builder.mutation({
      query: post => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    //Get To do list
    getTodos: builder.query({
      query: () => '/todos',
      providesTags: (result = [], error, arg) => [
        'Todos',
        ...result.map(({ id }) => ({ type: 'Todos', id }))
      ]
    }),
    getTodo: builder.query({
      query: todoId => `/todos/${todoId}`,
      providesTags: (result, error, arg) => [{ type: 'Todos', id: arg }]
    }),

    //Get Photo
    getPhotos: builder.query({
      query: () => '/photos',
      providesTags: (result = [], error, arg) => [
        'Photos',
        ...result.map(({ id }) => ({ type: 'Photo', id }))
      ]
    }),
    getPhoto: builder.query({
      query: photoId => `/photos/${photoId}`,
      providesTags: (result, error, arg) => [{ type: 'Photo', id: arg }]
    }),

    //Get Albums
    getAlbums: builder.query({
      query: () => '/albums',
      providesTags: (result = [], error, arg) => [
        'Albums',
        ...result.map(({ id }) => ({ type: 'Album', id }))
      ]
    }),
    getAlbum: builder.query({
      query: albumId => `/albums/${albumId}`,
      providesTags: (result, error, arg) => [{ type: 'Album', id: arg }]
    }),

    //Get Comments
    getComments: builder.query({
      query: () => '/comments',
      providesTags: (result = [], error, arg) => [
        'Comments',
        ...result.map(({ id }) => ({ type: 'Comment', id }))
      ]
    }),
    getComment: builder.query({
      query: commentId => `/comments/${commentId}`,
      providesTags: (result, error, arg) => [{ type: 'Comment', id: arg }]
    }),

    async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        apiSlice.util.updateQueryData('getPosts', undefined, draft => {
          const post = draft.find(post => post.id === postId)
          if (post) {
            post.reactions[reaction]++
          }
        })
      )
      try {
        await queryFulfilled
      } catch {
        patchResult.undo()
      }
    }
  })
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
  useGetTodosQuery,
  useGetTodoQuery,
  useGetPhotosQuery,
  useGetPhotoQuery,
  useGetAlbumsQuery,
  useGetAlbumQuery,
  useGetCommentsQuery,
  useGetCommentQuery,
} = apiSlice