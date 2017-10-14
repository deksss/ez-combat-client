import uuid from "uuid/v4";

const DEFAULT_UNIT_LIST = [];
const DEFAULT_UNIT = { name: "tmp_unit" };
const initialState = { list: DEFAULT_UNIT_LIST };

const unitTemplates = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_UNIT":
      return {
        list: [
          ...state.list,
          ...[Object.assign({}, DEFAULT_UNIT, { _id: uuid() }, action.data)]
        ]
      };
    default:
      return state;
  }
};

export default unitTemplates;
