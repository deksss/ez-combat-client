import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
//import { syncHistoryWithStore } from "react-router-redux";
import { persistStore } from "redux-persist";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";
import { socketsConnect } from "./actions/ws";
import "./global-styles";

const store = configureStore();
persistStore(store, { blacklist: ["ws", "routing"] });
//const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(socketsConnect());

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)
