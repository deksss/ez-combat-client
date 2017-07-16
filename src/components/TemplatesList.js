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
      color: 'blue',
      backgroundColor: 'grey',
      position: 'absolute',
      width: '300px',
      height: '100vh',
      right: 0
    }

    return (
      <div style={style}>
        Templates!!!
      </div>
    )
  }
}
