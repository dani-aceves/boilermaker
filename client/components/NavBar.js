import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <div>
      <h1>Boilermaker</h1>
      <nav>
        <Link to = "/login">Login</Link>
        <div />
        <Link to = "/signup">Signup</Link>
      </nav>
    </div>
  )
}

export default NavBar;
