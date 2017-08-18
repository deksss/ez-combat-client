import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'
import { addNpc, addNpcField, updateNpcField} from '../actions'
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
  junkSend: () => dispatch(junkSend())
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
    console.log(this.props.items)
    const admin = this.props.admin
    const items = this.props.items
    .filter(item => admin || item.visibleToUsers)
    .map(item =>
      Object.assign(
        {},
        item,
        {addField: this.createHandleAddField(item),
         onChangeField: this.createHandleUpdateField(item)
        }))
console.log(items)
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
