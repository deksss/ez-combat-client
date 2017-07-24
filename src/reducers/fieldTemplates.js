const DEFAULT_FIELDS_LIST = []
const DEFAULT_FIELD = {name: 'tmp_field'}

const fieldTemplates = (state = {list: DEFAULT_FIELDS_LIST}, action) => {
  switch (action.type) {
    case 'ADD_NEW_field':
      return {list: [...state.list,
              ...[Object.assign({}, DEFAULT_FIELD, action.data)]
            ]}
    default:
      return state
  }
}

export default fieldTemplates
