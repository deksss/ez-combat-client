const templates = (state = {showTemplates: false}, action) => {
  switch (action.type) {
    case 'TEMPATES_TOGGLE':
      return Object.assign({}, state, {showTemplates: !state.showTemplates})
    default:
      return state
  }
}

export default templates
