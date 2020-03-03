import React, { Component } from 'react'
import axios from 'axios'
import api from '../shared/api'
import ContactListItem from './contact-list-item'
import Contact from '../../types/Contact'
import LoadingSpinner from '../shared/loading-spinner'


interface State {
  contacts: Contact[]
}
export default class ContactList extends Component<{}, State> {
  state = {
    contacts: []
  }

  public componentDidMount() {
    axios.get(api.url).then(
      res => this.setState({ contacts: res.data })
    ).catch(err => console.log(err))
  }

  public render() {
    const { contacts } = this.state
    const contactList = contacts && contacts.length 
      ? contacts.map((contact: Contact) =>
        <ContactListItem contact={contact} key={contact.id} />
      )
      :  null 
    return (
      contactList ? (
        <div className="ui segment">
          <div className="project-list section">
            <div className="ui middle aligned selection divided list">
              { contactList }
            </div>
          </div>
        </div>
      ) : <LoadingSpinner />
    )
  }
}