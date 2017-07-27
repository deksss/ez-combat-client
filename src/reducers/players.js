import uuid from '../common/uuid'

const DEFAULT_PLAYERS = []
const DEFAULT_PLAYER = {name: 'lol'}

const players = (state = {list: DEFAULT_PLAYERS}, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {list: [...state.list,
              ...[Object.assign({}, DEFAULT_PLAYER, {_id: uuid()}, action.data)]
            ]}
    default:
      return state
  }
}

export default players
