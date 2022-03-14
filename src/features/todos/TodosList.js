import { Spinner } from '../../components/Spinner'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useGetTodosQuery } from '../api/apiSlice'

import classnames from 'classnames'


let TodosExcerpt = ({ todo }) => {
  return (
    <article className="post-excerpt" key={todo.id}>
      <h3>{todo.title}</h3>
      <p>Status: {(todo.completed).toString()}</p>

      <Link to={`/todos/${todo.id}`} className="button muted-button">
        View Todos
      </Link>
    </article>
  )
}
TodosExcerpt = React.memo(TodosExcerpt)

export const TodosList = () => {

  const {
    data: todos = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery()

  const sortedTodos = useMemo(() => {
    const sortedTodos = todos.slice()

    return sortedTodos
  }, [todos])

  let body

  if (isLoading) {
    body = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedTodos = sortedTodos.map(todo => (
      <TodosExcerpt key={todo.id} todo={todo} />
    ))

    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })

    body = <div className={containerClassname}>{renderedTodos}</div>
  } else if (isError) {
    body = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2 className="link-label">Todos List</h2>
      {body}
    </section>
  )
}
