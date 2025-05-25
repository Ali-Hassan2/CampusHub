import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <div>
      <div class="nav">
       <h4> <Link to="/">Home</Link></h4>
       <h4> <Link to="/about">About</Link></h4>
       <h4> <Link to="/Blogs">Blogs</Link></h4>
      </div>
    </div>
  )
}

export default Navbar
