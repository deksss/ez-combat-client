const rolls = (state = { d20: { roll: 20, name: "Nobody", log: [] } }, action) => {
  switch (action.type) {
    case "ROLL_D20":
      const {roll, name} = action;
      return Object.assign({}, state, {
        d20: { roll, name, log: [...state.d20.log, ...[{roll, name}]]  }
      });
    default:
      return state;
  }
};

export default rolls;
