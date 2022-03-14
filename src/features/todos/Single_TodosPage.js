import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetTodoQuery } from '../api/apiSlice'

export const SingleTodosPage = ({ match }) => {
    const { todoId } = match.params

    const { data: todo, isFetching, isSuccess } = useGetTodoQuery(todoId)

    let content
    if (isFetching) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        content = (
            <article className="post">
                <h2>{todo.title}</h2>
                <p>Status: {(todo.completed).toString()}</p>
            </article>
        )
    }

    return <section>{content}</section>
}