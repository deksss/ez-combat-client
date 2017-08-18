export const NEW_ROOM = 'NEW_ROOM'
export const TEMPATES_TOGGLE = 'TEMPATES_TOGGLE'
export const ADD_NPC = 'ADD_NPC'
export const ADD_PLAYER = 'ADD_PLAYER'
export const ADD_FIELD_TO_NPC = 'ADD_FIELD_TO_NPC'
export const UPDATE_NPC_FIELD = 'UPDATE_NPC_FIELD'
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'
export const JUNK_UPDATE = 'JUNK_UPDATE'
export const TOGGLE_NPC_VISIBLE_TO_USERS = 'TOGGLE_NPC_VISIBLE_TO_USERS'
export const DELETE_NPC = 'DELETE_NPC'
export const COPY_NPC = 'COPY_NPC'
export const CHANGE_NPC_NAME = 'CHANGE_NPC_NAME'



export const addNpcField = (npcId) => ({
  type: ADD_FIELD_TO_NPC,
  npcId: npcId
})

export const templatesToggle = () => ({
  type: TEMPATES_TOGGLE
})

export const addNpc = (parentId) => ({
  type: ADD_NPC,
  data: {parentId: parentId}
})

export const addPlayer = () => ({
  type: ADD_PLAYER
})

export const updateNpcField = (unitId, fieldId, value) => ({
  type: UPDATE_NPC_FIELD,
  unitId: unitId,
  fieldId: fieldId,
  value: value
})

export const setCurrentRoom = (options = {}) => ({
  type: SET_CURRENT_ROOM,
  name: options.value,
  admin: options.admin
})

export const junkUpdate = (data) => ({
  type: JUNK_UPDATE,
  data: data
})

export const deleteNpc = (npcId) => ({
  type: DELETE_NPC,
  npcId: npcId
})

export const toggleVisibleNpc = (npcId) => ({
  type: TOGGLE_NPC_VISIBLE_TO_USERS,
  npcId: npcId
})

export const copyNpc = (npcId) => ({
  type: COPY_NPC,
  npcId: npcId
})

export const changeName = (options) => ({
  type: CHANGE_NPC_NAME,
  npcId: options._id,
  name: options.name
})
