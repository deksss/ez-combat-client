const DEFAULT_UNIT_LIST = []
const DEFAULT_UNIT = {name: 'tmp_unit'}

const unitTemplates = (state = {list: DEFAULT_UNIT_LIST}, action) => {
  switch (action.type) {
    case 'ADD_NEW_UNIT':
      return {list: [...state.list,
              ...[Object.assign({}, DEFAULT_UNIT, action.data)]
            ]}
    default:
      return state
  }
}

export default unitTemplates
