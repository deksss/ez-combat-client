import { createStore, applyMiddleware, compose } from 'redux'
import {autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import createSocketMiddleware from '../middleware/ws'


const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk,
        createLogger(),
        createSocketMiddleware()
      ),
      autoRehydrate(),
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}



export default configureStore
