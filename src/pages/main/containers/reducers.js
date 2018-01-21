import { ACTION_TYPE_FETCHED } from './actions';

export function userListReducer(state = {}, action) {
  if (action.type === ACTION_TYPE_FETCHED) {
    return action.payload;
  }

  return state;
}
