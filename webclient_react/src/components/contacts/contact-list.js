import React, { Component } from 'react';
import axios from 'axios';
import ContactListItem from './contact-list-item';
import LoadingSpinner from '../shared/loading-spinner'

class ContactList extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    axios.get('http://localhost:3000/api/contacts')
      .then(res => this.setState({ contacts: res.data }))
      .catch(err => console.log(err))
  }
  render() {
    const { contacts } = this.state
    const contactList = contacts.length ? (
      contacts.map(contact =>
        <ContactListItem contact={contact} key={contact.id} />
      )
    ) : (
        <LoadingSpinner />
    )
    return (
      <div className="project-list section">
        <div className="ui middle aligned selection divided list">
          { contactList }
        </div>
      </div>
    )
  }
}
export default ContactList;