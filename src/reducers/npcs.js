import uuidv1 from 'uuid/v1'
import {DEFAULT_FIELD} from './fieldTemplates'

const DEFAULT_NPCS = []
const DEFAULT_NPC = {name: 'Ez', fields: [], visibleToUsers: false}

const npcs = (state = {list: DEFAULT_NPCS, count: 0}, action) => {
  switch (action.type) {
    case 'ADD_NPC':
      const newCount = state.count + 1
      return {list: [...state.list,
              ...[Object.assign({},
                DEFAULT_NPC,
                {_id: uuidv1(), name: `Enemy ${newCount}`},
                action.data)]
            ],
          count: newCount}
    case 'ADD_FIELD_TO_NPC':
      return Object.assign(
        {},
        state,
        {list: state.list.map(npc => {
          if (npc._id === action.npcId) {
            return Object.assign(
              npc,
              {fields: [
              ...npc.fields,
              ...[Object.assign({},
                DEFAULT_FIELD,
                {_id: uuidv1()},
                action.data)]
              ]}
            )
          }
          return Object.assign({}, npc)
          })
      })
    default:
      return state
  }
}

export default npcs
