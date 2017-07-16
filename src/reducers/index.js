import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import templates from './templates'

const rootReducer = combineReducers({
  routing,
  templates
})

export default rootReducer
