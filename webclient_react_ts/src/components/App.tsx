import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './shared/navbar'
import Home from './dashbord/home'
import ContactList from './contacts/contact-list'
import ContactDetails from './contacts/contact-details'
import UpsertContact from './contacts/upsert-contact'


import Contact from '../types/Contact';

interface State {
  contacts: Contact[];
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/list' component={ContactList} />
          <Route path='/create' component={UpsertContact} />
          <Route path='/edit/:id' component={UpsertContact} />
          <Route path='/get/:id' component={ContactDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
