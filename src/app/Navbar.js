import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Navbar = () => {

  return (
    <nav>
      <section className='NavContainer'>
        <h1>Redux Toolkit Query</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">User</Link>
            <Link to="/todos">Todos</Link>
            <Link to="/album">Albums</Link>
            <Link to="/photo">Photos</Link>
          </div>

        </div>
      </section>
    </nav>
  )
}
