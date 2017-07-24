export const NEW_ROOM = 'NEW_ROOM'
export const TEMPATES_TOGGLE = 'TEMPATES_TOGGLE'
export const ADD_NPC = 'ADD_NPC'
export const ADD_PLAYER = 'ADD_PLAYER'
export const ADD_FIELD_TO_NPC = 'ADD_FIELD_TO_NPC'

export const addNpcField = (npcId) => ({
  type: ADD_FIELD_TO_NPC,
  npcId: npcId
})

export const templatesToggle = () => ({
  type: TEMPATES_TOGGLE
})

export const addNpc = () => ({
  type: ADD_NPC
})

export const addPlayer = () => ({
  type: ADD_PLAYER
})
