export const ADD_NEW_ROOM = "ADD_NEW_ROOM";
export const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";

export const setCurrentRoom = (options = {}) => ({
  type: SET_CURRENT_ROOM,
  owner_code: options.owner_code,
  _id: options._id
});

export const addRoom = (name = "new room") => ({
  type: ADD_NEW_ROOM,
  name: name
});

export const deleteRoom = (options = {}) => ({
  type: DELETE_ROOM,
  _id: options._id,
});

export const saveRoom = (options = {}) => ({
  type: DELETE_ROOM,
  _id: options._id,
});
