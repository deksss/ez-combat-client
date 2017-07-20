import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import templates from './templates'
import players from './players'
import npcs from './npcs'

const rootReducer = combineReducers({
  routing,
  templates,
  players,
  npcs
})

export default rootReducer
