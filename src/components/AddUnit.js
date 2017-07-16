import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AddUnit extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  handleAddClick = () => {
    this.props.onClick()
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAddClick}>
          +
        </button>
      </div>
    )
  }
}
