import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class SocketConnectionLog extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    message: PropTypes.string,
    connected: PropTypes.bool,
    history: PropTypes.array,
    connectAction: PropTypes.func,
    disconnectAction: PropTypes.func
  }
  handleConnectButton = (event) => {
    event.preventDefault();
    this.props.connectAction();
  }
  handleDisconnectButton = (event) => {
    event.preventDefault();
    this.props.disconnectAction();
  }
  render() {
    const {history} = this.props;
    return (
      <div>
        <h3>Socket connection log</h3>
        <textarea
          className="form-control"
          rows="1"
          readOnly
          placeholder="Waiting ..."
          value={
            history.map((historyElement, index) =>
              'index = ' + index +
              ' loaded = ' + historyElement.loaded.toString() +
              ' message = ' + historyElement.message.toString() +
              ' connected = ' + historyElement.connected.toString() + ' \n').reverse().join('')
            }/>
        <button
          className="btn btn-primary btn-sm"
          onClick={this.handleConnectButton}>
          <i className="fa fa-sign-in"/> Connect
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={this.handleDisconnectButton}>
          <i className="fa fa-sign-out"/> Disconnect
          </button>
      </div>
    );
  }
}
