export const NEW_ROOM = 'NEW_ROOM'
export const TEMPATES_TOGGLE = 'TEMPATES_TOGGLE'
export const ADD_PLAYER = 'ADD_PLAYER'
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'
export const JUNK_UPDATE = 'JUNK_UPDATE'


export const templatesToggle = () => ({
  type: TEMPATES_TOGGLE
})


export const addPlayer = () => ({
  type: ADD_PLAYER
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
