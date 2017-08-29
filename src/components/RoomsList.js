import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RoomsListItem from './RoomsListItem'

export default class RoomsList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    join: PropTypes.func.isRequired,
    joinAsMod: PropTypes.func.isRequired,
    addRoom: PropTypes.func.isRequired
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

  handleAddRoom = () => {
    this.props.addRoom(this.getInputValue())
    this.setInputValue('')
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleAddRoom()
    }
  }

  renderItem = (roomItem) => {
    console.log(this)
    const room = Object.assign({},
      roomItem,
      {
        joinHandler: this.props.join,
        modJoinHandler: this.props.joinAsMod
      })

     return <RoomsListItem room={room}
                 key={room._id} />
  }

  render() {
    const {items} = this.props

    return (
      <div>
      <h3>Your rooms:</h3>
      <input size="20"
             ref="input"
             onKeyUp={this.handleKeyUp} />
      <button onClick={this.handleAddRoom}>
        Add
      </button>
        <ul>
          {items.map(this.renderItem)}
        </ul>
      </div>
    )
  }
}
