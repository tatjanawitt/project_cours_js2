import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './dashbord/home'
import ContactList from './contacts/contact-list'
import ContactDetails from './contacts/contact-details'
import UpsertContact from './contacts/upsert-contact'

export default function RouterOutlet() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/list' component={ContactList} />
      <Route path='/create' component={UpsertContact} />
      <Route path='/edit/:id' component={UpsertContact} />
      <Route path='/get/:id' component={ContactDetails} />
    </Switch>
  )
}
