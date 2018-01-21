import { combineReducers } from 'redux';
import { userListReducer } from '../pages/main/containers/reducers';
import { userReducer } from '../pages/user/containers/reducers';

const rootReducer = combineReducers({
  users: userListReducer,
  user: userReducer,
});

export default rootReducer;
