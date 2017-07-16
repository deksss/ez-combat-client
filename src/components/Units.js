import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Units extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired
  }

  static defaultProps = {
    items: [{name: 'one'}, {name: 'two'}]
  }


  render() {
    const {items, renderItem} = this.props

    const isEmpty = items.length === 0
    if (isEmpty) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div style={{ display: 'flex' }}>
        {items.map(renderItem)}
      </div>
    )
  }
}
