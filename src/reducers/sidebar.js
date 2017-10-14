const initialState = { showGeneralSettings: false };

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case "SETTINGS_TOGGLE":
      return Object.assign({}, state, {
        showGeneralSettings: !state.showGeneralSettings
      });
    default:
      return state;
  }
};

export default sidebar;
