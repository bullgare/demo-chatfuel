import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ACTION_TYPE_FETCHED, ACTION_TYPE_UPDATED, fetchUser, updateUser } from './actions';

const mockStore = configureStore([thunk]);

describe('fetchUser', () => {
  let store;

  beforeEach(() => {
    moxios.install();

    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('on correct response populates user data from response', (done) => {
    moxios.stubRequest('/api/user/2', {
      status: 200,
      response: {
        result: {id: 1, name: '2', avatarUrl: 'aaa.png'}
      }
    });

    store.dispatch(fetchUser(2))
      .then(() => {
        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0].type).toBe(ACTION_TYPE_FETCHED);
        expect(actions[0].payload).toBeDefined();
        expect(actions[0].payload.result.id).toBe(1);
        expect(actions[0].payload.result.name).toBe('2');
        expect(actions[0].payload.result.avatarUrl).toBe('aaa.png');

        done();
      })
      .catch((err) => {
        expect(err).toBe("it should never happen");
      });
  });

  // TODO fix after api is ready
  it('on error populates user data from mock', (done) => {
    moxios.stubRequest('/api/user/2', {
      status: 404
    });

    store.dispatch(fetchUser(2))
      .then(() => {
        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0].type).toBe(ACTION_TYPE_FETCHED);
        expect(actions[0].payload).toBeDefined();

        done();
      })
      .catch((err) => {
        expect(err).toBe("it should never happen");
      });
  });
});

describe('updateUser', () => {
  let store;

  beforeEach(() => {
    moxios.install();

    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('on correct response sends correct action', (done) => {
    moxios.stubRequest('/api/users/2', {
      status: 200
    });

    store.dispatch(updateUser(2, {name: 'name2', avatarUrl: ''}))
      .then(() => {
        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0].type).toBe(ACTION_TYPE_UPDATED);

        done();
      })
      .catch((err) => {
        expect(err).toBe("it should never happen");
      });
  });

  // TODO fix after api is ready
  it('on error still sends correct action', (done) => {
    moxios.stubRequest('/api/users/2', {
      status: 404
    });

    store.dispatch(updateUser(2, {name: 'name2', avatarUrl: ''}))
      .then(() => {
        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0].type).toBe(ACTION_TYPE_UPDATED);

        done();
      })
      .catch((err) => {
        expect(err).toBe("it should never happen");
      });
  });
});
