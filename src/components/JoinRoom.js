import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class JoinRoom extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onJoin: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value)
    }
  }

  getInputValue = () => {
    return this.refs.input.value
  }

  setInputValue = (val) => {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.refs.input.value = val
  }

  handleKeyUp = (e) => {
  //  if (e.keyCode === 13) {
  //    this.handleGoClick()
  //  }
  }
//need mode logic to top 
  handleJoinClick = () => {
    this.props.onJoin({_id: this.getInputValue()})
  }


  render() {
    return (
      <div>
        <p>Type a room _id and hit 'Go' to join</p>
        <input size="20"
               ref="input"
               defaultValue={this.props.value}
               onKeyUp={this.handleKeyUp} />
        <button onClick={this.handleJoinClick}>
          Join!
        </button>
      </div>
    )
  }
}
