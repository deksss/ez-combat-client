import uuid from "../common/uuid";

const user = (
  state = { userId: uuid()},
  action
) => {
  switch (action.type) {
    case "SET_USER_ID":
    console.log(action)
      if (action.userId && action.userId.length > 5) {
        return Object.assign({}, state, {
          userId: action.userId
        })
      } else {
        return state
      }
    default:
      return state;
  }
};

export default user;
