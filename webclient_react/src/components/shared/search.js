import React from 'react';

const Search = () => {

  return (
    <div className="ui search">
    <div className="ui icon input">
      <input type="text" 
        placeholder="Search"
        className="prompt"/>
      <i className="search icon"></i>
    </div>
  </div>
  )
}

export default Search;