import axios from 'axios';
import api from '../../components/shared/api'

export const createContact = (contact) => {
  return connectToApi(
    'CREATE_CONTACT_SUCCESS',
    'CREATE_CONTACT_ERROR',
    api.url,
    'post',
    contact
  )
}

export const editContact = (contact) => {
  return connectToApi(
    'EDIT_CONTACT_SUCCESS',
    'EDIT_CONTACT_ERROR',
    `${api.url}/${contact.id}`,
    'put',
    contact
  )
}

export const deleteContact = (id) => {
  return connectToApi(
    'DELETE_CONTACT_SUCCESS', 
    'DELETE_CONTACT_ERROR', 
    `${api.url}/${id}`, 
    'delete', 
    null
  )
}

const connectToApi = (successType, errorType, url, method, data) => {
  return dispatch => {
  axios({ url, method, data })
    .then(res => dispatch({ type: successType }))
    .catch(err => dispatch({ type: errorType }, err))
  }  
}
