import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Explore from '../components/Explore'
import { setCurrentRoom } from '../actions'
import Helmet from 'react-helmet'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node,
    setRoom: PropTypes.func.isRequired
  }


  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
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
        <p>Sockets not connected</p>

        <button className="btn btn-primary btn-sm">
          <i className="fa fa-sign-in"/> Connect
        </button>
        <button className="btn btn-danger btn-sm">
          <i className="fa fa-sign-out"/> Disconnect
        </button>
        
        <Explore value={inputValue}
                 onChange={this.handleChange} />
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
