import { combineReducers } from 'redux';
import count from './count';
import login from './login';

export default combineReducers({
  count,
  login
})