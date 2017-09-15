import uuid from "../common/uuid";

const user = (
  state = { userId: `user#${uuid().slice(0, 4)}`},
  action
) => {
  switch (action.type) {
    case "SET_USER_ID":
      return Object.assign({}, state, {
        userId: action.userId
      })
    default:
      return state;
  }
};

export default user;
