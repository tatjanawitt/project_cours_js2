import React from 'react';
import Search from './shared/search';

const Home = () => {

  return (
    <div>
      <h1>Home</h1>
      <p>Dies ist eine Kontaktliste</p>  
        <a href="!#" className="ui violet right labeled icon button">
          Kontaktliste
          <i className="right arrow icon"></i>
        </a>
        <Search />
    </div>
  )
}

export default Home;