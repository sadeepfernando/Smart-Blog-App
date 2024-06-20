import React from 'react'
import { NavLink } from 'react-router-dom'

export default function privateNavbarLinks() {
  return (
    <nav className='primary-link'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/categories'>Categories</NavLink>
        <NavLink to='/posts'>Posts</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/setting'>Setting</NavLink>
        <NavLink to='/login'>Logout</NavLink>
    </nav>
  )
}
