import { Spinner } from '../../components/Spinner'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useGetAlbumsQuery } from '../api/apiSlice'

import classnames from 'classnames'


let AlbumExcerpt = ({ album }) => {
  return (
    <article className="post-excerpt" key={album.id}>
      <h3>{album.title}</h3>

      <Link to={`/album/${album.id}`} className="button muted-button">
        View Album
      </Link>
    </article>
  )
}
AlbumExcerpt = React.memo(AlbumExcerpt)

export const AlbumList = () => {

  const {
    data: album = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlbumsQuery()

  const sortedAlbum = useMemo(() => {
    const sortedAlbum = album.slice()

    return sortedAlbum
  }, [album])

  let body

  if (isLoading) {
    body = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedAlbum = sortedAlbum.map(album => (
      <AlbumExcerpt key={album.id} album={album} />
    ))

    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })

    body = <div className={containerClassname}>{renderedAlbum}</div>
  } else if (isError) {
    body = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2 className="link-label">Albums List</h2>
      {body}
    </section>
  )
}
