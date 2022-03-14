import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectPostById } from './postsSlice'

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery, useGetCommentsQuery } from '../api/apiSlice'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
//import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params

    const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

    const { data: listComments } = useGetCommentsQuery(undefined, {
        selectFromResult: result => {
          return ({
            ...result,
          })
        } 
    })

    const CommentById = useMemo(() => listComments?.filter(({postId: commentId}) => commentId === Number(postId), [listComments, postId]))

    const commentName = CommentById?.map(comment => (
        <div key={comment?.id} className="item-comments">
          <h2>{comment?.name}</h2>
          <p>{comment?.email}</p>
          <p>{comment?.body}</p>
        </div>
    ))
    
    let content
    if (isFetching) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        content = (
        <article className="post">
            <h2>{post.title}</h2>
            <div>
            <PostAuthor userId={post.id} />
            <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.body}</p>
         
            <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
            </Link>
        </article>
        )
    }

    return (
        <section>
            <div>
                {content}
            </div>
            <div className="comments">
                <h3>Comments</h3>
                {commentName}
            </div>
        </section>
    )
}