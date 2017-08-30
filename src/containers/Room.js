import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Players from './Players'
import Npcs from './Npcs'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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


  render() {

    return (
      <MuiThemeProvider>
      <div>
         <div style={{display: 'flex', margin: '0.5em'}}>
          <Link to={`/`}> back  </Link>
          <span>  _Room: {this.props.roomId}</span>
        </div>
        <Npcs admin={false}/>
        <hr />
        <Players admin={false} />
      </div>  
      </MuiThemeProvider>
    )
  }
}


export default connect(mapStateToProps
)(Room)
