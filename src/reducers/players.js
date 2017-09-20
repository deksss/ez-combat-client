import uuid from "../common/uuid";
import { DEFAULT_FIELD } from "./fieldTemplates";

const DEFAULT_PLAYER = {
  name: "Player",
  fields: [],
  visibleToUsers: false
};

const addPlayerField = (state, action) => {
  return state.map(player => {
    if (player._id === action.playerId) {
      return Object.assign(player, {
        fields: [
          ...player.fields,
          ...[
            Object.assign(
              {},
              DEFAULT_FIELD,
              {
                _id: uuid(),
                index: player.fields.length + 1
              },
              action.data
            )
          ]
        ]
      });
    }
    return Object.assign({}, player);
  });
};

const addPlayer = (state, action) => {
  return [
    ...state,
    ...[
      Object.assign(
        {},
        DEFAULT_PLAYER,
        {
          _id: uuid(),
          name: action.name || `Player`,
          index: state.length + 1,
          permission: "mod"
        },
        action.data
      )
    ]
  ];
};

const updatePlayerField = (state, action) => {
  return state.map(player => {
    if (player._id === action.unitId) {
      return Object.assign(player, {
        fields: player.fields.map(field => {
          if (action.fieldId === field._id) {
            return Object.assign({}, field, {
              value: action.value
            });
          }
          return field;
        })
      });
    }
    return Object.assign({}, player);
  });
};

const updatePlayerFieldRank = (state, action) => {
  return state.map(player => {
    if (player._id === action.unitId) {
      const prevRank = player.fields.find(field => action.fieldId === field._id)
        .index;
      return Object.assign(player, {
        fields: player.fields.map(field => {
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
    return Object.assign({}, player);
  });
};

const deletePlayer = (state, action) => {
  return state.map(player => {
    if (player._id === action.playerId) {
      return Object.assign({}, player, {
        deleted: true
      });
    }
    return player;
  });
};

const toggleVisiblePlayer = (state, action) => {
  return state.map(player => {
    if (player._id === action.playerId) {
      return Object.assign({}, player, {
        visibleToUsers: !player.visibleToUsers
      });
    }
    return player;
  });
};

const copyPlayer = (state, action) => {
  const data = state.find(player => player._id === action.playerId);
  return [
    ...state,
    ...[
      Object.assign({}, data, {
        _id: uuid(),
        name: `${data.name}_copy`,
        index: state.length + 1
      })
    ]
  ];
};

const changeName = (state, action) => {
  return state.map(player => {
    if (player._id === action.playerId) {
      return Object.assign({}, player, {
        name: action.name
      });
    }
    return player;
  });
};

const updatePlayerFieldName = (state, action) => {
  return state.map(player => {
    if (player._id === action.unitId) {
      return Object.assign(player, {
        fields: player.fields.map(field => {
          if (action.fieldId === field._id) {
            return Object.assign({}, field, {
              name: action.name
            });
          }
          return field;
        })
      });
    }
    return Object.assign({}, player);
  });
};

const deletePlayerField = (state, action) => {
  return state.map(player => {
    if (player._id === action.unitId) {
      return Object.assign(player, {
        fields: player.fields.filter(field => field._id !== action.fieldId)
      });
    }
    return Object.assign({}, player);
  });
};

const togglePlayerFieldVisible = (state, action) => {
  return state.map(player => {
    if (player._id === action.unitId) {
      return Object.assign(player, {
        fields: player.fields.map(field => {
          if (action.fieldId === field._id) {
            return Object.assign({}, field, {
              visibleToUsers: !field.visibleToUsers
            });
          }
          return field;
        })
      });
    }
    return Object.assign({}, player);
  });
};

const changeWhoCanEdit = (state, action) => {
  return state.map(player => {
    if (player._id === action.playerId) {
      return Object.assign({}, player, {
        permission: action.permission
      });
    }
    return player;
  });
};

const players = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return addPlayer(state, action);
    case "CHANGE_PLAYER_NAME":
      return changeName(state, action);
    case "COPY_PLAYER":
      return copyPlayer(state, action);
    case "DELETE_PLAYER":
      return deletePlayer(state, action);
    case "TOGGLE_PLAYER_VISIBLE_TO_USERS":
      return toggleVisiblePlayer(state, action);
    case "ADD_FIELD_TO_PLAYER":
      return addPlayerField(state, action);
    case "UPDATE_PLAYER_FIELD":
      return updatePlayerField(state, action);
    case "DELETE_PLAYER_FIELD":
      return deletePlayerField(state, action);
    case "UPDATE_PLAYER_FIELD_NAME":
      return updatePlayerFieldName(state, action);
    case "TOGGLE_FIELD_VISIBLE":
      return togglePlayerFieldVisible(state, action);
    case "CHANGE_PLAYER_PERMISSION":
      return changeWhoCanEdit(state, action);
    case "UPDATE_PLAYER_FIELD_RANK":
      return updatePlayerFieldRank(state, action);
    default:
      return state;
  }
};

export default players;
