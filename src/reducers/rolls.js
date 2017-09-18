const customRoll = (state, action) => {
  const { rolls, types, rawString, name } = action;
  return Object.assign({}, state, {
      log: [
        ...state.log,
        ...[
          {
            rolls,
            types,
            rawString,
            name,
            type: 'custom',
            date: new Date()
          }
        ]
      ]
    });
};

const rolls = (
  state = {
    d20: { roll: 20, name: "Nobody"},
    log: []
  },
  action
) => {
  switch (action.type) {
    case "ROLL_D20":
      const { roll, name } = action;
      return Object.assign({}, state, {
        d20: {
          roll,
          name
        },
        log: [...state.log, ...[{ roll, name, date: new Date(), type: 'd20' }]]
      });
    case "ROLL_CUSTOM":
      return customRoll(state, action);
    default:
      return state;
  }
};

export default rolls;
