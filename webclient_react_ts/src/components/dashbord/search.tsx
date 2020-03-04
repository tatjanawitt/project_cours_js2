import React, { Component, ChangeEvent } from 'react'
import { findContacts } from '../shared/request-to-api'
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

  private async searchItems(search: string): Promise<void> {
    try {
      const res = await findContacts(search)
      if (res && res.data && res.data.length)
        this.setState({ contacts: res.data })
      else throw Error('Keine Daten von Api')
    } catch (err) { console.log(`😱 Api Request Fehler: ${err}`) }
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: e.target.value })
    this.state.search.length >= 3
      ? this.searchItems(this.state.search)
      : this.setState({ contacts: [] })
  }

  public render() {
    const { contacts, search } = this.state
    const foundContacts = contacts && contacts.length ?
      (
        <div className="results transition visible"> {
          contacts.map((contact: Contact) =>
            <SearchItem contact={contact} key={contact.id} />)
        } </div>
      ) : null
    return (
      <div className={`ui search ${
        (search.length > 0 && search.length < 4) && 'loading'
        }`}>
        <div className="ui icon input">
          <input type="text"
            placeholder="Search"
            className="prompt"
            onChange={this.handleChange}
            value={search} />
          <i className="search icon" />
        </div>
        {foundContacts}
      </div>
    )
  }
}