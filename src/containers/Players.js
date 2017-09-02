import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'
import { addPlayer,
  addPlayerField,
  updatePlayerField,
  deletePlayer,
  toggleVisiblePlayer,
  copyPlayer,
  changeName,
  togglePlayerFieldVisible,
  updatePlayerFieldName,
  deletePlayerField } from '../actions/players'
import { junkSend } from '../actions/ws'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MAIN, MAIN_HIDDEN } from "../styles/constants"

const mapDispatchToProps = (dispatch) => ({
  addPlayerClick: (parentId) => {
    dispatch(addPlayer(parentId))
  },
  addFieldClick: (unit) => {
    dispatch(addPlayerField(unit.playerId))
  },
  updateField: (unitId, fieldId, value) => {
    dispatch(updatePlayerField(unitId, fieldId, value))
  },
  junkSend: () => dispatch(junkSend()),
  deleteUnit: (unitId) => {
    dispatch(deletePlayer(unitId))
  },
  toggleVisiblePlayer: (unitId) => {
    dispatch(toggleVisiblePlayer(unitId))
  },
  copyUnit: (unitId) => {
    dispatch(copyPlayer(unitId))
  },
  changeName: (options) => {
    dispatch(changeName(options))
    dispatch(junkSend())
  },
  togglePlayerFieldVisible: (unitId, fieldId) => {
    dispatch(togglePlayerFieldVisible(unitId, fieldId))
  },
  updatePlayerFieldName: (unitId, fieldId, name) => {
    dispatch(updatePlayerFieldName(unitId, fieldId, name))
  },
  deletePlayerField: (unitId, fieldId) => {
    dispatch(deletePlayerField(unitId, fieldId))
  },
})

const mapStateToProps = (state) => {
  return {
    items: state.players.filter(
      player => (player.parentId === state.rooms.currentId) && !player.deleted),
    roomId: state.rooms.currentId
  }
}

class Players extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    roomId: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  }

  createHandleAddField = (unit) => {
    const addField = this.props.addFieldClick
    const id = unit._id
    return () => {
      addField({playerId: id})
      this.props.junkSend()
    }
  }

  createHandleDeleteUnit = (unit) => {
    const deleteUnit = this.props.deleteUnit
    const id = unit._id
    return () => {
      deleteUnit(id)
      this.props.junkSend()
    }
  }

  createHandleVisibleUnit = (unit) => {
    const toggleUnitVisible = this.props.toggleVisiblePlayer
    const id = unit._id
    return () => {
      toggleUnitVisible(id)
      this.props.junkSend()
    }
  }

  createHandleCopyUnit = (unit) => {
    const copyUnit = this.props.copyUnit
    const id = unit._id
    return () => {
      copyUnit(id)
      this.props.junkSend()
    }
  }

  createHandleUpdateField = (unit) => {
    const updateField = this.props.updateField
    const unitId = unit._id
    return (fieldId, value) => {
      updateField(unitId, fieldId, value)
      this.props.junkSend()
    }
  }

  createHandleToggleField = (unit) => {
    const togglePlayerFieldVisible = this.props.togglePlayerFieldVisible
    const unitId = unit._id
    return (fieldId) => {
      togglePlayerFieldVisible(unitId, fieldId)
      this.props.junkSend()
    }
  }

  createHandleFieldNameChange = (unit) => {
    const updatePlayerFieldName = this.props.updatePlayerFieldName
    const unitId = unit._id
    return (fieldId, name) => {
      updatePlayerFieldName(unitId, fieldId, name)
      this.props.junkSend()
    }
  }

  createHandleDeleteField = (unit) => {
    const deletePlayerField = this.props.deletePlayerField
    const unitId = unit._id
    return (fieldId) => {
      deletePlayerField(unitId, fieldId)
      this.props.junkSend()
    }
  }

  handleAddPlayer = () => {
    this.props.addPlayerClick(this.props.roomId)
    this.props.junkSend()
  }

  renderUnit(unit) {
    return <Unit unit={unit}
                 key={unit._id}
                 addField={unit.addField} />
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
         fields: item.fields
           .filter(field => admin || field.visibleToUsers)
           .map(field => Object.assign({}, field, {canEdit: admin})),
         canEdit: admin,
         style: MAIN,
         styleHidden: MAIN_HIDDEN
        }))

    return (
      <div style={{ border: '1px dot black'}}>
        <div style={{ display: 'flex' }}>
          <Units renderItem={this.renderUnit}
                items={items}
           />
          {admin &&
            <AddUnit onClick={this.handleAddPlayer} />
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(Players)
