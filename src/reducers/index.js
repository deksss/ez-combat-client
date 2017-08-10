import { routerReducer as routing } from 'react-router-redux'
import { combineReducers} from 'redux'
import templates from './templates'
import players from './players'
import npcs from './npcs'
import unitTemplates from './unitTemplates'
import fieldTemplates from './fieldTemplates'
import rooms from './rooms'
import ws from './ws'

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}

const rootReducer =  reduceReducers(
  combineReducers({
    routing,
    rooms,
    templates,
    players,
    npcs,
    unitTemplates,
    fieldTemplates,
    ws
  }),
  (state, action) => {
    switch (action.type) {
      case 'JUNK_UPDATE':
        return Object.assign({}, state, action.data)
      default:
        return state
    }
  }
)

export default rootReducer
