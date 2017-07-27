import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {autoRehydrate} from 'redux-persist'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
)

export default configureStore
