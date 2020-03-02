import React, { Component } from 'react'
import axios from 'axios'
import api from '../shared/api'
import ContactListItem from './contact-list-item'
import LoadingSpinner from '../shared/loading-spinner'


class ContactList extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    axios.get(api.url)
      .then(res => this.setState({ contacts: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { contacts } = this.state
    let contactList = contacts && contacts.length ? (
      contacts.map(contact =>
        <ContactListItem contact={contact} key={contact.id} />
      )
    ) : ( null )
    return (
      (contactList) ? (
        <div className="ui segment">
          <div className="project-list section">
            <div className="ui middle aligned selection divided list">
              { contactList }
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )
    )
  }
}
export default ContactList;