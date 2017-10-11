import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import RoomAdmin from "./RoomAdmin";

const Root = ({ store }) => (
  <Provider store={store}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/admin/:name" component={RoomAdmin} />
      <Route path="/:name" component={Room} />
    </Switch>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
