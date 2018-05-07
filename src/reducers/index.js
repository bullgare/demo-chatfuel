import { combineReducers } from 'redux';
import { userListReducer } from '../pages/main/containers/reducers';
import { userReducer } from '../pages/user/containers/reducers';
import { msgListReducer } from "../pages/messages/reducers";

const rootReducer = combineReducers({
  users: userListReducer,
  user: userReducer,
  messages: msgListReducer
});

export default rootReducer;
