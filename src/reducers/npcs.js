import uuid from '../common/uuid'
import {DEFAULT_FIELD} from './fieldTemplates'

const DEFAULT_NPC = {name: 'Ez', fields: [], visibleToUsers: false}

const npcs = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NPC':
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
    case 'CHANGE_NPC_NAME':
      return state
        .map(npc => {
          if (npc._id === action.npcId) {
            return Object.assign({}, npc, {name: action.name})
          }
          return npc
        }
      )
    case 'COPY_NPC':
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
    case 'DELETE_NPC':
      return state
        .map(npc => {
          if (npc._id === action.npcId) {
            return Object.assign({}, npc, {deleted: true})
          }
          return npc
        }
      )
      case 'TOGGLE_NPC_SHOW':
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
    case 'ADD_FIELD_TO_NPC':
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
      case 'UPDATE_NPC_FIELD':
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
    default:
      return state
  }
}

export default npcs
