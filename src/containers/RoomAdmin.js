import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Players from './Players'
import Npcs from './Npcs'
import TemplatesList from '../components/TemplatesList'
import { connect } from 'react-redux'
import { templatesToggle } from '../actions'

const mapStateToProps = (state) => {
  return {
    showTemplates: state.templates.showTemplates
  }
}

const mapDispatchToProps = (dispatch) => ({
  templatesToggleClick: () => {
    dispatch(templatesToggle())
  }
})

class RoomAdmin extends Component {

  static propTypes = {
    showTemplates: PropTypes.bool.isRequired
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleTemplatesToggle = () => {
    this.props.templatesToggleClick()
  }

  render() {
    const {showTemplates} = this.props

    return (
      <div>
        <Link to={`/`}>back</Link>
        <button
          style={{position: 'absolute', right: showTemplates ? '300px' : 0}}
          onClick={this.handleTemplatesToggle}>
          {showTemplates ? 'Hide Templates' : 'Show Templates'}
        </button>
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
