import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { fetchMessages } from "./actions";
import { connect } from "react-redux";

class MsgList extends Component {
  constructor(props) {
    super(props);

    this.fetchMessages();
  }

  fetchMessages() {
    this.props.fetchMessages();
  }

  render() {
    return (
        <ul className="list-group">
          {this.renderList()}
        </ul>
    );
  }

  renderList() {
    return (this.props.messages || []).map((msg) => {
      return (
          <li key={msg.user.name} className="list-group-item">
            <div className="card-body">
              <div className="card-title">
                {msg.user.name} {outputTime(msg.time)}
              </div>

              <div>{msg.text}</div>
            </div>
          </li>
      );
    });
  }
}

function outputTime(time) {
  if (!time) {
    return <span></span>;
  }

  return <span className="badge badge-dark">{time.toString()}</span>;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages }, dispatch);
}

function mapStateToProps({ messages }) {
  return { messages };
}

export default connect(mapStateToProps, mapDispatchToProps)(MsgList);