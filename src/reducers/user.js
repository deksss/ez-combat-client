import uuid from "uuid/v4";
const initialState = { userId: `username#${uuid().slice(0, 4)}` };

const user = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return Object.assign({}, state, {
        userId: action.userId
      });
    default:
      return state;
  }
};

export default user;
