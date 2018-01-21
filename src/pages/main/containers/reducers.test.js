import { userListReducer } from './reducers';
import { ACTION_TYPE_FETCHED } from './actions';

describe('userListReducer', () => {
  it('handles unknown actions', () => {
    expect(userListReducer(undefined, {})).toEqual({});
  });

  it('handles known action', () => {
    expect(
      userListReducer(undefined, { type: ACTION_TYPE_FETCHED, payload: { a: 1 } })
    ).toEqual({ a: 1 });
  });
});
