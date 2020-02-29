import React from 'react';
import ContactListItem from './contact-list-item';
import Contact from '../../model/Contact';

const ContactList = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <div className="project-list section">
      <div className="ui middle aligned selection divided list">
        {contacts && contacts.map(contact => {
          return (
            <ContactListItem contact={contact} key={contact.id} />
          )
        })}
      </div>
    </div>
  )
}
export default ContactList;