import axios from 'axios';

import { usersDefault } from '../../../mocks/users';

export const ACTION_TYPE_FETCHED = 'users_fetched';
export const ACTION_TYPE_FETCH_FAILED = 'users_fetch_failed';

export function fetchUsers(pageUrl) {
  let url = '/api/users';
  if (pageUrl) {
    url += `?page_url=${pageUrl}`;
  }

  return dispatch => {
    return axios.get(url)
      .then(({ data }) => {
        dispatch({
          type: ACTION_TYPE_FETCHED,
          payload: data,
        });
      })
      .catch(() => {
        // TODO that should be an error handling
        // dispatch({
        //   type: ACTION_TYPE_FETCH_FAILED
        // });
        dispatch({
          type: ACTION_TYPE_FETCHED,
          payload: usersDefault(10),
        });
      });
  };
}
