import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="ui top fixed menu">
      <NavLink  className="item" exact to="/">Home</NavLink>
      <NavLink className="item" to='/list'>Kontaktliste</NavLink>
      <NavLink className="item" to='/create'>Neuer Kontakt</NavLink>
    </div>
  )
}