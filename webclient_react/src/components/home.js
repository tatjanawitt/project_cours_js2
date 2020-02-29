import React from 'react';
import Search from './shared/search';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Dies ist eine Kontaktliste</p>
      <Link to="/list">
        <button type="button"
          className="ui violet right labeled icon button">
          Kontaktliste
          <i className="right arrow icon"></i>
        </button>
      </Link>
      <div style={{ marginTop: 10 }}></div>
      <Search />
    </div>
  )
}

export default Home;