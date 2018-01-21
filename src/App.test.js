import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('shows expected contents', () => {
    const component = shallow(<App />);
    const app = component.find('h2.text-center');

    expect(app).toHaveLength(1);
  });
});
