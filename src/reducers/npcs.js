import {
  addUnit,
  changeName,
  copyUnit,
  toggleVisibleUnit,
  addUnitField,
  updateUnitField,
  deleteUnitField,
  updateUnitFieldName,
  toggleUnitFieldVisible,
  updateUnitFieldRank,
  deleteUnit,
  deleteUnitsByParrentId
} from "./common/units.js";

const npcs = (state = [], action) => {
  switch (action.type) {
    case "ADD_NPC":
      return addUnit(state, action);
    case "CHANGE_NPC_NAME":
      return changeName(state, action);
    case "COPY_NPC":
      return copyUnit(state, action);
    case "DELETE_NPC":
      return deleteUnit(state, action);
    case "TOGGLE_NPC_VISIBLE_TO_USERS":
      return toggleVisibleUnit(state, action);
    case "ADD_FIELD_TO_NPC":
      return addUnitField(state, action);
    case "UPDATE_NPC_FIELD":
      return updateUnitField(state, action);
    case "DELETE_NPC_FIELD":
      return deleteUnitField(state, action);
    case "UPDATE_NPC_FIELD_NAME":
      return updateUnitFieldName(state, action);
    case "TOGGLE_NPC_FIELD_VISIBLE":
      return toggleUnitFieldVisible(state, action);
    case "UPDATE_NPC_FIELD_RANK":
      return updateUnitFieldRank(state, action);
    case "DELETE_NPCS_BY_ROOM_ID":
      return deleteUnitsByParrentId(state, action);
    default:
      return state;
  }
};

export default npcs;
