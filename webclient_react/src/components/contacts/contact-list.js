import React from 'react';
import ContactListItem from './contact-list-item';

const ContactList = ({ contacts }) => {
  return (
    <div className="project-list section">
      <p>no data</p>
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