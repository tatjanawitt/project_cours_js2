import React from 'react'
import Search from './search'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="ui segment">
      <h1>Home</h1>
      <p>Dies ist eine Kontaktliste</p>
      <Link to="/list">
        <button type="button"
          className="ui violet right labeled icon button">
          Kontaktliste
          <i className="right arrow icon"></i>
        </button>
      </Link>
      <div style={{ marginTop: 20 }}></div>
      <h1>Suche</h1>
      <Search />
    </div>
  )
}

export default Home;