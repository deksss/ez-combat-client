import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {autoRehydrate} from 'redux-persist'
import rootReducer from '../reducers'
import createSocketMiddleware from '../middleware/ws'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(thunk, createSocketMiddleware()),
    autoRehydrate()
  )
)

export default configureStore
