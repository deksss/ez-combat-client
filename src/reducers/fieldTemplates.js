import uuid from "uuid/v4";

const DEFAULT_FIELDS_LIST = [];
export const DEFAULT_FIELD = { name: "name", visibleToUsers: false, value: "" };
const defaultState = { list: DEFAULT_FIELDS_LIST };

const fieldTemplates = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_NEW_field":
      return {
        list: [
          ...state.list,
          ...[Object.assign({}, DEFAULT_FIELD, { _id: uuid() }, action.data)]
        ]
      };
    default:
      return state;
  }
};

export default fieldTemplates;
