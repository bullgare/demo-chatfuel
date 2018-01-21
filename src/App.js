import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './App.css';
import reducers from './reducers';
import UserList from './pages/main/containers/user_list';
import User from './pages/user/containers/user';

const createStoreFromMiddleware = applyMiddleware(thunk)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreFromMiddleware(reducers)}>
        <div>
          <header className="bg-light pt-4 pb-4">
            <h2 className="text-center">#42. This is ma bot.</h2>
          </header>
          <div>
            <BrowserRouter basename="/demo-chatfuel">
              <Switch>
                <Route path="/users/:pageUrl/" component={UserList} />
                <Route path="/user/:id/" component={User} />
                <Route path="/user/:id/?from=:from" component={User} />
                <Route path="/" component={UserList} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
