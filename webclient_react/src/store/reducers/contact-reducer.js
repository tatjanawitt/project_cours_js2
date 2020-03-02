const initState = {}


const contactReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CONTACTS_SUCCESS':
      console.log('get contacts success');
      return {
        ...state, 
        contacts: action.payload
      };
    case 'GET_CONTACTS_ERROR':
      console.log('get contacts error');
      return {...state, err: action.payload };
    case 'CREATE_CONTACT_SUCCESS':
      console.log('create contact success');
      return state;
    case 'CREATE_CONTACT_ERROR':
      console.log('create contact error');
      return state;
    case 'EDIT_CONTACT_SUCCESS':
      console.log('edit contact success');
      return state;
    case 'EDIT_CONTACT_ERROR':
      console.log('edit contact error');
      return state;
    case 'DELETE_CONTACT_SUCCESS':
      console.log('delete contact success');
      return state;
    case 'DELETE_CONTACT_ERROR':
      console.log('delete contact error');
      return state; 
    default:
      return state;
  }
};

export default contactReducer;
