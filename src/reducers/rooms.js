import uuid from '../common/uuid'

const rooms = (state = {list: [] , currentId: null}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ROOM':
      const newCurrent = action.name || `room_${uuid()}`
      if (state.list.find(room => room === newCurrent)) {
        return Object.assign({}, state, {currentId: newCurrent})
      } else {
        return Object.assign({}, state, {
          list: [...state.list, ...[newCurrent]],
          currentId: newCurrent
        })
      }
    default:
      return state
  }
}

export default rooms
