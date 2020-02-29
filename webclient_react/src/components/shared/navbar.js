import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="ui pointing menu fixed">
      <span className="item"><NavLink exact to="/">Home</NavLink></span>
      <span className="item"><NavLink to='/contacts'>Kontaktliste</NavLink></span>
      <span className="item"><NavLink to='/create'>Neuer Kontakt</NavLink></span>
    </div>
  )
}
export default Navbar