import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { persistStore } from "redux-persist";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";
import { socketsConnect } from "./actions/ws";
import "./global-styles";

const store = configureStore();
persistStore(store, { blacklist: ["ws", "routing"] });

store.dispatch(socketsConnect());

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById("root")
);
