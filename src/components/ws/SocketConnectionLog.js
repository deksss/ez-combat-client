import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SocketConnectionLog extends Component {
  static propTypes = {
    connected: PropTypes.bool
  };
  render() {
    const color = this.props.connected ? "green" : "red";
    const text = this.props.connected ? "o" : "-";
    return (
      <div>
        <span style={{ color: color }}>{text}</span>
      </div>
    );
  }
}
