import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import SocketConnectionLog from '../components/SocketConnectionLog';

const mapStateToProps = (state) => {
  return {
    connected: state.ws.connected,
  }
}

class Ws extends Component {
  static propTypes = {
    connected: PropTypes.bool,
  }
  render() {
    const { connected } = this.props;
    return (
      <div style={{padding:15}}>
        <SocketConnectionLog
          connected={connected}
          />
      </div>
    );
  }
}

export default connect(mapStateToProps
)(Ws)
