import axios from 'axios';

import { singleUserById } from '../../../mocks/users';

export const ACTION_TYPE_FETCHED = 'user_fetched';
export const ACTION_TYPE_FETCH_FAILED = 'user_fetch_failed';

export const ACTION_TYPE_UPDATED = 'user_updated';
export const ACTION_TYPE_UPDATE_FAILED = 'user_update_failed';

export function fetchUser(id) {
  return dispatch => {
    return axios.get(`/api/user/${id}`)
      .then(response => {
        dispatch({
          type: ACTION_TYPE_FETCHED,
          payload: response.data
        });
      })
      .catch(() => {
        // TODO that should be an error handling
        // dispatch({
        //   type: ACTION_TYPE_FETCH_FAILED
        // });
        dispatch({
          type: ACTION_TYPE_FETCHED,
          payload: singleUserById(id)
        });
      });
  }
}

export function updateUser(id, { name, avatarUrl }) {
  return dispatch => {
    return axios.post(`/api/users/${id}`, { name, avatarUrl })
      .then(data => {
        dispatch({
          type: ACTION_TYPE_UPDATED
        });
      })
      .catch(() => {
        // TODO that should be an error handling
        // dispatch({
        //   type: ACTION_TYPE_UPDATE_FAILED
        // });
        dispatch({
          type: ACTION_TYPE_UPDATED
        });
      });
  }
}
