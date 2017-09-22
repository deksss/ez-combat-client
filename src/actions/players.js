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


export const addPlayerField = playerId => ({
  type: ADD_FIELD_TO_PLAYER,
  playerId: playerId,
  toServer: true,
  _id: uuid()
});

export const addPlayer = parentId => ({
  type: ADD_PLAYER,
  data: { parentId: parentId },
  toServer: true,
  _id: uuid()
});

export const updatePlayerField = (unitId, fieldId, value) => ({
  type: UPDATE_PLAYER_FIELD,
  unitId: unitId,
  fieldId: fieldId,
  value: value,
  toServer: true,
});

export const deletePlayer = playerId => ({
  type: DELETE_PLAYER,
  playerId: playerId,
  toServer: true,
});

export const toggleVisiblePlayer = playerId => ({
  type: TOGGLE_PLAYER_VISIBLE_TO_USERS,
  playerId: playerId,
  toServer: true,
});

export const copyPlayer = playerId => ({
  type: COPY_PLAYER,
  playerId: playerId,
  toServer: true,
  _id: uuid()
});

export const changeName = options => ({
  type: CHANGE_PLAYER_NAME,
  playerId: options._id,
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
  playerId: options._id,
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
