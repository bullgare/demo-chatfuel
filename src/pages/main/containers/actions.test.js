import moxios from 'moxios';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { fetchUsers, ACTION_TYPE_FETCHED } from './actions';

const mockStore = configureStore([thunk]);

describe('fetchUsers', () => {
  let store;

  beforeEach(() => {
    moxios.install();

    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('on proper response fires an action with given list of users with paging urls', (done) => {
    moxios.stubRequest('/api/users', {
      status: 200,
      response: {
        result: [{id: 1, name: '2', avatarUrl: 'a.png'}], nextPageUrl: 'n', previousPageUrl: 'p'
      }
    });

    store.dispatch(fetchUsers()).then(() => {
      const actions = store.getActions();

      expect(actions).toHaveLength(1);

      const action = actions[0];

      expect(action.type).toBe(ACTION_TYPE_FETCHED);
      expect(action.payload.nextPageUrl).toBeDefined();
      expect(action.payload.previousPageUrl).toBeDefined();
      expect(action.payload.result).toBeDefined();
      expect(action.payload.result).toBeInstanceOf(Array);
      expect(action.payload.result).toHaveLength(1);
      const user = action.payload.result[0];
      expect(user.id).toBe(1);
      expect(user.name).toBe('2');
      expect(user.avatarUrl).toBe('a.png');

      done();
    });
  });

  it('on error still fires an action mock list of users with paging urls', (done) => {
    moxios.stubRequest('/api/users', {
      status: 404
    });

    store.dispatch(fetchUsers()).then(() => {
      const actions = store.getActions();

      expect(actions).toHaveLength(1);

      const action = actions[0];

      expect(action.type).toBe(ACTION_TYPE_FETCHED);
      expect(action.payload.nextPageUrl).toBeDefined();
      expect(action.payload.previousPageUrl).toBeDefined();
      expect(action.payload.result).toBeDefined();
      expect(action.payload.result).toBeInstanceOf(Array);
      expect(action.payload.result).toHaveLength(10);

      done();
    });
  });
});
