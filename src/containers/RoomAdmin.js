import React, { Component } from 'react'
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
        <span> is AdminRoom</span>
        <Npcs />
        <hr />
        <Players />
        <button onClick={this.handleTemplatesToggle}>
          {showTemplates ? 'Hide Templates' : 'Show Templates'}
        </button>
        <TemplatesList showTemplates={showTemplates} />
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps
)(RoomAdmin)
