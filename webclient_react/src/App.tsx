import React, { Component } from 'react';
import axios from 'axios';
import ContactList from './components/ContactList';
import LoadingSpinner from './components/shared/LoadingSpinner'

import Contact from './types/Contact';

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
