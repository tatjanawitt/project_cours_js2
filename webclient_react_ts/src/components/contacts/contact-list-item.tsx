import React from 'react'
import Contact from '../../types/Contact'
import { Link } from 'react-router-dom'

const ContactListItem = ({ contact }: { contact: Contact }) => {
  return (
    <Link to={
      {
        pathname:'/get/' + contact.id, 
        state: { fromNotifications: true }
      }
    } className="item">
      <img className="ui tiny image"
        src={ contact.img.includes('http') 
          ? contact.img 
          : 'http://localhost:3001/img/' + contact.img } 
        alt="Person" />
      <div className="content">
        <div className="header">
          { contact.firstname } { contact.lastname }
        </div>
        <div className="description">
          <i className="envelope outline icon" />
          { contact.email }
        </div>
        <div className="meta">
          <div>
            <i className="phone volume icon" /> 
            { contact.fon }
          </div>
          <div>
            <i className="mobile alternate icon" />
            { contact.mobil }
          </div>
        </div>
      </div>
    </Link>
  )
}
export default ContactListItem;