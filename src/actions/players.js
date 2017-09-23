import uuid from "../common/uuid";

export const TOGGLE_PLAYER_VISIBLE_TO_USERS = "TOGGLE_PLAYER_VISIBLE_TO_USERS";
export const DELETE_PLAYER = "DELETE_PLAYER";
export const COPY_PLAYER = "COPY_PLAYER";
export const CHANGE_PLAYER_NAME = "CHANGE_PLAYER_NAME";
export const UPDATE_PLAYER_FIELD = "UPDATE_PLAYER_FIELD";
export const ADD_PLAYER = "ADD_PLAYER";
export const ADD_FIELD_TO_PLAYER = "ADD_FIELD_TO_PLAYER";
export const TOGGLE_FIELD_VISIBLE = "TOGGLE_PLAYER_FIELD_VISIBLE";
export const UPDATE_PLAYER_FIELD_NAME = "UPDATE_PLAYER_FIELD_NAME";
export const DELETE_PLAYER_FIELD = "DELETE_PLAYER_FIELD";
export const CHANGE_PLAYER_PERMISSION = "CHANGE_PLAYER_PERMISSION";
export const UPDATE_PLAYER_FIELD_RANK = "UPDATE_PLAYER_FIELD_RANK";


export const addPlayerField = unitId => ({
  type: ADD_FIELD_TO_PLAYER,
  unitId: unitId,
  toServer: true,
  _id: uuid()
});

export const addPlayer = (parentId, name) => ({
  type: ADD_PLAYER,
  data: { parentId: parentId },
  toServer: true,
  _id: uuid(),
  name: name || 'Player'
});

export const updatePlayerField = (unitId, fieldId, value) => ({
  type: UPDATE_PLAYER_FIELD,
  unitId: unitId,
  fieldId: fieldId,
  value: value,
  toServer: true,
});

export const deletePlayer = unitId => ({
  type: DELETE_PLAYER,
  unitId: unitId,
  toServer: true,
});

export const toggleVisiblePlayer = unitId => ({
  type: TOGGLE_PLAYER_VISIBLE_TO_USERS,
  unitId: unitId,
  toServer: true,
});

export const copyPlayer = unitId => ({
  type: COPY_PLAYER,
  unitId: unitId,
  toServer: true,
  _id: uuid()
});

export const changeName = options => ({
  type: CHANGE_PLAYER_NAME,
  unitId: options._id,
  name: options.name,
  toServer: true,
});

export const updatePlayerFieldName = (unitId, fieldId, value) => ({
  type: UPDATE_PLAYER_FIELD_NAME,
  unitId: unitId,
  fieldId: fieldId,
  name: value,
  toServer: true,
});

export const deletePlayerField = (unitId, fieldId) => ({
  type: DELETE_PLAYER_FIELD,
  unitId: unitId,
  fieldId: fieldId,
  toServer: true,
});

export const togglePlayerFieldVisible = (unitId, fieldId) => ({
  type: TOGGLE_FIELD_VISIBLE,
  unitId: unitId,
  fieldId: fieldId,
  toServer: true,
});

export const changePermission = options => ({
  type: CHANGE_PLAYER_PERMISSION,
  unitId: options._id,
  permission: options.permission,
  toServer: true,
});

export const updatePlayerFieldRank = (unitId, fieldId, value) => ({
  type: UPDATE_PLAYER_FIELD_RANK,
  unitId: unitId,
  fieldId: fieldId,
  index: value,
  toServer: true,
});
