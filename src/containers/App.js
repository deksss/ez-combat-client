import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import Explore from '../components/Explore'
import Ws from './Ws'
import { setCurrentRoom } from '../actions'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node,
    setRoom: PropTypes.func.isRequired
  }


  handleChangeJoin = nextValue => {
    browserHistory.push(`/room`)
    this.props.setRoom(nextValue)
  }

  handleChangeCreate = nextValue => {
    browserHistory.push(`/room/admin`)
    this.props.setRoom(nextValue)
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
        <Explore value={inputValue}
                 onJoin={this.handleChangeJoin}
                 onCreate={this.handleChangeCreate} />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  setRoom: (name) => {
    dispatch(setCurrentRoom(name))
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
