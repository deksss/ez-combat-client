import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import JoinRoom from '../components/JoinRoom'
import RoomsList from '../components/RoomsList'
import Ws from './Ws'
import { setCurrentRoom, addRoom } from '../actions/rooms'
import { joinRoom } from '../actions/ws'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    rooms: PropTypes.array.isRequired,
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
    <MuiThemeProvider>
      <div>
        <Helmet title="Cmbt trkr"/>

        <Ws />
        <JoinRoom value={inputValue}
                 onJoin={this.handleJoin}
                 addRoom={this.addRoom}
                 onJoinMod={this.handleJoinMod}
                 rooms={this.props.rooms} />
        <hr />
        <RoomsList items={this.props.rooms}
                   join={this.handleJoin}
                   joinAsMod={this.handleJoinMod}
                   addRoom={this.handleAddRoom} />
        {this.renderErrorMessage()}
        {children}
      </div>
     </MuiThemeProvider>  
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
  rooms: state.rooms.list,
  inputValue: ownProps.location.pathname.substring(1)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
