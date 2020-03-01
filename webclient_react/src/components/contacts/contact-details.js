import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteContact } from '../../store/actions/contact-actions'
import axios from 'axios'
import api from '../shared/api'
import LoadingSpinner from '../shared/loading-spinner'


class ContactDetails extends Component {
  state = {
    id: null
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`${api.url}/${id}`)
      .then(res => this.setState({ id, contact: res.data }))
      .catch(err => console.log(err))
  }

  deleteContact(){
    if (window.confirm(
      'Soll der Kontakt wirklich gelöscht werden?'
    )) {
      this.props.deleteContact(this.state.id)
      this.props.history.push('/')
    }    
  }

  render() {
    const { contact } = this.state
    return ((!contact) ? (
      <LoadingSpinner />
    ) : (
      <div className="ui segment">
        <div className="ui link cards" style={{ marginTop: 10 }}>
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
          <div className="ui center aligned segment">
            <button style={{ marginRight: 20 }}
              className="ui red labeled icon button"
              onClick={ () => this.deleteContact() }>
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
      </div>
    )
  )}
}
const mapDispatchToProps = dispatch => {
  return {
    deleteContact: (id) => dispatch(deleteContact(id))
  }
}
export default connect(null, mapDispatchToProps)(ContactDetails);