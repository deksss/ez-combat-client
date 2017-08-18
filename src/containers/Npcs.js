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
  changeName } from '../actions'
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

  renderUnit(unit) {
    return <Unit unit={unit}
                 key={unit._id}
                 addField={unit.addField}
                 onChangeField={unit.onChangeField} />
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
        {onChangeField: this.createHandleUpdateField(item),
         unitActions: {
           delete: this.createHandleDeleteUnit(item),
           toggleVisibility: this.createHandleVisibleUnit(item),
           copy: this.createHandleCopyUnit(item),
           addField: this.createHandleAddField(item),
           changeName: this.props.changeName
         }
        }))

    return (
      <div>
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
