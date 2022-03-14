import { Spinner } from '../../components/Spinner'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useGetPhotosQuery } from '../api/apiSlice'

import classnames from 'classnames'


let PhotoExcerpt = ({ photo }) => {
  return (
    <article className="post-excerpt" key={photo.id}>
      <h3>{photo.title}</h3>
      <img src={photo.thumbnailUrl} alt="" />

      <Link to={`/photo/${photo.id}`} className="button muted-button">
        View Photo
      </Link>
    </article>
  )
}
PhotoExcerpt = React.memo(PhotoExcerpt)

export const PhotoList = () => {

  const {
    data: photo = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPhotosQuery()

  const sortedPhoto = useMemo(() => {
    const sortedPhoto = photo.slice()

    return sortedPhoto
  }, [photo])

  let body

  if (isLoading) {
    body = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPhoto = sortedPhoto.map(photo => (
      <PhotoExcerpt key={photo.id} photo={photo} />
    ))

    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })

    body = <div className={containerClassname}>{renderedPhoto}</div>
  } else if (isError) {
    body = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2 className="link-label">Photo List</h2>
      {body}
    </section>
  )
}
