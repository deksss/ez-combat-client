const rolls = (state = { d20: 1 }, action) => {
  switch (action.type) {
    case "ROLL_D20":
      return Object.assign({}, state, {
        d20: action.roll
      });
    default:
      return state;
  }
};

export default rolls;
