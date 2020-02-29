import contactReducer from './contact-reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  contact: contactReducer
});

export default rootReducer