import uuid from '../common/uuid'


const rooms = (state = {list: [] , currentId: null}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ROOM':
      const newCurrent = action.name || `room_${uuid()}`
      if (state.list.find(room => room._id === newCurrent)) {
        return Object.assign({}, state, {currentId: newCurrent})
      } else {
        return Object.assign({}, state, {
          list: [...state.list, ...[{_id: newCurrent}]],
          currentId: newCurrent
        })
      }
    default:
      return state
  }
}

export default rooms
