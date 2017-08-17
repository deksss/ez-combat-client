import uuid from '../common/uuid'
import {DEFAULT_FIELD} from './fieldTemplates'

const DEFAULT_NPC = {name: 'Ez', fields: [], visibleToUsers: true}

const npcs = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NPC':
      return [...state,
              ...[Object.assign({}, DEFAULT_NPC,
                    {_id: uuid(),
                     name: `Enemy ${state.length + 1}`},
                    action.data
                   )
                 ]
             ]
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
