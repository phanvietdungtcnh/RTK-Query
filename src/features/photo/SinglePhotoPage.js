import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetPhotoQuery } from '../api/apiSlice'

export const SinglePhotoPage = ({ match }) => {
    const { photoId } = match.params

    const { data: photo, isFetching, isSuccess } = useGetPhotoQuery(photoId)

    let content
    if (isFetching) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        content = (
        <article className="post">
            <h2>{photo.title}</h2>
            <img src={photo.url} alt="" className="img" />
        </article>
        )
    }

    return <section>{content}</section>
}