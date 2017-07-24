import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'
import { addNpc, addNpcField } from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => ({
  addNpcClick: () => {
    dispatch(addNpc())
  },
  addFieldClick: (unit) => {
    dispatch(addNpcField(unit.npcId))
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

  createHandleAddField = (unit) => {
    const addField = this.props.addFieldClick
    const id = unit._id
    return () => addField({npcId: id})
  }

  renderUnit(unit) {
    return <Unit unit={unit}
                 key={unit._id}
                 addField={unit.addField}
                 onChangeField={unit.onChangeField} />
  }

  handleAddNpc = () => {
    this.props.addNpcClick()
  }


  render() {
    const items = this.props.items.map(item =>
      Object.assign(
        {},
        item,
        {addField: this.createHandleAddField(item),
         onChangeField: (unitId, fieldId) => console.log(fieldId + ', ' + unitId)
        }))

    return (
      <div>
        <span>NPCs:</span>
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
