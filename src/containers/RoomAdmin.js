import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Players from './Players'
import Npcs from './Npcs'
import TemplatesList from '../components/TemplatesList'
import { connect } from 'react-redux'
import { templatesToggle, junkUpdate } from '../actions'

const mapStateToProps = (state) => {
  return {
    showTemplates: state.templates.showTemplates,
    roomId: state.rooms.currentId
  }
}

const mapDispatchToProps = (dispatch) => ({
  templatesToggleClick: () => {
    dispatch(templatesToggle())
  },
  junkUpdate: () => {
    dispatch(junkUpdate({ws: {message: 'test1'}}))
  }
})

class RoomAdmin extends Component {

  static propTypes = {
    showTemplates: PropTypes.bool.isRequired,
    roomId: PropTypes.string.isRequired,
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleTemplatesToggle = () => {
    this.props.templatesToggleClick()
  }

  handleJunk = () => {
    this.props.junkUpdate()
  }

  render() {
    const {showTemplates} = this.props

    return (
      <div>
         <div style={{display: 'flex', margin: '0.5em'}}>
          <Link to={`/`}> back  </Link>
          <span>  _Room: {this.props.roomId}</span>
        </div>
        <button
          style={{position: 'absolute', right: showTemplates ? '300px' : 0}}
          onClick={this.handleTemplatesToggle}>
          {showTemplates ? 'Hide Templates' : 'Show Templates'}
        </button>
        <button onClick={this.handleJunk}>
          Junk update
        </button>
        handleJunk
        <TemplatesList showTemplates={showTemplates} />
        <Npcs />
        <hr />
        <Players />
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps
)(RoomAdmin)
