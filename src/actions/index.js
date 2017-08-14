export const NEW_ROOM = 'NEW_ROOM'
export const TEMPATES_TOGGLE = 'TEMPATES_TOGGLE'
export const ADD_NPC = 'ADD_NPC'
export const ADD_PLAYER = 'ADD_PLAYER'
export const ADD_FIELD_TO_NPC = 'ADD_FIELD_TO_NPC'
export const UPDATE_NPC_FIELD = 'UPDATE_NPC_FIELD'
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'
export const JUNK_UPDATE = 'JUNK_UPDATE'



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
