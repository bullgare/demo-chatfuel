import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchUsers } from './actions';
import { DEFAULT_AVATAR_URL } from '../../../shared/const';
import './user_list.css';

class UserList extends Component {
  componentDidMount() {
    this.props.fetchUsers(this.getCurPage());
  }

  componentDidUpdate(prevProps) {
    if (this.getCurPage() !== this.getCurPage(prevProps)) {
      this.props.fetchUsers(this.getCurPage());
    }
  }

  render() {
    return (
      <div>
        <table className="table table-striped table-responsive-sm"><tbody>{this.renderList()}</tbody></table>

        <ul className="pagination pagination-lg justify-content-center">{this.renderPaging()}</ul>
      </div>
    );
  }

  getCurPage(props=this.props) {
    if (!props.match) {
      return '';
    }
    return props.match.params.pageUrl;
  }

  generateLinkToForm(id) {
    let url = `/user/${id}/`;
    const pageUrl = this.getCurPage();
    if (pageUrl) {
      url += `?from=${pageUrl}`;
    }
    return url;
  }

  renderList() {
    if (!this.props.users) {
      return;
    }

    return this.props.users.map(user => {
      return (
        <tr key={user.id}>
          <td><img src={user.avatarUrl ? user.avatarUrl : DEFAULT_AVATAR_URL} alt={user.name} /></td>

          <td className="align-middle">
            <span className="h4">{user.name}</span>
          </td>

          <td className="align-middle">
            <Link to={this.generateLinkToForm(user.id)} className="btn btn-warning">Edit</Link>
          </td>
        </tr>
      );
    });
  }

  renderPaging() {
    const links = [];
    if (this.props.previousPageUrl) {
      links.push(
        <li key="prev" className="page-item">
          <Link
              to={`/users/${this.getPrevUrl()}/`}
              className="page-link">
            Previous page
          </Link>
        </li>
      );
    }
    if (this.props.nextPageUrl) {
      links.push(
        <li key="next" className="page-item">
          <Link
              to={`/users/${this.getNextUrl()}/`}
              className="page-link">
            Next page
          </Link>
        </li>
      );
    }

    return links;
  }

  getPrevUrl() {
    return escapeUrl(this.props.previousPageUrl);
  }

  getNextUrl() {
    return escapeUrl(this.props.nextPageUrl);
  }
}

function escapeUrl(url) {
  return window.encodeURIComponent(url);
}

function mapStateToProps({ users }) {
  if (!users) {
    return {};
  }
  return {
    users: users.result,
    previousPageUrl: users.previousPageUrl,
    nextPageUrl: users.nextPageUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
