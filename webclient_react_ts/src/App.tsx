import React, { Component } from 'react';
import axios from 'axios';
import ContactList from './components/contacts/contact-list';
import LoadingSpinner from './components/shared/loading-spinner'

import Contact from './model/Contact';

interface State {
  contacts: Contact[];
}

export default class App extends Component<{}, State> {
  componentDidMount() {
    axios.get('http://localhost:3000/api/contacts')
      .then(res => this.setState({ contacts: res.data }))
  }

  render() {
    if(!(this.state && this.state.contacts)) { return <LoadingSpinner /> }
    return  (
      <div className="ui segment">
        <ContactList contacts={ this.state.contacts } /> 
      </div>
    )
  }
}
