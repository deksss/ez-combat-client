import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'
import { addNpc,
  addNpcField,
  updateNpcField,
  deleteNpc,
  toggleVisibleNpc,
  copyNpc,
  changeName,
  toggleNpcFieldVisible,
  updateNpcFieldName,
  deleteNpcField } from '../actions/npcs'
import { junkSend } from '../actions/ws'
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
  },
  junkSend: () => dispatch(junkSend()),
  deleteUnit: (unitId) => {
    dispatch(deleteNpc(unitId))
  },
  toggleVisibleNpc: (unitId) => {
    dispatch(toggleVisibleNpc(unitId))
  },
  copyUnit: (unitId) => {
    dispatch(copyNpc(unitId))
  },
  changeName: (options) => {
    dispatch(changeName(options))
  },
  toggleNpcFieldVisible: (unitId, fieldId) => {
    dispatch(toggleNpcFieldVisible(unitId, fieldId))
  },
  updateNpcFieldName: (unitId, fieldId, name) => {
    dispatch(updateNpcFieldName(unitId, fieldId, name))
  },
  deleteNpcField: (unitId, fieldId) => {
    dispatch(deleteNpcField(unitId, fieldId))
  },
})

const mapStateToProps = (state) => {
  return {
    items: state.npcs.filter(
      npc => (npc.parentId === state.rooms.currentId) && !npc.deleted),
    roomId: state.rooms.currentId
  }
}

class Npcs extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    roomId: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  }

  createHandleAddField = (unit) => {
    const addField = this.props.addFieldClick
    const id = unit._id
    return () => addField({npcId: id})
  }

  createHandleDeleteUnit = (unit) => {
    const deleteUnit = this.props.deleteUnit
    const id = unit._id
    return () => deleteUnit(id)
  }

  createHandleVisibleUnit = (unit) => {
    const toggleUnitVisible = this.props.toggleVisibleNpc
    const id = unit._id
    return () => toggleUnitVisible(id)
  }

  createHandleCopyUnit = (unit) => {
    const copyUnit = this.props.copyUnit
    const id = unit._id
    return () => copyUnit(id)
  }

  createHandleEditUnitName = (unit) => {
    const copyUnit = this.props.copyUnit
    const id = unit._id
    return () => copyUnit(id)
  }

  createHandleUpdateField = (unit) => {
    const updateField = this.props.updateField
    const unitId = unit._id
    return (fieldId, value) => updateField(unitId, fieldId, value)
  }

  createHandleToggleField = (unit) => {
    const toggleNpcFieldVisible = this.props.toggleNpcFieldVisible
    const unitId = unit._id
    return (fieldId) => toggleNpcFieldVisible(unitId, fieldId)
  }

  createHandleFieldNameChange = (unit) => {
    const updateNpcFieldName = this.props.updateNpcFieldName
    const unitId = unit._id
    return (fieldId, name) => updateNpcFieldName(unitId, fieldId, name)
  }

  createHandleDeleteField = (unit) => {
    const deleteNpcField = this.props.deleteNpcField
    const unitId = unit._id
    return (fieldId) => deleteNpcField(unitId, fieldId)
  }

  renderUnit(unit) {
    return <Unit unit={unit}
                 key={unit._id} />
  }

  handleAddNpc = () => {
    this.props.addNpcClick(this.props.roomId)
    this.props.junkSend()
  }


  render() {
    const admin = this.props.admin
    const items = this.props.items
    .filter(item => admin || item.visibleToUsers)
    .map(item =>
      Object.assign(
        {},
        item,
        {unitActions: {
           delete: this.createHandleDeleteUnit(item),
           toggleVisibility: this.createHandleVisibleUnit(item),
           copy: this.createHandleCopyUnit(item),
           addField: this.createHandleAddField(item),
           changeName: this.props.changeName,
         },
         fieldActions: {
           onChangeField: this.createHandleUpdateField(item),
           toggleVisible: this.createHandleToggleField(item),
           changeName: this.createHandleFieldNameChange(item),
           delete: this.createHandleDeleteField(item),
         },
         fields: item.fields.filter(field => admin || field.visibleToUsers)
        }))

    return (
      <div style={{ border: '1px dot black'}}>
        <span>NPCs:</span>
        <div style={{ display: 'flex' }}>
          <Units renderItem={this.renderUnit}
                items={items}
           />
          {admin &&
            <AddUnit onClick={this.handleAddNpc} />
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(Npcs)
