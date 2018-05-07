import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './App.css';
import reducers from './reducers';
import UserList from './pages/main/containers/user_list';
import User from './pages/user/containers/user';
import MsgList from './pages/messages/msg_list';

const createStoreFromMiddleware = applyMiddleware(thunk)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreFromMiddleware(reducers)}>
        <div>
          <h6 className="text-center">
            <a href="https://github.com/bullgare/demo-chatfuel">Source code</a>
          </h6>

          <header className="bg-light pt-4 pb-4">
            <h2 className="text-center">#42. This is ma bot.</h2>
          </header>
          <div>
            <BrowserRouter basename="/demo-chatfuel">
              <div>
                <div className="card"><Link to="/">users</Link> <Link to="/messages">messages</Link></div>

                <Switch>
                  <Route path="/" component={UserList} exact={true} />
                  <Route path="/users/:pageUrl/" component={UserList} />
                  <Route path="/user/:id/" component={User} />
                  <Route path="/user/:id/?from=:from" component={User} />
                  <Route path="/messages" component={MsgList} />
                </Switch>
              </div>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
