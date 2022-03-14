  import React, { useMemo } from 'react'
  import { useSelector } from 'react-redux'
  import { Link } from 'react-router-dom'
  import { createSelector } from '@reduxjs/toolkit'

  import { selectUserById } from '../users/usersSlice'
  import { useGetPostsQuery } from '../api/apiSlice'

  export const UserPage = ({ match }) => {
      const { userId } = match.params

      const user = useSelector(state => selectUserById(state, userId))


      // const selectPostsForUser = useMemo(() => {
      //   const emptyArray = []
      //   // Return a unique selector instance for this page so that
      //   // the filtered results are correctly memoized
      //   return createSelector(
      //     res => res.data,
      //     (res, userId) => userId,
      //     (data, userId) => data?.filter(post => post.user === userId) ?? emptyArray
      //   )
      // }, [])

      const { data: listPosts } = useGetPostsQuery(undefined, {
        selectFromResult: result => {
          return ({
            ...result,
            // postsForUser: selectPostsForUser(result, Number(userId))
          })
        } 
      })

      const postByUserId = useMemo(() => listPosts?.filter(({userId: postId}) => postId === Number(userId), [listPosts, userId]))

      const postTitles = postByUserId?.map(post => (
        <article key={post?.id} className="post-excerpt">
          <h3>{post.title}</h3>
          <p className="post-content">{post.body.substring(0, 100)}</p>
          <Link to={`/posts/${post?.id}`} className="button muted-button">
            View Post
          </Link>
        </article>
      ))

      return (
        <section>
          <h2>Author Name: {user?.name}</h2>
    
          <div className="posts-container">{postTitles}</div>
        </section>
      )
  }