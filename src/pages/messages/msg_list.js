import React, { PureComponent } from 'react';
import { bindActionCreators } from "redux";
import { fetchMessages } from "./actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MsgList extends PureComponent {
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
                {msg.user.name} <span className="badge badge-dark">{msg.time.toString()}</span>
              </div>

              <div>{msg.text}</div>
            </div>
          </li>
      );
    });
  }
}

MsgList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string
    }),
    time: PropTypes.instanceOf(Date).isRequired,
    text: PropTypes.string.isRequired
  }))
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages }, dispatch);
}

function mapStateToProps({ messages }) {
  return { messages };
}

export default connect(mapStateToProps, mapDispatchToProps)(MsgList);