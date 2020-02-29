import axios from 'axios';

export const createContact = (contact) => {
  return (dispatch, getState) => {
    // make async call to database
    axios.post(
      'http://localhost:3000/api/contacts', 
      contact
    ).then(() => {
        dispatch({ type: 'CREATE_CONTACT_SUCCESS' });
      }
    ).catch(err => {
      dispatch({ type: 'CREATE_CONTACT_ERROR' }, err);
    });
  }
};
