import React from 'react';
import Contact from '../types/Contact';

const ContactItem = ({contact}: {contact: Contact}) => {
  
    return (
      <div className="item">
        <img className="ui tiny image"
            src={'img/' + contact.img} alt="Person " />
<div className="content">
  <div className="header">
  {contact.firstname} {contact.lastname}
  </div>
  <div className="description">
    <i className="envelope outline icon"></i>
    {contact.email}</div>
  <div className="meta">
    <div><i className="phone volume icon"></i> {contact.fon}</div>
    <div><i className="mobile alternate icon"></i> {contact.mobil}</div>
  </div>
</div>
      </div>
    )
  }
  
  export default ContactItem;