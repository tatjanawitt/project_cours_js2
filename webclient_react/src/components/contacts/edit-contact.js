import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import LoadingSpinner from '../shared/loading-spinner'
import { editContact } from '../../store/actions/contact-actions'

class EditContact extends Component {
  state = {
    id: null
  }
  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`http://localhost:3000/api/contacts/${id}`)
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
    this.props.editContact(this.state);
    this.props.history.push('/');
  }

  render() {
    const { contact } = this.state
    return ((!contact) ? (
      <LoadingSpinner />
    ) : ( 
      <div>
      <h1>Kontakt anlegen: </h1>
      <form className="ui fluid form" onSubmit={this.handleSubmit}>

        <div className="fields">
          <div className="eight wide field">
            <label>Vorname</label>
            <input type="text" id='firstname' defaultValue={ contact.firstname } onChange={this.handleChange} />
          </div>
          <div className="eight wide field">
            <label>Nachname</label>
            <input type="text" id="lastname" defaultValue={ contact.lastname } onChange={this.handleChange} />
          </div>
        </div>

        <div className="field">
          <label>Email</label>
          <input type="email" id="email" defaultValue={ contact.email } onChange={this.handleChange} />
        </div>

        <div className="ui divider"></div>

        <div className="field">
          <label>Straße & H-Nr.</label>
          <input type="text" id="street" defaultValue={ contact.street } onChange={this.handleChange} />
        </div>

        <div className="fields">
          <div className="field two wide field">
            <label>PLZ</label>
            <input type="text" id="postcode" defaultValue={ contact.postcode } onChange={this.handleChange} />
          </div>
          <div className="field fourteen wide field">
            <label>Ort</label>
            <input type="text" id="place" defaultValue={ contact.place } onChange={this.handleChange} />
          </div>
        </div>

        <div className="ui divider"></div>

        <div className="fields">
          <div className="eight wide field">
            <label>Telefon</label>
            <input type="text" id="fon" defaultValue={ contact.fon } onChange={this.handleChange} />
          </div>
          <div className="eight wide field">
            <label>Mobil</label>
            <input type="text" id="mobil" defaultValue={ contact.mobil } onChange={this.handleChange} />
          </div>
        </div>

        <div className="fields">
          <div className="eight wide field">
            <label>Geburtsdatum</label>
            <input id="born" type="date" defaultValue={ contact.born } onChange={this.handleChange} />
          </div>
          <div className="eight wide field">
            <label>Bild (URL)</label>
            <input type="text" id="img" defaultValue={ contact.img } onChange={this.handleChange} />
          </div>
        </div>

        <div className="ui divider"></div>

        <div className="fields">
          <div className=" eight wide field"></div>
          <div className="eight wide field">
            <button
              className="ui right floated labeled icon button"
              type="button">
              <i className="cancel icon"></i> Abbrechen
            </button>
            <button
              className="ui right floated violet labeled icon button"
              style={{ marginRight: 20 }}
              type="submit">
              <i className="save icon"></i> Speichern
            </button>
          </div>
        </div>
      </form >
    </div >
      )
   )}
}
const mapDispatchToProps = dispatch => {
  return {
    editContact: (contact) => dispatch(editContact(contact))
  }
}

export default connect(null, mapDispatchToProps)(EditContact);