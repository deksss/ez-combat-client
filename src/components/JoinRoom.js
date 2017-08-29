import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class JoinRoom extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onJoin: PropTypes.func.isRequired,
    onJoinMod: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired,
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
    console.log('set join value')
    this.refs.input.value = val
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleJoinClick()
    }
  }
//need move to top
  handleJoinClick = () => {
    const value = this.getInputValue();
    const data = this.props.rooms.find(room => room._id === value)
    if (data && data.owner_code) {
      this.props.onJoinMod(data)
    } else {
      this.props.onJoin({_id: value})
    }
    this.setInputValue('')
  }


  render() {
    const placeholder = 'enter room ID'
    return (
      <div>
        <input size="20"
               ref="input"
               defaultValue={this.props.value}
               onKeyUp={this.handleKeyUp}
               placeholder={placeholder} />
        <button onClick={this.handleJoinClick}>
          Go!
        </button>
      </div>
    )
  }
}
