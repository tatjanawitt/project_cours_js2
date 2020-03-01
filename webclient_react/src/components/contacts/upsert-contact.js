import React, { Component } from 'react'
import axios from 'axios';
import api from '../shared/api'
import { connect } from 'react-redux'
import { createContact, editContact } from '../../store/actions/contact-actions'

class UpsertContact extends Component {
  state = {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    postcode: '',
    place: '',
    fon: '',
    mobil: '',
    born: '',
    img: 'people.jpg'
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (!id) return
    axios.get(`${api.url}/${id}`)
      .then(res => this.setState({ ...res.data, contact: res.data }))
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.id) delete this.state['id']
    this.props.upsertContact(this.state)
    this.props.history.push('/')
  }

  handleClose = () => {
    this.props.history.push('/list')
  }

  render() {
    const { contact } = this.state
    return (
      <div className="ui segment">
        <h1>{contact ? 'Kontakt bearbeiten:' : 'Kontakt anlegen:' } </h1>
        <form className="ui fluid form" onSubmit={this.handleSubmit}>

          <div className="fields">
            <div className="eight wide field">
              <label>Vorname</label>
              <input type="text" 
                id='firstname' 
                defaultValue={contact ? contact.firstname : ''} 
                onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Nachname</label>
              <input type="text" 
                id="lastname" 
                defaultValue={contact ? contact.lastname : ''} 
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" 
              id="email" 
              defaultValue={contact ? contact.email : ''} 
              onChange={this.handleChange} />
          </div>

          <div className="ui divider" />

          <div className="field">
            <label>Straße & H-Nr.</label>
            <input type="text" 
              id="street" 
              defaultValue={contact ? contact.street : ''} 
              onChange={this.handleChange} />
          </div>

          <div className="fields">
            <div className="field two wide field">
              <label>PLZ</label>
              <input type="text" 
                id="postcode" 
                defaultValue={contact ? contact.postcode : ''} 
                onChange={this.handleChange} />
            </div>
            <div className="field fourteen wide field">
              <label>Ort</label>
              <input type="text" 
                id="place" 
                defaultValue={contact ? contact.place : ''} 
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="ui divider" />

          <div className="fields">
            <div className="eight wide field">
              <label>Telefon</label>
              <input type="text" 
                id="fon" 
                defaultValue={contact ? contact.fon : ''} 
                onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Mobil</label>
              <input type="text" 
                id="mobil" 
                defaultValue={contact ? contact.mobil : ''} 
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="fields">
            <div className="eight wide field">
              <label>Geburtsdatum</label>
              <input type="date" 
                id="born" 
                defaultValue={contact ? contact.born : ''} 
                onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Bild (URL)</label>
              <input type="text" 
                id="img" 
                defaultValue={contact ? contact.img : ''} 
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="ui divider" />

          <div className="fields">
            <div className=" eight wide field"></div>
            <div className="eight wide field">
              <button type="button"
                className="ui right floated labeled icon button"
                onClick={ this.handleClose }>
                <i className="cancel icon" /> Abbrechen
              </button>
              <button type="submit"
                className="ui right floated violet labeled icon button"
                style={{ marginRight: 20 }}>
                <i className="save icon" /> Speichern
              </button>
            </div>
          </div>
        </form >
      </div >
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    upsertContact: (contact) =>
      dispatch(contact.id
        ? editContact(contact)
        : createContact(contact)
      )
  }
}

export default connect(null, mapDispatchToProps)(UpsertContact);