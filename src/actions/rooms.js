export const ADD_NEW_ROOM = 'ADD_NEW_ROOM'
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'



export const setCurrentRoom = (options = {}) => ({
  type: JOIN_ROOM,
  owner_code: options.owner_code,
  _id: options._id
})

export const addRoom = (name = 'new room') => ({
  type: SET_CURRENT_ROOM,
  name: name
})
