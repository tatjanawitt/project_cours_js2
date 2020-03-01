import React, { Component } from 'react';
import axios from 'axios';
import LoadingSpinner from '../shared/loading-spinner'
import { Link } from 'react-router-dom'

class ContactDetails extends Component {
  state = {
    id: null
  }
  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`http://localhost:3000/api/contacts/${id}`)
      .then(res => this.setState({ contact: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { contact } = this.state
    return ((!contact) ? (
      <LoadingSpinner />
    ) : (
      <div className="ui link cards">
        <div className="card">
          <div className="image">
            <img src={'http://localhost:3001/img/' + contact.img} alt="Person" />
          </div>
          <div className="content">
            <div className="header">
              <i className="address card outline icon" />
              {contact.firstname} {contact.lastname}
            </div>
            <div className="meta">
              <span className="right floated">
                <i className="phone volume icon" />
                {contact.fon}
              </span>
              <span>
                <i className="mobile alternate icon" />
                {contact.mobil}
              </span>
            </div>
            <div className="description">
              {contact.street}<br />
              {contact.postcode} {contact.place}
            </div>
          </div>
          <div className="extra content">
            <span className="right floated">
              <i className="birthday cake icon" />
              {contact.born}
            </span>
            <span>
              <i className="envelope outline icon" />
              {contact.email}
            </span>
          </div>
        </div>
        <div className="ui center aligned segment" style={{ width: '100%' }}>
          <button style={{ marginRight: 20 }}
            className="ui red labeled icon button">
            <i className="trash icon" /> Kontakt löschen
        </button>
          <Link to={
            {
              pathname: '/edit/' + contact.id,
              state: { fromNotifications: true }
            }
          }>
            <button className="ui violet labeled icon button">
              <i className="write icon" /> Kontakt bearbeiten
          </button>
          </Link>
        </div>
      </div>
    )
  )}
}

export default ContactDetails;