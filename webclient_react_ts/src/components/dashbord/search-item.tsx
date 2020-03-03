import React from 'react'
import { Link } from 'react-router-dom'
import Contact from '../../types/Contact'

const SearchItem = ({ contact }: { contact: Contact }) => {  
  return (
    <Link to={
      {
        pathname: '/get/' + contact.id,
        state: { fromNotifications: true }
      }
    } className="result">
      {contact.firstname} {contact.lastname}
      <p className="description">
        {contact.postcode} {contact.place}</p>
    </Link>
  )
}
export default SearchItem;