import React, { Component } from "react";
import Unit from "../components/Unit";
import Units from "../components/Units";
import {
  addPlayer,
  addPlayerField,
  updatePlayerField,
  deletePlayer,
  toggleVisiblePlayer,
  copyPlayer,
  changeName,
  togglePlayerFieldVisible,
  updatePlayerFieldName,
  deletePlayerField,
  changePermission
} from "../actions/players";
import { junkSend, actionSend } from "../actions/ws";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MAIN, MAIN_HIDDEN } from "../styles/constants";
import UnitsToolbar from "../components/UnitsToolbar";

const mapDispatchToProps = dispatch => ({
  addPlayerClick: parentId => {
    dispatch(addPlayer(parentId));
  },
  addFieldClick: (unit, send) => {
    dispatch(addPlayerField(unit.playerId));
    if (send) {
      dispatch(actionSend(addPlayerField(unit.playerId)));
    } else {

    }
  },
  updateField: (unitId, fieldId, value, send) => {
    dispatch(updatePlayerField(unitId, fieldId, value));
    if (send) {
      dispatch(actionSend(updatePlayerField(unitId, fieldId, value)));
    }
  },
  junkSend: () => dispatch(junkSend()),
  deleteUnit: unitId => {
    dispatch(deletePlayer(unitId));
  },
  toggleVisiblePlayer: unitId => {
    dispatch(toggleVisiblePlayer(unitId));
  },
  copyUnit: unitId => {
    dispatch(copyPlayer(unitId));
  },
  changeName: options => {
    dispatch(changeName(options));
    dispatch(junkSend());
  },
  togglePlayerFieldVisible: (unitId, fieldId, send) => {
    dispatch(togglePlayerFieldVisible(unitId, fieldId));
    if (send) {
      dispatch(actionSend(togglePlayerFieldVisible(unitId, fieldId)));
    }
  },
  updatePlayerFieldName: (unitId, fieldId, name, send) => {
    dispatch(updatePlayerFieldName(unitId, fieldId, name));
    if (send) {
      dispatch(actionSend(updatePlayerFieldName(unitId, fieldId, name)));
    }
  },
  deletePlayerField: (unitId, fieldId, send) => {
    dispatch(deletePlayerField(unitId, fieldId));
    if (send) {
      dispatch(actionSend(deletePlayerField(unitId, fieldId)));
    }
  },
  changePermission: options => {
    dispatch(changePermission(options));
    dispatch(junkSend());
  }
});

const mapStateToProps = state => {
  return {
    items: state.players.filter(
      player => player.parentId === state.rooms.currentId && !player.deleted
    ),
    roomId: state.rooms.currentId,
    userId: state.user.userId
  };
};

class Players extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    roomId: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired
  };

  createHandleAddField = unit => {
    const addField = this.props.addFieldClick;
    const id = unit._id;
    return () => {
      addField({ playerId: id }, !this.props.admin);
      this.props.admin && this.props.junkSend();
    };
  };

  createHandleDeleteUnit = unit => {
    const deleteUnit = this.props.deleteUnit;
    const id = unit._id;
    return () => {
      deleteUnit(id);
      this.props.junkSend();
    };
  };

  createHandleVisibleUnit = unit => {
    const toggleUnitVisible = this.props.toggleVisiblePlayer;
    const id = unit._id;
    return () => {
      toggleUnitVisible(id);
      this.props.junkSend();
    };
  };

  createHandleCopyUnit = unit => {
    const copyUnit = this.props.copyUnit;
    const id = unit._id;
    return () => {
      copyUnit(id);
      this.props.junkSend();
    };
  };

  createHandleUpdateField = unit => {
    const updateField = this.props.updateField;
    const unitId = unit._id;
    return (fieldId, value) => {
      updateField(unitId, fieldId, value, !this.props.admin);
      this.props.admin && this.props.junkSend();
    };
  };

  createHandleToggleField = unit => {
    const togglePlayerFieldVisible = this.props.togglePlayerFieldVisible;
    const unitId = unit._id;
    return fieldId => {
      togglePlayerFieldVisible(unitId, fieldId, !this.props.admin);
      this.props.admin && this.props.junkSend();
    };
  };

  createHandleFieldNameChange = unit => {
    const updatePlayerFieldName = this.props.updatePlayerFieldName;
    const unitId = unit._id;
    return (fieldId, name) => {
      updatePlayerFieldName(unitId, fieldId, name, !this.props.admin);
      this.props.admin && this.props.junkSend();
    };
  };

  createHandleDeleteField = unit => {
    const deletePlayerField = this.props.deletePlayerField;
    const unitId = unit._id;
    return fieldId => {
      deletePlayerField(unitId, fieldId, !this.props.admin);
      this.props.admin && this.props.junkSend();
    };
  };

  handleAddPlayer = () => {
    this.props.addPlayerClick(this.props.roomId);
    this.props.junkSend();
  };

  renderUnit(unit) {
    return <Unit unit={unit} key={unit._id} addField={unit.addField} />;
  }

  render() {
    const admin = this.props.admin;
    //can rewrite in single reduce
    const items = this.props.items
      .filter(
        item =>
          admin ||
          item.visibleToUsers ||
          item.permission.includes(this.props.userId)
      )
      .map(item => {
        const canEdit = admin || item.permission.includes(this.props.userId);
        return Object.assign({}, item, {
          unitActions: {
            delete: this.createHandleDeleteUnit(item),
            toggleVisibility: this.createHandleVisibleUnit(item),
            copy: this.createHandleCopyUnit(item),
            addField: this.createHandleAddField(item),
            changeName: this.props.changeName,
            changePermission: this.props.changePermission
          },
          fieldActions: {
            onChangeField: this.createHandleUpdateField(item),
            toggleVisible: this.createHandleToggleField(item),
            changeName: this.createHandleFieldNameChange(item),
            delete: this.createHandleDeleteField(item)
          },
          fields: item.fields
            .filter(field => admin || field.visibleToUsers || canEdit)
            .map(field => Object.assign({}, field, { canEdit: canEdit })),
          canEdit: canEdit,
          canCRUD: admin,
          style: MAIN,
          styleHidden: MAIN_HIDDEN
        });
      });

    return (
      <div style={{ border: "1px dot black" }}>
        <div style={{ display: "flex" }}>
          {admin && <UnitsToolbar addClick={this.handleAddPlayer} />}
          <Units
            renderItem={this.renderUnit}
            items={items}
            emptyMsg={`\u00A0\u00A0\u00A0\u00A0 ( ͡° ͜ʖ ͡°)\u00A0\u00A0\u00A0\u00A0 (✪‿✪)ノ\u00A0\u00A0\u00A0\u00A0╚═( ͡° ͜ʖ ͡°)═╝\u00A0\u00A0\u00A0\u00A0 (∩^o^)⊃━☆ﾟ.*･｡ﾟ`}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
