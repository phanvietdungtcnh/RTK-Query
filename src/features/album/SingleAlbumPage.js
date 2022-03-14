import React, {useMemo} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetAlbumQuery, useGetPhotosQuery } from '../api/apiSlice'

export const SingleAlbumPage = ({ match }) => {
    const { albumId } = match.params

    const { data: album, isFetching, isSuccess } = useGetAlbumQuery(albumId)

    const { data: listPhoto } = useGetPhotosQuery(undefined, {
        selectFromResult: result => {
          return ({
            ...result,
          })
        } 
    })

    const CommentById = useMemo(() => listPhoto?.filter(({albumId: photoId}) => photoId === Number(albumId), [listPhoto, albumId]))

    const photoName = CommentById?.map(photo => (
        <div key={photo?.id} className="item-photos">
            <h3><Link to={`/photo/${photo?.id}`}>{photo?.title}</Link></h3>
            <img src={photo.thumbnailUrl} alt="" />
        </div>
    ))

    let content
    if (isFetching) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        content = (
        <article className="post">
            <h2>{album.title}</h2>
        </article>
        )
    }

    return (
        <section>
            <div className="name-albums">
                <h2>Name Albums:</h2>
                {content}
            </div>
            <div className="photo-list">
                {photoName}
            </div>
        </section>
    )
}