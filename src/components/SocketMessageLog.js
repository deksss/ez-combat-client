import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as wsActions from '../actions/ws'


  const mapDispatchToProps = (dispatch) => ({
    socketsMessageSend: (value) => {
      dispatch(wsActions.socketsMessageSend(value))
    }
  })

  const mapStateToProps = (state) => {
    return {
      loaded: state.ws.loaded,
      message: state.ws.message,
      connected: state.ws.connected,
      message_history: state.ws.message_history
    }
  }


class SocketMessageLog extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    message: PropTypes.string,
    connected: PropTypes.bool,
    message_history: PropTypes.array,
    socketsMessageSend: PropTypes.func
  }
  handleSendButton = (event) => {
    event.preventDefault();
    this.props.socketsMessageSend(this.refs.message_text.value);
    this.refs.message_text.value = '';
  }
  render() {
    const {loaded, connected, message_history} = this.props;
    return (
      <div>
        <h3>Message log</h3>
        <ul>
          {
            message_history.map((messageHistoryElement, index) =>
            <li key={index} className={'unstyled'}>
              <span className={(messageHistoryElement.direction === '->') ? 'glyphicon glyphicon-arrow-right' : 'glyphicon glyphicon-arrow-left'}></span>
              {messageHistoryElement.message}
            </li>
          )}
        </ul>
        <form
          className="form-inline"
          onSubmit={this.handleSendButton}>
          <p></p>
          <div className="form-group">
            <input
              className="form-control input-sm"
              type="text"
              ref="message_text" readOnly={(loaded && connected === true) ? false : true}>
            </input>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={this.handleSendButton}
            disabled={(connected === true) ? false : true}>
            <i className="fa fa-sign-in"/> Send
          </button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(SocketMessageLog)
