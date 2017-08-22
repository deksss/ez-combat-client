import uuid from '../common/uuid'
import {DEFAULT_FIELD} from './fieldTemplates'

const DEFAULT_NPC = {name: 'Ez', fields: [], visibleToUsers: false}

const addNpcField = (state, action) => {
  return state.map(npc => {
    if (npc._id === action.npcId) {
      return Object.assign(
        npc,
        {fields: [
        ...npc.fields,
        ...[Object.assign({},
          DEFAULT_FIELD,
          {_id: uuid()},
          action.data)]
        ]}
      )
    }
    return Object.assign({}, npc)
    })
}

const addNpc = (state, action) => {
  return [...state,
          ...[Object.assign(
                {},
                DEFAULT_NPC,
                { _id: uuid(),
                  name: action.name || `Enemy`,
                  rank: state.length + 1,
                },
                action.data
               )
             ]
         ]
}

const updateNpcField = (state, action) => {
  return state.map(npc => {
      if (npc._id === action.unitId) {
        return Object.assign(
          npc,
          {fields: npc.fields.map(field => {
              if(action.fieldId === field._id) {
                return Object.assign({},
                                     field,
                                     {value: action.value})
              }
              return field
            })
          }
        )
      }
      return Object.assign({}, npc)
    }
  )
}

const deleteNpc = (state, action) => {
  return state
    .map(npc => {
      if (npc._id === action.npcId) {
        return Object.assign({}, npc, {deleted: true})
      }
      return npc
    }
  )
}

const toggleVisibleNpc = (state, action) => {
  return state
    .map(npc => {
      if (npc._id === action.npcId) {
        return Object.assign({},
          npc,
          {visibleToUsers: !npc.visibleToUsers})
      }
      return npc
    }
  )
}

const copyNpc = (state, action) => {
  const data = state.find(npc => npc._id === action.npcId);
  return [...state,
          ...[Object.assign({},
              data,
              { _id: uuid(),
                name: `${data.name}_copy`,
                rank: state.length + 1
              })
            ]
         ]
}

const changeName = (state, action) => {
  return state
    .map(npc => {
      if (npc._id === action.npcId) {
        return Object.assign({}, npc, {name: action.name})
      }
      return npc
    }
  )
}

const updateNpcFieldName = (state, action) => {
  return state.map(npc => {
      if (npc._id === action.unitId) {
        return Object.assign(
          npc,
          {fields: npc.fields.map(field => {
              if (action.fieldId === field._id) {
                return Object.assign({},
                                     field,
                                     {name: action.name})
              }
              return field
            })
          }
        )
      }
      return Object.assign({}, npc)
    }
  )
}

const deleteNpcField = (state, action) => {
  return state.map(npc => {
      if (npc._id === action.unitId) {
        return Object.assign(
          npc,
          {fields: npc.fields
            .filter(field => field._id !== action.fieldId)
          }
        )
      }
      return Object.assign({}, npc)
    }
  )
}

const toggleNpcFieldVisible = (state, action) => {
  return state.map(npc => {
      if (npc._id === action.unitId) {
        return Object.assign(
          npc,
          {fields: npc.fields.map(field => {
              if (action.fieldId === field._id) {
                return Object.assign(
                  {},
                  field,
                  {visibleToUsers: !field.visibleToUsers})
              }
              return field
            })
          }
        )
      }
      return Object.assign({}, npc)
    }
  )
}


const npcs = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NPC':
      return addNpc(state, action)
    case 'CHANGE_NPC_NAME':
      return changeName(state, action)
    case 'COPY_NPC':
      return copyNpc(state, action)
    case 'DELETE_NPC':
      return deleteNpc(state, action)
    case 'TOGGLE_NPC_VISIBLE_TO_USERS':
        return toggleVisibleNpc(state, action)
    case 'ADD_FIELD_TO_NPC':
      return addNpcField(state, action)
    case 'UPDATE_NPC_FIELD':
      return updateNpcField(state, action)
    case 'DELETE_NPC_FIELD':
      return deleteNpcField(state, action)
    case 'UPDATE_NPC_FIELD_NAME':
      return updateNpcFieldName(state, action)
    case 'TOGGLE_FIELD_VISIBLE':
      return toggleNpcFieldVisible(state, action)
    default:
      return state
  }
}

export default npcs
