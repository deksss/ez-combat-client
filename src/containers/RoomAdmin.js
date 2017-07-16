import React, { Component } from 'react'
import Players from './Players'
import Npcs from './Npcs'

class RoomAdmin extends Component {
  componentWillMount() {
    console.log('1')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      console.log('2')
    }
  }

  render() {
    return (
      <div>
        <span> is AdminRoom</span>
        <Npcs />
        <hr />
        <Players />
      </div>
    )
  }
}


export default RoomAdmin
