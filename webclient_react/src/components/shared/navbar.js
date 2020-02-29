import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="ui pointing menu fixed">
      <NavLink  className="item" exact to="/">Home</NavLink>
      <NavLink className="item" to='/list'>Kontaktliste</NavLink>
      <NavLink className="item" to='/create'>Neuer Kontakt</NavLink>
    </div>
  )
}
export default Navbar