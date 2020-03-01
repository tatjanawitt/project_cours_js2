import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Home from './components/home'
import ContactList from './components/contacts/contact-list'
import ContactDetails from './components/contacts/contact-details'
import UpsertContact from './components/contacts/upsert-contact'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />          
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/list' component={ ContactList } />              
            <Route path='/create' component={ UpsertContact } />
            <Route path='/edit/:id' component={ UpsertContact } />
            <Route path='/get/:id' component={ ContactDetails } />
          </Switch>
        </div>        
      </BrowserRouter>
    );
  }
}
export default App;
