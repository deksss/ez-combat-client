import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'
import { addNpc, addNpcField, updateNpcField} from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => ({
  addNpcClick: (parentId) => {
    dispatch(addNpc(parentId))
  },
  addFieldClick: (unit) => {
    dispatch(addNpcField(unit.npcId))
  },
  updateField: (unitId, fieldId, value) => {
    dispatch(updateNpcField(unitId, fieldId, value))
  }
})

const mapStateToProps = (state) => {
  return {
    items: state.npcs.list,
    roomId: state.rooms.currentId
  }
}

class Npcs extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    roomId: PropTypes.string.isRequired
  }

  createHandleAddField = (unit) => {
    const addField = this.props.addFieldClick
    const id = unit._id
    return () => addField({npcId: id})
  }

  createHandleUpdateField = (unit) => {
    const updateField = this.props.updateField
    const unitId = unit._id
    return (fieldId, value) => updateField(unitId, fieldId, value)
  }

  renderUnit(unit) {
    return <Unit unit={unit}
                 key={unit._id}
                 addField={unit.addField}
                 onChangeField={unit.onChangeField} />
  }

  handleAddNpc = () => {
    console.log(this.props.parentId)
    this.props.addNpcClick(this.props.roomId)
  }


  render() {
    const items = this.props.items
    .filter(item => item.parentId === this.props.roomId)
    .map(item =>
      Object.assign(
        {},
        item,
        {addField: this.createHandleAddField(item),
         onChangeField: this.createHandleUpdateField(item)
         //(unitId, fieldId, value) =>
         //  console.log(unitId + ', ' + fieldId + 'v:' + value)
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
