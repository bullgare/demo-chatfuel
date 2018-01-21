import React from 'react';
import { mount as enzymeMount, shallow as enzymeShallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

export function mount(el, state = {}) {
  const store = createMockStore(state);
  return enzymeMount((
    wrap(el, store)
  ), store);
}

export function shallow(el, state = {}) {
  const store = createMockStore(state);
  return enzymeShallow((
    wrap(el, store)
  ), store);
}

function wrap(el, store) {
  return (
    <Provider store={store}>
      <MemoryRouter>
        {el}
      </MemoryRouter>
    </Provider>
  );
}
