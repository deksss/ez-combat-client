import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Unit from '../components/Unit'
import Units from '../components/Units'

const loadData = props => {
  const { fullName } = props
  props.loadRepo(fullName, [ 'description' ])
  props.loadStargazers(fullName)
}

class Room extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

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
    const { name } = this.props


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
