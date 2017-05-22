import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'

class Room extends Component {
  componentWillMount() {
    console.log('1')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      console.log('2')
    }
  }

  renderUnit(unit) {
    return <Unit unit={unit} key={unit.name} />
  }

  render() {
    return (
      <div>
        <span> is AdminRoom</span>
        <hr />
        <Units renderItem={this.renderUnit}
              items={[{name: 'one-1'}, {name: 'two-2'}]}
         />
      </div>
    )
  }
}


export default Room
