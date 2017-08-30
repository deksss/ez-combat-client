import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

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
      return (
        <Paper zDepth={1}>
          <h1><i>Nothing here!</i></h1>
        </Paper>
    )
    }

    return (
      <Paper zDepth={1} style={{margin: '5px', padding: '5px'}}>
        <div style={{ display: 'flex' }}>
          {items.map(renderItem)}
        </div>
      </Paper>
    )
  }
}
