const DEFAULT_NPCS = []
const DEFAULT_NPC = {name: 'Ez'}

const npcs = (state = {list: DEFAULT_NPCS}, action) => {
  switch (action.type) {
    case 'ADD_NPC':
      return {list: [...state.list,
              ...[Object.assign({}, DEFAULT_NPC, action.data)]
            ]}
    default:
      return state
  }
}

export default npcs
