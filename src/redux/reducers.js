import { combineReducers } from 'redux';
import User from './User/reducers';
import Todos from './Todos/reducers';

export default combineReducers({
  User,
  Todos,
});
