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

const changeWhoCanEdit = (state, action) => {
  return state.map(player => {
    if (player._id === action.unitId) {
      return Object.assign({}, player, {
        permission: action.permission
      });
    }
    return player;
  });
};

const players = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return addUnit(state, action);
    case "CHANGE_PLAYER_NAME":
      return changeName(state, action);
    case "COPY_PLAYER":
      return copyUnit(state, action);
    case "DELETE_PLAYER":
      return deleteUnit(state, action);
    case "TOGGLE_PLAYER_VISIBLE_TO_USERS":
      return toggleVisibleUnit(state, action);
    case "ADD_FIELD_TO_PLAYER":
      return addUnitField(state, action);
    case "UPDATE_PLAYER_FIELD":
      return updateUnitField(state, action);
    case "DELETE_PLAYER_FIELD":
      return deleteUnitField(state, action);
    case "UPDATE_PLAYER_FIELD_NAME":
      return updateUnitFieldName(state, action);
    case "TOGGLE_PLAYER_FIELD_VISIBLE":
      return toggleUnitFieldVisible(state, action);
    case "CHANGE_PLAYER_PERMISSION":
      return changeWhoCanEdit(state, action);
    case "UPDATE_PLAYER_FIELD_RANK":
      return updateUnitFieldRank(state, action);
    case "DELETE_PLAYERS_BY_ROOM_ID":
      return deleteUnitsByParrentId(state, action);
    default:
      return state;
  }
};

export default players;
