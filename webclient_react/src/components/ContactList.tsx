import React from 'react';
import ContactItem from './ContactItem';
import Contact from '../types/Contact';

const ContactList = ({contacts}: { contacts: Contact[]}) => {
    return (
      <div className="project-list section">
        <div className="ui middle aligned selection divided list">
      { contacts && contacts.map(contact => {
        return (          
            <ContactItem contact={contact} key={contact.id} />
        )
      })}
      </div>
    </div>
    )
}
export default ContactList;