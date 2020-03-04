import React, { Component, FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router'
import { AxiosResponse } from 'axios'
import { getContact, addContact, editContact } from '../shared/request-to-api'
import Contact from '../../types/Contact'

interface Props extends RouteComponentProps<{ id: string }> { }
interface State extends Contact { }

export default class UpsertContact extends Component<Props, State> {
  initState = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    postcode: '',
    place: '',
    fon: '',
    mobil: '',
    born: '',
    img: ''
  }
  state = this.initState

  public async componentDidMount(): Promise<void> {
    const { id } = this.props.match.params
    try {
      const res = await getContact(parseInt(id));
      if (res && res.data) this.setState({ ...res.data })
      else throw Error('Keine Daten von Api');
    } catch (err) { console.log(`😱 Api Request Fehler: ${err}`) }
  }

  public componentDidUpdate(prevProbs: Props): void {
    if (this.props && prevProbs && this.props.match && prevProbs.match) {
      if (this.props.match.path && prevProbs.match.path !== this.props.match.path) {
        this.setState(this.initState)
      }
    }
  }

  private handleClose = (): void => {
    this.props.history.push('/list')
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ 
      ...this.state,
      [e.target.id]: e.target.value
    })
  }

  private handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();    
    if (!this.state.id) delete this.state['id']
   // eslint-disable-next-line
    if (!this.state.img) this.state.img = 'people.jpg'    
    try {
      let res: AxiosResponse<object>
      this.state.id
      ? res = await editContact(this.state)
      : res = await addContact(this.state)
      if (res.status === 200) this.props.history.push('/list')
      else throw Error('Etwas ging schief!')
    } catch (err) { console.log(`😱 Api Request Fehler: ${err}`) }
  }

  public render() {
    const contact: Contact = this.state
    return (
      <div className="ui segment">
        <h1>{contact ? 'Kontakt bearbeiten:' : 'Kontakt anlegen:'} </h1>
        <form className="ui fluid form" onSubmit={ this.handleSubmit }>

          <div className="fields">
            <div className="eight wide field">
              <label>Vorname</label>
              <input type="text"
                id='firstname'
                value={this.state.firstname}
                onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Nachname</label>
              <input type="text"
                id="lastname"
                value={this.state.lastname}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange} />
          </div>

          <div className="ui divider" />

          <div className="field">
            <label>Straße & H-Nr.</label>
            <input type="text"
              id="street"
              value={this.state.street}
              onChange={this.handleChange} />
          </div>

          <div className="fields">
            <div className="field two wide field">
              <label>PLZ</label>
              <input type="text"
                id="postcode"
                value={this.state.postcode}
                onChange={this.handleChange} />
            </div>
            <div className="field fourteen wide field">
              <label>Ort</label>
              <input type="text"
                id="place"
                value={this.state.place}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="ui divider" />

          <div className="fields">
            <div className="eight wide field">
              <label>Telefon</label>
              <input type="text"
                id="fon"
                value={this.state.fon}
                onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Mobil</label>
              <input type="text"
                id="mobil"
                value={this.state.mobil}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="fields">
            <div className="eight wide field">
              <label>Geburtsdatum</label>
              <input type="date"
                id="born"
                value={this.state.born}
                onChange={this.handleChange} />
            </div>
            <div className="eight wide field">
              <label>Bild (URL)</label>
              <input type="text"
                id="img"
                value={this.state.img}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="ui divider" />

          <div className="fields">
            <div className=" eight wide field"></div>
            <div className="eight wide field">
              <button type="button"
                className="ui right floated labeled icon button"
                onClick={this.handleClose}>
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
