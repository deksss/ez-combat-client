import uuid from "uuid/v4";
import { DEFAULT_FIELD } from "../fieldTemplates";

const DEFAULT_UNIT = {
  name: "UNIT",
  fields: [],
  visibleToUsers: false
};

export const addUnitField = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      return Object.assign(unit, {
        fields: [
          ...unit.fields,
          ...[
            Object.assign(
              {},
              DEFAULT_FIELD,
              {
                _id: action._id || uuid(),
                index: unit.fields.length + 1
              },
              action.data
            )
          ]
        ]
      });
    }
    return Object.assign({}, unit);
  });
};

export const addUnit = (state, action) => {
  return [
    ...state,
    ...[
      Object.assign(
        {},
        DEFAULT_UNIT,
        {
          _id: action._id || uuid(),
          name: action.name || `Unit`,
          index: state.length + 1,
          permission: "mod, "
        },
        action.data
      )
    ]
  ];
};

export const updateUnitField = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      return Object.assign(unit, {
        fields: unit.fields.map(field => {
          if (action.fieldId === field._id) {
            return Object.assign({}, field, {
              value: action.value
            });
          }
          return field;
        })
      });
    }
    return Object.assign({}, unit);
  });
};

export const updateUnitFieldRank = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      const prevRank = unit.fields.find(field => action.fieldId === field._id)
        .index;
      return Object.assign(unit, {
        fields: unit.fields.map(field => {
          if (action.fieldId === field._id) {
            return Object.assign({}, field, {
              index: action.index
            });
          }
          if (action.index === field.index) {
            return Object.assign({}, field, {
              index: prevRank
            });
          }
          return field;
        })
      });
    }
    return Object.assign({}, unit);
  });
};

export const deleteUnit = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      return Object.assign({}, unit, {
        deleted: true
      });
    }
    return unit;
  });
};

export const toggleVisibleUnit = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      return Object.assign({}, unit, {
        visibleToUsers: !unit.visibleToUsers
      });
    }
    return unit;
  });
};

export const copyUnit = (state, action) => {
  const data = state.find(unit => unit._id === action.unitId);
  return [
    ...state,
    ...[
      Object.assign({}, data, {
        _id: action._id || uuid(),
        name: `${data.name}_copy`,
        index: state.length + 1
      })
    ]
  ];
};

export const changeName = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      return Object.assign({}, unit, {
        name: action.name
      });
    }
    return unit;
  });
};

export const updateUnitFieldName = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      return Object.assign(unit, {
        fields: unit.fields.map(field => {
          if (action.fieldId === field._id) {
            return Object.assign({}, field, {
              name: action.name
            });
          }
          return field;
        })
      });
    }
    return Object.assign({}, unit);
  });
};

export const deleteUnitField = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      return Object.assign(unit, {
        fields: unit.fields.filter(field => field._id !== action.fieldId)
      });
    }
    return Object.assign({}, unit);
  });
};

export const toggleUnitFieldVisible = (state, action) => {
  return state.map(unit => {
    if (unit._id === action.unitId) {
      return Object.assign(unit, {
        fields: unit.fields.map(field => {
          if (action.fieldId === field._id) {
            return Object.assign({}, field, {
              visibleToUsers: !field.visibleToUsers
            });
          }
          return field;
        })
      });
    }
    return Object.assign({}, unit);
  });
};
