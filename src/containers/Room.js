import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Players from './Players'
import Npcs from './Npcs'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    roomId: state.rooms.currentId
  }
}


class Room extends Component {

  static propTypes = {
    roomId: PropTypes.string.isRequired,
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleJunk = () => {
    this.props.junkUpdate()
  }

  render() {

    return (
      <div>
         <div style={{display: 'flex', margin: '0.5em'}}>
          <Link to={`/`}> back  </Link>
          <span>  _Room: {this.props.roomId}</span>
        </div>
        <Npcs admin={false}/>
        <hr />
        <Players admin={false}/>
      </div>
    )
  }
}


export default connect(mapStateToProps
)(Room)
