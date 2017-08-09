import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import SocketConnectionLog from '../components/SocketConnectionLog';
import SocketMessageLog from '../components/SocketMessageLog';
import * as wsActions from '../actions/ws';


const mapDispatchToProps = (dispatch) => ({
  socketsConnect: () => {
    dispatch(wsActions.socketsConnect())
  },
  socketsDisconnect: () => {
    dispatch(wsActions.socketsDisconnect())
  }
})

const mapStateToProps = (state) => {
  return {
    loaded: state.ws.loaded,
    message: state.ws.message,
    connected: state.ws.connected,
    history: state.ws.history
  }
}

class Ws extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    message: PropTypes.string,
    connected: PropTypes.bool,
    history: PropTypes.array,
    socketsConnect: PropTypes.func,
    socketsDisconnect: PropTypes.func
  }
  render() {
    const {loaded, message, connected,  history, socketsConnect, socketsDisconnect} = this.props;
    return (
      <div className="container">
        <h1>Socket  </h1>
        <SocketConnectionLog
          loaded={loaded}
          message={message}
          connected={connected}
          history={history}
          connectAction={socketsConnect}
          disconnectAction={socketsDisconnect}
          />
        <SocketMessageLog />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(Ws)
