import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router } from 'react-router-dom'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root
