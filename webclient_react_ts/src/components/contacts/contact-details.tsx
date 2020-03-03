import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import axios from 'axios'
import api from '../shared/api'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../shared/loading-spinner'

import Contact from '../../types/Contact'

interface Props extends RouteComponentProps<{id: string}> {}
interface State {
  contact: Contact,
  id: string
}

export default class ContactDetails extends Component<Props, State> {
 
  public componentDidMount() { 
    const { id } = this.props.match.params
    axios.get(`${api.url}/${id}`).then(
      res => this.setState({ id, contact: res.data })
    ).catch(err => console.log(err))
  }

  public deleteContact() {
    if (window.confirm(
      'Soll der Kontakt wirklich gelöscht werden?'
    )) {
      console.log(this.state.id)
      axios({
        url: `${api.url}/${this.state.id}`,
        method: 'delete'
      }).then(
        res => this.props.history.push('/list')
      ).catch(err => console.log(err))
    }    
  }

  public render() {
    const contact: Contact  = this.state && this.state.contact
    return ((!contact) ? (
      <LoadingSpinner />
    ) : (
      <div className="ui segment">
        <div className="ui cards" style={{ marginTop: 10 }}>
          <div className="card">
            <div className="image">
              <img src={ contact.img.includes('http') 
                ? contact.img 
                : 'http://localhost:3001/img/' + contact.img } 
                alt="Person" />
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
