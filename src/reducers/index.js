import { combineReducers } from 'redux';
import count from './count';
import login from './login';
import articleSearch from './articleSearch';

export default combineReducers({
  count,
  login,
  articleSearch,
})