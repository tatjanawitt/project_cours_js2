import axios from 'axios';
const url = 'http://localhost:3000/api/contacts';

export const createContact = (contact) => {
  return (dispatch, getState) => {
    axios({ url: url, method: 'post', data: contact })
      .then(res => dispatch({ type: 'CREATE_CONTACT_SUCCESS' }))
      .catch(err => dispatch({ type: 'CREATE_CONTACT_ERROR' }, err))
  }
};

export const deleteContact = (id) => {
  return (dispatch, getState) => {
    axios({ url: `${url}/${id}`, method: 'delete' })
      .then(res => dispatch({ type: 'DELETE_CONTACT_SUCCESS' }))
      .catch(err => dispatch({ type: 'DELETE_CONTACT_ERROR' }, err))

  }
};
