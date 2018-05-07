import axios from 'axios';

import { generateMessages } from "../../mocks/messages";

export const ACTION_TYPE_FETCHED = 'messages_fetched';
export const ACTION_TYPE_FETCH_FAILED = 'messages_fetch_failed';

export function fetchMessages() {
  const url = '/api/messages';

  return dispatch => {
    return axios.get(url)
        .then(({ data }) => {
          dispatch({
            type: ACTION_TYPE_FETCHED,
            payload: data
          });
        })
        .catch(() => {
          dispatch({
            type: ACTION_TYPE_FETCHED,
            payload: generateMessages(10)
          });
        })
  }
}