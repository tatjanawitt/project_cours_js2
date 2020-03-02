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

export const getContactList = () => {
  return (dispatch) => {
    axios({
      url: api.url,
      method: 'get'
    })
      .then(res => {
        return dispatch({ 
          type: 'GET_CONTACTS_SUCCESS',
          contacts: res.data
        })
      })
      .catch(err => dispatch({ type: 'GET_CONTACTS_ERROR' }, err))
  }
}

/*
https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao
https://stackoverflow.com/questions/47957851/redux-react-router-combing-dispatch-and-navigation-history-push
https://stackoverflow.com/questions/54426956/how-to-access-redux-store-from-action-creator


import { someAPICALL } from '../api'

export function setCurrentUser(username) {
    return async (dispatch, getState) => {
        const { yourStateVariable } = getState().YourReducer
            , data = await someAPICall(yourStateVariable)
                           .catch(e => dispatch({ type: FETCH_ERROR, payload: e }))

        if (data) {
          dispatch( { type: SET_CURRENT_USER, payload: username } );
          dispatch( { type: ACTION_TWO, payload: username } );
          dispatch( { type: ACTION_THREE, payload: username } );
        } else {
          dispatch( { type: SOME_OTHER_ACTION, payload: 'whatever state update you like' } )
        }
    }
}

*/