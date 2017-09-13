const randomFace = sides => {
  return Math.floor((Math.random() * sides)) + 1;
}

const rolls = (state = { d20: '1' }, action) => {
  switch (action.type) {
    case "ROLL_D20":
      return Object.assign({}, state, {
        d20: randomFace(20)
      });
    default:
      return state;
  }
};

export default rolls;
