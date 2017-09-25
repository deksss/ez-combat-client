import uuid from "uuid/v4";
import randomDigit from "../common/randomDigit";

const rooms = (
  state = { list: [], currentId: null, isCurrentRoomMod: false },
  action
) => {
  switch (action.type) {
    case "SET_CURRENT_ROOM":
      const newCurrent = action._id;
      const room = state.list.find(room => room._id === newCurrent);
      const owner_code = action.owner_code;
      const isAdmin = room && room.owner_code && room.owner_code === owner_code;
      return Object.assign({}, state, {
        currentId: newCurrent,
        isCurrentRoomMod: isAdmin
      });
    case "ADD_NEW_ROOM":
      const name = action.name || `new_room`;
      const addedCurrent = `${name}#${randomDigit(4)}`;
      const OWNER_CODE = uuid();
      return Object.assign(
        {},
        {
          list: [
            ...state.list,
            ...[{ _id: addedCurrent, owner_code: OWNER_CODE, name: name }]
          ],
          currentId: addedCurrent
        }
      );
    default:
      return state;
  }
};

export default rooms;
