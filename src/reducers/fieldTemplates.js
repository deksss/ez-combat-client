import uuidv1 from 'uuid/v1'

const DEFAULT_FIELDS_LIST = []
export const DEFAULT_FIELD = {name: 'field_name', visibleToUsers: false, value: ''}

const fieldTemplates = (state = {list: DEFAULT_FIELDS_LIST}, action) => {
  switch (action.type) {
    case 'ADD_NEW_field':
      return {list: [...state.list,
              ...[Object.assign({}, DEFAULT_FIELD, {_id: uuidv1()}, action.data)]
            ]}
    default:
      return state
  }
}

export default fieldTemplates
