import React, { Component } from 'react'
import axios from 'axios'
import api from '../shared/api'
import SearchItem from './search-item'
import Contact from '../../types/Contact'

interface State {
  contacts: Contact[],
  search: string
}
export default class Search extends Component<{}, State> {
  state = {
    contacts: [],
    search: ''
  }

  searchItems(search: string) {
    axios.get(`${api.url}/search/${search}`).then(
      res => this.setState({ contacts: res.data })
    ).catch(err => console.log(err))
  }

  handleChange = (e: any) => {
    this.setState({ search: e.target.value });
    if (this.state.search.length >= 3)
      this.searchItems(this.state.search)
    else
      this.setState({ contacts: [] });
  }

  public render() {
    const { contacts } = this.state
    const { search } = this.state
    const foundContacts = contacts && contacts.length 
      ? (
        <div className="results transition visible">
          {
            contacts.map(
              (contact: Contact) =>
              <SearchItem contact={contact} key={contact.id} />
            )
          }
        </div>
      ) : null
    return (
      <div className={`ui search ${
          (search.length > 0 &&  search.length < 4) && 'loading'
        }`}>
        <div className="ui icon input">
          <input type="text"
            placeholder="Search"
            className="prompt"
            onChange={ this.handleChange }
            value={ search } />
          <i className="search icon" />
        </div>        
          { foundContacts }        
      </div>
    )
  }
}