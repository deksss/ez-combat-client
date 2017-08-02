import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import templates from './templates'
import players from './players'
import npcs from './npcs'
import unitTemplates from './unitTemplates'
import fieldTemplates from './fieldTemplates'
import rooms from './rooms'

const rootReducer = combineReducers({
  routing,
  rooms,
  templates,
  players,
  npcs,
  unitTemplates,
  fieldTemplates
})

export default rootReducer
