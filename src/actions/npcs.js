import uuid from "../common/uuid";

export const TOGGLE_NPC_VISIBLE_TO_USERS = "TOGGLE_NPC_VISIBLE_TO_USERS";
export const DELETE_NPC = "DELETE_NPC";
export const COPY_NPC = "COPY_NPC";
export const CHANGE_NPC_NAME = "CHANGE_NPC_NAME";
export const UPDATE_NPC_FIELD = "UPDATE_NPC_FIELD";
export const ADD_NPC = "ADD_NPC";
export const ADD_FIELD_TO_NPC = "ADD_FIELD_TO_NPC";
export const TOGGLE_FIELD_VISIBLE = "TOGGLE_NPC_FIELD_VISIBLE";
export const UPDATE_NPC_FIELD_NAME = "UPDATE_NPC_FIELD_NAME";
export const DELETE_NPC_FIELD = "DELETE_NPC_FIELD";
export const UPDATE_NPC_FIELD_RANK = "UPDATE_NPC_FIELD_RANK";

export const addNpcField = unitId => ({
  type: ADD_FIELD_TO_NPC,
  unitId: unitId,
  toServer: true,
  _id: uuid()
});

export const addNpc = (parentId, name) => ({
  type: ADD_NPC,
  data: { parentId: parentId },
  toServer: true,
  _id: uuid(),
  name: name || 'NPC'
});

export const updateNpcField = (unitId, fieldId, value) => ({
  type: UPDATE_NPC_FIELD,
  unitId: unitId,
  fieldId: fieldId,
  value: value,
  toServer: true,
});

export const deleteNpc = unitId => ({
  type: DELETE_NPC,
  unitId: unitId,
  toServer: true,
});

export const toggleVisibleNpc = unitId => ({
  type: TOGGLE_NPC_VISIBLE_TO_USERS,
  unitId: unitId,
  toServer: true,
});

export const copyNpc = unitId => ({
  type: COPY_NPC,
  unitId: unitId,
  toServer: true,
  _id: uuid()
});

export const changeName = options => ({
  type: CHANGE_NPC_NAME,
  unitId: options._id,
  name: options.name,
  toServer: true,
});

export const updateNpcFieldName = (unitId, fieldId, value) => ({
  type: UPDATE_NPC_FIELD_NAME,
  unitId: unitId,
  fieldId: fieldId,
  name: value,
  toServer: true,
});

export const deleteNpcField = (unitId, fieldId) => ({
  type: DELETE_NPC_FIELD,
  unitId: unitId,
  fieldId: fieldId,
  toServer: true,
});

export const toggleNpcFieldVisible = (unitId, fieldId) => ({
  type: TOGGLE_FIELD_VISIBLE,
  unitId: unitId,
  fieldId: fieldId,
  toServer: true,
});

export const updateNpcFieldRank = (unitId, fieldId, value) => ({
  type: UPDATE_NPC_FIELD_RANK,
  unitId: unitId,
  fieldId: fieldId,
  index: value,
  toServer: true,
});
