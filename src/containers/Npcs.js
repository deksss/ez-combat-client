import React, { Component } from "react";
import Unit from "../components/Unit";
import Units from "../components/Units";
import {
  addNpc,
  addNpcField,
  updateNpcField,
  deleteNpc,
  toggleVisibleNpc,
  copyNpc,
  changeName,
  toggleNpcFieldVisible,
  updateNpcFieldName,
  deleteNpcField,
  updateNpcFieldRank,
} from "../actions/npcs";
import { junkSend } from "../actions/ws";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UnitsToolbar from "../components/UnitsToolbar";
import { MAIN, MAIN_HIDDEN } from "../styles/constants";

const mapDispatchToProps = dispatch => ({
  addNpcClick: parentId => {
    dispatch(addNpc(parentId));
  },
  addFieldClick: unit => {
    dispatch(addNpcField(unit.npcId));
  },
  updateField: (unitId, fieldId, value) => {
    dispatch(updateNpcField(unitId, fieldId, value));
  },
  junkSend: () => dispatch(junkSend()),
  deleteUnit: unitId => {
    dispatch(deleteNpc(unitId));
  },
  toggleVisibleNpc: unitId => {
    dispatch(toggleVisibleNpc(unitId));
  },
  copyUnit: unitId => {
    dispatch(copyNpc(unitId));
  },
  changeName: options => {
    dispatch(changeName(options));
    dispatch(junkSend());
  },
  toggleNpcFieldVisible: (unitId, fieldId) => {
    dispatch(toggleNpcFieldVisible(unitId, fieldId));
  },
  updateNpcFieldName: (unitId, fieldId, name) => {
    dispatch(updateNpcFieldName(unitId, fieldId, name));
  },
  moveField: (unitId, fieldId, index, send) => {
    dispatch(updateNpcFieldRank(unitId, fieldId, index));
  },
  deleteNpcField: (unitId, fieldId) => {
    dispatch(deleteNpcField(unitId, fieldId));
  }
});

const mapStateToProps = state => {
  return {
    items: state.npcs.filter(
      npc => npc.parentId === state.rooms.currentId && !npc.deleted
    ),
    roomId: state.rooms.currentId
  };
};

class Npcs extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    roomId: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired
  };

  createHandleAddField = unit => {
    const addField = this.props.addFieldClick;
    const id = unit._id;
    return () => {
      addField({ npcId: id });
      this.props.junkSend();
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
    const toggleUnitVisible = this.props.toggleVisibleNpc;
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
      updateField(unitId, fieldId, value);
      this.props.junkSend();
    };
  };

  createHandleToggleField = unit => {
    const toggleNpcFieldVisible = this.props.toggleNpcFieldVisible;
    const unitId = unit._id;
    return fieldId => {
      toggleNpcFieldVisible(unitId, fieldId);
      this.props.junkSend();
    };
  };

  createHandleFieldNameChange = unit => {
    const updateNpcFieldName = this.props.updateNpcFieldName;
    const unitId = unit._id;
    return (fieldId, name) => {
      updateNpcFieldName(unitId, fieldId, name);
      this.props.junkSend();
    };
  };

  createHandleDeleteField = unit => {
    const deleteNpcField = this.props.deleteNpcField;
    const unitId = unit._id;
    return fieldId => {
      deleteNpcField(unitId, fieldId);
      this.props.junkSend();
    };
  };

  createHandleFieldIndexChange = unit => {
    const moveField = this.props.moveField;
    const unitId = unit._id;
    return (fieldId, index) => {
      moveField(unitId, fieldId, index, !this.props.admin);
      this.props.admin && this.props.junkSend();
    };
  };

  handleAddNpc = () => {
    this.props.addNpcClick(this.props.roomId);
    this.props.junkSend();
  };

  renderUnit(unit) {
    return <Unit unit={unit} key={unit._id} />;
  }

  render() {
    const admin = this.props.admin;
    const items = this.props.items
      .filter(item => admin || item.visibleToUsers)
      .map(item =>
        Object.assign({}, item, {
          unitActions: {
            delete: this.createHandleDeleteUnit(item),
            toggleVisibility: this.createHandleVisibleUnit(item),
            copy: this.createHandleCopyUnit(item),
            addField: this.createHandleAddField(item),
            changeName: this.props.changeName
          },
          fieldActions: {
            onChangeField: this.createHandleUpdateField(item),
            toggleVisible: this.createHandleToggleField(item),
            changeName: this.createHandleFieldNameChange(item),
            delete: this.createHandleDeleteField(item),
            moveField: this.createHandleFieldIndexChange(item)
          },
          fields: item.fields
            .filter(field => admin || field.visibleToUsers)
            .map(field => Object.assign({}, field, { canEdit: admin })),
          canEdit: admin,
          canCRUD: admin,
          style: MAIN,
          styleHidden: MAIN_HIDDEN
        })
      );

    return (
      <div style={{ marginTop: 10 }}>
        <div style={{ display: "flex" }}>
          {admin && <UnitsToolbar addClick={this.handleAddNpc} />}
          <Units
            height={"calc(40vh - 155px)"}
            renderItem={this.renderUnit}
            items={items}
            emptyMsg={
              " \u00A0\u00A0\u00A0\u00A0 ༼ つ ͠° ͟ ͟ʖ ͡° ༽つ \u00A0\u00A0\u00A0\u00A0(＞﹏＜)\u00A0\u00A0\u00A0\u00A0ヽ(￣～￣　)ノ\u00A0\u00A0\u00A0\u00A0 (ಠ o ಠ)¤=[]:::::>"
            }
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Npcs);
