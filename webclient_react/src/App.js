import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Home from './components/home'
import ContactList from './components/contacts/contact-list'
import CreateContact from './components/contacts/create-contact'
import ContactDetails from './components/contacts/contact-details';
import EditContact from './components/contacts/edit-contact';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="ui segment">
            <Switch>
              <Route exact path='/' component={ Home } />
              <Route path='/list' component={ ContactList } />              
              <Route path='/create' component={ CreateContact } />
              <Route path='/edit/:id' component={ EditContact } />
              <Route path='/get/:id' component={ ContactDetails } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
