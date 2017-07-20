import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'
import { addNpc } from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => ({
  addNpcClick: () => {
    dispatch(addNpc())
  }
})

const mapStateToProps = (state) => {
  return {
    items: state.npcs.list
  }
}

class Npcs extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  }

  renderUnit(unit) {
    return <Unit unit={unit} key={unit.name} />
  }

  handleAddNpc = () => {
    this.props.addNpcClick()
  }

  render() {
    const fields = [{visibleToUsers: true,
                    name: 'hp',
                    value: '20',
                    onChange: () => console.log(1),
                    _id: String(Math.random(0, 100))
                  },
                  {visibleToUsers: true,
                    name: 'str',
                    value: '10',
                    onChange: () => console.log(2),
                    _id: String(Math.random(0, 100))
                  }];
    const items = [{name: 'Goblin', fields, visibleToUsers: false },
                   {name: 'Orc', fields, visibleToUsers: true}]

    return (
      <div>
        <span>NPCS:</span>
        <div style={{ display: 'flex' }}>
          <Units renderItem={this.renderUnit}
                items={items}
           />
          <AddUnit onClick={this.handleAddNpc} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(Npcs)
