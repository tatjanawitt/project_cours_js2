import React, { Component } from 'react'
import ContactListItem from './contact-list-item'
import Contact from '../../types/Contact'
import LoadingSpinner from '../shared/loading-spinner'
import { getContacts } from '../shared/request-to-api'

interface State {
  contacts: Contact[]
}
export default class ContactList extends Component<{}, State> {
  state = {
    contacts: []
  }

  public async componentDidMount(): Promise<void> {
    try {
      const res = await getContacts();
      if (res && res.data && res.data.length)
        this.setState({ contacts: res.data })
      else throw Error('Keine Daten von Api');
    } catch (err) { console.log(`😱 Api Request Fehler: ${err}`) }
  }

  public render() {
    const { contacts } = this.state
    const contactList = contacts && contacts.length
      ? contacts.map((contact: Contact) =>
        <ContactListItem contact={contact} key={contact.id} />)
      : null
    return (
      contactList ? (
        <div className="ui segment">
          <div className="project-list section">
            <div className="ui middle aligned selection divided list">
              {contactList}
            </div>
          </div>
        </div>
      ) : <LoadingSpinner />
    )
  }
}