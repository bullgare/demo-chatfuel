import { ACTION_TYPE_FETCHED } from './actions';

export function userReducer(state = {}, action) {
  if (action.type === ACTION_TYPE_FETCHED) {
    return action.payload.result || {};
  }

  return state;
}
