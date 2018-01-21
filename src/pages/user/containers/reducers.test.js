import { userReducer } from './reducers';
import { ACTION_TYPE_FETCHED } from './actions';

describe('userReducer', () => {
  it('handles unknown actions', () => {
    expect(userReducer(undefined, {})).toEqual({});
  });

  it('handles known action', () => {
    expect(userReducer(undefined, { type: ACTION_TYPE_FETCHED, payload: { a: 1 } })).toEqual({});

    expect(userReducer(undefined, { type: ACTION_TYPE_FETCHED, payload: { result: { a: 1 } } })).toEqual({ a: 1 });
  });
});
