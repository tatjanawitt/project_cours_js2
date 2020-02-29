import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createContact } from '../../store/actions/contact-actions'

class CreateContact extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    postcode: '',
    place: '',
    fon: '',
    mobil: '',
    born: '',
    img: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props);
    this.props.CreateContact(this.state);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <h1>Kontakt anlegen: </h1>
        <form className="ui fluid form" onSubmit={this.handleSubmit}>

          <div className="fields">
            <div className="eight wide field">
              <label>Vorname</label>
              <input type="text" id='firstname' onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Nachname</label>
              <input type="text" id="lastname" onChange={this.handleChange} />
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>

          <div className="ui divider"></div>

          <div className="field">
            <label>Straße & H-Nr.</label>
            <input type="text" id="street" onChange={this.handleChange} />
          </div>

          <div className="fields">
            <div className="field two wide field">
              <label>PLZ</label>
              <input type="text" id="postcode" onChange={this.handleChange} />
            </div>
            <div className="field fourteen wide field">
              <label>Ort</label>
              <input type="text" id="place" onChange={this.handleChange} />
            </div>
          </div>

          <div className="ui divider"></div>

          <div className="fields">
            <div className="eight wide field">
              <label>Telefon</label>
              <input type="text" id="fon" onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Mobil</label>
              <input type="text" id="mobil" onChange={this.handleChange} />
            </div>
          </div>

          <div className="fields">
            <div className="eight wide field">
              <label>Geburtsdatum</label>
              <input id="born" type="date" onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Bild (URL)</label>
              <input type="text" id="img" onChange={this.handleChange} />
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
                style={{marginRight: 20 }}
                type="submit">
                <i className="save icon"></i> Speichern
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
    CreateContact: (contact) => dispatch(createContact(contact))
  }
}

export default connect(null, mapDispatchToProps)(CreateContact)