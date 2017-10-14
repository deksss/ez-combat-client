const initialState = { showTemplates: false };

const templates = (state = initialState, action) => {
  switch (action.type) {
    case "TEMPATES_TOGGLE":
      return Object.assign({}, state, { showTemplates: !state.showTemplates });
    default:
      return state;
  }
};

export default templates;
