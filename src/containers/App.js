import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import JoinRoom from '../components/JoinRoom'
import RoomsList from '../components/RoomsList'
import Ws from './Ws'
import { setCurrentRoom, addRoom } from '../actions'
import { joinRoom } from '../actions/ws'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node,
    setRoom: PropTypes.func.isRequired,
    joinRoom: PropTypes.func.isRequired,
  }


  handleJoin = options => {
    browserHistory.push(`/room`)
    this.props.setRoom(options)
    this.props.joinRoom(options)
  }

  handleJoinMod = options => {
    browserHistory.push(`/room/admin`)
    this.props.setRoom(options)
    this.props.joinRoom(options)
  }


  handleAddRoom = name => {
    browserHistory.push(`/room/admin`)
    this.props.addRoom(name)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#">
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Helmet title="Cmbt trkr"/>

        <Ws />
        <JoinRoom value={inputValue}
                 onJoin={this.handleJoin}
                 addRoom={this.addRoom} />
        <hr />
        <RoomsList />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  setRoom: (options) => {
    dispatch(setCurrentRoom(options))
  },
  joinRoom: (options) => {
    dispatch(joinRoom(options))
  },
  addRoom: (options) => {
    dispatch(addRoom(options))
  }
})


const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
