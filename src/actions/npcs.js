export const TOGGLE_NPC_VISIBLE_TO_USERS = "TOGGLE_NPC_VISIBLE_TO_USERS";
export const DELETE_NPC = "DELETE_NPC";
export const COPY_NPC = "COPY_NPC";
export const CHANGE_NPC_NAME = "CHANGE_NPC_NAME";
export const UPDATE_NPC_FIELD = "UPDATE_NPC_FIELD";
export const ADD_NPC = "ADD_NPC";
export const ADD_FIELD_TO_NPC = "ADD_FIELD_TO_NPC";
export const TOGGLE_FIELD_VISIBLE = "TOGGLE_FIELD_VISIBLE";
export const UPDATE_NPC_FIELD_NAME = "UPDATE_NPC_FIELD_NAME";
export const DELETE_NPC_FIELD = "DELETE_NPC_FIELD";
export const UPDATE_NPC_FIELD_RANK = "UPDATE_NPC_FIELD_RANK";

export const addNpcField = npcId => ({
  type: ADD_FIELD_TO_NPC,
  npcId: npcId
});

export const addNpc = parentId => ({
  type: ADD_NPC,
  data: { parentId: parentId }
});

export const updateNpcField = (unitId, fieldId, value) => ({
  type: UPDATE_NPC_FIELD,
  unitId: unitId,
  fieldId: fieldId,
  value: value
});

export const deleteNpc = npcId => ({
  type: DELETE_NPC,
  npcId: npcId
});

export const toggleVisibleNpc = npcId => ({
  type: TOGGLE_NPC_VISIBLE_TO_USERS,
  npcId: npcId
});

export const copyNpc = npcId => ({
  type: COPY_NPC,
  npcId: npcId
});

export const changeName = options => ({
  type: CHANGE_NPC_NAME,
  npcId: options._id,
  name: options.name
});

export const updateNpcFieldName = (unitId, fieldId, value) => ({
  type: UPDATE_NPC_FIELD_NAME,
  unitId: unitId,
  fieldId: fieldId,
  name: value
});

export const deleteNpcField = (unitId, fieldId) => ({
  type: DELETE_NPC_FIELD,
  unitId: unitId,
  fieldId: fieldId
});

export const toggleNpcFieldVisible = (unitId, fieldId) => ({
  type: TOGGLE_FIELD_VISIBLE,
  unitId: unitId,
  fieldId: fieldId
});

export const updateNpcFieldRank = (unitId, fieldId, value) => ({
  type: UPDATE_NPC_FIELD_RANK,
  unitId: unitId,
  fieldId: fieldId,
  index: value
});
