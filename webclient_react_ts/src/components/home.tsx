import React from 'react';
import Search from './shared/search';

const Home = () => {

  return (
    <div>
      <h1>Home</h1>
      <p>Dies ist eine Kontaktliste</p>
      <div className="ui segments">
        <a className="ui violet right labeled icon button">
          Kontaktliste
          <i className="right arrow icon"></i>
        </a>
        <Search />
      </div>
    </div>
  )
}

export default Home;