import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TemplatesList extends Component {
  static propTypes = {
    showTemplates: PropTypes.bool.isRequired
  }

  static defaultProps = {
    showTemplates: false
  }


  render() {
    const style = {
      display: this.props.showTemplates ? 'flex' : 'none',
      color: 'grey'
    }

    return (
      <div style={style}>
        Templates!!!
      </div>
    )
  }
}
