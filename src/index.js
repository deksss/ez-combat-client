import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import {persistStore} from 'redux-persist'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import {socketsConnect} from './actions/ws'

const store = configureStore()
persistStore(store)
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(socketsConnect())

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
