import React, { Component } from 'react'
import axios from 'axios'
import api from '../shared/api'
import SearchItem from './search-item'

class Search extends Component {
  state = {
    contacts: [],
    search: ''
  }

  searchItems(search) {
    axios.get(`${api.url}/search/${search}`)
      .then(res => this.setState({ contacts: res.data }))
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
    if (this.state.search.length >= 3)
      this.searchItems(this.state.search)
    else
      this.setState({ contacts: [] });
  }
  render() {
    const { contacts } = this.state
    let contactList = contacts.length ? (
      contacts.map(contact =>
        <SearchItem contact={contact} key={contact.id} />
      )
    ) : (null)
    return (
      <div className="ui search">
        <div className="ui icon input">
          <input type="text"
            placeholder="Search"
            className="prompt"
            onChange={this.handleChange}
            value={this.state.search} />
          <i className="search icon" />
        </div>
        <div className="results transition visible">
          {contactList}
        </div>
      </div>
    )
  }
}
export default Search