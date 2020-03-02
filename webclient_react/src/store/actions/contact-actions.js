import axios from 'axios';
import api from '../../components/shared/api'

export const createContact = (contact) => {
  return (dispatch, getState) => {
    axios({
      url: api.url,
      method: 'post',
      data: contact
    })
      .then(res => dispatch({ type: 'CREATE_CONTACT_SUCCESS' }))
      .catch(err => dispatch({ type: 'CREATE_CONTACT_ERROR' }, err))
  }
}

export const editContact = (contact) => {
  return (dispatch, getState) => {
    axios({
      url: `${api.url}/${contact.id}`,
      method: 'put',
      data: contact
    })
      .then(res => dispatch({ type: 'EDIT_CONTACT_SUCCESS' }))
      .catch(err => dispatch({ type: 'EDIT_CONTACT_ERROR' }, err))
  }
}

export const deleteContact = (id) => {
  return (dispatch, getState) => {
    axios({
      url: `${api.url}/${id}`,
      method: 'delete'
    })
      .then(res => dispatch({ type: 'DELETE_CONTACT_SUCCESS' }))
      .catch(err => dispatch({ type: 'DELETE_CONTACT_ERROR' }, err))
  }
}
