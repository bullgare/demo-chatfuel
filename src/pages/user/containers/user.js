import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import classNames from 'classnames';

import { fetchUser, updateUser } from './actions';
import { DEFAULT_AVATAR_URL } from '../../../shared/const';
import './user.css';


class User extends Component {
  constructor(props) {
    super(props);

    this.state = { dataArrived: false };
  }

  componentDidMount() {
    const promise = this.props.fetchUser(this.getKey('id'));

    if (promise) {
      promise.then(() => {
        this.setState({ dataArrived: true });
      });
    }
  }

  dataArrived() {
    // this.props.dataArrived for tests only
    if (this.props.dataArrived || this.state.dataArrived) {
      return true;
    }
    return false;
  }

  getKey(key) {
    if (!this.props.match) {
      return null;
    }

    return this.props.match.params[key];
  }

  handleSubmit(val) {
    const user = this.props.user;
    this.props.updateUser(user.id, { name: val.name, avatarUrl: user.avatarUrl })
      .then(() => this.redirect());
  }

  redirect() {
    this.props.history.push(this.generateBackUrl());
  }

  generateBackUrl() {
    try {
      const searchParams = new URLSearchParams(this.props.location.search);
      const from = searchParams.get("from");
      if (from) {
        return `/users/${from}`;
      }
    } catch(e) {}

    return '/';
  }

  render() {
    if (!this.dataArrived()) {
      return <div className="container text-center">Loading</div>;
    }

    const user = this.props.user;
    if (!user || !user.id) {
      return <div className="container text-center">User was not found</div>;
    }

    return (
      <div>
        <LocalForm
            onSubmit={this.handleSubmit.bind(this)}
            initialState={user}
            className="container">
          <div className="form-group container">
            <label>Avatar</label>
            <div className="form-control">
              <img
                  src={user.avatarUrl ? user.avatarUrl : DEFAULT_AVATAR_URL}
                  alt={user.name}
                  className="img-thumbnail mx-auto d-block" />
            </div>
          </div>

          <div className="form-group container">
            <label>Name (should be not empty)</label>
            <Control.text
              model=".name"
              errors={{
                isEmpty: (val) => !val || !val.length
              }}
              mapProps={{
                className: ({fieldValue}) => {
                  return classNames(
                    "form-control",
                    { 'is-invalid': fieldValue.touched && !fieldValue.valid }
                  );
                },
              }} />

            <Errors
              model=".name"
              show={{ touched: true }}
              messages={{
                isEmpty: 'Cannot be empty'
              }}
              className="text-danger small" />
          </div>

          <div className="form-group btn-group col-sm-12">
            <input type="submit" value="Save" className="btn btn-primary col-sm-6" />

            <Link to={this.generateBackUrl()} className="btn btn-secondary col-sm-6">Cancel</Link>
          </div>
        </LocalForm>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, updateUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
