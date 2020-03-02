import React, { Component } from 'react'
import axios from 'axios'
import api from '../shared/api'
import ContactListItem from './contact-list-item'
import LoadingSpinner from '../shared/loading-spinner'
import { connect } from 'react-redux';
import { getContactList } from '../../store/actions/contact-actions'

class ContactList extends Component {
  initState = {
    contacts: []
  }
  state = this.initState

  componentDidMount() {
    // this.props.getContactList()
    axios.get(api.url)
      .then(res => this.setState({ contacts: res.data }))
      .catch(err => console.log(err))
  }
  render() {
    //console.log('props', this.props)
    const { contacts } = this.state
    let contactList = contacts && contacts.length ? (
      contacts.map(contact =>
        <ContactListItem contact={contact} key={contact.id} />
      )
    ) : ( null )
    return (
      (contactList) ? (
        <div className="ui segment">
          <div className="project-list section">
            <div className="ui middle aligned selection divided list">
              { contactList }
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )
    )
  }
}
const mapStateToProps = state => {
  return {
    contacts: state.contacts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContactList: () => dispatch(getContactList())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);